const ALLOWED_EXTENSIONS = ['mp4', 'avi', 'mov', 'webm'];
const ALLOWED_MIME_TYPES = [
  'video/mp4',
  'video/x-msvideo',
  'video/avi',
  'video/quicktime',
  'video/webm',
];
const MAX_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB
const MAX_DURATION_SECONDS = 60; // 60 detik

/**
 * Validates a video file for format and size constraints.
 * @param {File} file
 * @returns {{ valid: boolean, error: string|null }}
 */
export function validateVideoFile(file) {
  if (!file) {
    return { valid: false, error: 'errorGeneric' };
  }

  // Check extension
  const extension = file.name.split('.').pop()?.toLowerCase();
  const hasValidExtension = ALLOWED_EXTENSIONS.includes(extension);

  // Check MIME type (with fallback to extension)
  const hasValidMime =
    ALLOWED_MIME_TYPES.includes(file.type) || file.type === '';

  if (!hasValidExtension || (!hasValidMime && file.type !== '')) {
    return { valid: false, error: 'errorFormat' };
  }

  // Check file size
  if (file.size > MAX_SIZE_BYTES) {
    return { valid: false, error: 'errorSize' };
  }

  return { valid: true, error: null };
}

/**
 * Validates video duration using HTML5 video element.
 * @param {File} file
 * @returns {Promise<{ valid: boolean, error: string|null, duration: number|null }>}
 */
export function validateVideoDuration(file) {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src);
      const duration = video.duration;

      if (duration > MAX_DURATION_SECONDS) {
        resolve({ valid: false, error: 'errorDuration', duration: Math.round(duration) });
      } else {
        resolve({ valid: true, error: null, duration: Math.round(duration) });
      }
    };

    video.onerror = () => {
      URL.revokeObjectURL(video.src);
      // Jika tidak bisa membaca metadata, tetap izinkan (backend akan menangani)
      resolve({ valid: true, error: null, duration: null });
    };

    video.src = URL.createObjectURL(file);
  });
}

/**
 * Formats file size in human-readable format.
 * @param {number} bytes
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = (bytes / Math.pow(1024, i)).toFixed(i > 1 ? 2 : 0);
  return `${size} ${units[i]}`;
}

