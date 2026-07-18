import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck, KeyRound, Mail, User, Phone, Check, ShieldAlert } from 'lucide-react';
import { useToast } from '../context/ToastContext';

type AuthView = 'login' | 'register' | 'forgot' | 'otp' | 'reset';
type UserRole = 'farmer' | 'admin';

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [view, setView] = useState<AuthView>('login');
  const [role, setRole] = useState<UserRole>('farmer');
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [showPass, setShowPass] = useState(false);

  // Password strength state
  const [strength, setStrength] = useState(0);
  const [strengthText, setStrengthText] = useState('Weak');

  useEffect(() => {
    // Basic password strength logic
    if (!password) {
      setStrength(0);
      setStrengthText('');
      return;
    }
    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 10) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    setStrength(score);
    if (score <= 2) setStrengthText('Weak');
    else if (score <= 4) setStrengthText('Medium');
    else setStrengthText('Strong');
  }, [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (view === 'login') {
      if (!email || !password) {
        showToast("Please fill in all fields", "warning");
        return;
      }
      
      // Auto register mock user
      const userData = {
        name: email.split('@')[0],
        role: role,
        email: email
      };
      
      localStorage.setItem('agri_user', JSON.stringify(userData));
      localStorage.setItem('agri_token', 'mock-jwt-token-12345');
      showToast(`Welcome back, ${userData.name}! Logged in as ${role}`, "success");
      navigate('/dashboard');
    }

    else if (view === 'register') {
      if (!name || !email || !password || !phone) {
        showToast("Please fill in all fields", "warning");
        return;
      }
      if (password !== confirmPassword) {
        showToast("Passwords do not match", "error");
        return;
      }
      
      // Trigger OTP phase
      showToast("OTP sent to your email & phone number. Please enter it to verify.", "info");
      setView('otp');
    }

    else if (view === 'forgot') {
      if (!email) {
        showToast("Please enter your email", "warning");
        return;
      }
      showToast("Password reset link and OTP sent to your email", "success");
      setView('otp');
    }

    else if (view === 'otp') {
      if (otpCode.length < 4) {
        showToast("Please enter a valid 4-digit code", "warning");
        return;
      }
      showToast("Email verified successfully!", "success");
      if (name) {
        // Registering
        const userData = { name, role, email };
        localStorage.setItem('agri_user', JSON.stringify(userData));
        localStorage.setItem('agri_token', 'mock-jwt-token-12345');
        navigate('/dashboard');
      } else {
        // Resetting password
        setView('reset');
      }
    }

    else if (view === 'reset') {
      if (password !== confirmPassword) {
        showToast("Passwords do not match", "error");
        return;
      }
      showToast("Password updated successfully! Please login.", "success");
      setView('login');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50/50 dark:bg-slate-950/20 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-gray-100 dark:border-slate-800/80 bg-white dark:bg-slate-950 p-8 shadow-xl">
        
        {/* Toggle Farmer / Admin (Only for Login/Register) */}
        {(view === 'login' || view === 'register') && (
          <div className="flex bg-slate-100 dark:bg-slate-900 rounded-2xl p-1 mb-8">
            <button
              onClick={() => setRole('farmer')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                role === 'farmer' 
                  ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-md' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Farmer
            </button>
            <button
              onClick={() => setRole('admin')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                role === 'admin' 
                  ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-md' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              Admin Panel
            </button>
          </div>
        )}

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 capitalize">
            {view === 'login' && 'Sign In to AgriAI'}
            {view === 'register' && 'Create Farmer Account'}
            {view === 'forgot' && 'Forgot Password'}
            {view === 'otp' && 'Verify OTP'}
            {view === 'reset' && 'Reset Password'}
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {view === 'login' && 'Enter your details below to access your farm dashboard'}
            {view === 'register' && 'Register your details to create a new profile'}
            {view === 'forgot' && 'Enter your registered email to receive an OTP code'}
            {view === 'otp' && 'Enter the 4-digit code sent to your inbox'}
            {view === 'reset' && 'Create a new secure password for your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Register: Name */}
          {view === 'register' && (
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                required
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-slate-800 bg-transparent dark:bg-slate-900/30 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          )}

          {/* Register: Phone */}
          {view === 'register' && (
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Phone className="w-4 h-4" />
              </span>
              <input
                type="tel"
                required
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-slate-800 bg-transparent dark:bg-slate-900/30 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          )}

          {/* Email: Login, Register, Forgot */}
          {(view === 'login' || view === 'register' || view === 'forgot') && (
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-slate-800 bg-transparent dark:bg-slate-900/30 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          )}

          {/* Password: Login, Register, Reset */}
          {(view === 'login' || view === 'register' || view === 'reset') && (
            <div className="space-y-1.5">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <KeyRound className="w-4 h-4" />
                </span>
                <input
                  type={showPass ? "text" : "password"}
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-2xl border border-gray-200 dark:border-slate-800 bg-transparent dark:bg-slate-900/30 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Meter */}
              {view === 'register' && password && (
                <div className="space-y-1 px-1">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-gray-400">Password Strength:</span>
                    <span className={`${strength <= 2 ? 'text-rose-500' : strength <= 4 ? 'text-amber-500' : 'text-emerald-500'}`}>
                      {strengthText}
                    </span>
                  </div>
                  <div className="h-1 w-full bg-gray-100 dark:bg-slate-900 rounded-full overflow-hidden flex gap-0.5">
                    <div className={`h-full flex-1 transition-colors ${strength >= 1 ? (strength <= 2 ? 'bg-rose-500' : strength <= 4 ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-transparent'}`}></div>
                    <div className={`h-full flex-1 transition-colors ${strength >= 3 ? (strength <= 4 ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-transparent'}`}></div>
                    <div className={`h-full flex-1 transition-colors ${strength >= 5 ? 'bg-emerald-500' : 'bg-transparent'}`}></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Confirm Password: Register, Reset */}
          {(view === 'register' || view === 'reset') && (
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <KeyRound className="w-4 h-4" />
              </span>
              <input
                type={showPass ? "text" : "password"}
                required
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-slate-800 bg-transparent dark:bg-slate-900/30 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          )}

          {/* OTP Input */}
          {view === 'otp' && (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                required
                maxLength={4}
                placeholder="0000"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                className="w-32 mx-auto text-center tracking-[1em] text-lg font-bold pl-4 py-3 rounded-2xl border border-gray-200 dark:border-slate-800 bg-transparent dark:bg-slate-900/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
              <span className="text-[10px] text-gray-400 text-center">
                Didn't receive code? <button type="button" className="text-emerald-600 font-bold hover:underline" onClick={() => showToast("Code re-sent!", "info")}>Resend OTP</button>
              </span>
            </div>
          )}

          {/* Remember Me & Forgot Password (Only on Login) */}
          {view === 'login' && (
            <div className="flex justify-between items-center text-xs font-semibold px-1">
              <label className="flex items-center gap-1.5 text-gray-500 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500/20"
                />
                Remember Me
              </label>
              <button
                type="button"
                onClick={() => setView('forgot')}
                className="text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:scale-[1.01] active:scale-[0.99] text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            {view === 'login' && 'Sign In'}
            {view === 'register' && 'Sign Up'}
            {view === 'forgot' && 'Send Code'}
            {view === 'otp' && 'Verify & Proceed'}
            {view === 'reset' && 'Save & Login'}
          </button>
        </form>

        {/* Footer switches */}
        <div className="mt-6 border-t border-gray-50 dark:border-slate-800/40 pt-4 text-center text-xs font-semibold">
          {view === 'login' && (
            <p className="text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={() => setView('register')}
                className="text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Register here
              </button>
            </p>
          )}
          {view === 'register' && (
            <p className="text-gray-400">
              Already have an account?{' '}
              <button
                onClick={() => setView('login')}
                className="text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
          {(view === 'forgot' || view === 'otp' || view === 'reset') && (
            <button
              onClick={() => setView('login')}
              className="text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Back to Login
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
export default Auth;
