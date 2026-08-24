import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useAppLanguage } from '@/app/providers/LanguageProvider';
import type { AppLanguage } from '@/shared/i18n/translations';

const languageOptions = [
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'ru',
    label: 'Русский',
  },
  {
    value: 'uk',
    label: 'Українська',
  },
  {
    value: 'de',
    label: 'Deutsch',
  },
  {
    value: 'es',
    label: 'Español',
  },
] satisfies {
  value: AppLanguage;
  label: string;
}[];

export function LanguageSwitcher() {
  const { language, setLanguage } = useAppLanguage();

  return (
    <Select
      items={languageOptions}
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
        {languageOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
