// ─────────────────────────────────────────────
//  App Configuration
// ─────────────────────────────────────────────

export const config = {
  port: process.env.PORT || 3001,
  /** Comma-separated; default includes learner To-Do UI (5174) and preview (4173) */
  corsOrigins: (process.env.CORS_ORIGIN ?? 'http://localhost:5174,http://localhost:4173,http://localhost:5173')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
};
