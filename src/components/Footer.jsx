import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto bg-white" style={{ boxShadow: 'inset 0px 1px 0px rgba(145, 158, 171, 0.12)' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Left */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L4 6v6c0 5.25 3.4 10.15 8 11.46C16.6 22.15 20 17.25 20 12V6l-8-4z" fill="white" fillOpacity="0.9"/>
              </svg>
            </div>
            <span className="text-[13px] font-bold text-text">{t('nav.appName')}</span>
          </div>

          {/* Tech stack */}
          <div className="flex items-center gap-3 text-[12px] text-text-disabled font-medium">
            <span>{t('footer.builtWith')}</span>
            {['React', 'Flask', 'TensorFlow'].map((tech) => (
              <span key={tech} className="px-2 py-0.5 rounded-md bg-bg-neutral text-text-secondary text-[11px] font-semibold">
                {tech}
              </span>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[11px] text-text-disabled font-medium">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
