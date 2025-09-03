# 🚀 Quick Supabase Setup Guide

## Step 1: Create Supabase Account (5 minutes)
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" 
3. Sign in with GitHub
4. Click "New Project"
5. Choose your organization
6. Enter project name: `axis-tours-backend`
7. Enter database password (save this!)
8. Choose region closest to Kenya
9. Click "Create new project"

## Step 2: Get Your Credentials (2 minutes)
1. In your project dashboard, go to **Settings** → **API**
2. Copy your **Project URL** (looks like: `https://abcdefghijklmnop.supabase.co`)
3. Copy your **anon public** key (starts with `eyJ...`)
4. Save both somewhere safe

## Step 3: Set Up Database Tables (10 minutes)
1. Go to **SQL Editor** in your Supabase dashboard
2. Copy and paste this SQL code:

```sql
-- Create users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  full_name VARCHAR,
  phone VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create hotels table
CREATE TABLE hotels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  location VARCHAR,
  rating DECIMAL(2,1),
  price_range VARCHAR,
  amenities TEXT[],
  images TEXT[],
  partner_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create rooms table
CREATE TABLE rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hotel_id UUID REFERENCES hotels(id),
  name VARCHAR NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  capacity INTEGER,
  amenities TEXT[],
  images TEXT[],
  availability JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  hotel_id UUID REFERENCES hotels(id),
  room_id UUID REFERENCES rooms(id),
  check_in DATE,
  check_out DATE,
  guests INTEGER,
  total_amount DECIMAL(10,2),
  status VARCHAR DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

3. Click **Run** to execute the SQL

## Step 4: Enable Row Level Security (5 minutes)
1. In **SQL Editor**, run this:

```sql
-- Enable RLS
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can view hotels" ON hotels FOR SELECT USING (true);
CREATE POLICY "Partners can manage own hotels" ON hotels FOR ALL USING (partner_id = auth.uid());

CREATE POLICY "Public can view rooms" ON rooms FOR SELECT USING (true);
CREATE POLICY "Partners can manage own hotel rooms" ON rooms FOR ALL USING (
  hotel_id IN (SELECT id FROM hotels WHERE partner_id = auth.uid())
);

CREATE POLICY "Users can view own bookings" ON bookings FOR ALL USING (user_id = auth.uid());
```

## Step 5: Set Up File Storage (5 minutes)
1. Go to **Storage** in your dashboard
2. Click **Create a new bucket**
3. Name: `hotel-images`
4. Make it **Public**
5. Click **Create bucket**

## Step 6: Update Your Website (5 minutes)
1. Open `js/supabase.js`
2. Replace `YOUR_SUPABASE_PROJECT_URL` with your actual project URL
3. Replace `YOUR_SUPABASE_ANON_KEY` with your actual anon key

## Step 7: Install Dependencies (2 minutes)
```bash
npm install
```

## Step 8: Test It! (5 minutes)
1. Open your website
2. Go to Partner Portal
3. Try to sign up/sign in
4. Check browser console for any errors

## 🎯 What You Get
- ✅ **Database**: PostgreSQL with real-time updates
- ✅ **Authentication**: User signup/login system
- ✅ **File Storage**: Image uploads for hotels
- ✅ **Security**: Row-level security policies
- ✅ **Real-time**: Live updates across all users
- ✅ **API**: Automatic REST API generation
- ✅ **Hosting**: Cloud-hosted, no server management

## 🔧 Troubleshooting
- **"Module not found"**: Run `npm install` first
- **"Invalid API key"**: Check your credentials in `supabase.js`
- **"Table doesn't exist"**: Make sure you ran the SQL commands
- **"Permission denied"**: Check your RLS policies

## 📱 Next Steps
1. Test basic functionality
2. Add more features (reviews, payments, etc.)
3. Customize the database schema
4. Add more security policies
5. Set up email notifications

## 💰 Cost
- **Free tier**: 500MB database, 50K users/month, 2GB storage
- **Paid**: Only when you exceed free limits
- **No hidden costs** - you only pay for what you use

## 🆘 Need Help?
- Supabase docs: [supabase.com/docs](https://supabase.com/docs)
- Community: [github.com/supabase/supabase/discussions](https://github.com/supabase/supabase/discussions)
- Discord: [discord.supabase.com](https://discord.supabase.com)

---

**Total setup time: ~30 minutes** ⏱️
**Cost: FREE** 💰
**Complexity: Beginner-friendly** 🌟
