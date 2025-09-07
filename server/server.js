const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({
    origin: ['https://axistoursandtravel.co.ke', 'http://localhost:5000'],
    credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Stripe Payment Endpoint
app.post('/api/payments/stripe', async (req, res) => {
    try {
        const { amount, currency, cardToken, bookingId, customerInfo } = req.body;
        
        // Validate input
        if (!amount || !currency || !cardToken || !bookingId) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }
        
        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: currency.toLowerCase(),
            payment_method: cardToken,
            confirm: true,
            metadata: {
                booking_id: bookingId,
                customer_email: customerInfo?.email || '',
                customer_phone: customerInfo?.phone || ''
            },
            description: `Axis Tours & Travel - Booking ${bookingId}`
        });
        
        if (paymentIntent.status === 'succeeded') {
            // Log successful transaction
            console.log('Payment successful:', {
                id: paymentIntent.id,
                amount: amount,
                currency: currency,
                bookingId: bookingId
            });
            
            res.json({
                success: true,
                transactionId: paymentIntent.id,
                message: 'Payment processed successfully',
                method: 'stripe'
            });
        } else {
            res.json({
                success: false,
                message: 'Payment was not completed',
                status: paymentIntent.status
            });
        }
    } catch (error) {
        console.error('Stripe payment error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Payment processing failed'
        });
    }
});

// M-Pesa Payment Endpoint (Simulated)
app.post('/api/payments/mpesa', async (req, res) => {
    try {
        const { phone, amount, bookingId } = req.body;
        
        // Validate input
        if (!phone || !amount || !bookingId) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }
        
        // Simulate M-Pesa STK Push
        const checkoutRequestId = `ws_CO_${Date.now()}`;
        
        // In production, integrate with actual M-Pesa API
        console.log('M-Pesa payment initiated:', {
            phone: phone,
            amount: amount,
            bookingId: bookingId,
            checkoutRequestId: checkoutRequestId
        });
        
        res.json({
            success: true,
            transactionId: checkoutRequestId,
            message: 'M-Pesa payment initiated. Please check your phone for STK push.',
            method: 'mpesa'
        });
    } catch (error) {
        console.error('M-Pesa payment error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'M-Pesa payment failed'
        });
    }
});

// PayPal Payment Endpoint (Simulated)
app.post('/api/payments/paypal', async (req, res) => {
    try {
        const { email, amount, currency, bookingId } = req.body;
        
        // Validate input
        if (!email || !amount || !currency || !bookingId) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }
        
        // Simulate PayPal payment
        const transactionId = `PP_${Date.now()}`;
        
        console.log('PayPal payment initiated:', {
            email: email,
            amount: amount,
            currency: currency,
            bookingId: bookingId,
            transactionId: transactionId
        });
        
        res.json({
            success: true,
            transactionId: transactionId,
            message: 'PayPal payment initiated. Redirecting to PayPal...',
            method: 'paypal',
            redirectUrl: `https://paypal.com/checkout?token=${transactionId}`
        });
    } catch (error) {
        console.error('PayPal payment error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'PayPal payment failed'
        });
    }
});

// Bank Transfer Endpoint
app.post('/api/payments/bank', async (req, res) => {
    try {
        const { bankName, accountNumber, accountName, amount, bookingId } = req.body;
        
        // Validate input
        if (!bankName || !accountNumber || !accountName || !amount || !bookingId) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }
        
        // Generate bank transfer instructions
        const transactionId = `BANK_${Date.now()}`;
        
        const bankDetails = {
            'kcb': {
                name: 'Kenya Commercial Bank',
                account: 'Axis Tours & Travel',
                number: '1234567890',
                branch: 'Westlands Branch'
            },
            'equity': {
                name: 'Equity Bank',
                account: 'Axis Tours & Travel',
                number: '0987654321',
                branch: 'Westlands Branch'
            },
            'coop': {
                name: 'Co-operative Bank',
                account: 'Axis Tours & Travel',
                number: '1122334455',
                branch: 'Westlands Branch'
            }
        };
        
        const bank = bankDetails[bankName] || bankDetails['kcb'];
        
        res.json({
            success: true,
            transactionId: transactionId,
            message: 'Bank transfer instructions generated',
            method: 'bank',
            instructions: {
                bankName: bank.name,
                accountName: bank.account,
                accountNumber: bank.number,
                branch: bank.branch,
                amount: amount,
                reference: `Booking-${bookingId}`,
                instructions: [
                    '1. Log into your online banking or visit your bank branch',
                    '2. Initiate a transfer to the account details above',
                    '3. Use the reference number provided',
                    '4. Keep the transaction receipt for verification',
                    '5. Payment will be verified within 24 hours'
                ]
            }
        });
    } catch (error) {
        console.error('Bank transfer error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Bank transfer failed'
        });
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Payment server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`💳 Stripe endpoint: http://localhos t:${PORT}/api/payments/stripe`);
    console.log(`📱 M-Pesa endpoint: http://localhost:${PORT}/api/payments/mpesa`);
});

module.exports = app;
