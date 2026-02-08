'use client';

import { useSettings } from '@/hooks/use-settings';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';

export function SettingsControls() {
  const {
    language,
    setLanguage,
    theme,
    setTheme,
    fontSize,
    setFontSize,
  } = useSettings();

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <Label className="font-bold">Display Settings</Label>
        <div className="flex items-center justify-between">
          <Label htmlFor="theme-switch" className="flex items-center gap-2">
            <Sun className="h-4 w-4" /> Light / Dark <Moon className="h-4 w-4" />
          </Label>
          <Switch
            id="theme-switch"
            checked={theme === 'dark'}
            onCheckedChange={handleThemeChange}
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="language-select" className="font-bold">Language</Label>
        <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
          <SelectTrigger id="language-select">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tenglish">Tenglish</SelectItem>
            <SelectItem value="telugu">Telugu (తెలుగు)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="font-size-select" className="font-bold">Font Size</Label>
        <Select value={fontSize} onValueChange={(value) => setFontSize(value as any)}>
          <SelectTrigger id="font-size-select">
            <SelectValue placeholder="Select font size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sm">Small</SelectItem>
            <SelectItem value="md">Medium</SelectItem>
            <SelectItem value="lg">Large</SelectItem>
            <SelectItem value="xl">Extra Large</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
