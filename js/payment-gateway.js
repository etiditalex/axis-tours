// Payment Gateway Integration for Axis Tours & Travel
// Supports M-Pesa, Stripe, PayPal, and Bank Transfer

class PaymentGateway {
    constructor() {
        this.apiKey = 'your-api-key-here';
        this.baseUrl = 'http://localhost:3000/api/payments'; // Local development
        // this.baseUrl = 'https://api.axistoursandtravel.co.ke/api/payments'; // Production
        this.supportedMethods = ['mpesa', 'stripe', 'paypal', 'bank'];
    }

    // Initialize payment gateway
    async initialize() {
        try {
            // Load payment method configurations
            await this.loadPaymentConfigs();
            console.log('Payment gateway initialized successfully');
        } catch (error) {
            console.error('Failed to initialize payment gateway:', error);
        }
    }

    // Load payment method configurations
    async loadPaymentConfigs() {
        this.configs = {
            mpesa: {
                name: 'M-Pesa',
                icon: '📱',
                color: '#28a745',
                enabled: true,
                minAmount: 1,
                maxAmount: 150000,
                currency: 'KES',
                description: 'Mobile Money (Kenya)'
            },
            stripe: {
                name: 'Credit/Debit Card',
                icon: '💳',
                color: '#635bff',
                enabled: true,
                minAmount: 100,
                maxAmount: 1000000,
                currency: 'KES',
                description: 'Visa, Mastercard, Amex',
                supportedCards: ['visa', 'mastercard', 'amex', 'discover']
            },
            paypal: {
                name: 'PayPal',
                icon: '🅿️',
                color: '#0070ba',
                enabled: true,
                minAmount: 100,
                maxAmount: 1000000,
                currency: 'KES',
                description: 'Pay with PayPal account'
            },
            bank: {
                name: 'Bank Transfer',
                icon: '🏦',
                color: '#0066cc',
                enabled: true,
                minAmount: 1000,
                maxAmount: 5000000,
                currency: 'KES',
                description: 'Direct bank transfer'
            }
        };
    }

    // Process payment
    async processPayment(paymentData) {
        try {
            const { method, amount, currency, bookingId, customerInfo } = paymentData;
            
            // Validate payment method
            if (!this.supportedMethods.includes(method)) {
                throw new Error('Unsupported payment method');
            }

            // Validate amount
            const config = this.configs[method];
            if (amount < config.minAmount || amount > config.maxAmount) {
                throw new Error(`Amount must be between ${config.minAmount} and ${config.maxAmount} ${config.currency}`);
            }

            // Process based on method
            switch (method) {
                case 'mpesa':
                    return await this.processMpesaPayment(paymentData);
                case 'stripe':
                    return await this.processStripePayment(paymentData);
                case 'paypal':
                    return await this.processPaypalPayment(paymentData);
                case 'bank':
                    return await this.processBankTransfer(paymentData);
                default:
                    throw new Error('Invalid payment method');
            }
        } catch (error) {
            console.error('Payment processing failed:', error);
            throw error;
        }
    }

    // Process M-Pesa payment
    async processMpesaPayment(paymentData) {
        const { phone, amount, bookingId } = paymentData;
        
        try {
            // Simulate M-Pesa API call
            const response = await fetch(`${this.baseUrl}/mpesa/stkpush`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    phone: phone,
                    amount: amount,
                    account_reference: `Booking-${bookingId}`,
                    transaction_desc: 'Axis Tours & Travel Booking'
                })
            });

            const result = await response.json();
            
            if (result.success) {
                return {
                    success: true,
                    transactionId: result.transaction_id,
                    message: 'M-Pesa payment initiated. Please check your phone for STK push.',
                    method: 'mpesa'
                };
            } else {
                throw new Error(result.message || 'M-Pesa payment failed');
            }
        } catch (error) {
            throw new Error(`M-Pesa payment failed: ${error.message}`);
        }
    }

    // Process Stripe payment
    async processStripePayment(paymentData) {
        const { cardNumber, expiryDate, cvv, cardName, amount, currency, bookingId, customerInfo } = paymentData;
        
        try {
            // First, create a Stripe token (in production, use Stripe Elements)
            const tokenResponse = await this.createStripeToken({
                number: cardNumber,
                exp_month: expiryDate.split('/')[0],
                exp_year: '20' + expiryDate.split('/')[1],
                cvc: cvv,
                name: cardName
            });
            
            if (!tokenResponse.success) {
                throw new Error(tokenResponse.error);
            }
            
            // Send to backend server
            const response = await fetch(`${this.baseUrl}/stripe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: amount,
                    currency: currency.toLowerCase(),
                    cardToken: tokenResponse.token,
                    bookingId: bookingId,
                    customerInfo: customerInfo
                })
            });

            const result = await response.json();
            
            if (result.success) {
                return {
                    success: true,
                    transactionId: result.transactionId,
                    message: result.message,
                    method: 'stripe'
                };
            } else {
                throw new Error(result.message || 'Card payment failed');
            }
        } catch (error) {
            throw new Error(`Card payment failed: ${error.message}`);
        }
    }

    // Create Stripe token (simplified version)
    async createStripeToken(cardData) {
        try {
            // In production, use Stripe.js library
            // For now, simulate token creation
            const token = `tok_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            
            // Basic validation
            if (!cardData.number || !cardData.exp_month || !cardData.exp_year || !cardData.cvc) {
                return { success: false, error: 'Invalid card data' };
            }
            
            return { success: true, token: token };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Process PayPal payment
    async processPaypalPayment(paymentData) {
        const { email, password, amount, currency } = paymentData;
        
        try {
            // Simulate PayPal API call
            const response = await fetch(`${this.baseUrl}/paypal/payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    amount: amount,
                    currency: currency,
                    email: email,
                    return_url: window.location.origin + '/payment-success.html',
                    cancel_url: window.location.origin + '/payment-cancelled.html'
                })
            });

            const result = await response.json();
            
            if (result.success) {
                return {
                    success: true,
                    transactionId: result.id,
                    message: 'PayPal payment initiated. Redirecting to PayPal...',
                    method: 'paypal',
                    redirectUrl: result.redirect_url
                };
            } else {
                throw new Error(result.message || 'PayPal payment failed');
            }
        } catch (error) {
            throw new Error(`PayPal payment failed: ${error.message}`);
        }
    }

    // Process bank transfer
    async processBankTransfer(paymentData) {
        const { bankName, accountNumber, accountName, amount, bookingId } = paymentData;
        
        try {
            // Generate bank transfer instructions
            const transferInstructions = this.generateBankTransferInstructions({
                bankName,
                accountNumber,
                accountName,
                amount,
                bookingId
            });

            return {
                success: true,
                transactionId: `BANK-${Date.now()}`,
                message: 'Bank transfer instructions generated',
                method: 'bank',
                instructions: transferInstructions
            };
        } catch (error) {
            throw new Error(`Bank transfer failed: ${error.message}`);
        }
    }

    // Generate bank transfer instructions
    generateBankTransferInstructions(data) {
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

        const bank = bankDetails[data.bankName] || bankDetails['kcb'];
        
        return {
            bankName: bank.name,
            accountName: bank.account,
            accountNumber: bank.number,
            branch: bank.branch,
            amount: data.amount,
            reference: `Booking-${data.bookingId}`,
            instructions: [
                '1. Log into your online banking or visit your bank branch',
                '2. Initiate a transfer to the account details above',
                '3. Use the reference number provided',
                '4. Keep the transaction receipt for verification',
                '5. Payment will be verified within 24 hours'
            ]
        };
    }

    // Verify payment status
    async verifyPayment(transactionId, method) {
        try {
            const response = await fetch(`${this.baseUrl}/verify/${method}/${transactionId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`
                }
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Payment verification failed:', error);
            return { success: false, error: error.message };
        }
    }

    // Get payment methods
    getPaymentMethods() {
        return Object.keys(this.configs).map(key => ({
            id: key,
            ...this.configs[key]
        }));
    }

    // Format currency
    formatCurrency(amount, currency = 'KES') {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    // Validate card number
    validateCardNumber(cardNumber) {
        const cleaned = cardNumber.replace(/\s/g, '');
        const cardTypes = {
            visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
            mastercard: /^5[1-5][0-9]{14}$/,
            amex: /^3[47][0-9]{13}$/,
            discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/
        };

        for (const [type, pattern] of Object.entries(cardTypes)) {
            if (pattern.test(cleaned)) {
                return { valid: true, type: type };
            }
        }

        return { valid: false, type: null };
    }

    // Validate phone number
    validatePhoneNumber(phone) {
        const cleaned = phone.replace(/\D/g, '');
        const kenyaPattern = /^254[0-9]{9}$/;
        const localPattern = /^0[0-9]{9}$/;
        
        if (kenyaPattern.test(cleaned)) {
            return { valid: true, formatted: cleaned };
        } else if (localPattern.test(cleaned)) {
            return { valid: true, formatted: '254' + cleaned.substring(1) };
        }
        
        return { valid: false, formatted: null };
    }
}

// Initialize payment gateway
const paymentGateway = new PaymentGateway();
paymentGateway.initialize();

// Export for use in other files
window.PaymentGateway = paymentGateway;
