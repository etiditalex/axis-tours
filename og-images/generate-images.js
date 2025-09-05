// Generate Open Graph Images for Axis Tours & Travel
// This script creates actual PNG image files for social media sharing

const fs = require('fs');
const path = require('path');

// Create a simple HTML file that will generate the images
function createImageGenerator() {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generate OG Images</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }
        canvas { border: 2px solid #ddd; margin: 10px; }
        button { background: #D4AF37; color: #1A1A1A; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin: 10px; font-weight: 600; }
        button:hover { background: #e6b800; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Generate Open Graph Images</h1>
        <p>Click the buttons below to generate and download OG images:</p>
        
        <canvas id="canvas" width="1200" height="630"></canvas>
        <br>
        <button onclick="generateHomepage()">Generate Homepage Image</button>
        <button onclick="generateHotels()">Generate Hotels Image</button>
        <button onclick="generateListProperty()">Generate List Property Image</button>
        <button onclick="downloadImage()">Download Image</button>
    </div>

    <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        
        function generateHomepage() {
            drawImage('Axis Tours & Travel', 'Your Premier Travel Partner in Kenya', 'Discover amazing destinations, luxury accommodations, and unforgettable experiences across Kenya and beyond.');
        }
        
        function generateHotels() {
            drawImage('Luxury Hotels & Resorts', 'Premium Accommodations in Kenya', 'Experience world-class hospitality at Kenya\\'s finest hotels and beach resorts with Axis Tours & Travel.');
        }
        
        function generateListProperty() {
            drawImage('List Your Property', 'Join Our Network of Partners', 'List your hotel, bed & breakfast, apartment, or vacation rental on Axis Tours & Travel. Join thousands of hosts earning more with our platform.');
        }
        
        function drawImage(title, subtitle, description) {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Create gradient background
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#1A1A1A');
            gradient.addColorStop(0.5, '#2D2D2D');
            gradient.addColorStop(1, '#1A1A1A');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Add pattern overlay
            ctx.fillStyle = 'rgba(212, 175, 55, 0.1)';
            ctx.beginPath();
            ctx.arc(canvas.width * 0.2, canvas.height * 0.8, 200, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(canvas.width * 0.8, canvas.height * 0.2, 200, 0, Math.PI * 2);
            ctx.fill();
            
            // Add logo circle
            ctx.fillStyle = '#D4AF37';
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2 - 50, 40, 0, Math.PI * 2);
            ctx.fill();
            
            // Add logo text
            ctx.fillStyle = '#1A1A1A';
            ctx.font = 'bold 24px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('A', canvas.width / 2, canvas.height / 2 - 40);
            
            // Add main title
            ctx.fillStyle = 'white';
            ctx.font = 'bold 48px Arial';
            ctx.fillText(title, canvas.width / 2, canvas.height / 2 + 20);
            
            // Add subtitle
            ctx.fillStyle = '#D4AF37';
            ctx.font = '24px Arial';
            ctx.fillText(subtitle, canvas.width / 2, canvas.height / 2 + 60);
            
            // Add description
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.font = '18px Arial';
            const words = description.split(' ');
            let line = '';
            let y = canvas.height / 2 + 100;
            
            for (let i = 0; i < words.length; i++) {
                const testLine = line + words[i] + ' ';
                const metrics = ctx.measureText(testLine);
                const testWidth = metrics.width;
                
                if (testWidth > 600 && i > 0) {
                    ctx.fillText(line, canvas.width / 2, y);
                    line = words[i] + ' ';
                    y += 25;
                } else {
                    line = testLine;
                }
            }
            ctx.fillText(line, canvas.width / 2, y);
        }
        
        function downloadImage() {
            const link = document.createElement('a');
            link.download = 'axis-tours-og-image.png';
            link.href = canvas.toDataURL();
            link.click();
        }
        
        // Generate homepage image on load
        window.onload = function() {
            generateHomepage();
        };
    </script>
</body>
</html>`;

    fs.writeFileSync(path.join(__dirname, 'image-generator.html'), html);
    console.log('Image generator created: image-generator.html');
}

// Create the image generator
createImageGenerator();
