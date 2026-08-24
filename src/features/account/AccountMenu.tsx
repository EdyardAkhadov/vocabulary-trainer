import { useState } from 'react';
import { Link } from 'react-router';

import { useAuth } from '@/app/providers/AuthProvider';
import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { useProfile } from '@/app/providers/ProfileProvider';
import { Button } from '@/components/ui/button';
import { signOut } from '@/features/auth/api';

export function AccountMenu() {
  const { user } = useAuth();
  const { profile } = useProfile();
  const { t } = useAppLanguage();

  const [isOpen, setIsOpen] = useState(false);

  const displayName = profile?.nickname ?? user?.email?.split('@')[0] ?? 'User';

  async function handleSignOut() {
    await signOut();
  }

  return (
    <div className="relative">
      <Button type="button" variant="ghost" onClick={() => setIsOpen((current) => !current)}>
        {displayName}
        <span className="ml-1 text-xs">▾</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border bg-popover p-2 text-popover-foreground shadow-lg">
          <div className="px-3 py-2">
            <p className="font-medium">{displayName}</p>

            {user?.email && (
              <p className="mt-1 truncate text-xs text-muted-foreground">{user.email}</p>
            )}
          </div>

          <div className="my-1 h-px bg-border" />

          <Link
            to="/account"
            onClick={() => setIsOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
          >
            {t.account.menuSettings}
          </Link>

          <Link
            to="/progress"
            onClick={() => setIsOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
          >
            {t.account.menuProgress}
          </Link>

          <div className="my-1 h-px bg-border" />

          <button
            type="button"
            onClick={handleSignOut}
            className="w-full rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
          >
            {t.common.logout}
          </button>
        </div>
      )}
    </div>
  );
}
