import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { validatePassword } from '@/shared/utils/password';

type PasswordRequirementsProps = {
  password: string;
};

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  const { t } = useAppLanguage();

  const validation = validatePassword(password);

  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <p className="text-sm font-medium">{t.password.requirementsTitle}</p>

      <div className="mt-3 space-y-2 text-sm">
        <Requirement isValid={validation.hasMinimumLength} label={t.password.minimumLength} />

        <Requirement isValid={validation.hasLowercase} label={t.password.lowercase} />

        <Requirement isValid={validation.hasUppercase} label={t.password.uppercase} />

        <Requirement isValid={validation.hasNumber} label={t.password.number} />
      </div>
    </div>
  );
}

type RequirementProps = {
  isValid: boolean;
  label: string;
};

function Requirement({ isValid, label }: RequirementProps) {
  return (
    <div className="flex items-center gap-2">
      <span className={isValid ? 'font-medium text-foreground' : 'text-muted-foreground'}>
        {isValid ? '✓' : '○'}
      </span>

      <span className={isValid ? 'text-foreground' : 'text-muted-foreground'}>{label}</span>
    </div>
  );
}
