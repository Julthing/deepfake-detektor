const ALLOWED_EXTENSIONS = ['mp4', 'avi', 'mov', 'webm'];
const ALLOWED_MIME_TYPES = [
  'video/mp4',
  'video/x-msvideo',
  'video/avi',
  'video/quicktime',
  'video/webm',
];
const MAX_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB

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
