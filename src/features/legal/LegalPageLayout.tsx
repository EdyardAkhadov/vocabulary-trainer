import type { ReactNode } from 'react';
import { Link } from 'react-router';

import { PublicMobileMenu } from '@/features/legal/PublicMobileMenu';
import { SiteFooter } from '@/features/legal/SiteFooter';

export function LegalPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="border-b bg-background">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
          <Link to="/" aria-label="Vocab">
            <img src="/vocab_logo.png" alt="Vocab" className="h-8 w-auto sm:h-9" />
          </Link>

          <PublicMobileMenu />
        </div>
      </header>

      <div className="vocab-page-enter flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}
