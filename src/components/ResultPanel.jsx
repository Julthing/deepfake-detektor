import { useLanguage } from '../context/LanguageContext';

function InfoTooltip({ tooltipKey, className = '' }) {
  const { t } = useLanguage();

  return (
    <span className={`info-tooltip-wrapper ${className}`} tabIndex={0} role="button" aria-label="Info">
      <span className="info-tooltip-icon" aria-hidden="true">i</span>
      <span className="info-tooltip-bubble" role="tooltip">
        {t(tooltipKey)}
      </span>
    </span>
  );
}

export default function ResultPanel({ result, onReset }) {
  const { t } = useLanguage();

  if (!result) return null;

  const isReal = result.label === 'REAL';

  return (
    <section className="max-w-[640px] mx-auto px-4 sm:px-6 lg:px-10 pb-12 animate-bounce-in">
      <div className="card-minimal overflow-hidden">
        {/* Top accent */}
        <div className={`h-1 ${isReal ? 'bg-real' : 'bg-fake'}`} />

        <div className="p-6 sm:p-8">
          <h3 className="text-[14px] font-bold text-text uppercase tracking-wider mb-6">{t('result.title')}</h3>

          {/* Badge */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2">
              <div
                className={`inline-flex items-center gap-3 px-6 py-4 rounded-2xl ${
                  isReal ? 'bg-real-light' : 'bg-fake-light'
                }`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isReal ? 'bg-real' : 'bg-fake'}`}>
                  {isReal ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="1.5"/>
                      <polyline points="9 12 11.5 14.5 15 10" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="1.5"/>
                      <line x1="12" y1="9" x2="12" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="12" cy="17" r="0.5" fill="white" stroke="white"/>
                    </svg>
                  )}
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider">{t('result.label')}</div>
                  <div className={`text-[28px] font-extrabold leading-tight ${isReal ? 'text-real' : 'text-fake'}`}>
                    {t(isReal ? 'result.real' : 'result.fake')}
                  </div>
                </div>
              </div>
              <InfoTooltip tooltipKey="tooltip.classification" />
            </div>
            <p className={`text-[13px] mt-3 font-medium ${isReal ? 'text-real' : 'text-fake'}`}>
              {t(isReal ? 'result.realDesc' : 'result.fakeDesc')}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="rounded-xl p-3.5 bg-bg-neutral text-center">
              <div className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-1 flex items-center justify-center">
                <span>{t('result.confidence')}</span>
                <InfoTooltip tooltipKey="tooltip.confidence" className="tooltip-left" />
              </div>
              <div className={`text-[22px] font-bold ${isReal ? 'text-real' : 'text-fake'}`}>
                {result.confidence}%
              </div>
            </div>
            <div className="rounded-xl p-3.5 bg-bg-neutral text-center">
              <div className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-1 flex items-center justify-center">
                <span>{t('result.frames')}</span>
                <InfoTooltip tooltipKey="tooltip.frames" />
              </div>
              <div className="text-[22px] font-bold text-text">
                {result.frames_analyzed}
              </div>
            </div>
            <div className="rounded-xl p-3.5 bg-bg-neutral text-center">
              <div className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-1 flex items-center justify-center">
                <span>{t('result.majorityVote')}</span>
                <InfoTooltip tooltipKey="tooltip.majorityVote" className="tooltip-right" />
              </div>
              <div className="text-[14px] font-bold text-text mt-1">
                {result.majority_vote}
              </div>
            </div>
          </div>

          {/* Confidence bar */}
          <div className="mb-6">
            <div className="flex justify-between text-[11px] text-text-secondary mb-1.5 font-semibold">
              <span className="flex items-center">
                {t('result.confidenceLabel')}
                <InfoTooltip tooltipKey="tooltip.confidenceBar" className="tooltip-left" />
              </span>
              <span>{result.confidence}%</span>
            </div>
            <div className="relative w-full h-2 bg-bg-neutral rounded-full overflow-hidden">
              <div className="confidence-gradient h-full w-full rounded-full opacity-15" />
              <div
                className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out ${
                  isReal ? 'bg-real' : 'bg-fake'
                }`}
                style={{ width: `${result.confidence}%` }}
              />
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={onReset}
            id="reset-button"
            className="w-full py-2.5 rounded-lg text-[14px] font-bold text-text-secondary hover:text-text bg-bg-neutral hover:bg-[rgba(145,158,171,0.2)] transition-all duration-200 cursor-pointer active:scale-[0.98]"
          >
            {t('result.reset')}
          </button>
        </div>
      </div>
    </section>
  );
}
