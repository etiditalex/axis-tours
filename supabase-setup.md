# Supabase Backend Setup Guide

## 1. Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Sign up with GitHub
3. Create a new project
4. Note down your project URL and anon key

## 2. Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  full_name VARCHAR,
  phone VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Hotels Table
```sql
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
```

### Rooms Table
```sql
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
```

### Bookings Table
```sql
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

## 3. Install Supabase Client
```bash
npm install @supabase/supabase-js
```

## 4. Environment Configuration
Create a `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 5. Supabase Client Setup
Create `js/supabase.js`:
```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## 6. Authentication Functions
```javascript
// Sign up
export async function signUp(email, password, fullName) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName
      }
    }
  })
  return { data, error }
}

// Sign in
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

// Sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}
```

## 7. Database Functions
```javascript
// Get hotels
export async function getHotels() {
  const { data, error } = await supabase
    .from('hotels')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

// Create hotel
export async function createHotel(hotelData) {
  const { data, error } = await supabase
    .from('hotels')
    .insert([hotelData])
    .select()
  return { data, error }
}

// Update hotel
export async function updateHotel(id, updates) {
  const { data, error } = await supabase
    .from('hotels')
    .update(updates)
    .eq('id', id)
    .select()
  return { data, error }
}

// Delete hotel
export async function deleteHotel(id) {
  const { error } = await supabase
    .from('hotels')
    .delete()
    .eq('id', id)
  return { error }
}
```

## 8. Real-time Subscriptions
```javascript
// Subscribe to hotel updates
export function subscribeToHotels(callback) {
  return supabase
    .channel('hotels')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'hotels' }, 
      callback
    )
    .subscribe()
}
```

## 9. File Upload
```javascript
// Upload hotel images
export async function uploadHotelImages(hotelId, files) {
  const filePaths = []
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const fileName = `${hotelId}/${Date.now()}_${i}.jpg`
    
    const { data, error } = await supabase.storage
      .from('hotel-images')
      .upload(fileName, file)
    
    if (error) throw error
    filePaths.push(data.path)
  }
  
  return filePaths
}
```

## 10. Row Level Security (RLS)
Enable RLS and create policies:

```sql
-- Enable RLS
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Hotels: Partners can only see their own hotels
CREATE POLICY "Partners can view own hotels" ON hotels
  FOR ALL USING (partner_id = auth.uid());

-- Hotels: Public can view all hotels
CREATE POLICY "Public can view hotels" ON hotels
  FOR SELECT USING (true);

-- Rooms: Public can view all rooms
CREATE POLICY "Public can view rooms" ON rooms
  FOR SELECT USING (true);

-- Bookings: Users can only see their own bookings
CREATE POLICY "Users can view own bookings" ON bookings
  FOR ALL USING (user_id = auth.uid());
```

## 11. Integration Steps
1. Replace static data with Supabase calls
2. Add authentication to partner portal
3. Implement real-time updates
4. Add form validation and error handling
5. Test all CRUD operations

## 12. Deployment
- Frontend: GitHub Pages (already set up)
- Backend: Supabase (cloud-hosted)
- Database: Supabase PostgreSQL
- File Storage: Supabase Storage
- Authentication: Supabase Auth

## Benefits of This Setup
- ✅ Completely free for small to medium projects
- ✅ No server management required
- ✅ Real-time capabilities
- ✅ Built-in authentication
- ✅ Automatic API generation
- ✅ PostgreSQL database
- ✅ File storage
- ✅ Row-level security
- ✅ Easy scaling

## Next Steps
1. Set up Supabase project
2. Create database tables
3. Install Supabase client
4. Replace static data with API calls
5. Add authentication
6. Test all functionality
