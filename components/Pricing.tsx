import React from 'react';
import { Check, X, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const tiers = [
  {
    name: 'Individual',
    price: '124',
    features: [
      { 
        text: 'Challenge All Discrepancies', 
        included: true,
        description: "We aggressively dispute inaccurate negative items with all three major credit bureaus (Equifax, Experian, TransUnion)."
      },
      { 
        text: 'Ongoing Credit Monitoring', 
        included: true,
        description: "24/7 surveillance of your credit profile to detect new inquiries and score changes instantly."
      },
      { 
        text: 'Identity and Fraud Protection', 
        included: true,
        description: "$1M Identity Theft Insurance and proactive dark web monitoring to safeguard your personal data."
      },
      { 
        text: 'Flexible Service Options', 
        included: true,
        description: "Month-to-month service with no binding long-term contracts or cancellation fees."
      },
      { 
        text: 'Priority Support', 
        included: false,
        description: "Direct access to senior credit consultants via dedicated priority channels."
      },
      { 
        text: 'Annual Credit Audit', 
        included: false,
        description: "Comprehensive yearly deep-dive analysis to strategize your long-term financial health."
      },
      { 
        text: 'Unlimited disputes', 
        included: false,
        description: "We send unlimited dispute letters per round, maximizing the speed of your results."
      },
      { 
        text: 'Credit Optimization Tools', 
        included: false,
        description: "Access to advanced score simulators and debt payoff planning calculators."
      },
    ],
    highlight: false,
    headerColor: 'bg-white',
    textColor: 'text-navy-900'
  },
  {
    name: "Couple's",
    price: '199',
    features: [
      { 
        text: 'Challenge All Discrepancies', 
        included: true,
        description: "We aggressively dispute inaccurate negative items with all three major credit bureaus (Equifax, Experian, TransUnion)."
      },
      { 
        text: 'Ongoing Credit Monitoring', 
        included: true,
        description: "24/7 surveillance of your credit profile to detect new inquiries and score changes instantly."
      },
      { 
        text: 'Identity and Fraud Protection', 
        included: true,
        description: "$1M Identity Theft Insurance and proactive dark web monitoring to safeguard your personal data."
      },
      { 
        text: 'Flexible Service Options', 
        included: true,
        description: "Month-to-month service with no binding long-term contracts or cancellation fees."
      },
      { 
        text: 'Priority Support', 
        included: false,
        description: "Direct access to senior credit consultants via dedicated priority channels."
      },
      { 
        text: 'Annual Credit Audit', 
        included: false,
        description: "Comprehensive yearly deep-dive analysis to strategize your long-term financial health."
      },
      { 
        text: 'Unlimited disputes', 
        included: false,
        description: "We send unlimited dispute letters per round, maximizing the speed of your results."
      },
      { 
        text: 'Credit Optimization Tools', 
        included: false,
        description: "Access to advanced score simulators and debt payoff planning calculators."
      },
    ],
    highlight: true,
    headerColor: 'bg-gradient-to-b from-slate-700 to-slate-800', // Dark distinctive look
    textColor: 'text-white'
  },
  {
    name: 'Individual+',
    price: '249',
    features: [
      { 
        text: 'Challenge All Discrepancies', 
        included: true,
        description: "We aggressively dispute inaccurate negative items with all three major credit bureaus (Equifax, Experian, TransUnion)."
      },
      { 
        text: 'Ongoing Credit Monitoring', 
        included: true,
        description: "24/7 surveillance of your credit profile to detect new inquiries and score changes instantly."
      },
      { 
        text: 'Identity and Fraud Protection', 
        included: true,
        description: "$1M Identity Theft Insurance and proactive dark web monitoring to safeguard your personal data."
      },
      { 
        text: 'Flexible Service Options', 
        included: true,
        description: "Month-to-month service with no binding long-term contracts or cancellation fees."
      },
      { 
        text: 'Priority Support', 
        included: true,
        description: "Direct access to senior credit consultants via dedicated priority channels."
      },
      { 
        text: 'Annual Credit Audit', 
        included: true,
        description: "Comprehensive yearly deep-dive analysis to strategize your long-term financial health."
      },
      { 
        text: 'Unlimited disputes', 
        included: true,
        description: "We send unlimited dispute letters per round, maximizing the speed of your results."
      },
      { 
        text: 'Credit Optimization Tools', 
        included: true,
        description: "Access to advanced score simulators and debt payoff planning calculators."
      },
    ],
    highlight: false,
    headerColor: 'bg-white',
    textColor: 'text-navy-900'
  }
];

export const Pricing: React.FC = () => {
  return (
    <section className="py-20 bg-navy-950 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-navy-900/40 via-transparent to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-serif font-bold text-white mb-4"
          >
            Our Programs
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gold-500 font-semibold mb-6"
          >
            (No Hidden Fees)
          </motion.p>
          <div className="h-px w-24 bg-gold-500 mx-auto mb-6"></div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-300 max-w-2xl mx-auto"
          >
            We believe in full transparency – delivering honesty and clarity every step of the way.
          </motion.p>
        </div>
        
        {/* Yellow Bar */}
        <div className="max-w-5xl mx-auto h-8 bg-gold-500 rounded-t-lg hidden md:block w-full mb-0"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className={`
                relative rounded-lg transition-shadow duration-300 hover:z-20
                ${tier.highlight ? 'bg-slate-800 border-2 border-slate-600 shadow-2xl scale-105 z-10' : 'bg-white border border-slate-200'}
              `}
            >
              {/* Header */}
              <div className={`p-8 text-center border-b rounded-t-lg ${tier.highlight ? 'border-slate-600 bg-slate-800' : 'border-slate-100 bg-white'}`}>
                <h3 className={`text-xl font-serif ${tier.highlight ? 'text-white' : 'text-slate-700'}`}>{tier.name}</h3>
                <div className={`mt-4 flex items-start justify-center ${tier.highlight ? 'text-white' : 'text-slate-900'}`}>
                  <span className="text-2xl font-bold mt-2">$</span>
                  <span className="text-6xl font-serif font-bold">{tier.price}</span>
                </div>
                <p className={`text-sm mt-2 ${tier.highlight ? 'text-slate-400' : 'text-slate-500'}`}>Monthly*</p>
              </div>

              {/* Features */}
              <div className={`p-8 rounded-b-lg ${tier.highlight ? 'bg-slate-700/30' : 'bg-white'}`}>
                <ul className="space-y-4">
                  {tier.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <div className="p-0.5 bg-slate-800 rounded text-white flex-shrink-0">
                          <X className="w-3 h-3" />
                        </div>
                      )}
                      <span className={`text-sm flex-1 ${tier.highlight ? 'text-slate-300' : 'text-slate-600'}`}>
                        {feature.text}
                      </span>
                      {feature.included && (
                        <div className="relative group/tooltip">
                          <Info className="w-4 h-4 text-slate-400 cursor-help hover:text-gold-500 transition-colors" />
                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-navy-900/95 backdrop-blur-sm border border-slate-700 text-slate-200 text-xs leading-relaxed rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 pointer-events-none scale-95 group-hover/tooltip:scale-100 origin-bottom">
                            {feature.description}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-navy-900/95"></div>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>

                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                  w-full mt-8 py-3 px-6 rounded font-bold tracking-wider transition-colors
                  ${tier.highlight 
                    ? 'bg-white text-navy-900 hover:bg-gold-500 hover:text-white' 
                    : 'bg-navy-800 text-white hover:bg-navy-700'}
                `}>
                  GET STARTED
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};