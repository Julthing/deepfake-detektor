import { useState, useRef, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { validateVideoFile, formatFileSize } from '../utils/validation';

export default function UploadZone({ onFileSelect, file, isAnalyzing, onAnalyze }) {
  const { t } = useLanguage();
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleFile = useCallback((selectedFile) => {
    setError(null);
    const validation = validateVideoFile(selectedFile);
    if (!validation.valid) {
      setError(t(`upload.${validation.error}`));
      return;
    }
    onFileSelect(selectedFile);
  }, [onFileSelect, t]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFile(droppedFile);
  }, [handleFile]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) handleFile(selectedFile);
    e.target.value = '';
  };

  return (
    <section className="max-w-[640px] mx-auto px-4 sm:px-6 lg:px-10 pb-6">
      <div className="card-minimal p-6 sm:p-8">
        <h2 className="text-[16px] font-bold text-text mb-0.5">{t('upload.title')}</h2>
        <p className="text-[13px] text-text-secondary mb-5">{t('upload.description')}</p>

        {/* Drop zone */}
        {!file && (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => inputRef.current?.click()}
            className={`relative rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-all duration-200 border border-dashed ${
              dragOver
                ? 'border-primary bg-primary/4'
                : 'border-[rgba(145,158,171,0.32)] hover:border-text-disabled bg-bg-neutral/60 hover:bg-bg-neutral'
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".mp4,.avi,.mov,.webm"
              onChange={handleInputChange}
              className="hidden"
              id="video-upload-input"
            />

            <div className="icon-shape w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/8 text-primary">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 16V4m0 0L8 8m4-4l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <p className="text-[14px] font-semibold text-text mb-1">{t('upload.browse')}</p>
            <p className="text-[12px] text-text-secondary">{t('upload.formats')}</p>
            <p className="text-[12px] text-text-disabled mt-0.5">{t('upload.maxSize')}</p>
          </div>
        )}

        {/* File selected */}
        {file && (
          <div className="animate-scale-in rounded-xl p-4 bg-bg-neutral">
            <div className="flex items-center gap-3">
              <div className="icon-shape w-10 h-10 rounded-xl bg-primary/8 text-primary shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M18 8l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-text truncate">{file.name}</p>
                <p className="text-[12px] text-text-secondary">{formatFileSize(file.size)}</p>
              </div>
              {!isAnalyzing && (
                <button
                  onClick={(e) => { e.stopPropagation(); onFileSelect(null); setError(null); }}
                  className="p-1.5 rounded-lg text-text-disabled hover:text-text hover:bg-white transition-colors cursor-pointer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="animate-scale-in mt-4 flex items-start gap-2.5 p-3 rounded-xl bg-fake-light">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5 text-fake">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <p className="text-[13px] text-fake font-medium">{error}</p>
          </div>
        )}

        {/* Analyze button */}
        {file && (
          <button
            onClick={onAnalyze}
            disabled={isAnalyzing}
            id="analyze-button"
            className={`mt-5 w-full py-2.5 rounded-lg text-[14px] font-bold transition-all duration-200 cursor-pointer ${
              isAnalyzing
                ? 'bg-primary/50 text-white cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary-light active:scale-[0.98]'
            }`}
            style={!isAnalyzing ? { boxShadow: 'var(--shadow-button)' } : {}}
          >
            {isAnalyzing ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {t('upload.analyzing')}
              </span>
            ) : (
              t('upload.analyze')
            )}
          </button>
        )}
      </div>
    </section>
  );
}
