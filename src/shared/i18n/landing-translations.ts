import type { AppLanguage } from '@/shared/i18n/translations';

type LandingCopy = {
  nav: {
    features: string;
    howItWorks: string;
    signIn: string;
    startLearning: string;
    openApp: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primary: string;
    secondary: string;
  };
  preview: {
    learned: string;
    remaining: string;
    sourceLabel: string;
    sourceWord: string;
    targetLabel: string;
    targetWord: string;
  };
  features: {
    eyebrow: string;
    title: string;
    description: string;
    cardsTitle: string;
    cardsDescription: string;
    testsTitle: string;
    testsDescription: string;
    progressTitle: string;
    progressDescription: string;
    languagesTitle: string;
    languagesDescription: string;
  };
  steps: {
    eyebrow: string;
    title: string;
    createTitle: string;
    createDescription: string;
    addTitle: string;
    addDescription: string;
    learnTitle: string;
    learnDescription: string;
  };
  cta: {
    title: string;
    description: string;
    button: string;
    openApp: string;
  };
};

export const landingTranslations: Partial<Record<AppLanguage, LandingCopy>> & { en: LandingCopy } = {
  en: {
    nav: {
      features: 'Features',
      howItWorks: 'How it works',
      signIn: 'Sign in',
      startLearning: 'Start learning',
      openApp: 'Open app',
    },
    hero: {
      eyebrow: 'Flashcards · Tests · Progress',
      title: 'Learn vocabulary without the clutter.',
      description:
        'Create your own word collections, study with focused flashcards, test yourself and keep track of what you already know.',
      primary: 'Start learning',
      secondary: 'See how it works',
    },
    preview: {
      learned: 'Learned',
      remaining: 'Remaining',
      sourceLabel: 'English',
      sourceWord: 'remember',
      targetLabel: 'Spanish',
      targetWord: 'recordar',
    },
    features: {
      eyebrow: 'Everything in one place',
      title: 'A simple workflow for actually remembering words.',
      description: 'No feeds, streak pressure or unnecessary screens. Just the tools you need to learn.',
      cardsTitle: 'Focused flashcards',
      cardsDescription: 'Review only the words you still need and remove remembered cards from the current session.',
      testsTitle: 'Flexible tests',
      testsDescription: 'Choose the direction, test all words or only unlearned ones, and see answers immediately or at the end.',
      progressTitle: 'Clear progress',
      progressDescription: 'Mark words as learned and see how much of every topic you already know.',
      languagesTitle: 'Your language pairs',
      languagesDescription: 'Build your own collections for the language combinations and topics that matter to you.',
    },
    steps: {
      eyebrow: 'How it works',
      title: 'From a new word to something you actually remember.',
      createTitle: 'Create a language pair',
      createDescription: 'Choose the languages you want to practice and organize them into topics or lessons.',
      addTitle: 'Add your vocabulary',
      addDescription: 'Save words, translations and optional meanings so each entry keeps the right context.',
      learnTitle: 'Study, test, repeat',
      learnDescription: 'Use cards and tests, mark words as learned, and focus future sessions on what is left.',
    },
    cta: {
      title: 'Ready to build a vocabulary that sticks?',
      description: 'Create your first collection and start learning at your own pace.',
      button: 'Create free account',
      openApp: 'Open Vocab',
    },
  },
  ru: {
    nav: {
      features: 'Возможности',
      howItWorks: 'Как это работает',
      signIn: 'Войти',
      startLearning: 'Начать учить',
      openApp: 'Открыть приложение',
    },
    hero: {
      eyebrow: 'Карточки · Тесты · Прогресс',
      title: 'Учи слова без лишнего шума.',
      description:
        'Создавай свои наборы слов, учи их с помощью карточек, проверяй себя тестами и отслеживай то, что уже выучил.',
      primary: 'Начать учить',
      secondary: 'Как это работает',
    },
    preview: {
      learned: 'Выучено',
      remaining: 'Осталось',
      sourceLabel: 'English',
      sourceWord: 'remember',
      targetLabel: 'Spanish',
      targetWord: 'recordar',
    },
    features: {
      eyebrow: 'Всё в одном месте',
      title: 'Простой процесс, который помогает действительно запоминать слова.',
      description: 'Без ленты, давления серий и лишних экранов. Только инструменты для обучения.',
      cardsTitle: 'Удобные карточки',
      cardsDescription: 'Повторяй только нужные слова и убирай запомненные карточки из текущей сессии.',
      testsTitle: 'Гибкие тесты',
      testsDescription: 'Выбирай направление, все или только невыученные слова, а ответы смотри сразу или в конце.',
      progressTitle: 'Понятный прогресс',
      progressDescription: 'Помечай слова как выученные и сразу видь, какую часть каждой темы ты уже знаешь.',
      languagesTitle: 'Свои языковые пары',
      languagesDescription: 'Создавай наборы для нужных тебе языков, тем и уроков.',
    },
    steps: {
      eyebrow: 'Как это работает',
      title: 'От нового слова до слова, которое ты действительно помнишь.',
      createTitle: 'Создай языковую пару',
      createDescription: 'Выбери языки и организуй слова по темам, урокам или любым своим группам.',
      addTitle: 'Добавь свои слова',
      addDescription: 'Сохраняй слово, перевод и при необходимости значение, чтобы не терять контекст.',
      learnTitle: 'Учи, проверяй, повторяй',
      learnDescription: 'Используй карточки и тесты, отмечай выученные слова и фокусируйся на оставшихся.',
    },
    cta: {
      title: 'Готов собрать словарь, который действительно запомнится?',
      description: 'Создай первый набор и учись в своём темпе.',
      button: 'Создать аккаунт',
      openApp: 'Открыть Vocab',
    },
  },
  uk: {
    nav: {
      features: 'Можливості',
      howItWorks: 'Як це працює',
      signIn: 'Увійти',
      startLearning: 'Почати вчити',
      openApp: 'Відкрити застосунок',
    },
    hero: {
      eyebrow: 'Картки · Тести · Прогрес',
      title: 'Вчи слова без зайвого шуму.',
      description:
        'Створюй власні набори слів, вчи їх за допомогою карток, перевіряй себе тестами та відстежуй те, що вже вивчив.',
      primary: 'Почати вчити',
      secondary: 'Як це працює',
    },
    preview: {
      learned: 'Вивчено',
      remaining: 'Залишилось',
      sourceLabel: 'English',
      sourceWord: 'remember',
      targetLabel: 'Spanish',
      targetWord: 'recordar',
    },
    features: {
      eyebrow: 'Усе в одному місці',
      title: 'Простий процес, що допомагає справді запам’ятовувати слова.',
      description: 'Без стрічки, тиску серій та зайвих екранів. Лише інструменти для навчання.',
      cardsTitle: 'Зручні картки',
      cardsDescription: 'Повторюй потрібні слова та прибирай запам’ятовані картки з поточної сесії.',
      testsTitle: 'Гнучкі тести',
      testsDescription: 'Обирай напрямок, усі чи лише невивчені слова, а відповіді дивись одразу або наприкінці.',
      progressTitle: 'Зрозумілий прогрес',
      progressDescription: 'Позначай слова як вивчені та бач, яку частину кожної теми ти вже знаєш.',
      languagesTitle: 'Власні мовні пари',
      languagesDescription: 'Створюй набори для потрібних мов, тем та уроків.',
    },
    steps: {
      eyebrow: 'Як це працює',
      title: 'Від нового слова до слова, яке ти справді пам’ятаєш.',
      createTitle: 'Створи мовну пару',
      createDescription: 'Обери мови та організуй слова за темами, уроками чи власними групами.',
      addTitle: 'Додай свої слова',
      addDescription: 'Зберігай слово, переклад і за потреби значення, щоб не втрачати контекст.',
      learnTitle: 'Вчи, перевіряй, повторюй',
      learnDescription: 'Використовуй картки й тести, позначай вивчені слова та фокусуйся на решті.',
    },
    cta: {
      title: 'Готовий зібрати словник, який справді запам’ятається?',
      description: 'Створи перший набір і навчайся у своєму темпі.',
      button: 'Створити акаунт',
      openApp: 'Відкрити Vocab',
    },
  },
  de: {
    nav: {
      features: 'Funktionen',
      howItWorks: 'So funktioniert es',
      signIn: 'Anmelden',
      startLearning: 'Lernen starten',
      openApp: 'App öffnen',
    },
    hero: {
      eyebrow: 'Karteikarten · Tests · Fortschritt',
      title: 'Vokabeln lernen ohne Ablenkung.',
      description:
        'Erstelle eigene Wortsammlungen, lerne mit fokussierten Karteikarten, teste dich selbst und behalte deinen Fortschritt im Blick.',
      primary: 'Lernen starten',
      secondary: 'So funktioniert es',
    },
    preview: {
      learned: 'Gelernt',
      remaining: 'Übrig',
      sourceLabel: 'English',
      sourceWord: 'remember',
      targetLabel: 'Spanish',
      targetWord: 'recordar',
    },
    features: {
      eyebrow: 'Alles an einem Ort',
      title: 'Ein einfacher Ablauf, mit dem Wörter wirklich hängen bleiben.',
      description: 'Kein Feed, kein Streak-Druck und keine unnötigen Ansichten. Nur Werkzeuge zum Lernen.',
      cardsTitle: 'Fokussierte Karteikarten',
      cardsDescription: 'Wiederhole nur nötige Wörter und entferne gemerkte Karten aus der aktuellen Sitzung.',
      testsTitle: 'Flexible Tests',
      testsDescription: 'Wähle Richtung und Wortumfang und entscheide, ob Antworten sofort oder am Ende erscheinen.',
      progressTitle: 'Klarer Fortschritt',
      progressDescription: 'Markiere Wörter als gelernt und sieh sofort, wie viel eines Themas du schon kannst.',
      languagesTitle: 'Eigene Sprachpaare',
      languagesDescription: 'Erstelle Sammlungen für die Sprachen, Themen und Lektionen, die für dich wichtig sind.',
    },
    steps: {
      eyebrow: 'So funktioniert es',
      title: 'Vom neuen Wort zu einem Wort, das du wirklich behältst.',
      createTitle: 'Sprachpaar erstellen',
      createDescription: 'Wähle deine Sprachen und ordne Wörter in Themen, Lektionen oder eigene Gruppen.',
      addTitle: 'Vokabeln hinzufügen',
      addDescription: 'Speichere Wort, Übersetzung und optional eine Bedeutung, damit der Kontext erhalten bleibt.',
      learnTitle: 'Lernen, testen, wiederholen',
      learnDescription: 'Nutze Karten und Tests, markiere gelernte Wörter und konzentriere dich auf den Rest.',
    },
    cta: {
      title: 'Bereit für einen Wortschatz, der wirklich bleibt?',
      description: 'Erstelle deine erste Sammlung und lerne in deinem eigenen Tempo.',
      button: 'Kostenloses Konto erstellen',
      openApp: 'Vocab öffnen',
    },
  },
  es: {
    nav: {
      features: 'Funciones',
      howItWorks: 'Cómo funciona',
      signIn: 'Iniciar sesión',
      startLearning: 'Empezar a aprender',
      openApp: 'Abrir app',
    },
    hero: {
      eyebrow: 'Tarjetas · Tests · Progreso',
      title: 'Aprende vocabulario sin distracciones.',
      description:
        'Crea tus propias colecciones de palabras, estudia con tarjetas, ponte a prueba y controla lo que ya has aprendido.',
      primary: 'Empezar a aprender',
      secondary: 'Cómo funciona',
    },
    preview: {
      learned: 'Aprendidas',
      remaining: 'Restantes',
      sourceLabel: 'English',
      sourceWord: 'remember',
      targetLabel: 'Spanish',
      targetWord: 'recordar',
    },
    features: {
      eyebrow: 'Todo en un solo lugar',
      title: 'Un flujo sencillo para recordar palabras de verdad.',
      description: 'Sin feed, presión por rachas ni pantallas innecesarias. Solo herramientas para aprender.',
      cardsTitle: 'Tarjetas enfocadas',
      cardsDescription: 'Repasa solo lo que necesitas y elimina de la sesión las tarjetas que ya recuerdas.',
      testsTitle: 'Tests flexibles',
      testsDescription: 'Elige dirección, todas o solo las palabras no aprendidas y cuándo quieres ver las respuestas.',
      progressTitle: 'Progreso claro',
      progressDescription: 'Marca palabras como aprendidas y mira cuánto de cada tema ya conoces.',
      languagesTitle: 'Tus pares de idiomas',
      languagesDescription: 'Crea colecciones para las combinaciones de idiomas, temas y lecciones que te importan.',
    },
    steps: {
      eyebrow: 'Cómo funciona',
      title: 'De una palabra nueva a una palabra que realmente recuerdas.',
      createTitle: 'Crea un par de idiomas',
      createDescription: 'Elige los idiomas y organiza las palabras por temas, lecciones o grupos propios.',
      addTitle: 'Añade tu vocabulario',
      addDescription: 'Guarda la palabra, su traducción y un significado opcional para conservar el contexto.',
      learnTitle: 'Estudia, prueba y repite',
      learnDescription: 'Usa tarjetas y tests, marca palabras como aprendidas y céntrate en las que quedan.',
    },
    cta: {
      title: '¿Listo para crear un vocabulario que se quede contigo?',
      description: 'Crea tu primera colección y aprende a tu propio ritmo.',
      button: 'Crear cuenta gratis',
      openApp: 'Abrir Vocab',
    },
  },

  fr: {
    nav: { features: 'Fonctionnalités', howItWorks: 'Comment ça marche', signIn: 'Se connecter', startLearning: 'Commencer', openApp: 'Ouvrir l’app' },
    hero: { eyebrow: 'Cartes · Tests · Progression', title: 'Apprenez du vocabulaire sans distractions.', description: 'Créez vos propres collections de mots, révisez avec des cartes ciblées, testez-vous et suivez ce que vous connaissez déjà.', primary: 'Commencer', secondary: 'Voir comment ça marche' },
    preview: { learned: 'Appris', remaining: 'Restants', sourceLabel: 'Anglais', sourceWord: 'remember', targetLabel: 'Espagnol', targetWord: 'recordar' },
    features: { eyebrow: 'Tout au même endroit', title: 'Un flux simple pour vraiment retenir les mots.', description: 'Pas de fil, pas de pression liée aux séries, pas d’écrans inutiles. Seulement les outils dont vous avez besoin.', cardsTitle: 'Cartes ciblées', cardsDescription: 'Révisez uniquement les mots nécessaires et retirez de la session les cartes déjà mémorisées.', testsTitle: 'Tests flexibles', testsDescription: 'Choisissez le sens, tous les mots ou seulement ceux à apprendre, et affichez les réponses immédiatement ou à la fin.', progressTitle: 'Progression claire', progressDescription: 'Marquez les mots comme appris et voyez immédiatement votre progression dans chaque thème.', languagesTitle: 'Vos paires de langues', languagesDescription: 'Créez des collections pour les langues, thèmes et leçons qui comptent pour vous.' },
    steps: { eyebrow: 'Comment ça marche', title: 'D’un nouveau mot à un mot que vous retenez vraiment.', createTitle: 'Créez une paire de langues', createDescription: 'Choisissez vos langues et organisez les mots par thèmes, leçons ou groupes personnalisés.', addTitle: 'Ajoutez votre vocabulaire', addDescription: 'Enregistrez le mot, sa traduction et éventuellement son sens pour conserver le contexte.', learnTitle: 'Apprenez, testez, répétez', learnDescription: 'Utilisez les cartes et les tests, marquez les mots appris et concentrez-vous sur le reste.' },
    cta: { title: 'Prêt à construire un vocabulaire qui reste ?', description: 'Créez votre première collection et apprenez à votre rythme.', button: 'Créer un compte gratuit', openApp: 'Ouvrir Vocab' },
  },
  it: {
    nav: { features: 'Funzioni', howItWorks: 'Come funziona', signIn: 'Accedi', startLearning: 'Inizia a imparare', openApp: 'Apri app' },
    hero: { eyebrow: 'Flashcard · Test · Progressi', title: 'Impara vocaboli senza distrazioni.', description: 'Crea le tue raccolte di parole, studia con flashcard mirate, mettiti alla prova e tieni traccia di ciò che hai già imparato.', primary: 'Inizia a imparare', secondary: 'Scopri come funziona' },
    preview: { learned: 'Imparate', remaining: 'Rimanenti', sourceLabel: 'Inglese', sourceWord: 'remember', targetLabel: 'Spagnolo', targetWord: 'recordar' },
    features: { eyebrow: 'Tutto in un solo posto', title: 'Un flusso semplice per ricordare davvero le parole.', description: 'Niente feed, pressione da streak o schermate inutili. Solo gli strumenti che servono.', cardsTitle: 'Flashcard mirate', cardsDescription: 'Ripassa solo le parole che ti servono e rimuovi dalla sessione le carte già ricordate.', testsTitle: 'Test flessibili', testsDescription: 'Scegli la direzione, tutte le parole o solo quelle non ancora imparate, e quando vedere le risposte.', progressTitle: 'Progressi chiari', progressDescription: 'Segna le parole come imparate e controlla subito quanto conosci di ogni argomento.', languagesTitle: 'Le tue coppie di lingue', languagesDescription: 'Crea raccolte per le lingue, gli argomenti e le lezioni che ti interessano.' },
    steps: { eyebrow: 'Come funziona', title: 'Da una parola nuova a una parola che ricordi davvero.', createTitle: 'Crea una coppia di lingue', createDescription: 'Scegli le lingue e organizza le parole in argomenti, lezioni o gruppi personalizzati.', addTitle: 'Aggiungi il tuo vocabolario', addDescription: 'Salva parola, traduzione e un significato facoltativo per mantenere il contesto.', learnTitle: 'Studia, prova, ripeti', learnDescription: 'Usa flashcard e test, segna le parole imparate e concentrati su quelle che restano.' },
    cta: { title: 'Pronto a creare un vocabolario che resta?', description: 'Crea la tua prima raccolta e impara al tuo ritmo.', button: 'Crea account gratis', openApp: 'Apri Vocab' },
  },
  pt: {
    nav: { features: 'Recursos', howItWorks: 'Como funciona', signIn: 'Entrar', startLearning: 'Começar a aprender', openApp: 'Abrir app' },
    hero: { eyebrow: 'Flashcards · Testes · Progresso', title: 'Aprenda vocabulário sem distrações.', description: 'Crie suas próprias coleções de palavras, estude com flashcards focados, faça testes e acompanhe o que já aprendeu.', primary: 'Começar a aprender', secondary: 'Ver como funciona' },
    preview: { learned: 'Aprendidas', remaining: 'Restantes', sourceLabel: 'Inglês', sourceWord: 'remember', targetLabel: 'Espanhol', targetWord: 'recordar' },
    features: { eyebrow: 'Tudo em um só lugar', title: 'Um fluxo simples para realmente memorizar palavras.', description: 'Sem feed, pressão por sequências ou telas desnecessárias. Só as ferramentas que você precisa.', cardsTitle: 'Flashcards focados', cardsDescription: 'Revise apenas as palavras necessárias e remova da sessão os cartões que já memorizou.', testsTitle: 'Testes flexíveis', testsDescription: 'Escolha a direção, todas as palavras ou só as ainda não aprendidas, e quando ver as respostas.', progressTitle: 'Progresso claro', progressDescription: 'Marque palavras como aprendidas e veja imediatamente quanto de cada tema você já domina.', languagesTitle: 'Seus pares de idiomas', languagesDescription: 'Crie coleções para os idiomas, temas e lições que importam para você.' },
    steps: { eyebrow: 'Como funciona', title: 'De uma palavra nova a uma palavra que você realmente lembra.', createTitle: 'Crie um par de idiomas', createDescription: 'Escolha os idiomas e organize palavras por temas, lições ou grupos personalizados.', addTitle: 'Adicione seu vocabulário', addDescription: 'Salve a palavra, a tradução e um significado opcional para manter o contexto.', learnTitle: 'Estude, teste e repita', learnDescription: 'Use flashcards e testes, marque palavras aprendidas e concentre-se nas restantes.' },
    cta: { title: 'Pronto para criar um vocabulário que fica?', description: 'Crie sua primeira coleção e aprenda no seu ritmo.', button: 'Criar conta grátis', openApp: 'Abrir Vocab' },
  },
  pl: {
    nav: { features: 'Funkcje', howItWorks: 'Jak to działa', signIn: 'Zaloguj się', startLearning: 'Zacznij naukę', openApp: 'Otwórz aplikację' },
    hero: { eyebrow: 'Fiszki · Testy · Postęp', title: 'Ucz się słownictwa bez rozpraszaczy.', description: 'Twórz własne zbiory słów, ucz się z fiszek, sprawdzaj wiedzę w testach i śledź to, co już umiesz.', primary: 'Zacznij naukę', secondary: 'Zobacz jak to działa' },
    preview: { learned: 'Nauczone', remaining: 'Pozostało', sourceLabel: 'Angielski', sourceWord: 'remember', targetLabel: 'Hiszpański', targetWord: 'recordar' },
    features: { eyebrow: 'Wszystko w jednym miejscu', title: 'Prosty sposób, by naprawdę zapamiętywać słowa.', description: 'Bez feedu, presji serii i zbędnych ekranów. Tylko narzędzia do nauki.', cardsTitle: 'Skupione fiszki', cardsDescription: 'Powtarzaj tylko potrzebne słowa i usuwaj zapamiętane fiszki z bieżącej sesji.', testsTitle: 'Elastyczne testy', testsDescription: 'Wybierz kierunek, wszystkie lub tylko nienauczone słowa oraz moment pokazania odpowiedzi.', progressTitle: 'Czytelny postęp', progressDescription: 'Oznaczaj słowa jako nauczone i od razu sprawdzaj postęp w każdym temacie.', languagesTitle: 'Własne pary językowe', languagesDescription: 'Twórz zbiory dla języków, tematów i lekcji, które są dla Ciebie ważne.' },
    steps: { eyebrow: 'Jak to działa', title: 'Od nowego słowa do słowa, które naprawdę pamiętasz.', createTitle: 'Utwórz parę językową', createDescription: 'Wybierz języki i porządkuj słowa według tematów, lekcji lub własnych grup.', addTitle: 'Dodaj słownictwo', addDescription: 'Zapisz słowo, tłumaczenie i opcjonalne znaczenie, aby zachować kontekst.', learnTitle: 'Ucz się, testuj, powtarzaj', learnDescription: 'Korzystaj z fiszek i testów, oznaczaj nauczone słowa i skupiaj się na pozostałych.' },
    cta: { title: 'Gotowy na słownictwo, które zostaje w pamięci?', description: 'Utwórz pierwszy zbiór i ucz się we własnym tempie.', button: 'Utwórz darmowe konto', openApp: 'Otwórz Vocab' },
  },
  tr: {
    nav: { features: 'Özellikler', howItWorks: 'Nasıl çalışır', signIn: 'Giriş yap', startLearning: 'Öğrenmeye başla', openApp: 'Uygulamayı aç' },
    hero: { eyebrow: 'Kartlar · Testler · İlerleme', title: 'Kelime öğrenirken dikkatini dağıtma.', description: 'Kendi kelime koleksiyonlarını oluştur, odaklı kartlarla çalış, kendini test et ve öğrendiklerini takip et.', primary: 'Öğrenmeye başla', secondary: 'Nasıl çalıştığını gör' },
    preview: { learned: 'Öğrenildi', remaining: 'Kalan', sourceLabel: 'İngilizce', sourceWord: 'remember', targetLabel: 'İspanyolca', targetWord: 'recordar' },
    features: { eyebrow: 'Her şey tek yerde', title: 'Kelimeleri gerçekten hatırlamak için basit bir akış.', description: 'Akış yok, seri baskısı yok, gereksiz ekran yok. Sadece öğrenme araçları.', cardsTitle: 'Odaklı kartlar', cardsDescription: 'Yalnızca ihtiyacın olan kelimeleri tekrar et ve hatırladığın kartları oturumdan çıkar.', testsTitle: 'Esnek testler', testsDescription: 'Yönü, tüm kelimeleri veya sadece öğrenmediklerini ve cevapların ne zaman gösterileceğini seç.', progressTitle: 'Net ilerleme', progressDescription: 'Kelimeleri öğrenildi olarak işaretle ve her konudaki ilerlemeni hemen gör.', languagesTitle: 'Kendi dil çiftlerin', languagesDescription: 'Önem verdiğin dil, konu ve dersler için koleksiyonlar oluştur.' },
    steps: { eyebrow: 'Nasıl çalışır', title: 'Yeni bir kelimeden gerçekten hatırladığın bir kelimeye.', createTitle: 'Dil çifti oluştur', createDescription: 'Dillerini seç ve kelimeleri konu, ders veya kendi gruplarına göre düzenle.', addTitle: 'Kelime ekle', addDescription: 'Kelimeyi, çevirisini ve bağlam için isteğe bağlı anlamını kaydet.', learnTitle: 'Çalış, test et, tekrarla', learnDescription: 'Kartlar ve testler kullan, öğrendiklerini işaretle ve kalanlara odaklan.' },
    cta: { title: 'Kalıcı bir kelime hazinesi oluşturmaya hazır mısın?', description: 'İlk koleksiyonunu oluştur ve kendi hızında öğren.', button: 'Ücretsiz hesap oluştur', openApp: 'Vocab’ı aç' },
  },
  zh: {
    nav: { features: '功能', howItWorks: '使用方式', signIn: '登录', startLearning: '开始学习', openApp: '打开应用' },
    hero: { eyebrow: '单词卡 · 测试 · 进度', title: '专注地学习词汇。', description: '创建自己的词汇集合，用单词卡复习，通过测试检查掌握情况，并跟踪已经学会的内容。', primary: '开始学习', secondary: '查看使用方式' },
    preview: { learned: '已学会', remaining: '剩余', sourceLabel: '英语', sourceWord: 'remember', targetLabel: '西班牙语', targetWord: 'recordar' },
    features: { eyebrow: '集中在一个地方', title: '用简单流程真正记住单词。', description: '没有信息流、连续打卡压力或多余页面，只有真正需要的学习工具。', cardsTitle: '专注单词卡', cardsDescription: '只复习还需要掌握的单词，并从当前学习会话中移除已经记住的卡片。', testsTitle: '灵活测试', testsDescription: '选择测试方向、全部或未学会的单词，并决定立即还是最后查看答案。', progressTitle: '清晰进度', progressDescription: '将单词标记为已学会，并立即查看每个主题的掌握程度。', languagesTitle: '自定义语言组合', languagesDescription: '为你关心的语言、主题和课程创建词汇集合。' },
    steps: { eyebrow: '使用方式', title: '从陌生单词到真正记住。', createTitle: '创建语言组合', createDescription: '选择语言，并按主题、课程或自定义分组整理单词。', addTitle: '添加词汇', addDescription: '保存单词、翻译和可选释义，保留学习语境。', learnTitle: '学习、测试、重复', learnDescription: '使用单词卡和测试，标记已经学会的词，把注意力放在剩余内容上。' },
    cta: { title: '准备好建立真正记得住的词汇库了吗？', description: '创建第一个词汇集合，按照自己的节奏学习。', button: '免费创建账户', openApp: '打开 Vocab' },
  },
  ja: {
    nav: { features: '機能', howItWorks: '使い方', signIn: 'ログイン', startLearning: '学習を始める', openApp: 'アプリを開く' },
    hero: { eyebrow: '単語カード · テスト · 進捗', title: '余計なものなしで語彙を学ぶ。', description: '自分だけの単語集を作り、カードで学習し、テストで確認し、覚えた単語を管理できます。', primary: '学習を始める', secondary: '使い方を見る' },
    preview: { learned: '習得済み', remaining: '残り', sourceLabel: '英語', sourceWord: 'remember', targetLabel: 'スペイン語', targetWord: 'recordar' },
    features: { eyebrow: 'すべてを一か所に', title: '本当に単語を覚えるためのシンプルな流れ。', description: 'フィードや連続記録のプレッシャー、不要な画面はありません。必要な学習ツールだけです。', cardsTitle: '集中できる単語カード', cardsDescription: '必要な単語だけ復習し、覚えたカードはそのセッションから外せます。', testsTitle: '柔軟なテスト', testsDescription: '方向、全単語か未習得だけか、答えをすぐ見るか最後に見るかを選べます。', progressTitle: '分かりやすい進捗', progressDescription: '単語を習得済みにして、各テーマの進捗をすぐ確認できます。', languagesTitle: '自分の言語ペア', languagesDescription: '学びたい言語、テーマ、レッスンに合わせて単語集を作れます。' },
    steps: { eyebrow: '使い方', title: '新しい単語を、本当に覚えている単語へ。', createTitle: '言語ペアを作る', createDescription: '言語を選び、テーマやレッスン、自分のグループで単語を整理します。', addTitle: '単語を追加する', addDescription: '単語、訳、必要なら意味や文脈も保存します。', learnTitle: '学ぶ・試す・繰り返す', learnDescription: 'カードとテストを使い、覚えた単語をマークして残りに集中します。' },
    cta: { title: 'しっかり残る語彙を作りませんか？', description: '最初の単語集を作って、自分のペースで学びましょう。', button: '無料アカウントを作成', openApp: 'Vocab を開く' },
  },
  ko: {
    nav: { features: '기능', howItWorks: '사용 방법', signIn: '로그인', startLearning: '학습 시작', openApp: '앱 열기' },
    hero: { eyebrow: '플래시카드 · 테스트 · 진도', title: '복잡함 없이 어휘를 학습하세요.', description: '나만의 단어 모음을 만들고, 집중형 플래시카드로 학습하고, 테스트하며 이미 익힌 내용을 추적하세요.', primary: '학습 시작', secondary: '사용 방법 보기' },
    preview: { learned: '학습 완료', remaining: '남은 단어', sourceLabel: '영어', sourceWord: 'remember', targetLabel: '스페인어', targetWord: 'recordar' },
    features: { eyebrow: '한곳에서 모두', title: '단어를 실제로 기억하기 위한 간단한 흐름.', description: '피드, 연속 학습 압박, 불필요한 화면 없이 필요한 학습 도구만 제공합니다.', cardsTitle: '집중형 플래시카드', cardsDescription: '필요한 단어만 복습하고 기억한 카드는 현재 세션에서 제외하세요.', testsTitle: '유연한 테스트', testsDescription: '방향, 전체 또는 미학습 단어, 정답을 바로 볼지 마지막에 볼지 선택할 수 있습니다.', progressTitle: '명확한 진도', progressDescription: '단어를 학습 완료로 표시하고 각 주제의 진행률을 바로 확인하세요.', languagesTitle: '나만의 언어 조합', languagesDescription: '원하는 언어, 주제, 레슨에 맞춰 단어 모음을 만들 수 있습니다.' },
    steps: { eyebrow: '사용 방법', title: '새 단어를 정말 기억하는 단어로.', createTitle: '언어 조합 만들기', createDescription: '언어를 선택하고 단어를 주제, 레슨 또는 직접 만든 그룹으로 정리하세요.', addTitle: '어휘 추가하기', addDescription: '단어, 번역, 필요하면 의미를 저장해 문맥을 유지하세요.', learnTitle: '학습하고 테스트하고 반복하기', learnDescription: '카드와 테스트를 사용하고 익힌 단어를 표시하며 남은 단어에 집중하세요.' },
    cta: { title: '오래 기억되는 어휘를 만들 준비가 되었나요?', description: '첫 단어 모음을 만들고 자신의 속도로 학습하세요.', button: '무료 계정 만들기', openApp: 'Vocab 열기' },
  },
  ar: {
    nav: { features: 'الميزات', howItWorks: 'كيف يعمل', signIn: 'تسجيل الدخول', startLearning: 'ابدأ التعلم', openApp: 'فتح التطبيق' },
    hero: { eyebrow: 'بطاقات · اختبارات · تقدم', title: 'تعلّم المفردات بدون تشتيت.', description: 'أنشئ مجموعات كلماتك الخاصة، وراجعها ببطاقات مركزة، واختبر نفسك وتابع ما تعلمته بالفعل.', primary: 'ابدأ التعلم', secondary: 'شاهد كيف يعمل' },
    preview: { learned: 'تم تعلمها', remaining: 'المتبقي', sourceLabel: 'الإنجليزية', sourceWord: 'remember', targetLabel: 'الإسبانية', targetWord: 'recordar' },
    features: { eyebrow: 'كل شيء في مكان واحد', title: 'طريقة بسيطة لتتذكر الكلمات فعلاً.', description: 'لا موجز ولا ضغط سلاسل ولا شاشات غير ضرورية. فقط أدوات التعلم التي تحتاجها.', cardsTitle: 'بطاقات مركزة', cardsDescription: 'راجع الكلمات التي ما زلت تحتاجها وأزل البطاقات التي تذكرتها من الجلسة الحالية.', testsTitle: 'اختبارات مرنة', testsDescription: 'اختر الاتجاه وكل الكلمات أو غير المتعلمة فقط، وحدد متى تريد رؤية الإجابات.', progressTitle: 'تقدم واضح', progressDescription: 'علّم الكلمات كمكتسبة وشاهد فوراً مدى تقدمك في كل موضوع.', languagesTitle: 'أزواج اللغات الخاصة بك', languagesDescription: 'أنشئ مجموعات للغات والموضوعات والدروس التي تهمك.' },
    steps: { eyebrow: 'كيف يعمل', title: 'من كلمة جديدة إلى كلمة تتذكرها فعلاً.', createTitle: 'أنشئ زوج لغات', createDescription: 'اختر لغاتك ونظم الكلمات حسب الموضوعات أو الدروس أو مجموعاتك الخاصة.', addTitle: 'أضف مفرداتك', addDescription: 'احفظ الكلمة وترجمتها ومعنى اختيارياً للحفاظ على السياق.', learnTitle: 'تعلّم واختبر وكرر', learnDescription: 'استخدم البطاقات والاختبارات، وعلّم الكلمات التي تعلمتها وركز على الباقي.' },
    cta: { title: 'هل أنت مستعد لبناء مفردات تبقى معك؟', description: 'أنشئ مجموعتك الأولى وتعلم بالسرعة التي تناسبك.', button: 'إنشاء حساب مجاني', openApp: 'فتح Vocab' },
  },
  hi: {
    nav: { features: 'विशेषताएँ', howItWorks: 'यह कैसे काम करता है', signIn: 'साइन इन', startLearning: 'सीखना शुरू करें', openApp: 'ऐप खोलें' },
    hero: { eyebrow: 'फ्लैशकार्ड · टेस्ट · प्रगति', title: 'बिना उलझन के शब्दावली सीखें।', description: 'अपनी शब्द-सूचियाँ बनाएँ, केंद्रित फ्लैशकार्ड से पढ़ें, खुद को टेस्ट करें और जो सीख चुके हैं उसे ट्रैक करें।', primary: 'सीखना शुरू करें', secondary: 'देखें यह कैसे काम करता है' },
    preview: { learned: 'सीखे गए', remaining: 'बाकी', sourceLabel: 'अंग्रेज़ी', sourceWord: 'remember', targetLabel: 'स्पेनिश', targetWord: 'recordar' },
    features: { eyebrow: 'सब कुछ एक जगह', title: 'शब्दों को सच में याद रखने का सरल तरीका।', description: 'कोई फ़ीड, स्ट्रीक का दबाव या बेकार स्क्रीन नहीं। सिर्फ़ सीखने के ज़रूरी टूल।', cardsTitle: 'केंद्रित फ्लैशकार्ड', cardsDescription: 'सिर्फ़ ज़रूरी शब्द दोहराएँ और याद हो चुके कार्ड को मौजूदा सत्र से हटा दें।', testsTitle: 'लचीले टेस्ट', testsDescription: 'दिशा, सभी या सिर्फ़ अनसीखे शब्द चुनें और तय करें कि उत्तर तुरंत दिखें या अंत में।', progressTitle: 'स्पष्ट प्रगति', progressDescription: 'शब्दों को सीखा हुआ चिन्हित करें और हर विषय की प्रगति तुरंत देखें।', languagesTitle: 'आपके भाषा जोड़े', languagesDescription: 'उन भाषाओं, विषयों और पाठों के लिए संग्रह बनाएँ जो आपके लिए महत्वपूर्ण हैं।' },
    steps: { eyebrow: 'यह कैसे काम करता है', title: 'नए शब्द से उस शब्द तक जिसे आप सच में याद रखते हैं।', createTitle: 'भाषा जोड़ा बनाएँ', createDescription: 'भाषाएँ चुनें और शब्दों को विषय, पाठ या अपने समूहों में व्यवस्थित करें।', addTitle: 'शब्दावली जोड़ें', addDescription: 'शब्द, उसका अनुवाद और चाहें तो अर्थ सेव करें ताकि संदर्भ बना रहे।', learnTitle: 'सीखें, टेस्ट करें, दोहराएँ', learnDescription: 'फ्लैशकार्ड और टेस्ट का उपयोग करें, सीखे शब्द चिन्हित करें और बाकी पर ध्यान दें।' },
    cta: { title: 'ऐसी शब्दावली बनाने के लिए तैयार हैं जो याद रहे?', description: 'अपना पहला संग्रह बनाएँ और अपनी गति से सीखें।', button: 'मुफ़्त खाता बनाएँ', openApp: 'Vocab खोलें' },
  },

};
