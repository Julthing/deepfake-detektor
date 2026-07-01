import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl" style={{ boxShadow: 'inset 0px -1px 1px rgba(145, 158, 171, 0.12)' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary to-primary-light shadow-sm">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L4 6v6c0 5.25 3.4 10.15 8 11.46C16.6 22.15 20 17.25 20 12V6l-8-4z" fill="white" fillOpacity="0.9"/>
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-[15px] font-bold text-text tracking-tight hidden sm:block">
              {t('nav.appName')}
            </span>
          </Link>

          {/* Nav links + controls — all right-aligned */}
          <div className="flex items-center gap-1">
            <div className="hidden md:flex items-center gap-0.5 mr-1">
              <Link
                to="/"
                className={`px-3.5 py-1.5 rounded-lg text-[14px] font-semibold transition-all duration-200 ${
                  isActive('/')
                    ? 'text-primary'
                    : 'text-text-secondary hover:text-text'
                }`}
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/about"
                className={`px-3.5 py-1.5 rounded-lg text-[14px] font-semibold transition-all duration-200 ${
                  isActive('/about')
                    ? 'text-primary'
                    : 'text-text-secondary hover:text-text'
                }`}
              >
                {t('nav.about')}
              </Link>
            </div>

            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[13px] font-semibold text-text-secondary hover:text-text hover:bg-bg-neutral transition-all duration-200 cursor-pointer"
              aria-label="Toggle language"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                <ellipse cx="12" cy="12" rx="4" ry="10" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2 12h20" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              {lang === 'id' ? 'EN' : 'ID'}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-text-secondary hover:bg-bg-neutral transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 pt-1 animate-scale-in">
            <div className="flex flex-col gap-0.5">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-[14px] font-semibold transition-colors ${
                  isActive('/')
                    ? 'text-primary bg-primary/8'
                    : 'text-text-secondary hover:text-text hover:bg-bg-neutral'
                }`}
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-[14px] font-semibold transition-colors ${
                  isActive('/about')
                    ? 'text-primary bg-primary/8'
                    : 'text-text-secondary hover:text-text hover:bg-bg-neutral'
                }`}
              >
                {t('nav.about')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
