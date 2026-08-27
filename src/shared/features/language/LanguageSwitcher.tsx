import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useSiteLanguage } from '@/app/providers/SiteLanguageProvider';
import { APP_LANGUAGE_OPTIONS } from '@/shared/i18n/app-language-options';
import type { AppLanguage } from '@/shared/i18n/translations';

export function LanguageSwitcher() {
  const { language, setLanguage } = useSiteLanguage();

  return (
    <Select
      items={APP_LANGUAGE_OPTIONS}
      value={language}
      onValueChange={(value) => {
        if (value) {
          setLanguage(value as AppLanguage);
        }
      }}
    >
      <SelectTrigger className="w-36">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {APP_LANGUAGE_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
