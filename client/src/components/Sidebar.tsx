import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Sprout, Scan, CloudSun, Droplet, 
  Waves, TrendingUp, Wallet, MessageSquare, Info, 
  PhoneCall, ShieldAlert, X, HelpCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('agri_user');
    if (user) {
      const parsed = JSON.parse(user);
      setIsAdmin(parsed.role === 'admin');
    } else {
      setIsAdmin(false);
    }
  }, [location]);

  const navItems = [
    { name: t('dashboard'), path: '/dashboard', icon: LayoutDashboard },
    { name: t('cropRecommend'), path: '/recommend', icon: Sprout },
    { name: t('diseaseDetect'), path: '/disease', icon: Scan },
    { name: t('weather'), path: '/weather', icon: CloudSun },
    { name: t('soilAnalysis'), path: '/soil', icon: Droplet },
    { name: t('smartIrrigation'), path: '/irrigation', icon: Waves },
    { name: t('marketPrices'), path: '/market', icon: TrendingUp },
    { name: t('expenseTracker'), path: '/expenses', icon: Wallet },
    { name: t('chatbot'), path: '/chat', icon: MessageSquare },
    { name: t('about'), path: '/about', icon: Info },
    { name: t('contact'), path: '/contact', icon: PhoneCall },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    onClose(); // Close mobile sidebar drawer
  };

  return (
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col border-r border-gray-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 p-4 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0 lg:h-[calc(100vh-4rem)] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Header Close button */}
        <div className="flex items-center justify-between lg:hidden mb-4 pb-2 border-b border-gray-100 dark:border-slate-800/50">
          <span className="font-bold text-emerald-600 dark:text-emerald-400">{t('brand')} Menu</span>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold rounded-2xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md shadow-emerald-500/10'
                    : 'text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/15'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${
                  isActive ? 'text-white' : 'text-gray-400 dark:text-gray-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                }`} />
                <span>{item.name}</span>
              </button>
            );
          })}

          {/* Admin panel navigation filter */}
          {isAdmin && (
            <button
              onClick={() => handleNav('/admin')}
              className={`flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold rounded-2xl transition-all duration-200 group ${
                location.pathname === '/admin'
                  ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-md shadow-teal-500/10'
                  : 'text-teal-700 dark:text-teal-500 hover:bg-teal-50/50 dark:hover:bg-teal-950/15'
              }`}
            >
              <ShieldAlert className="w-5 h-5 text-teal-600" />
              <span>{t('adminDashboard')}</span>
            </button>
          )}
        </nav>
        
        {/* Footer info inside sidebar */}
        <div className="pt-4 border-t border-gray-100 dark:border-slate-800/50 mt-auto flex flex-col gap-1">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-gray-100 dark:border-slate-800/40">
            <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">
              Need assistance? Call 1800-AGRI
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
