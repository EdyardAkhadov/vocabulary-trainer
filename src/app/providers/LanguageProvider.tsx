import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import { useProfile } from '@/app/providers/ProfileProvider';
import { detectAppLanguage, saveAppLanguage } from '@/shared/i18n/detect-language';
import { translations, type AppLanguage } from '@/shared/i18n/translations';

type LanguageContextValue = {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
  t: (typeof translations)[AppLanguage];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

type LanguageProviderProps = {
  children: ReactNode;
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const { profile } = useProfile();

  const [localLanguage, setLocalLanguage] = useState<AppLanguage>(detectAppLanguage);

  const language = profile?.app_language ?? localLanguage;

  useEffect(() => {
    if (!profile) {
      return;
    }

    saveAppLanguage(profile.app_language);
  }, [profile]);

  function setLanguage(nextLanguage: AppLanguage) {
    saveAppLanguage(nextLanguage);
    setLocalLanguage(nextLanguage);
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useAppLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useAppLanguage must be used inside LanguageProvider');
  }

  return context;
}
