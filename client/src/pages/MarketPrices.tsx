import React, { useState } from 'react';
import { TrendingUp, Search, MapPin, Compass, ArrowUpRight, ArrowDownRight, Award, DollarSign } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

export const MarketPrices: React.FC = () => {
  const { t } = useLanguage();
  const { showToast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [mandiFilter, setMandiFilter] = useState('All');

  const mandis = [
    { name: "Ludhiana Mandi", distance: "8 km" },
    { name: "Jalandhar Mandi", distance: "24 km" },
    { name: "Amritsar Mandi", distance: "45 km" },
  ];

  const initialPrices = [
    { id: 1, crop: "Wheat", price: "₹2,450 / Quintal", change: "+₹25", trend: "up", mandi: "Ludhiana Mandi", category: "Grain" },
    { id: 2, crop: "Rice (Basmati)", price: "₹6,200 / Quintal", change: "-₹120", trend: "down", mandi: "Ludhiana Mandi", category: "Grain" },
    { id: 3, crop: "Potato", price: "₹1,800 / Quintal", change: "+₹40", trend: "up", mandi: "Jalandhar Mandi", category: "Vegetable" },
    { id: 4, crop: "Tomato", price: "₹2,200 / Quintal", change: "+₹310", trend: "up", mandi: "Ludhiana Mandi", category: "Vegetable" },
    { id: 5, crop: "Onion", price: "₹1,650 / Quintal", change: "-₹15", trend: "down", mandi: "Amritsar Mandi", category: "Vegetable" },
    { id: 6, crop: "Cotton (Kapas)", price: "₹7,800 / Quintal", change: "+₹150", trend: "up", mandi: "Jalandhar Mandi", category: "Cash Crop" },
  ];

  const filteredPrices = initialPrices.filter((p) => {
    const matchesSearch = p.crop.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMandi = mandiFilter === 'All' || p.mandi === mandiFilter;
    return matchesSearch && matchesMandi;
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1.5">
          <TrendingUp className="w-6 h-6 text-emerald-600" />
          {t('marketPrices')}
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Check live mandi rates, explore neighboring agricultural markets, and track profit trends.
        </p>
      </div>

      {/* Selling recommendation banner */}
      <div className="p-6 rounded-3xl border border-emerald-100 dark:border-emerald-950/30 bg-emerald-500/[0.03] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
        <div>
          <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">AI Best Selling Advisory</span>
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mt-1">Hold Rice, Sell Tomatoes This Week</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 max-w-xl leading-relaxed">
            Tomato prices have surged 16% in Ludhiana Mandi due to a supply crunch in neighboring regions. Hold Basmati Rice as exports are projected to pick up, raising prices by 4-6% next month.
          </p>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0">
          <Award className="w-5 h-5" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Mandi Prices list */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Search className="w-4.5 h-4.5" />
              </span>
              <input
                type="text"
                placeholder={t('search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            
            <select
              value={mandiFilter}
              onChange={(e) => setMandiFilter(e.target.value)}
              className="p-2.5 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-gray-600 dark:text-gray-300 font-semibold"
            >
              <option value="All">All Mandis</option>
              <option value="Ludhiana Mandi">Ludhiana Mandi</option>
              <option value="Jalandhar Mandi">Jalandhar Mandi</option>
              <option value="Amritsar Mandi">Amritsar Mandi</option>
            </select>
          </div>

          {/* Pricing cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredPrices.map((p) => (
              <div 
                key={p.id}
                className="p-5 rounded-2xl border border-gray-100 dark:border-slate-800/80 bg-white dark:bg-slate-950 shadow-sm flex justify-between items-center group hover:border-emerald-500/30 transition-colors"
              >
                <div>
                  <span className="text-[9px] font-bold text-gray-400 uppercase">{p.category} • {p.mandi}</span>
                  <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mt-0.5">{p.crop}</h4>
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1">{p.price}</p>
                </div>
                
                <div className={`flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded-full ${
                  p.trend === 'up' 
                    ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400' 
                    : 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400'
                }`}>
                  {p.trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  {p.change}
                </div>
              </div>
            ))}
            {filteredPrices.length === 0 && (
              <div className="col-span-2 py-10 text-center text-gray-400 text-xs font-semibold">
                No crop prices matching filter.
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Nearby Mandis */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="p-6 rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm flex flex-col gap-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Nearby Mandis</span>
            <div className="flex flex-col gap-3">
              {mandis.map((m, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 border border-gray-100 dark:border-slate-800/10">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{m.name}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-semibold">{m.distance} away</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
export default MarketPrices;
