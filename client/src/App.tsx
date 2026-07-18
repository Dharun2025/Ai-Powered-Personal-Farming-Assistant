import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { VoiceAssistant } from './components/VoiceAssistant';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';

// Pages
import { LandingPage } from './pages/LandingPage';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { CropRecommender } from './pages/CropRecommender';
import { DiseaseDetector } from './pages/DiseaseDetector';
import { WeatherForecast } from './pages/WeatherForecast';
import { SoilAnalysis } from './pages/SoilAnalysis';
import { SmartIrrigation } from './pages/SmartIrrigation';
import { MarketPrices } from './pages/MarketPrices';
import { ExpenseTracker } from './pages/ExpenseTracker';
import { Chatbot } from './pages/Chatbot';
import { AdminDashboard } from './pages/AdminDashboard';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

// Protected Route check
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('agri_token');
  if (!token) {
    // If not authenticated, redirect to /auth
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
};

// Main Layout Wrapper
const AppLayout: React.FC<{ children: React.ReactNode; sidebarOpen: boolean; setSidebarOpen: (val: boolean) => void; setVoiceOpen: (val: boolean) => void }> = ({ 
  children, sidebarOpen, setSidebarOpen, setVoiceOpen 
}) => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onVoiceTrigger={() => setVoiceOpen(true)} />
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 no-scrollbar bg-slate-50/50 dark:bg-slate-900/10">
          {children}
        </main>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          <Router>
            <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
              <Routes>
                
                {/* Public Landing & About/Contact */}
                <Route path="/" element={
                  <>
                    <Navbar onToggleSidebar={() => {}} onVoiceTrigger={() => setVoiceOpen(true)} />
                    <LandingPage />
                  </>
                } />
                
                <Route path="/about" element={
                  <div className="min-h-screen flex flex-col">
                    <Navbar onToggleSidebar={() => {}} onVoiceTrigger={() => setVoiceOpen(true)} />
                    <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full"><AboutPage /></main>
                  </div>
                } />
                
                <Route path="/contact" element={
                  <div className="min-h-screen flex flex-col">
                    <Navbar onToggleSidebar={() => {}} onVoiceTrigger={() => setVoiceOpen(true)} />
                    <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full"><ContactPage /></main>
                  </div>
                } />

                {/* Authentication Page */}
                <Route path="/auth" element={
                  <>
                    <Navbar onToggleSidebar={() => {}} onVoiceTrigger={() => setVoiceOpen(true)} />
                    <Auth />
                  </>
                } />

                {/* Protected Dashboard and Farming Tools */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <AppLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setVoiceOpen={setVoiceOpen}>
                      <Dashboard />
                    </AppLayout>
                  </ProtectedRoute>
                } />
                <Route path="/recommend" element={
                  <ProtectedRoute>
                    <AppLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setVoiceOpen={setVoiceOpen}>
                      <CropRecommender />
                    </AppLayout>
                  </ProtectedRoute>
                } />
                <Route path="/disease" element={
                  <ProtectedRoute>
                    <AppLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setVoiceOpen={setVoiceOpen}>
                      <DiseaseDetector />
                    </AppLayout>
                  </ProtectedRoute>
                } />
                <Route path="/weather" element={
                  <ProtectedRoute>
                    <AppLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setVoiceOpen={setVoiceOpen}>
                      <WeatherForecast />
                    </AppLayout>
                  </ProtectedRoute>
                } />
                <Route path="/soil" element={
                  <ProtectedRoute>
                    <AppLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setVoiceOpen={setVoiceOpen}>
                      <SoilAnalysis />
                    </AppLayout>
                  </ProtectedRoute>
                } />
                <Route path="/irrigation" element={
                  <ProtectedRoute>
                    <AppLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setVoiceOpen={setVoiceOpen}>
                      <SmartIrrigation />
                    </AppLayout>
                  </ProtectedRoute>
                } />
                <Route path="/market" element={
                  <ProtectedRoute>
                    <AppLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setVoiceOpen={setVoiceOpen}>
                      <MarketPrices />
                    </AppLayout>
                  </ProtectedRoute>
                } />
                <Route path="/expenses" element={
                  <ProtectedRoute>
                    <AppLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setVoiceOpen={setVoiceOpen}>
                      <ExpenseTracker />
                    </AppLayout>
                  </ProtectedRoute>
                } />
                <Route path="/chat" element={
                  <ProtectedRoute>
                    <AppLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setVoiceOpen={setVoiceOpen}>
                      <Chatbot />
                    </AppLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AppLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setVoiceOpen={setVoiceOpen}>
                      <AdminDashboard />
                    </AppLayout>
                  </ProtectedRoute>
                } />

                {/* Redirects */}
                <Route path="*" element={<Navigate to="/" replace />} />

              </Routes>

              {/* Speech Panel portal */}
              <VoiceAssistant isOpen={voiceOpen} onClose={() => setVoiceOpen(false)} />
            </div>
          </Router>
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};
export default App;
