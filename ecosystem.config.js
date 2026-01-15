module.exports = {
  apps: [{
    name: 'ayepzaki.com',
    script: 'npm start',
    max_memory_restart: '2G',
    // Custom log file paths
    out_file: '/var/log/ayepzaki/out.log',
    error_file: '/var/log/ayepzaki/error.log',
    log_file: '/var/log/ayepzaki/combined.log',  // Both out and error

    // Additional log options
    merge_logs: true,           // Don't add process ID to log filenames
    time: true,                 // Add timestamps to logs
    log_date_format: 'YYYY-MM-DD HH:mm Z'
  }]
}
