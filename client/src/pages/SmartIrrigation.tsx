import React, { useState } from 'react';
import { Waves, Droplet, Plus, Calendar, CloudRain, AlertTriangle, Lightbulb, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

export const SmartIrrigation: React.FC = () => {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [cropType, setCropType] = useState('Wheat');
  const [area, setArea] = useState(2);
  const [stage, setStage] = useState('Vegetative');
  const [weatherToday, setWeatherToday] = useState('Sunny');

  const [waterReq, setWaterReq] = useState<number | null>(null);
  
  const [schedules, setSchedules] = useState([
    { id: 1, crop: "Wheat", time: "Today, 4:00 PM", quantity: "18,000 Litres", status: "Pending" },
    { id: 2, crop: "Potato", time: "Tomorrow, 7:00 AM", quantity: "12,000 Litres", status: "Scheduled" },
  ]);

  const [newCrop, setNewCrop] = useState('Wheat');
  const [newTime, setNewTime] = useState('');
  const [newQty, setNewQty] = useState('');

  const calculateWater = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Water requirement calculation formula:
    // Base rate per crop per acre per day: Wheat 10,000L, Rice 25,000L, Maize 12,000L, Potato 8,000L
    let base = 10000;
    if (cropType === 'Rice') base = 25000;
    else if (cropType === 'Maize') base = 12000;
    else if (cropType === 'Potato') base = 8000;

    // Stage multiplier: Vegetative 1.0, Flowering 1.3, Grain fill 1.2, Initial 0.6
    let stageMult = 1.0;
    if (stage === 'Flowering') stageMult = 1.3;
    else if (stage === 'Grain Fill') stageMult = 1.2;
    else if (stage === 'Initial') stageMult = 0.6;

    // Weather multiplier: Sunny 1.1, Cloudy 0.8, Rainy 0.1
    let weatherMult = 1.1;
    if (weatherToday === 'Cloudy') weatherMult = 0.8;
    else if (weatherToday === 'Rainy') weatherMult = 0.1;

    const totalLitres = Math.round(base * area * stageMult * weatherMult);
    setWaterReq(totalLitres);
    showToast("Water requirement calculated!", "success");
  };

  const handleAddSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTime || !newQty) {
      showToast("Please fill in time and quantity", "warning");
      return;
    }
    const id = schedules.length + 1;
    setSchedules([...schedules, { id, crop: newCrop, time: newTime, quantity: `${newQty} Litres`, status: "Scheduled" }]);
    setNewTime('');
    setNewQty('');
    showToast("Irrigation cycle scheduled!", "success");
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1.5">
          <Waves className="w-6 h-6 text-emerald-600" />
          {t('smartIrrigation')}
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Calculate precise crop water volumes, schedule irrigation timers, and view rain conservation recommendations.
        </p>
      </div>

      {/* Rain Alert banner */}
      <div className="p-4 rounded-2xl border border-amber-100 dark:border-amber-950/20 bg-amber-500/[0.04] text-amber-800 dark:text-amber-300 text-xs font-semibold flex items-start gap-3">
        <CloudRain className="w-5 h-5 flex-shrink-0 animate-bounce" />
        <div>
          <h4 className="font-bold flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" /> Rain Forecast Alert (Ludhiana PB)
          </h4>
          <p className="mt-0.5 leading-relaxed text-amber-700 dark:text-amber-400 font-medium">
            Heavy rainfall (80% probability) is expected tonight from 8:00 PM onwards. Consider skipping afternoon irrigation cycles to prevent root logging.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Calculator */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <form 
            onSubmit={calculateWater}
            className="p-6 rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col gap-4 shadow-sm"
          >
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Water Volume Calculator</span>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Crop Type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase">Crop Model</label>
                <select
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-transparent dark:bg-slate-900/30 text-xs"
                >
                  <option value="Wheat">Wheat</option>
                  <option value="Rice">Basmati Rice</option>
                  <option value="Maize">Maize</option>
                  <option value="Potato">Potato</option>
                </select>
              </div>

              {/* Area */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase">Land Area (Acres)</label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={area}
                  onChange={(e) => setArea(parseFloat(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-transparent dark:bg-slate-900/30 text-xs"
                />
              </div>

              {/* Growth Stage */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase">Growth Stage</label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-transparent dark:bg-slate-900/30 text-xs"
                >
                  <option value="Initial">Initial / Seedling</option>
                  <option value="Vegetative">Vegetative</option>
                  <option value="Flowering">Flowering</option>
                  <option value="Grain Fill">Grain Filling</option>
                </select>
              </div>

              {/* Today weather */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase">Weather Mode</label>
                <select
                  value={weatherToday}
                  onChange={(e) => setWeatherToday(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-transparent dark:bg-slate-900/30 text-xs"
                >
                  <option value="Sunny">Sunny / Hot</option>
                  <option value="Cloudy">Cloudy</option>
                  <option value="Rainy">Rainy</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 mt-4 text-xs"
            >
              <Droplet className="w-4 h-4" />
              Calculate Daily Water
            </button>
          </form>

          {/* Calculator Output */}
          {waterReq !== null && (
            <div className="p-6 rounded-3xl border border-cyan-100 dark:border-cyan-950/30 bg-cyan-500/[0.03] flex justify-between items-center gap-4">
              <div>
                <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest block">Daily Water Volume</span>
                <h3 className="text-2xl font-extrabold text-cyan-700 dark:text-cyan-400 mt-1">{waterReq.toLocaleString()} Litres</h3>
                <span className="text-[10px] font-medium text-gray-400">Calculated for {area} Acres of {cropType}</span>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center flex-shrink-0">
                <Waves className="w-5 h-5" />
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Schedule & Tips */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Scheduling list */}
          <div className="p-6 rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm flex flex-col gap-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Active Watering Calendar</span>
            
            <div className="flex flex-col gap-3">
              {schedules.map((s) => (
                <div 
                  key={s.id} 
                  className="flex justify-between items-center p-3 rounded-2xl border border-gray-50 dark:border-slate-800/40 bg-slate-50/20 dark:bg-slate-900/10 text-xs font-semibold"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                      <Droplet className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 dark:text-gray-200">{s.crop} Irrigation</p>
                      <span className="text-[10px] text-gray-400">{s.time}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800 dark:text-gray-200">{s.quantity}</p>
                    <span className="text-[9px] font-extrabold text-emerald-600 dark:text-emerald-400 block mt-0.5 uppercase tracking-wider">{s.status}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick schedule add form */}
            <form onSubmit={handleAddSchedule} className="border-t border-gray-50 dark:border-slate-800/40 pt-4 mt-1 grid grid-cols-3 gap-2">
              <select
                value={newCrop}
                onChange={(e) => setNewCrop(e.target.value)}
                className="p-2 rounded-xl border border-gray-200 dark:border-slate-850 bg-transparent text-xs"
              >
                <option value="Wheat">Wheat</option>
                <option value="Rice">Rice</option>
                <option value="Potato">Potato</option>
              </select>
              <input
                type="text"
                placeholder="e.g. Tomorrow, 6 AM"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="p-2 rounded-xl border border-gray-200 dark:border-slate-850 bg-transparent text-xs"
              />
              <input
                type="text"
                placeholder="e.g. 15,000"
                value={newQty}
                onChange={(e) => setNewQty(e.target.value)}
                className="p-2 rounded-xl border border-gray-200 dark:border-slate-850 bg-transparent text-xs"
              />
              <button
                type="submit"
                className="col-span-3 bg-emerald-600 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 mt-2"
              >
                <Plus className="w-3.5 h-3.5" /> Schedule Irrigation
              </button>
            </form>
          </div>

          {/* Water-saving tips */}
          <div className="p-6 rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm flex flex-col gap-3">
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-emerald-600" />
              Conservation & Optimization Recommendations
            </span>
            <ul className="space-y-3">
              <li className="flex gap-2 items-start text-xs font-semibold text-gray-600 dark:text-gray-300 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
                <strong>Early Morning Watering</strong>: Irrigate between 5:00 AM and 8:00 AM. This minimizes soil evaporation rates caused by daylight sun, saving up to 20% water volume.
              </li>
              <li className="flex gap-2 items-start text-xs font-semibold text-gray-600 dark:text-gray-300 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
                <strong>Organic Straw Mulching</strong>: Spread paddy straw or dry organic mulch around crop beds. This locks moisture in the soil base, reducing watering frequency.
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
export default SmartIrrigation;
