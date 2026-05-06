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
  { id: 'steak', name: 'RESERVE STEAK', icon: Flame },
  { id: 'sushi', name: 'KYOTO RAW', icon: Utensils },
  { id: 'french', name: 'HAUTE CUISINE', icon: Star },
  { id: 'fusion', name: 'NEO FUSION', icon: Search },
];

const RESTAURANTS = [
  {
    id: 1,
    name: "MOPA'S MAISHAWI",
    location: "Suly Park District",
    category: 'steak',
    rating: 4.9,
    price: '$65 - $180',
    time: '25-35 MIN',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=2070&auto=format&fit=crop',
    tagline: 'Ancestral Charcoal Reserve',
    sig: 'KRI Spiced Ribeye',
    menu: [
      { category: 'STARTERS', items: [
        { name: 'Suly Bone Marrow', desc: 'Roasted with local herbs and grilled sourdough.', price: '$22' },
        { name: 'Charcoal Beets', desc: 'Smoked goat cheese, walnut crumble.', price: '$18' }
      ]},
      { category: 'MAISHAWI SELECTIONS', items: [
        { name: 'KRI Spiced Ribeye', desc: '45-day dry-aged, seared over oak charcoal.', price: '$65' },
        { name: 'The Grand Tomahawk', desc: '32oz reserve cut, gold-flecked marrow butter.', price: '$145' }
      ]}
    ]
  },
  {
    id: 2,
    name: "AZMAR PEAK",
    location: "Azmar Heights",
    category: 'french',
    rating: 4.8,
    price: '$45 - $120',
    time: '40-50 MIN',
    image: 'https://images.unsplash.com/photo-1550966841-3ee3ad15f0d5?q=80&w=2070&auto=format&fit=crop',
    tagline: 'Crest-Side Fine Dining',
    sig: 'Lamb Shank Confit',
    menu: [
      { category: 'HORS D\'OEUVRES', items: [
        { name: 'Escargot de Azmar', desc: 'Garlic butter, puff pastry, mountain herbs.', price: '$24' },
        { name: 'Foie Gras Torchon', desc: 'Fig compote, toasted brioche.', price: '$32' }
      ]},
      { category: 'PLATS PRINCIPAUX', items: [
        { name: 'Lamb Shank Confit', desc: 'Slow-cooked for 12 hours, red wine reduction.', price: '$48' },
        { name: 'Duck à l\'Orange', desc: 'Zesty citrus glaze, parsnip purée.', price: '$52' }
      ]}
    ]
  },
  {
    id: 3,
    name: "SAWRA GRID",
    location: "Salim Street",
    category: 'sushi',
    rating: 5.0,
    price: '$80 - $250',
    time: '20-30 MIN',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop',
    tagline: 'Imported Raw Reserve',
    sig: 'Bluefin O-Toro',
    menu: [
      { category: 'ZEN STARTERS', items: [
        { name: 'Tuna Tataki', desc: 'Seared bluefin, ponzu, crispy garlic.', price: '$28' },
        { name: 'Golden Enoki', desc: 'Tempura mushrooms, truffle aioli.', price: '$16' }
      ]},
      { category: 'THE RESERVE BOX', items: [
        { name: 'O-Toro Flight', desc: 'Three grades of bluefin fatty tuna.', price: '$85' },
        { name: 'Imperial Omakase', desc: '12-piece chef\'s selection of the day\'s best catch.', price: '$120' }
      ]}
    ]
  },
  {
    id: 4,
    name: "GOIZHA CELLAR",
    location: "Sarchinar Road",
    category: 'fusion',
    rating: 4.7,
    price: '$35 - $90',
    time: '30-40 MIN',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2074&auto=format&fit=crop',
    tagline: 'Modern Kurdish Fusion',
    sig: 'Wagyu Bone Marrow',
    menu: [
      { category: 'SMALL PLINTHS', items: [
        { name: 'Kurdish Arancini', desc: 'Saffron rice, braised lamb, spiced yogurt.', price: '$14' },
        { name: 'Goizha Hummus', desc: 'Wagyu fat infusion, toasted pine nuts.', price: '$12' }
      ]},
      { category: 'SIGNATURES', items: [
        { name: 'Wagyu Bone Marrow', desc: 'Herb crust, lemon zest, mountain salt.', price: '$36' },
        { name: 'Neo-Dolma', desc: 'Deconstructed traditional flavors, modern plating.', price: '$28' }
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
  
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const filteredRestaurants = useMemo(() => {
    return RESTAURANTS.filter(r => {
      const matchCat = activeCategory === 'all' || r.category === activeCategory;
      const matchPrice = priceFilter === 'all' || r.price === priceFilter;
      const matchSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchPrice && matchSearch;
    });
  }, [activeCategory, priceFilter, searchQuery]);

  return (
    <div className="bg-charcoal min-h-screen text-crema font-sans selection:bg-gold-muted selection:text-charcoal overflow-x-hidden antialiased">
      {/* Elegant Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-16 py-10 backdrop-blur-md bg-charcoal/40 border-b border-white/5">
        <div className="flex flex-col">
          <span className="font-serif text-3xl font-light tracking-[0.1em] text-gold-muted leading-tight uppercase">MAISHAWI</span>
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold-muted/60 -mt-1">Elite Logistics</span>
        </div>

        <div className="hidden lg:flex items-center gap-16 text-[10px] tracking-[0.4em] font-light uppercase text-gold-light/40">
          <button onClick={() => { setActiveCategory('all'); setSearchQuery(''); }} className={`${activeCategory === 'all' && !searchQuery ? 'text-gold-muted' : 'hover:text-gold-muted'} transition-all cursor-pointer`}>GRID HOME</button>
          <a href="#discover" className="hover:text-gold-muted transition-all">DISCOVER</a>
          <a href="#reviews" className="hover:text-gold-muted transition-all">CONNOISSEURS</a>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-2 text-gold-muted/40 font-sans text-[10px] tracking-widest uppercase">
            <MapPin className="w-3 h-3" /> SULAYMANIYAH GRID KRI
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
            <span className="text-gold-muted font-sans text-[10px] tracking-[0.8em] uppercase mb-12 block opacity-60">The Apex of Cuisine</span>
            <h1 className="text-8xl md:text-[12rem] font-serif font-light italic leading-none mb-4 tracking-tighter text-white gold-glow">
              Maishawi
            </h1>
            <div className="fine-line w-48 mx-auto mb-10 opacity-30" />
            <p className="text-gold-light/40 font-serif italic text-2xl md:text-3xl max-w-2xl mx-auto font-light leading-relaxed">
              Curating the world's most <br /> exclusive culinary plinths.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <a href="#discover" className="luxury-button inline-flex items-center gap-4 group">
              ENTER THE GRID <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
              <h2 className="text-6xl md:text-7xl font-serif italic text-white leading-tight">Explore the <br />Culinary Grid.</h2>
              <p className="text-gold-light/20 text-xs font-sans tracking-[0.4em] uppercase">Selection Archive 002</p>
            </div>
            
            <div className="w-full md:w-96 group">
              <div className="flex items-center gap-4 border-b border-gold-muted/20 py-4 transition-colors group-focus-within:border-gold-muted">
                <Search className="w-4 h-4 text-gold-muted/40" />
                <input 
                  type="text" 
                  placeholder="SEARCH ESTABLISHMENT" 
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
              ALL CATEGORIES
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-4 px-10 py-5 font-sans text-[10px] tracking-[0.4em] border transition-all duration-700 uppercase ${activeCategory === cat.id ? 'bg-gold-muted text-charcoal border-gold-muted' : 'border-white/10 text-white/40 hover:border-gold-muted/40'}`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.name}
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

                      <h3 className="text-5xl font-serif italic mb-2 tracking-tight group-hover:-translate-y-4 transition-transform duration-700 text-white">{res.name}</h3>
                      <div className="flex items-center justify-between group-hover:-translate-y-4 transition-transform duration-700">
                        <p className="font-serif text-lg text-gold-light/40 italic">{res.tagline}</p>
                        <span className="font-serif text-sm text-gold-muted">{res.price}</span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-8 border-t border-white/10 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                        <div className="flex gap-10">
                          <div className="flex flex-col gap-1">
                            <span className="font-sans text-[8px] tracking-widest text-white/30 uppercase">Signature</span>
                            <span className="font-serif text-sm text-gold-muted uppercase italic">{res.sig}</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="font-sans text-[8px] tracking-widest text-white/30 uppercase">Time</span>
                            <span className="font-serif text-sm text-white/60 uppercase italic">{res.time}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => setSelectedRestaurant(res)}
                          className="luxury-button !py-2 !px-6 text-[9px]"
                        >
                          VIEW CATALOGUE
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
                <p className="font-serif italic text-4xl text-gold-light/20 uppercase tracking-widest">No Reservations Found</p>
                <button onClick={() => {setActiveCategory('all'); setSearchQuery('');}} className="mt-12 text-gold-muted text-[10px] tracking-[0.4em] uppercase underline underline-offset-8">Reset Grid</button>
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
                  <span className="font-sans text-[10px] tracking-[0.4em] text-gold-muted uppercase mb-4">{selectedRestaurant.category} Reserve</span>
                  <h2 className="text-6xl md:text-8xl font-serif italic text-white tracking-tighter mb-4">{selectedRestaurant.name}</h2>
                  <div className="flex items-center gap-6 text-gold-light/40 font-sans text-[9px] tracking-widest uppercase">
                    <span>{selectedRestaurant.location}</span>
                    <span className="w-1 h-1 bg-gold-muted rounded-full" />
                    <span>{selectedRestaurant.rating} Rating</span>
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
                    key={cat.category}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="flex items-center gap-8 mb-12">
                      <div className="fine-line flex-1 opacity-20" />
                      <h3 className="font-sans text-[11px] tracking-[0.5em] text-gold-muted uppercase">{cat.category}</h3>
                      <div className="fine-line flex-1 opacity-20" />
                    </div>
                    
                    <div className="space-y-12">
                      {cat.items.map((item: any) => (
                        <div key={item.name} className="group flex justify-between items-start gap-12">
                          <div className="space-y-2">
                             <h4 className="text-2xl font-serif text-white group-hover:text-gold-muted transition-colors duration-500">{item.name}</h4>
                             <p className="text-gold-light/30 text-sm font-light italic max-w-sm">{item.desc}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <span className="font-sans text-xs tracking-widest text-gold-muted">{item.price}</span>
                            <button className="text-[9px] tracking-[0.3em] uppercase text-white/20 hover:text-gold-muted transition-colors">ADD_TO_BAG</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}

                <div className="pt-24 text-center">
                   <p className="font-serif italic text-gold-light/20 text-lg mb-8 uppercase tracking-widest">End_of_Catalogue</p>
                   <button 
                     onClick={() => setSelectedRestaurant(null)}
                     className="luxury-button"
                   >
                     RETURN_TO_GRID
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
          <span className="font-sans text-[10px] tracking-[0.6em] text-gold-muted uppercase block mb-24 opacity-60">Verified Epistolae</span>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 text-left">
            {[
              { name: 'BUGUY BAWAKCH', role: 'Gastronomic Critic', text: "An ephemeral transition of flavor. The Maishawi steak is precisely what perfection should taste like in the modern age. Every sear is a data point of brilliance." },
              { name: 'PTIN BVUGHUM', role: 'Elite Member', text: "The logistics are as refined as the cuisine itself. Opening a Maishawi reserve box is akin to unsealing a heritage artifact. Unmatched precision." }
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.2 }}
                className="space-y-10 relative"
              >
                <span className="text-gold-muted/10 text-8xl absolute -top-12 -left-8 font-serif leading-none">“</span>
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
        <h2 className="text-6xl md:text-[8rem] font-serif italic mb-12 text-white leading-none">Your plinth awaits.</h2>
        <p className="text-gold-light/30 text-xl font-serif italic mb-16 max-w-xl font-light">
          Experience the pinnacle of culinary delivery. <br /> Reservations for the next grid cycle are now open.
        </p>
        <button className="luxury-button !px-16 !py-8 text-sm tracking-[0.6em]">
          ACQUIRE MEMBERSHIP
        </button>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-32 px-8 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 items-start">
          <div className="space-y-10">
            <div className="flex flex-col">
              <span className="font-serif text-4xl font-light tracking-[0.1em] text-gold-muted italic leading-tight uppercase">MAISHAWI</span>
              <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold-muted/40 font-light ml-1">Elite Logistics</span>
            </div>
            <p className="text-gold-light/20 text-[10px] font-light leading-relaxed max-w-xs uppercase tracking-[0.3em]">
              The apex of culinary logistics since 1889. Redefining the intersection of heritage and digital commerce.
            </p>
          </div>

          <div className="space-y-8 font-sans text-[10px] tracking-[0.4em] uppercase text-gold-light/40">
            <h4 className="text-gold-muted mb-10 tracking-[0.5em]">NODES</h4>
            <div className="flex items-center gap-4 text-white/20"><MapPin className="w-3 h-3 text-gold-muted" /> PARIS GRID 08</div>
            <div className="flex items-center gap-4 text-white/40"><MapPin className="w-3 h-3 text-gold-muted" /> TOKYO CENTER CORE</div>
            <div className="flex items-center gap-4 text-white/20"><MapPin className="w-3 h-3 text-gold-muted" /> NEO DOGLANDS RESERVE</div>
          </div>

          <div className="space-y-8 font-sans text-[10px] tracking-[0.4em] uppercase text-gold-light/40">
            <h4 className="text-gold-muted mb-10 tracking-[0.5em]">PROTOCOLS</h4>
            <a href="#" className="hover:text-gold-muted block transition-colors">Elite Membership</a>
            <a href="#" className="hover:text-gold-muted block transition-colors">Logistics Standards</a>
            <a href="#" className="hover:text-gold-muted block transition-colors">Cellar Releases</a>
          </div>

          <div className="space-y-10">
            <h4 className="font-sans text-[10px] tracking-[0.5em] text-gold-muted uppercase">Updates</h4>
            <div className="flex border-b border-gold-muted/20 pb-4">
              <input 
                type="text" 
                placeholder="EMAIL ADDR" 
                className="bg-transparent border-none focus:ring-0 text-[10px] tracking-[0.3em] w-full placeholder:text-white/10 uppercase"
              />
              <ArrowRight className="w-4 h-4 text-gold-muted cursor-pointer hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-8 text-[8px] tracking-[0.5em] text-white/10 uppercase font-sans">
          <div className="flex gap-16 order-2 md:order-1">
             <span>&copy; MMCCVI Maishawi Elite Systems</span>
             <span className="hidden md:inline">Status: Fully Operational</span>
          </div>
          <div className="flex gap-12 order-1 md:order-2">
            <a href="#" className="hover:text-gold-muted transition-colors">Legal Notice</a>
            <a href="#" className="hover:text-gold-muted transition-colors">Data Privacy</a>
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
                <span className="font-sans text-[10px] tracking-[0.8em] text-gold-muted/40 uppercase mb-8">The Matrix</span>
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
