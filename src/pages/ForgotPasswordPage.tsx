import { useState, type FormEvent } from 'react';
import { Link } from 'react-router';

import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { Button } from '@/components/ui/button';
import { PublicMobileMenu } from '@/features/legal/PublicMobileMenu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { requestPasswordReset } from '@/features/auth/api';

export function ForgotPasswordPage() {
  const { t } = useAppLanguage();

  const [email, setEmail] = useState('');

  const [error, setError] = useState<string | null>(null);

  const [success, setSuccess] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    if (!email.trim()) {
      setError(t.recovery.enterEmail);
      return;
    }

    try {
      setIsSubmitting(true);

      await requestPasswordReset(email.trim());

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.recovery.sendError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-muted/30 px-4 py-6 sm:p-6">
      <PublicMobileMenu className="fixed right-4 top-4 z-50" />
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <img src="/vocab_logo.png" alt="Vocab" className="h-12 w-auto sm:h-14" />
        </div>

        <section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
          <h1 className="text-2xl font-semibold">{t.recovery.forgotTitle}</h1>

          {success ? (
            <>
              <p className="mt-3 text-sm text-muted-foreground">{t.recovery.emailSent}</p>

              <Link
                to="/login"
                className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {t.recovery.backToSignIn}
              </Link>
            </>
          ) : (
            <>
              <p className="mt-2 text-sm text-muted-foreground">{t.recovery.forgotDescription}</p>

              {error && (
                <div className="mt-5 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">{t.auth.email}</Label>

                  <Input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    placeholder="you@example.com"
                    disabled={isSubmitting}
                  />
                </div>

                <Button type="submit" className="min-h-11 w-full" disabled={isSubmitting}>
                  {isSubmitting ? t.recovery.sending : t.recovery.sendLink}
                </Button>
              </form>

              <p className="mt-6 text-center text-sm">
                <Link
                  to="/login"
                  className="text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  {t.recovery.backToSignIn}
                </Link>
              </p>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
