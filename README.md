# Axis Tours and Travel Website

A professional, responsive luxury travel website built with HTML, CSS, and JavaScript. This website showcases premium East African travel destinations and services with a sophisticated gold/white/black theme, specializing in Kenya's coast, wildlife safaris, and East African adventures.

## 🌟 Features

### Design & User Experience
- **Professional Luxury Theme**: Gold, white, and black color scheme
- **Responsive Design**: Fully responsive across all devices with hamburger menu for mobile
- **Modern UI/UX**: Clean, elegant design with smooth animations
- **Interactive Elements**: Hover effects, smooth scrolling, and fade-in animations

### Pages & Content
- **Home Page**: Hero section, featured East African destinations, testimonials, and call-to-action
- **About Us**: Company story, founder profile (Alex Etidit), values, and achievements
- **Destinations**: Comprehensive East African destination showcase with filtering options
- **Blog**: Travel articles, tips, and destination guides focused on East Africa
- **Booking Page**: Interactive booking form with East African package selection
- **Contact Us**: Contact form, office information, and FAQ section

### Technical Features
- **Cross-browser Compatible**: Works on all modern browsers
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Fast Loading**: Optimized images and efficient CSS
- **Accessibility**: WCAG compliant design elements
- **Form Validation**: Client-side validation for all forms
- **Mobile-First**: Responsive hamburger menu for mobile devices

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- A web server (for local development)
- Text editor (VS Code, Sublime Text, etc.)

### Installation

1. **Clone or Download the Repository**
   ```bash
   git clone https://github.com/yourusername/axis-tours-travel-website.git
   cd axis-tours-travel-website
   ```

2. **Open the Project**
   - Open the project folder in your preferred text editor
   - Or simply double-click `index.html` to view in your browser

3. **Local Development Server** (Optional)
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

4. **View the Website**
   - Open your browser and navigate to `http://localhost:8000`
   - Or simply open `index.html` directly in your browser

## 📁 Project Structure

```
axis-tours-travel-website/
├── index.html          # Home page
├── about.html          # About us page
├── destinations.html   # Destinations page
├── blog.html          # Blog page
├── booking.html       # Booking page
├── contact.html       # Contact page
├── style.css          # Main stylesheet
└── README.md          # Project documentation
```

## 🎨 Customization

### Colors
The website uses CSS custom properties for easy color customization. Edit the `:root` section in `style.css`:

```css
:root {
    --gold: #D4AF37;        /* Primary gold color */
    --gold-light: #F4E4BC;  /* Light gold */
    --gold-dark: #B8860B;   /* Dark gold */
    --white: #FFFFFF;       /* White */
    --black: #1A1A1A;       /* Black */
    --gray-light: #F8F9FA;  /* Light gray */
    --gray: #6C757D;        /* Medium gray */
    --gray-dark: #495057;   /* Dark gray */
}
```

### Content
- **Images**: Replace image URLs with your own East African destination images
- **Text**: Update all text content in the HTML files
- **Contact Information**: Update phone numbers, emails, and addresses
- **Social Media**: Update social media links

### Fonts
The website uses Google Fonts (Poppins). To change fonts:
1. Update the Google Fonts link in the `<head>` section
2. Modify the `font-family` property in the CSS

## 🌍 Featured Destinations

### Kenya Coast
- **Diani Beach**: Pristine white sand beaches and crystal-clear waters
- **Watamu**: Marine national park and turtle watching
- **Mombasa**: Historic coastal city with rich culture
- **Malindi**: Ancient trading port and marine reserves

### Kenya Safari
- **Maasai Mara**: World-famous wildlife reserve and wildebeest migration
- **Tsavo**: Kenya's largest national park with diverse wildlife
- **Amboseli**: Stunning views of Mount Kilimanjaro
- **Lake Nakuru**: Flamingo paradise and rhino sanctuary

### East Africa
- **Zanzibar**: Spice island with pristine beaches and Stone Town
- **Tanzania**: Serengeti and Ngorongoro Crater
- **Uganda**: Bwindi Impenetrable Forest and Queen Elizabeth National Park

## 🌐 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main` or `master`)
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Drag and drop your project folder to [Netlify](https://netlify.com)
2. Or connect your GitHub repository
3. Your site will be deployed automatically

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts to deploy

### Traditional Web Hosting
1. Upload all files to your web hosting provider
2. Ensure `index.html` is in the root directory
3. Configure your domain to point to the hosting

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11+

## 🔧 Advanced Customization

### Adding New Pages
1. Create a new HTML file
2. Copy the header and footer structure from existing pages
3. Add your content in the main section
4. Update navigation links

### Adding Animations
The website uses CSS animations and Intersection Observer API. To add new animations:

```css
/* Add to style.css */
@keyframes yourAnimation {
    from { /* initial state */ }
    to { /* final state */ }
}

.your-element {
    animation: yourAnimation 0.6s ease-out;
}
```

### Form Integration
To make forms functional, you'll need to:
1. Set up a backend service (Node.js, PHP, etc.)
2. Configure form action URLs
3. Handle form submissions and email notifications

## 📞 Contact Information

**Axis Tours and Travel**
- **Founder**: Alex Etidit
- **Phone**: +254 796 988 686 / +254 780 460 617
- **Email**: etiditalex@gmail.com
- **Location**: Kenya, East Africa

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Images from [Unsplash](https://unsplash.com) featuring East African destinations
- Icons from [Font Awesome](https://fontawesome.com)
- Fonts from [Google Fonts](https://fonts.google.com)

## 🔄 Updates

### Version 2.0.0
- Updated company branding to "Axis Tours and Travel"
- Added founder information (Alex Etidit)
- Updated contact details and location
- Refocused content on East African destinations
- Added comprehensive destination coverage (Kenya Coast, Safari, East Africa)
- Enhanced mobile responsiveness with hamburger menu
- Updated all pages with new content and imagery

### Version 1.0.0
- Initial release
- Complete website with all pages
- Responsive design
- Interactive features
- Professional styling

---

**Note**: This is a static website template. For production use, consider adding:
- Backend functionality for forms
- Database integration
- Content Management System
- Analytics tracking
- SSL certificate
- CDN for better performance