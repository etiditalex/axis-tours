// Simple OG Image Generator for Axis Tours & Travel
// This script generates Open Graph images for social media sharing

const fs = require('fs');
const path = require('path');

// Create a simple HTML template for OG images
function createOGImageHTML(title, subtitle, description, filename) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            width: 1200px;
            height: 630px;
            background: linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 50%, #1A1A1A 100%);
            font-family: 'Arial', sans-serif;
            position: relative;
            overflow: hidden;
        }
        
        .pattern {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.15) 0%, transparent 50%);
        }
        
        .content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: white;
            z-index: 2;
        }
        
        .logo {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #D4AF37, #e6b800);
            border-radius: 50%;
            margin: 0 auto 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            font-weight: bold;
            color: #1A1A1A;
            box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
        }
        
        .title {
            font-size: 56px;
            font-weight: 700;
            margin-bottom: 20px;
            color: white;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }
        
        .subtitle {
            font-size: 28px;
            color: #D4AF37;
            margin-bottom: 25px;
            font-weight: 600;
        }
        
        .description {
            font-size: 20px;
            color: rgba(255, 255, 255, 0.9);
            max-width: 700px;
            margin: 0 auto;
            line-height: 1.4;
        }
        
        .accent {
            position: absolute;
            top: 50px;
            right: 50px;
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.1));
            border-radius: 50%;
            border: 2px solid rgba(212, 175, 55, 0.3);
        }
        
        .accent-2 {
            position: absolute;
            bottom: 50px;
            left: 50px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.1));
            border-radius: 50%;
            border: 2px solid rgba(212, 175, 55, 0.3);
        }
    </style>
</head>
<body>
    <div class="pattern"></div>
    <div class="accent"></div>
    <div class="accent-2"></div>
    
    <div class="content">
        <div class="logo">A</div>
        <div class="title">${title}</div>
        <div class="subtitle">${subtitle}</div>
        <div class="description">${description}</div>
    </div>
</body>
</html>`;
}

// Define OG images to generate
const ogImages = [
    {
        title: "Axis Tours & Travel",
        subtitle: "Your Premier Travel Partner in Kenya",
        description: "Discover amazing destinations, luxury accommodations, and unforgettable experiences across Kenya and beyond.",
        filename: "homepage-og.html"
    },
    {
        title: "Luxury Hotels & Resorts",
        subtitle: "Premium Accommodations in Kenya",
        description: "Experience world-class hospitality at Kenya's finest hotels and beach resorts with Axis Tours & Travel.",
        filename: "hotels-og.html"
    },
    {
        title: "Safari Adventures",
        subtitle: "Wildlife Safaris & Game Drives",
        description: "Embark on unforgettable safari adventures in Maasai Mara, Amboseli, and other world-renowned national parks.",
        filename: "safaris-og.html"
    },
    {
        title: "Cultural Experiences",
        subtitle: "Authentic Kenyan Culture & Heritage",
        description: "Immerse yourself in rich Kenyan culture, traditions, and local experiences with our expert guides.",
        filename: "experiences-og.html"
    },
    {
        title: "List Your Property",
        subtitle: "Join Our Network of Partners",
        description: "List your hotel, resort, or vacation rental on Axis Tours & Travel and reach more guests worldwide.",
        filename: "list-property-og.html"
    }
];

// Generate all OG images
ogImages.forEach(image => {
    const html = createOGImageHTML(image.title, image.subtitle, image.description, image.filename);
    const filePath = path.join(__dirname, image.filename);
    fs.writeFileSync(filePath, html);
    console.log(`Generated: ${image.filename}`);
});

console.log('All OG images generated successfully!');
