import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  MapPin, 
  Star, 
  Search,
  Filter,
  ShoppingBag,
  Menu as MenuIcon,
  X,
  SlidersHorizontal,
  Flame,
  Utensils,
  ArrowRight
} from 'lucide-react';
import { useRef, useState, useMemo } from 'react';

const CATEGORIES = [
  { id: 'steak', name: { en: 'RESERVE STEAK', ku: 'ستەیکی تایبەت', ar: 'ستيك احتياطي' }, icon: Flame },
  { id: 'sushi', name: { en: 'KYOTO RAW', ku: 'سوشی کیۆتۆ', ar: 'سوشي كيوتو' }, icon: Utensils },
  { id: 'french', name: { en: 'HAUTE CUISINE', ku: 'چێشتی فەڕەنسی', ar: 'مطبخ فرنسي راقٍ' }, icon: Star },
  { id: 'fusion', name: { en: 'NEO FUSION', ku: 'فیوژنی نوێ', ar: 'فيوجن حديث' }, icon: Search },
];

const UI_TEXT: Record<string, any> = {
  en: {
    brand: "MOPA'S MAISHAWI",
    eliteLogistics: "ELITE LOGISTICS",
    gridHome: "GRID HOME",
    discover: "DISCOVER",
    connoisseurs: "CONNOISSEURS",
    location: "SULAYMANIYAH GRID KRI",
    apex: "THE APEX OF CUISINE",
    heroDesc: "Curating the world's most exclusive culinary plinths.",
    enterGrid: "ENTER THE GRID",
    exploreGrid: "Explore the Culinary Grid.",
    selectionArchive: "Selection Archive 002",
    searchPlaceholder: "SEARCH ESTABLISHMENT",
    allCategories: "ALL CATEGORIES",
    noReservations: "No Reservations Found",
    resetGrid: "Reset Grid",
    verifiedEpistolae: "Verified Epistolae",
    plinthAwaits: "Your plinth awaits.",
    invitationDesc: "Experience the pinnacle of culinary delivery. Reservations for the next grid cycle are now open.",
    acquireMembership: "ACQUIRE MEMBERSHIP",
    status: "Status: Fully Operational",
    legal: "Legal Notice",
    privacy: "Data Privacy",
    nodes: "NODES",
    protocols: "PROTOCOLS",
    updates: "UPDATES",
    viewCatalogue: "VIEW CATALOGUE",
    signature: "Signature",
    time: "Time",
    addToBag: "ADD TO BAG",
    returnToGrid: "RETURN TO GRID",
    endOfCatalogue: "End of Catalogue",
    matrix: "THE MATRIX",
    rating: "Rating"
  },
  ku: {
    brand: "مۆپا مەیشاوی",
    eliteLogistics: "لۆجستی نایاب",
    gridHome: "ماڵەوە",
    discover: "دۆزینەوە",
    connoisseurs: "شارەزایان",
    location: "سلێمانی، هەرێمی کوردستان",
    apex: "لووتکەی چێشتلێنان",
    heroDesc: "هەڵبژاردنی تایبەتترین خواردنەکانی جیهان بۆ ئێوە.",
    enterGrid: "چوونە ناو تۆڕەکە",
    exploreGrid: "گەڕان لە تۆڕی چێشتلێناندا.",
    selectionArchive: "ئەرشیفی هەڵبژاردەکان ٠٠٢",
    searchPlaceholder: "گەڕان بۆ شوێنەکە",
    allCategories: "هەموو جۆرەکان",
    noReservations: "هیچ ئەنجامێک نەدۆزرایەوە",
    resetGrid: "دووبارە ڕێکخستنەوە",
    verifiedEpistolae: "نامەی پشتڕاستکراوە",
    plinthAwaits: "شوێنی ئێوە چاوەڕوانە.",
    invitationDesc: "ئەزموونی نایابترین لۆجستی ناردنی خواردن بکەن. ئێستا داواکارییەکان کراوەن.",
    acquireMembership: "بەدەستهێنانی ئەندامێتی",
    status: "بارودۆخ: چالاکی تەواو",
    legal: "ڕاگەیاندنی یاسایی",
    privacy: "پاراستنی زانیارییەکان",
    nodes: "خاڵەکان",
    protocols: "پرۆتۆکۆڵەکان",
    updates: "نوێکارییەکان",
    viewCatalogue: "بینینی کەتەلۆگ",
    signature: "واژۆی شێف",
    time: "کات",
    addToBag: "زیادکردن بۆ سەبەتە",
    returnToGrid: "گەڕانەوە بۆ تۆڕەکە",
    endOfCatalogue: "کۆتایی کەتەلۆگ",
    matrix: "ماتریکس",
    rating: "پلەبەندی"
  },
  ar: {
    brand: "موبا ميشاوي",
    eliteLogistics: "لوجستيات النخبة",
    gridHome: "الرئيسية",
    discover: "اكتشف",
    connoisseurs: "المتذوقون",
    location: "السليمانية، إقليم كردستان",
    apex: "ذروة المأكولات",
    heroDesc: "ننسق أكثر المنصات الطهوية حصرية في العالم.",
    enterGrid: "دخول الشبكة",
    exploreGrid: "استكشف شبكة الطهي.",
    selectionArchive: "أرشيف الاختيارات ٠٠٢",
    searchPlaceholder: "ابحث عن المنشأة",
    allCategories: "جميع الفئات",
    noReservations: "لم يتم العثور على حجوزات",
    resetGrid: "إعادة ضبط الشبكة",
    verifiedEpistolae: "رسائل موثقة",
    plinthAwaits: "منصتك في الانتظار.",
    invitationDesc: "جرب قمة خدمات توصيل الطعام. الحجوزات للدورة القادمة مفتوحة الآن.",
    acquireMembership: "الحصول على العضوية",
    status: "الحالة: يعمل بكامل طاقته",
    legal: "إشعار قانوني",
    privacy: "خصوصية البيانات",
    nodes: "العقد",
    protocols: "البروتوكولات",
    updates: "التحديثات",
    viewCatalogue: "عرض الكتالوج",
    signature: "توقيع الشيف",
    time: "الوقت",
    addToBag: "أضف إلى السلة",
    returnToGrid: "العودة إلى الشبكة",
    endOfCatalogue: "نهاية الكتالوج",
    matrix: "الماتريكس",
    rating: "تقييم"
  }
};

const LANGUAGES: Record<string, { dir: string, label: string }> = {
  en: { dir: 'ltr', label: 'EN' },
  ku: { dir: 'rtl', label: 'KRD' },
  ar: { dir: 'rtl', label: 'ARB' }
};

const REVIEWS: Record<string, any[]> = {
  en: [
    { name: 'BUGUY BAWAKCH', role: 'Gastronomic Critic', text: "An ephemeral transition of flavor. The Mopa's Maishawi steak is precisely what perfection should taste like in the modern age. Every sear is a data point of brilliance." },
    { name: 'PTIN BVUGHUM', role: 'Elite Member', text: "The logistics are as refined as the cuisine itself. Opening a Mopa's Maishawi reserve box is akin to unsealing a heritage artifact. Unmatched precision." }
  ],
  ku: [
    { name: 'بگووی باوەکچ', role: 'ڕەخنەگری چێشتلێنان', text: "گۆڕانکارییەکی کاتی لە تامدا. ستەیکی مۆپا مەیشاوی ڕێک ئەو تامی تەواوەتییەیە کە دەبێت لەم سەردەمەدا هەبێت. هەموو برژاندنێک خاڵێکی بێ وێنەیە." },
    { name: 'پتین بڤۆغۆم', role: 'ئەندامی دەستەبژێر', text: "لۆجستییەکە بە ئەندازەی خواردنەکە نایابە. کردنەوەی سندوقی مۆپا مەیشاوی وەک کردنەوەی شوێنەوارێکی کۆن وایە. وردبینییەکی بێ وێنە." }
  ],
  ar: [
    { name: 'بوغوي باوكش', role: 'ناقد طعام', text: "انتقال سريع للنكهة. ستيك موبا ميشاوي هو بالضبط ما يجب أن يكون عليه الطعم المثالي في العصر الحديث. كل شواء هو نقطة بيانات من التألق." },
    { name: 'بتين بوغوم', role: 'عضو النخبة', text: "اللوجستيات راقية مثل المأكولات نفسها. فتح صندوق احتياطي موبا ميشاوي يشبه فض ختم قطعة أثرية تراثية. دقة لا تضاهى." }
  ]
};

const RESTAURANTS = [
  {
    id: 1,
    name: { en: "MOPA'S MAISHAWI", ku: "مۆپا مەیشاوی", ar: "موبا ميشاوي" },
    location: { en: "Suly Park District", ku: "گەڕەکی پارکی سلێمانی", ar: "منطقة بارك السليمانية" },
    category: 'steak',
    rating: 4.9,
    price: '$65 - $180',
    time: { en: '25-35 MIN', ku: '٢٥-٣٥ خولەک', ar: '٢٥-٣٥ دقيقة' },
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=2070&auto=format&fit=crop',
    tagline: { en: 'Ancestral Charcoal Reserve', ku: 'کۆگای خەڵووزی باوان', ar: 'احتياطي الفحم الموروث' },
    sig: { en: 'KRI Spiced Ribeye', ku: 'ڕیبی کەی ئاڕ ئای بە بەهارات', ar: 'ريب آي متبل' },
    menu: [
      { category: { en: 'STARTERS', ku: 'دەستپێکەکان', ar: 'المقبلات' }, items: [
        { name: { en: 'Suly Bone Marrow', ku: 'مۆخی سلێمانی', ar: 'نخاع السليمانية' }, desc: { en: 'Roasted with local herbs and grilled sourdough.', ku: 'برژێنراو بە گیاکێوییە ناوخۆییەکان و نانی تێست.', ar: 'محمص بالأعشاب المحلية وخبز العجين المخمر المشوي.' }, price: '$22' },
        { name: { en: 'Charcoal Beets', ku: 'چەوەندەری خەڵووز', ar: 'بنجر مشوي على الفحم' }, desc: { en: 'Smoked goat cheese, walnut crumble.', ku: 'پەنیری بزنی دووکەڵکراو، گوێزی وردکراو.', ar: 'جبن الماعز المدخن، فتات الجوز.' }, price: '$18' }
      ]},
      { category: { en: 'MAISHAWI SELECTIONS', ku: 'هەڵبژاردەکانی مەیشاوی', ar: 'مختارات ميشاوي' }, items: [
        { name: { en: 'KRI Spiced Ribeye', ku: 'ڕیبی کەی ئاڕ ئای بە بەهارات', ar: 'ريب آي متبل' }, desc: { en: '45-day dry-aged, seared over oak charcoal.', ku: '٤٥ ڕۆژ وشککراوەتەوە، لەسەر خەڵووزی داربەڕوو برژێنراوە.', ar: 'معتق لمدة ٤٥ يومًا، مشوي على فحم البلوط.' }, price: '$65' },
        { name: { en: 'The Grand Tomahawk', ku: 'تۆماهاوکی مەزن', ar: 'توماهوك الكبير' }, desc: { en: '32oz reserve cut, gold-flecked marrow butter.', ku: 'بڕینێکی تایبەتی ٣٢ ئۆنسی، کەرەی مۆخی زێڕین.', ar: 'قطع احتياطي ٣٢ أونصة، زبدة النخاع المرصعة بالذهب.' }, price: '$145' }
      ]}
    ]
  },
  {
    id: 2,
    name: { en: "AZMAR PEAK", ku: "لووتکەی ئەزمەڕ", ar: "قمة أزمر" },
    location: { en: "Azmar Heights", ku: "بەرزاییەکانی ئەزمەڕ", ar: "مرتفعات أزمر" },
    category: 'french',
    rating: 4.8,
    price: '$45 - $120',
    time: { en: '40-50 MIN', ku: '٤٠-٥٠ خولەک', ar: '٤٠-٥٠ دقيقة' },
    image: 'https://images.unsplash.com/photo-1550966841-3ee3ad15f0d5?q=80&w=2070&auto=format&fit=crop',
    tagline: { en: 'Crest-Side Fine Dining', ku: 'نانخوارنی نایاب لە لوتکە', ar: 'عشاء فاخر على منحدر الجبل' },
    sig: { en: 'Lamb Shank Confit', ku: 'کۆنفێتی قاچی بەرخ', ar: 'موزات الغنم المحمرة' },
    menu: [
      { category: { en: 'HORS D\'OEUVRES', ku: 'کەمەخۆراکەکان', ar: 'المشهیات' }, items: [
        { name: { en: 'Escargot de Azmar', ku: 'ئێسکارگۆتی ئەزمەڕ', ar: 'حلزون أزمر' }, desc: { en: 'Garlic butter, puff pastry, mountain herbs.', ku: 'کەرەی سیر، هەویری پف، گیاکێوییەکانی شاخ.', ar: 'زبدة الثوم، باستري، أعشاب جبلية.' }, price: '$24' },
        { name: { en: 'Foie Gras Torchon', ku: 'فوا گرا تۆرچۆن', ar: 'فوا غرا تورشون' }, desc: { en: 'Fig compote, toasted brioche.', ku: 'کۆمپۆتی هەنجیر، بریۆشی برژێنراو.', ar: 'كومبوت التين، بريوش محمص.' }, price: '$32' }
      ]},
      { category: { en: 'PLATS PRINCIPAUX', ku: 'خواردنە سەرەکییەکان', ar: 'الأطباق الرئيسية' }, items: [
        { name: { en: 'Lamb Shank Confit', ku: 'کۆنفێتی قاچی بەرخ', ar: 'موزات الغنم المحمرة' }, desc: { en: 'Slow-cooked for 12 hours, red wine reduction.', ku: '١٢ خولەک بە هێواشی کوڵاوە.', ar: 'مطبوخ ببطء لمدة ١٢ ساعة.' }, price: '$48' },
        { name: { en: 'Duck à l\'Orange', ku: 'مراوی بە پرتەقاڵ', ar: 'بط بالبرتقال' }, desc: { en: 'Zesty citrus glaze, parsnip purée.', ku: 'گەشەی مزرەمەنی، پیورێی پاشنیپ.', ar: 'طبقة حمضية، بيوريه الجزر الأبيض.' }, price: '$52' }
      ]}
    ]
  },
  {
    id: 3,
    name: { en: "SAWRA GRID", ku: "تۆڕی سەورە", ar: "شبكة ثورة" },
    location: { en: "Salim Street", ku: "شەقامی سەلیم", ar: "شارع سالم" },
    category: 'sushi',
    rating: 5.0,
    price: '$80 - $250',
    time: { en: '20-30 MIN', ku: '٢٠-٣٠ خولەک', ar: '٢٠-٣٠ دقيقة' },
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop',
    tagline: { en: 'Imported Raw Reserve', ku: 'کۆگای خاوە هاوردەکراوەکان', ar: 'احتياطي المواد الخام المستوردة' },
    sig: { en: 'Bluefin O-Toro', ku: 'بلوفین ئۆ-تۆرۆ', ar: 'بلوفين أو تورو' },
    menu: [
      { category: { en: 'ZEN STARTERS', ku: 'دەستپێکە ئارامەکان', ar: 'مقبلات زين' }, items: [
        { name: { en: 'Tuna Tataki', ku: 'تونا تاتاکی', ar: 'تونا تاتاكي' }, desc: { en: 'Seared bluefin, ponzu, crispy garlic.', ku: 'بلوفینی برژێنراو، پۆنزو، سیری کریسپی.', ar: 'بلوفين محمر، بونزو، ثوم مقرمش.' }, price: '$28' },
        { name: { en: 'Golden Enoki', ku: 'گۆڵدن ئێنۆکی', ar: 'الفطر الذهبي' }, desc: { en: 'Tempura mushrooms, truffle aioli.', ku: 'قارچکی تەمپورا، ترۆفڵ ئایۆلی.', ar: 'فطر تيمبورا، أيولي الكمأة.' }, price: '$16' }
      ]},
      { category: { en: 'THE RESERVE BOX', ku: 'سندوقی تایبەت', ar: 'صندوق الاحتياط' }, items: [
        { name: { en: 'O-Toro Flight', ku: 'گەشتی ئۆ-تۆرۆ', ar: 'فلايت أو تورو' }, desc: { en: 'Three grades of bluefin fatty tuna.', ku: 'سێ پلەی ماسی تونا.', ar: 'ثلاث درجات من تونا البلوفين الدهنية.' }, price: '$85' },
        { name: { en: 'Imperial Omakase', ku: 'ئۆماکاسی شاهانە', ar: 'أوماكاسي إمبراطوري' }, desc: { en: '12-piece chef\'s selection of the day\'s best catch.', ku: '١٢ پارچە لە باشترین هەڵبژاردەی شێف بۆ ئەمڕۆ.', ar: '١٢ قطعة من اختيار الشيف لأفضل صيد اليوم.' }, price: '$120' }
      ]}
    ]
  },
  {
    id: 4,
    name: { en: "GOIZHA CELLAR", ku: "سێڵەری گۆیژە", ar: "قبو كويجة" },
    location: { en: "Sarchinar Road", ku: "شەقامی سەرچنار", ar: "طريق سرجنار" },
    category: 'fusion',
    rating: 4.7,
    price: '$35 - $90',
    time: { en: '30-40 MIN', ku: '٣٠-٤٠ خولەک', ar: '٣٠-٤٠ دقيقة' },
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2074&auto=format&fit=crop',
    tagline: { en: 'Modern Kurdish Fusion', ku: 'فیوژنی کوردی سەردەمیانە', ar: 'فيوجن كردي حديث' },
    sig: { en: 'Wagyu Bone Marrow', ku: 'مۆخی واگیۆ', ar: 'نخاع عظم واغيو' },
    menu: [
      { category: { en: 'SMALL PLINTHS', ku: 'پلینتە بچووکەکان', ar: 'منصات صغيرة' }, items: [
        { name: { en: 'Kurdish Arancini', ku: 'ئارانچینی کوردی', ar: 'أرانتشيني كردي' }, desc: { en: 'Saffron rice, braised lamb, spiced yogurt.', ku: 'برنجی سەفران، بەرخی برژێنراو، ماستی بەهاراتی پڕ.', ar: 'أرز بالزعفران، لحم ضأن مطهو ببطء، زبادي متبل.' }, price: '$14' },
        { name: { en: 'Goizha Hummus', ku: 'حوموسی گۆیژە', ar: 'حمص كويجة' }, desc: { en: 'Wagyu fat infusion, toasted pine nuts.', ku: 'تێکەڵەی چەوری واگیۆ، سنەوبەری برژێنراو.', ar: 'منقوع دهن الواغيو، صنوبر محمص.' }, price: '$12' }
      ]},
      { category: { en: 'SIGNATURES', ku: 'نیشانەکان', ar: 'التواقيع' }, items: [
        { name: { en: 'Wagyu Bone Marrow', ku: 'مۆخی واگیۆ', ar: 'نخاع عظم واغيو' }, desc: { en: 'Herb crust, lemon zest, mountain salt.', ku: 'تێکەڵەی گیا، توێکڵی لیمۆ، خوێی شاخ.', ar: 'قشرة الأعشاب، قشر الليمون، ملح جبلي.' }, price: '$36' },
        { name: { en: 'Neo-Dolma', ku: 'نیۆ-دۆڵمە', ar: 'نيو دولمة' }, desc: { en: 'Deconstructed traditional flavors, modern plating.', ku: 'تامە ڕەسەنەکان بە شێوازێکی زانستی و نوێ.', ar: 'نكهات تقليدية مفككة، تقديم عصري.' }, price: '$28' }
      ]}
    ]
  }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [lang, setLang] = useState<'en' | 'ku' | 'ar'>('en');

  const t = (key: string) => UI_TEXT[lang][key] || key;
  
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const filteredRestaurants = useMemo(() => {
    return RESTAURANTS.filter(r => {
      const matchCat = activeCategory === 'all' || r.category === activeCategory;
      const matchPrice = priceFilter === 'all' || r.price === priceFilter;
      const matchSearch = r.name[lang].toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.tagline[lang].toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchPrice && matchSearch;
    });
  }, [activeCategory, priceFilter, searchQuery, lang]);

  return (
    <div dir={LANGUAGES[lang].dir} className={`bg-charcoal min-h-screen text-crema font-sans selection:bg-gold-muted selection:text-charcoal overflow-x-hidden antialiased ${LANGUAGES[lang].dir === 'rtl' ? 'text-right' : 'text-left'}`}>
      {/* Elegant Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-16 py-10 backdrop-blur-md bg-charcoal/40 border-b border-white/5">
        <div className="flex flex-col">
          <span className="font-serif text-3xl font-light tracking-[0.1em] text-gold-muted leading-tight uppercase">{t('brand')}</span>
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold-muted/60 -mt-1">{t('eliteLogistics')}</span>
        </div>

        <div className="hidden lg:flex items-center gap-16 text-[10px] tracking-[0.4em] font-light uppercase text-gold-light/40">
          <button onClick={() => { setActiveCategory('all'); setSearchQuery(''); }} className={`${activeCategory === 'all' && !searchQuery ? 'text-gold-muted' : 'hover:text-gold-muted'} transition-all cursor-pointer`}>{t('gridHome')}</button>
          <a href="#discover" className="hover:text-gold-muted transition-all">{t('discover')}</a>
          <a href="#reviews" className="hover:text-gold-muted transition-all">{t('connoisseurs')}</a>
        </div>

        <div className="flex items-center gap-8">
          {/* Language Switcher */}
          <div className="flex items-center gap-4 border-r border-white/10 pr-8 mr-4 h-6">
            {Object.entries(LANGUAGES).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setLang(key as any)}
                className={`text-[9px] tracking-widest transition-colors duration-500 ${lang === key ? 'text-gold-muted underline underline-offset-4' : 'text-white/20 hover:text-white'}`}
              >
                {config.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2 text-gold-muted/40 font-sans text-[10px] tracking-widest uppercase">
            <MapPin className="w-3 h-3" /> {t('location')}
          </div>
          <button className="relative p-2 text-gold-muted hover:scale-110 transition-transform cursor-pointer">
            <ShoppingBag className="w-5 h-5 stroke-1" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-gold-muted rounded-full" />
          </button>
          <button onClick={() => setIsMenuOpen(true)} className="p-2 text-gold-muted hover:text-white transition-colors cursor-pointer">
            <MenuIcon className="w-6 h-6 stroke-1" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="z-10 relative space-y-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-gold-muted font-sans text-[10px] tracking-[0.8em] uppercase mb-12 block opacity-60">{t('apex')}</span>
            <h1 className="text-7xl md:text-[10rem] font-serif font-light italic leading-none mb-4 tracking-tighter text-white gold-glow">
              {t('brand')}
            </h1>
            <div className="fine-line w-48 mx-auto mb-10 opacity-30" />
            <p className="text-gold-light/40 font-serif italic text-2xl md:text-3xl max-w-2xl mx-auto font-light leading-relaxed">
              {t('heroDesc')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <a href="#discover" className="luxury-button inline-flex items-center gap-4 group">
              {t('enterGrid')} <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${lang !== 'en' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </a>
          </motion.div>
        </motion.div>

        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover blur-[2px] brightness-[0.2]"
            referrerPolicy="no-referrer"
            alt="Elite Reserve"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-transparent to-charcoal" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.1)_0%,transparent_100%)]" />
        </div>
      </section>

      {/* Discovery Center */}
      <section id="discover" className="min-h-screen pt-32 pb-48 px-8 md:px-24">
        {/* Search & Filter Plinth */}
        <div className="max-w-7xl mx-auto mb-32 space-y-16">
          <div className="flex flex-col md:flex-row items-end justify-between gap-12 border-b border-white/5 pb-16">
            <div className="space-y-4">
              <h2 className="text-6xl md:text-7xl font-serif italic text-white leading-tight">{t('exploreGrid')}</h2>
              <p className="text-gold-light/20 text-xs font-sans tracking-[0.4em] uppercase">{t('selectionArchive')}</p>
            </div>
            
            <div className="w-full md:w-96 group">
              <div className="flex items-center gap-4 border-b border-gold-muted/20 py-4 transition-colors group-focus-within:border-gold-muted">
                <Search className="w-4 h-4 text-gold-muted/40" />
                <input 
                  type="text" 
                  placeholder={t('searchPlaceholder')} 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-xs tracking-[0.3em] uppercase w-full placeholder:text-white/10"
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap items-center gap-6">
            <button 
              onClick={() => setActiveCategory('all')}
              className={`px-10 py-5 font-sans text-[10px] tracking-[0.4em] border transition-all duration-700 ${activeCategory === 'all' ? 'bg-gold-muted text-charcoal border-gold-muted' : 'border-white/10 text-white/40 hover:border-gold-muted/40'}`}
            >
              {t('allCategories')}
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-4 px-10 py-5 font-sans text-[10px] tracking-[0.4em] border transition-all duration-700 uppercase ${activeCategory === cat.id ? 'bg-gold-muted text-charcoal border-gold-muted' : 'border-white/10 text-white/40 hover:border-gold-muted/40'}`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.name[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Restaurant Feed */}
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredRestaurants.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                {filteredRestaurants.map((res, idx) => (
                  <motion.div
                    key={res.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative h-[500px] overflow-hidden border border-white/5 glass-panel"
                  >
                    <div className="absolute inset-0">
                      <img 
                        src={res.image} 
                        className="w-full h-full object-cover brightness-[0.4] group-hover:scale-105 group-hover:brightness-[0.4] group-hover:blur-[4px] transition-all duration-[2s] ease-out" 
                        alt={res.name}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
                    </div>

                    <div className="absolute inset-0 p-12 flex flex-col justify-end">
                      <div className="flex justify-between items-start mb-6">
                        <span className="font-sans text-[8px] tracking-[0.3em] bg-gold-muted text-charcoal px-3 py-1 uppercase">{res.category}</span>
                        <div className="flex items-center gap-2 text-gold-muted">
                          <Star className="w-3 h-3 fill-gold-muted" />
                          <span className="font-serif text-xl">{res.rating}</span>
                        </div>
                      </div>

                      <h3 className="text-5xl font-serif italic mb-2 tracking-tight group-hover:-translate-y-4 transition-transform duration-700 text-white">{res.name[lang]}</h3>
                      <div className="flex items-center justify-between group-hover:-translate-y-4 transition-transform duration-700">
                        <p className="font-serif text-lg text-gold-light/40 italic">{res.tagline[lang]}</p>
                        <span className="font-serif text-sm text-gold-muted">{res.price}</span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-8 border-t border-white/10 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                        <div className="flex gap-10">
                          <div className="flex flex-col gap-1">
                            <span className="font-sans text-[8px] tracking-widest text-white/30 uppercase">{t('signature')}</span>
                            <span className="font-serif text-sm text-gold-muted uppercase italic">{res.sig[lang]}</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="font-sans text-[8px] tracking-widest text-white/30 uppercase">{t('time')}</span>
                            <span className="font-serif text-sm text-white/60 uppercase italic">{res.time[lang]}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => setSelectedRestaurant(res)}
                          className="luxury-button !py-2 !px-6 text-[9px]"
                        >
                          {t('viewCatalogue')}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-48 text-center"
              >
                <div className="fine-line w-24 mx-auto mb-10 opacity-20" />
                <p className="font-serif italic text-4xl text-gold-light/20 uppercase tracking-widest">{t('noReservations')}</p>
                <button onClick={() => {setActiveCategory('all'); setSearchQuery('');}} className="mt-12 text-gold-muted text-[10px] tracking-[0.4em] uppercase underline underline-offset-8">{t('resetGrid')}</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Restaurant Menu Overlay */}
      <AnimatePresence>
        {selectedRestaurant && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-charcoal flex flex-col overflow-y-auto no-scrollbar"
          >
            {/* Header */}
            <div className="relative h-[40vh] shrink-0">
               <img 
                 src={selectedRestaurant.image} 
                 className="w-full h-full object-cover brightness-[0.3]" 
                 alt={selectedRestaurant.name}
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/60" />
               <button 
                 onClick={() => setSelectedRestaurant(null)}
                 className="absolute top-12 left-12 p-3 bg-charcoal/40 backdrop-blur-md rounded-full text-gold-muted hover:text-white transition-all z-20"
               >
                 <X className="w-6 h-6 stroke-1" />
               </button>
               
               <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
                  <span className="font-sans text-[10px] tracking-[0.4em] text-gold-muted uppercase mb-4">
                    {CATEGORIES.find(c => c.id === selectedRestaurant.category)?.name[lang] || selectedRestaurant.category}
                  </span>
                  <h2 className="text-6xl md:text-8xl font-serif italic text-white tracking-tighter mb-4">{selectedRestaurant.name[lang]}</h2>
                  <div className="flex items-center gap-6 text-gold-light/40 font-sans text-[9px] tracking-widest uppercase">
                    <span>{selectedRestaurant.location[lang]}</span>
                    <span className="w-1 h-1 bg-gold-muted rounded-full" />
                    <span>{selectedRestaurant.rating} {t('rating')}</span>
                    <span className="w-1 h-1 bg-gold-muted rounded-full" />
                    <span>{selectedRestaurant.price}</span>
                  </div>
               </div>
            </div>

            {/* Content */}
            <div className="flex-1 bg-charcoal px-8 md:px-24 py-24">
              <div className="max-w-4xl mx-auto space-y-24">
                {selectedRestaurant.menu.map((cat: any, idx: number) => (
                  <motion.div 
                    key={cat.category.en}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="flex items-center gap-8 mb-12">
                      <div className="fine-line flex-1 opacity-20" />
                      <h3 className="font-sans text-[11px] tracking-[0.5em] text-gold-muted uppercase">{cat.category[lang]}</h3>
                      <div className="fine-line flex-1 opacity-20" />
                    </div>
                    
                    <div className="space-y-12">
                      {cat.items.map((item: any) => (
                        <div key={item.name.en} className="group flex justify-between items-start gap-12">
                          <div className="space-y-2">
                             <h4 className="text-2xl font-serif text-white group-hover:text-gold-muted transition-colors duration-500">{item.name[lang]}</h4>
                             <p className="text-gold-light/30 text-sm font-light italic max-w-sm">{item.desc[lang]}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <span className="font-sans text-xs tracking-widest text-gold-muted">{item.price}</span>
                            <button className="text-[9px] tracking-[0.3em] uppercase text-white/20 hover:text-gold-muted transition-colors">{t('addToBag')}</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}

                <div className="pt-24 text-center">
                   <p className="font-serif italic text-gold-light/20 text-lg mb-8 uppercase tracking-widest">{t('endOfCatalogue')}</p>
                   <button 
                     onClick={() => setSelectedRestaurant(null)}
                     className="luxury-button"
                   >
                     {t('returnToGrid')}
                   </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connoisseur Reviews */}
      <section id="reviews" className="py-48 bg-white/[0.02] border-y border-white/[0.05]">
        <div className="max-w-5xl mx-auto px-8 text-center italic font-serif">
          <span className="font-sans text-[10px] tracking-[0.6em] text-gold-muted uppercase block mb-24 opacity-60">{t('verifiedEpistolae')}</span>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 text-left">
            {REVIEWS[lang].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.2 }}
                className="space-y-10 relative"
              >
                <span className={`text-gold-muted/10 text-8xl absolute -top-12 font-serif leading-none ${lang === 'en' ? '-left-8' : '-right-8'}`}>“</span>
                <p className="text-2xl md:text-3xl font-light leading-relaxed text-gold-light/80 relative z-10">
                  {review.text}
                </p>
                <div className="flex flex-col gap-2 pt-6">
                  <div className="fine-line w-12 opacity-40 mb-2" />
                  <span className="text-gold-muted text-lg tracking-tight">— {review.name}</span>
                  <span className="font-sans text-[9px] tracking-[0.4em] text-white/20 uppercase font-light">{review.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Invitation */}
      <section className="py-64 flex flex-col items-center justify-center text-center px-8">
        <h2 className="text-6xl md:text-[8rem] font-serif italic mb-12 text-white leading-none">{t('plinthAwaits')}</h2>
        <p className="text-gold-light/30 text-xl font-serif italic mb-16 max-w-xl font-light">
          {t('invitationDesc')}
        </p>
        <button className="luxury-button !px-16 !py-8 text-sm tracking-[0.6em]">
          {t('acquireMembership')}
        </button>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-32 px-8 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 items-start">
          <div className="space-y-10">
            <div className="flex flex-col">
              <span className="font-serif text-4xl font-light tracking-[0.1em] text-gold-muted italic leading-tight uppercase">{t('brand')}</span>
              <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold-muted/40 font-light ml-1">{t('eliteLogistics')}</span>
            </div>
            <p className="text-gold-light/20 text-[10px] font-light leading-relaxed max-w-xs uppercase tracking-[0.3em]">
              {t('heroDesc')}
            </p>
          </div>

          <div className="space-y-8 font-sans text-[10px] tracking-[0.4em] uppercase text-gold-light/40">
            <h4 className="text-gold-muted mb-10 tracking-[0.5em]">{t('nodes')}</h4>
            <div className="flex items-center gap-4 text-white/20"><MapPin className="w-3 h-3 text-gold-muted" /> {t('location')}</div>
          </div>

          <div className="space-y-8 font-sans text-[10px] tracking-[0.4em] uppercase text-gold-light/40">
            <h4 className="text-gold-muted mb-10 tracking-[0.5em]">{t('protocols')}</h4>
            <a href="#" className="hover:text-gold-muted block transition-colors">Elite Membership</a>
            <a href="#" className="hover:text-gold-muted block transition-colors">Logistics Standards</a>
          </div>

          <div className="space-y-10">
            <h4 className="font-sans text-[10px] tracking-[0.5em] text-gold-muted uppercase">{t('updates')}</h4>
            <div className="flex border-b border-gold-muted/20 pb-4">
              <input 
                type="text" 
                placeholder="EMAIL" 
                className="bg-transparent border-none focus:ring-0 text-[10px] tracking-[0.3em] w-full placeholder:text-white/10 uppercase"
              />
              <ArrowRight className={`w-4 h-4 text-gold-muted cursor-pointer hover:translate-x-1 transition-transform ${lang !== 'en' ? 'rotate-180 hover:-translate-x-1' : ''}`} />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-8 text-[8px] tracking-[0.5em] text-white/10 uppercase font-sans">
          <div className="flex gap-16 order-2 md:order-1">
             <span>&copy; MMCCVI {t('brand')} Systems</span>
             <span className="hidden md:inline">{t('status')}</span>
          </div>
          <div className="flex gap-12 order-1 md:order-2">
            <a href="#" className="hover:text-gold-muted transition-colors">{t('legal')}</a>
            <a href="#" className="hover:text-gold-muted transition-colors">{t('privacy')}</a>
          </div>
        </div>
      </footer>

      {/* Global Navigation Overlay - Scrollable */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/98 backdrop-blur-3xl overflow-y-auto no-scrollbar"
          >
            <div className="min-h-screen py-24 px-8 flex flex-col items-center justify-center relative">
              <button 
                onClick={() => setIsMenuOpen(false)} 
                className="fixed top-12 right-12 text-gold-muted hover:text-white transition-all cursor-pointer p-4 group"
              >
                <X className="w-10 h-10 stroke-1 group-hover:rotate-90 transition-transform duration-500" />
              </button>
              
              <nav className="flex flex-col items-center gap-16 text-center">
                <span className="font-sans text-[10px] tracking-[0.8em] text-gold-muted/40 uppercase mb-8">{t('matrix')}</span>
                {['Discover', 'Elite Club', 'Protocol', 'Heritage', 'Coordinates', 'Cellar'].map((item, i) => (
                  <motion.a
                    key={item}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="font-serif text-5xl md:text-8xl italic hover:text-gold-muted transition-all duration-1000 hover:tracking-widest"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-48 flex flex-col items-center gap-10 border-t border-white/5 pt-16 w-full max-w-xl text-center">
                 <span className="font-sans text-[9px] tracking-[0.5em] text-gold-muted/20 uppercase">Global Concierge Active</span>
                 <p className="font-serif italic text-gold-muted/40 text-2xl tracking-tight">+1 (888) MAISHAWI-ELITE</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
