// Health check endpoint for production monitoring
export default function handler(req, res) {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
    website: 'H. Ayep Zaki - Wali Kota Sukabumi',
  }

  try {
    res.status(200).json(healthcheck)
  } catch (error) {
    healthcheck.message = error.message
    res.status(503).json(healthcheck)
  }
}