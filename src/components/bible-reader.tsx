
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Loader2, Volume2, Square } from 'lucide-react';
import { useSettings } from '@/hooks/use-settings';
import TenglishBible from '@/data/tenglish-bible.json';
import TeluguBible from '@/data/telugu-bible.json';
import { getNextChapter, getPrevChapter } from '@/lib/bible-data';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type BibleData = typeof TenglishBible | typeof TeluguBible;

interface BibleReaderProps {
  book: string;
  chapter: number;
}

const fontSizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

export function BibleReader({ book, chapter }: BibleReaderProps) {
  const router = useRouter();
  const { language, fontSize, setLastRead, isLoaded } = useSettings();
  const [verses, setVerses] = useState<Record<string, string> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const [isReading, setIsReading] = useState(false);
  const [speakingVerse, setSpeakingVerse] = useState<string | null>(null);
  const utteranceQueueRef = useRef<SpeechSynthesisUtterance[]>([]);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const swipeThreshold = 50;

  const handleStopReading = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsReading(false);
    setSpeakingVerse(null);
    utteranceQueueRef.current = [];
  };

  useEffect(() => {
    if (isLoaded) {
      setLastRead({ book, chapter });
    }
    return () => {
      handleStopReading();
    };
  }, [book, chapter, setLastRead, isLoaded]);

  useEffect(() => {
    handleStopReading();

    const loadVerses = () => {
      setIsLoading(true);
      const bibleData: BibleData = language === 'tenglish' ? TenglishBible : TeluguBible;
      const bookKey = book as keyof BibleData;
      const bookData = bibleData[bookKey];
      
      if (bookData) {
        const chapterKey = chapter as keyof typeof bookData;
        const chapterData = bookData[chapterKey];
        setVerses(chapterData || null);
      } else {
        setVerses(null);
      }
      setIsLoading(false);
    };

    loadVerses();
  }, [book, chapter, language]);

  const processAndSpeak = () => {
    if (utteranceQueueRef.current.length > 0) {
      const utterance = utteranceQueueRef.current.shift();
      if (utterance) {
        setSpeakingVerse(utterance.id);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      setIsReading(false);
      setSpeakingVerse(null);
    }
  };

  const handleReadAloud = () => {
    if (!verses || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      toast({
        variant: 'destructive',
        title: 'Unsupported Feature',
        description: 'Text-to-speech is not supported by your browser.',
      });
      return;
    }

    if (window.speechSynthesis.speaking) {
      handleStopReading();
      return;
    }

    const utterances = Object.entries(verses).map(([verseNum, text]) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'tenglish' ? 'en-US' : 'te-IN';
      utterance.id = verseNum;
      utterance.onend = processAndSpeak;
      utterance.onerror = (event) => {
        console.error('SpeechSynthesis Error', event);
        toast({
          variant: 'destructive',
          title: 'Speech Failed',
          description: 'An error occurred during playback.',
        });
        handleStopReading();
      };
      return utterance;
    });

    if (utterances.length === 0) {
      return;
    }
    
    utteranceQueueRef.current = utterances;
    setIsReading(true);
    processAndSpeak();
  };


  const navigateToChapter = (newChapterData: { book: string; chapter: number } | null) => {
    if (newChapterData) {
      router.push(`/read/${newChapterData.book}/${newChapterData.chapter}`);
    }
  };

  const handlePrevChapter = () => navigateToChapter(getPrevChapter(book, chapter));
  const handleNextChapter = () => navigateToChapter(getNextChapter(book, chapter));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchEndX.current - touchStartX.current;
    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX > 0) { // Swipe right (previous)
        handlePrevChapter();
      } else { // Swipe left (next)
        handleNextChapter();
      }
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  if (isLoading || !isLoaded) {
    return (
      <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  const renderReadButton = () => {
    if (isReading) {
      return (
        <Button variant="outline" size="sm" onClick={handleStopReading}>
          <Square className="mr-2 h-4 w-4" />
          Stop Reading
        </Button>
      );
    }
    return (
      <Button variant="outline" size="sm" onClick={handleReadAloud}>
        <Volume2 className="mr-2 h-4 w-4" />
        Read Aloud
      </Button>
    );
  };

  return (
    <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex-grow text-center sm:text-left">
          <h1 className="text-3xl md:text-4xl font-bold font-headline">{book}</h1>
          <p className="text-lg text-muted-foreground mt-1">Chapter {chapter}</p>
        </div>
        <div className="flex-shrink-0 self-center sm:self-auto">
          {renderReadButton()}
        </div>
      </div>
      
      {language === 'telugu' && (
        <p className="text-center text-sm text-muted-foreground mb-4">Reading aloud is not available for Telugu script yet.</p>
      )}

      {verses ? (
        <div className={cn('space-y-4 leading-relaxed', fontSizeClasses[fontSize])}>
          {Object.entries(verses).map(([verseNum, text]) => (
            <div
              key={verseNum}
              className={cn(
                'flex gap-4 p-2 transition-colors duration-300 rounded-md',
                speakingVerse === verseNum ? 'bg-primary/10' : ''
              )}
            >
              <span className="font-bold text-primary/80 w-8 text-right">{verseNum}</span>
              <p className="flex-1">{text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No content available for this chapter.</p>
      )}

      <div className="mt-8 flex justify-between">
        <Button onClick={handlePrevChapter} disabled={!getPrevChapter(book, chapter)} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button onClick={handleNextChapter} disabled={!getNextChapter(book, chapter)} variant="outline">
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
