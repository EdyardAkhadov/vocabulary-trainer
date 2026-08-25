import { useEffect, useRef, useState } from 'react';
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
  const menuRef = useRef<HTMLDivElement>(null);

  const displayName = profile?.nickname ?? user?.email?.split('@')[0] ?? 'User';

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  async function handleSignOut() {
    setIsOpen(false);
    await signOut();
  }

  return (
    <div ref={menuRef} className="relative min-w-0">
      <Button
        type="button"
        variant="ghost"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="min-h-11 max-w-[11rem] px-3 sm:max-w-[16rem]"
      >
        <span className="truncate">{displayName}</span>
        <span className="ml-1 shrink-0 text-xs" aria-hidden="true">▾</span>
      </Button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-[min(18rem,calc(100vw-2rem))] rounded-xl border bg-popover p-2 text-popover-foreground shadow-lg"
        >
          <div className="min-w-0 px-3 py-2">
            <p className="truncate font-medium">{displayName}</p>

            {user?.email && (
              <p className="mt-1 truncate text-xs text-muted-foreground">{user.email}</p>
            )}
          </div>

          <div className="my-1 h-px bg-border" />

          <Link
            to="/account"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="flex min-h-11 items-center rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
          >
            {t.account.menuSettings}
          </Link>

          <Link
            to="/progress"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="flex min-h-11 items-center rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
          >
            {t.account.menuProgress}
          </Link>

          <div className="my-1 h-px bg-border" />

          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            className="min-h-11 w-full rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
          >
            {t.common.logout}
          </button>
        </div>
      )}
    </div>
  );
}
