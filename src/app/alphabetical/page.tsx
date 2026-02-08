import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ALL_BOOKS } from '@/lib/bible-data';

export default function AlphabeticalIndexPage() {
  const sortedBooks = [...ALL_BOOKS]
    .filter(book => typeof book === 'string' && book) // Filter out any invalid entries
    .sort((a, b) => {
    // Ignore leading numbers and spaces for sorting (e.g., "1 Samuel" vs "Samuel")
    const bookA = a.replace(/^\d+\s+/, '');
    const bookB = b.replace(/^\d+\s+/, '');
    return bookA.localeCompare(bookB);
  });

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-bold mb-6 text-center font-headline">Alphabetical Index</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedBooks.map((book) => (
            <Link 
              key={book}
              href={`/books/${book}`}
            >
              <Card className={`transition-shadow duration-300 hover:shadow-md hover:border-primary`}>
                <CardContent className="p-4">
                  <p className="font-semibold">{book}</p>
                </CardContent>
              </Card>
            </Link>
        ))}
      </div>
    </div>
  );
}
