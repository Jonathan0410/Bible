'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useSettings } from '@/hooks/use-settings';

export default function HomePage() {
  const router = useRouter();
  const { lastRead, isLoaded } = useSettings();

  useEffect(() => {
    if (isLoaded) {
      if (lastRead) {
        router.replace(`/read/${lastRead.book}/${lastRead.chapter}`);
      } else {
        router.replace('/index');
      }
    }
  }, [isLoaded, lastRead, router]);

  return (
    <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );
}
