import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Phone, Shield, BarChart3, Users, ChevronRight, Star, ChevronLeft, Scale, Banknote, FileCheck } from 'lucide-react';
import { Pricing } from './components/Pricing';
import { ProcessTimeline } from './components/ProcessTimeline';

// Types
interface Testimonial {
  name: string;
  role: string;
  image: string;
  headline: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  { 
    name: "Mollie H. Massey", 
    role: "Business Owner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    headline: "They are miracle workers!",
    text: "After struggling with bad credit due to a past mistake, Florida Credit Firm came to my rescue.", 
    rating: 5 
  },
  { 
    name: "David Kelley", 
    role: "Real Estate Investor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    headline: "Superior customer service.",
    text: "Great service for an affordable price. The team was responsive and transparent throughout the entire process.", 
    rating: 5 
  },
  { 
    name: "Jonathan Marshall", 
    role: "Miami, FL",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    headline: "Just great results.",
    text: "Awesome experience. I didn't think it was possible to remove the bankruptcy from my record, but they did it.", 
    rating: 5 
  },
  { 
    name: "Sarah Jenkins", 
    role: "Medical Professional",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    headline: "Professional and discreet.",
    text: "They handled my complex situation with ease and restored my good name. I can finally refinance my practice.", 
    rating: 5 
  },
  { 
    name: "Michael Ross", 
    role: "Entrepreneur",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    headline: "+120 points in 4 months.",
    text: "My credit score jumped significantly. Highly recommend this team for rapid results if you are looking to secure funding.", 
    rating: 5 
  },
  { 
    name: "Elena Rodriguez", 
    role: "Homebuyer",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    headline: "Bought my dream home!",
    text: "Finally able to buy my dream home thanks to their diligent work on my credit report. The mortgage approval was smooth.", 
    rating: 5 
  },
];

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsVisible, setItemsVisible] = useState(3);
  const [isNavVisible, setIsNavVisible] = useState(true);
  
  const lastScrollY = useRef(0);

  // Logos array to be duplicated for marquee
  const logos = [
    "Bloomberg",
    "YAHOO! FINANCE",
    "DIGITAL JOURNAL",
    "TechBullion",
    "MarketWatch",
    "Business Insider"
  ];

  // Scroll direction logic for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show at the very top (buffer of 10px)
      if (currentScrollY < 10) {
        setIsNavVisible(true);
      } else {
        // User requested: Visible when scrolling DOWN, Disappearing when scrolling UP
        if (currentScrollY > lastScrollY.current) {
          // Scrolling DOWN
          setIsNavVisible(true);
        } else if (currentScrollY < lastScrollY.current) {
          // Scrolling UP
          setIsNavVisible(false);
        }
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Responsive carousel logic
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsVisible(1);
      } else {
        setItemsVisible(3);
      }
    };
    
    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    const maxIndex = testimonials.length - itemsVisible;
    setCurrentSlide(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    const maxIndex = testimonials.length - itemsVisible;
    setCurrentSlide(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // 90px offset to account for the fixed header
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-navy-950 font-sans selection:bg-gold-500 selection:text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 bg-navy-950/90 backdrop-blur-md border-b border-white/10 transition-transform duration-300 ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-gold-500 rounded-sm flex items-center justify-center">
                <Shield className="text-navy-950 w-5 h-5" />
             </div>
             <span className="text-white font-serif font-bold text-xl tracking-wide">FLORIDA CREDIT FIRM</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="text-sm text-slate-300 hover:text-gold-400 transition-colors uppercase tracking-widest font-medium">Home</a>
            <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="text-sm text-slate-300 hover:text-gold-400 transition-colors uppercase tracking-widest font-medium">Services</a>
            <a href="#programs" onClick={(e) => scrollToSection(e, 'programs')} className="text-sm text-slate-300 hover:text-gold-400 transition-colors uppercase tracking-widest font-medium">Pricing</a>
            <a href="#reviews" onClick={(e) => scrollToSection(e, 'reviews')} className="text-sm text-slate-300 hover:text-gold-400 transition-colors uppercase tracking-widest font-medium">Reviews</a>
            <button className="bg-gold-500 hover:bg-gold-600 text-navy-950 px-6 py-2 rounded font-bold transition-colors">
              Start Today
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-navy-900 border-b border-white/10 p-4 absolute w-full">
            <div className="flex flex-col gap-4">
              <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="text-slate-300 hover:text-gold-400">Home</a>
              <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="text-slate-300 hover:text-gold-400">Services</a>
              <a href="#programs" onClick={(e) => scrollToSection(e, 'programs')} className="text-slate-300 hover:text-gold-400">Pricing</a>
              <a href="#reviews" onClick={(e) => scrollToSection(e, 'reviews')} className="text-slate-300 hover:text-gold-400">Reviews</a>
              <button className="bg-gold-500 text-navy-950 px-4 py-2 rounded font-bold w-full">Start Today</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 relative overflow-hidden">
        {/* Background Radial */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-gold-400 font-bold tracking-[0.2em] text-sm uppercase mb-6">Florida Credit Firm</h1>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            EXPERT CREDIT & <br/> CONSUMER LAW SOLUTIONS
          </h2>
          
          <div className="w-40 h-40 mx-auto rounded-full border-4 border-slate-700 overflow-hidden mb-8 shadow-2xl relative group">
             <img 
               src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80" 
               alt="Expert Director" 
               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
             />
             <div className="absolute inset-0 bg-navy-950/20 group-hover:bg-transparent transition-colors"></div>
          </div>

          <p className="text-slate-400 max-w-xl mx-auto mb-10 text-lg">
             Stop letting bad credit control your life. We leverage consumer laws to remove inaccuracies and restore your financial freedom.
          </p>

          <button onClick={(e) => scrollToSection(e as any, 'programs')} className="bg-gold-500 hover:bg-gold-600 text-navy-950 text-lg px-8 py-3 rounded-full font-bold transition-all hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]">
            Take Control - Start Today
          </button>
          
          {/* Logo Marquee */}
          <div className="mt-16 pt-12 border-t border-white/5 w-full max-w-6xl mx-auto overflow-hidden mask-edges">
            <div className="flex items-center gap-16 animate-scroll w-max opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
               {/* Set 1 */}
               {logos.map((logo, i) => (
                  <span key={`1-${i}`} className="text-slate-500 font-serif font-bold text-xl md:text-2xl whitespace-nowrap">{logo}</span>
               ))}
               
               {/* Set 2 (Duplicate for seamless loop) */}
               {logos.map((logo, i) => (
                  <span key={`2-${i}`} className="text-slate-500 font-serif font-bold text-xl md:text-2xl whitespace-nowrap">{logo}</span>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-navy-900 py-12 border-y border-white/5">
        <div className="container mx-auto px-4">
           <div className="text-center mb-8">
              <h3 className="text-white text-xl font-serif">Trusted By Thousands For Credit Repair Excellence</h3>
              <div className="h-1 w-20 bg-gold-500 mx-auto mt-4 rounded-full"></div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-navy-950 p-8 rounded-lg border border-slate-800 text-center relative group hover:border-gold-500/50 transition-colors">
                 <div className="text-4xl font-bold text-white mb-2">7800<span className="text-gold-500">+</span></div>
                 <div className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">Satisfied Clients</div>
                 <p className="text-xs text-slate-500">Since 2015, helping clients take control of their financial future.</p>
              </div>
              <div className="bg-navy-950 p-8 rounded-lg border border-slate-800 text-center relative group hover:border-gold-500/50 transition-colors">
                 <div className="text-4xl font-bold text-white mb-2">25000<span className="text-gold-500">+</span></div>
                 <div className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">Items Removed</div>
                 <p className="text-xs text-slate-500">Successfully disputed items across all credit bureaus.</p>
              </div>
              <div className="bg-navy-950 p-8 rounded-lg border border-slate-800 text-center relative group hover:border-gold-500/50 transition-colors">
                 <div className="text-4xl font-bold text-white mb-2">50<span className="text-gold-500">+</span></div>
                 <div className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">States Served</div>
                 <p className="text-xs text-slate-500">Proudly serving clients locally and nationwide.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-20 bg-navy-950">
        <div className="container mx-auto px-4">
           <div className="text-center mb-12">
              <h3 className="text-3xl text-white font-serif mb-2">What Our Clients Say</h3>
              <div className="flex justify-center gap-1 mb-8">
                 {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-gold-500 fill-gold-500" />)}
              </div>
           </div>

           <div className="relative max-w-7xl mx-auto">
             {/* Carousel Container */}
             <div className="overflow-hidden">
               <div 
                 className="flex transition-transform duration-500 ease-out"
                 style={{ 
                   transform: `translateX(-${currentSlide * (100 / itemsVisible)}%)`,
                   marginLeft: '-12px', 
                   marginRight: '-12px' 
                 }}
               >
                 {testimonials.map((t, idx) => (
                   <motion.div 
                    key={idx} 
                    className="flex-shrink-0 px-3 w-full md:w-1/3 h-full"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.5, 
                      delay: Math.min(idx * 0.1, 0.3), // Cap delay so later items don't take forever if navigated to
                      type: "spring",
                      stiffness: 100
                    }}
                   >
                     <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 relative h-full flex flex-col hover:border-gold-500/30 transition-colors group overflow-hidden">
                        {/* Elegant Watermark Quote */}
                        <div className="absolute top-4 right-6 text-8xl font-serif text-slate-800/50 leading-none select-none pointer-events-none group-hover:text-gold-500/10 transition-colors duration-500">
                           &rdquo;
                        </div>

                        <div className="relative z-10 flex items-center gap-4 mb-6">
                           <div className="relative">
                             <img 
                               src={t.image} 
                               alt={t.name}
                               className="w-14 h-14 rounded-full object-cover border-2 border-slate-700 group-hover:border-gold-500 transition-colors duration-300"
                             />
                           </div>
                           <div>
                              <h4 className="text-white font-bold text-lg leading-tight">{t.name}</h4>
                              <p className="text-slate-500 text-xs uppercase tracking-wide font-medium">{t.role}</p>
                              <div className="flex gap-0.5 mt-1">
                                 {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-3 h-3 text-gold-500 fill-gold-500" />)}
                              </div>
                           </div>
                        </div>

                        <h5 className="relative z-10 text-lg font-serif font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                           {t.headline}
                        </h5>

                        <p className="relative z-10 text-slate-400 italic text-sm leading-relaxed flex-grow">"{t.text}"</p>
                     </div>
                   </motion.div>
                 ))}
               </div>
             </div>

             {/* Navigation Buttons */}
             <button 
               onClick={prevSlide}
               className="absolute top-1/2 -left-4 md:-left-16 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-navy-900/90 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-navy-950 rounded-full flex items-center justify-center transition-all duration-300 z-20 shadow-lg shadow-black/50 hover:shadow-gold-500/50 hover:scale-110"
               aria-label="Previous testimonial"
             >
               <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
             </button>
             <button 
               onClick={nextSlide}
               className="absolute top-1/2 -right-4 md:-right-16 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-navy-900/90 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-navy-950 rounded-full flex items-center justify-center transition-all duration-300 z-20 shadow-lg shadow-black/50 hover:shadow-gold-500/50 hover:scale-110"
               aria-label="Next testimonial"
             >
               <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
             </button>
             
             {/* Dots */}
             <div className="flex justify-center gap-2 mt-8">
               {Array.from({ length: testimonials.length - itemsVisible + 1 }).map((_, idx) => (
                 <button
                   key={idx}
                   onClick={() => setCurrentSlide(idx)}
                   className={`w-2 h-2 rounded-full transition-all ${
                     currentSlide === idx ? 'bg-gold-500 w-6' : 'bg-slate-700 hover:bg-slate-600'
                   }`}
                   aria-label={`Go to slide ${idx + 1}`}
                 />
               ))}
             </div>
           </div>
        </div>
      </section>

      {/* Services Section - Animated Grid */}
      <section id="services" className="py-24 bg-white relative overflow-hidden">
         {/* Background subtle pattern */}
         <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#eab308_1px,transparent_1px)] [background-size:16px_16px]"></div>
         
         <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
               <span className="text-gold-500 font-bold tracking-widest text-sm uppercase mb-3 block">Our Expertise</span>
               <h2 className="text-3xl md:text-5xl font-serif font-bold text-navy-950 mb-6">Legal-First Credit Solutions</h2>
               <p className="text-slate-600 text-lg">
                 We go beyond basic disputes. Our team leverages advanced consumer protection laws to challenge inaccuracies, negotiate debts, and restore your financial power.
               </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 {
                   title: "Precision Disputes",
                   desc: "We identify and challenge every unverifiable item using FCRA & FDCPA statutes, ensuring only accurate data remains.",
                   icon: FileCheck
                 },
                 {
                   title: "Debt Negotiation",
                   desc: "Our team negotiates directly with creditors and collection agencies to reduce outstanding balances and settle accounts for less.",
                   icon: Banknote
                 },
                 {
                   title: "Legal Escalation",
                   desc: "When bureaus refuse to comply, we leverage attorney-backed strategies to enforce your rights and compel deletion.",
                   icon: Scale
                 }
               ].map((service, idx) => (
                 <motion.div 
                   key={idx}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.2 }}
                   className="bg-slate-50 hover:bg-white p-8 rounded-2xl border border-slate-100 hover:border-gold-500/30 hover:shadow-xl transition-all group"
                 >
                   <motion.div 
                     initial={{ scale: 1 }}
                     whileInView={{ scale: [1, 1.2, 1] }}
                     transition={{ duration: 0.6, delay: idx * 0.2, type: "spring", bounce: 0.5 }}
                     className="w-14 h-14 bg-navy-950 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gold-500 transition-colors shadow-lg"
                   >
                     <service.icon className="w-7 h-7 text-gold-500 group-hover:text-navy-950 transition-colors" />
                   </motion.div>
                   <h3 className="text-xl font-serif font-bold text-navy-950 mb-3">{service.title}</h3>
                   <p className="text-slate-600 leading-relaxed">{service.desc}</p>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* New Process Timeline */}
      <ProcessTimeline />

      {/* Executive Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
              <span className="bg-gold-500 text-navy-950 px-8 py-2 font-bold text-lg uppercase inline-block shadow-lg">Our Executive Team</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Anniel Manso", role: "Chief Director", color: "bg-navy-950" },
              { name: "Sandy Martin", role: "Client Relations", color: "bg-yellow-600" },
              { name: "Dashell Quintana", role: "Financial Officer", color: "bg-blue-900" },
              { name: "Denys Orriaga", role: "Lead Operations", color: "bg-green-700" }
            ].map((member, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] p-6 text-center group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-32 h-32 mx-auto rounded-full p-1 border-2 border-gold-500 mb-6">
                   <img src={`https://picsum.photos/200/200?random=${idx}`} alt={member.name} className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <h4 className="font-serif font-bold text-navy-900 text-lg">{member.name}</h4>
                <p className="text-slate-500 text-sm mb-6">{member.role}</p>
                <div className={`h-12 w-full ${member.color} rounded-lg flex items-center justify-center text-white text-xs font-bold uppercase tracking-wider`}>
                   Connect
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <div id="programs">
         <Pricing />
      </div>

      {/* Footer */}
      <footer className="bg-navy-950 border-t border-slate-900 py-12 text-slate-400 text-sm">
         <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
               <div className="text-white font-serif font-bold text-xl mb-4">FLORIDA CREDIT FIRM</div>
               <p>Empowering financial freedom through expert credit repair strategies and consumer law protection.</p>
            </div>
            <div>
               <h5 className="text-white font-bold mb-4">Quick Links</h5>
               <ul className="space-y-2">
                  <li><a href="#" className="hover:text-gold-500">About Us</a></li>
                  <li><a href="#" className="hover:text-gold-500">Services</a></li>
                  <li><a href="#" className="hover:text-gold-500">Pricing</a></li>
                  <li><a href="#" className="hover:text-gold-500">Client Portal</a></li>
               </ul>
            </div>
            <div>
               <h5 className="text-white font-bold mb-4">Legal</h5>
               <ul className="space-y-2">
                  <li><a href="#" className="hover:text-gold-500">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-gold-500">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-gold-500">Disclaimer</a></li>
               </ul>
            </div>
            <div>
               <h5 className="text-white font-bold mb-4">Contact</h5>
               <p className="flex items-center gap-2 mb-2"><Phone className="w-4 h-4 text-gold-500" /> (800) 123-4567</p>
               <p>Miami, FL 33130</p>
            </div>
         </div>
         <div className="container mx-auto px-4 text-center pt-8 border-t border-slate-900">
            &copy; {new Date().getFullYear()} Florida Credit Firm. All rights reserved.
         </div>
      </footer>
    </div>
  );
};

export default App;