import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Globe } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [licenseCode, setLicenseCode] = useState('');

  const isRTL = language === 'ar';

  const translations = {
    en: {
      username: 'Username',
      password: 'Password',
      licenseCode: 'License Code',
      login: 'Login',
      companyName: 'FinanceFlow',
      tagline: 'Financial Reporting Platform',
    },
    ar: {
      username: 'اسم المستخدم',
      password: 'كلمة المرور',
      licenseCode: 'رمز الترخيص',
      login: 'تسجيل الدخول',
      companyName: 'فاينانس فلو',
      tagline: 'منصة التقارير المالية',
    },
  };

  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store language preference and navigate to dashboard
    localStorage.setItem('appLanguage', language);
    navigate('/dashboard');
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center p-4"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Language Toggle */}
      <button
        onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
        className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-slate-200/60"
        aria-label="Toggle language"
      >
        <Globe className="w-4 h-4 text-slate-600" />
        <span className="text-sm text-slate-700">{language === 'en' ? 'العربية' : 'English'}</span>
      </button>

      {/* Login Container */}
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg mb-4">
            <svg
              className="w-9 h-9 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-slate-800 mb-1">
            {t.companyName}
          </h1>
          <p className="text-sm text-slate-500">
            {t.tagline}
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/60 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div>
              <label 
                htmlFor="username" 
                className="block text-sm text-slate-700 mb-2"
              >
                {t.username}
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm text-slate-700 mb-2"
              >
                {t.password}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200"
                required
              />
            </div>

            {/* License Code Field */}
            <div>
              <label 
                htmlFor="licenseCode" 
                className="block text-sm text-slate-700 mb-2"
              >
                {t.licenseCode}
              </label>
              <input
                id="licenseCode"
                type="text"
                value={licenseCode}
                onChange={(e) => setLicenseCode(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all duration-200 mt-6"
            >
              {t.login}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-6">
          {isRTL ? 'جميع الحقوق محفوظة © 2026' : '© 2026 All rights reserved'}
        </p>
      </div>
    </div>
  );
}
