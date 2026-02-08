'use client';

import { Settings } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { SettingsControls } from '@/components/settings-controls';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 shadow-sm md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Tenglish Bible
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64" align="end">
            <SettingsControls />
          </PopoverContent>
        </Popover>
      </div>
       <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-r from-primary/20 to-accent/20 opacity-50" />
    </header>
  );
}
