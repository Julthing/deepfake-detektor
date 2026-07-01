import { useState, useCallback } from 'react';
import HeroSection from '../components/HeroSection';
import UploadZone from '../components/UploadZone';
import ProgressSteps from '../components/ProgressSteps';
import ResultPanel from '../components/ResultPanel';
import useVideoAnalysis from '../hooks/useVideoAnalysis';

export default function Home() {
  const [file, setFile] = useState(null);
  const { status, currentStep, result, analyze, reset, isAnalyzing } = useVideoAnalysis();

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
      {status === 'done' && result && (
        <ResultPanel result={result} onReset={handleReset} />
      )}
    </main>
  );
}
