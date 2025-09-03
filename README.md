# Axis Tours & Travel - Modern Booking Website

A professional, modern travel booking website built with cutting-edge web technologies, specializing in East African coastal destinations and wildlife safaris.

## 🚀 Modern Tech Stack

### Build Tools
- **Vite** - Lightning-fast build tool and dev server
- **PostCSS** - Advanced CSS processing
- **Autoprefixer** - Automatic vendor prefixing

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Accessible UI components
- **Custom CSS Variables** - Consistent theming system

### Interactive Features
- **Flatpickr** - Lightweight, reliable date picker
- **Lucide Icons** - Beautiful, consistent iconography
- **Font Awesome** - Comprehensive icon library

### Maps & Geolocation
- **Leaflet** - Free, open-source mapping library
- **OpenStreetMap** - Free map tiles
- **Turf.js** - Advanced geospatial analysis

### Search & Performance
- **FlexSearch** - Fast client-side search engine
- **Lunr.js** - Alternative search solution
- **Algolia Ready** - For enterprise-level search

## ✨ Key Features

### 🏨 Advanced Hotel Booking System
- **Real-time Search** - Instant property search with FlexSearch
- **Smart Filtering** - Location, price, category, and distance filters
- **Interactive Maps** - Leaflet integration with property markers
- **Date Selection** - Flatpickr date pickers for check-in/out
- **Responsive Design** - Mobile-first approach with Tailwind CSS

### 🗺️ Geographic Features
- **Map Integration** - Toggle between list and map views
- **Distance Calculations** - Turf.js for proximity-based filtering
- **Location Clustering** - Efficient marker management for large datasets
- **Geolocation** - User location detection and nearby property suggestions

### 💰 Commission System
- **40% Commission Rate** - Built-in affiliate program
- **Real-time Calculations** - Instant commission estimates
- **Booking Dashboard** - Track earnings and bookings
- **Payment Integration** - Ready for payment gateway integration

### 📱 Modern User Experience
- **Progressive Web App** - Fast, responsive, and reliable
- **Accessibility** - WCAG compliant with Headless UI
- **Performance** - Optimized with Vite and modern bundling
- **SEO Ready** - Semantic HTML and meta tags

## 🛠️ Development Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/etiditalex/axis-tours.git
cd axis-tours

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Commands
```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run preview      # Preview production build
```

## 📁 Project Structure

```
axis-tours/
├── src/
│   ├── js/
│   │   └── booking-system.js    # Modern booking system
│   └── styles/
│       └── main.css             # Tailwind + custom styles
├── hotels-modern.html           # Modern hotels page
├── index.html                   # Homepage
├── destinations.html            # Destinations showcase
├── booking.html                 # Booking form
├── style.css                    # Legacy CSS (being migrated)
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
└── package.json                # Dependencies and scripts
```

## 🎨 Design System

### Color Palette
- **Primary**: #1A1A1A (Deep Black)
- **Gold**: #D4AF37 (Luxury Gold)
- **Gold Light**: #E6C866 (Light Gold)
- **Gold Dark**: #B8941F (Dark Gold)
- **White**: #FFFFFF (Pure White)
- **Gray Scale**: Comprehensive gray palette

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Responsive**: Fluid typography scaling

### Components
- **Buttons**: Primary, secondary, and outline variants
- **Cards**: Property cards with hover effects
- **Forms**: Accessible form components
- **Navigation**: Sticky header with smooth transitions

## 🌍 Destinations Covered

### Coastal Kenya
- **Diani Beach** - Luxury resorts and pristine beaches
- **Tiwi Beach** - Hidden gems and tranquility
- **Shanzu Beach** - Local favorites and serenity
- **Mombasa** - Historic port city and culture
- **Malindi** - Italian influence and marine parks

### Wildlife & Safari
- **Maasai Mara** - Great Migration and wildlife
- **Tsavo National Park** - Diverse landscapes and animals
- **Amboseli** - Mount Kilimanjaro views
- **Lake Nakuru** - Flamingos and rhino sanctuary

### Cultural Experiences
- **Old Town Mombasa** - Swahili architecture and history
- **Bombolulu Cultural Centre** - Inclusive cultural experiences
- **Hindu Temples** - Spiritual heritage sites
- **Kaya Forests** - UNESCO World Heritage sites

## 🔧 Customization

### Adding New Properties
```javascript
// In src/js/booking-system.js
this.properties.push({
  id: 4,
  name: "New Hotel Name",
  type: "Resort",
  location: "Location Name",
  coordinates: [latitude, longitude],
  price: 50000,
  rating: 4.7,
  amenities: ["Pool", "Spa", "Restaurant"],
  images: ["image-url"],
  description: "Hotel description",
  distance: 0.2,
  category: "Luxury"
});
```

### Styling Customization
```css
/* In src/styles/main.css */
@layer components {
  .custom-button {
    @apply px-6 py-3 bg-custom-color text-white rounded-lg;
  }
}
```

## 🚀 Deployment

### GitHub Pages
```bash
# Build the project
npm run build

# Deploy to GitHub Pages
# The dist/ folder contains the production build
```

### Netlify/Vercel
- Connect your repository
- Set build command: `npm run build`
- Set publish directory: `dist`

## 📊 Performance Features

- **Lazy Loading** - Images and components load on demand
- **Code Splitting** - Vite automatically optimizes bundle size
- **Tree Shaking** - Unused code is automatically removed
- **Minification** - Production builds are optimized
- **Caching** - Efficient asset caching strategies

## 🔒 Security Features

- **XSS Protection** - Sanitized user inputs
- **CSRF Protection** - Secure form submissions
- **Content Security Policy** - Restrict resource loading
- **HTTPS Ready** - Secure communication protocols

## 📱 Mobile Optimization

- **Responsive Design** - Mobile-first approach
- **Touch Friendly** - Optimized for mobile interactions
- **Progressive Web App** - Installable on mobile devices
- **Offline Support** - Service worker ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support and questions:
- Email: info@axistours.com
- Phone: +254 700 000 000
- Website: https://axistours.com

---

**Built with ❤️ for the East African tourism industry**