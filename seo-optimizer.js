// SEO Optimization Script for Axis Tours and Travel Website
// This script adds comprehensive SEO meta tags to all HTML pages

const fs = require('fs');
const path = require('path');

// SEO configurations for different page types
const seoConfigs = {
    'destinations.html': {
        title: 'Kenya Destinations & Tourist Attractions | Diani, Maasai Mara, Mombasa | Axis Tours',
        description: 'Explore Kenya\'s top destinations including Diani Beach, Maasai Mara National Reserve, Mombasa, and more. Discover the best tourist attractions and places to visit in Kenya with Axis Tours.',
        keywords: 'Kenya destinations, tourist attractions Kenya, Diani Beach, Maasai Mara, Mombasa attractions, Kenya places to visit, travel destinations Kenya',
        ogImage: 'kenya-destinations.jpg',
        structuredDataType: 'TouristDestination'
    },
    'tours.html': {
        title: 'Kenya Safari Tours & East Africa Adventures | Wildlife Safaris & Beach Tours | Axis Tours',
        description: 'Discover amazing Kenya safari tours, wildlife adventures, and East Africa travel packages. From Maasai Mara safaris to coastal tours, book your dream adventure with Axis Tours.',
        keywords: 'Kenya safari tours, wildlife safaris, East Africa tours, Maasai Mara safari, Kenya adventure tours, safari packages, wildlife tours Kenya',
        ogImage: 'kenya-safari-tours.jpg',
        structuredDataType: 'TouristTrip'
    },
    'booking.html': {
        title: 'Book Your Kenya Holiday | Safari & Beach Tours Booking | Axis Tours and Travel',
        description: 'Book your dream Kenya holiday with Axis Tours. Easy online booking for safari tours, beach holidays, and East Africa adventures. Secure payment and instant confirmation.',
        keywords: 'book Kenya holiday, safari booking, beach tour booking, Kenya travel booking, online booking Kenya, holiday booking Kenya',
        ogImage: 'kenya-booking.jpg',
        structuredDataType: 'ReservationPackage'
    },
    'contact.html': {
        title: 'Contact Axis Tours and Travel | Kenya Travel Experts | Get Your Quote Today',
        description: 'Contact Axis Tours and Travel for personalized Kenya travel advice. Get quotes for safari tours, beach holidays, and East Africa adventures. Expert travel consultants ready to help.',
        keywords: 'contact Axis Tours, Kenya travel contact, travel quote Kenya, safari booking contact, travel consultant Kenya, travel advice Kenya',
        ogImage: 'contact-axis-tours.jpg',
        structuredDataType: 'ContactPage'
    },
    'blog.html': {
        title: 'Kenya Travel Blog | Safari Tips, Beach Guides & Travel Stories | Axis Tours',
        description: 'Read our Kenya travel blog for insider tips, safari guides, beach recommendations, and travel stories. Expert advice for planning your perfect Kenya holiday.',
        keywords: 'Kenya travel blog, safari tips, beach guides Kenya, travel stories Kenya, Kenya travel advice, travel blog Kenya',
        ogImage: 'kenya-travel-blog.jpg',
        structuredDataType: 'Blog'
    }
};

// Function to generate SEO meta tags
function generateSEOTags(config, pageUrl) {
    const baseUrl = 'https://axis-tours-backend.web.app';
    const fullUrl = `${baseUrl}/${pageUrl}`;
    
    return `
    <!-- Primary Meta Tags -->
    <title>${config.title}</title>
    <meta name="title" content="${config.title}">
    <meta name="description" content="${config.description}">
    <meta name="keywords" content="${config.keywords}">
    <meta name="author" content="Axis Tours and Travel">
    <meta name="robots" content="index, follow">
    <meta name="language" content="English">
    <meta name="revisit-after" content="7 days">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${fullUrl}">
    <meta property="og:title" content="${config.title}">
    <meta property="og:description" content="${config.description}">
    <meta property="og:image" content="${baseUrl}/images/${config.ogImage}">
    <meta property="og:site_name" content="Axis Tours and Travel">
    <meta property="og:locale" content="en_KE">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${fullUrl}">
    <meta property="twitter:title" content="${config.title}">
    <meta property="twitter:description" content="${config.description}">
    <meta property="twitter:image" content="${baseUrl}/images/${config.ogImage}">
    
    <!-- Additional SEO Meta Tags -->
    <meta name="geo.region" content="KE">
    <meta name="geo.placename" content="Kenya">
    <meta name="geo.position" content="-1.2921;36.8219">
    <meta name="ICBM" content="-1.2921, 36.8219">
    <meta name="theme-color" content="#1e40af">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${fullUrl}">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">`;
}

// Function to add SEO to a specific page
function addSEOToPage(filename) {
    const filePath = path.join(__dirname, filename);
    
    if (!fs.existsSync(filePath)) {
        console.log(`File ${filename} not found, skipping...`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if SEO is already added
    if (content.includes('<!-- Primary Meta Tags -->')) {
        console.log(`SEO already exists in ${filename}, skipping...`);
        return;
    }
    
    // Get SEO config for this page
    const config = seoConfigs[filename];
    if (!config) {
        console.log(`No SEO config found for ${filename}, skipping...`);
        return;
    }
    
    // Find the head section and add SEO tags
    const headEndIndex = content.indexOf('</head>');
    if (headEndIndex === -1) {
        console.log(`No </head> tag found in ${filename}, skipping...`);
        return;
    }
    
    // Insert SEO tags before </head>
    const seoTags = generateSEOTags(config, filename);
    content = content.slice(0, headEndIndex) + seoTags + '\n    ' + content.slice(headEndIndex);
    
    // Write back to file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ SEO added to ${filename}`);
}

// Main execution
console.log('🚀 Starting SEO optimization...');

// Add SEO to all configured pages
Object.keys(seoConfigs).forEach(filename => {
    addSEOToPage(filename);
});

console.log('✅ SEO optimization completed!');
