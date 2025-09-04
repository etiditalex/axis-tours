# 🌐 Custom Domain Setup Guide
## axistoursandtravel.co.ke → Firebase Hosting

This guide will help you connect your custom domain `axistoursandtravel.co.ke` to your Firebase hosting so your website (including Alexa Bot) will be accessible through your professional domain.

## 📋 Prerequisites

- ✅ Firebase project: `axis-tours-backend`
- ✅ Current hosting URL: `https://axis-tours-backend.web.app`
- ✅ Custom domain: `axistoursandtravel.co.ke`
- ✅ Domain registrar access (where you bought the domain)

## 🚀 Step-by-Step Setup

### Step 1: Add Custom Domain in Firebase Console

1. **Open Firebase Console**
   - Go to: https://console.firebase.google.com/project/axis-tours-backend/hosting/main
   - Or: https://console.firebase.google.com/project/axis-tours-backend

2. **Navigate to Hosting**
   - Click on "Hosting" in the left sidebar
   - You should see your current site: `axis-tours-backend.web.app`

3. **Add Custom Domain**
   - Click "Add custom domain" button
   - Enter: `axistoursandtravel.co.ke`
   - Click "Continue"

4. **Domain Verification**
   - Firebase will show you DNS records to add
   - You'll see something like:
     ```
     Type: TXT
     Name: @
     Value: firebase=axis-tours-backend
     ```

### Step 2: Configure DNS Records

You need to add DNS records in your domain registrar's control panel:

#### Option A: Root Domain (axistoursandtravel.co.ke)

**Add these DNS records:**

1. **Verification Record (TXT)**
   ```
   Type: TXT
   Name: @ (or leave blank)
   Value: firebase=axis-tours-backend
   TTL: 3600 (or default)
   ```

2. **A Record (IPv4)**
   ```
   Type: A
   Name: @ (or leave blank)
   Value: 151.101.1.195
   TTL: 3600
   ```

3. **A Record (IPv4)**
   ```
   Type: A
   Name: @ (or leave blank)
   Value: 151.101.65.195
   TTL: 3600
   ```

4. **AAAA Record (IPv6)**
   ```
   Type: AAAA
   Name: @ (or leave blank)
   Value: 2a04:4e42::645
   TTL: 3600
   ```

#### Option B: WWW Subdomain (www.axistoursandtravel.co.ke)

If you prefer to use www subdomain:

1. **CNAME Record**
   ```
   Type: CNAME
   Name: www
   Value: axis-tours-backend.web.app
   TTL: 3600
   ```

### Step 3: Wait for Propagation

- **DNS Propagation**: 24-48 hours (usually much faster)
- **SSL Certificate**: Firebase will automatically provision SSL
- **Verification**: Firebase will verify domain ownership

### Step 4: Verify Setup

1. **Check Firebase Console**
   - Go back to Firebase Hosting
   - Your domain should show as "Connected" with green checkmark

2. **Test Your Domain**
   - Visit: `https://axistoursandtravel.co.ke`
   - Should redirect to your website with Alexa Bot

## 🔧 Alternative: Firebase CLI Method

If you prefer using command line:

```bash
# Add custom domain (this will open browser for verification)
firebase hosting:channel:deploy live --only hosting

# Or use the Firebase Console method above
```

## 📱 Testing Your Custom Domain

Once setup is complete, test these URLs:

- ✅ `https://axistoursandtravel.co.ke` (main site)
- ✅ `https://axistoursandtravel.co.ke/about.html` (about page)
- ✅ `https://axistoursandtravel.co.ke/hotels.html` (hotels page)
- ✅ `https://axistoursandtravel.co.ke/booking.html` (booking page)

**Alexa Bot should work on all pages!**

## 🛠️ Troubleshooting

### Common Issues:

1. **Domain Not Resolving**
   - Wait 24-48 hours for DNS propagation
   - Check DNS records are correct
   - Use online DNS checker tools

2. **SSL Certificate Issues**
   - Firebase automatically provisions SSL
   - Wait for certificate to be issued (usually 1-2 hours)

3. **Redirect Issues**
   - Ensure A records point to correct IPs
   - Check CNAME records if using www subdomain

### DNS Check Tools:
- https://dnschecker.org/
- https://www.whatsmydns.net/
- https://toolbox.googleapps.com/apps/dig/

## 🎯 Expected Results

After successful setup:

1. **Professional URL**: `https://axistoursandtravel.co.ke`
2. **SSL Certificate**: Automatic HTTPS with green lock
3. **Alexa Bot**: Available on all pages
4. **SEO Benefits**: Better search engine ranking
5. **Brand Recognition**: Professional domain name

## 📞 Support

If you encounter issues:

1. **Firebase Support**: https://firebase.google.com/support
2. **Domain Registrar**: Contact your domain provider
3. **DNS Issues**: Check with your hosting provider

## 🚀 Next Steps After Setup

1. **Update Social Media**: Use new domain in profiles
2. **Email Signatures**: Update with new website URL
3. **Business Cards**: Print new domain
4. **Google My Business**: Update website URL
5. **Analytics**: Update Google Analytics property

---

## ⚡ Quick Setup Checklist

- [ ] Add domain in Firebase Console
- [ ] Add TXT verification record
- [ ] Add A records (151.101.1.195, 151.101.65.195)
- [ ] Add AAAA record (2a04:4e42::645)
- [ ] Wait for DNS propagation (24-48 hours)
- [ ] Verify domain in Firebase Console
- [ ] Test website accessibility
- [ ] Confirm Alexa Bot is working

**Your professional website with Alexa Bot will be live at: `https://axistoursandtravel.co.ke`** 🎉
