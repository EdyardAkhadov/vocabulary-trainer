import { Link, Outlet } from 'react-router';

import { AccountMenu } from '@/features/account/AccountMenu';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center">
            <img src="/vocab_logo.png" alt="Vocab" className="h-9 w-auto" />
          </Link>

          <AccountMenu />
        </div>
      </header>

      <Outlet />
    </div>
  );
}
