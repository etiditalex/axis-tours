// Image Loader with Fallback System
class ImageLoader {
    constructor() {
        this.imageCache = new Map();
        this.fallbackImages = {
            'hotel': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            'nairobi': 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            'safari': 'https://images.unsplash.com/photo-1544966503-7cc4bb7f9e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            'spa': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            'city': 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            'luxury': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
        };
    }

    // Load image with fallback system
    async loadImage(imgElement, primaryUrl, fallbackType = 'hotel') {
        try {
            // Check cache first
            if (this.imageCache.has(primaryUrl)) {
                imgElement.src = this.imageCache.get(primaryUrl);
                return;
            }

            // Try to load primary image
            const response = await fetch(primaryUrl, { method: 'HEAD' });
            if (response.ok) {
                imgElement.src = primaryUrl;
                this.imageCache.set(primaryUrl, primaryUrl);
            } else {
                throw new Error('Primary image failed to load');
            }
        } catch (error) {
            console.warn(`Failed to load image: ${primaryUrl}, using fallback`);
            this.loadFallbackImage(imgElement, fallbackType);
        }
    }

    // Load fallback image
    loadFallbackImage(imgElement, fallbackType) {
        const fallbackUrl = this.fallbackImages[fallbackType] || this.fallbackImages['hotel'];
        
        // Try fallback image
        fetch(fallbackUrl, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    imgElement.src = fallbackUrl;
                } else {
                    this.showErrorImage(imgElement);
                }
            })
            .catch(() => {
                this.showErrorImage(imgElement);
            });
    }

    // Show error placeholder
    showErrorImage(imgElement) {
        imgElement.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        imgElement.style.display = 'flex';
        imgElement.style.alignItems = 'center';
        imgElement.style.justifyContent = 'center';
        imgElement.style.color = 'white';
        imgElement.style.fontSize = '3rem';
        imgElement.innerHTML = '<i class="fas fa-image"></i>';
    }

    // Preload images for better performance
    async preloadImages(imageUrls) {
        const promises = imageUrls.map(url => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve(url);
                img.onerror = () => resolve(null);
                img.src = url;
            });
        });

        const results = await Promise.all(promises);
        results.forEach((url, index) => {
            if (url) {
                this.imageCache.set(imageUrls[index], url);
            }
        });
    }

    // Get random hotel image from Unsplash
    getRandomHotelImage() {
        const hotelImages = [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
        ];
        return hotelImages[Math.floor(Math.random() * hotelImages.length)];
    }

    // Get random Nairobi city image
    getRandomNairobiImage() {
        const nairobiImages = [
            'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
        ];
        return nairobiImages[Math.floor(Math.random() * nairobiImages.length)];
    }

    // Get random spa/wellness image
    getRandomSpaImage() {
        const spaImages = [
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
        ];
        return spaImages[Math.floor(Math.random() * spaImages.length)];
    }
}

// Initialize global image loader
window.imageLoader = new ImageLoader();

// Utility function to load images with fallback
function loadImageWithFallback(imgElement, primaryUrl, fallbackType = 'hotel') {
    window.imageLoader.loadImage(imgElement, primaryUrl, fallbackType);
}

// Preload common images on page load
document.addEventListener('DOMContentLoaded', function() {
    const commonImages = [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    ];
    
    window.imageLoader.preloadImages(commonImages);
});
