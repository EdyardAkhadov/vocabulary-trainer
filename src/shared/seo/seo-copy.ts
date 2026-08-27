import { extraSeoCopy } from './seo-copy-extra';

import type { AppLanguage } from '@/shared/i18n/translations';

export type SeoCopy = {
  home: { title: string; description: string };
  login: { title: string; description: string };
  register: { title: string; description: string };
  forgotPassword: { title: string; description: string };
  resetPassword: { title: string; description: string };
  app: { title: string; description: string };
};

const baseSeoCopy: Partial<Record<AppLanguage, SeoCopy>> & { en: SeoCopy } = {
  en: {
    home: {
      title: 'Vocab — Learn Vocabulary with Flashcards and Tests',
      description:
        'Learn vocabulary with custom flashcards, tests and progress tracking. Create your own language pairs, topics and word collections with Vocab.',
    },
    login: {
      title: 'Sign in | Vocab',
      description: 'Sign in to Vocab and continue learning your vocabulary.',
    },
    register: {
      title: 'Create account | Vocab',
      description: 'Create a Vocab account and start learning vocabulary with flashcards and tests.',
    },
    forgotPassword: {
      title: 'Reset password | Vocab',
      description: 'Request a password reset link for your Vocab account.',
    },
    resetPassword: {
      title: 'Create new password | Vocab',
      description: 'Create a new password for your Vocab account.',
    },
    app: {
      title: 'Vocab App',
      description: 'Your private Vocab learning workspace.',
    },
  },
  ru: {
    home: {
      title: 'Vocab — учите слова с карточками и тестами',
      description:
        'Учите слова с собственными карточками, тестами и отслеживанием прогресса. Создавайте языковые пары, темы и коллекции слов в Vocab.',
    },
    login: {
      title: 'Войти | Vocab',
      description: 'Войдите в Vocab и продолжайте изучать слова.',
    },
    register: {
      title: 'Создать аккаунт | Vocab',
      description: 'Создайте аккаунт Vocab и начните учить слова с карточками и тестами.',
    },
    forgotPassword: {
      title: 'Восстановить пароль | Vocab',
      description: 'Получите ссылку для восстановления пароля аккаунта Vocab.',
    },
    resetPassword: {
      title: 'Новый пароль | Vocab',
      description: 'Создайте новый пароль для аккаунта Vocab.',
    },
    app: {
      title: 'Приложение Vocab',
      description: 'Ваше личное пространство для изучения слов в Vocab.',
    },
  },
  uk: {
    home: {
      title: 'Vocab — вивчайте слова з картками й тестами',
      description:
        'Вивчайте слова з власними картками, тестами та відстеженням прогресу. Створюйте мовні пари, теми й колекції слів у Vocab.',
    },
    login: {
      title: 'Увійти | Vocab',
      description: 'Увійдіть у Vocab і продовжуйте вивчати слова.',
    },
    register: {
      title: 'Створити акаунт | Vocab',
      description: 'Створіть акаунт Vocab і почніть вивчати слова з картками та тестами.',
    },
    forgotPassword: {
      title: 'Відновити пароль | Vocab',
      description: 'Отримайте посилання для відновлення пароля акаунта Vocab.',
    },
    resetPassword: {
      title: 'Новий пароль | Vocab',
      description: 'Створіть новий пароль для акаунта Vocab.',
    },
    app: {
      title: 'Застосунок Vocab',
      description: 'Ваш приватний простір для вивчення слів у Vocab.',
    },
  },
  de: {
    home: {
      title: 'Vocab — Vokabeln mit Karteikarten und Tests lernen',
      description:
        'Lerne Vokabeln mit eigenen Karteikarten, Tests und Fortschrittsanzeige. Erstelle Sprachpaare, Themen und Wortsammlungen mit Vocab.',
    },
    login: {
      title: 'Anmelden | Vocab',
      description: 'Melde dich bei Vocab an und lerne weiter Vokabeln.',
    },
    register: {
      title: 'Konto erstellen | Vocab',
      description: 'Erstelle ein Vocab-Konto und lerne Vokabeln mit Karteikarten und Tests.',
    },
    forgotPassword: {
      title: 'Passwort zurücksetzen | Vocab',
      description: 'Fordere einen Link zum Zurücksetzen deines Vocab-Passworts an.',
    },
    resetPassword: {
      title: 'Neues Passwort | Vocab',
      description: 'Erstelle ein neues Passwort für dein Vocab-Konto.',
    },
    app: {
      title: 'Vocab App',
      description: 'Dein privater Lernbereich in Vocab.',
    },
  },
  es: {
    home: {
      title: 'Vocab — aprende vocabulario con tarjetas y tests',
      description:
        'Aprende vocabulario con tarjetas personalizadas, tests y seguimiento del progreso. Crea pares de idiomas, temas y colecciones de palabras con Vocab.',
    },
    login: {
      title: 'Iniciar sesión | Vocab',
      description: 'Inicia sesión en Vocab y continúa aprendiendo vocabulario.',
    },
    register: {
      title: 'Crear cuenta | Vocab',
      description: 'Crea una cuenta de Vocab y empieza a aprender vocabulario con tarjetas y tests.',
    },
    forgotPassword: {
      title: 'Restablecer contraseña | Vocab',
      description: 'Solicita un enlace para restablecer la contraseña de tu cuenta de Vocab.',
    },
    resetPassword: {
      title: 'Nueva contraseña | Vocab',
      description: 'Crea una nueva contraseña para tu cuenta de Vocab.',
    },
    app: {
      title: 'Aplicación Vocab',
      description: 'Tu espacio privado de aprendizaje en Vocab.',
    },
  },
};

export const seoCopy: Partial<Record<AppLanguage, SeoCopy>> & { en: SeoCopy } = {
  ...baseSeoCopy,
  ...extraSeoCopy,
};
