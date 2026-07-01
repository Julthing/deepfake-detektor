import { useState, useCallback, useRef } from 'react';

const STEPS = ['uploading', 'extracting', 'detecting', 'analyzing', 'done'];

// URL backend Hugging Face Spaces (Production) atau /api/predict (Local Proxy)
const API_URL = 'https://zuldika-deepfake-detection-api.hf.space/api/predict';

/**
 * Hook for managing video analysis state with real Flask API.
 * Mengirim video ke backend Flask dan menampilkan progress steps.
 */
export default function useVideoAnalysis() {
  const [status, setStatus] = useState('idle'); // idle | uploading | extracting | detecting | analyzing | done | error
  const [currentStep, setCurrentStep] = useState(-1);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const abortRef = useRef(null); // AbortController reference

  const analyze = useCallback(async (file) => {
    if (!file) return;

    // Reset state
    setError(null);
    setResult(null);

    // Buat AbortController untuk cancel request
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      // Step 1: Uploading
      setStatus('uploading');
      setCurrentStep(0);

      // Siapkan FormData
      const formData = new FormData();
      formData.append('video', file);

      // Step 2: Extracting (tampilkan saat menunggu upload selesai)
      // Kita simulasi step progress karena backend memproses semuanya sekaligus
      const progressTimer = setTimeout(() => {
        if (!controller.signal.aborted) {
          setStatus('extracting');
          setCurrentStep(1);
        }
      }, 1500);

      const detectTimer = setTimeout(() => {
        if (!controller.signal.aborted) {
          setStatus('detecting');
          setCurrentStep(2);
        }
      }, 3500);

      const analyzeTimer = setTimeout(() => {
        if (!controller.signal.aborted) {
          setStatus('analyzing');
          setCurrentStep(3);
        }
      }, 6000);

      // Kirim ke Flask backend
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      // Bersihkan timer
      clearTimeout(progressTimer);
      clearTimeout(detectTimer);
      clearTimeout(analyzeTimer);

      // Parse response
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server error: ${response.status}`);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      // Step 5: Done — tampilkan hasil
      setResult(data);
      setCurrentStep(4);
      setStatus('done');

    } catch (err) {
      if (err.name === 'AbortError') {
        // Request dibatalkan oleh user
        return;
      }

      console.error('Analysis error:', err);
      setError(err.message || 'Terjadi kesalahan saat menganalisis video');
      setStatus('error');
    }
  }, []);

  const reset = useCallback(() => {
    // Batalkan request yang sedang berjalan
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }

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
