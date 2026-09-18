import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Search, ShoppingBag, User, Droplet, Wind, Sparkles, MapPin, Phone, Mail, Instagram, Twitter, Facebook, ArrowRight, MessageCircle, RefreshCcw, ShieldCheck, Truck, Plane, Leaf, Car, Shield } from 'lucide-react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const heroSlides = [
  {
    heading: "Wear luxury <br/> Keep mystery",
    description: "Experience timeless sophistication, designed for those who leave a little mystery behind.",
    image: "/hero.png"
  },
  {
    heading: "Discover <br/> True Elegance",
    description: "A fragrance collection crafted with the finest ingredients to elevate your everyday.",
    image: "/hero.png"
  },
  {
    heading: "Embrace <br/> The Night",
    description: "Bold, intense, and unforgettable. Find your signature scent for the evening.",
    image: "/hero.png"
  }
];

const perfumeSeduction = "/seduction_perfume.jpg";
const perfumePassion = "/passion_perfume.jpg";
const perfumeSantorini = "/secret.png";
const perfumeIntense = "/secret.png";
const perfumeTropez = "/secret.png";

export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  const [isAtTop, setIsAtTop] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Set up ScrollTriggers for each section to correctly update activeSection
    sectionsRef.current.forEach((section, index) => {
      if (section) {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveSection(index),
          onEnterBack: () => setActiveSection(index),
        });
      }
    });

    // Removed pinned cinematic reveal to prevent massive empty whitespace.
    // The curved divider is now static and the sections flow naturally.

    // Footer Fade Up Animations
    gsap.utils.toArray('.fade-up-element').forEach((el: any) => {
      gsap.fromTo(el,
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse"
          },
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out"
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const scrollToSection = (index: number) => {
    if (lenisRef.current && sectionsRef.current[index]) {
      lenisRef.current.scrollTo(sectionsRef.current[index]!);
    }
  };

  const prevMainSection = () => {
    const nextIndex = activeSection === 0 ? 4 : activeSection - 1;
    scrollToSection(nextIndex);
  };

  const nextMainSection = () => {
    const nextIndex = (activeSection + 1) % 5;
    scrollToSection(nextIndex);
  };

  const showNav = isNavHovered;

  return (
    <div className="font-sans text-gray-900 bg-[#FDFBF7] min-h-screen w-full flex flex-col relative">
      {/* Top Hover Detection Zone */}
      <div
        className="fixed top-0 left-0 w-full h-12 z-[40]"
        onMouseEnter={() => setIsNavHovered(true)}
      />

      {/* Navbar */}
      <nav
        onMouseEnter={() => setIsNavHovered(true)}
        onMouseLeave={() => setIsNavHovered(false)}
        className={`fixed top-0 left-0 w-full z-[100] flex flex-col items-center px-6 md:px-12 pt-6 pb-4 transition-all duration-400 ease-in-out text-black ${
          activeSection === 0
            ? "bg-transparent translate-y-0 opacity-100"
            : isNavHovered
              ? "bg-white translate-y-0 opacity-100 shadow-sm"
              : "bg-white -translate-y-full opacity-0"
        }`}
      >
        {/* Sliding White Background Effect (Only for Hero Section) */}
        {activeSection === 0 && (
          <div 
            className={`absolute top-0 left-0 w-full bg-white transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] -z-10 ${isNavHovered ? 'h-full' : 'h-0'}`}
            style={{ transformOrigin: 'top' }}
          ></div>
        )}

        <div className="w-full flex items-center justify-between mb-5 relative z-10">
          <div className="flex items-center w-24">
             <Search size={22} strokeWidth={1.5} className="cursor-pointer hover:opacity-70 transition-opacity" />
          </div>
          
          <div className="text-[26px] md:text-[30px] font-['Montserrat'] tracking-[0.2em] font-bold antialiased uppercase flex-1 text-center">
            ARION
          </div>
          
          <div className="flex gap-6 items-center justify-end w-24">
            <User size={22} strokeWidth={1.5} className="cursor-pointer hover:opacity-70 transition-opacity" />
            <div className="relative cursor-pointer hover:opacity-70 transition-opacity">
              <ShoppingBag size={22} strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-2 bg-white border border-gray-200 text-black text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">2</span>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex gap-12 text-[11px] md:text-[12px] font-['Montserrat'] uppercase tracking-[0.15em] font-semibold items-center relative z-10">
          <button onClick={() => scrollToSection(1)} className={`hover:opacity-70 transition-all ${activeSection === 1 ? 'opacity-100 font-bold border-b-2 border-black pb-1' : 'opacity-90'}`}>Collections</button>
          <button onClick={() => scrollToSection(2)} className={`hover:opacity-70 transition-all ${activeSection === 2 ? 'opacity-100 font-bold border-b-2 border-black pb-1' : 'opacity-90'}`}>Our story</button>
          <button onClick={() => scrollToSection(3)} className={`hover:opacity-70 transition-all ${activeSection === 3 ? 'opacity-100 font-bold border-b-2 border-black pb-1' : 'opacity-90'}`}>Journals</button>
          <button onClick={() => scrollToSection(4)} className={`hover:opacity-70 transition-all ${activeSection === 4 ? 'opacity-100 font-bold border-b-2 border-black pb-1' : 'opacity-90'}`}>Contact</button>
        </div>
      </nav>

      {/* Main Content Area - Continuous Cinematic Scroll */}
      <div className="w-full bg-[#FDFBF7] flex flex-col relative">
        <section ref={el => { sectionsRef.current[0] = el; }} className="h-screen w-full relative z-10">
          <HeroSection />
        </section>
        <section ref={el => { sectionsRef.current[1] = el; }} className="min-h-screen w-full relative z-20">
          <ProductSection />
        </section>
        <section ref={el => { sectionsRef.current[2] = el; }} className="w-full relative z-30 bg-[#FDFBF7]">
          <IngredientsSection />
        </section>
        <section ref={el => { sectionsRef.current[3] = el; }} className="w-full relative z-20 bg-white">
          <FeatureSection />
          <PerfumeMarquee />
        </section>
        <section ref={el => { sectionsRef.current[4] = el; }} className="w-full relative z-50">
          <FooterSection />
        </section>
      </div>


    </div>
  );
}

const heroImages = [
  "/images/zero.hero.mp4"
];

function HeroSection() {
  return (
    <div className="relative w-full min-h-[100vh] md:h-[100vh] flex flex-col md:flex-row md:items-center overflow-hidden bg-[#FDFBF7] md:bg-gray-900">
      <div className="relative w-full h-[50vh] md:absolute md:inset-0 md:h-[100vh] z-0 flex items-center justify-center bg-gray-900 pt-16 md:pt-0">
        <video
          src={heroImages[0]}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-contain md:object-cover"
        />
      </div>
      {/* Light overlay to ensure black text remains readable over the image */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent w-full md:w-1/2 z-10"></div>



      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16 flex flex-col items-start relative z-20 h-auto md:h-[100vh] justify-center py-12 md:py-0">
        <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col items-start mt-4">
          
          <h2 className="text-[11px] md:text-[13px] font-['Montserrat'] font-bold tracking-[0.3em] uppercase text-black mb-4">
            PREMIUM CAR PERFUME
          </h2>
          
          <div className="w-8 h-[2px] bg-black mb-6"></div>
          
          <h1 className="text-2xl md:text-3xl lg:text-[32px] font-['Montserrat'] font-extrabold text-black uppercase tracking-[0.08em] mb-8 leading-[1.3]">
            MORE THAN A FRAGRANCE<br/>IT'S A JOURNEY
          </h1>

          <div className="flex flex-col gap-6">
            {/* Feature 1 */}
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 items-start">
              <Leaf size={18} color="#000000" strokeWidth={2} className="mt-0.5" />
              <h3 className="text-black font-bold tracking-[0.1em] text-[12px] md:text-[13px] leading-tight">Long Lasting Fragrance</h3>
              <div className="col-start-2">
                <p className="text-black/80 text-[11px] md:text-[12px] font-medium tracking-wide leading-relaxed">Crafted for extended freshness.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 items-start">
              <Car size={18} color="#000000" strokeWidth={2} className="mt-0.5" />
              <h3 className="text-black font-bold tracking-[0.1em] text-[12px] md:text-[13px] leading-tight">Perfect For Your Car</h3>
              <div className="col-start-2">
                <p className="text-black/80 text-[11px] md:text-[12px] font-medium tracking-wide leading-relaxed">Designed to complement every drive.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 items-start">
              <Shield size={18} color="#000000" strokeWidth={2} className="mt-0.5" />
              <h3 className="text-black font-bold tracking-[0.1em] text-[12px] md:text-[13px] leading-tight">Premium Craftsmanship</h3>
              <div className="col-start-2">
                <p className="text-black/80 text-[11px] md:text-[12px] font-medium tracking-wide leading-relaxed">Luxury materials with refined detailing.</p>
              </div>
            </div>
          </div>

          <button className="mt-8 h-[48px] w-fit px-[32px] py-[14px] rounded-full bg-[#D4AF37] text-[#111111] font-bold text-[15px] uppercase tracking-[2px] cursor-pointer hover:bg-[#E8C65A] hover:scale-105 hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] active:scale-[0.96] transition-all duration-[350ms] ease-out flex items-center justify-center border-none">
            SHOP NOW
          </button>
        </div>
      </div>
    </div>
  );
}

function IngredientsSection() {
  return (
    <div className="w-full relative h-[60vh] md:h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-gray-900">
      <video
        src="/images/journal.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-[1.25] contrast-[1.1]"
      />
      
      {/* Content Overlay - Staggered Cards Layout */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4">
        {/* Row 1: 3 Cards */}
        <div className="flex gap-4 md:gap-8 mb-4 md:mb-8">
          <div className="w-24 h-32 md:w-48 md:h-64 bg-black/40 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white font-['Montserrat'] font-bold text-xs md:text-lg shadow-2xl transition-transform hover:scale-105 cursor-pointer">Card 1</div>
          <div className="w-24 h-32 md:w-48 md:h-64 bg-black/40 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white font-['Montserrat'] font-bold text-xs md:text-lg shadow-2xl transition-transform hover:scale-105 cursor-pointer">Card 2</div>
          <div className="w-24 h-32 md:w-48 md:h-64 bg-black/40 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white font-['Montserrat'] font-bold text-xs md:text-lg shadow-2xl transition-transform hover:scale-105 cursor-pointer">Card 3</div>
        </div>
        
        {/* Row 2: 2 Cards */}
        <div className="flex gap-4 md:gap-8 mb-4 md:mb-8">
          <div className="w-24 h-32 md:w-48 md:h-64 bg-black/40 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white font-['Montserrat'] font-bold text-xs md:text-lg shadow-2xl transition-transform hover:scale-105 cursor-pointer">Card 4</div>
          <div className="w-24 h-32 md:w-48 md:h-64 bg-black/40 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white font-['Montserrat'] font-bold text-xs md:text-lg shadow-2xl transition-transform hover:scale-105 cursor-pointer">Card 5</div>
        </div>
        
        {/* Row 3: 1 Card */}
        <div className="flex gap-4 md:gap-8">
          <div className="w-24 h-32 md:w-48 md:h-64 bg-black/40 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white font-['Montserrat'] font-bold text-xs md:text-lg shadow-2xl transition-transform hover:scale-105 cursor-pointer">Card 6</div>
        </div>
      </div>
    </div>
  );
}

function FeatureSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
      className="w-full bg-transparent flex flex-col items-center justify-center px-6 md:px-16 pt-6 pb-4 md:pt-10 md:pb-6"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 flex flex-col items-center">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-[1px] bg-gray-300"></div>
          <p className="text-gray-500 font-['Montserrat'] font-extrabold text-[10px] tracking-[0.3em] uppercase">
            Journals
          </p>
          <div className="w-10 h-[1px] bg-gray-300"></div>
        </div>
        <h2 className="text-3xl md:text-5xl font-['Montserrat'] font-extrabold text-black uppercase tracking-[0.08em] mb-6 leading-tight">
          THE ART OF LUXURY
        </h2>
        <p className="text-gray-800 font-['Montserrat'] font-bold text-[13px] md:text-[15px] leading-loose max-w-2xl mx-auto uppercase tracking-wider">
          Discover the meticulous craftsmanship, unparalleled quality, and exceptional services that define the <b>ARION</b> experience. We believe that true luxury lies in the details.
        </p>
      </div>

      {/* Icons */}
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-10 md:gap-20 w-full mb-12 md:mb-16">
        <Feature icon={MessageCircle} text="Concierge" />
        <Feature icon={RefreshCcw} text="Complimentary Returns" />
        <Feature icon={ShieldCheck} text="Authenticity Guaranteed" />
        <Feature icon={Truck} text="Signature Packaging" />
        <Feature icon={Plane} text="Worldwide Delivery" />
      </div>

      {/* Quote */}
      <div className="text-center max-w-3xl mx-auto border-t border-gray-100 pt-12 md:pt-16 px-4">
        <p className="font-['Montserrat'] font-extrabold uppercase text-xl md:text-2xl text-black leading-relaxed tracking-[0.08em] mb-6">
          "A FRAGRANCE IS THE SILENT POETRY OF YOUR SOUL, LEAVING AN UNFORGETTABLE TRAIL OF MEMORIES WHEREVER YOU GO."
        </p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-['Montserrat'] font-extrabold">— THE HOUSE OF ARION</p>
      </div>
    </motion.div>
  );
}

function PerfumeMarquee() {
  const perfumes = [
    { name: "Lavender", color: "#8B5CF6" }, // Purple
    { name: "Rose", color: "#E11D48" },     // Red
    { name: "Jasmine", color: "#D4C7A5" },  // Creamy Gold
    { name: "Dahlia", color: "#EC4899" }    // Pink
  ];
  const set = [...perfumes, ...perfumes, ...perfumes, ...perfumes, ...perfumes];

  return (
    <div className="w-full bg-transparent overflow-hidden relative flex items-center h-[80px] md:h-[100px] z-20">
      <style>{`
        @keyframes marqueeText {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div 
        className="flex w-max group hover:[animation-play-state:paused]"
        style={{ animation: 'marqueeText 80s linear infinite' }}
      >
        {[1, 2].map((half) => (
          <div key={half} className="flex shrink-0 items-center font-['Montserrat'] font-extrabold text-[18px] md:text-[20px] lg:text-[26px] tracking-[0.08em] uppercase text-black">
            {set.map((item, i) => (
              <span key={i} className="flex items-center">
                <span className="ml-[35px] md:ml-[40px]" style={{ color: item.color }}>{item.name}</span>
                <span className="text-[#C9A227] text-[10px] md:text-xs not-italic ml-[35px] md:ml-[40px]">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const collectionData = [
  {
    name: "Jasmine",
    price: "₹999",
    description: "Pure and delicate white floral scent with a calm elegance.",
    family: "Floral",
    image: "/images/bottle 3.jpeg",
    bgGradient: "linear-gradient(135deg, #FDFBF7 0%, #EFE9DB 100%)",
    boxColor: "#FAF7F2",
  },
  {
    name: "Lavender",
    price: "₹1499",
    description: "A deeply relaxing and aromatic herbaceous lavender profile.",
    family: "Aromatic",
    image: "/images/bottle 4.jpeg", 
    bgGradient: "linear-gradient(135deg, #F4F0FF 0%, #D4C9ED 100%)",
    boxColor: "#E2D8F2",
  },
  {
    name: "Red Rose",
    price: "₹1999",
    description: "Rich, velvety romance captured in a deep floral bouquet.",
    family: "Floral Woody",
    image: "/images/bottle 1.jpeg", 
    bgGradient: "linear-gradient(135deg, #9A3652 0%, #5E162A 100%)",
    boxColor: "#6B1A2C",
  },
  {
    name: "Dahlia",
    price: "₹1499",
    description: "Modern, sophisticated soft floral with powdery freshness.",
    family: "Soft Floral",
    image: "/images/bottle 2.jpeg", 
    bgGradient: "linear-gradient(135deg, #F9D2C2 0%, #E0A6B8 100%)",
    boxColor: "#EBBCC9",
  }
];

function ProductSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
      id="our-collection" 
      className="w-full h-full bg-[#FDFBF7] flex flex-col items-center relative py-16 md:py-24 overflow-hidden"
    >
      <div className="text-center mb-12 md:mb-16 flex flex-col items-center w-full px-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-[1px] bg-gray-300"></div>
          <p className="text-gray-500 font-['Montserrat'] font-extrabold text-[10px] md:text-xs tracking-[0.2em] uppercase">
            EXCLUSIVE COLLECTION
          </p>
          <div className="w-10 h-[1px] bg-gray-300"></div>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-['Montserrat'] font-extrabold text-black uppercase tracking-[0.08em] mb-4">
          THE COLLECTION
        </h2>
      </div>

      <div className="w-full overflow-hidden pb-12 relative group">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 20s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
        
        <div className="animate-marquee">
          <div className="flex gap-6 md:gap-10 px-3 md:px-5">
            {collectionData.map((item, idx) => (
              <ProductCard key={idx} item={item} />
            ))}
          </div>
          <div className="flex gap-6 md:gap-10 px-3 md:px-5">
            {collectionData.map((item, idx) => (
              <ProductCard key={`dup-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Featured Image Below Bottle Cards */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16 mt-4 mb-8">
        <div className="w-full rounded-[24px] overflow-hidden shadow-xl border border-gray-100 relative">
          <img src="/images/frag 2.png" alt="ARION Perfumes in Car Interior" className="w-full h-auto max-h-[70vh] object-cover hover:scale-105 transition-transform duration-700" />
        </div>
      </div>

      {/* Additional Collection Images */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16 mb-12 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 aspect-square rounded-[24px] overflow-hidden shadow-xl border border-gray-100 relative bg-white">
          <img src="/images/cc.png" alt="Collection Preview Left" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-1/2 aspect-square rounded-[24px] overflow-hidden shadow-xl border border-gray-100 relative bg-white">
          <img src="/images/bb.png" alt="Collection Preview Right" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>
    </motion.div>
  );
}

function ProductCard({ item }: { item: any }) {
  return (
    <div className="w-[300px] md:w-[340px] shrink-0 flex flex-col items-center group cursor-pointer relative transition-all duration-500 hover:-translate-y-2">
      {/* Visual Presentation Area - Just the Image */}
      <div className="w-full aspect-[4/3] rounded-[24px] relative overflow-hidden flex items-center justify-center mb-6 shadow-sm group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-500 bg-white">
        
        {/* The Landscape Photo */}
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        
        {/* Soft Inner Shadow/Glow overlay to make it look premium */}
        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[24px]"></div>
      </div>
      
      {/* Product Details */}
      <div className="flex flex-col items-center text-center w-full px-2">
        <h3 className="font-['Montserrat'] font-extrabold uppercase text-2xl md:text-3xl text-black tracking-[0.08em] mb-1 transition-colors">{item.name}</h3>
        <div className="text-lg font-['Montserrat'] font-extrabold text-black mb-2 tracking-[0.08em] uppercase">{item.price}</div>
        <p className="font-['Montserrat'] font-bold text-[12px] md:text-[14px] text-gray-700 uppercase tracking-wider mb-4 max-w-[280px] leading-[1.6]">
          {item.description}
        </p>
        
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-[10px] uppercase tracking-widest text-gray-600 font-semibold">{item.family}</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-[10px] uppercase tracking-widest text-gray-600 font-semibold">Long Lasting</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-[10px] uppercase tracking-widest text-gray-600 font-semibold">Premium</span>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon: Icon, text }: { icon: any, text: string }) {
  return (
    <div className="flex flex-col items-center gap-6 text-center max-w-[140px] group cursor-pointer transition-all duration-[400ms] ease-out hover:-translate-y-2">
      <div className="w-24 h-24 rounded-full bg-[#fdfbf7] border border-gray-100 flex items-center justify-center text-gray-700 transition-all duration-[400ms] ease-out shadow-sm group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] group-hover:border-pink-200 group-hover:text-pink-900 group-hover:bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pink-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms]"></div>
        <Icon size={30} strokeWidth={2} className="relative z-10 transition-transform duration-[400ms] group-hover:scale-[1.05]" />
      </div>
      <p className="text-[11px] font-['Montserrat'] font-extrabold text-[#1A1A1A] leading-relaxed uppercase tracking-[0.08em] group-hover:text-black transition-colors duration-[400ms]">{text}</p>
    </div>
  );
}


function FooterSection() {
  return (
    <footer className="w-full bg-black border-t border-gray-900 pt-10 pb-4 px-6 md:px-16 overflow-hidden flex flex-col">
      <div className="max-w-7xl mx-auto flex flex-col items-center w-full">

        {/* Top Area */}
        <div className="text-center max-w-3xl mb-8 fade-up-element">
          <h2 className="text-[40px] md:text-[52px] font-['Montserrat'] font-extrabold text-white uppercase tracking-[0.08em] mb-3 leading-tight">LEAVE YOUR SIGNATURE.</h2>
          <p className="text-gray-300 font-['Montserrat'] font-bold text-[14px] md:text-[16px] uppercase tracking-wider leading-[1.6]">
            Discover timeless fragrances crafted to become a part of your story. Experience elegance that stays long after the moment fades.
          </p>
        </div>

        {/* Newsletter */}
        <div className="w-full max-w-lg mb-10 flex items-center justify-center fade-up-element">
          <div className="relative w-full flex items-center group">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent border-b border-gray-700 py-3 pl-2 pr-2 text-[17px] md:text-[18px] text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors duration-500 font-medium"
            />
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 mb-8 fade-up-element">
          {/* Column 1 */}
          <div className="flex flex-col md:items-start items-center text-center md:text-left">
            <h3 className="font-['Montserrat'] font-extrabold text-[28px] md:text-[32px] tracking-[0.25em] uppercase text-[#D5B77A] mb-3">ARION</h3>
            <p className="text-gray-300 font-['Montserrat'] font-bold text-[12px] md:text-[14px] uppercase tracking-wider leading-[1.6] max-w-[240px]">
              The epitome of modern luxury fragrance, crafted with passion and mystery.
            </p>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col md:items-start items-center text-center md:text-left">
            <h4 className="text-[20px] md:text-[22px] font-['Montserrat'] font-extrabold uppercase text-white mb-4 tracking-[0.08em]">NAVIGATION</h4>
            <ul className="flex flex-col gap-3 text-[12px] md:text-[14px] font-['Montserrat'] font-bold uppercase tracking-wider text-gray-400">
              <li><button onClick={() => window.scrollTo(0, 0)} className="hover:text-white hover:underline underline-offset-4 decoration-gray-500 transition-all duration-300">Collections</button></li>
              <li><button onClick={() => window.scrollTo(0, 0)} className="hover:text-white hover:underline underline-offset-4 decoration-gray-500 transition-all duration-300">Our Story</button></li>
              <li><button onClick={() => window.scrollTo(0, 0)} className="hover:text-white hover:underline underline-offset-4 decoration-gray-500 transition-all duration-300">Journals</button></li>
              <li><button onClick={() => window.scrollTo(0, 0)} className="hover:text-white hover:underline underline-offset-4 decoration-gray-500 transition-all duration-300">Contact</button></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col md:items-start items-center text-center md:text-left">
            <h4 className="text-[20px] md:text-[22px] font-['Montserrat'] font-extrabold uppercase text-white mb-4 tracking-[0.08em]">SUPPORT</h4>
            <ul className="flex flex-col gap-3 text-[12px] md:text-[14px] font-['Montserrat'] font-bold uppercase tracking-wider text-gray-400">
              <li><button className="hover:text-white hover:underline underline-offset-4 decoration-gray-500 transition-all duration-300">Shipping</button></li>
              <li><button className="hover:text-white hover:underline underline-offset-4 decoration-gray-500 transition-all duration-300">Returns</button></li>
              <li><button className="hover:text-white hover:underline underline-offset-4 decoration-gray-500 transition-all duration-300">Privacy Policy</button></li>
              <li><button className="hover:text-white hover:underline underline-offset-4 decoration-gray-500 transition-all duration-300">Terms & Conditions</button></li>
              <li><button className="hover:text-white hover:underline underline-offset-4 decoration-gray-500 transition-all duration-300">FAQ</button></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col md:items-start items-center text-center md:text-left">
            <h4 className="text-[20px] md:text-[22px] font-['Montserrat'] font-extrabold uppercase text-white mb-4 tracking-[0.08em]">CONTACT</h4>
            <ul className="flex flex-col gap-3 text-[12px] md:text-[14px] font-['Montserrat'] font-bold uppercase tracking-wider text-gray-400 mb-4">
              <li><a href="mailto:support@arion.com" className="hover:text-white transition-colors duration-300 flex items-center gap-2"><Mail size={18} strokeWidth={1.5} /> support@<b>arion</b>.com</a></li>
              <li><a href="tel:+910000000000" className="hover:text-white transition-colors duration-300 flex items-center gap-2"><Phone size={18} strokeWidth={1.5} /> +91 XXXXX XXXXX</a></li>
            </ul>
            <div className="flex items-center gap-6 text-gray-400 text-[16px] md:text-[18px]">
              <button className="hover:text-white transition-colors duration-300" aria-label="Instagram"><Instagram size={20} strokeWidth={1.5} /></button>
              <button className="hover:text-white transition-colors duration-300" aria-label="Twitter"><Twitter size={20} strokeWidth={1.5} /></button>
              <button className="hover:text-white transition-colors duration-300" aria-label="Facebook"><Facebook size={20} strokeWidth={1.5} /></button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full pt-4 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 fade-up-element">
          <p className="text-[12px] md:text-[14px] font-['Montserrat'] font-bold uppercase tracking-[0.08em] text-gray-500">
            &copy; 2026 <b>ARION</b>. All Rights Reserved.
          </p>
          <p className="text-[12px] md:text-[14px] font-['Montserrat'] font-bold uppercase tracking-[0.08em] text-gray-500">
            Made with elegance.
          </p>
        </div>

      </div>
    </footer>
  );
}
