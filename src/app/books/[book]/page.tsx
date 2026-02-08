import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getChaptersForBook, ALL_BOOKS } from '@/lib/bible-data';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function generateStaticParams() {
  return ALL_BOOKS.map((book) => ({
    book: book,
  }));
}

export default async function BookPage({ params: paramsPromise }: { params: Promise<{ book: string }> }) {
  const params = await paramsPromise;
  const bookName = decodeURIComponent(params.book);
  const totalChapters = getChaptersForBook(bookName);

  if (!ALL_BOOKS.includes(bookName) || totalChapters === 0) {
    notFound();
  }

  const chapters = Array.from({ length: totalChapters }, (_, i) => i + 1);

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-4xl font-bold mb-8 text-center font-headline">{bookName}</h1>
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
        {chapters.map((chapter) => (
          <Link
            key={chapter}
            href={`/read/${bookName}/${chapter}`}
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'aspect-square h-auto w-full text-base sm:text-lg hover:bg-accent hover:text-accent-foreground'
            )}
          >
            {chapter}
          </Link>
        ))}
      </div>
    </div>
  );
}
