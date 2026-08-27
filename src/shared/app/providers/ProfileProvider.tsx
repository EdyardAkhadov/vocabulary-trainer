import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import { useAuth } from '@/app/providers/AuthProvider';
import { ensureProfile } from '@/entities/profile/ensure-profile';
import { getProfile, type Profile } from '@/entities/profile/api';
import { detectBrowserLanguage } from '@/shared/i18n/detect-language';

type ProfileContextValue = {
  profile: Profile | null;
  isProfileLoading: boolean;
  refreshProfile: () => Promise<void>;
  setProfile: (profile: Profile) => void;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

type ProfileProviderProps = {
  children: ReactNode;
};

export function ProfileProvider({ children }: ProfileProviderProps) {
  const { user, isLoading: isAuthLoading } = useAuth();

  const [profile, setProfile] = useState<Profile | null>(null);

  const [isProfileLoading, setIsProfileLoading] = useState(true);

  // Never expose a profile after logout or while a different user's profile is loading.
  const activeProfile = user && profile?.user_id === user.id ? profile : null;

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    if (!user) {
      return;
    }

    const currentUser = user;

    async function loadProfile() {
      try {
        const result = await ensureProfile(currentUser, detectBrowserLanguage());

        setProfile(result);
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setIsProfileLoading(false);
      }
    }

    void loadProfile();
  }, [user, isAuthLoading]);

  async function refreshProfile() {
    if (!user) {
      return;
    }

    const result = await getProfile(user.id);

    if (result) {
      setProfile(result);
    }
  }

  return (
    <ProfileContext.Provider
      value={{
        profile: activeProfile,
        isProfileLoading,
        refreshProfile,
        setProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfile must be used inside ProfileProvider');
  }

  return context;
}
