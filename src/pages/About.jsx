import { useLanguage } from '../context/LanguageContext';

const pipelineSteps = [
  {
    titleKey: 'about.step1Title',
    descKey: 'about.step1Desc',
    color: 'bg-primary/8 text-primary',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 16V4m0 0L8 8m4-4l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    titleKey: 'about.step2Title',
    descKey: 'about.step2Desc',
    color: 'bg-accent/8 text-accent',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 3v18M15 3v18" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 9h18M3 15h18" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    titleKey: 'about.step3Title',
    descKey: 'about.step3Desc',
    color: 'bg-[#8E33FF]/8 text-[#8E33FF]',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 21v-1a7 7 0 0114 0v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="14" y="2" width="8" height="8" rx="4" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    titleKey: 'about.step4Title',
    descKey: 'about.step4Desc',
    color: 'bg-[#FFAB00]/8 text-[#B76E00]',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    titleKey: 'about.step5Title',
    descKey: 'about.step5Desc',
    color: 'bg-real/8 text-real',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <polyline points="8 12 11 15 16 9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const technologies = [
  {
    name: 'EfficientNet-B0',
    desc: 'CNN architecture for image classification',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    color: 'bg-primary/8 text-primary',
    tag: 'Deep Learning',
  },
  {
    name: 'TensorFlow',
    desc: 'Machine learning framework by Google',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    color: 'bg-[#FFAB00]/8 text-[#B76E00]',
    tag: 'ML Framework',
  },
  {
    name: 'MTCNN',
    desc: 'Multi-task cascaded face detection',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/><path d="M5 21v-1a7 7 0 0114 0v1"/>
      </svg>
    ),
    color: 'bg-[#8E33FF]/8 text-[#8E33FF]',
    tag: 'Face Detection',
  },
  {
    name: 'OpenCV',
    desc: 'Computer vision & video processing',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
    ),
    color: 'bg-accent/8 text-accent',
    tag: 'Computer Vision',
  },
  {
    name: 'React.js',
    desc: 'Frontend user interface library',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>
      </svg>
    ),
    color: 'bg-[#00B8D9]/8 text-[#006C9C]',
    tag: 'Frontend',
  },
  {
    name: 'Flask',
    desc: 'Python REST API backend framework',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
      </svg>
    ),
    color: 'bg-real/8 text-real',
    tag: 'Backend',
  },
  {
    name: 'FaceForensics++',
    desc: 'Benchmark dataset for face manipulation',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7V5a2 2 0 012-2h4l2 2h6a2 2 0 012 2v2"/><rect x="2" y="7" width="20" height="14" rx="2"/>
      </svg>
    ),
    color: 'bg-fake/8 text-fake',
    tag: 'Dataset',
  },
  {
    name: 'Google Colab',
    desc: 'Cloud-based training environment',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 010-14 4.5 4.5 0 018 2h1.5a4.5 4.5 0 01-.5 9z"/>
      </svg>
    ),
    color: 'bg-[#00B8D9]/8 text-[#006C9C]',
    tag: 'Training',
  },
];

export default function About() {
  const { t } = useLanguage();

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-10 sm:pt-20 sm:pb-14">
        <div className="blob-decoration w-[500px] h-[500px] bg-primary -top-60 -right-60" />

        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 text-center">
          <h1 className="animate-slide-up text-[28px] sm:text-[36px] lg:text-[48px] font-extrabold text-text leading-[1.15] mb-4 tracking-tight">
            {t('about.heroTitle')}
          </h1>
          <p className="animate-slide-up-delayed text-text-secondary text-[14px] sm:text-[16px] max-w-[560px] mx-auto leading-relaxed">
            {t('about.heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Pipeline */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 pb-16">
        <div className="text-center mb-8">
          <h2 className="text-[22px] sm:text-[26px] font-bold text-text mb-2">{t('about.pipelineTitle')}</h2>
          <p className="text-[14px] text-text-secondary max-w-[480px] mx-auto">{t('about.pipelineSubtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 max-w-[900px] mx-auto">
          {pipelineSteps.map((step, i) => (
            <div
              key={i}
              className="card-minimal p-5 text-center animate-slide-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* Step number */}
              <div className="text-[11px] font-bold text-text-disabled mb-3">
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Icon */}
              <div className={`icon-shape w-12 h-12 mx-auto mb-3 rounded-xl ${step.color}`}>
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-[13px] font-bold text-text mb-1.5 leading-tight">{t(step.titleKey)}</h3>

              {/* Description */}
              <p className="text-[12px] text-text-secondary leading-relaxed">{t(step.descKey)}</p>

              {/* Arrow connector (desktop only, not on last) */}
              {i < pipelineSteps.length - 1 && (
                <div className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 text-text-disabled">
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Technologies */}
      <section className="bg-white py-16" style={{ boxShadow: 'inset 0px 1px 0px rgba(145,158,171,0.12), inset 0px -1px 0px rgba(145,158,171,0.12)' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-8">
            <h2 className="text-[22px] sm:text-[26px] font-bold text-text mb-2">{t('about.techTitle')}</h2>
            <p className="text-[14px] text-text-secondary max-w-[480px] mx-auto">{t('about.techSubtitle')}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {technologies.map((tech, i) => (
              <div
                key={i}
                className="card-minimal p-5 hover:-translate-y-0.5 transition-transform duration-300"
              >
                <div className={`icon-shape w-11 h-11 rounded-xl mb-3 ${tech.color}`}>
                  {tech.icon}
                </div>
                <h3 className="text-[13px] font-bold text-text mb-0.5">{tech.name}</h3>
                <p className="text-[12px] text-text-secondary leading-relaxed mb-3">{tech.desc}</p>
                <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-md bg-bg-neutral text-text-secondary">
                  {tech.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
