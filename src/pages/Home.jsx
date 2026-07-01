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
                  <h3 className="text-[14px] font-bold text-text mb-1">Analisis Gagal</h3>
                  <p className="text-[13px] text-text-secondary">{error}</p>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="w-full py-2.5 rounded-lg text-[14px] font-bold text-text-secondary hover:text-text bg-bg-neutral hover:bg-[rgba(145,158,171,0.2)] transition-all duration-200 cursor-pointer active:scale-[0.98]"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        </section>
      )}

      {status === 'done' && result && (
        <ResultPanel result={result} onReset={handleReset} />
      )}
    </main>
  );
}

