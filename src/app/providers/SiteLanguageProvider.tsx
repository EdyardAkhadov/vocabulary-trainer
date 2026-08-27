import { createContext, useContext, useState, type ReactNode } from 'react';

import { detectSiteLanguage, saveSiteLanguage } from '@/shared/i18n/detect-language';
import { translations, type AppLanguage } from '@/shared/i18n/translations';

type SiteLanguageContextValue = {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
  t: (typeof translations)[AppLanguage];
};

const SiteLanguageContext = createContext<SiteLanguageContextValue | null>(null);

type SiteLanguageProviderProps = {
  children: ReactNode;
};

export function SiteLanguageProvider({ children }: SiteLanguageProviderProps) {
  const [language, setLanguageState] = useState<AppLanguage>(detectSiteLanguage);

  function setLanguage(nextLanguage: AppLanguage) {
    saveSiteLanguage(nextLanguage);
    setLanguageState(nextLanguage);
  }

  return (
    <SiteLanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </SiteLanguageContext.Provider>
  );
}

export function useSiteLanguage() {
  const context = useContext(SiteLanguageContext);

  if (!context) {
    throw new Error('useSiteLanguage must be used inside SiteLanguageProvider');
  }

  return context;
}
