# Payment Server Setup Guide

## 🚀 Quick Start

### **1. Install Dependencies**
```bash
cd server
npm install
```

### **2. Configure Environment**
```bash
# Copy the example environment file
cp env.example .env

# Edit .env with your actual API keys
nano .env
```

### **3. Get Stripe API Keys**
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create an account or log in
3. Go to "Developers" → "API Keys"
4. Copy your "Secret key" and "Publishable key"
5. Add them to your `.env` file

### **4. Start the Server**
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

### **5. Test the Server**
```bash
# Health check
curl http://localhost:3000/health

# Test Stripe payment
curl -X POST http://localhost:3000/api/payments/stripe \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100,
    "currency": "KES",
    "cardToken": "tok_test",
    "bookingId": "BK123456",
    "customerInfo": {
      "email": "test@example.com",
      "phone": "+254700000000"
    }
  }'
```

## 🔧 Production Deployment

### **Option 1: Heroku**
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create Heroku app
heroku create axis-tours-payments

# Set environment variables
heroku config:set STRIPE_SECRET_KEY=sk_live_...
heroku config:set STRIPE_PUBLISHABLE_KEY=pk_live_...

# Deploy
git push heroku main
```

### **Option 2: DigitalOcean**
```bash
# Create a droplet
# Install Node.js and PM2
npm install -g pm2

# Start with PM2
pm2 start server.js --name "payment-server"

# Save PM2 configuration
pm2 save
pm2 startup
```

### **Option 3: AWS EC2**
```bash
# Launch EC2 instance
# Install Node.js
# Use PM2 for process management
# Configure Nginx as reverse proxy
```

## 🔐 Security Checklist

- [ ] Environment variables configured
- [ ] HTTPS enabled in production
- [ ] CORS configured for your domain
- [ ] Rate limiting implemented
- [ ] Input validation added
- [ ] Error logging configured
- [ ] Database backup strategy

## 📊 Monitoring

### **Health Check Endpoint**
- `GET /health` - Server status

### **Payment Endpoints**
- `POST /api/payments/stripe` - Credit/Debit cards
- `POST /api/payments/mpesa` - M-Pesa payments
- `POST /api/payments/paypal` - PayPal payments
- `POST /api/payments/bank` - Bank transfers

## 🧪 Testing

### **Stripe Test Cards**
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Insufficient Funds: `4000 0000 0000 9995`

### **Test Scenarios**
1. Valid payment
2. Invalid card number
3. Insufficient funds
4. Network timeout
5. Server error

## 🚨 Troubleshooting

### **Common Issues**
1. **CORS Error**: Check CORS configuration
2. **Stripe Error**: Verify API keys
3. **Port Already in Use**: Change PORT in .env
4. **Module Not Found**: Run `npm install`

### **Logs**
```bash
# View server logs
pm2 logs payment-server

# View specific logs
pm2 logs payment-server --lines 100
```
