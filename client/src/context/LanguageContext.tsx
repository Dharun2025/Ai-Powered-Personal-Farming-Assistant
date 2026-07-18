import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ta' | 'hi';

type Translations = Record<string, string>;

const dictionary: Record<Language, Translations> = {
  en: {
    // Nav
    brand: "AgriAI",
    dashboard: "Dashboard",
    cropRecommend: "Crop Recommendation",
    diseaseDetect: "Disease Detection",
    weather: "Weather Forecast",
    soilAnalysis: "Soil Analysis",
    smartIrrigation: "Smart Irrigation",
    fertilizerRecommend: "Fertilizer Recommendation",
    pestManage: "Pest Management",
    cropCalendar: "Crop Calendar",
    marketPrices: "Market Prices",
    chatbot: "AI Assistant",
    reports: "Reports & Analytics",
    expenseTracker: "Expense Tracker",
    adminDashboard: "Admin Panel",
    about: "About",
    contact: "Contact",
    logout: "Logout",
    login: "Login",
    register: "Register",

    // Common
    submit: "Submit",
    loading: "Loading...",
    success: "Success",
    error: "Error",
    save: "Save",
    delete: "Delete",
    cancel: "Cancel",
    search: "Search...",
    filter: "Filter",
    language: "Language",
    theme: "Theme",
    voiceCommand: "Voice Assistant",

    // Landing Page
    heroTitle: "Grow Smarter with AI",
    heroSubtitle: "Optimize your farm yield, detect crop diseases instantly, track soil nutrient levels, and access live market prices using cutting-edge artificial intelligence.",
    getStarted: "Get Started",
    learnMore: "Learn More",
    featuresTitle: "Why Choose AgriAI?",
    featuresSubtitle: "Equipping farmers with modern technology for higher efficiency and sustainable agriculture.",
    statFarmers: "Active Farmers",
    statAccuracy: "AI Accuracy",
    statCrops: "Supported Crops",
    faqTitle: "Frequently Asked Questions",
    footerText: "© 2026 AgriAI. Empowering sustainable farming.",

    // Dashboard
    welcome: "Welcome Back, Farmer!",
    farmOverview: "Farm Overview",
    todayWeather: "Today's Weather",
    soilHealth: "Soil Health Status",
    expensesSummary: "Expenses & Profit",
    cropStatus: "Crop Development",
    upcomingReminders: "Upcoming Reminders",
    activeCrops: "Active Crops",
    soilMoisture: "Soil Moisture",
    humidity: "Humidity",
    temp: "Temperature",
    nitrogen: "Nitrogen",
    phosphorus: "Phosphorus",
    potassium: "Potassium",
    waterUsage: "Water Usage",

    // Crop Recommender Form
    soilType: "Soil Type",
    soilPH: "Soil pH (0-14)",
    rainfall: "Expected Rainfall (mm)",
    season: "Season",
    budget: "Budget (INR)",
    irrigation: "Irrigation Availability",
    location: "Location / Region",
    btnRecommend: "Get AI Recommendation",
    resultBestCrop: "Best Crop Choice",
    resultYield: "Expected Yield",
    resultProfit: "Estimated Profit",
    resultSchedule: "Planting & Harvest Schedule",

    // Disease Detector
    diseaseTitle: "AI Plant Disease Detection",
    uploadPrompt: "Drag & drop an image of your crop here, or click to browse",
    cameraCapture: "Use Device Camera",
    btnDiagnose: "Analyze Crop Health",
    resultDiagnosis: "AI Diagnosis Results",
    symptoms: "Symptoms",
    causes: "Causes",
    prevention: "Prevention Steps",
    treatmentOrganic: "Organic Treatment",
    treatmentChemical: "Chemical Treatment",
  },
  ta: {
    // Nav
    brand: "அக்ரிAI (AgriAI)",
    dashboard: "டாஷ்போர்டு",
    cropRecommend: "பயிர் பரிந்துரை",
    diseaseDetect: "நோய் கண்டறிதல்",
    weather: "வானிலை அறிக்கை",
    soilAnalysis: "மண் பகுப்பாய்வு",
    smartIrrigation: "ஸ்மார்ட் பாசனம்",
    fertilizerRecommend: "உர பரிந்துரை",
    pestManage: "பூச்சி மேலாண்மை",
    cropCalendar: "பயிர் காலண்டர்",
    marketPrices: "சந்தை விலைகள்",
    chatbot: "AI உதவியாளர்",
    reports: "அறிக்கைகள்",
    expenseTracker: "செலவு கண்காணிப்பு",
    adminDashboard: "நிர்வாக குழு",
    about: "எங்களை பற்றி",
    contact: "தொடர்பு",
    logout: "வெளியேறு",
    login: "உள்நுழை",
    register: "பதிவு செய்",

    // Common
    submit: "சமர்ப்பி",
    loading: "ஏற்றப்படுகிறது...",
    success: "வெற்றி",
    error: "பிழை",
    save: "சேமி",
    delete: "நீக்கு",
    cancel: "ரத்து செய்",
    search: "தேடுக...",
    filter: "வடிகட்டி",
    language: "மொழி",
    theme: "தீம்",
    voiceCommand: "குரல் உதவியாளர்",

    // Landing Page
    heroTitle: "AI தொழில்நுட்பத்துடன் சிறந்த முறையில் விவசாயம் செய்யுங்கள்",
    heroSubtitle: "நவீன செயற்கை நுண்ணறிவை பயன்படுத்தி உங்கள் பண்ணை மகசூலை மேம்படுத்துங்கள், பயிர் நோய்களை உடனுக்குடன் கண்டறியுங்கள், மண்ணின் ஊட்டச்சத்து அளவைக் கண்காணிக்கவும், சந்தை விலைகளை அறியவும்.",
    getStarted: "தொடங்குங்கள்",
    learnMore: "மேலும் அறிய",
    featuresTitle: "ஏன் அக்ரிAI ஐ தேர்வு செய்ய வேண்டும்?",
    featuresSubtitle: "விவசாயிகளுக்கு அதிக செயல்திறன் மற்றும் நிலையான விவசாயத்திற்கான நவீன தொழில்நுட்பத்தை வழங்குதல்.",
    statFarmers: "செயலில் உள்ள விவசாயிகள்",
    statAccuracy: "AI துல்லியம்",
    statCrops: "ஆதரிக்கப்படும் பயிர்கள்",
    faqTitle: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    footerText: "© 2026 அக்ரிAI. நிலையான விவசாயத்தை மேம்படுத்துதல்.",

    // Dashboard
    welcome: "மீண்டும் வருக, விவசாயி தோழரே!",
    farmOverview: "பண்ணை கண்ணோட்டம்",
    todayWeather: "இன்றைய வானிலை",
    soilHealth: "மண்ணின் ஆரோக்கிய நிலை",
    expensesSummary: "செலவு மற்றும் லாபம்",
    cropStatus: "பயிர் வளர்ச்சி",
    upcomingReminders: "வரவிருக்கும் நினைவூட்டல்கள்",
    activeCrops: "செயலில் உள்ள பயிர்கள்",
    soilMoisture: "மண் ஈரப்பதம்",
    humidity: "ஈரப்பதம்",
    temp: "வெப்பநிலை",
    nitrogen: "நைட்ரஜன்",
    phosphorus: "பாஸ்பரஸ்",
    potassium: "பொட்டாசியம்",
    waterUsage: "நீர் பயன்பாடு",

    // Crop Recommender Form
    soilType: "மண் வகை",
    soilPH: "மண் pH (0-14)",
    rainfall: "எதிர்பார்க்கப்படும் மழைப்பொழிவு (மிமீ)",
    season: "பருவம்",
    budget: "பட்ஜெட் (INR)",
    irrigation: "பாசன வசதி",
    location: "இடம் / பகுதி",
    btnRecommend: "AI பரிந்துரையைப் பெறுங்கள்",
    resultBestCrop: "சிறந்த பயிர் தேர்வு",
    resultYield: "எதிர்பார்க்கப்படும் மகசூல்",
    resultProfit: "மதிப்பிடப்பட்ட லாபம்",
    resultSchedule: "நடவு மற்றும் அறுவடை அட்டவணை",

    // Disease Detector
    diseaseTitle: "AI பயிர் நோய் கண்டறிதல்",
    uploadPrompt: "உங்கள் பயிரின் படத்தை இங்கே இழுத்துப் போடவும் அல்லது உலாவ கிளிக் செய்யவும்",
    cameraCapture: "கேமராவைப் பயன்படுத்தவும்",
    btnDiagnose: "பயிர் ஆரோக்கியத்தை பகுப்பாய்வு செய்க",
    resultDiagnosis: "AI நோய் கண்டறிதல் முடிவுகள்",
    symptoms: "அறிகுறிகள்",
    causes: "காரணங்கள்",
    prevention: "தடுப்பு முறைகள்",
    treatmentOrganic: "இயற்கை சிகிச்சை",
    treatmentChemical: "இரசாயன சிகிச்சை",
  },
  hi: {
    // Nav
    brand: "कृषिAI (AgriAI)",
    dashboard: "डैशबोर्ड",
    cropRecommend: "फसल सिफारिश",
    diseaseDetect: "रोग की पहचान",
    weather: "मौसम का पूर्वानुमान",
    soilAnalysis: "मिट्टी विश्लेषण",
    smartIrrigation: "स्मार्ट सिंचाई",
    fertilizerRecommend: "उर्वरक सिफारिश",
    pestManage: "कीट प्रबंधन",
    cropCalendar: "फसल कैलेंडर",
    marketPrices: "मंडी भाव",
    chatbot: "AI सहायक",
    reports: "रिपोर्ट और विश्लेषण",
    expenseTracker: "खर्च ट्रैकर",
    adminDashboard: "एडमिन पैनल",
    about: "हमारे बारे में",
    contact: "संपर्क करें",
    logout: "लॉगआउट",
    login: "लॉगिन",
    register: "पंजीकरण",

    // Common
    submit: "जमा करें",
    loading: "लोड हो रहा है...",
    success: "सफलता",
    error: "त्रुटि",
    save: "सहेजें",
    delete: "हटाएं",
    cancel: "रद्द करें",
    search: "खोजें...",
    filter: "फ़िल्टर",
    language: "भाषा",
    theme: "थीम",
    voiceCommand: "आवाज सहायक",

    // Landing Page
    heroTitle: "AI के साथ स्मार्ट खेती करें",
    heroSubtitle: "कृत्रिम बुद्धिमत्ता (AI) का उपयोग करके अपनी फसल की पैदावार बढ़ाएं, बीमारियों का तुरंत पता लगाएं, मिट्टी के पोषक तत्वों की जांच करें और मंडी के ताज़ा भाव जानें।",
    getStarted: "शुरू करें",
    learnMore: "और जानें",
    featuresTitle: "कृषिAI क्यों चुनें?",
    featuresSubtitle: "किसानों को उच्च दक्षता और सतत कृषि के लिए आधुनिक तकनीक से लैस करना।",
    statFarmers: "सक्रिय किसान",
    statAccuracy: "AI सटीकता",
    statCrops: "समर्थित फसलें",
    faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
    footerText: "© 2026 कृषिAI. सतत खेती को बढ़ावा।",

    // Dashboard
    welcome: "आपका स्वागत है, किसान भाई!",
    farmOverview: "खेत का अवलोकन",
    todayWeather: "आज का मौसम",
    soilHealth: "मिट्टी का स्वास्थ्य",
    expensesSummary: "व्यय और लाभ",
    cropStatus: "फसल का विकास",
    upcomingReminders: "आने वाले अनुस्मारक",
    activeCrops: "सक्रिय फसलें",
    soilMoisture: "नमी का स्तर",
    humidity: "आर्द्रता",
    temp: "तापमान",
    nitrogen: "नाइट्रोजन",
    phosphorus: "फास्फोरस",
    potassium: "पोटेशियम",
    waterUsage: "पानी का उपयोग",

    // Crop Recommender Form
    soilType: "मिट्टी का प्रकार",
    soilPH: "मिट्टी का पीएच (0-14)",
    rainfall: "अनुमानित वर्षा (मिमी)",
    season: "मौसम",
    budget: "बजट (INR)",
    irrigation: "सिंचाई की उपलब्धता",
    location: "स्थान / क्षेत्र",
    btnRecommend: "AI सिफारिश प्राप्त करें",
    resultBestCrop: "सर्वश्रेष्ठ फसल विकल्प",
    resultYield: "अपेक्षित उपज",
    resultProfit: "अनुमानित लाभ",
    resultSchedule: "बोने और काटने का समय",

    // Disease Detector
    diseaseTitle: "AI फसल रोग पहचान",
    uploadPrompt: "अपनी फसल की तस्वीर यहाँ खींचें या ब्राउज़ करने के लिए क्लिक करें",
    cameraCapture: "कैमरे का उपयोग करें",
    btnDiagnose: "फसल स्वास्थ्य का विश्लेषण करें",
    resultDiagnosis: "AI निदान परिणाम",
    symptoms: "लक्षण",
    causes: "कारण",
    prevention: "बचाव के उपाय",
    treatmentOrganic: "जैविक उपचार",
    treatmentChemical: "रासायनिक उपचार",
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('agri_lang');
    if (saved === 'en' || saved === 'ta' || saved === 'hi') return saved;
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('agri_lang', lang);
  };

  const t = (key: string): string => {
    return dictionary[language]?.[key] || dictionary['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
