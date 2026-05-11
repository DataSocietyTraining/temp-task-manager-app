export const config = {
  port: Number(process.env.PORT) || 3001,
  /** Comma-separated origins; default covers Vite dev + preview */
  corsOrigins: (process.env.CORS_ORIGIN ?? 'http://localhost:5173,http://localhost:5174,http://localhost:4173,http://localhost:4174')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
};
