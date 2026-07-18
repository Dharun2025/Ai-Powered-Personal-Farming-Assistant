import React from 'react';
import { CloudSun, CloudRain, Sun, Wind, Droplet, Sparkles, AlertTriangle, Thermometer } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const WeatherForecast: React.FC = () => {
  const { t } = useLanguage();

  const current = {
    temp: "32°C",
    condition: "Partly Cloudy",
    humidity: "68%",
    wind: "14 km/h",
    rainProb: "12%",
    uv: "3 (Low)",
    feelsLike: "35°C",
  };

  const hourly = [
    { time: "Now", temp: "32°C", icon: CloudSun, rain: "12%" },
    { time: "2 PM", temp: "34°C", icon: Sun, rain: "5%" },
    { time: "4 PM", temp: "33°C", icon: Sun, rain: "10%" },
    { time: "6 PM", temp: "31°C", icon: CloudSun, rain: "25%" },
    { time: "8 PM", temp: "28°C", icon: CloudRain, rain: "60%" },
    { time: "10 PM", temp: "27°C", icon: CloudRain, rain: "80%" },
  ];

  const weekly = [
    { day: "Today", temp: "34° / 26°", condition: "P. Cloudy", icon: CloudSun, rain: "12%" },
    { day: "Friday", temp: "28° / 24°", condition: "Thunderstorm", icon: CloudRain, rain: "90%" },
    { day: "Saturday", temp: "29° / 24°", condition: "Showers", icon: CloudRain, rain: "75%" },
    { day: "Sunday", temp: "31° / 25°", condition: "Partly Cloudy", icon: CloudSun, rain: "20%" },
    { day: "Monday", temp: "33° / 26°", condition: "Mostly Sunny", icon: Sun, rain: "5%" },
    { day: "Tuesday", temp: "34° / 27°", condition: "Sunny", icon: Sun, rain: "0%" },
    { day: "Wednesday", temp: "35° / 28°", condition: "Sunny", icon: Sun, rain: "5%" },
  ];

  const aiAdvice = [
    {
      title: "Pesticide Spray Advisory",
      text: "Avoid spraying foliar pesticides or chemical fertilizers after 5 PM today. Heavy localized rain showers are predicted tonight (80% probability from 8 PM onwards) which could wash away active chemicals.",
      type: "alert",
    },
    {
      title: "Irrigation Scheduling",
      text: "Delay tomorrow morning's irrigation cycle. Soil moisture levels are expected to be replenished naturally by tonight's rainfall.",
      type: "info",
    },
    {
      title: "Harvest Warning",
      text: "If you have matured legumes or vegetables ready, harvest them by Friday afternoon to avoid rot or water logging damage from the weekend storm.",
      type: "warning",
    }
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1.5">
          <CloudSun className="w-6 h-6 text-emerald-600" />
          {t('weather')}
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Localized farm meteorological forecast integrated with customized AI agricultural crop advice.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Current weather & Hourly */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Current weather stats card */}
          <div className="p-6 rounded-3xl border border-gray-100 dark:border-slate-800/80 bg-white dark:bg-slate-950 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-6 relative overflow-hidden">
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Current Conditions</span>
                <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mt-2">{current.temp}</h2>
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-1">{current.condition}</p>
              </div>
              <div className="text-[10px] text-gray-400 font-bold mt-6">
                Feels like {current.feelsLike} • Regional Station: Ludhiana, PB
              </div>
            </div>

            {/* Grid of indicators */}
            <div className="grid grid-cols-2 gap-4 bg-slate-50/50 dark:bg-slate-900/30 p-4 rounded-2xl border border-gray-100 dark:border-slate-800/20">
              <div className="flex items-center gap-2">
                <Droplet className="w-5 h-5 text-blue-500" />
                <div>
                  <span className="text-[9px] text-gray-400 font-bold block uppercase">Humidity</span>
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-200">{current.humidity}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-5 h-5 text-teal-500" />
                <div>
                  <span className="text-[9px] text-gray-400 font-bold block uppercase">Wind Speed</span>
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-200">{current.wind}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CloudRain className="w-5 h-5 text-cyan-500" />
                <div>
                  <span className="text-[9px] text-gray-400 font-bold block uppercase">Rain Prob</span>
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-200">{current.rainProb}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-amber-500" />
                <div>
                  <span className="text-[9px] text-gray-400 font-bold block uppercase">UV Index</span>
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-200">{current.uv}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hourly Scroller */}
          <div className="p-6 rounded-3xl border border-gray-100 dark:border-slate-800/80 bg-white dark:bg-slate-950 shadow-sm flex flex-col gap-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hourly Progress</span>
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {hourly.map((h, idx) => {
                const Icon = h.icon;
                return (
                  <div key={idx} className="flex-shrink-0 w-20 flex flex-col items-center bg-slate-50 dark:bg-slate-900/30 border border-gray-100 dark:border-slate-800/20 p-3 rounded-2xl">
                    <span className="text-[10px] font-bold text-gray-400">{h.time}</span>
                    <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400 my-2" />
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200">{h.temp}</span>
                    <span className="text-[8px] text-cyan-500 font-extrabold mt-1">{h.rain} rain</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weekly Grid */}
          <div className="p-6 rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-4">7-Day Outlook</span>
            <div className="flex flex-col gap-2">
              {weekly.map((w, idx) => {
                const Icon = w.icon;
                return (
                  <div 
                    key={idx} 
                    className="flex justify-between items-center p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors text-xs font-semibold text-gray-600 dark:text-gray-300"
                  >
                    <span className="w-20 font-bold">{w.day}</span>
                    <div className="flex items-center gap-2 w-32">
                      <Icon className="w-4 h-4 text-emerald-600" />
                      <span>{w.condition}</span>
                    </div>
                    <span className="text-[10px] text-cyan-500 font-extrabold">{w.rain} rain</span>
                    <span className="w-20 text-right font-bold text-gray-800 dark:text-gray-100">{w.temp}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: AI Farming Advice cards */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <div className="p-6 rounded-3xl border border-gray-100 dark:border-slate-800/80 bg-white dark:bg-slate-950 flex flex-col gap-4 shadow-sm h-full">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              AI Agricultural Advice
            </span>
            
            <div className="flex flex-col gap-4">
              {aiAdvice.map((a, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-2xl border flex flex-col gap-1.5 ${
                    a.type === 'warning'
                      ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/40 text-rose-800 dark:text-rose-300'
                      : a.type === 'alert'
                      ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/40 text-amber-800 dark:text-amber-300'
                      : 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300'
                  }`}
                >
                  <span className="text-xs font-bold flex items-center gap-1.5 uppercase">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {a.title}
                  </span>
                  <p className="text-[11px] font-semibold leading-relaxed">
                    {a.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
export default WeatherForecast;
