import { useState, type FormEvent } from 'react';
import { Link, Navigate } from 'react-router';

import { useAuth } from '@/app/providers/AuthProvider';
import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from '@/features/auth/api';

export function LoginPage() {
  const { user, isLoading } = useAuth();

  const { t } = useAppLanguage();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">{t.common.loading}</p>
      </main>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      setError(t.validation.emailPasswordRequired);
      return;
    }

    try {
      setIsSubmitting(true);

      await signIn(trimmedEmail, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errors.signIn);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <img src="/vocab_logo.png" alt="Vocab" className="h-14 w-auto" />
        </div>

        <section className="rounded-2xl border bg-card p-8 shadow-sm">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">{t.auth.welcomeBack}</h1>

            <p className="mt-2 text-sm text-muted-foreground">{t.auth.signInDescription}</p>
          </div>

          {error && (
            <div className="mt-6 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="login-email">{t.auth.email}</Label>

              <Input
                id="login-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                placeholder="you@example.com"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="login-password">{t.auth.password}</Label>

                <Link
                  to="/forgot-password"
                  className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  {t.auth.forgotPassword}
                </Link>
              </div>

              <Input
                id="login-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                disabled={isSubmitting}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? t.auth.signingIn : t.auth.signIn}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t.auth.noAccount}{' '}
            <Link
              to="/register"
              className="font-medium text-foreground underline underline-offset-4"
            >
              {t.auth.signUp}
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
