import { useSiteLanguage } from '@/app/providers/SiteLanguageProvider';
import { LegalPageLayout } from '@/features/legal/LegalPageLayout';
import { getLegalContent, LEGAL_VERSION } from '@/shared/legal/content';

export function TermsPage() {
  const { language } = useSiteLanguage();
  const content = getLegalContent(language).terms;

  return (
    <LegalPageLayout>
      <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <h1 className="text-3xl font-bold tracking-tight">{content.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{content.updated}: {LEGAL_VERSION}</p>

        <div className="mt-8 space-y-8">
          {content.sections.map(([title, body]) => (
            <section key={title}>
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">{body}</p>
            </section>
          ))}
        </div>
      </main>
    </LegalPageLayout>
  );
}
