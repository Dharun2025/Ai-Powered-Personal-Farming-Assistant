import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, Scan, CloudSun, Droplet, TrendingUp, HelpCircle, ArrowRight, Star, Heart, CheckCircle2, ChevronDown, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LandingPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const features = [
    {
      icon: Sprout,
      title: t('cropRecommend'),
      desc: "Get scientific recommendations on the best crops to grow based on soil nutrients (N-P-K), pH, region, and weather trends.",
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
    },
    {
      icon: Scan,
      title: t('diseaseDetect'),
      desc: "Take a picture of damaged leaves or crops to identify plant diseases instantly and get biological and chemical cure solutions.",
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
    },
    {
      icon: CloudSun,
      title: t('weather'),
      desc: "Access localized hourly and weekly agricultural weather forecasts with AI farming advice matching rainfall and moisture predictions.",
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400"
    },
    {
      icon: Droplet,
      title: t('soilAnalysis'),
      desc: "Log soil report metrics to track pH levels and fertility indicators, receiving recommendations to naturally build organic matter.",
      color: "bg-teal-500/10 text-teal-600 dark:text-teal-400"
    },
    {
      icon: Waves,
      title: t('smartIrrigation'),
      desc: "Calculate precise daily water requirements per crop type and set scheduling trackers to save valuable water resources.",
      color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
    },
    {
      icon: TrendingUp,
      title: t('marketPrices'),
      desc: "Check live mandi crop rates in nearby marketplaces, analyze trends, and identify optimal times to sell for peak profit.",
      color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
    }
  ];

  const stats = [
    { count: "12,500+", label: t('statFarmers') },
    { count: "98.2%", label: t('statAccuracy') },
    { count: "48+", label: t('statCrops') },
    { count: "1.2M Tons", label: "Yield Optimized" }
  ];

  const faqs = [
    {
      q: "How does the AI Crop Recommendation work?",
      a: "Our machine learning models analyze parameters like soil Nitrogen (N), Phosphorus (P), Potassium (K) levels, pH value, historical rainfall index, and average seasonal temperatures to suggest high-yielding crops suited to your land."
    },
    {
      q: "What crops can the disease detector identify?",
      a: "AgriAI's visual diagnostic tool supports over 30 crop types including Tomatoes, Potatoes, Apples, Wheat, Rice, and Cotton. It detects common viral, bacterial, and fungal leaf spots, blights, and rusts."
    },
    {
      q: "Can I use AgriAI offline?",
      a: "Yes! AgriAI is built with PWA support. You can install it on your Android or iPhone device, and it caches core calculators and previous diagnosis reports so you can access them even without cell reception."
    },
    {
      q: "Is my farm data private and secure?",
      a: "Absolutely. We encrypt all user profiles, soil report details, and financial logs. Your farm details will never be sold or shared with third parties."
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Punjab, India",
      quote: "Thanks to AgriAI's crop recommendation, I switched from traditional paddy to sunflower crop last season and doubled my net profit. The soil analysis suggestions are very easy to follow.",
      rating: 5
    },
    {
      name: "Ananya Patel",
      location: "Gujarat, India",
      quote: "The leaf disease detector is magic! It correctly diagnosed tomato early blight in my crop within seconds and recommended a neem oil spray that saved my harvest naturally.",
      rating: 5
    }
  ];

  // Dummy Waves icon since waves might not be loaded in scope
  function Waves(props: any) {
    return <Droplet {...props} />;
  }

  const handleStart = () => {
    const token = localStorage.getItem('agri_token');
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="flex flex-col w-full -mt-4 bg-slate-50/50 dark:bg-slate-950/20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl animate-pulse-slow [animation-delay:2s]"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 text-xs font-bold mb-6 border border-emerald-200 dark:border-emerald-900/30">
            <Award className="w-3.5 h-3.5" />
            AI-Driven Agriculture Assistant
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mb-6 leading-[1.15]">
            {t('heroTitle')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            {t('heroSubtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleStart}
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              {t('getStarted')}
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/about')}
              className="w-full sm:w-auto bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800/80 text-gray-700 dark:text-gray-300 font-bold px-8 py-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-850 transition-all text-center"
            >
              {t('learnMore')}
            </button>
          </div>
        </div>
      </section>

      {/* Feature cards Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mb-4">
            {t('featuresTitle')}
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {t('featuresSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-3xl border border-gray-100 dark:border-slate-850 bg-white dark:bg-slate-900/50 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 group"
              >
                <div className={`w-12 h-12 rounded-2xl ${f.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-16 bg-emerald-900 text-white rounded-[2.5rem] max-w-6xl mx-auto w-full my-12 px-8 shadow-xl shadow-emerald-950/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-200 via-transparent to-transparent"></div>
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((s, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-100 to-teal-200 bg-clip-text text-transparent">
                {s.count}
              </span>
              <span className="text-xs font-semibold text-emerald-200/80 uppercase tracking-wider">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 max-w-6xl mx-auto px-4 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">
            Loved by Farmers Everywhere
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Real stories from farm growers who optimized their yield with our AI assistant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-3xl border border-gray-100 dark:border-slate-850 bg-white dark:bg-slate-900/30 flex flex-col gap-6 relative shadow-sm"
            >
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 italic leading-relaxed">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 border-t border-gray-50 dark:border-slate-800/40 pt-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">{t.name}</h4>
                  <span className="text-[10px] text-gray-400">{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-4xl mx-auto px-4 w-full">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-8 text-center">
          {t('faqTitle')}
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl border border-gray-100 dark:border-slate-850 bg-white dark:bg-slate-900/30 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <span className="text-sm sm:text-base flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-600" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-50 dark:border-slate-800/40 leading-relaxed bg-slate-50/20 dark:bg-slate-900/10">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact CTA banner */}
      <section className="my-12 py-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-[2.5rem] max-w-5xl mx-auto w-full px-8 text-center text-white shadow-xl shadow-emerald-800/20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Start Cultivating Smarter Today</h2>
        <p className="text-emerald-100 max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
          Create an account to track your crops, diagnostics, soil health indices, and manage your expenses.
        </p>
        <button
          onClick={handleStart}
          className="bg-white text-emerald-800 font-extrabold px-8 py-3.5 rounded-2xl hover:scale-105 active:scale-95 transition-transform shadow-lg"
        >
          Join Free
        </button>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200 dark:border-slate-800/80 mt-20">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-gray-400">
          <span>{t('footerText')}</span>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:underline" onClick={() => navigate('/about')}>About</span>
            <span className="cursor-pointer hover:underline" onClick={() => navigate('/contact')}>Contact</span>
            <span className="cursor-pointer hover:underline">Privacy Policy</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
export default LandingPage;
