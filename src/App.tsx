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
  ArrowRight,
  Trash2,
  Minus,
  Plus,
  CheckCircle2
} from 'lucide-react';
import React, { useRef, useState, useMemo, useEffect } from 'react';

type CartItem = {
  id: string;
  name: string;
  price: string;
  quantity: number;
  restoName: string;
};

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
    rating: "Rating",
    yourBag: "YOUR BAG",
    subtotal: "SUBTOTAL",
    checkout: "INITIATE DELIVERY",
    deliveryLocation: "DELIVERY LOCATION (NEIGHBORHOOD / HOUSE)",
    sending: "TRANSMITTING...",
    orderConfirmed: "ORDER TRANSMITTED",
    orderConfirmedDesc: "Your seared reserves are being prepared. Payment in person upon arrival.",
    emptyBag: "Your bag is empty.",
    phoneNumber: "PHONE NUMBER"
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
    rating: "پلەبەندی",
    yourBag: "سەبەتەکەت",
    subtotal: "کۆتایی بڕ",
    checkout: "دەستپێکردنی ناردن",
    deliveryLocation: "شوێنی ناردن (گەڕەک / ژمارەی خانوو)",
    sending: "دەنێردرێت...",
    orderConfirmed: "داواکارییەکەت نێردرا",
    orderConfirmedDesc: "خواردنەکانت خەریکە ئامادە دەکرێن. پارەدان لەکاتی گەیشتن دەبێت.",
    emptyBag: "سەبەتەکەت خاڵییە.",
    phoneNumber: "ژمارەی مۆبایل"
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
    rating: "تقييم",
    yourBag: "حقيبتك",
    subtotal: "المجموع الفرعي",
    checkout: "بدء التوصيل",
    deliveryLocation: "موقع التوصيل (الحي / المنزل)",
    sending: "جارٍ الإرسال...",
    orderConfirmed: "تم إرسال الطلب",
    orderConfirmedDesc: "يتم تحضير وجباتك الآن. الدفع نقداً عند الاستلام.",
    emptyBag: "حقيبتك فارغة.",
    phoneNumber: "رقم الهاتف"
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
    name: { en: "KFC", ku: "کەی ئێف سی", ar: "كي إف سي" },
    location: { en: "Salim Street", ku: "شەقامی سەلیم", ar: "شارع سالم" },
    category: 'Fried Chicken',
    rating: 4.5,
    price: '$8 - $30',
    time: { en: '15-25 MIN', ku: '١٥-٢٥ خولەک', ar: '١٥-٢٥ دقيقة' },
    image: 'data:image/jpeg;base64,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',
    tagline: { en: "Finger Lickin' Good", ku: "پەنجەکانتی لەگەڵ دەخۆیت", ar: "خلطة سرية، طعم رائع" },
    sig: { en: 'Zinger Box', ku: 'زینگەر بۆکس', ar: 'زنجر بوكس' },
    menu: [
      { category: { en: 'INDIVIDUAL MEALS', ku: 'ژەمە تاکەکەسییەکان', ar: 'وجبات فردية' }, items: [
        { name: { en: 'Zinger Burger Meal', ku: 'ژەمی زینگەر بەرگر', ar: 'وجبة زنجر برجر' }, desc: { en: 'Spicy chicken fillet, fries, and a drink.', ku: 'فیلیتەی مریشکی توون، پەتاتە، و خواردنەوەیەکی سارد.', ar: 'فيليه دجاج حار، بطاطس، ومشروب.' }, price: '$9.00' }
      ]},
      { category: { en: 'BUCKETS', ku: 'سەتڵەکان', ar: 'البوكت' }, items: [
        { name: { en: '9 Pcs Festive Bucket', ku: 'سەتڵێ ٩ پارچەیی', ar: 'بوكيت ٩ قطع' }, desc: { en: '9 pieces of chicken, large fries, and 1L drink.', ku: '٩ پارچە مریشک، پەتاتەی گەورە، و خواردنەوەی ١ لیتری.', ar: '٩ قطع دجاج، بطاطس عائلية، ومشروب ١ لتر.' }, price: '$22.00' }
      ]}
    ]
  },
  {
    id: 2,
    name: { en: "HARDEE'S", ku: "هاردیز", ar: "هارديز" },
    location: { en: "Majidi Mall", ku: "مەجیدی مۆڵ", ar: "مجيدي مول" },
    category: 'Burgers',
    rating: 4.6,
    price: '$7 - $22',
    time: { en: '20-30 MIN', ku: '٢٠-٣٠ خولەک', ar: '٢٠-٣٠ دقيقة' },
    image: 'data:image/jpeg;base64,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vDHNJ68udiPUj5retN64m2ihbQfYVTUBg5WPmg53NHhzA4KsvTVBdKaJrrsacTBuHdg4kHz3AUgwt/Q+9GGK5v8AqFLnisZJis7wowaC1rrG5iv1PK2hZjAdM5rnsb4MjaSB8yPmrb0vpy3aZtraC2xkN6vkecvld4uPiuxyhMLbeLy8HlPIRzY2yqer+DVyrq2oq5tRwGWeRz3E0Tj1OfjVyHcLGAiGhYrZDZrRSW6nH3dNEIwfHHevF30/aL2Gi7W+nqwz8Paxg4XTRBpW21UFrhENupIaaL4YmBq57NH6cZXe3Ns1EKrPN2vYjOfFd1EHFu2k7Dear2q62qmqp+QM55WZPKO5b1qtdFaKNlHbaaOmpmElscYwAScn91uIgwRkYK5B0tYXVprXWijNSTkymIZK7CINaroKWspjTVVPHLARgxvaC36L4WyyWu1A/ZtBT02epijAK6CINeqoqerhMNVCyaI9WSNDgubTaS09SzCWCzUTJB+YQhdpEHlrGtaGtGGjoBsAvhXW+kuEBgrqaKoi+CRocFsog41FpWwUMnaUloo4n9zmxBdjlGMd3gsog59zslruwAuVBT1OOnaxgpbbJbLUCLbQ09LnqYow1dBEGAMLKIgId0RBjA8EwFlEGCAUwFlEGMBMBZRBjAWURAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQf/9k=',
    tagline: { en: "Go Big or Go Home", ku: "گەورە بژی یان بڕۆ ماڵەوە", ar: "عِشها كبيرة" },
    sig: { en: 'Super Star Burger', ku: 'سوپەر ستار بەرگر', ar: 'سوبر ستار برجر' },
    menu: [
      { category: { en: 'CHARGRILLED MEALS', ku: 'ژەمە برژاوەکان', ar: 'وجبات مشوية' }, items: [
        { name: { en: 'Super Star Meal', ku: 'ژەمی سوپەر ستار', ar: 'وجبة سوبر ستار' }, desc: { en: 'Two beef patties, American cheese, lettuce, and tomato.', ku: 'دوو پارچە گۆشت، پەنیری ئەمریکی، کاهوو، و تەماتە.', ar: 'قطعتين لحم، جبنة أمريكية، خس، وطماطم.' }, price: '$10.50' },
        { name: { en: 'Mushroom N’ Swiss', ku: 'مەشروم ئاند سویس', ar: 'مشروم آند سويس' }, desc: { en: 'Beef patty topped with mushroom sauce and Swiss cheese.', ku: 'پارچە گۆشت بە سۆسی قارچک و پەنیری سویسری.', ar: 'لحم مغطى بصوص الفطر والجبنة السويسرية.' }, price: '$11.00' }
      ]}
    ]
  },
  {
    id: 3,
    name: { en: "BURGER KING", ku: "بەرگر کینگ", ar: "برجر كينج" },
    location: { en: "Bakhtiary", ku: "بەختیاری", ar: "بختياري" },
    category: 'Burgers',
    rating: 4.4,
    price: '$6 - $20',
    time: { en: '20-30 MIN', ku: '٢٠-٣٠ خولەک', ar: '٢٠-٣٠ دقيقة' },
    image: 'data:image/png;base64,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',
    tagline: { en: "Have It Your Way", ku: "بە ئارەزووی خۆت", ar: "على كيفك" },
    sig: { en: 'Whopper', ku: 'وۆپەر', ar: 'ووبر' },
    menu: [
      { category: { en: 'FLAME GRILLED', ku: 'لەسەر ئاگر برژاو', ar: 'مشوي على اللهب' }, items: [
        { name: { en: 'Whopper Meal', ku: 'ژەمی وۆپەر', ar: 'وجبة ووبر' }, desc: { en: 'Flame-grilled beef patty with fresh vegetables.', ku: 'گۆشتی برژاو لەگەڵ سەوزەی فرێش.', ar: 'لحم مشوي على اللهب مع خضروات طازجة.' }, price: '$9.00' }
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
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutLocation, setCheckoutLocation] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const addToCart = (item: any, resto: any) => {
    const itemId = `${resto.id}-${item.name.en}`;
    setCart(prev => {
      const existing = prev.find(i => i.id === itemId);
      if (existing) {
        return prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { 
        id: itemId, 
        name: item.name[lang], 
        price: item.price, 
        quantity: 1, 
        restoName: resto.name[lang] 
      }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === itemId) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const cartTotal = cart.reduce((acc, item) => {
    const price = parseInt(item.price.replace('$', '')) || 0;
    return acc + (price * item.quantity);
  }, 0);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutLocation || cart.length === 0) return;

    setIsSubmitting(true);
    try {
      // PROXY ORDER DETAILS TO FORMSUBMIT
      const response = await fetch('https://formsubmit.co/ajax/bvitbveghem67@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: `MAISHAWI_ORDER: ${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
          order_id: Math.random().toString(36).substr(2, 9).toUpperCase(),
          items: cart.map(i => `${i.quantity}x ${i.name} (${i.restoName})`).join(', '),
          total: `$${cartTotal}`,
          location: checkoutLocation,
          phone: checkoutPhone,
          timestamp: new Date().toLocaleString(),
          _captcha: "false",
          _template: "table"
        })
      });
      
      if (response.ok) {
        setOrderStatus('success');
        setCart([]);
        setCheckoutLocation('');
        setCheckoutPhone('');
        setTimeout(() => {
          setOrderStatus('idle');
          setIsCartOpen(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Order failed', error);
      setOrderStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gold-muted hover:scale-110 transition-transform cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 stroke-1" />
            {cart.length > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0 -right-0 bg-white text-charcoal text-[7px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full"
              >
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </motion.span>
            )}
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
            className="fixed inset-0 z-[110] bg-charcoal flex flex-col overflow-y-auto no-scrollbar scroll-smooth"
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
                            <button 
                              onClick={() => addToCart(item, selectedRestaurant)}
                              className="text-[9px] tracking-[0.3em] uppercase text-white/20 hover:text-gold-muted transition-colors"
                            >
                              {t('addToBag')}
                            </button>
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

      {/* Cart Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-[120] bg-charcoal/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 ${LANGUAGES[lang].dir === 'rtl' ? 'left-0' : 'right-0'} h-screen w-full md:w-[450px] bg-charcoal border-l border-white/5 z-[130] flex flex-col shadow-2xl p-8 md:p-12 overflow-y-auto no-scrollbar`}
            >
              <div className="flex justify-between items-center mb-16">
                <div className="flex flex-col">
                  <h2 className="text-3xl font-serif italic text-white tracking-tight">{t('yourBag')}</h2>
                  <span className="text-[10px] tracking-[0.4em] text-gold-muted opacity-40 uppercase">{cart.reduce((a, b) => a + b.quantity, 0)} Items</span>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-3 text-gold-muted hover:text-white transition-colors">
                  <X className="w-6 h-6 stroke-1" />
                </button>
              </div>

              {orderStatus === 'success' ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                   <motion.div 
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     className="w-20 h-20 rounded-full border border-gold-muted flex items-center justify-center text-gold-muted"
                   >
                     <CheckCircle2 className="w-10 h-10 stroke-1" />
                   </motion.div>
                   <h3 className="text-3xl font-serif italic text-white">{t('orderConfirmed')}</h3>
                   <p className="text-gold-light/30 font-serif italic text-lg">{t('orderConfirmedDesc')}</p>
                </div>
              ) : cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-20 opacity-20">
                  <ShoppingBag className="w-12 h-12 mb-6 stroke-[0.5]" />
                  <p className="font-serif italic text-lg tracking-widest uppercase">{t('emptyBag')}</p>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto no-scrollbar space-y-10 pr-4">
                    {cart.map((item) => (
                      <div key={item.id} className="group grid grid-cols-[1fr,auto] gap-6 items-start pb-8 border-b border-white/[0.03]">
                        <div className="space-y-2">
                           <span className="text-[8px] tracking-[0.3em] text-gold-muted/40 uppercase">{item.restoName}</span>
                           <h4 className="text-lg font-serif text-white group-hover:text-gold-muted transition-colors">{item.name}</h4>
                           <div className="flex items-center gap-6 mt-4">
                              <div className="flex items-center border border-white/10 rounded-full px-3 py-1 gap-4">
                                <button onClick={() => updateQuantity(item.id, -1)} className="text-gold-muted/40 hover:text-gold-muted transition-colors"><Minus className="w-3 h-3" /></button>
                                <span className="text-[10px] text-white w-4 text-center font-mono">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)} className="text-gold-muted/40 hover:text-gold-muted transition-colors"><Plus className="w-3 h-3" /></button>
                              </div>
                              <span className="text-[10px] text-gold-muted/40 font-mono tracking-tighter">{item.price}</span>
                           </div>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="p-2 text-white/20 hover:text-red-900/60 transition-colors">
                          <Trash2 className="w-4 h-4 stroke-1" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-16 space-y-8 border-t border-white/5 pt-12">
                    <div className="flex justify-between items-end pb-8">
                       <span className="text-[10px] tracking-[0.4em] text-gold-muted/40 uppercase font-sans">{t('subtotal')}</span>
                       <span className="text-4xl font-serif text-white italic tracking-tighter">${cartTotal}</span>
                    </div>

                    <form onSubmit={handleCheckout} className="space-y-6">
                       <div className="space-y-3">
                          <label className="text-[9px] tracking-[0.3em] text-gold-muted/40 uppercase font-sans block">{t('deliveryLocation')}</label>
                          <input 
                            required
                            type="text"
                            value={checkoutLocation}
                            onChange={(e) => setCheckoutLocation(e.target.value)}
                            placeholder="e.g. Suly Heights, Tower A, Flat 402"
                            className={`w-full bg-transparent border border-white/10 p-5 font-sans text-xs tracking-widest text-white placeholder:text-white/10 focus:outline-none focus:border-gold-muted transition-colors ${LANGUAGES[lang].dir === 'rtl' ? 'text-right' : 'text-left'}`}
                          />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[9px] tracking-[0.3em] text-gold-muted/40 uppercase font-sans block">{t('phoneNumber')}</label>
                          <input 
                            required
                            type="tel"
                            value={checkoutPhone}
                            onChange={(e) => setCheckoutPhone(e.target.value)}
                            placeholder="+964 7XX XXX XXXX"
                            className={`w-full bg-transparent border border-white/10 p-5 font-sans text-xs tracking-widest text-white placeholder:text-white/10 focus:outline-none focus:border-gold-muted transition-colors ${LANGUAGES[lang].dir === 'rtl' ? 'text-right' : 'text-left'}`}
                          />
                       </div>
                       <button 
                         disabled={isSubmitting}
                         type="submit"
                         className="luxury-button w-full !py-6 group"
                       >
                         {isSubmitting ? t('sending') : t('checkout')}
                         <ArrowRight className={`w-4 h-4 ml-4 transition-transform group-hover:translate-x-1 ${LANGUAGES[lang].dir === 'rtl' ? 'rotate-180 mr-4 ml-0 group-hover:-translate-x-1' : ''}`} />
                       </button>
                    </form>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
