/** Декады XVIII века для фильтра контента на странице главы */
export const CHAPTER_DECADES = [
  { start: 1700, label: '1700-е' },
  { start: 1710, label: '1710-е' },
  { start: 1720, label: '1720-е' },
  { start: 1730, label: '1730-е' },
  { start: 1740, label: '1740-е' },
  { start: 1750, label: '1750-е' },
  { start: 1760, label: '1760-е' },
  { start: 1770, label: '1770-е' },
  { start: 1780, label: '1780-е' },
  { start: 1790, label: '1790-е' },
] as const

/** Хронологические рамки блоков (годы включительно для пересечения с декадой) */
export const SECTION_ERA: Record<
  'hero' | 'intro' | 'canals' | 'surviving' | 'shipyards' | 'fleet' | 'granite' | 'conclusion',
  { start: number; end: number }
> = {
  hero: { start: 1700, end: 1800 },
  intro: { start: 1700, end: 1710 },
  canals: { start: 1710, end: 1780 },
  surviving: { start: 1710, end: 1800 },
  shipyards: { start: 1700, end: 1730 },
  fleet: { start: 1720, end: 1730 },
  granite: { start: 1760, end: 1800 },
  conclusion: { start: 1780, end: 1800 },
}

export function decadeOverlapsSection(decadeStart: number, range: { start: number; end: number }) {
  const decadeEnd = decadeStart + 9
  return range.start <= decadeEnd && range.end >= decadeStart
}

export const GLOSSARY = {
  venice: {
    term: '«Русская Венеция»',
    definition:
      'Устойчивый образ в описаниях Петербурга и планов Васильевского острова: сеть каналов, как в Венецианской лагуне, для разгрузки судов и прогулок.',
  },
  generalPlan: {
    term: 'генеральный план',
    definition:
      'Схема застройки и инженерных работ на большой территории; в Петербурте XVIII века планы утверждались двором и определяли облик города на десятилетия.',
  },
  linii: {
    term: '«линии»',
    definition:
      'На Васильевском острове — названия улиц, проложенных по дну засыпанных каналов; «линия» — одна сторона бывшей протоки, отчего сетка улиц осталась «канальной».',
  },
  melioration: {
    term: 'мелиорация',
    definition:
      'Улучшение земель: здесь осушение островных низин отводаом воды в Неву и залив, чтобы строить на более сухом грунте.',
  },
  embankment: {
    term: 'набережная',
    definition:
      'Искусственно укреплённый берег: в начале века — дерево и сваи, позже гранитные парапеты и отмостки, защищающие город от размыва и наводнений.',
  },
  galley: {
    term: 'Галера',
    definition:
      'Длинное гребное судно с низкой осадкой; на Балтике использовалось в прибрежных операциях и при штиле, когда парус не давал хода.',
  },
  lineShip: {
    term: 'линейный корабль',
    definition:
      'Крупный парусный боевой корабль двух–трёх палуб с бортовым строем пушек — основа эскадры линейного боя в XVIII веке.',
  },
  frigate: {
    term: 'фрегат',
    definition:
      'Быстроходное парусное судно меньше линкора; разведка, сопровождение конвоев, крейсерские задачи у побережья.',
  },
  balticFleet: {
    term: 'Балтийский флот',
    definition:
      'Ведомство и силы морской обороны России на Балтике; базы в Петербурге и Кронштадте формировались с первых лет города.',
  },
} as const

export type GlossaryId = keyof typeof GLOSSARY

/** Подписи к иллюстрациям в духе музейной подписи (условные инвентарные пометы для вёрстки) */
export const MUSEUM_FIGURES = {
  compareCanalPlan: {
    inventoryLabel: 'Илл. 2',
    period: '1716 / современная съёмка',
    line: 'Слева — фрагмент генерального плана Трезини; справа — тот же район города в наши дни.',
  },
  canalWinter: {
    inventoryLabel: 'Фото 1',
    period: 'Зимняя канавка, XVIII в. — наши дни',
    line: 'Связка Невы и Мойки у Зимнего дворца; один из немногих сохранившихся участков «венецианского» замысла.',
  },
  canalSwan: {
    inventoryLabel: 'Фото 2',
    period: 'Лебяжья канавка, 1711–1719',
    line: 'Протока вдоль Летнего сада; название связано с разведением лебедей при дворе.',
  },
  canalMoyka: {
    inventoryLabel: 'Фото 3',
    period: 'Мойка, облагорожение 1720-х',
    line: 'Естественная протока, оформленная как городской канал с набережными и мостами.',
  },
  canalFontanka: {
    inventoryLabel: 'Фото 4',
    period: 'Фонтанка, набережные 1780–1790-х',
    line: 'Южная граница застройки века; вода питала фонтаны Летнего сада.',
  },
  admiralty: {
    inventoryLabel: 'Илл. 3',
    period: 'Главное Адмиралтейство, XVIII в.',
    line: 'Верфь и крепость на Неве; шпиль и расходящиеся улицы задают центр планировки.',
  },
  kronstadt: {
    inventoryLabel: 'Илл. 4',
    period: 'Кронштадт, форты и гавань',
    line: 'Остров Котлин у Финского залива — база ремонта и защиты морских подступов к столице.',
  },
  fleetLine: {
    inventoryLabel: 'Черт. 1',
    period: 'Линейный корабль, 1-я четв. XVIII в.',
    line: 'Условный вид многопалубного парусника линии боя по материалам эпохи Петра I.',
  },
  fleetFrigate: {
    inventoryLabel: 'Черт. 2',
    period: 'Фрегат',
    line: 'Быстроходное крейсерское судно средней осадки для разведки и сопровождения.',
  },
  fleetGalley: {
    inventoryLabel: 'Черт. 3',
    period: 'Галера',
    line: 'Гребной состав прибрежных эскадр; эффективна в шхерах и при штиле.',
  },
  graniteTransform: {
    inventoryLabel: 'Колл. 5',
    period: '1703–1760-е / 1760–1790-е',
    line: 'Сопоставление деревянной и гранитной набережной как этапов «каменного» преображения города.',
  },
  tradePort: {
    inventoryLabel: 'Илл. 6',
    period: 'Торговый порт, 2-я пол. XVIII в.',
    line: 'Суда у причалов отражают рост морской торговли через петербургские гавани.',
  },
} as const

export type MuseumFigureId = keyof typeof MUSEUM_FIGURES

/** Порядок для прокрутки к первому блоку, пересекающемуся с выбранной декадой */
export const TIMELINE_SCROLL_ORDER: Array<{
  elementId: string
  eraKey: keyof typeof SECTION_ERA
}> = [
  { elementId: 'chapter-top', eraKey: 'hero' },
  { elementId: 'intro', eraKey: 'intro' },
  { elementId: 'canals', eraKey: 'canals' },
  { elementId: 'canals-surviving', eraKey: 'surviving' },
  { elementId: 'shipyards', eraKey: 'shipyards' },
  { elementId: 'fleet', eraKey: 'fleet' },
  { elementId: 'granite', eraKey: 'granite' },
  { elementId: 'conclusion', eraKey: 'conclusion' },
]
