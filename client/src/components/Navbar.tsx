import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Globe, Bell, LogOut, User, Menu, Mic, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

interface NavbarProps {
  onToggleSidebar: () => void;
  onVoiceTrigger: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, onVoiceTrigger }) => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  const mockNotifications = [
    { id: 1, text: "Heavy rain alert in your region tonight!", time: "5m ago", type: "alert" },
    { id: 2, text: "Scheduled watering for Tomatoes at 4:00 PM.", time: "1h ago", type: "reminder" },
    { id: 3, text: "Wheat price jumped 4% in local mandi.", time: "3h ago", type: "price" },
  ];

  useEffect(() => {
    const loggedUser = localStorage.getItem('agri_user');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('agri_user');
    localStorage.removeItem('agri_token');
    setUser(null);
    showToast("Successfully logged out!", "info");
    navigate('/');
  };

  const isAuthPage = location.pathname === '/auth';
  const isLandingPage = location.pathname === '/';

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-slate-800/80 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Left section: Hamburger & Logo */}
          <div className="flex items-center gap-3">
            {!isAuthPage && !isLandingPage && (
              <button
                onClick={onToggleSidebar}
                className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-900 transition-colors"
                aria-label="Toggle Sidebar"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
            <div 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2 cursor-pointer select-none group"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-all">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent tracking-tight">
                {t('brand')}
              </span>
            </div>
          </div>

          {/* Right section: Theme, Language, Notifications, Mic, Profile */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Voice Assistant Trigger */}
            {!isAuthPage && (
              <button
                onClick={onVoiceTrigger}
                className="p-2 rounded-xl text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-all flex items-center gap-1 border border-emerald-100 dark:border-emerald-900/40 px-3"
                title="Voice Assistant"
              >
                <Mic className="w-4 h-4 animate-pulse" />
                <span className="text-xs font-semibold hidden md:inline">{t('voiceCommand')}</span>
              </button>
            )}

            {/* Language Selection */}
            <div className="relative">
              <button
                onClick={() => { setIsLangOpen(!isLangOpen); setIsNotificationsOpen(false); setIsProfileOpen(false); }}
                className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-900 transition-colors flex items-center gap-1"
                title="Change Language"
              >
                <Globe className="w-5 h-5" />
                <span className="text-xs font-semibold uppercase hidden sm:inline">{language}</span>
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-32 origin-top-right rounded-2xl border border-gray-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-1.5 shadow-xl ring-1 ring-black/5 focus:outline-none">
                  <button
                    onClick={() => { setLanguage('en'); setIsLangOpen(false); }}
                    className={`flex w-full items-center px-3 py-2 text-sm rounded-xl transition-colors ${language === 'en' ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800/60'}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => { setLanguage('ta'); setIsLangOpen(false); }}
                    className={`flex w-full items-center px-3 py-2 text-sm rounded-xl transition-colors ${language === 'ta' ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800/60'}`}
                  >
                    தமிழ்
                  </button>
                  <button
                    onClick={() => { setLanguage('hi'); setIsLangOpen(false); }}
                    className={`flex w-full items-center px-3 py-2 text-sm rounded-xl transition-colors ${language === 'hi' ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800/60'}`}
                  >
                    हिन्दी
                  </button>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-900 transition-colors"
              title="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notifications Alert Dropdown */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => { setIsNotificationsOpen(!isNotificationsOpen); setIsProfileOpen(false); setIsLangOpen(false); }}
                  className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-900 transition-colors relative"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                </button>
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-2xl border border-gray-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-2 shadow-xl ring-1 ring-black/5 focus:outline-none">
                    <div className="px-3 py-2 border-b border-gray-100 dark:border-slate-800/50 flex justify-between items-center">
                      <span className="font-bold text-sm text-gray-800 dark:text-gray-200">Alerts & Reminders</span>
                      <button 
                        onClick={() => { setIsNotificationsOpen(false); showToast("All notifications cleared!", "info"); }}
                        className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="mt-1 flex flex-col gap-1 max-h-60 overflow-y-auto">
                      {mockNotifications.map((n) => (
                        <div key={n.id} className="p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/40 transition-colors flex flex-col gap-0.5">
                          <p className="text-xs font-semibold text-gray-800 dark:text-gray-300">{n.text}</p>
                          <span className="text-[10px] text-gray-400">{n.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Profile Dropdown / Login Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotificationsOpen(false); setIsLangOpen(false); }}
                  className="flex items-center gap-1.5 p-1 px-2.5 sm:px-3 rounded-xl border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase">
                    {user.name[0]}
                  </div>
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300 hidden sm:inline capitalize">
                    {user.name}
                  </span>
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-2xl border border-gray-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-1.5 shadow-xl ring-1 ring-black/5 focus:outline-none">
                    <div className="px-3 py-2 border-b border-gray-100 dark:border-slate-800/50 mb-1.5">
                      <p className="text-xs font-bold text-gray-900 dark:text-gray-100 capitalize">{user.name}</p>
                      <p className="text-[10px] text-gray-400 capitalize">{user.role} Account</p>
                    </div>
                    {user.role === 'admin' && (
                      <button
                        onClick={() => { setIsProfileOpen(false); navigate('/admin'); }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        {t('adminDashboard')}
                      </button>
                    )}
                    <button
                      onClick={() => { setIsProfileOpen(false); navigate('/dashboard'); }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Profile Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              !isAuthPage && (
                <button
                  onClick={() => navigate('/auth')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-md shadow-emerald-500/10"
                >
                  {t('login')}
                </button>
              )
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};
