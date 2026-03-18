import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, Mail, Github } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Portal', icon: Home },
    { path: '/contact', label: 'Support', icon: Mail },
  ];

  const isAuthPage = location.pathname === '/' || location.pathname === '/login';

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#ffcc00]/30">
      {/* Optional Navigation - Hidden on Home and Login to maintain clone fidelity */}
      {!isAuthPage && (
        <nav className="fixed top-0 w-full z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
              <div className="w-8 h-8 bg-[#ffcc00] rounded flex items-center justify-center">
                <span className="text-[#d40511] font-black text-xs italic">DHL</span>
              </div>
              <span className="text-zinc-900">Portal</span>
            </Link>
            
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-[#d40511] flex items-center gap-2 ${
                    location.pathname === item.path ? 'text-[#d40511]' : 'text-zinc-500'
                  }`}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}

      <main className={location.pathname === '/' ? '' : 'pt-24 pb-12'}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      <footer className="border-t border-zinc-100 py-8 mt-auto bg-zinc-50">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-400 text-xs uppercase tracking-widest font-bold">
          <p>© 2026 DHL INTERNATIONAL. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#d40511] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#d40511] transition-colors">Terms of Use</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
