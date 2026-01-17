#!/bin/bash
# Production Deployment Script for H. Ayep Zaki Website (systemd)
# Usage: ./deploy-production.sh

set -e

echo "🚀 Starting production deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

print_status "Node.js version: $(node -v) ✅"

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
    print_warning ".env.production file not found!"
    print_status "Please create .env.production from .env.production.example"
    print_status "cp .env.production.example .env.production"
    print_status "Then edit .env.production with your production values"
    exit 1
fi

# Check if systemd service exists
if ! systemctl list-units --full -all | grep -Fq "ayepzaki.service"; then
    print_warning "ayepzaki.service not found in systemd!"
    print_status "Please create the systemd service first using the provided template"
    print_status "sudo cp ayepzaki.service /etc/systemd/system/"
    print_status "sudo systemctl daemon-reload"
    print_status "sudo systemctl enable ayepzaki"
    exit 1
fi

# Stop the service before deployment
print_status "Stopping ayepzaki service..."
sudo systemctl stop ayepzaki

# Clean previous build
print_status "Cleaning previous build..."
npm run clean

# Install dependencies
print_status "Installing dependencies..."
npm ci --production=false

# Run linting
print_status "Running linting..."
npm run lint:fix

# Build for production
print_status "Building for production..."
npm run build:prod

# Verify build was successful
if [ ! -d ".next" ]; then
    print_error "Build failed - .next directory not found"
    exit 1
fi

print_status "Build completed successfully! ✅"

# Restart the systemd service
print_status "Restarting ayepzaki service..."
sudo systemctl start ayepzaki
sudo systemctl status ayepzaki --no-pager -l

# Check if service is running
if systemctl is-active --quiet ayepzaki; then
    print_status "✅ ayepzaki service is running successfully!"
    print_status "🌐 Your website should be available at your configured domain"
else
    print_error "❌ Failed to start ayepzaki service"
    print_status "Check the service logs with: sudo journalctl -u ayepzaki -f"
    exit 1
fi

echo
print_status "🎉 Production deployment completed successfully!"
print_status "Service status: sudo systemctl status ayepzaki"
print_status "View logs: sudo journalctl -u ayepzaki -f"