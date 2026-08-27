import { createContext, useContext, type ReactNode } from 'react';

import { useProfile } from '@/app/providers/ProfileProvider';
import { useSiteLanguage } from '@/app/providers/SiteLanguageProvider';
import { updateProfile } from '@/entities/profile/api';
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
  const { profile, setProfile } = useProfile();
  const { language: siteLanguage, setLanguage: setSiteLanguage } = useSiteLanguage();

  // Public pages use the site language. The authenticated app uses only the
  // language stored in the user's profile. Account language is never persisted
  // to guest/local browser state.
  const language = profile?.app_language ?? siteLanguage;

  function setLanguage(nextLanguage: AppLanguage) {
    if (!profile) {
      setSiteLanguage(nextLanguage);
      return;
    }

    if (profile.app_language === nextLanguage) {
      return;
    }

    const previousProfile = profile;
    const optimisticProfile = {
      ...profile,
      app_language: nextLanguage,
      updated_at: new Date().toISOString(),
    };

    setProfile(optimisticProfile);

    void updateProfile(profile.user_id, { app_language: nextLanguage })
      .then((updatedProfile) => {
        setProfile(updatedProfile);
      })
      .catch((error) => {
        console.error('Failed to update interface language:', error);
        setProfile(previousProfile);
      });
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
