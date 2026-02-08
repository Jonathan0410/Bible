
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import { FileText, Search, BookOpen, Info } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from '@/components/ui/input';
import { OLD_TESTAMENT_BOOKS, NEW_TESTAMENT_BOOKS, getChaptersForBook } from '@/lib/bible-data';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { buttonVariants } from '../ui/button';


const BookList = ({ books }: { books: string[] }) => (
    <Accordion type="single" collapsible className="w-full pr-2">
        {books.map((book) => (
            <AccordionItem value={book} key={book} className="border-b-0">
                <AccordionTrigger 
                    className={cn(
                        'p-2 text-sm rounded-md truncate w-full',
                        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:no-underline justify-start font-normal'
                    )}
                >
                   {book}
                </AccordionTrigger>
                <AccordionContent>
                    <div className="grid grid-cols-5 gap-2 pt-2 pl-4">
                        {Array.from({ length: getChaptersForBook(book) }, (_, i) => i + 1).map((chapter) => (
                            <Link
                                key={chapter}
                                href={`/read/${book}/${chapter}`}
                                className={cn(
                                    buttonVariants({ variant: 'outline', size: 'icon' }),
                                    'aspect-square h-auto w-full text-xs'
                                )}
                            >
                                {chapter}
                            </Link>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        ))}
        {books.length === 0 && <p className="p-2 text-sm text-muted-foreground">No books found.</p>}
    </Accordion>
);

export function AppSidebar() {
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar();
  const [searchTerm, setSearchTerm] = useState('');

  // Close mobile sidebar on page navigation
  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [pathname, isMobile, setOpenMobile]);

  const filteredOldTestament = useMemo(() =>
    OLD_TESTAMENT_BOOKS.filter(book =>
      book.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

  const filteredNewTestament = useMemo(() =>
    NEW_TESTAMENT_BOOKS.filter(book =>
      book.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <h2 className="text-lg font-semibold tracking-tight">Tenglish Bible</h2>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-0 flex flex-col">
         <div className="p-2">
             <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search books..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
         </div>
        <ScrollArea className="flex-1">
         <Accordion type="multiple" defaultValue={['old-testament', 'new-testament']} className="w-full px-2">
            <AccordionItem value="old-testament">
                <AccordionTrigger className="text-base font-semibold hover:no-underline">📖 Paatha Nibandhana (Old Testament)</AccordionTrigger>
                <AccordionContent>
                    <BookList books={filteredOldTestament} />
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="new-testament">
                <AccordionTrigger className="text-base font-semibold hover:no-underline">📘 Kotha Nibandhana (New Testament)</AccordionTrigger>
                <AccordionContent>
                    <BookList books={filteredNewTestament} />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
         <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/alphabetical'}>
                     <Link href="/alphabetical">
                        <FileText className="h-5 w-5" />
                        <span>Alphabetical Index</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/about'}>
                     <Link href="/about">
                        <Info className="h-5 w-5" />
                        <span>About</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
         </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
