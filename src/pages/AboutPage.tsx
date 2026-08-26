import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { LegalPageLayout } from '@/features/legal/LegalPageLayout';
import { getLegalContent } from '@/shared/legal/content';

export function AboutPage() {
  const { language } = useAppLanguage();
  const content = getLegalContent(language).about;

  return (
    <LegalPageLayout>
      <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <h1 className="text-3xl font-bold tracking-tight">{content.title}</h1>
        <p className="mt-6 text-base leading-7 text-muted-foreground">{content.intro}</p>
        <p className="mt-4 text-base leading-7 text-muted-foreground">{content.body}</p>
      </main>
    </LegalPageLayout>
  );
}
