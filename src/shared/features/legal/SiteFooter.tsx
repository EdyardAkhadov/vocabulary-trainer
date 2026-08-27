import { Link, useLocation } from 'react-router';

import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { useSiteLanguage } from '@/app/providers/SiteLanguageProvider';
import { getLegalContent } from '@/shared/legal/content';

export function SiteFooter() {
  const location = useLocation();
  const { language: appLanguage } = useAppLanguage();
  const { language: siteLanguage } = useSiteLanguage();
  const language = location.pathname === '/app' || location.pathname.startsWith('/app/')
    ? appLanguage
    : siteLanguage;
  const content = getLegalContent(language);

  return (
    <footer className="mt-auto hidden border-t bg-background md:block">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-6 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Vocab</p>

        <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Footer">
          <Link to="/about" className="transition-colors hover:text-foreground">{content.footer.about}</Link>
          <Link to="/contact" className="transition-colors hover:text-foreground">{content.footer.contact}</Link>
          <Link to="/privacy" className="transition-colors hover:text-foreground">{content.footer.privacy}</Link>
          <Link to="/terms" className="transition-colors hover:text-foreground">{content.footer.terms}</Link>
        </nav>
      </div>
    </footer>
  );
}
