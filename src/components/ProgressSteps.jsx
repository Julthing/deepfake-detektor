import { useLanguage } from '../context/LanguageContext';

const stepKeys = [
  'progress.step1',
  'progress.step2',
  'progress.step3',
  'progress.step4',
  'progress.step5',
];

const stepIcons = [
  <svg key="i1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 16V4m0 0L8 8m4-4l4 4"/><path d="M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2"/>
  </svg>,
  <svg key="i2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18"/>
  </svg>,
  <svg key="i3" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/><path d="M5 21v-1a7 7 0 0114 0v1"/>
  </svg>,
  <svg key="i4" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
  </svg>,
  <svg key="i5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>,
];

export default function ProgressSteps({ currentStep, status }) {
  const { t } = useLanguage();

  if (status === 'idle') return null;

  const isError = status === 'error';

  const progressPercent = status === 'done'
    ? 100
    : isError
      ? Math.min(((currentStep + 1) / 5) * 100, 100)
      : Math.min(((currentStep + 1) / 5) * 100, 100);

  return (
    <section className="max-w-[640px] mx-auto px-4 sm:px-6 lg:px-10 pb-6 animate-slide-up">
      <div className="card-minimal p-6 sm:p-8">
        <h3 className="text-[14px] font-bold text-text uppercase tracking-wider mb-5">{t('progress.title')}</h3>

        {/* Steps - desktop horizontal */}
        <div className="hidden sm:flex items-start justify-between mb-5 relative">
          {/* Background connector */}
          <div className="absolute top-[18px] left-[36px] right-[36px] h-[2px] bg-bg-neutral z-0" />
          <div
            className="absolute top-[18px] left-[36px] h-[2px] bg-primary z-[1] transition-all duration-700 ease-out"
            style={{ width: `calc(${Math.max(0, ((currentStep) / 4)) * 100}% - 72px * ${Math.max(0, ((currentStep) / 4))})`, maxWidth: 'calc(100% - 72px)' }}
          />

          {stepKeys.map((key, i) => {
            const isCompleted = (i < currentStep || status === 'done') && !(isError && i === currentStep);
            const isActive = i === currentStep && status !== 'done' && !isError;
            const isErrorStep = isError && i === currentStep;

            return (
              <div key={key} className="flex flex-col items-center relative z-10" style={{ width: '72px' }}>
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isErrorStep
                      ? 'bg-[#FF9800] text-white'
                      : isCompleted
                        ? 'bg-primary text-white'
                        : isActive
                          ? 'bg-primary text-white animate-pulse-glow'
                          : 'bg-bg-neutral text-text-disabled'
                  }`}
                >
                  {isErrorStep ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  ) : isCompleted ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    stepIcons[i]
                  )}
                </div>
                <span className={`text-[11px] mt-1.5 text-center font-semibold leading-tight ${
                  isErrorStep ? 'text-[#FF9800]' : (isCompleted || isActive) ? 'text-text' : 'text-text-disabled'
                }`}>
                  {t(key)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Steps - mobile vertical */}
        <div className="sm:hidden space-y-2.5 mb-5">
          {stepKeys.map((key, i) => {
            const isCompleted = (i < currentStep || status === 'done') && !(isError && i === currentStep);
            const isActive = i === currentStep && status !== 'done' && !isError;
            const isErrorStep = isError && i === currentStep;

            return (
              <div key={key} className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all text-[11px] font-bold ${
                    isErrorStep
                      ? 'bg-[#FF9800] text-white'
                      : isCompleted
                        ? 'bg-primary text-white'
                        : isActive
                          ? 'bg-primary text-white animate-pulse-glow'
                          : 'bg-bg-neutral text-text-disabled'
                  }`}
                >
                  {isErrorStep ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  ) : isCompleted ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span className={`text-[13px] font-medium ${
                  isErrorStep ? 'text-[#FF9800]' : (isCompleted || isActive) ? 'text-text' : 'text-text-disabled'
                }`}>
                  {t(key)}
                </span>
                {isActive && (
                  <svg className="ml-auto animate-spin w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-bg-neutral rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${
              isError ? 'bg-[#FF9800]' : 'bg-primary'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className={`text-[11px] mt-1.5 text-right font-semibold ${
          isError ? 'text-[#FF9800]' : 'text-text-disabled'
        }`}>{Math.round(progressPercent)}%</p>
      </div>
    </section>
  );
}
