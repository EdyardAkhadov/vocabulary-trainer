import type { AppLanguage } from '@/shared/i18n/translations';

export const LEGAL_VERSION = '2026-08-25';

type LegalSection = readonly [string, string];

type LegalLocaleContent = {
  footer: { about: string; contact: string; privacy: string; terms: string };
  about: { title: string; intro: string; body: string };
  contact: { title: string; intro: string; noEmail: string };
  privacy: { title: string; updated: string; sections: readonly LegalSection[] };
  terms: { title: string; updated: string; sections: readonly LegalSection[] };
};

export const legalContent: Record<AppLanguage, LegalLocaleContent> = {
  en: {
    footer: { about: 'About', contact: 'Contact', privacy: 'Privacy', terms: 'Terms' },
    about: {
      title: 'About Vocab',
      intro: 'Vocab is a vocabulary-learning app for organizing language pairs, topics and words, then studying them with cards and tests.',
      body: 'The service is being developed as a cross-platform product. The web version is the primary client today, with mobile and offline support planned around the same account and learning data.',
    },
    contact: {
      title: 'Contact',
      intro: 'Use the contact details below for account, privacy, support or legal questions.',
      noEmail: 'A public support email will be added before Vocab is released publicly.',
    },
    privacy: {
      title: 'Privacy Policy',
      updated: 'Last updated',
      sections: [
        ['Data we process', 'Vocab may process your email address, nickname, interface preferences, language pairs, topics, vocabulary entries and learning progress. Authentication data is handled through Supabase Auth.'],
        ['Why we process it', 'We use this data to create and secure your account, synchronize your learning content, provide study features, restore access and improve reliability of the service.'],
        ['Storage and providers', 'Cloud account and learning data are stored using Supabase infrastructure. When offline support is introduced, copies of learning data may also be stored locally on your device and synchronized when a connection is available.'],
        ['Retention', 'Account-related data is kept while your account is active or as needed to provide the service. Data may be retained longer where required for security, legal obligations or dispute handling.'],
        ['Your choices and rights', 'Depending on applicable law, you may request access, correction, deletion or other controls over your personal data. You can also change profile information and account credentials from Vocab settings.'],
        ['Security', 'We use authenticated access, database access controls and encrypted transport. No online service can guarantee absolute security, so credentials should be kept private and unique.'],
        ['Changes', 'This policy may be updated as Vocab gains features such as offline storage, mobile apps or additional service providers. Material changes should be reflected here before they take effect.'],
      ],
    },
    terms: {
      title: 'Terms of Service',
      updated: 'Last updated',
      sections: [
        ['Using Vocab', 'You may use Vocab for lawful personal learning purposes. You are responsible for the accuracy of information you add and for keeping your account credentials secure.'],
        ['Accounts', 'You must provide a usable email address and must not access another person’s account without permission. You are responsible for activity performed through your account.'],
        ['Your content', 'You keep responsibility for vocabulary, notes and other learning content you add. You must not upload content that you do not have the right to use.'],
        ['Availability', 'Vocab is under active development. Features may change, be interrupted or contain errors. We aim to preserve user data and provide reasonable continuity but cannot promise uninterrupted availability.'],
        ['Acceptable use', 'Do not attempt to abuse, disrupt, reverse-engineer security controls, overload the service or use Vocab for unlawful activity.'],
        ['Account action', 'Access may be restricted where reasonably necessary for security, abuse prevention, legal compliance or serious violation of these terms.'],
        ['Changes to these terms', 'These terms may be updated as the service develops. The current version and update date will be published on this page.'],
      ],
    },
  },
  ru: {
    footer: { about: 'О приложении', contact: 'Контакты', privacy: 'Конфиденциальность', terms: 'Условия' },
    about: {
      title: 'О Vocab',
      intro: 'Vocab — приложение для изучения слов: языковые пары, темы, слова, карточки и тесты.',
      body: 'Сервис развивается как кроссплатформенный продукт. Сейчас основной клиент — веб-версия; мобильная и офлайн-работа планируются на базе того же аккаунта и учебных данных.',
    },
    contact: {
      title: 'Контакты',
      intro: 'Используйте контактные данные ниже для вопросов по аккаунту, конфиденциальности, поддержке или юридическим вопросам.',
      noEmail: 'Публичный email поддержки будет добавлен до публичного запуска Vocab.',
    },
    privacy: {
      title: 'Политика конфиденциальности',
      updated: 'Последнее обновление',
      sections: [
        ['Какие данные мы обрабатываем', 'Vocab может обрабатывать email, ник, настройки интерфейса, языковые пары, темы, словарные записи и прогресс обучения. Данные авторизации обрабатываются через Supabase Auth.'],
        ['Зачем это нужно', 'Данные используются для создания и защиты аккаунта, синхронизации учебных материалов, работы карточек и тестов, восстановления доступа и повышения надёжности сервиса.'],
        ['Хранение и поставщики', 'Облачные данные аккаунта и обучения хранятся с использованием инфраструктуры Supabase. После добавления офлайн-режима копии учебных данных также могут храниться локально на устройстве и синхронизироваться при подключении к интернету.'],
        ['Срок хранения', 'Данные аккаунта хранятся, пока аккаунт активен или пока это необходимо для предоставления сервиса. Некоторые данные могут храниться дольше для безопасности, выполнения закона или разрешения споров.'],
        ['Ваши права', 'В зависимости от применимого законодательства вы можете запросить доступ, исправление, удаление или иные действия с персональными данными. Данные профиля и учётные данные можно менять в настройках Vocab.'],
        ['Безопасность', 'Мы используем авторизованный доступ, правила доступа к базе и защищённую передачу данных. Ни один онлайн-сервис не может гарантировать абсолютную безопасность, поэтому пароль должен оставаться конфиденциальным и уникальным.'],
        ['Изменения политики', 'Политика может обновляться по мере появления офлайн-хранения, мобильных приложений или новых поставщиков сервисов. Существенные изменения должны быть отражены здесь до их вступления в силу.'],
      ],
    },
    terms: {
      title: 'Условия использования',
      updated: 'Последнее обновление',
      sections: [
        ['Использование Vocab', 'Vocab можно использовать в законных целях для личного обучения. Вы отвечаете за информацию, которую добавляете, и за безопасность данных для входа.'],
        ['Аккаунты', 'Необходимо указывать рабочий email и нельзя получать доступ к чужому аккаунту без разрешения. Вы отвечаете за действия, совершённые через ваш аккаунт.'],
        ['Ваш контент', 'Вы сохраняете ответственность за слова, заметки и другой учебный контент, который добавляете. Нельзя загружать материалы, на использование которых у вас нет прав.'],
        ['Доступность', 'Vocab активно разрабатывается. Функции могут меняться, временно не работать или содержать ошибки. Мы стремимся сохранять данные пользователей и поддерживать работу сервиса, но не можем гарантировать непрерывную доступность.'],
        ['Допустимое использование', 'Нельзя злоупотреблять сервисом, нарушать его работу, обходить механизмы безопасности, перегружать инфраструктуру или использовать Vocab для незаконной деятельности.'],
        ['Ограничение доступа', 'Доступ может быть ограничен, если это разумно необходимо для безопасности, предотвращения злоупотреблений, соблюдения закона или при серьёзном нарушении условий.'],
        ['Изменения условий', 'Условия могут обновляться по мере развития сервиса. Текущая версия и дата обновления публикуются на этой странице.'],
      ],
    },
  },
  uk: {
    footer: { about: 'Про застосунок', contact: 'Контакти', privacy: 'Конфіденційність', terms: 'Умови' },
    about: {
      title: 'Про Vocab',
      intro: 'Vocab — застосунок для вивчення слів: мовні пари, теми, слова, картки та тести.',
      body: 'Сервіс розвивається як кросплатформний продукт. Зараз основним клієнтом є вебверсія; мобільна та офлайн-робота плануються на основі того самого акаунта й навчальних даних.',
    },
    contact: {
      title: 'Контакти',
      intro: 'Використовуйте контактні дані нижче для питань щодо акаунта, конфіденційності, підтримки або юридичних питань.',
      noEmail: 'Публічний email підтримки буде додано до публічного запуску Vocab.',
    },
    privacy: {
      title: 'Політика конфіденційності',
      updated: 'Останнє оновлення',
      sections: [
        ['Які дані ми обробляємо', 'Vocab може обробляти email, нік, налаштування інтерфейсу, мовні пари, теми, словникові записи та прогрес навчання. Дані авторизації обробляються через Supabase Auth.'],
        ['Навіщо це потрібно', 'Дані використовуються для створення й захисту акаунта, синхронізації навчальних матеріалів, роботи карток і тестів, відновлення доступу та підвищення надійності сервісу.'],
        ['Зберігання та постачальники', 'Хмарні дані акаунта й навчання зберігаються з використанням інфраструктури Supabase. Після додавання офлайн-режиму копії навчальних даних також можуть зберігатися локально на пристрої та синхронізуватися після підключення до інтернету.'],
        ['Строк зберігання', 'Дані акаунта зберігаються, поки акаунт активний або поки це потрібно для надання сервісу. Деякі дані можуть зберігатися довше для безпеки, виконання вимог закону або вирішення спорів.'],
        ['Ваші права', 'Залежно від застосовного законодавства ви можете запитати доступ, виправлення, видалення або інші дії з персональними даними. Дані профілю та облікові дані можна змінювати в налаштуваннях Vocab.'],
        ['Безпека', 'Ми використовуємо авторизований доступ, правила доступу до бази та захищену передачу даних. Жоден онлайн-сервіс не може гарантувати абсолютну безпеку, тому пароль має залишатися конфіденційним і унікальним.'],
        ['Зміни політики', 'Політика може оновлюватися з появою офлайн-зберігання, мобільних застосунків або нових постачальників сервісів. Суттєві зміни мають бути відображені тут до набрання ними чинності.'],
      ],
    },
    terms: {
      title: 'Умови використання',
      updated: 'Останнє оновлення',
      sections: [
        ['Використання Vocab', 'Vocab можна використовувати в законних цілях для особистого навчання. Ви відповідаєте за інформацію, яку додаєте, і за безпеку даних для входу.'],
        ['Акаунти', 'Необхідно вказувати робочий email і не можна отримувати доступ до чужого акаунта без дозволу. Ви відповідаєте за дії, виконані через ваш акаунт.'],
        ['Ваш контент', 'Ви зберігаєте відповідальність за слова, нотатки та інший навчальний контент, який додаєте. Не можна завантажувати матеріали, на використання яких у вас немає прав.'],
        ['Доступність', 'Vocab активно розробляється. Функції можуть змінюватися, тимчасово не працювати або містити помилки. Ми прагнемо зберігати дані користувачів і підтримувати роботу сервісу, але не можемо гарантувати безперервну доступність.'],
        ['Допустиме використання', 'Не можна зловживати сервісом, порушувати його роботу, обходити механізми безпеки, перевантажувати інфраструктуру або використовувати Vocab для незаконної діяльності.'],
        ['Обмеження доступу', 'Доступ може бути обмежено, якщо це обґрунтовано необхідно для безпеки, запобігання зловживанням, дотримання закону або у разі серйозного порушення умов.'],
        ['Зміни умов', 'Умови можуть оновлюватися в міру розвитку сервісу. Поточна версія та дата оновлення публікуються на цій сторінці.'],
      ],
    },
  },
  de: {
    footer: { about: 'Über Vocab', contact: 'Kontakt', privacy: 'Datenschutz', terms: 'Bedingungen' },
    about: { title: 'Über Vocab', intro: 'Vocab ist eine App zum Organisieren und Lernen von Wortschatz mit Sprachpaaren, Themen, Karteikarten und Tests.', body: 'Der Dienst wird als plattformübergreifendes Produkt entwickelt. Heute ist die Webversion der Hauptclient; mobile und Offline-Funktionen sind mit demselben Konto und denselben Lerndaten geplant.' },
    contact: { title: 'Kontakt', intro: 'Nutze die folgenden Kontaktdaten für Fragen zu Konto, Datenschutz, Support oder rechtlichen Themen.', noEmail: 'Eine öffentliche Support-E-Mail wird vor dem öffentlichen Start von Vocab ergänzt.' },
    privacy: { title: 'Datenschutzerklärung', updated: 'Zuletzt aktualisiert', sections: [
      ['Verarbeitete Daten', 'Vocab kann E-Mail-Adresse, Benutzername, Oberflächeneinstellungen, Sprachpaare, Themen, Vokabeleinträge und Lernfortschritt verarbeiten. Authentifizierungsdaten werden über Supabase Auth verarbeitet.'],
      ['Zweck', 'Die Daten werden zur Erstellung und Sicherung des Kontos, zur Synchronisierung von Lerninhalten, für Lernfunktionen, zur Wiederherstellung des Zugangs und zur Zuverlässigkeit des Dienstes verwendet.'],
      ['Speicherung und Anbieter', 'Cloudbasierte Konto- und Lerndaten werden über Supabase-Infrastruktur gespeichert. Mit Offline-Unterstützung können Kopien der Lerndaten zusätzlich lokal auf dem Gerät gespeichert und später synchronisiert werden.'],
      ['Speicherdauer', 'Kontodaten werden gespeichert, solange das Konto aktiv ist oder die Daten für den Dienst erforderlich sind. Eine längere Aufbewahrung kann für Sicherheit, gesetzliche Pflichten oder Streitfälle erforderlich sein.'],
      ['Ihre Rechte', 'Je nach anwendbarem Recht können Sie Auskunft, Berichtigung, Löschung oder andere Kontrollen über Ihre personenbezogenen Daten verlangen. Profildaten und Zugangsdaten können in den Vocab-Einstellungen geändert werden.'],
      ['Sicherheit', 'Wir verwenden authentifizierten Zugriff, Datenbank-Zugriffskontrollen und verschlüsselte Übertragung. Kein Onlinedienst kann absolute Sicherheit garantieren.'],
      ['Änderungen', 'Diese Erklärung kann bei neuen Funktionen wie Offline-Speicherung, mobilen Apps oder zusätzlichen Dienstleistern aktualisiert werden.'],
    ]},
    terms: { title: 'Nutzungsbedingungen', updated: 'Zuletzt aktualisiert', sections: [
      ['Nutzung von Vocab', 'Vocab darf für rechtmäßige persönliche Lernzwecke genutzt werden. Sie sind für die von Ihnen hinzugefügten Informationen und für die Sicherheit Ihrer Zugangsdaten verantwortlich.'],
      ['Konten', 'Sie müssen eine nutzbare E-Mail-Adresse angeben und dürfen ohne Erlaubnis nicht auf fremde Konten zugreifen.'],
      ['Ihre Inhalte', 'Sie bleiben für Wörter, Notizen und andere Lerninhalte verantwortlich, die Sie hinzufügen. Laden Sie keine Inhalte hoch, zu deren Nutzung Sie nicht berechtigt sind.'],
      ['Verfügbarkeit', 'Vocab wird aktiv entwickelt. Funktionen können sich ändern, ausfallen oder Fehler enthalten. Eine unterbrechungsfreie Verfügbarkeit kann nicht garantiert werden.'],
      ['Zulässige Nutzung', 'Missbrauch, Störung des Dienstes, Umgehung von Sicherheitskontrollen, Überlastung oder rechtswidrige Nutzung sind nicht gestattet.'],
      ['Kontomaßnahmen', 'Der Zugriff kann aus Sicherheitsgründen, zur Missbrauchsprävention, zur Einhaltung gesetzlicher Pflichten oder bei schweren Verstößen eingeschränkt werden.'],
      ['Änderungen', 'Diese Bedingungen können mit der Weiterentwicklung des Dienstes aktualisiert werden. Die aktuelle Fassung und das Aktualisierungsdatum werden hier veröffentlicht.'],
    ]},
  },
  es: {
    footer: { about: 'Acerca de', contact: 'Contacto', privacy: 'Privacidad', terms: 'Términos' },
    about: { title: 'Acerca de Vocab', intro: 'Vocab es una aplicación para organizar y aprender vocabulario mediante pares de idiomas, temas, tarjetas y pruebas.', body: 'El servicio se desarrolla como un producto multiplataforma. La versión web es hoy el cliente principal; se prevén funciones móviles y sin conexión con la misma cuenta y los mismos datos de aprendizaje.' },
    contact: { title: 'Contacto', intro: 'Utiliza los datos de contacto siguientes para cuestiones de cuenta, privacidad, soporte o asuntos legales.', noEmail: 'Se añadirá un correo público de soporte antes del lanzamiento público de Vocab.' },
    privacy: { title: 'Política de privacidad', updated: 'Última actualización', sections: [
      ['Datos que tratamos', 'Vocab puede tratar correo electrónico, nombre de usuario, preferencias de interfaz, pares de idiomas, temas, vocabulario y progreso de aprendizaje. Los datos de autenticación se gestionan mediante Supabase Auth.'],
      ['Finalidad', 'Los datos se usan para crear y proteger la cuenta, sincronizar contenido de aprendizaje, ofrecer funciones de estudio, recuperar el acceso y mejorar la fiabilidad del servicio.'],
      ['Almacenamiento y proveedores', 'Los datos de cuenta y aprendizaje en la nube se almacenan mediante infraestructura de Supabase. Con el modo sin conexión, también podrán guardarse copias locales en el dispositivo y sincronizarse al recuperar la conexión.'],
      ['Conservación', 'Los datos relacionados con la cuenta se conservan mientras la cuenta esté activa o sean necesarios para prestar el servicio. Algunos datos pueden conservarse más tiempo por seguridad, obligaciones legales o resolución de disputas.'],
      ['Tus derechos', 'Según la legislación aplicable, puedes solicitar acceso, corrección, eliminación u otros controles sobre tus datos personales. También puedes modificar información de perfil y credenciales desde Vocab.'],
      ['Seguridad', 'Usamos acceso autenticado, controles de acceso a base de datos y transporte cifrado. Ningún servicio en línea puede garantizar seguridad absoluta.'],
      ['Cambios', 'Esta política puede actualizarse al incorporar almacenamiento sin conexión, aplicaciones móviles o nuevos proveedores de servicio.'],
    ]},
    terms: { title: 'Términos de servicio', updated: 'Última actualización', sections: [
      ['Uso de Vocab', 'Puedes usar Vocab para fines personales de aprendizaje que sean legales. Eres responsable de la información que añades y de mantener seguras tus credenciales.'],
      ['Cuentas', 'Debes proporcionar un correo utilizable y no acceder a la cuenta de otra persona sin permiso.'],
      ['Tu contenido', 'Sigues siendo responsable del vocabulario, notas y demás contenido de aprendizaje que añadas. No subas contenido que no tengas derecho a utilizar.'],
      ['Disponibilidad', 'Vocab está en desarrollo activo. Las funciones pueden cambiar, interrumpirse o contener errores. No se puede garantizar disponibilidad ininterrumpida.'],
      ['Uso aceptable', 'No intentes abusar, interrumpir, eludir controles de seguridad, sobrecargar el servicio ni utilizar Vocab para actividades ilegales.'],
      ['Medidas sobre la cuenta', 'El acceso puede restringirse cuando sea razonablemente necesario por seguridad, prevención de abusos, cumplimiento legal o infracciones graves.'],
      ['Cambios', 'Estos términos pueden actualizarse a medida que evolucione el servicio. La versión actual y la fecha de actualización se publicarán en esta página.'],
    ]},
  },
};

export function getLegalContent(language: AppLanguage): LegalLocaleContent {
  return legalContent[language];
}
