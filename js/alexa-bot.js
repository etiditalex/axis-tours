// Alexa Bot - AI Chatbot for Axis Tours and Travel
// Comprehensive knowledge base and intelligent responses

class AlexaBot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.knowledgeBase = this.initializeKnowledgeBase();
        this.currentContext = null;
        this.userPreferences = {};
        
        this.initializeBot();
        this.setupEventListeners();
    }

    initializeKnowledgeBase() {
        return {
            // Company Information
            company: {
                name: "Axis Tours and Travel",
                description: "Kenya's premier travel agency specializing in East Africa tours, Kenya coast holidays, and wildlife safaris",
                founded: "2014",
                location: "Mombasa, Kenya",
                services: ["Safari Tours", "Beach Holidays", "East Africa Travel", "Hotel Bookings", "Custom Packages"],
                contact: {
                    phone: "+254-XXX-XXXXXX",
                    email: "info@axistours.co.ke",
                    website: "https://axis-tours-backend.web.app"
                }
            },

            // Destinations
            destinations: {
                "diani beach": {
                    name: "Diani Beach",
                    description: "One of Kenya's most beautiful beaches with pristine white sand and crystal clear waters",
                    activities: ["Beach relaxation", "Water sports", "Diving", "Snorkeling", "Beach resorts"],
                    bestTime: "Year-round, best from December to March",
                    highlights: ["Baobab Beach Resort", "Colobus Conservation", "Kisite Marine Park"]
                },
                "maasai mara": {
                    name: "Maasai Mara National Reserve",
                    description: "Kenya's premier wildlife destination, famous for the Great Migration",
                    activities: ["Game drives", "Hot air balloon safaris", "Cultural visits", "Photography"],
                    bestTime: "July to October (Great Migration), December to March (dry season)",
                    highlights: ["Big Five", "Great Migration", "Maasai culture", "Balloon safaris"]
                },
                "mombasa": {
                    name: "Mombasa",
                    description: "Kenya's coastal city with rich history and beautiful beaches",
                    activities: ["Historical tours", "Beach activities", "Shopping", "Cultural experiences"],
                    bestTime: "Year-round, best from June to October",
                    highlights: ["Fort Jesus", "Old Town", "Haller Park", "Bamburi Beach"]
                },
                "tsavo": {
                    name: "Tsavo National Parks",
                    description: "Kenya's largest national park with diverse wildlife and landscapes",
                    activities: ["Game drives", "Bird watching", "Photography", "Camping"],
                    bestTime: "Year-round, best from June to October",
                    highlights: ["Red elephants", "Mudanda Rock", "Lugard Falls", "Diverse wildlife"]
                }
            },

            // Hotels and Accommodations
            hotels: {
                "baobab beach resort": {
                    name: "Baobab Beach Resort",
                    location: "Diani Beach",
                    rating: "5 stars",
                    description: "Luxury beachfront resort with world-class amenities",
                    features: ["Beachfront location", "Multiple restaurants", "Spa services", "Water sports", "Kids club"],
                    priceRange: "$$$"
                },
                "diani beach resorts": {
                    name: "Diani Beach Resorts",
                    location: "Diani Beach",
                    description: "Various luxury and mid-range beach resorts",
                    types: ["Luxury resorts", "Boutique hotels", "All-inclusive properties", "Family-friendly resorts"]
                }
            },

            // Tours and Packages
            tours: {
                "safari tours": {
                    name: "Safari Tours",
                    description: "Wildlife safari experiences in Kenya's national parks",
                    duration: ["3 days", "5 days", "7 days", "10 days"],
                    destinations: ["Maasai Mara", "Tsavo", "Amboseli", "Samburu"],
                    includes: ["Game drives", "Accommodation", "Meals", "Professional guide", "Transport"]
                },
                "beach holidays": {
                    name: "Beach Holidays",
                    description: "Relaxing beach getaways along Kenya's stunning coastline",
                    duration: ["3 days", "5 days", "7 days", "14 days"],
                    destinations: ["Diani Beach", "Mombasa", "Malindi", "Watamu"],
                    includes: ["Beachfront accommodation", "Water activities", "Meals", "Airport transfers"]
                },
                "cultural tours": {
                    name: "Cultural Tours",
                    description: "Authentic cultural experiences and historical sites",
                    highlights: ["Maasai villages", "Swahili culture", "Historical sites", "Local markets"],
                    duration: ["Half day", "Full day", "Multi-day"]
                }
            },

            // Booking Information
            booking: {
                process: "Easy online booking through our website or contact us directly",
                payment: "We accept credit cards, bank transfers, and mobile payments",
                cancellation: "Flexible cancellation policies available",
                confirmation: "Instant booking confirmation via email",
                support: "24/7 customer support available"
            },

            // Travel Tips
            tips: {
                "best time to visit": "Kenya is a year-round destination. Best for safaris: July-October and December-March. Best for beaches: December-March",
                "what to pack": "Light clothing, sunscreen, hat, camera, binoculars for safaris, swimwear for beaches",
                "visa requirements": "Most visitors need a visa. Check with Kenyan embassy or apply online",
                "health requirements": "Yellow fever vaccination recommended. Malaria prophylaxis advised",
                "currency": "Kenyan Shilling (KES). USD widely accepted. Credit cards accepted in major establishments"
            }
        };
    }

    initializeBot() {
        // Create chatbot HTML structure
        const chatbotHTML = `
            <div id="alexa-bot-container" class="alexa-bot-container">
                <div id="alexa-bot-widget" class="alexa-bot-widget">
                    <div class="alexa-bot-header">
                        <div class="alexa-bot-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="alexa-bot-info">
                            <h3>Alexa Bot</h3>
                            <p>Your Travel Assistant</p>
                        </div>
                        <button id="alexa-bot-close" class="alexa-bot-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div id="alexa-bot-messages" class="alexa-bot-messages">
                        <div class="alexa-bot-message bot-message">
                            <div class="message-avatar">
                                <i class="fas fa-robot"></i>
                            </div>
                            <div class="message-content">
                                <p>Hello! I'm Alexa Bot, your personal travel assistant. I can help you with:</p>
                                <ul>
                                    <li>🏖️ Beach destinations and resorts</li>
                                    <li>🦁 Safari tours and wildlife</li>
                                    <li>🏨 Hotel bookings and information</li>
                                    <li>📅 Travel planning and tips</li>
                                    <li>💰 Pricing and packages</li>
                                </ul>
                                <p>What would you like to know about Kenya travel?</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="alexa-bot-input-container">
                        <input type="text" id="alexa-bot-input" placeholder="Ask me anything about Kenya travel..." />
                        <button id="alexa-bot-send">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
                
                <button id="alexa-bot-toggle" class="alexa-bot-toggle">
                    <i class="fas fa-comments"></i>
                    <span class="alexa-bot-badge">1</span>
                </button>
            </div>
        `;

        // Add to page
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
        
        // Add CSS styles
        this.addChatbotStyles();
    }

    addChatbotStyles() {
        const styles = `
            <style>
            .alexa-bot-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 10000;
                font-family: 'Poppins', sans-serif;
            }

            .alexa-bot-widget {
                width: 350px;
                height: 500px;
                background: white;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
                display: none;
                flex-direction: column;
                overflow: hidden;
                border: 3px solid #D4AF37;
            }

            .alexa-bot-widget.open {
                display: flex;
                animation: slideUp 0.3s ease-out;
            }

            @keyframes slideUp {
                from {
                    transform: translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            .alexa-bot-header {
                background: linear-gradient(135deg, #1A1A1A, #D4AF37);
                color: white;
                padding: 15px;
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .alexa-bot-avatar {
                width: 40px;
                height: 40px;
                background: rgba(212, 175, 55, 0.3);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                border: 2px solid #D4AF37;
            }

            .alexa-bot-info h3 {
                margin: 0;
                font-size: 16px;
                font-weight: 600;
            }

            .alexa-bot-info p {
                margin: 0;
                font-size: 12px;
                opacity: 0.9;
            }

            .alexa-bot-close {
                background: none;
                border: none;
                color: white;
                font-size: 16px;
                cursor: pointer;
                margin-left: auto;
                padding: 5px;
                border-radius: 50%;
                transition: background 0.2s;
            }

            .alexa-bot-close:hover {
                background: rgba(255,255,255,0.2);
            }

            .alexa-bot-messages {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                background: #f8fafc;
            }

            .alexa-bot-message {
                display: flex;
                gap: 10px;
                margin-bottom: 15px;
                animation: fadeIn 0.3s ease-out;
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .message-avatar {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                flex-shrink: 0;
            }

            .bot-message .message-avatar {
                background: #D4AF37;
                color: #1A1A1A;
                border: 2px solid #B8860B;
            }

            .user-message .message-avatar {
                background: #1A1A1A;
                color: #D4AF37;
                border: 2px solid #D4AF37;
            }

            .message-content {
                background: white;
                padding: 10px 15px;
                border-radius: 15px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                max-width: 80%;
            }

            .user-message .message-content {
                background: #1A1A1A;
                color: #D4AF37;
                margin-left: auto;
                border: 2px solid #D4AF37;
            }

            .message-content p {
                margin: 0 0 8px 0;
                line-height: 1.4;
            }

            .message-content ul {
                margin: 8px 0;
                padding-left: 20px;
            }

            .message-content li {
                margin: 4px 0;
                font-size: 13px;
            }

            .alexa-bot-input-container {
                padding: 15px;
                background: white;
                border-top: 1px solid #e5e7eb;
                display: flex;
                gap: 10px;
            }

            #alexa-bot-input {
                flex: 1;
                padding: 10px 15px;
                border: 1px solid #d1d5db;
                border-radius: 25px;
                outline: none;
                font-size: 14px;
                transition: border-color 0.2s;
            }

            #alexa-bot-input:focus {
                border-color: #D4AF37;
                box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
            }

            #alexa-bot-send {
                background: #D4AF37;
                color: #1A1A1A;
                border: 2px solid #B8860B;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
                font-weight: 600;
            }

            #alexa-bot-send:hover {
                background: #B8860B;
                color: white;
                transform: scale(1.05);
            }

            .alexa-bot-toggle {
                background: linear-gradient(135deg, #D4AF37, #B8860B);
                color: #1A1A1A;
                border: 3px solid #1A1A1A;
                border-radius: 50%;
                width: 60px;
                height: 60px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
                transition: all 0.3s;
                position: relative;
                font-weight: bold;
            }

            .alexa-bot-toggle:hover {
                background: linear-gradient(135deg, #B8860B, #D4AF37);
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(212, 175, 55, 0.6);
            }

            .alexa-bot-badge {
                position: absolute;
                top: -5px;
                right: -5px;
                background: #1A1A1A;
                color: #D4AF37;
                border: 2px solid #D4AF37;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
            }

            .quick-actions {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-top: 10px;
            }

            .quick-action-btn {
                background: #F4E4BC;
                border: 2px solid #D4AF37;
                border-radius: 20px;
                padding: 6px 12px;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s;
                color: #1A1A1A;
                font-weight: 500;
            }

            .quick-action-btn:hover {
                background: #D4AF37;
                color: #1A1A1A;
                border-color: #B8860B;
                transform: translateY(-1px);
                box-shadow: 0 2px 8px rgba(212, 175, 55, 0.3);
            }

            @media (max-width: 768px) {
                .alexa-bot-widget {
                    width: 300px;
                    height: 450px;
                }
                
                .alexa-bot-container {
                    bottom: 10px;
                    right: 10px;
                }
            }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }

    setupEventListeners() {
        // Toggle chatbot
        document.getElementById('alexa-bot-toggle').addEventListener('click', () => {
            this.toggleChatbot();
        });

        // Close chatbot
        document.getElementById('alexa-bot-close').addEventListener('click', () => {
            this.closeChatbot();
        });

        // Send message
        document.getElementById('alexa-bot-send').addEventListener('click', () => {
            this.sendMessage();
        });

        // Enter key to send
        document.getElementById('alexa-bot-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    toggleChatbot() {
        const widget = document.getElementById('alexa-bot-widget');
        const toggle = document.getElementById('alexa-bot-toggle');
        const badge = document.querySelector('.alexa-bot-badge');

        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            widget.classList.add('open');
            toggle.style.display = 'none';
            badge.style.display = 'none';
        } else {
            widget.classList.remove('open');
            toggle.style.display = 'flex';
        }
    }

    closeChatbot() {
        const widget = document.getElementById('alexa-bot-widget');
        const toggle = document.getElementById('alexa-bot-toggle');
        
        this.isOpen = false;
        widget.classList.remove('open');
        toggle.style.display = 'flex';
    }

    sendMessage() {
        const input = document.getElementById('alexa-bot-input');
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        input.value = '';

        // Process and respond
        setTimeout(() => {
            const response = this.processMessage(message);
            this.addMessage(response.text, 'bot', response.actions);
        }, 500);
    }

    addMessage(text, sender, actions = null) {
        const messagesContainer = document.getElementById('alexa-bot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `alexa-bot-message ${sender}-message`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';

        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = text;

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);

        if (actions && actions.length > 0) {
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'quick-actions';
            actions.forEach(action => {
                const btn = document.createElement('button');
                btn.className = 'quick-action-btn';
                btn.textContent = action.text;
                btn.addEventListener('click', () => {
                    this.addMessage(action.text, 'user');
                    setTimeout(() => {
                        const response = this.processMessage(action.text);
                        this.addMessage(response.text, 'bot', response.actions);
                    }, 500);
                });
                actionsDiv.appendChild(btn);
            });
            messageDiv.appendChild(actionsDiv);
        }

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    processMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Greeting responses
        if (this.isGreeting(lowerMessage)) {
            return {
                text: "Hello! I'm Alexa Bot, your personal travel assistant for Kenya and East Africa. How can I help you plan your dream vacation?",
                actions: [
                    { text: "🏖️ Beach destinations" },
                    { text: "🦁 Safari tours" },
                    { text: "🏨 Hotel information" },
                    { text: "💰 Pricing" }
                ]
            };
        }

        // Destination queries
        if (lowerMessage.includes('diani') || lowerMessage.includes('beach')) {
            const diani = this.knowledgeBase.destinations['diani beach'];
            return {
                text: `🏖️ <strong>${diani.name}</strong><br><br>
                ${diani.description}<br><br>
                <strong>Best Activities:</strong><br>
                ${diani.activities.join(', ')}<br><br>
                <strong>Best Time to Visit:</strong> ${diani.bestTime}<br><br>
                <strong>Top Highlights:</strong><br>
                ${diani.highlights.join(', ')}`,
                actions: [
                    { text: "🏨 Diani hotels" },
                    { text: "📅 Book Diani trip" },
                    { text: "💰 Diani prices" }
                ]
            };
        }

        if (lowerMessage.includes('maasai mara') || lowerMessage.includes('safari')) {
            const mara = this.knowledgeBase.destinations['maasai mara'];
            return {
                text: `🦁 <strong>${mara.name}</strong><br><br>
                ${mara.description}<br><br>
                <strong>Activities:</strong><br>
                ${mara.activities.join(', ')}<br><br>
                <strong>Best Time:</strong> ${mara.bestTime}<br><br>
                <strong>Highlights:</strong><br>
                ${mara.highlights.join(', ')}`,
                actions: [
                    { text: "📅 Book safari" },
                    { text: "🏨 Safari lodges" },
                    { text: "💰 Safari prices" }
                ]
            };
        }

        // Hotel queries
        if (lowerMessage.includes('hotel') || lowerMessage.includes('resort') || lowerMessage.includes('accommodation')) {
            return {
                text: `🏨 <strong>Hotel & Resort Information</strong><br><br>
                We partner with the finest hotels and resorts across Kenya:<br><br>
                <strong>Diani Beach:</strong> Luxury beachfront resorts<br>
                <strong>Maasai Mara:</strong> Safari lodges and tented camps<br>
                <strong>Mombasa:</strong> City hotels and beach resorts<br><br>
                All accommodations include modern amenities, excellent service, and prime locations.`,
                actions: [
                    { text: "🏖️ Beach resorts" },
                    { text: "🦁 Safari lodges" },
                    { text: "📅 Check availability" }
                ]
            };
        }

        // Pricing queries
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('budget')) {
            return {
                text: `💰 <strong>Pricing Information</strong><br><br>
                Our packages are competitively priced and include:<br><br>
                <strong>Safari Tours:</strong> From $200 per person<br>
                <strong>Beach Holidays:</strong> From $150 per person<br>
                <strong>Combined Packages:</strong> From $300 per person<br><br>
                Prices include accommodation, meals, transport, and activities. Contact us for detailed quotes!`,
                actions: [
                    { text: "📅 Get quote" },
                    { text: "📞 Contact us" },
                    { text: "💳 Payment options" }
                ]
            };
        }

        // Booking queries
        if (lowerMessage.includes('book') || lowerMessage.includes('reserve') || lowerMessage.includes('booking')) {
            return {
                text: `📅 <strong>Easy Booking Process</strong><br><br>
                Booking with Axis Tours is simple:<br><br>
                1. Choose your destination and dates<br>
                2. Select your preferred package<br>
                3. Complete online booking form<br>
                4. Receive instant confirmation<br><br>
                We accept all major credit cards and offer flexible payment options.`,
                actions: [
                    { text: "🏖️ Book beach holiday" },
                    { text: "🦁 Book safari" },
                    { text: "📞 Call for booking" }
                ]
            };
        }

        // Contact queries
        if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
            return {
                text: `📞 <strong>Contact Information</strong><br><br>
                <strong>Phone:</strong> ${this.knowledgeBase.company.contact.phone}<br>
                <strong>Email:</strong> ${this.knowledgeBase.company.contact.email}<br>
                <strong>Website:</strong> ${this.knowledgeBase.company.contact.website}<br>
                <strong>Location:</strong> ${this.knowledgeBase.company.location}<br><br>
                We're available 24/7 to help plan your perfect Kenya adventure!`,
                actions: [
                    { text: "📧 Send email" },
                    { text: "📞 Call now" },
                    { text: "💬 Live chat" }
                ]
            };
        }

        // Travel tips
        if (lowerMessage.includes('tip') || lowerMessage.includes('advice') || lowerMessage.includes('what to pack')) {
            return {
                text: `💡 <strong>Travel Tips for Kenya</strong><br><br>
                <strong>Best Time to Visit:</strong> ${this.knowledgeBase.tips['best time to visit']}<br><br>
                <strong>What to Pack:</strong> ${this.knowledgeBase.tips['what to pack']}<br><br>
                <strong>Health:</strong> ${this.knowledgeBase.tips['health requirements']}<br><br>
                <strong>Currency:</strong> ${this.knowledgeBase.tips['currency']}`,
                actions: [
                    { text: "📋 Packing list" },
                    { text: "🏥 Health info" },
                    { text: "💱 Currency guide" }
                ]
            };
        }

        // Default response
        return {
            text: "I'd be happy to help you with that! Could you be more specific about what you'd like to know? I can help with destinations, hotels, tours, pricing, or booking information.",
            actions: [
                { text: "🏖️ Beach destinations" },
                { text: "🦁 Safari tours" },
                { text: "🏨 Hotels" },
                { text: "📞 Contact info" }
            ]
        };
    }

    isGreeting(message) {
        const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings'];
        return greetings.some(greeting => message.includes(greeting));
    }
}

// Initialize Alexa Bot when page loads
document.addEventListener('DOMContentLoaded', function() {
    new AlexaBot();
});
