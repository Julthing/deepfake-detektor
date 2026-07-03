import { useState, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import HeroSection from '../components/HeroSection';
import UploadZone from '../components/UploadZone';
import ProgressSteps from '../components/ProgressSteps';
import ResultPanel from '../components/ResultPanel';
import useVideoAnalysis from '../hooks/useVideoAnalysis';

export default function Home() {
  const [file, setFile] = useState(null);
  const { t } = useLanguage();
  const { status, currentStep, result, error, analyze, reset, isAnalyzing } = useVideoAnalysis();

  const handleFileSelect = useCallback((selectedFile) => {
    setFile(selectedFile);
  }, []);

  const handleAnalyze = useCallback(() => {
    if (file) {
      analyze(file);
    }
  }, [file, analyze]);

  const handleReset = useCallback(() => {
    reset();
    setFile(null);
  }, [reset]);

  return (
    <main className="flex-1">
      <HeroSection />
      <UploadZone
        onFileSelect={handleFileSelect}
        file={file}
        isAnalyzing={isAnalyzing}
        onAnalyze={handleAnalyze}
      />
      <ProgressSteps currentStep={currentStep} status={status} />

      {/* Error state */}
      {status === 'error' && error && (
        <section className="max-w-[640px] mx-auto px-4 sm:px-6 lg:px-10 pb-6 animate-scale-in">
          <div className="card-minimal overflow-hidden">
            {error === '__NO_FACE__' ? (
              <>
                {/* No Face Detected - Desain Khusus */}
                <div className="h-1 bg-[#FF9800]" />
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col items-center text-center gap-3 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#FF9800]/10 flex items-center justify-center">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#FF9800]">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                        <circle cx="9" cy="10" r="1" fill="currentColor"/>
                        <circle cx="15" cy="10" r="1" fill="currentColor"/>
                        <path d="M8 16s1.5-2 4-2 4 2 4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M2 2l20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-text mb-1.5">{t('upload.errorNoFaceTitle')}</h3>
                      <p className="text-[13px] text-text-secondary leading-relaxed">{t('upload.errorNoFace')}</p>
                    </div>
                  </div>
                  <div className="rounded-xl bg-[#FF9800]/5 border border-[#FF9800]/15 p-3.5 mb-5">
                    <p className="text-[12px] text-[#FF9800] font-medium flex items-start gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      {t('upload.errorNoFaceTip')}
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="w-full py-2.5 rounded-lg text-[14px] font-bold text-white bg-[#FF9800] hover:bg-[#F57C00] transition-all duration-200 cursor-pointer active:scale-[0.98]"
                    style={{ boxShadow: '0 4px 12px rgba(255,152,0,0.3)' }}
                  >
                    {t('upload.changeFile')}
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Generic Error */}
                <div className="h-1 bg-fake" />
                <div className="p-6 sm:p-8">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-fake/10 flex items-center justify-center shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-fake">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[14px] font-bold text-text mb-1">{t('upload.errorGeneric').split('.')[0]}</h3>
                      <p className="text-[13px] text-text-secondary">{error}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleReset}
                    className="w-full py-2.5 rounded-lg text-[14px] font-bold text-text-secondary hover:text-text bg-bg-neutral hover:bg-[rgba(145,158,171,0.2)] transition-all duration-200 cursor-pointer active:scale-[0.98]"
                  >
                    {t('upload.changeFile')}
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {status === 'done' && result && (
        <ResultPanel result={result} onReset={handleReset} />
      )}
    </main>
  );
}

