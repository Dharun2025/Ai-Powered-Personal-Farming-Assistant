import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Volume2, X, Play, HelpCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface VoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [speechSupported, setSpeechSupported] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => {
        setIsListening(true);
        setTranscript('Listening...');
      };

      rec.onresult = (event: any) => {
        const resultText = event.results[0][0].transcript;
        setTranscript(resultText);
        handleCommand(resultText);
      };

      rec.onerror = (event: any) => {
        console.error('Speech error:', event.error);
        if (event.error === 'not-allowed') {
          showToast("Microphone permission denied", "error");
        }
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      setRecognition(rec);
    }
  }, []);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel active speaking first
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    } else {
      showToast("Speech synthesis not supported in this browser.", "warning");
    }
  };

  const handleCommand = (text: string) => {
    const cmd = text.toLowerCase().trim();
    showToast(`Command received: "${cmd}"`, "success");

    // Route Navigation
    if (cmd.includes('dashboard') || cmd.includes('home')) {
      speak("Navigating to farm dashboard");
      navigate('/dashboard');
      onClose();
    } else if (cmd.includes('recommend') || cmd.includes('crop')) {
      speak("Opening AI crop recommendation");
      navigate('/recommend');
      onClose();
    } else if (cmd.includes('disease') || cmd.includes('detect') || cmd.includes('diagnose')) {
      speak("Opening crop disease detector");
      navigate('/disease');
      onClose();
    } else if (cmd.includes('weather') || cmd.includes('forecast')) {
      speak("Opening weather forecast and farming advice");
      navigate('/weather');
      onClose();
    } else if (cmd.includes('soil')) {
      speak("Opening soil analysis module");
      navigate('/soil');
      onClose();
    } else if (cmd.includes('irrigation') || cmd.includes('water')) {
      speak("Opening smart irrigation calculator");
      navigate('/irrigation');
      onClose();
    } else if (cmd.includes('price') || cmd.includes('market') || cmd.includes('mandi')) {
      speak("Opening market prices list");
      navigate('/market');
      onClose();
    } else if (cmd.includes('expense') || cmd.includes('finance')) {
      speak("Opening expense tracker");
      navigate('/expenses');
      onClose();
    } else if (cmd.includes('chat') || cmd.includes('assistant') || cmd.includes('question')) {
      speak("Opening AI chatbot assistant");
      navigate('/chat');
      onClose();
    } else if (cmd.includes('about')) {
      speak("Showing about page");
      navigate('/about');
      onClose();
    } else if (cmd.includes('contact')) {
      speak("Opening contact form");
      navigate('/contact');
      onClose();
    }
    // Reading Alerts
    else if (cmd.includes('read alert') || cmd.includes('notification') || cmd.includes('read alert aloud')) {
      speak("You have one critical alert: Heavy rain is expected in your region tonight. Please secure water-sensitive crops immediately.");
    }
    // AI crop advice simulation
    else if (cmd.includes('fertilizer') || cmd.includes('pest')) {
      speak("Opening fertilizer and pest advice panel");
      navigate('/soil');
      onClose();
    } 
    // Generic Question Ask
    else {
      speak(`Searching AgriAI database for ${cmd}. Opening assistant chat.`);
      navigate(`/chat?query=${encodeURIComponent(cmd)}`);
      onClose();
    }
  };

  const startListening = () => {
    if (recognition) {
      try {
        recognition.start();
      } catch (e) {
        recognition.stop();
      }
    } else {
      // Simulate listening for presentation
      setIsListening(true);
      setTranscript("Simulating voice input... Try speaking command.");
      setTimeout(() => {
        const mockCommands = ["go to weather", "check mandi prices", "read alerts", "crop recommendation"];
        const randomCmd = mockCommands[Math.floor(Math.random() * mockCommands.length)];
        setTranscript(randomCmd);
        setIsListening(false);
        handleCommand(randomCmd);
      }, 3000);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
    setIsListening(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md px-4">
      <div className="w-full max-w-md rounded-3xl border border-gray-100 dark:border-slate-800/80 bg-white dark:bg-slate-950 p-6 shadow-2xl animate-[float_0.3s_ease] relative flex flex-col items-center">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 mt-2">
          <Mic className="w-6 h-6 animate-pulse" />
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
          AgriAI Voice Assistant
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-6 text-center max-w-xs">
          {!speechSupported 
            ? "Speech recognition is not fully supported on this device. Click below to simulate a voice command." 
            : "Tap the microphone and speak your farming query or navigation command."}
        </p>

        {/* Status indicator / Transcript */}
        <div className="w-full min-h-[5rem] rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 p-4 mb-6 flex flex-col justify-center items-center">
          {isListening && (
            <div className="flex gap-1.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></span>
            </div>
          )}
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center italic">
            {transcript || '"Go to weather forecast"'}
          </p>
        </div>

        {/* Record / Listen Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={isListening ? stopListening : startListening}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 ${
              isListening 
                ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20' 
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
            }`}
          >
            {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
          </button>
          
          <button
            onClick={() => speak("Hello, I am Agri AI. Speak a command to navigate, or ask a question about crops, weather, or soil health.")}
            className="w-16 h-16 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300 flex items-center justify-center transition-colors"
            title="Listen Intro"
          >
            <Volume2 className="w-7 h-7" />
          </button>
        </div>

        {/* Helper Instructions Accordion / Command Guide */}
        <div className="w-full border-t border-gray-100 dark:border-slate-800/80 pt-4">
          <span className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1.5 justify-center">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-500" />
            Try Saying These Commands:
          </span>
          <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-500 dark:text-gray-400">
            <div className="bg-slate-50 dark:bg-slate-900/50 p-2 rounded-xl border border-gray-100 dark:border-slate-800/20 text-center">
              "Go to <strong>weather</strong>"
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/50 p-2 rounded-xl border border-gray-100 dark:border-slate-800/20 text-center">
              "Check <strong>mandi prices</strong>"
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/50 p-2 rounded-xl border border-gray-100 dark:border-slate-800/20 text-center">
              "Read <strong>alerts</strong> aloud"
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/50 p-2 rounded-xl border border-gray-100 dark:border-slate-800/20 text-center">
              "Open <strong>crop recommendation</strong>"
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
