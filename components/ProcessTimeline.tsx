import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FileSearch, Scale, MessageSquare, TrendingUp } from 'lucide-react';

export const ProcessTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress relative to this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Smooth out the line animation so it doesn't feel jittery
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const steps = [
    {
      step: "01",
      title: "Analysis & Audit",
      description: [
        "Complete 3-Bureau Credit Audit",
        "Error & Violation Detection",
        "Custom Dispute Strategy"
      ],
      icon: FileSearch
    },
    {
      step: "02",
      title: "Strategic Disputes",
      description: [
        "Aggressive Legal Challenges",
        "Direct Furnisher Contact",
        "Debt Validation Demands"
      ],
      icon: Scale
    },
    {
      step: "03",
      title: "Creditor Liaison",
      description: [
        "Full Correspondence Management",
        "Cease & Desist Protocols",
        "Settlement Negotiations"
      ],
      icon: MessageSquare
    },
    {
      step: "04",
      title: "Score Restoration",
      description: [
        "24/7 Score Monitoring",
        "Utilization Optimization",
        "Financial Health Planning"
      ],
      icon: TrendingUp
    }
  ];

  return (
    <section ref={containerRef} className="py-24 bg-navy-950 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-navy-900 via-navy-950 to-navy-950 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-navy-900/20 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24 relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-500 font-sans font-bold tracking-widest uppercase text-xs border border-gold-500/20 px-4 py-1 rounded-full"
          >
            How We Work
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif font-bold text-white mt-6 mb-6 tracking-tight"
          >
            The Path to Restoration
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg font-sans font-light leading-relaxed"
          >
            Our proven four-step methodology combines legal expertise with aggressive dispute tactics.
          </motion.p>
        </div>

        {/* Desktop View (Zigzag Layout) */}
        <div className="hidden md:block relative max-w-5xl mx-auto">
          {/* Background Track Line */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 bg-slate-800 z-0"></div>
          
          {/* Animated Gold Progress Line */}
          <motion.div 
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 bg-gold-500 z-0 shadow-[0_0_15px_rgba(234,179,8,0.8)]"
          ></motion.div>

          <div className="space-y-32 relative z-10">
            {steps.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`flex items-center justify-between ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Content Side */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`w-5/12 ${isEven ? 'text-right pr-12' : 'text-left pl-12'}`}
                  >
                    <div className="text-gold-500 font-sans font-bold text-sm tracking-widest mb-2">STEP {item.step}</div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-4 tracking-tight">{item.title}</h3>
                    <ul className="space-y-2">
                      {item.description.map((point, i) => (
                        <li key={i} className={`text-slate-300 font-sans font-light leading-relaxed text-sm flex items-center gap-3 ${isEven ? 'justify-end' : 'justify-start'}`}>
                          {/* For Odd items (Right side), bullet comes first */}
                          {!isEven && <span className="w-1.5 h-1.5 bg-gold-500 rounded-full flex-shrink-0 mt-0.5" />}
                          
                          <span>{point}</span>
                          
                          {/* For Even items (Left side), bullet comes last (closest to center) */}
                          {isEven && <span className="w-1.5 h-1.5 bg-gold-500 rounded-full flex-shrink-0 mt-0.5" />}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Icon Node (Center) */}
                  <div className="w-2/12 flex justify-center relative">
                     <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-16 h-16 bg-navy-950 border-2 border-gold-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.3)] z-20 relative"
                     >
                        <item.icon className="w-6 h-6 text-gold-500" />
                     </motion.div>
                  </div>

                  {/* Empty Spacer Side */}
                  <div className="w-5/12"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile View (Vertical Stack) */}
        <div className="md:hidden space-y-12 relative">
           {/* Background Track */}
           <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-800"></div>
           
           {/* Animated Gold Progress Line */}
           <motion.div 
              style={{ scaleY, transformOrigin: 'top' }}
              className="absolute left-4 top-0 bottom-0 w-0.5 bg-gold-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"
           />

           {steps.map((item, index) => (
             <div key={index} className="relative pl-12">
                <div className="absolute left-0 top-0 w-8 h-8 bg-navy-950 border border-gold-500 rounded-full flex items-center justify-center -translate-x-1/2 mt-1 z-10">
                   <span className="text-[10px] text-gold-500 font-sans font-bold">{item.step}</span>
                </div>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-navy-900/50 p-6 rounded-xl border border-slate-800"
                >
                   <div className="flex items-center gap-3 mb-3">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                      >
                         <item.icon className="w-5 h-5 text-gold-500" />
                      </motion.div>
                      <h3 className="text-xl font-serif font-bold text-white tracking-tight">{item.title}</h3>
                   </div>
                   <ul className="space-y-2 pl-1">
                     {item.description.map((point, i) => (
                        <li key={i} className="text-slate-300 font-sans font-light text-sm leading-relaxed flex items-start gap-2">
                           <span className="w-1.5 h-1.5 bg-gold-500 rounded-full flex-shrink-0 mt-1.5" />
                           <span>{point}</span>
                        </li>
                     ))}
                   </ul>
                </motion.div>
             </div>
           ))}
        </div>

      </div>
    </section>
  );
};