# Social Media Testing Guide - Axis Tours & Travel

## 🧪 **Testing Your Social Media SEO Implementation**

### **1. Local Testing (Recommended First)**
Your website is now running locally at: `http://localhost:5000`

**Test these URLs:**
- Homepage: `http://localhost:5000`
- Hotels: `http://localhost:5000/hotels.html`
- List Property: `http://localhost:5000/list-your-property.html`
- Tours: `http://localhost:5000/tours.html`
- Social Media Test Tool: `http://localhost:5000/social-media-test.html`

### **2. Live Website Testing**
Your live website is available at:
- **Custom Domain**: `https://axistoursandtravel.co.ke`
- **Firebase URL**: `https://axis-tours-backend.web.app`

### **3. Social Media Platform Testing**

#### **Facebook Testing:**
1. Go to [Facebook Debugger](https://developers.facebook.com/tools/debug/)
2. Enter your URL: `https://axistoursandtravel.co.ke`
3. Click "Debug" to see how your link will appear
4. Test different pages by changing the URL

#### **Twitter Testing:**
1. Go to [Twitter Card Validator](https://cards-dev.twitter.com/validator)
2. Enter your URL: `https://axistoursandtravel.co.ke`
3. Click "Preview card" to see the Twitter card preview
4. Test different pages

#### **LinkedIn Testing:**
1. Go to [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
2. Enter your URL: `https://axistoursandtravel.co.ke`
3. Click "Inspect" to see the LinkedIn preview
4. Test different pages

#### **WhatsApp Testing:**
1. Open WhatsApp on your phone
2. Send a message with your website URL
3. Wait for the link preview to load
4. Check if the image and description appear correctly

### **4. What You Should See**

When testing, you should see:

#### **Image Preview:**
- **Size**: 1200x630 pixels
- **Background**: Dark gradient (black to dark gray)
- **Logo**: Gold "A" in a circle
- **Title**: "Axis Tours & Travel" in white
- **Subtitle**: "Your Premier Travel Partner in Kenya" in gold
- **Description**: Brief description of the page content

#### **Text Preview:**
- **Title**: Page-specific title with "Axis Tours & Travel"
- **Description**: Compelling description of the page content
- **URL**: Your custom domain `axistoursandtravel.co.ke`

### **5. Testing Checklist**

- [ ] Homepage shows correct OG image and description
- [ ] Hotels page shows hotel-specific OG image
- [ ] List Property page shows property listing OG image
- [ ] All pages show consistent branding
- [ ] Images load properly on all platforms
- [ ] Descriptions are relevant to each page
- [ ] URLs are correct and working

### **6. Common Issues & Solutions**

#### **Issue: Image not showing**
- **Solution**: Check if the OG image URL is accessible
- **Test**: Visit `https://axistoursandtravel.co.ke/og-images/homepage-og.html` directly

#### **Issue: Wrong description showing**
- **Solution**: Clear browser cache and test again
- **Test**: Use incognito/private browsing mode

#### **Issue: Social media not updating**
- **Solution**: Use the platform's debugger to force refresh
- **Test**: Facebook Debugger has a "Scrape Again" button

### **7. Advanced Testing**

#### **Test Different Devices:**
- Desktop browser
- Mobile browser
- Social media apps (Facebook, Twitter, LinkedIn, WhatsApp)

#### **Test Different Browsers:**
- Chrome
- Firefox
- Safari
- Edge

#### **Test Different Pages:**
- Homepage
- Hotels
- Tours
- Safaris
- Experiences
- List Property
- About
- Contact

### **8. Performance Monitoring**

After implementation, monitor:
- **Click-through rates** from social media
- **Engagement** on shared links
- **Image loading times**
- **Mobile responsiveness** of previews

### **9. Quick Test Commands**

```bash
# Test if OG images are accessible
curl -I https://axistoursandtravel.co.ke/og-images/homepage-og.html

# Test if meta tags are present
curl -s https://axistoursandtravel.co.ke | grep -i "og:"

# Test if Twitter cards are present
curl -s https://axistoursandtravel.co.ke | grep -i "twitter:"
```

### **10. Success Indicators**

✅ **Success when you see:**
- Professional branded images on all platforms
- Consistent title and description formatting
- Fast loading times for previews
- Mobile-friendly preview layouts
- Correct URLs and branding

---

## 🚀 **Ready to Test!**

Your social media SEO implementation is complete and ready for testing. Start with the local testing, then move to the live website, and finally test on the actual social media platforms.

**Need help?** Check the `social-media-test.html` file for an interactive testing tool!
