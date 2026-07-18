import React, { useState, useRef } from 'react';
import { Scan, Upload, Camera, AlertTriangle, ArrowRight, ShieldCheck, RefreshCw, X, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

export const DiseaseDetector: React.FC = () => {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [cameraActive, setCameraActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sample leaf thumbnail pictures to click for easy testing
  const sampleLeaves = [
    { name: "Tomato Blight", url: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=120&auto=format&fit=crop&q=60" },
    { name: "Rice Blast", url: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=120&auto=format&fit=crop&q=60" },
    { name: "Wheat Rust", url: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=120&auto=format&fit=crop&q=60" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setResult(null); // Clear previous diagnosis
        showToast("Image uploaded successfully!", "success");
      };
      reader.readAsDataURL(file);
    }
  };

  const selectSample = (url: string, name: string) => {
    setImage(url);
    setResult(null);
    showToast(`Loaded sample leaf for: ${name}`, "info");
  };

  // Start actual webcam
  const startCamera = async () => {
    setCameraActive(true);
    setResult(null);
    setImage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access failed:", err);
      // Simulate webcam if blocked/unsupported
      showToast("Webcam blocked or not available. Using camera simulation mode.", "warning");
    }
  };

  const capturePhoto = () => {
    // If real video stream, capture canvas frame
    if (videoRef.current && videoRef.current.srcObject) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImage(dataUrl);
        // Stop stream tracks
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        setCameraActive(false);
        showToast("Leaf snapshot captured!", "success");
      }
    } else {
      // Camera simulation capture
      setImage("https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=400&auto=format&fit=crop&q=80");
      setCameraActive(false);
      showToast("Leaf snapshot captured (Simulation)!", "success");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setCameraActive(false);
  };

  const handleDiagnose = () => {
    if (!image) {
      showToast("Please upload or capture an image first", "warning");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      
      // Determine crop disease diagnosis mockup based on state
      let disease = "Tomato Early Blight";
      let confidence = 96;
      let desc = "Early blight is a common fungal disease caused by Alternaria solani. It targets leaves, stems, and fruits, significantly lowering photosynthetic yield.";
      let symptoms = "Brown to black spots with concentric rings (target-like) appearing first on older lower leaves. Surrounding tissue yellowing and eventual defoliation.";
      let causes = "High humidity (wet leaves) and warm temperatures (24-29°C) combined with spores overwintering in soil debris.";
      let organic = "Prune lower leaves to enhance airflow. Spray copper-based organic fungicides or a organic mixture of baking soda and neem oil every 7-10 days.";
      let chemical = "Apply Chlorothalonil or Mancozeb protective fungicides according to guidelines.";

      // Custom check for sample selections
      if (image.includes("530595467537-0b5996c41f2d")) {
        disease = "Rice Blast Disease";
        confidence = 91;
        desc = "Rice Blast is a destructive fungal infection caused by Magnaporthe oryzae. It can infect foliage, leaf sheaths, nodes, and panicles, completely wiping out yield.";
        symptoms = "Diamond or spindle-shaped leaf spots with gray/white centers and brown/red borders. Stems rot near the nodes.";
        causes = "High nitrogen levels in soil, high humidity, wet canopy, and cool night temperatures.";
        organic = "Ensure proper crop spacing, burn crop residues post-harvest, and avoid excess nitrogen fertilization.";
        chemical = "Apply Tricyclazole or Azoxystrobin systemic fungicides.";
      } else if (image.includes("574323347407-f5e1ad6d020b")) {
        disease = "Wheat Leaf Rust";
        confidence = 89;
        desc = "Leaf rust is caused by the fungus Puccinia triticina. It is the most prevalent rust disease in wheat, forming powdery orange spores on blades.";
        symptoms = "Small, oval, orange-brown pustules scattered randomly across the upper leaf blades.";
        causes = "Wind-blown spores traveling long distances combined with light rain or heavy dew.";
        organic = "Sow certified rust-resistant wheat varieties. Remove volunteer weed hosts near fields.";
        chemical = "Spray Triazole-class fungicides (e.g. Propiconazole or Tebuconazole) early during rust spotting.";
      }

      setResult({
        disease,
        confidence,
        desc,
        symptoms,
        causes,
        organic,
        chemical,
        actions: [
          "Quarantine infected plants if growing in greenhouse trays.",
          "Avoid overhead sprinkler irrigation (irrigate at ground level).",
          "Sanitize hands and pruning tools after handling infected crop foliage."
        ]
      });
      showToast("Leaf diagnosis complete!", "success");
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1.5">
          <Scan className="w-6 h-6 text-emerald-600" />
          {t('diseaseDetect')}
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Take a photo or upload crop leaf pictures to instantly identify pests, blights, and diseases.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Upload Card / Camera Panel */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="p-6 rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm flex flex-col gap-4">
            
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Crop leaf Image Input</span>

            {/* Webcam viewfinder */}
            {cameraActive ? (
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className="w-full h-full object-cover scale-x-[-1]"
                />
                <div className="absolute inset-0 border-2 border-emerald-500/50 pointer-events-none flex items-center justify-center">
                  <div className="w-48 h-48 border border-dashed border-emerald-400 opacity-60"></div>
                </div>
                <div className="absolute bottom-4 flex gap-3 z-10">
                  <button
                    onClick={capturePhoto}
                    className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg flex items-center gap-1.5"
                  >
                    <Camera className="w-4 h-4" />
                    Capture
                  </button>
                  <button
                    onClick={stopCamera}
                    className="bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* Image display drop-zone */
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`relative aspect-video w-full rounded-2xl border-2 border-dashed flex flex-col justify-center items-center p-6 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/10 transition-all ${
                  image 
                    ? 'border-emerald-500/30' 
                    : 'border-gray-200 dark:border-slate-850 text-gray-400 hover:border-emerald-500/30'
                }`}
              >
                {image ? (
                  <>
                    <img 
                      src={image} 
                      alt="Crop Leaf Preview" 
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                    />
                    <button
                      onClick={(e) => { e.stopPropagation(); setImage(null); setResult(null); }}
                      className="absolute top-2.5 right-2.5 p-1 bg-slate-900/60 text-white rounded-full hover:bg-slate-900 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-gray-300 dark:text-gray-600 mb-3 animate-[float_4s_infinite]" />
                    <p className="text-xs font-bold text-gray-700 dark:text-gray-300">{t('uploadPrompt')}</p>
                    <span className="text-[10px] text-gray-400 mt-1">Supports JPEG, PNG up to 5MB</span>
                  </>
                )}
              </div>
            )}

            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileChange}
            />

            {/* Buttons for Camera trigger & Diagnosis */}
            {!cameraActive && (
              <div className="flex gap-3">
                <button
                  onClick={startCamera}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 text-xs font-bold py-3 rounded-2xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <Camera className="w-4 h-4 text-emerald-600" />
                  {t('cameraCapture')}
                </button>

                <button
                  onClick={handleDiagnose}
                  disabled={loading || !image}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-xs font-bold py-3 rounded-2xl shadow-md transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Scan className="w-4 h-4" />
                      {t('btnDiagnose')}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Quick Demo leaf samples select */}
          <div className="p-5 rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm flex flex-col gap-3">
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Demo Leaf Samples (Quick Test)</span>
            <div className="flex gap-3">
              {sampleLeaves.map((sample, idx) => (
                <div 
                  key={idx}
                  onClick={() => selectSample(sample.url, sample.name)}
                  className="flex-1 cursor-pointer flex flex-col items-center gap-1 group"
                >
                  <img 
                    src={sample.url} 
                    alt={sample.name} 
                    className="w-full aspect-square object-cover rounded-xl border border-gray-100 dark:border-slate-800 group-hover:border-emerald-500 transition-colors"
                  />
                  <span className="text-[9px] font-bold text-gray-500 dark:text-gray-400 group-hover:text-emerald-600">{sample.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Diagnosis Results Column */}
        <div className="lg:col-span-7">
          {result ? (
            <div className="flex flex-col gap-6">
              
              {/* Highlight Diagnosis */}
              <div className="p-6 rounded-3xl border border-rose-100 dark:border-rose-950/30 bg-rose-500/[0.04] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 translate-x-12 -translate-y-8 pointer-events-none text-rose-500">
                  <AlertTriangle className="w-56 h-56" />
                </div>
                
                <div className="relative z-10 flex flex-col gap-1">
                  <span className="text-[10px] font-extrabold text-rose-600 dark:text-rose-400 uppercase tracking-widest">{t('resultDiagnosis')}</span>
                  <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight">
                    {result.disease}
                  </h2>
                  <div className="flex items-center gap-1.5 mt-2 bg-rose-100 dark:bg-rose-950/80 px-3 py-1 rounded-full text-rose-800 dark:text-rose-300 w-fit text-xs font-bold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {result.confidence}% Confidence
                  </div>
                </div>

                <div className="relative z-10 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 p-4 rounded-2xl shadow-sm text-xs font-semibold max-w-xs leading-relaxed text-gray-500 dark:text-gray-400">
                  {result.desc}
                </div>
              </div>

              {/* Grid of Symptoms & Causes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col gap-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">{t('symptoms')}</span>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                    {result.symptoms}
                  </p>
                </div>
                <div className="p-5 rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col gap-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">{t('causes')}</span>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                    {result.causes}
                  </p>
                </div>
              </div>

              {/* Treatments Panel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-emerald-100 dark:border-emerald-950/20 bg-emerald-500/[0.02] flex flex-col gap-2">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">{t('treatmentOrganic')}</span>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                    {result.organic}
                  </p>
                </div>
                <div className="p-5 rounded-2xl border border-blue-100 dark:border-blue-950/20 bg-blue-500/[0.02] flex flex-col gap-2">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">{t('treatmentChemical')}</span>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                    {result.chemical}
                  </p>
                </div>
              </div>

              {/* Recommended Actions Check list */}
              <div className="p-6 rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm flex flex-col gap-3">
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  Recommended Protection Protocol
                </span>
                <ul className="space-y-2">
                  {result.actions.map((act: string, idx: number) => (
                    <li key={idx} className="flex gap-2 items-start text-xs font-semibold text-gray-600 dark:text-gray-300 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                      {act}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ) : (
            <div className="h-full min-h-[22rem] rounded-3xl border border-dashed border-gray-200 dark:border-slate-850 flex flex-col justify-center items-center p-8 text-center text-gray-400 dark:text-gray-600">
              <Scan className="w-16 h-16 opacity-30 animate-[float_4s_infinite]" />
              <h3 className="font-bold text-gray-600 dark:text-gray-400 mt-4">Awaiting Crop leaf Image</h3>
              <p className="text-xs max-w-sm mt-1">
                Upload a photo or capture one using your webcam/device camera. Alternatively, click one of our sample leaf templates on the left for testing.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
export default DiseaseDetector;
