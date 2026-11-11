export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
export const ACCEPTED_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'zip'];
export const ACCEPT_ATTR = ACCEPTED_EXTENSIONS.map((e) => `.${e}`).join(',');

export function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1).replace('.', ',')} MB`;
}

/** Retorna a mensagem de erro, ou null se o arquivo é aceito. */
export function validateFile(file) {
  const ext = file.name.split('.').pop().toLowerCase();
  if (!ACCEPTED_EXTENSIONS.includes(ext)) return 'Formato não aceito. Envie um arquivo PDF, JPEG ou ZIP.';
  if (file.size > MAX_FILE_SIZE) return 'O arquivo ultrapassa o limite de 10 MB.';
  return null;
}
