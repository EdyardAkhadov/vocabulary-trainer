import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';

import { useSiteLanguage } from '@/app/providers/SiteLanguageProvider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { AppLanguage } from '@/shared/i18n/translations';
import { getLegalContent } from '@/shared/legal/content';

type PublicMobileMenuProps = {
  className?: string;
  languageOverride?: AppLanguage;
};

export function PublicMobileMenu({ className, languageOverride }: PublicMobileMenuProps) {
  const { language: siteLanguage } = useSiteLanguage();
  const language = languageOverride ?? siteLanguage;
  const content = getLegalContent(language);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={menuRef} className={cn('relative md:hidden', className)}>
      <Button
        type="button"
        variant="outline"
        aria-label="Menu"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="size-11 p-0 text-lg"
        onClick={() => setIsOpen((current) => !current)}
      >
        ☰
      </Button>

      {isOpen && (
        <div
          role="menu"
          className="vocab-pop-in absolute right-0 top-full z-50 mt-2 w-[min(18rem,calc(100vw-2rem))] rounded-xl border bg-popover p-2 text-popover-foreground shadow-lg"
        >
          <Link
            to="/about"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="flex min-h-11 items-center rounded-lg px-3 py-2 text-sm hover:bg-muted"
          >
            {content.footer.about}
          </Link>
          <Link
            to="/contact"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="flex min-h-11 items-center rounded-lg px-3 py-2 text-sm hover:bg-muted"
          >
            {content.footer.contact}
          </Link>
          <Link
            to="/privacy"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="flex min-h-11 items-center rounded-lg px-3 py-2 text-sm hover:bg-muted"
          >
            {content.footer.privacy}
          </Link>
          <Link
            to="/terms"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="flex min-h-11 items-center rounded-lg px-3 py-2 text-sm hover:bg-muted"
          >
            {content.footer.terms}
          </Link>
        </div>
      )}
    </div>
  );
}
