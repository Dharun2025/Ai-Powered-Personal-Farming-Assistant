import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MessageSquare, Send, Sparkles, User, RefreshCw, HelpCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const Chatbot: React.FC = () => {
  const { t, language } = useLanguage();
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: "1", 
      sender: "ai", 
      text: "Hello! I am your AgriAI Assistant. Ask me anything about crop diseases, fertilizers, weather predictions, mandi prices, or government schemes. I support English, Tamil (தமிழ்), and Hindi (हिन्दी).", 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
  ]);

  // Handle queries redirected from Voice Assistant
  useEffect(() => {
    const voiceQuery = searchParams.get('query');
    if (voiceQuery) {
      handleSendQuery(voiceQuery);
    }
  }, [searchParams]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const qaBot = (query: string): string => {
    const q = query.toLowerCase().trim();

    // Multilingual responses
    if (language === 'ta') {
      if (q.includes('பயிர்') || q.includes('விவசாயம்')) {
        return "உங்கள் மண்ணுக்கு ஏற்ற பயிரைத் தேர்வு செய்ய பயிர் பரிந்துரை பக்கத்தைப் பயன்படுத்தவும். தற்போது வண்டல் மண்ணில் கோதுமை மற்றும் பருப்பு வகைகள் அதிக மகசூல் தரும்.";
      }
      if (q.includes('நோய்') || q.includes('இலை')) {
        return "பயிர் இலைகளில் கரும்புள்ளி அல்லது வாடல் நோய் கண்டறிய எங்களின் இலை நோய் கண்டறிதல் பக்கத்தைப் பயன்படுத்தவும். பாதிக்கப்பட்ட இலைகளை கவாத்து செய்து வேப்ப எண்ணெய் தெளிக்கவும்.";
      }
      if (q.includes('திட்டம்') || q.includes('அரசு')) {
        return "பிரதமரின் கிசான் சம்மன் நிதி (PM-KISAN) திட்டத்தின் கீழ் தகுதியான விவசாயிகளுக்கு ஆண்டுக்கு ₹6,000 மூன்று தவணைகளாக வழங்கப்படுகிறது. உங்கள் அருகிலுள்ள கூட்டுறவு வங்கியை அணுகவும்.";
      }
      return "மன்னிக்கவும், அக்ரிAI தரவுத்தளத்தில் இதற்கு நேரடி பதில் இல்லை. கோதுமை சாகுபடி, உரம் அல்லது அரசு திட்டங்கள் பற்றி கேட்க முயற்சிக்கவும்.";
    }

    if (language === 'hi') {
      if (q.includes('फसल') || q.includes('खेती')) {
        return "मिट्टी के स्वास्थ्य के अनुसार सही फसल का चयन करने के लिए फसल सिफारिश का उपयोग करें। रबी मौसम में गेहूं और सरसों की बुवाई उत्तम मानी जाती है।";
      }
      if (q.includes('बीमारी') || q.includes('पत्ता')) {
        return "पत्तियों में रोग या कीड़े की पहचान के लिए रोग पहचान मॉड्यूल में पत्ती की तस्वीर अपलोड करें। जैविक उपचार के लिए नीम के तेल का छिड़काव करें।";
      }
      if (q.includes('योजना') || q.includes('सरकार')) {
        return "पीएम-किसान योजना के तहत सीमांत किसानों को ₹6,000 वार्षिक सहायता दी जाती है। आप जन सेवा केंद्र (CSC) में जाकर अपना पंजीकरण करा सकते हैं।";
      }
      return "क्षमा करें, मेरे पास इसके लिए सटीक जानकारी नहीं है। कृपया खाद की मात्रा, फसल चक्र या मौसम के बारे में पूछें।";
    }

    // Default English
    if (q.includes('wheat') || q.includes('grain')) {
      return "Wheat is a winter (Rabi) crop sown from November to December. It prefers loamy or clayey soils with a pH of 6.0 to 7.5 and requires 4-5 irrigation cycles.";
    }
    if (q.includes('disease') || q.includes('rust') || q.includes('blight')) {
      return "Fungal disease like Early Blight can be treated organically using a copper-hydroxide spray or a mixture of baking soda and water. Please check our Disease Detector page for image diagnostics.";
    }
    if (q.includes('mandi') || q.includes('price') || q.includes('rate')) {
      return "Current Mandi rates: Wheat is trading around ₹2,450/quintal (+1.2%), Potatoes at ₹1,800/quintal (+2.1%), and Basmati Rice at ₹6,200/quintal (-1.8%).";
    }
    if (q.includes('scheme') || q.includes('government') || q.includes('subsidy')) {
      return "Key active schemes: 1. PM-KISAN (Direct income support of ₹6,000/year). 2. PM Fasal Bima Yojana (Crop Insurance with low premiums). 3. KCC (Kisan Credit Card for short-term farm credit at 4% interest).";
    }
    if (q.includes('fertilizer') || q.includes('npk') || q.includes('urea')) {
      return "For grain crops, a base N-P-K fertilizer ratio of 12:32:16 or Urea (for vegetative nitrogen) is ideal. Organic options include neem cake, vermicompost, and liquid fish emulsion.";
    }

    return "I've logged your query. To get detailed soil suggestions, try the Crop Recommender page. Or ask about: 'Government schemes', 'Wheat sowing', 'Mandi prices', or 'Tomato blight cures'.";
  };

  const handleSendQuery = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(36).substring(2, 9),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const aiReply = qaBot(textToSend);
      const aiMsg: Message = {
        id: Math.random().toString(36).substring(2, 9),
        sender: 'ai',
        text: aiReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1200);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendQuery(input);
  };

  const sampleQueries = [
    "What are active government schemes?",
    "When to sow wheat crop?",
    "Organic treatment for leaf blight",
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto h-[calc(100vh-8rem)]">
      
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1.5">
            <MessageSquare className="w-6 h-6 text-emerald-600" />
            {t('chatbot')}
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Multilingual agricultural assistant for answering soil, crop, mandi, and fertilizer questions.
          </p>
        </div>
      </div>

      <div className="flex-1 rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col overflow-hidden shadow-sm">
        
        {/* Messages container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 no-scrollbar">
          {messages.map((m) => (
            <div 
              key={m.id}
              className={`flex items-start gap-3 w-full max-w-[85%] ${
                m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-xs uppercase ${
                m.sender === 'ai' 
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400' 
                  : 'bg-slate-100 dark:bg-slate-900 text-gray-600 dark:text-gray-300'
              }`}>
                {m.sender === 'ai' ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div className={`p-4 rounded-2xl text-xs font-semibold leading-relaxed shadow-sm border ${
                m.sender === 'ai'
                  ? 'bg-emerald-50/[0.04] border-emerald-150/10 text-gray-800 dark:text-gray-200'
                  : 'bg-slate-50 dark:bg-slate-900/40 border-slate-100 dark:border-slate-800 text-gray-800 dark:text-gray-200'
              }`}>
                <p>{m.text}</p>
                <span className="text-[8px] text-gray-400 block mt-1.5 text-right">{m.time}</span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 w-fit">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 flex items-center justify-center">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <span className="text-xs text-gray-400 font-bold">Analyzing query...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick query chips */}
        <div className="px-4 py-2 border-t border-gray-50 dark:border-slate-800/40 flex flex-wrap gap-2">
          {sampleQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendQuery(q)}
              className="text-[10px] font-bold text-emerald-600 dark:text-emerald-450 border border-emerald-100 dark:border-emerald-900/30 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 px-3 py-1.5 rounded-full transition-all flex items-center gap-1"
            >
              {q} <ArrowRight className="w-3 h-3" />
            </button>
          ))}
        </div>

        {/* Input box */}
        <form onSubmit={handleFormSubmit} className="p-3 border-t border-gray-150 dark:border-slate-800 flex gap-2">
          <input
            type="text"
            required
            placeholder="Type your agricultural question here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-3 rounded-2xl border border-gray-250 dark:border-slate-800 bg-transparent text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-2xl transition-all shadow-md shadow-emerald-500/10"
          >
            <Send className="w-4.5 h-4.5" />
          </button>
        </form>

      </div>

    </div>
  );
};
export default Chatbot;
