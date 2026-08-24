import { useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { translations } from '@/shared/i18n/translations';
import { useAuth } from '@/app/providers/AuthProvider';
import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { useProfile } from '@/app/providers/ProfileProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { updateProfile } from '@/entities/profile/api';
import { updateEmail, updatePassword } from '@/features/auth/api';
import { PasswordRequirements } from '@/features/auth/PasswordRequirements';
import type { AppLanguage } from '@/shared/i18n/translations';
import { validatePassword } from '@/shared/utils/password';
import { ThemeSelector } from '@/features/theme/ThemeSelector';
const languageOptions = [
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'ru',
    label: 'Русский',
  },
  {
    value: 'uk',
    label: 'Українська',
  },
  {
    value: 'de',
    label: 'Deutsch',
  },
  {
    value: 'es',
    label: 'Español',
  },
] satisfies {
  value: AppLanguage;
  label: string;
}[];

export function AccountPage() {
  const { user } = useAuth();

  const { profile, setProfile } = useProfile();

  const { language, setLanguage, t } = useAppLanguage();

  const [nickname, setNickname] = useState(profile?.nickname ?? '');

  const [selectedLanguage, setSelectedLanguage] = useState<AppLanguage>(
    profile?.app_language ?? language,
  );

  const [email, setEmail] = useState(user?.email ?? '');

  const [currentPassword, setCurrentPassword] = useState('');

  const [newPassword, setNewPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const [message, setMessage] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);

  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  async function handleProfileSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!user) {
      return;
    }

    setError(null);
    setMessage(null);

    const trimmedNickname = nickname.trim();

    if (trimmedNickname.length < 2) {
      setError(t.account.nicknameTooShort);
      return;
    }

    try {
      setIsSavingProfile(true);

      const updated = await updateProfile(user.id, {
        nickname: trimmedNickname,
        app_language: selectedLanguage,
      });

      setProfile(updated);

      setLanguage(updated.app_language);

      setNickname(updated.nickname);

      setMessage(translations[updated.app_language].account.profileUpdated);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errors.updatePair);
    } finally {
      setIsSavingProfile(false);
    }
  }

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);
    setMessage(null);

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError(t.account.enterNewEmail);
      return;
    }

    if (trimmedEmail === user?.email) {
      setError(t.account.sameEmail);
      return;
    }

    try {
      setIsUpdatingEmail(true);

      await updateEmail(trimmedEmail);

      setMessage(t.account.emailChangeRequested);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errors.loadData);
    } finally {
      setIsUpdatingEmail(false);
    }
  }

  async function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);
    setMessage(null);

    if (!currentPassword) {
      setError(t.account.enterCurrentPassword);
      return;
    }

    const passwordValidation = validatePassword(newPassword);

    if (!passwordValidation.isValid) {
      setError(t.password.invalid);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t.validation.passwordsDoNotMatch);
      return;
    }

    if (currentPassword === newPassword) {
      setError(t.account.samePassword);
      return;
    }

    try {
      setIsUpdatingPassword(true);

      await updatePassword(currentPassword, newPassword);

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      setMessage(t.account.passwordChanged);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.recovery.changeError);
    } finally {
      setIsUpdatingPassword(false);
    }
  }

  if (!user || !profile) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-8">
        <p className="text-sm text-muted-foreground">{t.common.loading}</p>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t.account.title}</h1>

            <p className="mt-2 text-muted-foreground">{t.account.description}</p>
          </div>

          <Link to="/" className="text-sm font-medium underline underline-offset-4">
            {t.common.back}
          </Link>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {message && <div className="mt-6 rounded-lg border bg-muted/60 p-4 text-sm">{message}</div>}

        <section className="mt-8 rounded-2xl border bg-card p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-semibold">{t.account.profile}</h2>

            <p className="mt-1 text-sm text-muted-foreground">{t.account.profileDescription}</p>
          </div>

          <form onSubmit={handleProfileSubmit} className="mt-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="nickname">{t.account.nickname}</Label>

              <Input
                id="nickname"
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
                autoComplete="nickname"
                disabled={isSavingProfile}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interface-language">{t.account.interfaceLanguage}</Label>

              <Select
                items={languageOptions}
                value={selectedLanguage}
                onValueChange={(value) => {
                  if (value) {
                    setSelectedLanguage(value as AppLanguage);
                  }
                }}
                disabled={isSavingProfile}
              >
                <SelectTrigger id="interface-language" className="w-full">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {languageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" disabled={isSavingProfile}>
              {isSavingProfile ? t.account.saving : t.common.saveChanges}
            </Button>
          </form>
        </section>

        <section className="mt-6 rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
          <div>
            <h2 className="text-xl font-semibold">{t.account.appearance}</h2>

            <p className="mt-1 text-sm text-muted-foreground">{t.account.appearanceDescription}</p>
          </div>

          <div className="mt-6">
            <ThemeSelector />
          </div>
        </section>

        <section className="mt-6 rounded-2xl border bg-card p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-semibold">{t.account.emailSection}</h2>

            <p className="mt-1 text-sm text-muted-foreground">{t.account.emailDescription}</p>
          </div>

          <form onSubmit={handleEmailSubmit} className="mt-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="account-email">{t.auth.email}</Label>

              <Input
                id="account-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                disabled={isUpdatingEmail}
              />

              <p className="text-xs text-muted-foreground">
                {t.account.currentEmail}: {user.email ?? ''}
              </p>
            </div>

            <Button type="submit" variant="outline" disabled={isUpdatingEmail}>
              {isUpdatingEmail ? t.account.sending : t.account.changeEmail}
            </Button>
          </form>
        </section>

        <section className="mt-6 rounded-2xl border bg-card p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-semibold">{t.account.security}</h2>

            <p className="mt-1 text-sm text-muted-foreground">{t.account.securityDescription}</p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="current-password">{t.account.currentPassword}</Label>

              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                autoComplete="current-password"
                disabled={isUpdatingPassword}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">{t.account.newPassword}</Label>

              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                autoComplete="new-password"
                disabled={isUpdatingPassword}
              />
            </div>

            <PasswordRequirements password={newPassword} />

            <div className="space-y-2">
              <Label htmlFor="confirm-new-password">{t.account.confirmNewPassword}</Label>

              <Input
                id="confirm-new-password"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                autoComplete="new-password"
                disabled={isUpdatingPassword}
              />
            </div>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button type="submit" variant="outline" disabled={isUpdatingPassword}>
                {isUpdatingPassword ? t.account.changing : t.account.changePassword}
              </Button>

              <Link
                to="/forgot-password"
                className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                {t.account.forgotPassword}
              </Link>
            </div>
          </form>
        </section>

        <section className="mt-6 rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold">{t.account.learning}</h2>

          <p className="mt-2 text-sm text-muted-foreground">{t.account.learningDescription}</p>

          <Link
            to="/progress"
            className="mt-5 inline-flex h-9 items-center justify-center rounded-lg border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
          >
            {t.account.openProgress}
          </Link>
        </section>
      </div>
    </main>
  );
}
