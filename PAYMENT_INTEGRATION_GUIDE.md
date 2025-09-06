# Payment Integration Guide - Axis Tours & Travel

## 🛠️ Tech Stack Required

### **Frontend (Already Implemented)**
- ✅ HTML/CSS/JavaScript
- ✅ Payment forms and validation
- ✅ User interface components

### **Backend (To Be Implemented)**
- **Node.js** with Express.js
- **Stripe SDK** for payment processing
- **PostgreSQL** for transaction storage
- **Redis** for session management

### **Security Requirements**
- **HTTPS** (SSL/TLS certificates)
- **PCI DSS** compliance
- **Environment variables** for API keys
- **Input validation** and sanitization

## 🔧 Implementation Steps

### **1. Backend Setup**

#### **Install Dependencies**
```bash
npm init -y
npm install express stripe cors dotenv helmet morgan
npm install -D nodemon
```

#### **Environment Variables (.env)**
```env
# Stripe Keys
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/axis_tours
REDIS_URL=redis://localhost:6379

# Server
PORT=3000
NODE_ENV=production
```

### **2. Stripe Integration**

#### **Server Setup (server.js)**
```javascript
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Stripe Payment Endpoint
app.post('/api/payments/stripe', async (req, res) => {
    try {
        const { amount, currency, cardToken, bookingId } = req.body;
        
        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert to cents
            currency: currency.toLowerCase(),
            payment_method: cardToken,
            confirm: true,
            metadata: {
                booking_id: bookingId
            }
        });
        
        if (paymentIntent.status === 'succeeded') {
            // Save to database
            await saveTransaction({
                id: paymentIntent.id,
                amount: amount,
                currency: currency,
                bookingId: bookingId,
                status: 'completed',
                method: 'stripe'
            });
            
            res.json({
                success: true,
                transactionId: paymentIntent.id,
                message: 'Payment successful'
            });
        } else {
            res.json({
                success: false,
                message: 'Payment failed'
            });
        }
    } catch (error) {
        console.error('Stripe error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// M-Pesa Integration
app.post('/api/payments/mpesa', async (req, res) => {
    try {
        const { phone, amount, bookingId } = req.body;
        
        // M-Pesa STK Push implementation
        const mpesaResponse = await initiateSTKPush({
            phone: phone,
            amount: amount,
            accountReference: `Booking-${bookingId}`,
            transactionDesc: 'Axis Tours & Travel Booking'
        });
        
        res.json({
            success: true,
            checkoutRequestId: mpesaResponse.CheckoutRequestID,
            message: 'M-Pesa payment initiated'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Payment server running on port 3000');
});
```

### **3. Frontend Integration**

#### **Update payment-gateway.js**
```javascript
// Real Stripe integration
async processStripePayment(paymentData) {
    const { cardNumber, expiryDate, cvv, cardName, amount, currency } = paymentData;
    
    try {
        // Create Stripe token
        const { token, error } = await stripe.createToken({
            card: {
                number: cardNumber,
                exp_month: expiryDate.split('/')[0],
                exp_year: '20' + expiryDate.split('/')[1],
                cvc: cvv,
                name: cardName
            }
        });
        
        if (error) {
            throw new Error(error.message);
        }
        
        // Send to backend
        const response = await fetch('/api/payments/stripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: amount,
                currency: currency,
                cardToken: token.id,
                bookingId: paymentData.bookingId
            })
        });
        
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(`Card payment failed: ${error.message}`);
    }
}
```

### **4. Database Schema**

#### **Transactions Table**
```sql
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    transaction_id VARCHAR(255) UNIQUE NOT NULL,
    booking_id VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    customer_email VARCHAR(255),
    customer_phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **5. Security Implementation**

#### **Input Validation**
```javascript
const validateCardData = (cardData) => {
    const errors = [];
    
    if (!cardData.number || !/^\d{13,19}$/.test(cardData.number)) {
        errors.push('Invalid card number');
    }
    
    if (!cardData.exp_month || !/^(0[1-9]|1[0-2])$/.test(cardData.exp_month)) {
        errors.push('Invalid expiry month');
    }
    
    if (!cardData.exp_year || !/^\d{4}$/.test(cardData.exp_year)) {
        errors.push('Invalid expiry year');
    }
    
    if (!cardData.cvc || !/^\d{3,4}$/.test(cardData.cvc)) {
        errors.push('Invalid CVV');
    }
    
    return errors;
};
```

### **6. Deployment**

#### **Firebase Functions (Alternative)**
```javascript
const functions = require('firebase-functions');
const stripe = require('stripe')(functions.config().stripe.secret_key);

exports.processPayment = functions.https.onRequest(async (req, res) => {
    // Payment processing logic
});
```

## 🔐 Security Checklist

- [ ] HTTPS enabled
- [ ] API keys stored in environment variables
- [ ] Input validation implemented
- [ ] Rate limiting configured
- [ ] PCI DSS compliance
- [ ] Error handling and logging
- [ ] Database encryption
- [ ] Webhook verification

## 📱 Testing

### **Stripe Test Cards**
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Insufficient Funds**: 4000 0000 0000 9995

### **Test Environment**
```bash
# Start development server
npm run dev

# Test payment endpoint
curl -X POST http://localhost:3000/api/payments/stripe \
  -H "Content-Type: application/json" \
  -d '{"amount": 100, "currency": "KES", "cardToken": "tok_test"}'
```

## 🚀 Go Live Checklist

- [ ] Production API keys configured
- [ ] SSL certificate installed
- [ ] Database backup strategy
- [ ] Monitoring and logging
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring
- [ ] Security audit completed
