# H. Ayep Zaki Website

Official website for **H. Ayep Zaki, S.E., M.M.** - Wali Kota Sukabumi ke-23 (2025-2030).

Built with Next.js 14, Tailwind CSS, and optimized for SEO and performance.

## ⚡ Quick Deploy to Production

**If you already have the app running in systemd:** Yes, just run the script! It will gracefully stop, rebuild, and restart your service without issues.

```bash
./deploy-production.sh
```

That's it! The deployment script handles everything automatically.

## 🚀 Development Setup

### Prerequisites
- Node.js 18 or higher
- npm

### Getting Started

1. **Install dependencies:**
```bash
npm install
```

2. **Create environment file:**
```bash
cp .env.production.example .env.local
# Edit .env.local with your values
```

3. **Start development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:prod   # Build with production optimizations
npm start           # Start production server
npm run lint        # Run ESLint
npm run clean       # Clean build artifacts
```

## 📦 Production Deployment

### For Existing systemd Setups

**Answer to your question**: If you already have the app running in systemd, just run `./deploy-production.sh` - it will handle everything gracefully by stopping the service, rebuilding, and restarting it.

### First-Time Setup

#### 1. Server Preparation
```bash
# Update server
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx (for reverse proxy)
sudo apt-get install nginx

# Install Certbot for SSL
sudo apt-get install certbot python3-certbot-nginx
```

#### 2. Application Setup
```bash
# Create web directory
sudo mkdir -p /var/www/ayepzaki.com

# Clone repository
sudo git clone <your-repo-url> /var/www/ayepzaki.com
cd /var/www/ayepzaki.com

# Set permissions
sudo chown -R www-data:www-data /var/www/ayepzaki.com

# Setup environment
sudo cp .env.production.example .env.production
# Edit .env.production with actual values
sudo nano .env.production
sudo chown www-data:www-data .env.production
sudo chmod 600 .env.production

# Install systemd service
sudo cp ayepzaki.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable ayepzaki
```

#### 3. Deploy
```bash
./deploy-production.sh
```

### Environment Variables (.env.production)

```env
# Required
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://ayepzaki.com
NEXT_PUBLIC_COPYRIGHT="H. Ayep Zaki, S.E., M.M."

# Optional - Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Optional - External APIs
NEXT_PUBLIC_GHOST_URL=your-ghost-url
NEXT_PUBLIC_GHOST_API_KEY=your-ghost-api-key
```

## 🔧 systemd Service Management

The application runs as a systemd service with security hardening and automatic restart capabilities.

### Common Commands
```bash
# Check status
sudo systemctl status ayepzaki

# Start/stop/restart
sudo systemctl start ayepzaki
sudo systemctl stop ayepzaki
sudo systemctl restart ayepzaki

# View logs
sudo journalctl -u ayepzaki -f
sudo journalctl -u ayepzaki --since "1 hour ago"

# Enable/disable auto-start
sudo systemctl enable ayepzaki
sudo systemctl disable ayepzaki
```

### Health Check
```bash
# Test application directly
curl http://localhost:3000/api/health

# Test through Nginx (if configured)
curl https://ayepzaki.com/api/health
```

## 🌐 Nginx Configuration

Create `/etc/nginx/sites-available/ayepzaki.com`:

```nginx
server {
    listen 80;
    server_name ayepzaki.com www.ayepzaki.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ayepzaki.com www.ayepzaki.com;

    ssl_certificate /etc/letsencrypt/live/ayepzaki.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ayepzaki.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/ayepzaki.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔒 SSL/HTTPS Setup

```bash
# Obtain SSL certificate
sudo certbot --nginx -d ayepzaki.com -d www.ayepzaki.com

# Auto-renewal (already set up by certbot)
sudo certbot renew --dry-run
```

## ✅ Production Checklist

### Pre-Deployment
- [x] All ESLint warnings fixed
- [x] SEO meta tags implemented (Open Graph, Twitter Cards, JSON-LD)
- [x] Image optimization enabled
- [x] Security headers configured
- [x] Health check endpoint created
- [x] systemd service file ready
- [x] Environment variables configured

### Post-Deployment Verification
- [ ] Service is active: `sudo systemctl status ayepzaki`
- [ ] Health check responds: `curl http://localhost:3000/api/health`
- [ ] All pages load correctly
- [ ] SEO meta tags present
- [ ] HTTPS redirect works
- [ ] SSL certificate valid

### Production URLs to Test
- Homepage: https://ayepzaki.com/
- About: https://ayepzaki.com/about
- Articles: https://ayepzaki.com/articles
- Contact: https://ayepzaki.com/contact
- Health Check: https://ayepzaki.com/api/health
- Sitemap: https://ayepzaki.com/sitemap.xml
- Robots: https://ayepzaki.com/robots.txt

## 🔄 Updates & Maintenance

### Regular Updates
```bash
# Pull latest changes
cd /var/www/ayepzaki.com
sudo git pull origin main

# Deploy updates
./deploy-production.sh
```

### Log Management
```bash
# View recent logs
sudo journalctl -u ayepzaki --since "1 hour ago"

# Clean old logs
sudo journalctl --vacuum-time=7d
sudo journalctl --vacuum-size=100M
```

## 🐛 Troubleshooting

### Service Won't Start
```bash
# Check detailed status
sudo systemctl status ayepzaki

# View logs for errors
sudo journalctl -u ayepzaki --no-pager

# Verify permissions
ls -la /var/www/ayepzaki.com
sudo chown -R www-data:www-data /var/www/ayepzaki.com
```

### Common Issues

1. **Port Already in Use**
```bash
sudo lsof -i :3000
sudo kill -9 <PID>
```

2. **Build Failures**
```bash
cd /var/www/ayepzaki.com
npm run clean
npm ci
npm run build:prod
```

3. **Environment Variables Not Loaded**
```bash
# Verify .env.production exists with correct permissions
ls -la .env.production
sudo chown www-data:www-data .env.production
sudo chmod 600 .env.production
```

### Emergency Rollback
```bash
# Navigate to application directory
cd /var/www/ayepzaki.com

# Stop service
sudo systemctl stop ayepzaki

# Restore from backup or previous commit
sudo git checkout <previous-commit>

# Rebuild and restart
npm run build:prod
sudo systemctl start ayepzaki
```

## 📊 Performance & Monitoring

### System Resources
```bash
# Monitor overall system
htop

# Check service specifically
systemctl status ayepzaki

# Monitor application logs
sudo journalctl -u ayepzaki --since "1 hour ago" | grep ERROR
```

### Expected Performance
- Health endpoint response time: < 2 seconds
- Memory usage: < 512MB
- CPU usage: < 70%
- Page load time: < 3 seconds

## 🗂️ Project Structure

```
src/
├── components/          # React components
│   ├── SEO.jsx         # SEO meta tags component
│   ├── Header.jsx      # Site header
│   ├── Footer.jsx      # Site footer
│   └── ...
├── data/               # Static data files
│   ├── homepage.json   # Homepage content
│   ├── about.json      # About page content
│   └── ...
├── lib/                # Utility functions
│   ├── seo.js         # SEO utilities
│   ├── formatDate.js  # Date formatting
│   └── ...
└── pages/              # Next.js pages
    ├── index.jsx       # Homepage
    ├── about.jsx       # About page
    └── ...
```

## 🛡️ Security Features

- **systemd service hardening** with restricted permissions
- **Environment isolation** with secure file permissions
- **HTTPS enforcement** with SSL/TLS certificates
- **Security headers** implemented
- **Input validation** and sanitization
- **Resource limits** to prevent resource exhaustion

## 📱 SEO & Performance Features

- **Comprehensive meta tags** with Open Graph and Twitter Cards
- **JSON-LD structured data** for rich search results
- **Automatic sitemap generation**
- **Image optimization** with Next.js Image component
- **Performance monitoring** with health checks
- **Mobile-responsive design** with Tailwind CSS

## 📄 License

This project is built on the Tailwind UI Spotlight template, which is a commercial product licensed under the [Tailwind UI license](https://tailwindui.com/license).

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [systemd Service Management](https://www.freedesktop.org/software/systemd/man/systemd.service.html) - systemd documentation

---

**Service Name**: `ayepzaki`  
**Installation Path**: `/var/www/ayepzaki.com`  
**Port**: `3000`  
**User**: `www-data`

For support or questions, contact the development team.
