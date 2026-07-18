import React, { useState } from 'react';
import { Droplet, BarChart2, CheckCircle2, AlertTriangle, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

export const SoilAnalysis: React.FC = () => {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any | null>(null);

  // Inputs
  const [ph, setPh] = useState(6.5);
  const [n, setN] = useState(60);
  const [p, setP] = useState(40);
  const [k, setK] = useState(45);
  const [moisture, setMoisture] = useState(55);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      
      // Determine soil parameters diagnosis
      let fertilityScore = 78;
      let organicStatus = "Moderate";
      let npkStatus = { n: "Medium", p: "Medium", k: "Medium" };
      let compostAdvice = "Incorporate 4 tons/acre of farmyard manure or vermicompost to increase organic carbon.";
      let improvements = [
        "Grow green manure crops (e.g., Dhaincha or Sunnhemp) during fallow periods and plow them back into the soil.",
        "Add Gypsum if soil alkalinity rises, or agricultural lime if pH drops below 5.5.",
        "Practice crop rotation with legumes to naturally fix nitrogen."
      ];
      let suitableCrops = ["Wheat", "Soybeans", "Gram / Chickpea"];

      if (n < 40) {
        fertilityScore = 62;
        npkStatus.n = "Critical Deficit";
        compostAdvice = "Immediate addition of nitrogen-rich compost (chicken manure or bio-fertilizers) is required. Apply neem-coated urea in split doses.";
      }
      if (ph < 5.8) {
        organicStatus = "Low";
        improvements.unshift("Soil acidity is high. Apply 200kg/acre of agricultural limestone to neutralize acid conditions.");
      }

      setReport({
        fertilityScore,
        organicStatus,
        npkStatus,
        compostAdvice,
        improvements,
        suitableCrops
      });
      showToast("Soil report generated!", "success");
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1.5">
          <Layers className="w-6 h-6 text-emerald-600" />
          {t('soilAnalysis')}
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Submit soil chemical specifications to generate detailed nutrition and improvement guidelines.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form */}
        <form 
          onSubmit={handleAnalyze}
          className="lg:col-span-5 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col gap-4 shadow-sm"
        >
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Report Input Panel</span>

          {/* pH */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-xs font-bold">
              <label className="text-gray-400 uppercase">Soil pH</label>
              <span className="text-emerald-600 dark:text-emerald-400">{ph.toFixed(1)}</span>
            </div>
            <input
              type="range" min="4" max="9" step="0.1" value={ph}
              onChange={(e) => setPh(parseFloat(e.target.value))}
              className="w-full accent-emerald-600 mt-1"
            />
          </div>

          {/* Nitrogen */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-xs font-bold">
              <label className="text-gray-400 uppercase">Nitrogen (N)</label>
              <span className="text-emerald-600 dark:text-emerald-400">{n} ppm</span>
            </div>
            <input
              type="range" min="10" max="120" value={n}
              onChange={(e) => setN(parseInt(e.target.value))}
              className="w-full accent-emerald-600 mt-1"
            />
          </div>

          {/* Phosphorus */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-xs font-bold">
              <label className="text-gray-400 uppercase">Phosphorus (P)</label>
              <span className="text-emerald-600 dark:text-emerald-400">{p} ppm</span>
            </div>
            <input
              type="range" min="5" max="100" value={p}
              onChange={(e) => setP(parseInt(e.target.value))}
              className="w-full accent-emerald-600 mt-1"
            />
          </div>

          {/* Potassium */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-xs font-bold">
              <label className="text-gray-400 uppercase">Potassium (K)</label>
              <span className="text-emerald-600 dark:text-emerald-400">{k} ppm</span>
            </div>
            <input
              type="range" min="10" max="120" value={k}
              onChange={(e) => setK(parseInt(e.target.value))}
              className="w-full accent-emerald-600 mt-1"
            />
          </div>

          {/* Moisture */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-xs font-bold">
              <label className="text-gray-400 uppercase">Soil Moisture</label>
              <span className="text-emerald-600 dark:text-emerald-400">{moisture}%</span>
            </div>
            <input
              type="range" min="10" max="90" value={moisture}
              onChange={(e) => setMoisture(parseInt(e.target.value))}
              className="w-full accent-emerald-600 mt-1"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold py-3.5 rounded-2xl shadow-md flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Analyzing Soil Samples...
              </>
            ) : (
              <>
                <BarChart2 className="w-5 h-5" />
                Analyze Health
              </>
            )}
          </button>
        </form>

        {/* Right Column: Report display */}
        <div className="lg:col-span-7">
          {report ? (
            <div className="flex flex-col gap-6">
              
              {/* Highlight score */}
              <div className="p-6 rounded-3xl border border-emerald-100 dark:border-emerald-950/30 bg-emerald-500/[0.04] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Soil Fertility Report</span>
                  <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
                    Score: {report.fertilityScore}/100
                  </h2>
                  <p className="text-xs font-medium text-emerald-600 mt-1">
                    Organic Matter Status: <strong className="uppercase">{report.organicStatus}</strong>
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 p-4 rounded-2xl shadow-sm text-xs font-bold grid grid-cols-3 gap-3 min-w-[15rem] text-center">
                  <div className="p-1 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                    <span className="text-[8px] text-gray-400 block uppercase">Nitrogen</span>
                    <span className={`text-[10px] ${report.npkStatus.n.includes('Deficit') ? 'text-rose-500' : 'text-emerald-600'}`}>{report.npkStatus.n}</span>
                  </div>
                  <div className="p-1 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                    <span className="text-[8px] text-gray-400 block uppercase">Phosphorus</span>
                    <span className="text-emerald-600 text-[10px]">{report.npkStatus.p}</span>
                  </div>
                  <div className="p-1 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                    <span className="text-[8px] text-gray-400 block uppercase">Potassium</span>
                    <span className="text-emerald-600 text-[10px]">{report.npkStatus.k}</span>
                  </div>
                </div>
              </div>

              {/* Compost Card */}
              <div className="p-5 rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                  <Sparkles className="w-4.5 h-4.5" />
                  Manure & Compost Advice
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-semibold">
                  {report.compostAdvice}
                </p>
              </div>

              {/* Improvements lists */}
              <div className="p-6 rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm flex flex-col gap-3">
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200">Recommended Land Improvements</span>
                <ul className="space-y-3">
                  {report.improvements.map((imp: string, idx: number) => (
                    <li key={idx} className="flex gap-2.5 items-start text-xs font-semibold text-gray-600 dark:text-gray-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      {imp}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ) : (
            <div className="h-full min-h-[22rem] rounded-3xl border border-dashed border-gray-200 dark:border-slate-850 flex flex-col justify-center items-center p-8 text-center text-gray-400 dark:text-gray-600">
              <Layers className="w-16 h-16 opacity-30 animate-float" />
              <h3 className="font-bold text-gray-600 dark:text-gray-400 mt-4">Awaiting Soil Analysis</h3>
              <p className="text-xs max-w-sm mt-1">
                Enter your soil sample details on the left, then click run to generate organic recommendations.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
export default SoilAnalysis;
