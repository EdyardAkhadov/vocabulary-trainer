import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { PublicMobileMenu } from '@/features/legal/PublicMobileMenu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordRequirements } from '@/features/auth/PasswordRequirements';
import { supabase } from '@/lib/supabase';
import { detectBrowserLanguage } from '@/shared/i18n/detect-language';
import { translations, type AppLanguage } from '@/shared/i18n/translations';
import { validatePassword } from '@/shared/utils/password';

export function ResetPasswordPage() {
  const [language] = useState<AppLanguage>(detectBrowserLanguage);
  const t = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState<string | null>(null);

  const [success, setSuccess] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    const validation = validatePassword(password);

    if (!validation.isValid) {
      setError(t.password.invalid);
      return;
    }

    if (password !== confirmPassword) {
      setError(t.validation.passwordsDoNotMatch);
      return;
    }

    try {
      setIsSubmitting(true);

      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        throw updateError;
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.recovery.changeError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-muted/30 px-4 py-6 sm:p-6">
      <PublicMobileMenu className="fixed right-4 top-4 z-50" languageOverride={language} />
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <img src="/vocab_logo.png" alt="Vocab" className="h-12 w-auto sm:h-14" />
        </div>

        <section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
          <h1 className="text-2xl font-semibold">{t.recovery.resetTitle}</h1>

          {success ? (
            <>
              <p className="mt-3 text-sm text-muted-foreground">{t.recovery.changed}</p>

              <Link
                to="/login"
                className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {t.recovery.signIn}
              </Link>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {error && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="reset-new-password">{t.account.newPassword}</Label>

                <Input
                  id="reset-new-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="new-password"
                  disabled={isSubmitting}
                />
              </div>

              <PasswordRequirements password={password} tOverride={t} />

              <div className="space-y-2">
                <Label htmlFor="reset-confirm-password">{t.account.confirmNewPassword}</Label>

                <Input
                  id="reset-confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  autoComplete="new-password"
                  disabled={isSubmitting}
                />
              </div>

              <Button type="submit" className="min-h-11 w-full" disabled={isSubmitting}>
                {isSubmitting ? t.recovery.changing : t.recovery.changePassword}
              </Button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
