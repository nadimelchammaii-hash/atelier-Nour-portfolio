/**
 * ATELIER NOUR — PROJECT DATA
 * ------------------------------------------------------------------
 * Single source of truth for every project. To swap content for a real
 * client, edit this file only — pages, routes, filters, SEO and the
 * credits page are all generated from it.
 *
 * Field reference
 *   slug        URL segment → /projects/<slug>  (and /ar/projects/<slug>)
 *   category    'exterior' | 'interior' | 'landscape'
 *   featured    shown on the home page (in array order)
 *   year, area  area in m² (number)
 *   title, location, excerpt, description   { en, ar }  — description = array of paragraphs
 *   cover       { src, color }               — src is the Unsplash path "photo-…"
 *   gallery     [{ src, ratio, color }]      — ratio "w/h"; color = dominant colour placeholder
 *   credit      per image: { name, username } of the Unsplash photographer
 *
 * To swap an image: add it to the image library `I` below and reference its key.
 */

export const categories = ['exterior', 'interior', 'landscape']

// --- Image library -------------------------------------------------
// Unsplash photo path, dominant colour (solid placeholder while loading) and photographer.
// All images are free under the Unsplash License; credits are listed on /credits.
const I = {
  hero:          ['photo-1769886250520-ce0f9abbcc9d', '#B6987D', 'Sies Kranen', 'sinusfiction'],
  cedarCover:    ['photo-1678889284769-b7dcbec1f082', '#705F5B', 'Igor Savelev', 'isavelev'],
  cedarTimber:   ['photo-1628173360693-8c36480e29ef', '#6B6A67', 'Moritz Kindler', 'moritz_photography'],
  cedarView:     ['photo-1722108539182-f25a8fe53ead', '#575854', 'Polina Kuzovkova', 'p_kuzovkova'],
  cedarEaves:    ['photo-1654291679084-7cbf4086cfff', '#6E7876', 'Leon Kohle', 'leon_kohle'],
  batrounCover:  ['photo-1629199159634-28a88785cee5', '#7D929F', 'Denis Dimitrov', 'gpixel_view'],
  batrounArch:   ['photo-1705268887866-e7344529b540', '#7E8788', 'Patrick Lalonde', 'patrick_lalonde'],
  batrounFrame:  ['photo-1767555027401-6829988ca9df', '#8C8886', 'George Pagan III', 'gpthree'],
  batrounLoggia: ['photo-1791720474797-323fb04683e5', '#656564', 'Thomas K', 'thomasthomask'],
  courtCover:    ['photo-1763762626519-e096aa376ba9', '#77736F', 'Willian Reis', 'wriopomba'],
  courtGarden:   ['photo-1680079640329-238b05dee3bf', '#646A55', 'D5 Render', 'd5render'],
  courtPavilion: ['photo-1680262971099-08e1d256f1c8', '#595751', 'D5 Render', 'd5render'],
  courtStone:    ['photo-1747258818911-dfde27ecabba', '#463A3E', 'Diego Marín', 'diegosmarines'],
  gemCover:      ['photo-1620635346977-c1633c89e3e6', '#5F5A52', 'Ignat Kushnarev', 'ignatkushanrev'],
  gemArch:       ['photo-1784740226588-480eeabf33e9', '#302314', 'Alexander Mass', 'alexandermassph'],
  gemFloor:      ['photo-1767554261805-95185e9ecf87', '#A18D84', 'George Pagan III', 'gpthree'],
  gemStair:      ['photo-1760961823000-b7e3e3726d4c', '#BFA490', 'Alex Cooper', 'alexcooper13'],
  loftCover:     ['photo-1791763259248-dc41a1e9f84c', '#6E685F', 'Jason Leung', 'ninjason'],
  loftBrick:     ['photo-1729932989809-f473b1523a9b', '#605B46', 'Khanh Do', 'donguyenkhanhs'],
  loftArch:      ['photo-1741115955089-26cceb9cbc0f', '#A8A4A1', 'Raymond Yeung', 'optiny'],
  loftBeams:     ['photo-1776090188651-a1ec2cf2bdb0', '#4D4B49', 'LISK OBE', 'summerobelisk'],
  kouraCover:    ['photo-1675970211114-1229ffc3478c', '#9A9892', 'Chris Linnett', 'chrislinnett'],
  kouraOchre:    ['photo-1609128026918-f477eb457326', '#A9874D', 'Beth Macdonald', 'elsbethcat'],
  kouraNiche:    ['photo-1744731057889-caff60d637f5', '#97877A', 'Francesco Ungaro', 'francesco_ungaro'],
  kouraPlaster:  ['photo-1742513850462-a1a9e6fe89a8', '#99825F', 'Donald Merrill', 'donald_merrill'],
  terrCover:     ['photo-1552423310-ba74b8de5e6f', '#545E54', 'Stacey Franco', 'staceyfranc0'],
  terrWall:      ['photo-1533477473793-215316eb8efd', '#8A8075', 'Jon Tyson', 'jontyson'],
  terrOlive:     ['photo-1665306500752-82766fe2ef1c', '#686F57', 'Self Taught', 'selftaught'],
  terrSteps:     ['photo-1767350903634-310178c73201', '#7E8158', 'George', 'geox3'],
  anfehCover:    ['photo-1508418065966-2d7f39284ad9', '#424D49', 'Charles Larose', 'charleyfl'],
  anfehSalt:     ['photo-1570529987819-31555c8997d3', '#77949A', 'Sébastien Goldberg', 'sebastiengoldberg'],
  anfehPool:     ['photo-1614368454831-0d6d814c87e2', '#979D8A', 'Frames For Your Heart', 'framesforyourheart'],
  anfehDunes:    ['photo-1777285128359-bfc5c7535204', '#678B9F', 'Julia Taubitz', 'justmejuliee'],
  studio:        ['photo-1560091284-15ee1c917fdc', '#46443C', 'Robin Benzrihem', 'robinoode'],
  desk:          ['photo-1782706946527-dbedfa3e6e32', '#3A362D', 'Sherida Grajo', 'sheridagrajo'],
  sketching:     ['photo-1649688066826-947419c66e5c', '#766B61', 'Ryan Ancill', 'ryanancill'],
  warmWindow:    ['photo-1793557881263-63e833677dde', '#D9BC9B', 'tonny huang', 'tonny_huang'],
}
const img = (key, ratio = '3/2') => {
  const [src, color, name, username] = I[key]
  return { src, color, ratio, credit: { name, username } }
}

/** Non-project images used on Home / About / Contact */
export const siteImages = {
  hero: img('hero', '16/9'),
  about: img('desk', '4/5'),
  portrait: img('sketching', '4/5'),
  studio: img('studio', '21/9'),
  contact: img('warmWindow', '4/5'),
}

export const projects = [
  {
    slug: 'cedar-ridge-house',
    category: 'exterior',
    featured: true,
    year: 2024,
    area: 420,
    title: { en: 'Cedar Ridge House', ar: 'منزل سلسلة الأرز' },
    location: { en: 'Faqra, Lebanon', ar: 'فقرا، لبنان' },
    excerpt: {
      en: 'A mountain house of timber and dark stone, stepping down the slope to frame the valley.',
      ar: 'منزل جبلي من الخشب والحجر الداكن، يتدرّج مع المنحدر ليؤطّر الوادي.',
    },
    description: {
      en: [
        'Set on a steep plot at 1,600 metres, the house is conceived as three stacked volumes that follow the natural contours of the hillside. Each level opens to a different view — the cedar forest to the north, the valley and coast to the west.',
        'Local limestone anchors the lower floor into the ground, while the upper volumes are clad in charred cedar that will silver with time. Deep overhangs temper the summer sun and hold the snow away from the glazing in winter.',
      ],
      ar: [
        'على قطعة أرض شديدة الانحدار على ارتفاع ١٦٠٠ متر، صُمّم المنزل كثلاث كتل متراكبة تتبع خطوط التلّة الطبيعية. يطلّ كل مستوى على مشهد مختلف — غابة الأرز شمالاً، والوادي والساحل غرباً.',
        'يثبّت الحجر الكلسي المحلي الطابق السفلي في الأرض، فيما تُكسى الكتل العلوية بخشب الأرز المحروق الذي يكتسب لوناً فضياً مع الزمن. وتخفّف البروزات العميقة شمس الصيف وتُبعد الثلج عن الزجاج في الشتاء.',
      ],
    },
    cover: img('cedarCover', '16/9'),
    gallery: [img('cedarView', '3/2'), img('cedarTimber', '4/5'), img('cedarEaves', '4/5')],
  },
  {
    slug: 'batroun-coastal-villa',
    category: 'exterior',
    featured: true,
    year: 2023,
    area: 610,
    title: { en: 'Batroun Coastal Villa', ar: 'فيلا البترون الساحلية' },
    location: { en: 'Batroun, Lebanon', ar: 'البترون، لبنان' },
    excerpt: {
      en: 'White planes and shaded terraces dissolving into the Mediterranean light.',
      ar: 'مسطّحات بيضاء وشرفات مظلّلة تذوب في ضوء المتوسط.',
    },
    description: {
      en: [
        'A summer house for an extended family, organised around a long pool that runs parallel to the shoreline. Living spaces slide open completely, turning the ground floor into a shaded loggia.',
        'Lime-washed walls, travertine floors and oak screens keep the palette restrained, letting the sea and sky supply the colour.',
      ],
      ar: [
        'منزل صيفي لعائلة ممتدة، يتمحور حول مسبح طويل يوازي خط الشاطئ. تنفتح مساحات المعيشة بالكامل، فيتحوّل الطابق الأرضي إلى رواق مظلّل.',
        'تُبقي الجدران المطلية بالجير وأرضيات الترافرتين وحواجز السنديان الألوان هادئة، تاركةً للبحر والسماء مهمّة التلوين.',
      ],
    },
    cover: img('batrounCover', '16/9'),
    gallery: [img('batrounFrame', '3/2'), img('batrounArch', '4/5'), img('batrounLoggia', '4/5')],
  },
  {
    slug: 'gemmayzeh-apartment',
    category: 'interior',
    featured: true,
    year: 2024,
    area: 165,
    title: { en: 'Gemmayzeh Apartment', ar: 'شقة الجمّيزة' },
    location: { en: 'Beirut, Lebanon', ar: 'بيروت، لبنان' },
    excerpt: {
      en: 'Restoring a 1930s apartment with arched windows, terrazzo and quiet modern joinery.',
      ar: 'ترميم شقة من ثلاثينيات القرن الماضي بنوافذ مقوّسة وأرضيات تيرازو ونجارة حديثة هادئة.',
    },
    description: {
      en: [
        'The original triple-arched windows and patterned floors were carefully restored, then paired with a single run of oak joinery that holds the kitchen, library and storage.',
        'Walls were stripped back to lime plaster in soft, warm whites so the afternoon light moving across the rooms becomes the main ornament.',
      ],
      ar: [
        'رُمّمت النوافذ الثلاثية المقوّسة والأرضيات المزخرفة الأصلية بعناية، ثم قُرنت بخط واحد من نجارة السنديان يضمّ المطبخ والمكتبة والتخزين.',
        'أُعيدت الجدران إلى طلاء الجير بدرجات بيضاء دافئة، ليصبح ضوء ما بعد الظهر المتنقّل في الغرف هو الزخرفة الأساسية.',
      ],
    },
    cover: img('gemCover', '16/9'),
    gallery: [img('gemArch', '3/2'), img('gemStair', '4/5'), img('gemFloor', '4/5')],
  },
  {
    slug: 'terraced-garden-broummana',
    category: 'landscape',
    featured: true,
    year: 2023,
    area: 1800,
    title: { en: 'Terraced Garden', ar: 'الحديقة المدرّجة' },
    location: { en: 'Broummana, Lebanon', ar: 'برمّانا، لبنان' },
    excerpt: {
      en: 'Dry-stone terraces, olive trees and native planting restored on an old hillside orchard.',
      ar: 'مدرّجات من الحجر الجاف وأشجار زيتون ونباتات محلية أُعيد إحياؤها في بستان قديم على التلّة.',
    },
    description: {
      en: [
        'An abandoned orchard was reorganised around its original dry-stone terraces. Each level has its own character — a kitchen garden, an olive grove and a wild meadow of native thyme and sage.',
        'A single path of reclaimed stone links the terraces, with water collected from the roofs feeding a shallow reflecting basin at the lowest level.',
      ],
      ar: [
        'أُعيد تنظيم بستان مهجور حول مدرّجاته الأصلية من الحجر الجاف. لكل مستوى طابعه — حديقة خضار، وبستان زيتون، ومرج بري من الزعتر والمريمية المحليين.',
        'يربط ممرّ واحد من الحجر المستصلح بين المدرّجات، وتُجمع مياه الأسطح لتغذّي حوضاً عاكساً ضحلاً في المستوى الأدنى.',
      ],
    },
    cover: img('terrCover', '16/9'),
    gallery: [img('terrSteps', '3/2'), img('terrOlive', '4/5'), img('terrWall', '4/5')],
  },
  {
    slug: 'courtyard-residence',
    category: 'exterior',
    featured: false,
    year: 2022,
    area: 380,
    title: { en: 'Courtyard Residence', ar: 'منزل الفناء' },
    location: { en: 'Byblos, Lebanon', ar: 'جبيل، لبنان' },
    excerpt: {
      en: 'A contemporary take on the Levantine courtyard house, built around a single fig tree.',
      ar: 'قراءة معاصرة لبيت الفناء المشرقي، شُيّد حول شجرة تين واحدة.',
    },
    description: {
      en: [
        'All rooms open onto a central courtyard planted with an existing fig tree, creating a private, shaded microclimate within a dense neighbourhood.',
        'Thick rendered walls and narrow openings to the street keep the house cool and quiet, while the interior façades are almost entirely glazed.',
      ],
      ar: [
        'تنفتح جميع الغرف على فناء مركزي تتوسّطه شجرة تين قائمة، ما يخلق مناخاً مصغّراً خاصاً ومظلّلاً داخل حيّ مكتظ.',
        'تُبقي الجدران السميكة والفتحات الضيقة نحو الشارع المنزل بارداً وهادئاً، فيما تكاد الواجهات الداخلية تكون زجاجية بالكامل.',
      ],
    },
    cover: img('courtCover', '16/9'),
    gallery: [img('courtGarden', '3/2'), img('courtPavilion', '4/5'), img('courtStone', '4/5')],
  },
  {
    slug: 'achrafieh-loft',
    category: 'interior',
    featured: false,
    year: 2023,
    area: 220,
    title: { en: 'Achrafieh Loft', ar: 'لوفت الأشرفية' },
    location: { en: 'Beirut, Lebanon', ar: 'بيروت، لبنان' },
    excerpt: {
      en: 'A former print workshop converted into a light-filled home and studio.',
      ar: 'ورشة طباعة سابقة تحوّلت إلى منزل ومحترف يغمرهما الضوء.',
    },
    description: {
      en: [
        'The industrial shell — exposed concrete frame, steel windows and a five-metre ceiling — was kept intact. A freestanding timber volume inserted at the centre holds the bedroom above and the kitchen below.',
        'Furniture was designed with local craftsmen in walnut, linen and brushed brass.',
      ],
      ar: [
        'حوفظ على الهيكل الصناعي — الإطار الخرساني المكشوف والنوافذ الفولاذية والسقف بارتفاع خمسة أمتار. وأُدخلت كتلة خشبية مستقلة في الوسط تضمّ غرفة النوم في الأعلى والمطبخ في الأسفل.',
        'صُمّم الأثاث مع حرفيين محليين من خشب الجوز والكتان والنحاس المصقول.',
      ],
    },
    cover: img('loftCover', '16/9'),
    gallery: [img('loftBrick', '3/2'), img('loftArch', '4/5'), img('loftBeams', '4/5')],
  },
  {
    slug: 'koura-retreat',
    category: 'interior',
    featured: false,
    year: 2021,
    area: 140,
    title: { en: 'Koura Retreat', ar: 'استراحة الكورة' },
    location: { en: 'Koura, Lebanon', ar: 'الكورة، لبنان' },
    excerpt: {
      en: 'A small stone farmhouse among olive groves, reworked as a calm weekend retreat.',
      ar: 'بيت ريفي حجري صغير بين بساتين الزيتون، أُعيد تصميمه كملاذ هادئ لعطلة نهاية الأسبوع.',
    },
    description: {
      en: [
        'Interventions were kept minimal: a new oak floor, lime-plastered walls and built-in furniture that leaves the vaulted stone ceilings visible.',
        'Soft, natural textiles and handmade ceramics from nearby workshops complete a palette drawn directly from the landscape.',
      ],
      ar: [
        'أُبقيت التدخلات في حدّها الأدنى: أرضية جديدة من السنديان، وجدران مطلية بالجير، وأثاث مدمج يترك الأسقف الحجرية المعقودة ظاهرة.',
        'تُكمل المنسوجات الطبيعية الناعمة والخزف اليدوي من الورش المجاورة لوحة ألوان مستمدة مباشرة من المشهد الطبيعي.',
      ],
    },
    cover: img('kouraCover', '16/9'),
    gallery: [img('kouraPlaster', '3/2'), img('kouraOchre', '4/5'), img('kouraNiche', '4/5')],
  },
  {
    slug: 'anfeh-salt-garden',
    category: 'landscape',
    featured: false,
    year: 2022,
    area: 950,
    title: { en: 'Anfeh Salt Garden', ar: 'حديقة الملح في أنفه' },
    location: { en: 'Anfeh, Lebanon', ar: 'أنفه، لبنان' },
    excerpt: {
      en: 'A seaside garden of pools, pale stone and salt-tolerant planting beside the old salt pans.',
      ar: 'حديقة ساحلية من الأحواض والحجر الفاتح والنباتات المقاومة للملوحة بجوار الملّاحات القديمة.',
    },
    description: {
      en: [
        'Inspired by the geometry of the neighbouring salt pans, the garden is a grid of shallow pools and stone platforms stepping towards the sea.',
        'Planting is limited to tough coastal species — sea lavender, tamarisk and native grasses — that need no irrigation once established.',
      ],
      ar: [
        'استوحيت الحديقة من هندسة الملّاحات المجاورة، فجاءت شبكة من الأحواض الضحلة والمنصّات الحجرية المتدرّجة نحو البحر.',
        'اقتصرت الزراعة على أنواع ساحلية صلبة — الخزامى البحرية والطرفاء والأعشاب المحلية — لا تحتاج إلى ريّ بعد أن تستقر.',
      ],
    },
    cover: img('anfehCover', '16/9'),
    gallery: [img('anfehPool', '3/2'), img('anfehSalt', '4/5'), img('anfehDunes', '4/5')],
  },
]

/** Every photographer credited on the site (deduplicated) — feeds /credits */
export function allCredits() {
  const map = new Map()
  const all = [...Object.values(siteImages), ...projects.flatMap((p) => [p.cover, ...p.gallery])]
  {
    for (const im of all) {
      if (im.credit?.username && !map.has(im.credit.username)) map.set(im.credit.username, im.credit)
    }
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name))
}
