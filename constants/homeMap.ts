/**
 * Главная страница — интерактивный GIS-стол: слои карт и узлы по эпохам.
 * Координаты меток — проценты от контейнера карты (верхний левый угол).
 */

export type EraId = "1725" | "1868" | "1929" | "1939" | "modern";

export interface MapNode {
  id: string;
  name: string;
  /** горизонталь, % от ширины контейнера */
  leftPct: number;
  /** вертикаль, % от высоты контейнера */
  topPct: number;
  period: string;
  /** Краткое описание / «технический лог» */
  technicalImpact: string;
  /** Локальный ассет или внешний URL (через обычный img при необходимости) */
  imageSrc: string;
  imageAlt: string;
}

export interface EraConfig {
  id: EraId;
  label: string;
  chapter: number;
  mapSrc: string;
  mapAlt: string;
  nodes: MapNode[];
}

export const HOME_ERA_CONFIG: EraConfig[] = [
  {
    id: "1725",
    label: "Начало XVIII века",
    chapter: 1,
    mapSrc: "/assets/home/ПЛАН СПБ 1725.jpg",
    mapAlt: "Генеральный план Санкт-Петербурга, начало XVIII века",
    nodes: [
      {
        id: "lebyazhy",
        name: "Лебяжий канал",
        leftPct: 58,
        topPct: 42,
        period: "1711–1719",
        technicalImpact:
          "Ранний гидроузел дворцового анклава — осушение низменных участков, связь акваторий Летнего сада и Невы.",
        imageSrc: "/assets/ch1/ch1_swan_canal.jpg",
        imageAlt: "Лебяжий (Лебяжья) канавка у Летнего сада",
      },
      {
        id: "krasny",
        name: "Красный канал",
        leftPct: 62,
        topPct: 48,
        period: "1720–е",
        technicalImpact:
          "Фрагмент защитно-сливной системы Адмиралтейской верфи: отвод воды со стапелей и промышленных площадок.",
        imageSrc: "/assets/ch1/ch1_winter_canal.jpg",
        imageAlt: "Городской канальный ландшафт XVIII века",
      },
      {
        id: "vo_canals",
        name: "Системы каналов В.О.",
        leftPct: 32,
        topPct: 48,
        period: "1720–1750-е",
        technicalImpact:
          "Радиальная канальная сеть Васильевского острова: разделение района на линии застройки и грузовые подходы к гавани.",
        imageSrc: "/assets/ch1/ch1_fontanka.jpg",
        imageAlt: "Каналы и линии застройки",
      },
      {
        id: "line_ship",
        name: "Линейный парусный корабль",
        leftPct: 52,
        topPct: 54,
        period: "1700–1790-е",
        technicalImpact:
          "Корабли «линии баталии» — основа Балтийского флота эпохи Петра I; стандартизация артиллерии и корпуса для линкоров Адмиралтейства.",
        imageSrc: "/assets/ch1/ch1_galley.jpg",
        imageAlt: "Парусный корабль Балтийского флота",
      },
    ],
  },
  {
    id: "1868",
    label: "XIX век",
    chapter: 2,
    mapSrc: "/assets/home/ПЛАН СПБ 1868.jpg",
    mapAlt: "План Санкт-Петербурга, вторая половина XIX века",
    nodes: [
      {
        id: "elizaveta",
        name: "Пароход «Елизавета»",
        leftPct: 73,
        topPct: 40,
        period: "1850–1880-е",
        technicalImpact:
          "Символ паровой эпохи на Неве: регулярные пассажирские и грузовые рейсы, предтеча пригородного флота.",
        imageSrc: "/assets/ch2/elizaveta_side.jpg",
        imageAlt: "Пароход Елизавета",
      },
      {
        id: "baltic_plant",
        name: "Балтийский завод",
        leftPct: 25,
        topPct: 68,
        period: "1856–",
        technicalImpact:
          "Крупнейшее судостроительное и машиностроительное предприятие; броненосцы, ледоколы, ремонт флота.",
        imageSrc: "/assets/ch2/gutuevsky.jpg",
        imageAlt: "Балтийский завод",
      },
      {
        id: "marine_canal",
        name: "Петербургский Морской канал",
        leftPct: 28,
        topPct: 87,
        period: "1874–1885",
        technicalImpact:
          "Связь центра города с финским заливом для крупнотоннажных судов — логистический разрез промышленного Петербурга.",
        imageSrc: "/assets/ch2/mariinsky_map.jpg",
        imageAlt: "Схема морского канала",
      },
      {
        id: "dry_docks",
        name: "Сухие доки",
        leftPct: 12,
        topPct: 55,
        period: "XIX век",
        technicalImpact:
          "Инфраструктура ремонта и строительства корпусов без затопления стапеля — ускорение оборота флота.",
        imageSrc: "/assets/ch2/oranienbaum.jpg",
        imageAlt: "Портовая инфраструктура",
      },
    ],
  },
  {
    id: "1929",
    label: "XX век · I пол.",
    chapter: 3,
    mapSrc: "/assets/home/ПЛАН СПБ 1929.jpg",
    mapAlt: "Схема акваторий и коммуникаций (межвоенный период)",
    nodes: [
      {
        id: "shtandart",
        name: "Яхта «Штандарт»",
        leftPct: 52,
        topPct: 45,
        period: "1893–1936",
        technicalImpact:
          "Императорская яхта как эталон судовой архитектуры и протокола; символ морского престижа предреволюционной эпохи.",
        imageSrc: "/assets/ch3/vasiliev.jpg",
        imageAlt: "Морской офицерский контекст эпохи",
      },
      {
        id: "ryurik2",
        name: "Крейсер «Рюрик» (II)",
        leftPct: 46,
        topPct: 58,
        period: "1906–",
        technicalImpact:
          "Броненосный крейсер Балтики — шаг к дальнему плаванию и артиллерийским стандартам начала XX века.",
        imageSrc: "/assets/ch3/ladoga_fleet.jpg",
        imageAlt: "Корабли Балтики",
      },
      {
        id: "tovarishch",
        name: "Угольная гавань",
        leftPct: 17,
        topPct: 94,
        period: "1922–",
        technicalImpact:
          "Символ восстановления гражданского мореплавания РСФСР; рейсы «Балтморфлота» и закрепление кодекса смешанного плавания.",
        imageSrc: "/assets/ch3/decree.jpg",
        imageAlt: "Документы и флот 1920-х",
      },
      {
        id: "kronshtadt",
        name: "Морской порт",
        leftPct: 22,
        topPct: 87,
        period: "1704–XX в.",
        technicalImpact:
          "Внешний рейд и крепость — прикрытие дорог на Финский залив, база Балтийского флота и якорная стоянка конвоирующего флота.",
        imageSrc: "/assets/ch1/ch1_kronstadt.jpg",
        imageAlt: "Кронштадт, вид с воды",
      },
    ],
  },
  {
    id: "1939",
    label: "XX век · II пол.",
    chapter: 4,
    mapSrc: "/assets/home/ПЛАН СПБ 1939.jpg",
    mapAlt: "Транспортная сеть и глубоководная система",
    nodes: [
      {
        id: "egs",
        name: "ЕГС (Волго-Балт)",
        leftPct: 50,
        topPct: 42,
        period: "1930–1950-е формирование",
        technicalImpact:
          "Единая глубоководная система: гарантированный график малой осадки vs мореходность корпуса «река-море».",
        imageSrc: "/assets/ch4/egs_map.jpg",
        imageAlt: "Схема ЕГС",
      },
      {
        id: "baltic_type",
        name: "Сухогруз «Балтийский»",
        leftPct: 58,
        topPct: 55,
        period: "1962–",
        technicalImpact:
          "Первое массовое решение смешанного плавания: прямой экспорт без европейской перевалки в советской модели экспорта.",
        imageSrc: "/assets/ch4/baltiyskiy.jpg",
        imageAlt: "Проект Балтийский",
      },
      {
        id: "port_district",
        name: "4-й район порта (терминал)",
        leftPct: 45,
        topPct: 62,
        period: "1973–",
        technicalImpact:
          "Контейнерная специализация: первый советский терминал намыва и Турухтанные острова — разрыв с генеральной навалкой.",
        imageSrc: "/assets/ch4/container_terminal.jpg",
        imageAlt: "Контейнерный терминал",
      },
    ],
  },
  {
    id: "modern",
    label: "СОВРЕМЕННЫЙ",
    chapter: 5,
    mapSrc: "/assets/home/ПЛАН СПБ Современный.jpg",
    mapAlt: "Современный Санкт-Петербург, морской фасад",
    nodes: [
      {
        id: "bronka",
        name: "ММПК «Бронка»",
        leftPct: 35,
        topPct: 70,
        period: "2010-е",
        technicalImpact:
          "Многофункциональный морской перегрузочный комплекс в западной части порта — углубление фарватера и глубоководные причалы.",
        imageSrc: "/assets/ch5/marine_facade.jpg",
        imageAlt: "Современный портовый комплекс",
      },
      {
        id: "marine_facade_port",
        name: "Пассажирский порт «Морской фасад»",
        leftPct: 7,
        topPct: 66,
        period: "2005–2011",
        technicalImpact:
          "Круизный хаб на намыве: дноуглубление 10,7 м, причальный фронт >2 км, единая зона погранконтроля.",
        imageSrc: "/assets/ch5/marine_facade.jpg",
        imageAlt: "Морской фасад",
      },
      {
        id: "kzs",
        name: "КЗС (шлюз С-1)",
        leftPct: 52,
        topPct: 48,
        period: "2011",
        technicalImpact:
          "Комплекс защитных сооружений Финского залива: шлюз С-1 — регулирование уровня и защита навигации в Невской губе.",
        imageSrc: "/assets/ch5/volgo_balt_path.jpg",
        imageAlt: "Водный путь и инфраструктура",
      },
      {
        id: "ekohod",
        name: "ЭкоходЪ 2",
        leftPct: 48,
        topPct: 56,
        period: "2020-е",
        technicalImpact:
          "Экологически ориентированное пассажирское судно внутригородской навигации — снижение выбросов на Неве.",
        imageSrc: "/assets/ch5/mor_nab.jpg",
        imageAlt: "Современная набережная",
      },
      {
        id: "meteor120",
        name: "Метеор-120Р",
        leftPct: 62,
        topPct: 52,
        period: "с 2021",
        technicalImpact:
          "Судно на подводных крыльях до 75 км/ч, 120 пассажиров — обновление скоростных линий Петергоф–Кронштадт.",
        imageSrc: "/assets/ch5/meteor_120r.jpg",
        imageAlt: "Метеор-120Р",
      },
    ],
  },
];

export const CHAPTER_SWITCHER = [
  {
    n: 1,
    href: "/chapter-1",
    title: "XVIII век",
    subtitle: "Рождение морской столицы",
    tech: "ГЛАВА 1",
    priority: true,
  },
  {
    n: 2,
    href: "/chapter-2",
    title: "XIX век",
    subtitle: "Железо и пар",
    tech: "ГЛАВА 2",
    priority: false,
  },
  {
    n: 3,
    href: "/chapter-3",
    title: "XX век · I пол.",
    subtitle: "Потрясения и героизм",
    tech: "ГЛАВА 3",
    priority: false,
  },
  {
    n: 4,
    href: "/chapter-4",
    title: "XX век · II пол.",
    subtitle: "Модернизация и перелом",
    tech: "ГЛАВА 4",
    priority: false,
  },
  {
    n: 5,
    href: "/chapter-5",
    title: "XXI век",
    subtitle: "Цифровой океан",
    tech: "ГЛАВА 5",
    priority: false,
  },
] as const;
