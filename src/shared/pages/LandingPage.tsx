import { Link } from 'react-router';

import { useAuth } from '@/app/providers/AuthProvider';
import { useSiteLanguage } from '@/app/providers/SiteLanguageProvider';
import { buttonVariants } from '@/components/ui/button';
import { PublicMobileMenu } from '@/features/legal/PublicMobileMenu';
import { SiteFooter } from '@/features/legal/SiteFooter';
import { LanguageSwitcher } from '@/features/language/LanguageSwitcher';
import { cn } from '@/lib/utils';
import { landingTranslations } from '@/shared/i18n/landing-translations';

const featureNumbers = ['01', '02', '03', '04'] as const;

export function LandingPage() {
  const { user } = useAuth();
  const { language, t } = useSiteLanguage();
  const copy = landingTranslations[language] ?? landingTranslations.en;

  const primaryTarget = user ? '/app' : '/register';

  const features = [
    {
      title: copy.features.cardsTitle,
      description: copy.features.cardsDescription,
    },
    {
      title: copy.features.testsTitle,
      description: copy.features.testsDescription,
    },
    {
      title: copy.features.progressTitle,
      description: copy.features.progressDescription,
    },
    {
      title: copy.features.languagesTitle,
      description: copy.features.languagesDescription,
    },
  ];

  const steps = [
    {
      title: copy.steps.createTitle,
      description: copy.steps.createDescription,
    },
    {
      title: copy.steps.addTitle,
      description: copy.steps.addDescription,
    },
    {
      title: copy.steps.learnTitle,
      description: copy.steps.learnDescription,
    },
  ];

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
          <Link to="/" className="flex shrink-0 items-center" aria-label="Vocab">
            <img src="/vocab_logo.png" alt="Vocab" className="h-8 w-auto sm:h-9" />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Landing page">
            <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {copy.nav.features}
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {copy.nav.howItWorks}
            </a>
          </nav>

          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            <div className="hidden items-center gap-2 md:flex">
              {user ? (
                <Link to="/app" className={buttonVariants({ variant: 'brand', size: 'lg' })}>
                  {copy.nav.openApp}
                </Link>
              ) : (
                <>
                  <Link to="/login" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
                    {copy.nav.signIn}
                  </Link>
                  <Link to="/register" className={buttonVariants({ variant: 'brand', size: 'lg' })}>
                    {copy.nav.startLearning}
                  </Link>
                </>
              )}
            </div>

            <PublicMobileMenu />
          </div>
        </div>
      </header>

      <main className="vocab-page-enter flex-1">
        <section className="overflow-hidden border-b">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(24rem,0.95fr)] lg:items-center lg:gap-16 lg:px-8 lg:py-28">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-semibold tracking-wide text-brand">
                {copy.hero.eyebrow}
              </p>

              <h1 className="max-w-4xl text-4xl font-bold tracking-[-0.04em] sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                {copy.hero.title}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                {copy.hero.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to={primaryTarget}
                  className={cn(buttonVariants({ variant: 'brand', size: 'lg' }), 'h-12 px-5 text-base sm:h-11')}
                >
                  {user ? copy.nav.openApp : copy.hero.primary}
                </Link>

                <a
                  href="#how-it-works"
                  className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-12 px-5 text-base sm:h-11')}
                >
                  {copy.hero.secondary}
                </a>
              </div>

              <div className="mt-5 sm:hidden">
                <LanguageSwitcher />
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:mx-0">
              <div className="absolute -inset-10 -z-10 rounded-full bg-brand/10 blur-3xl" aria-hidden="true" />

              <div className="rounded-[1.75rem] border bg-card p-3 shadow-xl shadow-foreground/5 sm:p-4">
                <div className="overflow-hidden rounded-[1.25rem] border bg-background">
                  <div className="flex items-center justify-between border-b px-4 py-3 sm:px-5">
                    <img src="/vocab_logo.png" alt="" className="h-6 w-auto" />
                    <div className="flex gap-1.5" aria-hidden="true">
                      <span className="size-2 rounded-full bg-muted-foreground/25" />
                      <span className="size-2 rounded-full bg-muted-foreground/25" />
                      <span className="size-2 rounded-full bg-muted-foreground/25" />
                    </div>
                  </div>

                  <div className="space-y-4 p-4 sm:p-6">
                    <div className="rounded-xl border p-4">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-xs text-muted-foreground">{copy.preview.learned}</p>
                          <p className="mt-1 text-xl font-bold">18 / 24</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{copy.preview.remaining}</p>
                          <p className="mt-1 text-xl font-bold">6</p>
                        </div>
                      </div>
                      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
                        <div className="h-full w-3/4 rounded-full bg-brand" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-lg bg-primary px-3 py-2 text-center text-xs font-medium text-primary-foreground">
                        {copy.preview.sourceLabel} → {copy.preview.targetLabel}
                      </div>
                      <div className="rounded-lg border px-3 py-2 text-center text-xs font-medium">
                        {copy.preview.targetLabel} → {copy.preview.sourceLabel}
                      </div>
                    </div>

                    <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border bg-card px-6 py-10 text-center sm:min-h-72">
                      <p className="text-xs text-muted-foreground">{copy.preview.sourceLabel}</p>
                      <p className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                        {copy.preview.sourceWord}
                      </p>
                      <div className="my-6 h-px w-12 bg-border" />
                      <p className="text-xs text-muted-foreground">{copy.preview.targetLabel}</p>
                      <p className="mt-2 text-xl font-medium sm:text-2xl">{copy.preview.targetWord}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-lg border px-3 py-3 text-center text-xs font-medium sm:text-sm">
                        {t.cards.stillLearning}
                      </div>
                      <div className="rounded-lg bg-primary px-3 py-3 text-center text-xs font-medium text-primary-foreground sm:text-sm">
                        {t.cards.rememberedButton}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="scroll-mt-20 border-b bg-muted/20">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold tracking-wide text-brand">{copy.features.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
                {copy.features.title}
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                {copy.features.description}
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
              {features.map((feature, index) => (
                <article key={feature.title} className="rounded-2xl border bg-background p-5 sm:p-6">
                  <span className="inline-flex size-9 items-center justify-center rounded-lg bg-brand/10 text-xs font-bold text-brand">
                    {featureNumbers[index]}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-20 border-b">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold tracking-wide text-brand">{copy.steps.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
                {copy.steps.title}
              </h2>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-3 lg:mt-12">
              {steps.map((step, index) => (
                <article key={step.title} className="relative border-l-2 border-brand/30 pl-5 md:border-l-0 md:border-t-2 md:pl-0 md:pt-6">
                  <p className="text-sm font-bold text-brand">0{index + 1}</p>
                  <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/20">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="overflow-hidden rounded-3xl border bg-foreground px-6 py-10 text-background sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-14">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold tracking-[-0.03em] sm:text-4xl">{copy.cta.title}</h2>
                <p className="mt-3 max-w-xl leading-7 text-background/70">{copy.cta.description}</p>
              </div>

              <Link
                to={primaryTarget}
                className="mt-7 inline-flex h-12 items-center justify-center rounded-lg bg-brand px-6 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand/90 lg:mt-0"
              >
                {user ? copy.cta.openApp : copy.cta.button}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
