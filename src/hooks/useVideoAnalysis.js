import { useState, useCallback, useRef } from 'react';

const STEPS = ['uploading', 'extracting', 'detecting', 'analyzing', 'done'];

// Simulated delays per step (ms)
const STEP_DELAYS = {
  uploading: 1200,
  extracting: 1800,
  detecting: 2000,
  analyzing: 2500,
  done: 500,
};

/**
 * Generates a mock analysis result.
 * @returns {Object} Mock result
 */
function generateMockResult() {
  const isReal = Math.random() > 0.5;
  const confidence = isReal
    ? Math.floor(Math.random() * 15) + 82 // 82-96 for REAL
    : Math.floor(Math.random() * 20) + 75; // 75-94 for FAKE
  const framesAnalyzed = Math.floor(Math.random() * 80) + 40; // 40-120

  return {
    label: isReal ? 'REAL' : 'FAKE',
    confidence,
    frames_analyzed: framesAnalyzed,
    majority_vote: isReal
      ? `${Math.floor(framesAnalyzed * (confidence / 100))}/${framesAnalyzed} REAL`
      : `${Math.floor(framesAnalyzed * (confidence / 100))}/${framesAnalyzed} FAKE`,
  };
}

/**
 * Hook for managing video analysis state and mock API simulation.
 * Replace simulateAnalysis() with real fetch() call when Flask backend is ready.
 */
export default function useVideoAnalysis() {
  const [status, setStatus] = useState('idle'); // idle | uploading | extracting | detecting | analyzing | done | error
  const [currentStep, setCurrentStep] = useState(-1);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const abortRef = useRef(false);

  const analyze = useCallback(async (file) => {
    if (!file) return;

    abortRef.current = false;
    setError(null);
    setResult(null);

    // Walk through each step with simulated delays
    for (let i = 0; i < STEPS.length; i++) {
      if (abortRef.current) return;

      const step = STEPS[i];
      setStatus(step);
      setCurrentStep(i);

      await new Promise((resolve) => setTimeout(resolve, STEP_DELAYS[step]));
    }

    if (abortRef.current) return;

    // Generate mock result
    // TODO: Replace with real API call:
    // const formData = new FormData();
    // formData.append('video', file);
    // const response = await fetch('/api/predict', { method: 'POST', body: formData });
    // const data = await response.json();
    const mockResult = generateMockResult();
    setResult(mockResult);
    setStatus('done');
  }, []);

  const reset = useCallback(() => {
    abortRef.current = true;
    setStatus('idle');
    setCurrentStep(-1);
    setResult(null);
    setError(null);
  }, []);

  return {
    status,
    currentStep,
    result,
    error,
    analyze,
    reset,
    isAnalyzing: status !== 'idle' && status !== 'done' && status !== 'error',
  };
}
