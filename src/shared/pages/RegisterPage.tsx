import { useEffect, useState, type FormEvent } from 'react';
import { Link, Navigate } from 'react-router';

import { useAuth } from '@/app/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { PublicMobileMenu } from '@/features/legal/PublicMobileMenu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PasswordRequirements } from '@/features/auth/PasswordRequirements';
import { signUp } from '@/features/auth/api';
import { APP_LANGUAGE_OPTIONS } from '@/shared/i18n/app-language-options';
import { detectBrowserLanguage } from '@/shared/i18n/detect-language';
import { translations, type AppLanguage } from '@/shared/i18n/translations';
import { validatePassword } from '@/shared/utils/password';

export function RegisterPage() {
  const { user, isLoading } = useAuth();

  const [language, setLanguage] = useState<AppLanguage>(detectBrowserLanguage);
  const t = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const [nickname, setNickname] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState<string | null>(null);

  const [success, setSuccess] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [acceptedLegal, setAcceptedLegal] = useState(false);

  if (isLoading) {
    return (
      <main className="flex min-h-dvh items-center justify-center">
        <p className="text-sm text-muted-foreground">{t.common.loading}</p>
      </main>
    );
  }

  if (user) {
    return <Navigate to="/app" replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    const trimmedNickname = nickname.trim();

    const trimmedEmail = email.trim();

    if (!trimmedNickname || !trimmedEmail || !password || !confirmPassword) {
      setError(t.validation.fillAllFields);
      return;
    }

    if (trimmedNickname.length < 2) {
      setError(t.account.nicknameTooShort);
      return;
    }

    const passwordValidation = validatePassword(password);

    if (!passwordValidation.isValid) {
      setError(t.password.invalid);
      return;
    }

    if (password !== confirmPassword) {
      setError(t.validation.passwordsDoNotMatch);
      return;
    }

    if (!acceptedLegal) {
      setError(t.auth.legalRequired);
      return;
    }

    try {
      setIsSubmitting(true);

      await signUp(trimmedEmail, password, trimmedNickname, language);

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errors.signUp);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (success) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-muted/30 px-4 py-6 sm:p-6">
        <PublicMobileMenu className="fixed right-4 top-4 z-50" languageOverride={language} />
        <div className="w-full max-w-md text-center">
          <img src="/vocab_logo.png" alt="Vocab" className="mx-auto h-12 w-auto sm:h-14" />

          <section className="mt-8 rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
            <h1 className="text-2xl font-semibold">{t.auth.checkEmail}</h1>

            <p className="mt-3 text-sm text-muted-foreground">{t.auth.confirmationSent}</p>

            <Link
              to="/login"
              className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t.auth.goToSignIn}
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-muted/30 px-4 py-6 sm:p-6">
      <PublicMobileMenu className="fixed right-4 top-4 z-50" languageOverride={language} />
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <img src="/vocab_logo.png" alt="Vocab" className="h-12 w-auto sm:h-14" />
        </div>

        <section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">{t.auth.createAccount}</h1>

            <p className="mt-2 text-sm text-muted-foreground">{t.auth.registerDescription}</p>
          </div>

          {error && (
            <div className="mt-6 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="register-nickname">{t.auth.nickname}</Label>

              <Input
                id="register-nickname"
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
                autoComplete="nickname"
                placeholder={t.auth.nicknamePlaceholder}
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-language">{t.auth.interfaceLanguage}</Label>

              <Select
                items={APP_LANGUAGE_OPTIONS}
                value={language}
                onValueChange={(value) => {
                  if (value) {
                    setLanguage(value as AppLanguage);
                  }
                }}
                disabled={isSubmitting}
              >
                <SelectTrigger id="register-language" className="min-h-11 w-full">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {APP_LANGUAGE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-email">{t.auth.email}</Label>

              <Input
                id="register-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                placeholder="you@example.com"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-password">{t.auth.password}</Label>

              <Input
                id="register-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                disabled={isSubmitting}
              />
            </div>

            <PasswordRequirements password={password} tOverride={t} />

            <div className="space-y-2">
              <Label htmlFor="register-confirm-password">{t.auth.confirmPassword}</Label>

              <Input
                id="register-confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                autoComplete="new-password"
                disabled={isSubmitting}
              />
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border bg-muted/20 p-3 text-sm leading-5">
              <input
                type="checkbox"
                checked={acceptedLegal}
                onChange={(event) => setAcceptedLegal(event.target.checked)}
                disabled={isSubmitting}
                className="mt-0.5 size-5 shrink-0 accent-foreground"
              />
              <span className="text-muted-foreground">
                {t.auth.acceptLegalPrefix}{' '}
                <Link to="/terms" target="_blank" className="font-medium text-foreground underline underline-offset-4">
                  {t.auth.termsOfService}
                </Link>{' '}
                {t.auth.legalAnd}{' '}
                <Link to="/privacy" target="_blank" className="font-medium text-foreground underline underline-offset-4">
                  {t.auth.privacyPolicy}
                </Link>.
              </span>
            </label>

            <Button type="submit" className="min-h-11 w-full" disabled={isSubmitting}>
              {isSubmitting ? t.auth.creatingAccount : t.auth.createAccount}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t.auth.alreadyHaveAccount}{' '}
            <Link to="/login" className="font-medium text-foreground underline underline-offset-4">
              {t.auth.signIn}
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
