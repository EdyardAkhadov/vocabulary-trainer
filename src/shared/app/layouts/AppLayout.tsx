import { Link, Outlet, useLocation } from 'react-router';

import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { AccountMenu } from '@/features/account/AccountMenu';
import { SiteFooter } from '@/features/legal/SiteFooter';

export function AppLayout() {
  const location = useLocation();
  const { t } = useAppLanguage();
  const isStudyScreen = location.pathname.endsWith('/cards') || location.pathname.endsWith('/test');

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-2 px-4 sm:h-16 sm:px-6">
          <Link to="/app" className="flex shrink-0 items-center" aria-label="Vocab">
            <img src="/vocab_logo.png" alt="Vocab" className="h-8 w-auto sm:h-9" />
          </Link>

          {!isStudyScreen && (
            <div className="ml-auto flex min-w-0 items-center gap-1 sm:gap-2">
              <Link
                to="/app/dictionary"
                className="hidden min-h-10 items-center rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:inline-flex"
              >
                {t.vocabulary.dictionaries}
              </Link>
              <Link
                to="/app/quick-add"
                aria-label={t.vocabulary.quickAdd}
                className="inline-flex min-h-10 items-center justify-center rounded-lg bg-brand px-3 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand/90"
              >
                <span className="sm:hidden">+</span>
                <span className="hidden sm:inline">+ {t.vocabulary.quickAdd}</span>
              </Link>
              <AccountMenu />
            </div>
          )}

          {isStudyScreen && <AccountMenu />}
        </div>
      </header>

      <div key={location.pathname} className="vocab-page-enter min-h-0 flex-1">
        <Outlet />
      </div>

      {!isStudyScreen && <SiteFooter />}
    </div>
  );
}
