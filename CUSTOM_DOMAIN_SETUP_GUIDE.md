# 🌐 Custom Domain Setup Guide for axistoursandtravel.co.ke

## 📋 Prerequisites
- Firebase project: `axis-tours-backend`
- Current hosting URL: `https://axis-tours-backend.web.app`
- Custom domain: `axistoursandtravel.co.ke`
- Access to your domain registrar (where you bought the domain)

## 🚀 Step 1: Add Custom Domain in Firebase Console

### 1.1 Open Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `axis-tours-backend`
3. Click on **"Hosting"** in the left sidebar

### 1.2 Add Custom Domain
1. Click **"Add custom domain"** button
2. Enter your domain: `axistoursandtravel.co.ke`
3. Click **"Continue"**

### 1.3 Get DNS Records
Firebase will provide you with DNS records to add. You'll typically see:
- **TXT Record** (for domain verification)
- **A Record** (IPv4)
- **AAAA Record** (IPv6)

**Example records you might see:**
```
Type: TXT
Name: @
Value: firebase=axis-tours-backend

Type: A
Name: @
Value: 151.101.1.195

Type: A
Name: @
Value: 151.101.65.195

Type: AAAA
Name: @
Value: 2a04:4e42::645
```

## 🔧 Step 2: Configure DNS at Your Domain Registrar

### 2.1 Access Your Domain Registrar
Log into your domain registrar (where you bought axistoursandtravel.co.ke)

### 2.2 Delete Existing DNS Records
**IMPORTANT:** Delete ALL existing DNS records first:
- Any existing A records
- Any existing CNAME records
- Any existing MX records (if not needed for email)
- Any existing TXT records

### 2.3 Add Firebase DNS Records
Add the exact records provided by Firebase:

1. **TXT Record** (Domain Verification)
   - Type: TXT
   - Name: @ (or leave blank)
   - Value: [The TXT value from Firebase]

2. **A Records** (IPv4)
   - Type: A
   - Name: @ (or leave blank)
   - Value: [First A record IP from Firebase]
   - Type: A
   - Name: @ (or leave blank)
   - Value: [Second A record IP from Firebase]

3. **AAAA Record** (IPv6)
   - Type: AAAA
   - Name: @ (or leave blank)
   - Value: [AAAA record IP from Firebase]

### 2.4 Save Changes
Save all DNS changes at your registrar

## ⏱️ Step 3: Wait for DNS Propagation

### 3.1 DNS Propagation Time
- **Typical time**: 5-60 minutes
- **Maximum time**: Up to 48 hours
- **Check status**: Use online DNS checkers

### 3.2 Verify DNS Records
Use these tools to check if your DNS records are propagated:
- [DNS Checker](https://dnschecker.org/)
- [What's My DNS](https://whatsmydns.net/)

## ✅ Step 4: Complete Setup in Firebase

### 4.1 Return to Firebase Console
1. Go back to Firebase Console → Hosting
2. You should see your domain with a status indicator

### 4.2 Wait for SSL Certificate
- Firebase automatically provisions SSL certificates
- This usually takes 5-10 minutes after DNS propagation
- Status will change from "Pending" to "Connected"

## 🔍 Step 5: Verify Setup

### 5.1 Test Your Domain
1. Visit `https://axistoursandtravel.co.ke`
2. You should see your website
3. Check that SSL certificate is working (green lock icon)

### 5.2 Test Both URLs
- `https://axistoursandtravel.co.ke` (custom domain)
- `https://axis-tours-backend.web.app` (Firebase URL)

Both should show the same content.

## 🚨 Troubleshooting

### Common Issues:

1. **"DNS request failed"**
   - Check that you deleted ALL existing DNS records
   - Verify you added the exact records from Firebase
   - Wait for DNS propagation (up to 48 hours)

2. **SSL Certificate Issues**
   - Wait 10-15 minutes after DNS propagation
   - Clear browser cache
   - Try incognito/private browsing

3. **Domain Not Loading**
   - Check DNS propagation status
   - Verify all DNS records are correct
   - Contact your domain registrar if needed

### DNS Check Commands:
```bash
# Check A records
nslookup axistoursandtravel.co.ke

# Check TXT records
nslookup -type=TXT axistoursandtravel.co.ke

# Check AAAA records
nslookup -type=AAAA axistoursandtravel.co.ke
```

## 📞 Support

If you encounter issues:
1. Check Firebase Console for error messages
2. Verify DNS records are correct
3. Wait for full DNS propagation
4. Contact your domain registrar if DNS issues persist

## 🎯 Expected Result

After successful setup:
- ✅ `https://axistoursandtravel.co.ke` loads your website
- ✅ SSL certificate is active (green lock)
- ✅ Both custom domain and Firebase URL work
- ✅ No redirect loops or errors

---

**Note**: The exact DNS records will be provided by Firebase Console when you add the custom domain. Use those exact values, not the examples above.
