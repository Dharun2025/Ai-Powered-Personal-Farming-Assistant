import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldAlert } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Query');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !msg) {
      showToast("Please fill in all required fields", "warning");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("Message sent successfully! Our agronomic team will reply within 24 hours.", "success");
      setName('');
      setEmail('');
      setMsg('');
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-10 w-full max-w-5xl mx-auto py-6">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">Contact AgriAI Support</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Have questions about the crop models or facing database sync issues? Get in touch with our team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form */}
        <form 
          onSubmit={handleSend}
          className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col gap-4 shadow-sm"
        >
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Send Us A Message</span>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase">Your Name *</label>
              <input
                type="text" required placeholder="Name" value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-slate-850 bg-transparent text-xs"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase">Email Address *</label>
              <input
                type="email" required placeholder="Email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-slate-850 bg-transparent text-xs"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase">Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-slate-850 bg-transparent text-xs text-gray-650 dark:text-gray-300"
            >
              <option value="General Query">General Query</option>
              <option value="Model Feedback">Crop Model Feedback</option>
              <option value="Report Bug">Technical Support / Bug</option>
              <option value="Commercial">Commercial / Partnership</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase">Message Content *</label>
            <textarea
              required placeholder="Enter your detailed query or feedback..." rows={5} value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-slate-850 bg-transparent text-xs leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-1.5 text-xs mt-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4" /> Send Message
          </button>
        </form>

        {/* Right Column: Address and Map */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Contact Details */}
          <div className="p-6 rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm flex flex-col gap-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Office Directories</span>
            
            <div className="space-y-4 text-xs font-semibold text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-900 text-emerald-600 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-450 block uppercase">Helpline (Toll-Free)</p>
                  <span>1800-419-AGRI (2474)</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-900 text-emerald-600 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-450 block uppercase">Email Support</p>
                  <span>support@agriai.com</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-900 text-emerald-600 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-450 block uppercase">AgriAI Headquarters</p>
                  <span>Sector 32, Agronomy Avenue, Ludhiana, Punjab, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps mock placeholder */}
          <div className="rounded-3xl border border-gray-150 dark:border-slate-850 overflow-hidden relative shadow-sm aspect-square max-h-56 bg-slate-100 dark:bg-slate-900 flex flex-col items-center justify-center p-4 text-center">
            {/* Visual map outline simulation */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <MapPin className="w-10 h-10 text-emerald-600 animate-[float_4s_infinite] mb-2 relative z-10" />
            <h4 className="text-xs font-bold text-gray-700 dark:text-gray-250 relative z-10">Ludhiana Agricultural Center</h4>
            <span className="text-[9px] text-gray-400 mt-1 relative z-10">Sector 32, Chandigarh Road, PB</span>
          </div>

        </div>

      </div>

    </div>
  );
};
export default ContactPage;
