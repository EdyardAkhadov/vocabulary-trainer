import { Link, Outlet, useLocation } from 'react-router';

import { AccountMenu } from '@/features/account/AccountMenu';
import { SiteFooter } from '@/features/legal/SiteFooter';

export function AppLayout() {
  const location = useLocation();
  const isStudyScreen = location.pathname.endsWith('/cards') || location.pathname.endsWith('/test');

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center" aria-label="Vocab">
            <img src="/vocab_logo.png" alt="Vocab" className="h-8 w-auto sm:h-9" />
          </Link>

          <AccountMenu />
        </div>
      </header>

      <div key={location.pathname} className="vocab-page-enter min-h-0 flex-1">
        <Outlet />
      </div>

      {!isStudyScreen && <SiteFooter />}
    </div>
  );
}
