# 🔧 DNS Troubleshooting Guide
## Fixing "DNS request failed" for axistoursandtravel.co.ke

This guide will help you resolve the DNS configuration error and successfully connect your custom domain to Firebase hosting.

## 🚨 Current Issue
**Error**: "Hosting's DNS request for axistoursandtravel.co.ke failed; contact your DNS provider for support"

## 🔍 Common Causes & Solutions

### 1. **Incorrect DNS Records**
The most common cause is incorrect or missing DNS records.

### 2. **DNS Propagation Delay**
Changes can take 24-48 hours to propagate globally.

### 3. **Domain Registrar Issues**
Some registrars have specific requirements or restrictions.

## 🛠️ Step-by-Step Fix

### Step 1: Check Current DNS Records

First, let's check what DNS records currently exist for your domain:

**Online DNS Checker Tools:**
- https://dnschecker.org/
- https://www.whatsmydns.net/
- https://toolbox.googleapps.com/apps/dig/

**Command Line Check:**
```bash
# Check A records
nslookup axistoursandtravel.co.ke

# Check all records
dig axistoursandtravel.co.ke ANY
```

### Step 2: Correct DNS Configuration

You need to add these **exact** DNS records in your domain registrar's control panel:

#### **Option A: Root Domain (axistoursandtravel.co.ke)**

**1. TXT Record (Verification)**
```
Type: TXT
Name: @ (or leave blank)
Value: firebase=axis-tours-backend
TTL: 3600
```

**2. A Records (IPv4)**
```
Type: A
Name: @ (or leave blank)
Value: 151.101.1.195
TTL: 3600

Type: A
Name: @ (or leave blank)
Value: 151.101.65.195
TTL: 3600
```

**3. AAAA Record (IPv6)**
```
Type: AAAA
Name: @ (or leave blank)
Value: 2a04:4e42::645
TTL: 3600
```

#### **Option B: WWW Subdomain (Recommended)**

If root domain doesn't work, try using www subdomain:

**1. CNAME Record**
```
Type: CNAME
Name: www
Value: axis-tours-backend.web.app
TTL: 3600
```

**2. TXT Record (Verification)**
```
Type: TXT
Name: www
Value: firebase=axis-tours-backend
TTL: 3600
```

### Step 3: Remove Conflicting Records

**Important**: Remove any existing A, CNAME, or other records that might conflict:

- Remove any existing A records pointing to other IPs
- Remove any existing CNAME records
- Remove any existing MX records (unless you need email)
- Keep only the Firebase records

### Step 4: Wait for Propagation

- **DNS Propagation**: 24-48 hours (usually 2-6 hours)
- **Firebase Verification**: 1-2 hours after DNS propagation

## 🔧 Domain Registrar Specific Instructions

### **Popular Registrars:**

#### **GoDaddy**
1. Login to GoDaddy
2. Go to "My Products" → "DNS"
3. Find your domain → "Manage DNS"
4. Delete existing A records
5. Add new records as specified above

#### **Namecheap**
1. Login to Namecheap
2. Go to "Domain List" → "Manage"
3. Go to "Advanced DNS"
4. Delete existing A records
5. Add new records as specified above

#### **Cloudflare**
1. Login to Cloudflare
2. Select your domain
3. Go to "DNS" → "Records"
4. Delete existing A records
5. Add new records as specified above
6. **Important**: Set proxy status to "DNS only" (gray cloud)

#### **Google Domains**
1. Login to Google Domains
2. Select your domain
3. Go to "DNS"
4. Delete existing A records
5. Add new records as specified above

## 🧪 Testing Your DNS Configuration

### **Test Commands:**
```bash
# Test A records
nslookup axistoursandtravel.co.ke

# Test TXT record
nslookup -type=TXT axistoursandtravel.co.ke

# Test from different locations
dig @8.8.8.8 axistoursandtravel.co.ke
dig @1.1.1.1 axistoursandtravel.co.ke
```

### **Expected Results:**
```
A records should return:
151.101.1.195
151.101.65.195

TXT record should return:
firebase=axis-tours-backend
```

## 🚨 Alternative Solutions

### **Solution 1: Use WWW Subdomain**
If root domain continues to fail, use www subdomain:

1. In Firebase Console, add: `www.axistoursandtravel.co.ke`
2. Add CNAME record: `www` → `axis-tours-backend.web.app`
3. Add TXT record: `www` → `firebase=axis-tours-backend`

### **Solution 2: Contact Domain Registrar**
If DNS records are correct but still failing:

1. Contact your domain registrar support
2. Ask them to:
   - Verify DNS records are properly configured
   - Check for any domain restrictions
   - Ensure domain is not locked or suspended

### **Solution 3: Use Different DNS Provider**
If your current registrar has issues:

1. Transfer DNS management to Cloudflare (free)
2. Or use Google DNS
3. Configure records in the new provider

## 📋 Troubleshooting Checklist

- [ ] Check current DNS records using online tools
- [ ] Remove all conflicting DNS records
- [ ] Add correct Firebase DNS records
- [ ] Wait 24-48 hours for propagation
- [ ] Test DNS records using nslookup/dig
- [ ] Verify in Firebase Console
- [ ] Test website accessibility
- [ ] Contact domain registrar if issues persist

## 🔍 Common Mistakes

1. **Wrong IP Addresses**: Using old or incorrect Firebase IPs
2. **Conflicting Records**: Leaving old A records that conflict
3. **Wrong Record Types**: Using CNAME for root domain
4. **TTL Too High**: Setting TTL to 86400 (24 hours) slows propagation
5. **Missing TXT Record**: Firebase needs TXT record for verification

## 📞 Support Contacts

### **Firebase Support**
- https://firebase.google.com/support
- Firebase Console → Help & Support

### **Domain Registrar Support**
- Contact your domain registrar's support team
- Provide them with the exact DNS records needed

## 🎯 Expected Timeline

1. **DNS Changes**: Immediate (in your registrar's panel)
2. **Propagation**: 2-48 hours (usually 2-6 hours)
3. **Firebase Verification**: 1-2 hours after propagation
4. **SSL Certificate**: 1-2 hours after verification
5. **Website Live**: Immediately after SSL is ready

## ✅ Success Indicators

You'll know it's working when:
- Firebase Console shows "Connected" with green checkmark
- `https://axistoursandtravel.co.ke` loads your website
- Alexa Bot appears on all pages
- SSL certificate is active (green lock in browser)

---

## 🚀 Quick Fix Summary

1. **Remove all existing DNS records** for your domain
2. **Add only these records**:
   - TXT: `firebase=axis-tours-backend`
   - A: `151.101.1.195`
   - A: `151.101.65.195`
   - AAAA: `2a04:4e42::645`
3. **Wait 24-48 hours** for propagation
4. **Test** using online DNS checkers
5. **Verify** in Firebase Console

Your website with Alexa Bot will be live at: **https://axistoursandtravel.co.ke** 🎉
