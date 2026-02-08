import { notFound } from 'next/navigation';
import { BibleReader } from '@/components/bible-reader';
import { getChaptersForBook, ALL_BOOKS } from '@/lib/bible-data';

export function generateStaticParams() {
  const params: { book: string; chapter: string }[] = [];
  ALL_BOOKS.forEach(book => {
      const chapters = getChaptersForBook(book);
      for (let i = 1; i <= chapters; i++) {
          params.push({ book, chapter: i.toString() });
      }
  });
  return params;
}

export default async function ReadPage({ params: paramsPromise }: { params: Promise<{ book: string; chapter: string }> }) {
  const params = await paramsPromise;
  const bookName = decodeURIComponent(params.book);
  const chapterNum = parseInt(params.chapter, 10);

  const totalChapters = getChaptersForBook(bookName);

  if (!ALL_BOOKS.includes(bookName) || isNaN(chapterNum) || chapterNum < 1 || chapterNum > totalChapters) {
    notFound();
  }

  return <BibleReader book={bookName} chapter={chapterNum} />;
}
