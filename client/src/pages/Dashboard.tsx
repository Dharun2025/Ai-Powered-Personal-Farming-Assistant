import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CloudSun, Droplet, Sprout, TrendingUp, Wallet, Bell, 
  ArrowUpRight, ArrowDownRight, Compass, ShieldAlert, 
  MapPin, CheckSquare, Plus, ArrowUp, ArrowDown, ChevronRight 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Farmer');
  
  // Widget ordering state
  const [widgetOrder, setWidgetOrder] = useState<string[]>([
    'weather', 'soil', 'expenses', 'cropStatus', 'reminders'
  ]);

  useEffect(() => {
    const user = localStorage.getItem('agri_user');
    if (user) {
      setUserName(JSON.parse(user).name);
    }
  }, []);

  const yieldData = [
    { month: 'Jan', yield: 45 },
    { month: 'Feb', yield: 52 },
    { month: 'Mar', yield: 49 },
    { month: 'Apr', yield: 63 },
    { month: 'May', yield: 58 },
    { month: 'Jun', yield: 71 },
  ];

  // Helper to reorder widgets
  const moveWidget = (id: string, direction: 'up' | 'down') => {
    const idx = widgetOrder.indexOf(id);
    if (idx === -1) return;
    
    const newOrder = [...widgetOrder];
    if (direction === 'up' && idx > 0) {
      [newOrder[idx], newOrder[idx - 1]] = [newOrder[idx - 1], newOrder[idx]];
    } else if (direction === 'down' && idx < newOrder.length - 1) {
      [newOrder[idx], newOrder[idx + 1]] = [newOrder[idx + 1], newOrder[idx]];
    }
    
    setWidgetOrder(newOrder);
    showToast("Dashboard widgets rearranged!", "info");
  };

  // Drag and Drop implementation
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    if (draggedId === targetId) return;

    const draggedIdx = widgetOrder.indexOf(draggedId);
    const targetIdx = widgetOrder.indexOf(targetId);
    if (draggedIdx === -1 || targetIdx === -1) return;

    const newOrder = [...widgetOrder];
    newOrder.splice(draggedIdx, 1);
    newOrder.splice(targetIdx, 0, draggedId);
    setWidgetOrder(newOrder);
    showToast("Dashboard widgets rearranged!", "info");
  };

  // Widgets renders
  const renderWeatherWidget = () => (
    <div className="p-6 rounded-3xl border border-gray-100 dark:border-slate-800/80 bg-white dark:bg-slate-950 flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('todayWeather')}</span>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-1">32°C</h3>
          <span className="text-xs font-medium text-emerald-600">Perfect planting window</span>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
          <CloudSun className="w-5 h-5" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-gray-50 dark:border-slate-800/40 text-center text-xs">
        <div>
          <p className="text-gray-400">Rain Prob</p>
          <p className="font-bold text-gray-700 dark:text-gray-300">12%</p>
        </div>
        <div>
          <p className="text-gray-400">Wind</p>
          <p className="font-bold text-gray-700 dark:text-gray-300">14 km/h</p>
        </div>
        <div>
          <p className="text-gray-400">UV Index</p>
          <p className="font-bold text-gray-700 dark:text-gray-300">Low (3)</p>
        </div>
      </div>
    </div>
  );

  const renderSoilWidget = () => (
    <div className="p-6 rounded-3xl border border-gray-100 dark:border-slate-800/80 bg-white dark:bg-slate-950 flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('soilHealth')}</span>
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mt-1">Fertility Score: 84/100</h3>
          <span className="text-xs font-medium text-emerald-600">Ideal for Wheat & Beans</span>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
          <Droplet className="w-5 h-5" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-gray-50 dark:border-slate-800/40 text-center text-[10px] font-semibold">
        <div className="bg-emerald-50 dark:bg-emerald-950/20 p-1.5 rounded-xl text-emerald-700 dark:text-emerald-400">
          <p>Nitrogen</p>
          <p className="font-bold text-xs">High</p>
        </div>
        <div className="bg-amber-50 dark:bg-amber-950/20 p-1.5 rounded-xl text-amber-700 dark:text-amber-400">
          <p>Potassium</p>
          <p className="font-bold text-xs">Medium</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-950/20 p-1.5 rounded-xl text-blue-700 dark:text-blue-400">
          <p>Moisture</p>
          <p className="font-bold text-xs">68%</p>
        </div>
      </div>
    </div>
  );

  const renderExpensesWidget = () => (
    <div className="p-6 rounded-3xl border border-gray-100 dark:border-slate-800/80 bg-white dark:bg-slate-950 flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('expensesSummary')}</span>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mt-1">₹45,200 Net</h3>
          <span className="text-xs font-medium text-emerald-600 flex items-center gap-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" /> +12% vs last cycle
          </span>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center">
          <Wallet className="w-5 h-5" />
        </div>
      </div>
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50 dark:border-slate-800/40 text-xs">
        <span className="text-gray-400">Invested: ₹18,000</span>
        <button 
          onClick={() => navigate('/expenses')}
          className="text-emerald-600 font-bold hover:underline flex items-center gap-0.5"
        >
          View Tracker <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );

  const renderRemindersWidget = () => (
    <div className="p-6 rounded-3xl border border-gray-100 dark:border-slate-800/80 bg-white dark:bg-slate-950 flex flex-col h-full shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('upcomingReminders')}</span>
        <CheckSquare className="w-5 h-5 text-gray-400" />
      </div>
      <div className="flex-1 space-y-3">
        <div className="flex gap-3 items-start p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
          <input type="checkbox" className="mt-1 rounded text-emerald-600 focus:ring-emerald-500/20" />
          <div>
            <p className="text-xs font-bold text-gray-800 dark:text-gray-200">Water wheat fields</p>
            <span className="text-[10px] text-rose-500 font-semibold">Today, 4:00 PM</span>
          </div>
        </div>
        <div className="flex gap-3 items-start p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
          <input type="checkbox" className="mt-1 rounded text-emerald-600 focus:ring-emerald-500/20" />
          <div>
            <p className="text-xs font-bold text-gray-800 dark:text-gray-200">Apply Potassium Fertilizer</p>
            <span className="text-[10px] text-gray-400">Tomorrow, 9:00 AM</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCropStatusWidget = () => (
    <div className="p-6 rounded-3xl border border-gray-100 dark:border-slate-800/80 bg-white dark:bg-slate-950 flex flex-col h-full shadow-sm hover:shadow-md transition-all lg:col-span-2">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('cropStatus')}</span>
        <Sprout className="w-5 h-5 text-gray-400" />
      </div>
      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={yieldData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800/50" />
            <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip />
            <Area type="monotone" dataKey="yield" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorYield)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const widgetMap: Record<string, () => React.ReactNode> = {
    weather: renderWeatherWidget,
    soil: renderSoilWidget,
    expenses: renderExpensesWidget,
    reminders: renderRemindersWidget,
    cropStatus: renderCropStatusWidget,
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      
      {/* Header and Welcome panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-emerald-600/10 to-teal-500/10 border border-emerald-500/10 p-6 rounded-[2rem] bg-white/50 dark:bg-slate-900/50">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1.5">
            {t('welcome')}
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Here's what is happening at your farm in <strong className="text-emerald-600 dark:text-emerald-400">Punjab Region</strong> today.
          </p>
        </div>
        <button
          onClick={() => navigate('/recommend')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-emerald-500/10 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Recommend Crop
        </button>
      </div>

      {/* Grid container with draggable widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {widgetOrder.map((id, index) => (
          <div
            key={id}
            draggable
            onDragStart={(e) => handleDragStart(e, id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, id)}
            className={`relative group/widget cursor-move ${
              id === 'cropStatus' ? 'lg:col-span-2' : ''
            }`}
          >
            {/* Rearranging Quick Controls */}
            <div className="absolute top-2 right-2 z-10 flex gap-0.5 opacity-0 group-hover/widget:opacity-100 transition-opacity bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-lg p-0.5">
              <button
                onClick={() => moveWidget(id, 'up')}
                disabled={index === 0}
                className="p-1 rounded text-gray-400 hover:text-gray-600 disabled:opacity-30"
                title="Move Up"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => moveWidget(id, 'down')}
                disabled={index === widgetOrder.length - 1}
                className="p-1 rounded text-gray-400 hover:text-gray-600 disabled:opacity-30"
                title="Move Down"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Render the actual widget component */}
            {widgetMap[id]?.()}
          </div>
        ))}
      </div>

      {/* Bottom info: Live market price highlights ticker */}
      <div className="p-4 rounded-2xl border border-gray-100 dark:border-slate-800/80 bg-white dark:bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-semibold">
        <span className="text-gray-400 flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          Live Mandi Prices:
        </span>
        <div className="flex flex-wrap gap-4 text-[11px]">
          <span className="text-gray-600 dark:text-gray-300">Wheat: <strong className="text-emerald-600">₹2,450/qtl</strong> (+₹25)</span>
          <span className="text-gray-600 dark:text-gray-300">Rice (Basmati): <strong className="text-rose-500">₹6,200/qtl</strong> (-₹120)</span>
          <span className="text-gray-600 dark:text-gray-300">Potatoes: <strong className="text-emerald-600">₹1,800/qtl</strong> (+₹40)</span>
        </div>
        <button 
          onClick={() => navigate('/market')}
          className="text-emerald-600 font-bold hover:underline"
        >
          Check Markets
        </button>
      </div>

    </div>
  );
};
export default Dashboard;
