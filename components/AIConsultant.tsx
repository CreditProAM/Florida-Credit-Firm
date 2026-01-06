import React, { useState } from 'react';
import { analyzeCreditIssue } from '../services/geminiService';
import { Sparkles, Send, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const AIConsultant: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse(null);
    
    try {
      const result = await analyzeCreditIssue(input);
      setResponse(result);
    } catch (error) {
      setResponse("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-navy-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-gold-400 font-sans font-semibold tracking-wide uppercase text-xs mb-4"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Strategic Intelligence</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 tracking-tight"
            >
              Instant Case Analysis
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-400 font-sans font-light leading-relaxed"
            >
              Not sure if you have a case? Describe your negative item below, and our AI will generate a preliminary dispute strategy based on consumer law.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 md:p-8 shadow-2xl"
          >
            <div className="space-y-4">
              <label className="block text-xs font-sans font-bold uppercase tracking-widest text-gold-500">
                Describe the negative item
              </label>
              <div className="relative">
                <textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full bg-slate-900/80 border border-slate-600 rounded-xl p-4 text-white font-sans font-light placeholder-slate-500 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all h-32 resize-none leading-relaxed"
                  placeholder="E.g., 'Late payment on Capital One from 2021', 'Medical collection of $500'..."
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAnalyze}
                  disabled={loading || !input.trim()}
                  className="absolute bottom-3 right-3 bg-gold-500 hover:bg-gold-600 text-navy-950 font-sans font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide text-sm"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {loading ? 'Analyzing...' : 'Analyze Case'}
                </motion.button>
              </div>
            </div>

            {response && (
              <div className="mt-8 animate-fade-in">
                <div className="flex items-start gap-3 p-4 bg-slate-900/50 rounded-xl border border-gold-500/20">
                  <div className="p-2 bg-gold-500/10 rounded-lg">
                    <Sparkles className="w-5 h-5 text-gold-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gold-400 font-serif font-bold mb-2 tracking-tight">Preliminary Strategy</h4>
                    <div className="text-slate-300 whitespace-pre-line font-sans font-light leading-relaxed text-sm md:text-base">
                      {response}
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-700 flex items-center gap-2 text-xs text-slate-500 font-sans font-light">
                      <AlertCircle className="w-3 h-3" />
                      <span>This is an AI-generated assessment and does not constitute legal advice. Results vary.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};