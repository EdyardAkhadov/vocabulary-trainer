import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { LegalPageLayout } from '@/features/legal/LegalPageLayout';
import { CONTACT_EMAIL } from '@/shared/config/app';
import { getLegalContent } from '@/shared/legal/content';

export function ContactPage() {
  const { language } = useAppLanguage();
  const content = getLegalContent(language).contact;

  return (
    <LegalPageLayout>
      <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <h1 className="text-3xl font-bold tracking-tight">{content.title}</h1>
        <p className="mt-6 text-base leading-7 text-muted-foreground">{content.intro}</p>

        <div className="mt-8 rounded-2xl border bg-card p-5 sm:p-6">
          {CONTACT_EMAIL ? (
            <a className="font-medium underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          ) : (
            <p className="text-sm text-muted-foreground">{content.noEmail}</p>
          )}
        </div>
      </main>
    </LegalPageLayout>
  );
}
