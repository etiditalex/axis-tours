import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase credentials
const supabaseUrl = 'YOUR_SUPABASE_PROJECT_URL'
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Authentication functions
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

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Hotel management functions
export async function getHotels() {
  const { data, error } = await supabase
    .from('hotels')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function getHotelById(id) {
  const { data, error } = await supabase
    .from('hotels')
    .select('*')
    .eq('id', id)
    .single()
  return { data, error }
}

export async function createHotel(hotelData) {
  const { data, error } = await supabase
    .from('hotels')
    .insert([hotelData])
    .select()
  return { data, error }
}

export async function updateHotel(id, updates) {
  const { data, error } = await supabase
    .from('hotels')
    .update(updates)
    .eq('id', id)
    .select()
  return { data, error }
}

export async function deleteHotel(id) {
  const { error } = await supabase
    .from('hotels')
    .delete()
    .eq('id', id)
  return { error }
}

// Room management functions
export async function getRooms(hotelId) {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('hotel_id', hotelId)
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function createRoom(roomData) {
  const { data, error } = await supabase
    .from('rooms')
    .insert([roomData])
    .select()
  return { data, error }
}

export async function updateRoom(id, updates) {
  const { data, error } = await supabase
    .from('rooms')
    .update(updates)
    .eq('id', id)
    .select()
  return { data, error }
}

export async function deleteRoom(id) {
  const { error } = await supabase
    .from('rooms')
    .delete()
    .eq('id', id)
  return { error }
}

// Booking functions
export async function createBooking(bookingData) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([bookingData])
    .select()
  return { data, error }
}

export async function getUserBookings(userId) {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      hotels(name, location),
      rooms(name, price)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function updateBooking(id, updates) {
  const { data, error } = await supabase
    .from('bookings')
    .update(updates)
    .eq('id', id)
    .select()
  return { data, error }
}

// File upload functions
export async function uploadImage(bucket, filePath, file) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file)
  return { data, error }
}

export async function getImageUrl(bucket, filePath) {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath)
  return data.publicUrl
}

// Real-time subscriptions
export function subscribeToHotels(callback) {
  return supabase
    .channel('hotels')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'hotels' }, 
      callback
    )
    .subscribe()
}

export function subscribeToRooms(hotelId, callback) {
  return supabase
    .channel(`rooms-${hotelId}`)
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'rooms', filter: `hotel_id=eq.${hotelId}` }, 
      callback
    )
    .subscribe()
}

export function subscribeToBookings(userId, callback) {
  return supabase
    .channel(`bookings-${userId}`)
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'bookings', filter: `user_id=eq.${userId}` }, 
      callback
    )
    .subscribe()
}

// Utility functions
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES'
  }).format(amount)
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function generateBookingId() {
  return 'BK' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase()
}
