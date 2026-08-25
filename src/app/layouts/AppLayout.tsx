import { Link, Outlet } from 'react-router';

import { AccountMenu } from '@/features/account/AccountMenu';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center" aria-label="Vocab">
            <img src="/vocab_logo.png" alt="Vocab" className="h-8 w-auto sm:h-9" />
          </Link>

          <AccountMenu />
        </div>
      </header>

      <Outlet />
    </div>
  );
}
