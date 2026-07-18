import React from 'react';
import { ShieldCheck, Compass, Users, Sparkles, BookOpen, Layers } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Compass,
      title: "Our Vision",
      desc: "To empower every farmer globally with modern, accessible, and high-fidelity artificial intelligence, building a climate-resilient and sustainable food supply chain.",
      color: "bg-emerald-500/10 text-emerald-600"
    },
    {
      icon: ShieldCheck,
      title: "Our Mission",
      desc: "To deliver real-time leaf diagnostic solutions, soil chemistry analyses, and mandi pricing indexation through a simple, responsive offline-friendly mobile framework.",
      color: "bg-teal-500/10 text-teal-600"
    },
    {
      icon: Sparkles,
      title: "Innovation Focus",
      desc: "Applying cutting-edge deep learning, speech command integration, and sensor telemetry analysis to democratize modern agronomic consultancy.",
      color: "bg-amber-500/10 text-amber-500"
    }
  ];

  const technologies = [
    { name: "React 18 & Vite", desc: "Single page app compilation" },
    { name: "TypeScript", desc: "Type-safe robust coding interfaces" },
    { name: "Tailwind CSS", desc: "Glassmorphism styling utility" },
    { name: "Recharts", desc: "Interactive SVG data charts" },
    { name: "Node.js & Express", desc: "API handler routes backend" },
    { name: "MongoDB & Mongoose", desc: "Agricultural records database" },
  ];

  return (
    <div className="flex flex-col gap-10 w-full max-w-5xl mx-auto py-6">
      
      {/* Hero section */}
      <div className="text-center max-w-3xl mx-auto flex flex-col gap-3">
        <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">Cultivating the Future</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight leading-snug">
          Empowering Agriculture through Artificial Intelligence
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mt-2">
          AgriAI is a comprehensive personal farming platform designed to guide farmers, experts, and agronomists toward data-driven, sustainable cultivation practices.
        </p>
      </div>

      {/* Vision, Mission, Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {values.map((v, idx) => {
          const Icon = v.icon;
          return (
            <div key={idx} className="p-6 rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-11 h-11 rounded-2xl ${v.color} flex items-center justify-center`}>
                <Icon className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-base font-bold text-gray-800 dark:text-gray-250">{v.title}</h3>
              <p className="text-xs text-gray-505 dark:text-gray-400 leading-relaxed">{v.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Objectives */}
      <div className="p-8 rounded-3xl border border-emerald-100 dark:border-emerald-950/20 bg-emerald-500/[0.02] grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-2">Our Commitments</span>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-150 mb-4">Core Platform Objectives</h2>
          <ul className="space-y-3.5 text-xs font-semibold text-gray-600 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
              Reduce crop losses by diagnosing leaf spots and powdery mildew at initial onset stages.
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
              Combat water wastage via personalized soil moisture evaporation calculators.
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
              Stabilize farmer financial logs with categorizations of seeds, logistics, and labor assets.
            </li>
          </ul>
        </div>

        <div className="flex flex-col justify-center gap-4 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 p-6 rounded-2xl shadow-sm">
          <h3 className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-600" />
            Platform Technologies
          </h3>
          <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
            {technologies.map((t, idx) => (
              <div key={idx} className="flex flex-col gap-0.5 border-l border-emerald-500/25 pl-2.5">
                <span className="text-gray-800 dark:text-gray-200">{t.name}</span>
                <span className="text-[9px] text-gray-400">{t.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
export default AboutPage;
