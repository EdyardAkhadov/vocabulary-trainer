import type { LegalLocaleContent } from './content';

export const extraLegalContent: Record<
  'fr' | 'it' | 'pt' | 'pl' | 'tr' | 'zh' | 'ja' | 'ko' | 'ar' | 'hi',
  LegalLocaleContent
> = {
  "fr": {
    "footer": {
      "about": "À propos",
      "contact": "Contact",
      "privacy": "Confidentialité",
      "terms": "Conditions"
    },
    "about": {
      "title": "À propos de Vocab",
      "intro": "Vocab est une application d’apprentissage du vocabulaire qui organise les paires de langues, les thèmes et les mots, puis permet de les étudier avec des cartes et des tests.",
      "body": "Le service est développé comme un produit multiplateforme. La version web est aujourd’hui le client principal ; des fonctions mobiles et hors ligne sont prévues autour du même compte et des mêmes données d’apprentissage."
    },
    "contact": {
      "title": "Contact",
      "intro": "Utilisez les coordonnées ci-dessous pour les questions liées au compte, à la confidentialité, au support ou aux aspects juridiques.",
      "noEmail": "Une adresse e-mail publique de support sera ajoutée avant la sortie publique de Vocab."
    },
    "privacy": {
      "title": "Politique de confidentialité",
      "updated": "Dernière mise à jour",
      "sections": [
        [
          "Données traitées",
          "Vocab peut traiter votre adresse e-mail, votre pseudo, vos préférences d’interface, vos paires de langues, thèmes, entrées de vocabulaire et votre progression. Les données d’authentification sont gérées via Supabase Auth."
        ],
        [
          "Pourquoi nous les traitons",
          "Ces données servent à créer et sécuriser votre compte, synchroniser votre contenu d’apprentissage, fournir les fonctions d’étude, restaurer l’accès et améliorer la fiabilité du service."
        ],
        [
          "Stockage et prestataires",
          "Les données de compte et d’apprentissage dans le cloud sont stockées via l’infrastructure Supabase. Avec le mode hors ligne, des copies pourront aussi être stockées localement sur votre appareil puis synchronisées."
        ],
        [
          "Conservation",
          "Les données liées au compte sont conservées tant que le compte est actif ou qu’elles sont nécessaires au service. Certaines données peuvent être conservées plus longtemps pour des raisons de sécurité, d’obligations légales ou de litiges."
        ],
        [
          "Vos choix et vos droits",
          "Selon la loi applicable, vous pouvez demander l’accès, la correction, la suppression ou d’autres contrôles sur vos données personnelles. Vous pouvez aussi modifier votre profil et vos identifiants dans Vocab."
        ],
        [
          "Sécurité",
          "Nous utilisons un accès authentifié, des contrôles d’accès à la base de données et des transferts chiffrés. Aucun service en ligne ne peut garantir une sécurité absolue."
        ],
        [
          "Modifications",
          "Cette politique peut être mise à jour lorsque Vocab ajoute le stockage hors ligne, des applications mobiles ou de nouveaux prestataires."
        ]
      ]
    },
    "terms": {
      "title": "Conditions d’utilisation",
      "updated": "Dernière mise à jour",
      "sections": [
        [
          "Utilisation de Vocab",
          "Vous pouvez utiliser Vocab à des fins personnelles d’apprentissage licites. Vous êtes responsable des informations ajoutées et de la sécurité de vos identifiants."
        ],
        [
          "Comptes",
          "Vous devez fournir une adresse e-mail utilisable et ne pas accéder au compte d’une autre personne sans autorisation."
        ],
        [
          "Votre contenu",
          "Vous restez responsable du vocabulaire, des notes et des autres contenus d’apprentissage que vous ajoutez. N’ajoutez pas de contenu que vous n’avez pas le droit d’utiliser."
        ],
        [
          "Disponibilité",
          "Vocab est en développement actif. Les fonctions peuvent changer, être interrompues ou contenir des erreurs. Une disponibilité continue ne peut pas être garantie."
        ],
        [
          "Utilisation acceptable",
          "N’essayez pas d’abuser du service, de le perturber, de contourner les contrôles de sécurité, de surcharger l’infrastructure ou d’utiliser Vocab à des fins illégales."
        ],
        [
          "Mesures sur le compte",
          "L’accès peut être limité lorsque cela est raisonnablement nécessaire pour la sécurité, la prévention des abus, le respect de la loi ou en cas de violation grave des conditions."
        ],
        [
          "Modifications",
          "Ces conditions peuvent évoluer avec le service. La version actuelle et la date de mise à jour seront publiées sur cette page."
        ]
      ]
    }
  },
  "it": {
    "footer": {
      "about": "Informazioni",
      "contact": "Contatti",
      "privacy": "Privacy",
      "terms": "Termini"
    },
    "about": {
      "title": "Informazioni su Vocab",
      "intro": "Vocab è un’app per imparare il vocabolario organizzando coppie di lingue, argomenti e parole e studiandoli con carte e test.",
      "body": "Il servizio viene sviluppato come prodotto multipiattaforma. Oggi la versione web è il client principale; sono previste funzioni mobili e offline basate sullo stesso account e sugli stessi dati di apprendimento."
    },
    "contact": {
      "title": "Contatti",
      "intro": "Usa i contatti qui sotto per domande su account, privacy, assistenza o questioni legali.",
      "noEmail": "Un indirizzo e-mail pubblico per l’assistenza verrà aggiunto prima del lancio pubblico di Vocab."
    },
    "privacy": {
      "title": "Informativa sulla privacy",
      "updated": "Ultimo aggiornamento",
      "sections": [
        [
          "Dati trattati",
          "Vocab può trattare indirizzo e-mail, nickname, preferenze dell’interfaccia, coppie di lingue, argomenti, voci di vocabolario e progresso di apprendimento. I dati di autenticazione sono gestiti tramite Supabase Auth."
        ],
        [
          "Perché li trattiamo",
          "Usiamo questi dati per creare e proteggere l’account, sincronizzare i contenuti di apprendimento, offrire le funzioni di studio, recuperare l’accesso e migliorare l’affidabilità del servizio."
        ],
        [
          "Archiviazione e fornitori",
          "I dati cloud di account e apprendimento sono archiviati tramite l’infrastruttura Supabase. Con il supporto offline, copie dei dati potranno essere salvate anche localmente sul dispositivo e sincronizzate in seguito."
        ],
        [
          "Conservazione",
          "I dati dell’account vengono conservati finché l’account è attivo o finché sono necessari per il servizio. Alcuni dati possono essere conservati più a lungo per sicurezza, obblighi legali o controversie."
        ],
        [
          "Scelte e diritti",
          "A seconda della legge applicabile, puoi richiedere accesso, correzione, eliminazione o altri controlli sui tuoi dati personali. Puoi anche modificare profilo e credenziali nelle impostazioni di Vocab."
        ],
        [
          "Sicurezza",
          "Usiamo accesso autenticato, controlli di accesso al database e trasporto cifrato. Nessun servizio online può garantire sicurezza assoluta."
        ],
        [
          "Modifiche",
          "Questa informativa può essere aggiornata quando Vocab aggiunge archiviazione offline, app mobili o nuovi fornitori di servizi."
        ]
      ]
    },
    "terms": {
      "title": "Termini di servizio",
      "updated": "Ultimo aggiornamento",
      "sections": [
        [
          "Uso di Vocab",
          "Puoi usare Vocab per scopi personali di apprendimento leciti. Sei responsabile delle informazioni che aggiungi e della sicurezza delle credenziali."
        ],
        [
          "Account",
          "Devi fornire un indirizzo e-mail utilizzabile e non devi accedere all’account di un’altra persona senza autorizzazione."
        ],
        [
          "I tuoi contenuti",
          "Rimani responsabile del vocabolario, delle note e degli altri contenuti di apprendimento che aggiungi. Non caricare contenuti che non hai il diritto di usare."
        ],
        [
          "Disponibilità",
          "Vocab è in sviluppo attivo. Le funzioni possono cambiare, interrompersi o contenere errori. Non possiamo garantire disponibilità ininterrotta."
        ],
        [
          "Uso accettabile",
          "Non tentare di abusare del servizio, interromperlo, aggirare i controlli di sicurezza, sovraccaricarlo o usare Vocab per attività illegali."
        ],
        [
          "Azioni sull’account",
          "L’accesso può essere limitato quando ragionevolmente necessario per sicurezza, prevenzione degli abusi, conformità legale o gravi violazioni."
        ],
        [
          "Modifiche",
          "Questi termini possono essere aggiornati con l’evoluzione del servizio. La versione corrente e la data di aggiornamento saranno pubblicate qui."
        ]
      ]
    }
  },
  "pt": {
    "footer": {
      "about": "Sobre",
      "contact": "Contacto",
      "privacy": "Privacidade",
      "terms": "Termos"
    },
    "about": {
      "title": "Sobre o Vocab",
      "intro": "O Vocab é uma aplicação para organizar e aprender vocabulário através de pares de idiomas, tópicos, cartões e testes.",
      "body": "O serviço está a ser desenvolvido como produto multiplataforma. A versão web é hoje o cliente principal; estão planeadas funções móveis e offline com a mesma conta e os mesmos dados de aprendizagem."
    },
    "contact": {
      "title": "Contacto",
      "intro": "Use os dados de contacto abaixo para questões sobre conta, privacidade, suporte ou assuntos legais.",
      "noEmail": "Será adicionado um e-mail público de suporte antes do lançamento público do Vocab."
    },
    "privacy": {
      "title": "Política de Privacidade",
      "updated": "Última atualização",
      "sections": [
        [
          "Dados que tratamos",
          "O Vocab pode tratar endereço de e-mail, nome, preferências da interface, pares de idiomas, tópicos, entradas de vocabulário e progresso de aprendizagem. Os dados de autenticação são tratados pelo Supabase Auth."
        ],
        [
          "Porque tratamos estes dados",
          "Usamos estes dados para criar e proteger a conta, sincronizar conteúdos de aprendizagem, disponibilizar funções de estudo, restaurar o acesso e melhorar a fiabilidade do serviço."
        ],
        [
          "Armazenamento e fornecedores",
          "Os dados cloud da conta e de aprendizagem são armazenados através da infraestrutura Supabase. Com suporte offline, cópias dos dados poderão também ser guardadas localmente no dispositivo e sincronizadas depois."
        ],
        [
          "Conservação",
          "Os dados da conta são mantidos enquanto a conta estiver ativa ou enquanto forem necessários para prestar o serviço. Alguns dados podem ser mantidos por mais tempo por segurança, obrigações legais ou litígios."
        ],
        [
          "As suas escolhas e direitos",
          "Dependendo da legislação aplicável, pode pedir acesso, correção, eliminação ou outros controlos dos seus dados pessoais. Também pode alterar perfil e credenciais nas definições do Vocab."
        ],
        [
          "Segurança",
          "Usamos acesso autenticado, controlos de acesso à base de dados e transporte encriptado. Nenhum serviço online pode garantir segurança absoluta."
        ],
        [
          "Alterações",
          "Esta política pode ser atualizada quando o Vocab incluir armazenamento offline, aplicações móveis ou novos prestadores de serviços."
        ]
      ]
    },
    "terms": {
      "title": "Termos de Serviço",
      "updated": "Última atualização",
      "sections": [
        [
          "Utilização do Vocab",
          "Pode usar o Vocab para fins pessoais de aprendizagem que sejam legais. É responsável pelas informações que adiciona e pela segurança das credenciais."
        ],
        [
          "Contas",
          "Deve fornecer um e-mail utilizável e não pode aceder à conta de outra pessoa sem autorização."
        ],
        [
          "O seu conteúdo",
          "Continua responsável pelo vocabulário, notas e outros conteúdos de aprendizagem que adiciona. Não carregue conteúdo que não tenha direito de usar."
        ],
        [
          "Disponibilidade",
          "O Vocab está em desenvolvimento ativo. As funções podem mudar, ficar temporariamente indisponíveis ou conter erros. Não podemos garantir disponibilidade ininterrupta."
        ],
        [
          "Utilização aceitável",
          "Não tente abusar do serviço, perturbá-lo, contornar controlos de segurança, sobrecarregá-lo ou usar o Vocab para atividades ilegais."
        ],
        [
          "Medidas sobre a conta",
          "O acesso pode ser limitado quando razoavelmente necessário por segurança, prevenção de abusos, cumprimento legal ou violações graves."
        ],
        [
          "Alterações",
          "Estes termos podem ser atualizados à medida que o serviço evolui. A versão atual e a data de atualização serão publicadas nesta página."
        ]
      ]
    }
  },
  "pl": {
    "footer": {
      "about": "O Vocab",
      "contact": "Kontakt",
      "privacy": "Prywatność",
      "terms": "Warunki"
    },
    "about": {
      "title": "O Vocab",
      "intro": "Vocab to aplikacja do organizowania i nauki słownictwa za pomocą par językowych, tematów, fiszek i testów.",
      "body": "Usługa jest rozwijana jako produkt wieloplatformowy. Obecnie głównym klientem jest wersja webowa; planowane są funkcje mobilne i offline oparte na tym samym koncie i danych nauki."
    },
    "contact": {
      "title": "Kontakt",
      "intro": "Użyj poniższych danych kontaktowych w sprawach konta, prywatności, pomocy lub kwestii prawnych.",
      "noEmail": "Publiczny adres e-mail pomocy zostanie dodany przed publicznym wydaniem Vocab."
    },
    "privacy": {
      "title": "Polityka prywatności",
      "updated": "Ostatnia aktualizacja",
      "sections": [
        [
          "Dane, które przetwarzamy",
          "Vocab może przetwarzać adres e-mail, nazwę użytkownika, preferencje interfejsu, pary językowe, tematy, wpisy słownictwa i postęp nauki. Dane uwierzytelniające są obsługiwane przez Supabase Auth."
        ],
        [
          "Dlaczego je przetwarzamy",
          "Używamy tych danych do tworzenia i zabezpieczania konta, synchronizacji treści nauki, udostępniania funkcji nauki, odzyskiwania dostępu i poprawy niezawodności usługi."
        ],
        [
          "Przechowywanie i dostawcy",
          "Dane konta i nauki w chmurze są przechowywane z użyciem infrastruktury Supabase. Po dodaniu trybu offline kopie danych mogą być również przechowywane lokalnie na urządzeniu i później synchronizowane."
        ],
        [
          "Okres przechowywania",
          "Dane konta są przechowywane, gdy konto jest aktywne lub gdy są potrzebne do świadczenia usługi. Niektóre dane mogą być przechowywane dłużej ze względów bezpieczeństwa, obowiązków prawnych lub sporów."
        ],
        [
          "Twoje prawa",
          "W zależności od obowiązującego prawa możesz żądać dostępu, poprawienia, usunięcia lub innych działań dotyczących danych osobowych. Profil i dane logowania można także zmieniać w ustawieniach Vocab."
        ],
        [
          "Bezpieczeństwo",
          "Stosujemy uwierzytelniony dostęp, kontrolę dostępu do bazy danych i szyfrowany transport. Żadna usługa online nie może zagwarantować całkowitego bezpieczeństwa."
        ],
        [
          "Zmiany",
          "Polityka może być aktualizowana wraz z dodaniem trybu offline, aplikacji mobilnych lub nowych dostawców usług."
        ]
      ]
    },
    "terms": {
      "title": "Warunki korzystania",
      "updated": "Ostatnia aktualizacja",
      "sections": [
        [
          "Korzystanie z Vocab",
          "Możesz używać Vocab do zgodnych z prawem celów osobistej nauki. Odpowiadasz za dodawane informacje i bezpieczeństwo danych logowania."
        ],
        [
          "Konta",
          "Musisz podać działający adres e-mail i nie możesz uzyskiwać dostępu do konta innej osoby bez zgody."
        ],
        [
          "Twoje treści",
          "Pozostajesz odpowiedzialny za słownictwo, notatki i inne treści nauki, które dodajesz. Nie przesyłaj treści, do których używania nie masz praw."
        ],
        [
          "Dostępność",
          "Vocab jest aktywnie rozwijany. Funkcje mogą się zmieniać, być czasowo niedostępne lub zawierać błędy. Nie gwarantujemy nieprzerwanej dostępności."
        ],
        [
          "Dozwolone użycie",
          "Nie próbuj nadużywać usługi, zakłócać jej działania, omijać zabezpieczeń, przeciążać infrastruktury ani używać Vocab do działań niezgodnych z prawem."
        ],
        [
          "Działania wobec konta",
          "Dostęp może zostać ograniczony, jeśli jest to rozsądnie konieczne dla bezpieczeństwa, zapobiegania nadużyciom, zgodności z prawem lub przy poważnym naruszeniu warunków."
        ],
        [
          "Zmiany",
          "Warunki mogą być aktualizowane wraz z rozwojem usługi. Aktualna wersja i data aktualizacji będą publikowane na tej stronie."
        ]
      ]
    }
  },
  "tr": {
    "footer": {
      "about": "Hakkında",
      "contact": "İletişim",
      "privacy": "Gizlilik",
      "terms": "Koşullar"
    },
    "about": {
      "title": "Vocab Hakkında",
      "intro": "Vocab; dil çiftleri, konular ve kelimeleri düzenleyip kartlar ve testlerle öğrenmeye yarayan bir kelime öğrenme uygulamasıdır.",
      "body": "Hizmet çoklu platform ürünü olarak geliştirilmektedir. Bugün web sürümü ana istemcidir; aynı hesap ve öğrenme verileriyle mobil ve çevrimdışı özellikler planlanmaktadır."
    },
    "contact": {
      "title": "İletişim",
      "intro": "Hesap, gizlilik, destek veya hukuki sorular için aşağıdaki iletişim bilgilerini kullanın.",
      "noEmail": "Vocab herkese açık olarak yayınlanmadan önce bir destek e-posta adresi eklenecektir."
    },
    "privacy": {
      "title": "Gizlilik Politikası",
      "updated": "Son güncelleme",
      "sections": [
        [
          "İşlediğimiz veriler",
          "Vocab e-posta adresinizi, kullanıcı adınızı, arayüz tercihlerinizi, dil çiftlerinizi, konularınızı, kelime kayıtlarınızı ve öğrenme ilerlemenizi işleyebilir. Kimlik doğrulama verileri Supabase Auth üzerinden işlenir."
        ],
        [
          "Neden işliyoruz",
          "Bu verileri hesabınızı oluşturmak ve korumak, öğrenme içeriğini senkronize etmek, çalışma özelliklerini sağlamak, erişimi geri yüklemek ve hizmet güvenilirliğini artırmak için kullanırız."
        ],
        [
          "Depolama ve sağlayıcılar",
          "Bulut hesap ve öğrenme verileri Supabase altyapısında saklanır. Çevrimdışı destek geldiğinde öğrenme verilerinin kopyaları cihazınızda yerel olarak da saklanabilir ve daha sonra senkronize edilebilir."
        ],
        [
          "Saklama süresi",
          "Hesap verileri hesap aktif olduğu veya hizmet için gerektiği sürece tutulur. Güvenlik, yasal yükümlülükler veya uyuşmazlıklar için bazı veriler daha uzun süre saklanabilir."
        ],
        [
          "Haklarınız",
          "Uygulanabilir hukuka bağlı olarak kişisel verilerinize erişim, düzeltme, silme veya diğer kontrolleri talep edebilirsiniz. Profil bilgileri ve hesap bilgileri Vocab ayarlarından değiştirilebilir."
        ],
        [
          "Güvenlik",
          "Kimliği doğrulanmış erişim, veritabanı erişim kontrolleri ve şifreli aktarım kullanırız. Hiçbir çevrimiçi hizmet mutlak güvenlik garanti edemez."
        ],
        [
          "Değişiklikler",
          "Bu politika Vocab çevrimdışı depolama, mobil uygulamalar veya yeni hizmet sağlayıcıları eklediğinde güncellenebilir."
        ]
      ]
    },
    "terms": {
      "title": "Hizmet Şartları",
      "updated": "Son güncelleme",
      "sections": [
        [
          "Vocab kullanımı",
          "Vocab’ı yasal kişisel öğrenme amaçları için kullanabilirsiniz. Eklediğiniz bilgilerden ve hesap bilgilerinizin güvenliğinden siz sorumlusunuz."
        ],
        [
          "Hesaplar",
          "Kullanılabilir bir e-posta adresi sağlamalı ve izin olmadan başka bir kişinin hesabına erişmemelisiniz."
        ],
        [
          "İçeriğiniz",
          "Eklediğiniz kelimeler, notlar ve diğer öğrenme içeriklerinden siz sorumlu kalırsınız. Kullanma hakkınız olmayan içerikleri yüklemeyin."
        ],
        [
          "Kullanılabilirlik",
          "Vocab aktif olarak geliştirilmektedir. Özellikler değişebilir, kesintiye uğrayabilir veya hata içerebilir. Kesintisiz kullanılabilirlik garanti edilemez."
        ],
        [
          "Kabul edilebilir kullanım",
          "Hizmeti kötüye kullanmaya, bozmaya, güvenlik kontrollerini aşmaya, aşırı yüklemeye veya Vocab’ı yasa dışı faaliyetlerde kullanmaya çalışmayın."
        ],
        [
          "Hesap işlemleri",
          "Güvenlik, kötüye kullanımın önlenmesi, yasal uyum veya ciddi ihlaller için makul ölçüde gerekli olduğunda erişim kısıtlanabilir."
        ],
        [
          "Değişiklikler",
          "Hizmet geliştikçe bu şartlar güncellenebilir. Güncel sürüm ve güncelleme tarihi bu sayfada yayınlanacaktır."
        ]
      ]
    }
  },
  "zh": {
    "footer": {
      "about": "关于",
      "contact": "联系",
      "privacy": "隐私",
      "terms": "条款"
    },
    "about": {
      "title": "关于 Vocab",
      "intro": "Vocab 是一款词汇学习应用，可通过语言组合、主题、单词卡和测试来整理并学习词汇。",
      "body": "Vocab 正在作为跨平台产品开发。目前网页版是主要客户端，未来计划基于同一账户和学习数据提供移动端与离线功能。"
    },
    "contact": {
      "title": "联系",
      "intro": "如有账户、隐私、支持或法律相关问题，请使用下方联系方式。",
      "noEmail": "Vocab 正式公开发布前会添加公开的支持邮箱。"
    },
    "privacy": {
      "title": "隐私政策",
      "updated": "最后更新",
      "sections": [
        [
          "我们处理的数据",
          "Vocab 可能处理你的电子邮箱、昵称、界面偏好、语言组合、主题、词汇条目和学习进度。身份验证数据由 Supabase Auth 处理。"
        ],
        [
          "处理目的",
          "我们使用这些数据来创建和保护账户、同步学习内容、提供学习功能、恢复访问权限并提高服务可靠性。"
        ],
        [
          "存储与服务提供商",
          "云端账户和学习数据使用 Supabase 基础设施存储。加入离线功能后，学习数据副本也可能保存在你的设备本地，并在恢复连接后同步。"
        ],
        [
          "保留期限",
          "账户相关数据会在账户有效或提供服务所需期间保留。出于安全、法律义务或争议处理需要，部分数据可能保留更长时间。"
        ],
        [
          "你的选择和权利",
          "根据适用法律，你可以申请访问、更正、删除个人数据或行使其他相关权利。你也可以在 Vocab 设置中修改个人资料和账户凭据。"
        ],
        [
          "安全",
          "我们使用身份验证访问、数据库访问控制和加密传输。任何在线服务都无法保证绝对安全。"
        ],
        [
          "变更",
          "当 Vocab 增加离线存储、移动应用或新的服务提供商时，本政策可能更新。"
        ]
      ]
    },
    "terms": {
      "title": "服务条款",
      "updated": "最后更新",
      "sections": [
        [
          "使用 Vocab",
          "你可以将 Vocab 用于合法的个人学习目的。你需要对所添加的信息以及账户凭据的安全负责。"
        ],
        [
          "账户",
          "你必须提供可用的电子邮箱，并且不得在未经许可的情况下访问他人的账户。"
        ],
        [
          "你的内容",
          "你仍需对添加的词汇、笔记和其他学习内容负责。请勿上传你无权使用的内容。"
        ],
        [
          "可用性",
          "Vocab 正在积极开发中。功能可能发生变化、暂时中断或包含错误。我们无法保证持续不中断的可用性。"
        ],
        [
          "合理使用",
          "请勿滥用或干扰服务、绕过安全措施、使系统过载，或将 Vocab 用于违法活动。"
        ],
        [
          "账户措施",
          "在安全、防止滥用、遵守法律或严重违反条款等合理必要的情况下，访问权限可能受到限制。"
        ],
        [
          "条款变更",
          "随着服务发展，这些条款可能更新。当前版本和更新日期会发布在本页面。"
        ]
      ]
    }
  },
  "ja": {
    "footer": {
      "about": "Vocab について",
      "contact": "お問い合わせ",
      "privacy": "プライバシー",
      "terms": "利用規約"
    },
    "about": {
      "title": "Vocab について",
      "intro": "Vocab は、言語ペア、トピック、単語を整理し、カードとテストで学習する語彙学習アプリです。",
      "body": "サービスはクロスプラットフォーム製品として開発されています。現在は Web 版が主要クライアントで、同じアカウントと学習データを利用するモバイル・オフライン機能を予定しています。"
    },
    "contact": {
      "title": "お問い合わせ",
      "intro": "アカウント、プライバシー、サポート、法的事項に関する質問は以下の連絡先をご利用ください。",
      "noEmail": "Vocab の一般公開前に公開サポート用メールアドレスを追加する予定です。"
    },
    "privacy": {
      "title": "プライバシーポリシー",
      "updated": "最終更新",
      "sections": [
        [
          "処理するデータ",
          "Vocab はメールアドレス、ニックネーム、表示設定、言語ペア、トピック、語彙エントリ、学習進捗を処理する場合があります。認証データは Supabase Auth で処理されます。"
        ],
        [
          "利用目的",
          "アカウントの作成・保護、学習内容の同期、学習機能の提供、アクセス復旧、サービスの信頼性向上のために利用します。"
        ],
        [
          "保存と提供者",
          "クラウド上のアカウント・学習データは Supabase のインフラを利用して保存されます。オフライン対応後は、学習データのコピーが端末にも保存され、接続時に同期される場合があります。"
        ],
        [
          "保存期間",
          "アカウントが有効な間、またはサービス提供に必要な間、関連データを保存します。セキュリティ、法的義務、紛争対応のためにより長く保存する場合があります。"
        ],
        [
          "選択と権利",
          "適用法に応じて、個人データへのアクセス、訂正、削除その他の権利を請求できます。プロフィール情報やアカウント情報は Vocab の設定から変更できます。"
        ],
        [
          "セキュリティ",
          "認証されたアクセス、データベースのアクセス制御、暗号化された通信を使用します。オンラインサービスに絶対的な安全性はありません。"
        ],
        [
          "変更",
          "オフライン保存、モバイルアプリ、新しいサービス提供者の追加に伴い、本ポリシーを更新する場合があります。"
        ]
      ]
    },
    "terms": {
      "title": "利用規約",
      "updated": "最終更新",
      "sections": [
        [
          "Vocab の利用",
          "Vocab は合法的な個人学習目的で利用できます。追加する情報とアカウント認証情報の安全管理は利用者の責任です。"
        ],
        [
          "アカウント",
          "利用可能なメールアドレスを提供し、許可なく他人のアカウントにアクセスしてはいけません。"
        ],
        [
          "あなたのコンテンツ",
          "追加する語彙、メモ、その他の学習コンテンツについては利用者が責任を負います。使用権のないコンテンツをアップロードしないでください。"
        ],
        [
          "可用性",
          "Vocab は開発中です。機能は変更、中断、または不具合を含む可能性があります。中断のない利用を保証することはできません。"
        ],
        [
          "許容される利用",
          "サービスの悪用、妨害、セキュリティ制御の回避、過負荷、違法行為への利用を行わないでください。"
        ],
        [
          "アカウントへの対応",
          "安全性、不正利用防止、法令遵守、重大な規約違反など合理的に必要な場合、アクセスを制限することがあります。"
        ],
        [
          "変更",
          "サービスの発展に伴って規約を更新する場合があります。最新版と更新日はこのページに掲載します。"
        ]
      ]
    }
  },
  "ko": {
    "footer": {
      "about": "Vocab 소개",
      "contact": "문의",
      "privacy": "개인정보",
      "terms": "이용약관"
    },
    "about": {
      "title": "Vocab 소개",
      "intro": "Vocab은 언어 조합, 주제, 단어를 정리하고 플래시카드와 테스트로 학습하는 어휘 학습 앱입니다.",
      "body": "서비스는 크로스 플랫폼 제품으로 개발 중입니다. 현재는 웹 버전이 주요 클라이언트이며, 같은 계정과 학습 데이터를 사용하는 모바일 및 오프라인 기능을 계획하고 있습니다."
    },
    "contact": {
      "title": "문의",
      "intro": "계정, 개인정보, 지원 또는 법적 문의는 아래 연락처를 이용하세요.",
      "noEmail": "Vocab 공개 출시 전에 공개 지원 이메일 주소가 추가될 예정입니다."
    },
    "privacy": {
      "title": "개인정보 처리방침",
      "updated": "마지막 업데이트",
      "sections": [
        [
          "처리하는 데이터",
          "Vocab은 이메일 주소, 닉네임, 인터페이스 설정, 언어 조합, 주제, 어휘 항목 및 학습 진행도를 처리할 수 있습니다. 인증 데이터는 Supabase Auth를 통해 처리됩니다."
        ],
        [
          "처리 목적",
          "계정을 생성하고 보호하며, 학습 콘텐츠를 동기화하고, 학습 기능과 접근 복구를 제공하고, 서비스 안정성을 개선하기 위해 데이터를 사용합니다."
        ],
        [
          "저장 및 서비스 제공자",
          "클라우드 계정과 학습 데이터는 Supabase 인프라를 통해 저장됩니다. 오프라인 기능이 추가되면 학습 데이터 사본이 기기에 로컬로 저장되고 연결 시 동기화될 수 있습니다."
        ],
        [
          "보관 기간",
          "계정이 활성 상태이거나 서비스 제공에 필요한 동안 관련 데이터를 보관합니다. 보안, 법적 의무 또는 분쟁 처리를 위해 더 오래 보관할 수 있습니다."
        ],
        [
          "선택과 권리",
          "적용 법률에 따라 개인정보에 대한 접근, 수정, 삭제 또는 기타 권리를 요청할 수 있습니다. Vocab 설정에서 프로필 정보와 계정 자격 증명도 변경할 수 있습니다."
        ],
        [
          "보안",
          "인증된 접근, 데이터베이스 접근 제어 및 암호화된 전송을 사용합니다. 어떤 온라인 서비스도 절대적인 보안을 보장할 수 없습니다."
        ],
        [
          "변경",
          "오프라인 저장, 모바일 앱 또는 추가 서비스 제공자가 도입되면 이 정책을 업데이트할 수 있습니다."
        ]
      ]
    },
    "terms": {
      "title": "서비스 이용약관",
      "updated": "마지막 업데이트",
      "sections": [
        [
          "Vocab 사용",
          "Vocab은 합법적인 개인 학습 목적으로 사용할 수 있습니다. 추가한 정보와 계정 자격 증명의 보안은 이용자 책임입니다."
        ],
        [
          "계정",
          "사용 가능한 이메일 주소를 제공해야 하며 허가 없이 다른 사람의 계정에 접근하면 안 됩니다."
        ],
        [
          "사용자 콘텐츠",
          "추가하는 어휘, 메모 및 기타 학습 콘텐츠에 대한 책임은 사용자에게 있습니다. 사용할 권리가 없는 콘텐츠를 업로드하지 마세요."
        ],
        [
          "서비스 이용 가능성",
          "Vocab은 활발히 개발 중입니다. 기능은 변경되거나 중단되거나 오류가 있을 수 있습니다. 중단 없는 이용을 보장할 수 없습니다."
        ],
        [
          "허용되는 사용",
          "서비스를 악용하거나 방해하거나 보안 통제를 우회하거나 과부하를 일으키거나 불법 활동에 Vocab을 사용하지 마세요."
        ],
        [
          "계정 조치",
          "보안, 악용 방지, 법적 준수 또는 심각한 약관 위반을 위해 합리적으로 필요한 경우 접근이 제한될 수 있습니다."
        ],
        [
          "변경",
          "서비스 발전에 따라 약관이 업데이트될 수 있습니다. 현재 버전과 업데이트 날짜는 이 페이지에 게시됩니다."
        ]
      ]
    }
  },
  "ar": {
    "footer": {
      "about": "حول Vocab",
      "contact": "اتصال",
      "privacy": "الخصوصية",
      "terms": "الشروط"
    },
    "about": {
      "title": "حول Vocab",
      "intro": "Vocab تطبيق لتعلم المفردات عبر تنظيم أزواج اللغات والموضوعات والكلمات ثم دراستها بالبطاقات والاختبارات.",
      "body": "يتم تطوير الخدمة كمنتج متعدد المنصات. نسخة الويب هي العميل الرئيسي حاليًا، مع التخطيط لدعم الهاتف والعمل دون اتصال باستخدام الحساب وبيانات التعلم نفسها."
    },
    "contact": {
      "title": "اتصال",
      "intro": "استخدم بيانات الاتصال أدناه للأسئلة المتعلقة بالحساب أو الخصوصية أو الدعم أو الأمور القانونية.",
      "noEmail": "سيتم إضافة بريد إلكتروني عام للدعم قبل الإطلاق العام لـ Vocab."
    },
    "privacy": {
      "title": "سياسة الخصوصية",
      "updated": "آخر تحديث",
      "sections": [
        [
          "البيانات التي نعالجها",
          "قد يعالج Vocab عنوان بريدك الإلكتروني واسمك المستعار وتفضيلات الواجهة وأزواج اللغات والموضوعات وإدخالات المفردات وتقدم التعلم. تتم معالجة بيانات المصادقة عبر Supabase Auth."
        ],
        [
          "لماذا نعالجها",
          "نستخدم هذه البيانات لإنشاء حسابك وتأمينه ومزامنة محتوى التعلم وتقديم ميزات الدراسة واستعادة الوصول وتحسين موثوقية الخدمة."
        ],
        [
          "التخزين والمزودون",
          "تُخزّن بيانات الحساب والتعلم السحابية باستخدام بنية Supabase. عند إضافة الوضع دون اتصال قد تُحفظ نسخ من بيانات التعلم محليًا على جهازك وتتم مزامنتها عند توفر الاتصال."
        ],
        [
          "الاحتفاظ",
          "تُحتفظ بيانات الحساب ما دام الحساب نشطًا أو ما دامت مطلوبة لتقديم الخدمة. قد نحتفظ ببعض البيانات مدة أطول لأسباب أمنية أو التزامات قانونية أو معالجة النزاعات."
        ],
        [
          "خياراتك وحقوقك",
          "بحسب القانون المعمول به قد تطلب الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها أو ممارسة حقوق أخرى. ويمكنك أيضًا تعديل معلومات الملف وبيانات الحساب من إعدادات Vocab."
        ],
        [
          "الأمان",
          "نستخدم وصولًا موثقًا وضوابط وصول لقاعدة البيانات ونقلًا مشفرًا. لا يمكن لأي خدمة عبر الإنترنت ضمان أمان مطلق."
        ],
        [
          "التغييرات",
          "قد يتم تحديث هذه السياسة عند إضافة التخزين دون اتصال أو تطبيقات الهاتف أو مزودي خدمات إضافيين."
        ]
      ]
    },
    "terms": {
      "title": "شروط الخدمة",
      "updated": "آخر تحديث",
      "sections": [
        [
          "استخدام Vocab",
          "يمكنك استخدام Vocab لأغراض تعلم شخصية قانونية. أنت مسؤول عن المعلومات التي تضيفها وعن الحفاظ على أمان بيانات حسابك."
        ],
        [
          "الحسابات",
          "يجب تقديم عنوان بريد إلكتروني صالح وعدم الوصول إلى حساب شخص آخر دون إذن."
        ],
        [
          "محتواك",
          "تبقى مسؤولًا عن المفردات والملاحظات ومحتوى التعلم الآخر الذي تضيفه. لا ترفع محتوى لا تملك حق استخدامه."
        ],
        [
          "التوفر",
          "Vocab قيد التطوير النشط. قد تتغير الميزات أو تنقطع أو تحتوي على أخطاء. لا يمكننا ضمان توفر الخدمة دون انقطاع."
        ],
        [
          "الاستخدام المقبول",
          "لا تحاول إساءة استخدام الخدمة أو تعطيلها أو تجاوز ضوابط الأمان أو تحميلها فوق طاقتها أو استخدام Vocab لنشاط غير قانوني."
        ],
        [
          "إجراءات الحساب",
          "قد يتم تقييد الوصول عندما يكون ذلك ضروريًا بشكل معقول للأمان أو منع إساءة الاستخدام أو الامتثال القانوني أو الانتهاكات الجسيمة للشروط."
        ],
        [
          "التغييرات",
          "قد يتم تحديث هذه الشروط مع تطور الخدمة. سيتم نشر الإصدار الحالي وتاريخ التحديث على هذه الصفحة."
        ]
      ]
    }
  },
  "hi": {
    "footer": {
      "about": "Vocab के बारे में",
      "contact": "संपर्क",
      "privacy": "गोपनीयता",
      "terms": "शर्तें"
    },
    "about": {
      "title": "Vocab के बारे में",
      "intro": "Vocab शब्दावली सीखने का ऐप है जो भाषा जोड़ियों, विषयों और शब्दों को व्यवस्थित करके फ्लैशकार्ड और टेस्ट से अभ्यास कराता है।",
      "body": "सेवा को क्रॉस-प्लेटफ़ॉर्म उत्पाद के रूप में विकसित किया जा रहा है। फिलहाल वेब संस्करण मुख्य क्लाइंट है; उसी खाते और सीखने के डेटा के साथ मोबाइल और ऑफलाइन सुविधाएँ योजनाबद्ध हैं।"
    },
    "contact": {
      "title": "संपर्क",
      "intro": "खाता, गोपनीयता, सहायता या कानूनी प्रश्नों के लिए नीचे दिए संपर्क विवरण का उपयोग करें।",
      "noEmail": "Vocab के सार्वजनिक लॉन्च से पहले सार्वजनिक सहायता ईमेल जोड़ा जाएगा।"
    },
    "privacy": {
      "title": "गोपनीयता नीति",
      "updated": "अंतिम अपडेट",
      "sections": [
        [
          "हम कौन-सा डेटा संसाधित करते हैं",
          "Vocab आपका ईमेल पता, उपनाम, इंटरफ़ेस प्राथमिकताएँ, भाषा जोड़ियाँ, विषय, शब्दावली प्रविष्टियाँ और सीखने की प्रगति संसाधित कर सकता है। प्रमाणीकरण डेटा Supabase Auth के माध्यम से संभाला जाता है।"
        ],
        [
          "हम इसे क्यों संसाधित करते हैं",
          "इस डेटा का उपयोग खाता बनाने और सुरक्षित रखने, सीखने की सामग्री सिंक्रोनाइज़ करने, अध्ययन सुविधाएँ देने, पहुँच बहाल करने और सेवा की विश्वसनीयता सुधारने के लिए किया जाता है।"
        ],
        [
          "भंडारण और प्रदाता",
          "क्लाउड खाता और सीखने का डेटा Supabase इन्फ्रास्ट्रक्चर पर संग्रहीत होता है। ऑफलाइन समर्थन आने पर सीखने के डेटा की प्रतियाँ डिवाइस पर स्थानीय रूप से भी रखी जा सकती हैं और बाद में सिंक्रोनाइज़ की जा सकती हैं।"
        ],
        [
          "डेटा रखने की अवधि",
          "खाता सक्रिय रहने या सेवा के लिए आवश्यक होने तक संबंधित डेटा रखा जाता है। सुरक्षा, कानूनी दायित्व या विवादों के कारण कुछ डेटा अधिक समय तक रखा जा सकता है।"
        ],
        [
          "आपके विकल्प और अधिकार",
          "लागू कानून के आधार पर आप अपने व्यक्तिगत डेटा तक पहुँच, सुधार, हटाने या अन्य नियंत्रण का अनुरोध कर सकते हैं। प्रोफ़ाइल और खाता जानकारी Vocab सेटिंग्स से बदली जा सकती है।"
        ],
        [
          "सुरक्षा",
          "हम प्रमाणित पहुँच, डेटाबेस पहुँच नियंत्रण और एन्क्रिप्टेड ट्रांसपोर्ट का उपयोग करते हैं। कोई भी ऑनलाइन सेवा पूर्ण सुरक्षा की गारंटी नहीं दे सकती।"
        ],
        [
          "बदलाव",
          "ऑफलाइन स्टोरेज, मोबाइल ऐप या नए सेवा प्रदाता जुड़ने पर यह नीति अपडेट की जा सकती है।"
        ]
      ]
    },
    "terms": {
      "title": "सेवा की शर्तें",
      "updated": "अंतिम अपडेट",
      "sections": [
        [
          "Vocab का उपयोग",
          "आप Vocab का उपयोग वैध व्यक्तिगत सीखने के उद्देश्यों के लिए कर सकते हैं। जो जानकारी आप जोड़ते हैं और अपने खाते की सुरक्षा के लिए आप जिम्मेदार हैं।"
        ],
        [
          "खाते",
          "आपको उपयोग योग्य ईमेल पता देना होगा और बिना अनुमति किसी दूसरे व्यक्ति के खाते में प्रवेश नहीं करना चाहिए।"
        ],
        [
          "आपकी सामग्री",
          "आप जो शब्दावली, नोट्स और अन्य सीखने की सामग्री जोड़ते हैं उसकी जिम्मेदारी आपकी रहती है। ऐसी सामग्री अपलोड न करें जिसे उपयोग करने का अधिकार आपके पास नहीं है।"
        ],
        [
          "उपलब्धता",
          "Vocab सक्रिय विकास में है। सुविधाएँ बदल सकती हैं, अस्थायी रूप से बंद हो सकती हैं या उनमें त्रुटियाँ हो सकती हैं। हम बिना रुकावट उपलब्धता की गारंटी नहीं दे सकते।"
        ],
        [
          "स्वीकार्य उपयोग",
          "सेवा का दुरुपयोग, बाधा, सुरक्षा नियंत्रणों को बायपास, अत्यधिक लोड या Vocab का गैरकानूनी गतिविधियों में उपयोग न करें।"
        ],
        [
          "खाता कार्रवाई",
          "सुरक्षा, दुरुपयोग रोकने, कानूनी अनुपालन या शर्तों के गंभीर उल्लंघन के लिए उचित रूप से आवश्यक होने पर पहुँच सीमित की जा सकती है।"
        ],
        [
          "बदलाव",
          "सेवा के विकसित होने पर ये शर्तें अपडेट की जा सकती हैं। वर्तमान संस्करण और अपडेट की तारीख इस पेज पर प्रकाशित होगी।"
        ]
      ]
    }
  }
};
