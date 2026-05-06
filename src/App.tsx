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
    price: '3,250 - 81,000 IQD',
    time: { en: '25-40 MIN', ku: '٢٥-٤٠ خولەک', ar: '٢٥-٤٠ دقيقة' },
    image: 'https://1000logos.net/wp-content/uploads/2017/03/Kfc_logo.png', 
    tagline: { en: "Finger Lickin' Good", ku: "پەنجەکانتی لەگەڵ دەخۆیت", ar: "خلطة سرية، طعم رائع" },
    sig: { en: 'Mighty Bucket', ku: 'مایتی سەتڵ', ar: 'مايتي بوكيت' },
    menu: [
      { 
        category: { en: 'INDIVIDUAL MEALS', ku: 'ژەمە تاکەکەسییەکان', ar: 'وجبات فردية' }, 
        items: [
          { name: { en: 'Zinger Burger Meal', ku: 'ژەمی زینگەر بەرگر', ar: 'وجبة زنجر برجر' }, desc: { en: 'Spicy chicken fillet, fries, and a drink.', ku: 'فیلیتەی مریشکی توون، پەتاتە، و خواردنەوەیەکی سارد.', ar: 'فيليه دجاج حار، بطاطس، ومشروب.' }, price: '17,250 IQD' },
          { name: { en: 'Twister Sandwich', ku: 'تویستەر سەندویچ', ar: 'تويستر ساندويتش' }, desc: { en: 'Tortilla bread, 2 crispy strips, and mayonnaise.', ku: 'نانى تۆرتیلا، ٢ پارچە سترێپس، و مایۆنیز.', ar: 'خبز تورنيلا، ٢ ستربس، ومايونيز.' }, price: '5,000 IQD' },
          { name: { en: 'Snacker Sandwich', ku: 'سناکار سەندویچ', ar: 'سناكر ساندويتش' }, desc: { en: '1 chicken strip with spicy mayonnaise.', ku: '١ پارچە سترێپس لەگەڵ مایۆنیزی توون.', ar: '١ ستربس مع مايونيز حار.' }, price: '3,250 IQD' },
          { name: { en: 'Strips and Rice Meal', ku: 'ژەمی سترێپس و برنج', ar: 'وجبة ستربس وأرز' }, desc: { en: 'Rice with 3 chicken pieces and a drink.', ku: 'برنج لەگەڵ ٣ پارچە مریشک و خواردنەوەیەکی سارد.', ar: 'أرز مع ٣ قطع دجاج ومشروب.' }, price: '10,500 IQD' }
        ]
      },
      { 
        category: { en: 'BUCKETS', ku: 'سەتڵەکان', ar: 'البوكت' }, 
        items: [
          { name: { en: 'Super Bucket (9 Pcs)', ku: 'سەتڵێ سوپەر ٩ پارچەیی', ar: 'سوبر بوكيت ٩ قطع' }, desc: { en: '9 chicken pieces, 3 buns, family fries, coleslaw, and 1.75L drink.', ku: '٩ پارچە مریشک، ٣ سەموون، پەتاتە، زەڵاتە، و خواردنەوە.', ar: '٩ قطع دجاج، ٣ خبز، بطاطس عائلية، كولسلو، ومشروب.' }, price: '36,000 IQD' },
          { name: { en: 'Mighty Bucket (15 Pcs)', ku: 'سەتڵێ مایتی ١٥ پارچەیی', ar: 'مايتي بوكيت ١٥ قطعة' }, desc: { en: '15 chicken pieces, 5 strips, 5 buns, family fries, coleslaw, and 1.75L drink.', ku: '١٥ پارچە مریشک، ٥ سترێپس، ٥ سەموون، پەتاتە، و خواردنەوە.', ar: '١٥ قطعة دجاج، ٥ ستربس، ٥ خبز، بطاطس عائلية، ومشروب.' }, price: '61,000 IQD' },
          { name: { en: 'Saver Bucket (21 Pieces)', ku: 'سەتڵێ سەیڤەر ٢١ پارچەیی', ar: 'سيفر بوكيت ٢١ قطعة' }, desc: { en: '21 pieces of chicken and 7 buns.', ku: '٢١ پارچە مریشک و ٧ سەموون.', ar: '٢١ قطعة دجاج و ٧ خبز.' }, price: '55,000 IQD' }
        ]
      }
    ]
  },
  {
    id: 2,
    name: { en: "HARDEE'S", ku: "هاردیز", ar: "هارديز" },
    location: { en: "Majidi Mall", ku: "مەجیدی مۆڵ", ar: "مجيدي مول" },
    category: 'Burgers',
    rating: 4.6,
    price: '9,750 - 52,500 IQD',
    time: { en: '30-45 MIN', ku: '٣٠-٤٥ خولەک', ar: '٣٠-٤٥ دقيقة' },
    image: 'https://assets.stickpng.com/images/614479365953a50004ee16c7.png', 
    tagline: { en: "Go Big or Go Home", ku: "گەورە بژی یان بڕۆ ماڵەوە", ar: "عِشها كبيرة" },
    sig: { en: 'Super Star Burger', ku: 'سوپەر ستار بەرگر', ar: 'سوبر ستار برجر' },
    menu: [
      { 
        category: { en: 'CHARGRILLED MEALS', ku: 'ژەمە برژاوەکان', ar: 'وجبات مشوية' }, 
        items: [
          { name: { en: 'Super Star Meal', ku: 'ژەمی سوپەر ستار', ar: 'وجبة سوبر ستار' }, desc: { en: 'Two beef patties, American cheese, lettuce, and tomato.', ku: 'دوو پارچە گۆشت، پەنیری ئەمریکی، کاهوو، و تەماتە.', ar: 'قطعتين لحم، جبنة أمريكية، خس، وطماطم.' }, price: '18,750 IQD' },
          { name: { en: 'Famous Star Burger', ku: 'فەیمس ستار بەرگر', ar: 'فيمس ستار برجر' }, desc: { en: 'All-beef patty, cheese, mayo, ketchup, and pickles.', ku: 'پارچە گۆشت، پەنیر، مایۆنیز، کێچاپ، و خەیارشور.', ar: 'قطعة لحم، جبنة، مايونيز، كاتشب، ومخلل.' }, price: '15,750 IQD' },
          { name: { en: 'Mushroom N’ Swiss', ku: 'مەشروم ئاند سویس', ar: 'مشروم آند سويس' }, desc: { en: 'Beef patty topped with mushroom sauce and Swiss cheese.', ku: 'پارچە گۆشت بە سۆسی قارچک و پەنیری سویسری.', ar: 'لحم مغطى بصوص الفطر والجبنة السويسرية.' }, price: '19,500 IQD' }
        ]
      },
      {
        category: { en: 'CHICKEN & SIDES', ku: 'مریشک و تەنیشتەکان', ar: 'دجاج وأصناف جانبية' },
        items: [
          { name: { en: 'Hand-Breaded Tenders (3 Pcs)', ku: 'سترێپس ٣ پارچەیی', ar: 'ستربس ٣ قطع' }, desc: { en: '3 pieces of hand-breaded chicken tenders.', ku: '٣ پارچە سترێپسی مریشکی دەستکرد.', ar: '٣ قطع ستربس دجاج.' }, price: '12,750 IQD' },
          { name: { en: 'Loaded Fries', ku: 'پەتاتەی لۆدێد', ar: 'لودد فرايز' }, desc: { en: 'Fries topped with cheese sauce and jalapenos.', ku: 'پەتاتە بە سۆسی پەنیر و هالاپینۆ.', ar: 'بطاطس مع صوص الجبنة وهالبينو.' }, price: '9,750 IQD' }
        ]
      }
    ]
  },
  {
    id: 3,
    name: { en: "BURGER KING", ku: "بەرگر کینگ", ar: "برجر كينج" },
    location: { en: "Bakhtiary", ku: "بەختیاری", ar: "بختياري" },
    category: 'Burgers',
    rating: 4.4,
    price: '10,500 - 45,000 IQD',
    time: { en: '30-45 MIN', ku: '٣٠-٤٥ خولەک', ar: '٣٠-٤٥ دقيقة' },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Burger_King_logo_%281999%E2%80%932020%29.svg/960px-Burger_King_logo_%281999%E2%80%932020%29.svg.png',
    tagline: { en: "Taste is King", ku: "تام پادشایە", ar: "الطعم هو الملك" },
    sig: { en: 'Whopper Meal', ku: 'ژەمی واپەر', ar: 'وجبة وابر' },
    menu: [
      { 
        category: { en: 'FLAME GRILLED', ku: 'برژاوی سەر ئاگر', ar: 'مشوي على اللهب' }, 
        items: [
          { name: { en: 'Whopper Meal', ku: 'ژەمی واپەر', ar: 'وجبة وابر' }, desc: { en: 'Flame-grilled beef, tomatoes, lettuce, and pickles.', ku: 'گۆشتی برژاو، تەماتە، کاهوو، و خەیارشور.', ar: 'لحم مشوي، طماطم، خس، ومخلل.' }, price: '18,000 IQD' },
          { name: { en: 'Steakhouse Burger', ku: 'ستەیک هاوس بەرگر', ar: 'ستيك هاوس برجر' }, desc: { en: 'Beef patty, bacon, crispy onions, and BBQ sauce.', ku: 'پارچە گۆشت، بەیکۆن، پیاز، و سۆسی بی بی کیو.', ar: 'لحم، بيكون، بصل مقرمش، وصوص باربيكيو.' }, price: '20,250 IQD' },
          { name: { en: 'Bacon King Double', ku: 'بەکۆن کینگ دووانە', ar: 'بيكون كينج دبل' }, desc: { en: 'Two flame-grilled beef patties with crispy bacon.', ku: 'دوو پارچە گۆشتی برژاو لەگەڵ بەیکۆنی کریسپی.', ar: 'قطعتين لحم مشوي مع بيكون مقرمش.' }, price: '22,500 IQD' }
        ]
      },
      {
        category: { en: 'CHICKEN', ku: 'مریشک', ar: 'دجاج' },
        items: [
          { name: { en: 'Chicken Royale', ku: 'چیکن ڕۆیاڵ', ar: 'تشيكن رويال' }, desc: { en: 'Breaded chicken fillet with lettuce and mayo.', ku: 'فیلیتەی مریشک لەگەڵ کاهوو و مایۆنیز.', ar: 'فيليه دجاج مع خس ومايونيز.' }, price: '13,500 IQD' },
          { name: { en: 'Chicken Nuggets (9 Pcs)', ku: 'ناگێتس ٩ پارچەیی', ar: 'ناجتس ٩ قطع' }, desc: { en: '9 pieces of crispy chicken nuggets.', ku: '٩ پارچە ناگێتسی مریشکی کریسپی.', ar: '٩ قطع ناجتس دجاج.' }, price: '10,500 IQD' }
        ]
      }
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
