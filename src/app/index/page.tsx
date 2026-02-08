import { BookOpen } from 'lucide-react';

export default function IndexPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] text-center">
      <BookOpen className="h-16 w-16 text-primary mb-4" />
      <h1 className="text-xl font-bold mb-2">Welcome to the Tenglish Bible</h1>
      <p className="text-muted-foreground text-sm">
        Select a book and chapter from the sidebar to start reading.
      </p>
    </div>
  );
}
