import { useLanguage } from '../context/LanguageContext';

const stats = [
  {
    valueKey: 'hero.stat1Value',
    labelKey: 'hero.stat1Label',
    color: 'bg-primary/8 text-primary',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 7V5a2 2 0 012-2h4l2 2h6a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 11v6m-3-3h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    valueKey: 'hero.stat2Value',
    labelKey: 'hero.stat2Label',
    color: 'bg-accent/8 text-accent',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    valueKey: 'hero.stat3Value',
    labelKey: 'hero.stat3Label',
    color: 'bg-[#8E33FF]/8 text-[#8E33FF]',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M18 8l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 12H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-16 pb-10 sm:pt-20 sm:pb-14">
      {/* Minimal-style decorative blobs */}
      <div className="blob-decoration w-[500px] h-[500px] bg-primary -top-60 -right-60" />
      <div className="blob-decoration w-[400px] h-[400px] bg-accent bottom-0 -left-48" />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 text-center">
        {/* Badge */}
        <div className="animate-fade-in inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/8 text-primary text-[12px] font-bold uppercase tracking-wider mb-5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          {t('hero.badge')}
        </div>

        {/* Title */}
        <h1 className="animate-slide-up text-[28px] sm:text-[36px] lg:text-[48px] font-extrabold text-text leading-[1.15] mb-4 tracking-tight">
          {t('hero.title')}{' '}
          <span className="text-primary">{t('hero.titleHighlight')}</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-slide-up-delayed text-text-secondary text-[14px] sm:text-[16px] max-w-[560px] mx-auto leading-relaxed mb-10">
          {t('hero.subtitle')}
        </p>

        {/* Stats */}
        <div className="animate-slide-up grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-[640px] mx-auto" style={{ animationDelay: '0.24s' }}>
          {stats.map((stat, i) => (
            <div
              key={i}
              className="card-minimal px-5 py-5 text-center hover:-translate-y-0.5 transition-transform duration-300"
            >
              <div className={`icon-shape w-11 h-11 mx-auto mb-3 rounded-xl ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="text-[18px] font-bold text-text leading-tight">{t(stat.valueKey)}</div>
              <div className="text-[12px] text-text-secondary mt-1 font-medium">{t(stat.labelKey)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
