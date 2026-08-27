import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { useTheme, type AppTheme } from '@/app/providers/ThemeProvider';

type ThemeOption = {
  value: AppTheme;
  icon: string;
  label: string;
};

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const { t } = useAppLanguage();

  const options: ThemeOption[] = [
    {
      value: 'system',
      icon: '◐',
      label: t.account.themeSystem,
    },
    {
      value: 'light',
      icon: '☀',
      label: t.account.themeLight,
    },
    {
      value: 'dark',
      icon: '☾',
      label: t.account.themeDark,
    },
  ];

  return (
    <div
      className="
        grid grid-cols-1 gap-3
        min-[380px]:grid-cols-3
      "
    >
      {options.map((option) => {
        const isSelected = theme === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setTheme(option.value)}
            aria-pressed={isSelected}
            className={`
              flex min-h-14
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              px-4
              py-3
              text-sm
              font-medium
              transition-colors

              ${
                isSelected
                  ? 'border-foreground bg-foreground text-background'
                  : 'bg-background text-foreground hover:bg-muted'
              }
            `}
          >
            <span aria-hidden="true" className="text-lg">
              {option.icon}
            </span>

            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
