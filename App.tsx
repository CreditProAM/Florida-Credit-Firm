import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Shield, BarChart3, Users, ChevronRight, Star, ChevronLeft, Scale, Banknote, FileCheck, Plus, Minus, ArrowRight, Lock, ArrowLeft } from 'lucide-react';
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

const faqs = [
  {
    question: "How long does the credit repair process take?",
    answer: "While every case is unique, most clients see their first results within 30-45 days. A complete restoration typically takes 4-6 months depending on the complexity of your profile and the number of negative items."
  },
  {
    question: "Is credit repair legal?",
    answer: "Absolutely. We operate strictly under the Fair Credit Reporting Act (FCRA) and the Fair Debt Collection Practices Act (FDCPA). It is your legal right to dispute any item on your credit report that is inaccurate, unverifiable, or incomplete."
  },
  {
    question: "Will the negative items come back?",
    answer: "If an item is successfully removed because it was inaccurate or unverifiable, it is rare for it to reappear. If a creditor does re-report an item, they must follow strict notification procedures. If they fail to do so, we will challenge it again immediately."
  },
  {
    question: "Do I have to sign a long-term contract?",
    answer: "No. Our services are month-to-month. We believe our results should keep you as a client, not a binding contract. You can cancel at any time with no penalty."
  }
];

// Animated Counter Component
const Counter: React.FC<{ from: number; to: number; duration?: number }> = ({ from, to, duration = 2 }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });
  
  const springValue = useSpring(from, {
    duration: duration * 1000,
    bounce: 0,
  });
  
  const displayValue = useTransform(springValue, (current) => Math.round(current));

  useEffect(() => {
    if (inView) {
      springValue.set(to);
    }
  }, [inView, to, springValue]);

  return <motion.span ref={nodeRef}>{displayValue}</motion.span>;
};

// FAQ Item Component
const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-b border-slate-800 last:border-0"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className={`text-lg md:text-xl font-serif font-medium tracking-tight transition-colors ${isOpen ? 'text-gold-500' : 'text-slate-200 group-hover:text-gold-400'}`}>
          {question}
        </span>
        <div className={`w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-gold-500 border-gold-500 rotate-180' : 'bg-transparent group-hover:border-gold-500'}`}>
          {isOpen ? <Minus className="w-4 h-4 text-navy-950" /> : <Plus className="w-4 h-4 text-slate-400 group-hover:text-gold-500" />}
        </div>
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-slate-400 font-sans font-light leading-relaxed pr-8">
          {answer}
        </p>
      </motion.div>
    </motion.div>
  );
};

// Privacy Policy Component (TCR Compliant)
const PrivacyPolicyOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-[60] bg-white overflow-y-auto"
    >
      <div className="min-h-screen pb-20">
        {/* Header */}
        <div className="sticky top-0 bg-navy-950 text-white p-4 flex items-center justify-between shadow-xl z-10">
          <button 
            onClick={onClose} 
            className="flex items-center gap-2 hover:text-gold-500 transition-colors font-sans font-bold uppercase tracking-wide text-xs md:text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Site
          </button>
          <div className="font-serif font-bold text-lg hidden md:block tracking-tight">Privacy Policy</div>
          <Lock className="w-5 h-5 text-gold-500" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 max-w-4xl py-12 text-slate-800">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy-950 mb-8 tracking-tight">Privacy Policy</h1>
          <p className="text-sm font-sans text-slate-500 mb-8 font-medium">Last Updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-8 leading-relaxed font-sans font-light text-slate-600">
            <section>
              <h2 className="text-xl font-serif font-bold text-navy-950 mb-3 tracking-tight">1. Introduction</h2>
              <p>
                Florida Credit Firm ("we," "our," or "us") respects your privacy and is committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit our website or utilize our credit education and restoration services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-navy-950 mb-3 tracking-tight">2. Nature of Services</h2>
              <p>
                Florida Credit Firm provides credit education, document processing, and consumer law advocacy services. We are not a lender, and our services are designed to help you ensure your credit report is accurate and verifiable under federal law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-navy-950 mb-3 tracking-tight">3. Information We Collect</h2>
              <p className="mb-2">We collect several types of information from and about users of our website, including:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Personal Identifiers:</strong> Name, postal address, email address, telephone number, and social security number (for credit retrieval purposes only).</li>
                <li><strong>Financial Information:</strong> Credit report details, billing address, and payment method information.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, and operating system when you access our site.</li>
              </ul>
            </section>

            <section className="bg-slate-50 p-6 rounded-xl border-l-4 border-gold-500">
              <h2 className="text-xl font-serif font-bold text-navy-950 mb-3 tracking-tight">4. SMS/Mobile Privacy (TCR Compliance)</h2>
              <p className="text-slate-700 font-medium mb-4">
                We value your privacy regarding your mobile information.
              </p>
              <p className="mb-4">
                <strong>No Mobile Information Sharing:</strong> No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.
              </p>
              <p>
                <strong>Opt-Out Rights:</strong> You may opt-out of receiving SMS text messages from us at any time by replying "STOP" to any message you receive. Upon receipt of your "STOP" message, we will send one final message to confirm you have been unsubscribed.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-navy-950 mb-3 tracking-tight">5. How We Use Your Information</h2>
              <p className="mb-2">We use information that we collect about you or that you provide to us:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>To present our website and its contents to you.</li>
                <li>To provide you with information, products, or services that you request from us.</li>
                <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection.</li>
                <li>To notify you about changes to our website or any products or services we offer or provide though it.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-navy-950 mb-3 tracking-tight">6. Data Security</h2>
              <p>
                We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All payment transactions and sensitive personal data are encrypted using SSL technology.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-navy-950 mb-3 tracking-tight">7. Contact Information</h2>
              <p>
                To ask questions or comment about this privacy policy and our privacy practices, contact us at:<br/>
                Florida Credit Firm<br/>
                (305) 831-1792<br/>
                support@floridacreditfirm.com
              </p>
            </section>
          </div>
          
          <button 
            onClick={onClose}
            className="mt-12 bg-navy-950 text-white px-8 py-3 rounded font-sans font-bold tracking-wide hover:bg-gold-500 hover:text-navy-950 transition-colors"
          >
            Close Privacy Policy
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Disclaimer Overlay Component
const DisclaimerOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-[60] bg-white overflow-y-auto"
    >
      <div className="min-h-screen pb-20">
        {/* Header */}
        <div className="sticky top-0 bg-navy-950 text-white p-4 flex items-center justify-between shadow-xl z-10">
          <button
            onClick={onClose}
            className="flex items-center gap-2 hover:text-gold-500 transition-colors font-sans font-bold uppercase tracking-wide text-xs md:text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Site
          </button>
          <div className="font-serif font-bold text-lg hidden md:block tracking-tight">Legal Disclaimer</div>
          <Lock className="w-5 h-5 text-gold-500" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 max-w-4xl py-12 text-slate-800">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy-950 mb-8 tracking-tight">Disclaimer</h1>
          <p className="text-sm font-sans text-slate-500 mb-8 font-medium">Last Updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-8 leading-relaxed font-sans font-light text-slate-600">
            <section>
              <h2 className="text-xl font-serif font-bold text-navy-950 mb-3 tracking-tight">1. Not Legal Advice</h2>
              <p>
                The information provided on this website does not, and is not intended to, constitute legal advice; instead, all information, content, and materials available on this site are for general informational purposes only. Information on this website may not constitute the most up-to-date legal or other information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-navy-950 mb-3 tracking-tight">2. Credit Repair Services</h2>
              <p>
                Florida Credit Firm is a credit restoration organization. We assist clients in challenging inaccurate, unverifiable, and incomplete items on their credit reports. We do not guarantee any specific outcome or score increase. Credit scores are calculated by third parties based on a variety of factors, and we cannot predict or promise a specific result.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-navy-950 mb-3 tracking-tight">3. Testimonials and Results</h2>
              <p>
                Testimonials and reviews appearing on this site are received via text, audio, or video submission. They are individual experiences, reflecting real life experiences of those who have used our products and/or services in some way or another. However, they are individual results and results do vary. We do not claim that they are typical results that consumers will generally achieve.
              </p>
            </section>
            
             <section>
              <h2 className="text-xl font-serif font-bold text-navy-950 mb-3 tracking-tight">4. No Guarantees</h2>
              <p>
                You acknowledge that Florida Credit Firm has not made any guarantees, promises, representations, or warranties regarding the outcome of our services. The time required to achieve results varies by case and depends on the responsiveness of credit bureaus and creditors.
              </p>
            </section>
          </div>

          <button
            onClick={onClose}
            className="mt-12 bg-navy-950 text-white px-8 py-3 rounded font-sans font-bold tracking-wide hover:bg-gold-500 hover:text-navy-950 transition-colors"
          >
            Close Disclaimer
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsVisible, setItemsVisible] = useState(3);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  
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
      
      // Update scrolled state for background animation
      setIsScrolled(currentScrollY > 50);

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

  // Updated to support generic HTMLElements (buttons and anchors)
  const scrollToSection = (e: React.MouseEvent<HTMLElement>, id: string) => {
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
    <div className="min-h-screen bg-navy-950 font-sans selection:bg-gold-500 selection:text-white relative">
      <AnimatePresence>
        {isPrivacyOpen && <PrivacyPolicyOverlay onClose={() => setIsPrivacyOpen(false)} />}
        {isDisclaimerOpen && <DisclaimerOverlay onClose={() => setIsDisclaimerOpen(false)} />}
      </AnimatePresence>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isNavVisible ? 'translate-y-0' : '-translate-y-full'} ${isScrolled ? 'bg-navy-950/90 backdrop-blur-md border-b border-white/5 py-0' : 'bg-transparent border-b border-transparent py-2'}`}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-gold-500 rounded-sm flex items-center justify-center shadow-lg shadow-gold-500/20">
                <Shield className="text-navy-950 w-5 h-5" />
             </div>
             <span className="text-slate-100 font-serif font-bold text-xl tracking-tight">FLORIDA CREDIT FIRM</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="text-xs text-slate-300 hover:text-gold-400 transition-colors uppercase tracking-[0.2em] font-sans font-semibold">Home</a>
            <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="text-xs text-slate-300 hover:text-gold-400 transition-colors uppercase tracking-[0.2em] font-sans font-semibold">Services</a>
            <a href="#programs" onClick={(e) => scrollToSection(e, 'programs')} className="text-xs text-slate-300 hover:text-gold-400 transition-colors uppercase tracking-[0.2em] font-sans font-semibold">Pricing</a>
            <a href="#reviews" onClick={(e) => scrollToSection(e, 'reviews')} className="text-xs text-slate-300 hover:text-gold-400 transition-colors uppercase tracking-[0.2em] font-sans font-semibold">Reviews</a>
            <button 
              onClick={(e) => scrollToSection(e, 'programs')}
              className="bg-gold-500 hover:bg-gold-400 text-navy-950 px-6 py-2 rounded font-sans font-bold tracking-wide transition-all duration-300 shadow-[0_0_15px_rgba(197,160,101,0.2)] hover:shadow-[0_0_30px_rgba(197,160,101,0.6)] hover:scale-105 hover:-translate-y-0.5 text-xs uppercase"
            >
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
              <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="text-slate-300 hover:text-gold-400 font-sans uppercase tracking-widest text-sm">Home</a>
              <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="text-slate-300 hover:text-gold-400 font-sans uppercase tracking-widest text-sm">Services</a>
              <a href="#programs" onClick={(e) => scrollToSection(e, 'programs')} className="text-slate-300 hover:text-gold-400 font-sans uppercase tracking-widest text-sm">Pricing</a>
              <a href="#reviews" onClick={(e) => scrollToSection(e, 'reviews')} className="text-slate-300 hover:text-gold-400 font-sans uppercase tracking-widest text-sm">Reviews</a>
              <button 
                onClick={(e) => scrollToSection(e, 'programs')}
                className="bg-gold-500 text-navy-950 px-4 py-2 rounded font-sans font-bold tracking-wide w-full"
              >
                Start Today
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-24 relative overflow-hidden bg-navy-950">
        {/* Enhanced Background Pattern: Larger, fainter grid */}
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#C5A065_1px,transparent_1px),linear-gradient(to_bottom,#C5A065_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        
        {/* Spotlight Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-navy-800/50 via-navy-950/80 to-navy-950 pointer-events-none"></div>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-navy-800/50 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/30 bg-navy-900/80 backdrop-blur-sm mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse"></div>
            <span className="text-gold-400 font-sans font-semibold tracking-[0.2em] text-xs uppercase">
              Florida Credit Firm
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-[1.05] tracking-tight drop-shadow-2xl"
          >
            Expert Credit & <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-400">
              Consumer Law
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-200 to-gold-500 italic pr-2">
               Solutions
            </span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full border-2 border-gold-500/50 p-1 mb-8 shadow-[0_0_40px_-10px_rgba(197,160,101,0.3)] relative group cursor-pointer"
          >
             <div className="w-full h-full rounded-full overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400" 
                  alt="Senior Credit Specialist" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
             </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-slate-300 max-w-2xl mx-auto mb-10 text-lg md:text-xl font-sans font-light leading-relaxed tracking-wide"
          >
             Stop letting bad credit control your life. We leverage <span className="text-white border-b border-gold-500/40 pb-0.5 transition-colors hover:border-gold-500 font-normal">federal consumer laws</span> to remove inaccuracies and restore your financial freedom.
          </motion.p>

          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => scrollToSection(e, 'programs')} 
            className="bg-gold-500 hover:bg-gold-400 text-navy-950 text-lg px-8 py-3 rounded-full font-sans font-bold tracking-wide transition-all hover:shadow-[0_0_25px_rgba(197,160,101,0.4)]"
          >
            Take Control - Start Today
          </motion.button>
          
          {/* Logo Marquee */}
          <div className="mt-16 pt-12 border-t border-white/5 w-full max-w-6xl mx-auto overflow-hidden mask-edges">
            <div className="flex items-center gap-16 animate-scroll w-max opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
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

      {/* Trust Banner with Animated Counters */}
      <section className="bg-navy-900 py-12 border-y border-white/5 relative overflow-hidden">
        {/* Subtle Radial Highlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-navy-800/50 to-transparent opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
           <div className="text-center mb-8">
              <h3 className="text-slate-200 text-xl font-serif tracking-tight">Trusted By Thousands For Credit Repair Excellence</h3>
              <div className="h-0.5 w-16 bg-gold-500/50 mx-auto mt-4 rounded-full"></div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { end: 7800, label: "Satisfied Clients", sub: "Since 2015, helping clients take control of their financial future." },
                { end: 25000, label: "Items Removed", sub: "Successfully disputed items across all credit bureaus." },
                { end: 50, label: "States Served", sub: "Proudly serving clients locally and nationwide." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="bg-navy-950 p-8 rounded-lg border border-slate-800 text-center relative group hover:border-gold-500/30 transition-colors shadow-lg"
                >
                   <div className="text-4xl font-serif font-bold text-white mb-2">
                      <Counter from={0} to={item.end} />
                      <span className="text-gold-500">+</span>
                   </div>
                   <div className="text-sm font-sans font-bold text-slate-400 uppercase tracking-widest mb-2">{item.label}</div>
                   <p className="text-xs font-sans font-light text-slate-500">{item.sub}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-20 bg-gradient-to-b from-navy-950 to-navy-900 relative overflow-hidden">
        {/* Subtle grid for texture */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        <div className="container mx-auto px-4 relative z-10">
           <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl text-white font-serif font-bold tracking-tight mb-2">What Our Clients Say</h3>
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
                      delay: Math.min(idx * 0.1, 0.3), 
                      type: "spring",
                      stiffness: 100
                    }}
                   >
                     <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-800 relative h-full flex flex-col hover:border-gold-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-gold-500/10 group overflow-hidden">
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
                              <h4 className="text-white font-serif font-bold text-xl leading-tight tracking-wide">{t.name}</h4>
                              <p className="text-slate-500 text-xs font-sans uppercase tracking-widest font-medium">{t.role}</p>
                              <div className="flex gap-0.5 mt-1">
                                 {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-3 h-3 text-gold-500 fill-gold-500" />)}
                              </div>
                           </div>
                        </div>

                        <h5 className="relative z-10 text-lg font-serif font-bold text-white mb-3 group-hover:text-gold-400 transition-colors tracking-tight">
                           {t.headline}
                        </h5>

                        <p className="relative z-10 text-slate-400 font-sans italic font-light text-sm leading-relaxed flex-grow">"{t.text}"</p>
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
         <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C5A065_1px,transparent_1px)] [background-size:16px_16px]"></div>
         
         <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
               <span className="text-gold-600 font-sans font-bold tracking-widest text-sm uppercase mb-3 block">Our Expertise</span>
               <h2 className="text-3xl md:text-5xl font-serif font-bold text-navy-950 mb-6 tracking-tight">Legal-First Credit Solutions</h2>
               <p className="text-slate-600 text-lg font-sans font-light leading-relaxed">
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
                   whileHover={{ y: -5 }}
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
                   <h3 className="text-xl font-serif font-bold text-navy-950 mb-3 tracking-tight">{service.title}</h3>
                   <p className="text-slate-600 font-sans font-light leading-relaxed">{service.desc}</p>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* New Process Timeline */}
      <ProcessTimeline />
      
      {/* FAQ Section */}
      <section className="py-24 bg-navy-900 border-t border-slate-800">
        <div className="container mx-auto px-4 max-w-4xl">
           <div className="text-center mb-16">
              <span className="text-gold-500 font-sans font-bold tracking-widest text-sm uppercase mb-3 block">Common Questions</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 tracking-tight">Expert Answers</h2>
              <p className="text-slate-400 font-sans font-light text-lg">Everything you need to know about the restoration process.</p>
           </div>
           
           <div className="space-y-2">
             {faqs.map((faq, index) => (
               <FAQItem key={index} question={faq.question} answer={faq.answer} />
             ))}
           </div>
        </div>
      </section>

      {/* Executive Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
              <span className="bg-gold-500 text-navy-950 px-8 py-2 font-serif font-bold text-lg uppercase inline-block shadow-lg tracking-wide">Our Executive Team</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Anniel Manso", role: "Chief Director", color: "bg-navy-950" },
              { name: "Sandy Martin", role: "Client Relations", color: "bg-gold-600" },
              { name: "Dashell Quintana", role: "Financial Officer", color: "bg-navy-800" },
              { name: "Denys Orriaga", role: "Lead Operations", color: "bg-slate-700" }
            ].map((member, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] p-6 text-center group transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="w-32 h-32 mx-auto rounded-full p-1 border-2 border-gold-500 mb-6">
                   <img src={`https://picsum.photos/200/200?random=${idx}`} alt={member.name} className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <h4 className="font-serif font-bold text-navy-900 text-lg tracking-tight">{member.name}</h4>
                <p className="text-gold-500 font-sans font-medium text-xs uppercase tracking-widest mb-6">{member.role}</p>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className={`h-12 w-full ${member.color} rounded-lg flex items-center justify-center text-white text-xs font-sans font-bold uppercase tracking-wider cursor-pointer`}
                >
                   Connect
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <div id="programs">
         <Pricing />
      </div>

      {/* Final CTA Section */}
      <section className="py-24 relative overflow-hidden bg-navy-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy-800 via-navy-950 to-navy-950"></div>
        {/* Animated glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gold-500/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 tracking-tight"
          >
            Ready to Reclaim Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">Financial Future?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-sans font-light leading-relaxed"
          >
            Don't let another day pass with a score that doesn't reflect your potential. Join thousands of satisfied clients who have restored their credit with Florida Credit Firm.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => scrollToSection(e, 'programs')} 
              className="group bg-gold-500 hover:bg-gold-400 text-navy-950 text-lg px-10 py-4 rounded-full font-sans font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(197,160,101,0.3)] hover:shadow-[0_0_30px_rgba(197,160,101,0.5)] flex items-center gap-2"
            >
              Start Your Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-full font-sans font-bold tracking-wide text-white border border-slate-700 hover:bg-slate-800 transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> (305) 831-1792
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-950 border-t border-slate-900 py-12 text-slate-400 text-sm font-sans font-light">
         <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.0 }}>
               <div className="text-white font-serif font-bold text-xl mb-4 tracking-tight">FLORIDA CREDIT FIRM</div>
               <p className="font-light leading-relaxed">Empowering financial freedom through expert credit repair strategies and consumer law protection.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
               <h5 className="text-white font-serif font-bold text-lg mb-4 tracking-wide">Quick Links</h5>
               <ul className="space-y-2">
                  <li><a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="hover:text-gold-500 transition-colors">About Us</a></li>
                  <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-gold-500 transition-colors">Services</a></li>
                  <li><a href="#programs" onClick={(e) => scrollToSection(e, 'programs')} className="hover:text-gold-500 transition-colors">Pricing</a></li>
               </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
               <h5 className="text-white font-serif font-bold text-lg mb-4 tracking-wide">Legal</h5>
               <ul className="space-y-2">
                  <li><button onClick={() => setIsPrivacyOpen(true)} className="hover:text-gold-500 text-left transition-colors">Privacy Policy</button></li>
                  <li><a href="#" className="hover:text-gold-500 transition-colors">Terms of Service</a></li>
                  <li><button onClick={() => setIsDisclaimerOpen(true)} className="hover:text-gold-500 text-left transition-colors">Disclaimer</button></li>
               </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
               <h5 className="text-white font-serif font-bold text-lg mb-4 tracking-wide">Contact</h5>
               <p className="flex items-center gap-2 mb-2"><Phone className="w-4 h-4 text-gold-500" /> (305) 831-1792</p>
               <p>Miami, FL 33130</p>
            </motion.div>
         </div>
         <div className="container mx-auto px-4 text-center pt-8 border-t border-slate-900 text-slate-500">
            &copy; {new Date().getFullYear()} Florida Credit Firm. All rights reserved.
         </div>
      </footer>
    </div>
  );
};

export default App;