// Example integration of Supabase with Partner Dashboard
// This file shows how to replace static data with real database calls

import { 
  supabase, 
  getHotels, 
  createHotel, 
  updateHotel, 
  deleteHotel,
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  subscribeToHotels,
  subscribeToRooms
} from './supabase.js'

// Initialize dashboard with real data
async function initializeDashboard() {
  try {
    // Get current user
    const user = await supabase.auth.getUser()
    if (!user.data.user) {
      window.location.href = 'hotel-partner-portal.html'
      return
    }

    // Load hotels for this partner
    await loadPartnerHotels(user.data.user.id)
    
    // Set up real-time subscriptions
    setupRealTimeUpdates(user.data.user.id)
    
  } catch (error) {
    console.error('Error initializing dashboard:', error)
    showNotification('Error loading dashboard', 'error')
  }
}

// Load partner's hotels
async function loadPartnerHotels(partnerId) {
  try {
    const { data: hotels, error } = await supabase
      .from('hotels')
      .select('*')
      .eq('partner_id', partnerId)
      .order('created_at', { ascending: false })

    if (error) throw error
    
    // Update dashboard stats
    updateDashboardStats(hotels)
    
    // Render hotels list
    renderHotelsList(hotels)
    
  } catch (error) {
    console.error('Error loading hotels:', error)
    showNotification('Error loading hotels', 'error')
  }
}

// Create new hotel
async function createNewHotel(hotelData) {
  try {
    const user = await supabase.auth.getUser()
    if (!user.data.user) throw new Error('User not authenticated')

    const hotelWithPartner = {
      ...hotelData,
      partner_id: user.data.user.id
    }

    const { data, error } = await createHotel(hotelWithPartner)
    if (error) throw error

    showNotification('Hotel created successfully!', 'success')
    
    // Refresh hotels list
    await loadPartnerHotels(user.data.user.id)
    
    return data
    
  } catch (error) {
    console.error('Error creating hotel:', error)
    showNotification('Error creating hotel: ' + error.message, 'error')
    throw error
  }
}

// Update hotel
async function updateExistingHotel(hotelId, updates) {
  try {
    const { data, error } = await updateHotel(hotelId, updates)
    if (error) throw error

    showNotification('Hotel updated successfully!', 'success')
    
    // Refresh hotels list
    const user = await supabase.auth.getUser()
    await loadPartnerHotels(user.data.user.id)
    
    return data
    
  } catch (error) {
    console.error('Error updating hotel:', error)
    showNotification('Error updating hotel: ' + error.message, 'error')
    throw error
  }
}

// Delete hotel
async function deleteExistingHotel(hotelId) {
  try {
    if (!confirm('Are you sure you want to delete this hotel? This action cannot be undone.')) {
      return
    }

    const { error } = await deleteHotel(hotelId)
    if (error) throw error

    showNotification('Hotel deleted successfully!', 'success')
    
    // Refresh hotels list
    const user = await supabase.auth.getUser()
    await loadPartnerHotels(user.data.user.id)
    
  } catch (error) {
    console.error('Error deleting hotel:', error)
    showNotification('Error deleting hotel: ' + error.message, 'error')
  }
}

// Load rooms for a specific hotel
async function loadHotelRooms(hotelId) {
  try {
    const { data: rooms, error } = await getRooms(hotelId)
    if (error) throw error
    
    renderRoomsList(rooms, hotelId)
    
  } catch (error) {
    console.error('Error loading rooms:', error)
    showNotification('Error loading rooms', 'error')
  }
}

// Create new room
async function createNewRoom(roomData) {
  try {
    const { data, error } = await createRoom(roomData)
    if (error) throw error

    showNotification('Room created successfully!', 'success')
    
    // Refresh rooms list
    await loadHotelRooms(roomData.hotel_id)
    
    return data
    
  } catch (error) {
    console.error('Error creating room:', error)
    showNotification('Error creating room: ' + error.message, 'error')
    throw error
  }
}

// Update room
async function updateExistingRoom(roomId, updates) {
  try {
    const { data, error } = await updateRoom(roomId, updates)
    if (error) throw error

    showNotification('Room updated successfully!', 'success')
    
    // Refresh rooms list
    await loadHotelRooms(updates.hotel_id)
    
    return data
    
  } catch (error) {
    console.error('Error updating room:', error)
    showNotification('Error updating room: ' + error.message, 'error')
    throw error
  }
}

// Delete room
async function deleteExistingRoom(roomId, hotelId) {
  try {
    if (!confirm('Are you sure you want to delete this room?')) {
      return
    }

    const { error } = await deleteRoom(roomId)
    if (error) throw error

    showNotification('Room deleted successfully!', 'success')
    
    // Refresh rooms list
    await loadHotelRooms(hotelId)
    
  } catch (error) {
    console.error('Error deleting room:', error)
    showNotification('Error deleting room: ' + error.message, 'error')
  }
}

// Set up real-time updates
function setupRealTimeUpdates(partnerId) {
  // Subscribe to hotel changes
  subscribeToHotels((payload) => {
    console.log('Hotel change detected:', payload)
    
    // Only refresh if it's a hotel owned by this partner
    if (payload.new && payload.new.partner_id === partnerId) {
      loadPartnerHotels(partnerId)
    }
  })

  // Subscribe to room changes for all hotels owned by this partner
  // This would need to be set up per hotel when viewing rooms
}

// Update dashboard statistics
function updateDashboardStats(hotels) {
  const totalHotels = hotels.length
  const totalRooms = hotels.reduce((sum, hotel) => sum + (hotel.room_count || 0), 0)
  const totalBookings = hotels.reduce((sum, hotel) => sum + (hotel.booking_count || 0), 0)
  const totalRevenue = hotels.reduce((sum, hotel) => sum + (hotel.total_revenue || 0), 0)

  // Update stats display
  document.getElementById('totalHotels').textContent = totalHotels
  document.getElementById('totalRooms').textContent = totalRooms
  document.getElementById('totalBookings').textContent = totalBookings
  document.getElementById('totalRevenue').textContent = formatCurrency(totalRevenue)
}

// Render hotels list
function renderHotelsList(hotels) {
  const hotelsContainer = document.getElementById('hotelsList')
  if (!hotelsContainer) return

  hotelsContainer.innerHTML = hotels.map(hotel => `
    <div class="hotel-card" data-hotel-id="${hotel.id}">
      <div class="hotel-image">
        <img src="${hotel.images?.[0] || 'placeholder.jpg'}" alt="${hotel.name}">
      </div>
      <div class="hotel-info">
        <h3>${hotel.name}</h3>
        <p>${hotel.location}</p>
        <div class="hotel-stats">
          <span>${hotel.room_count || 0} Rooms</span>
          <span>${hotel.rating || 'N/A'}★</span>
        </div>
      </div>
      <div class="hotel-actions">
        <button onclick="editHotel('${hotel.id}')" class="btn-edit">Edit</button>
        <button onclick="deleteHotel('${hotel.id}')" class="btn-delete">Delete</button>
        <button onclick="manageRooms('${hotel.id}')" class="btn-manage">Manage Rooms</button>
      </div>
    </div>
  `).join('')
}

// Render rooms list
function renderRoomsList(rooms, hotelId) {
  const roomsContainer = document.getElementById('roomsList')
  if (!roomsContainer) return

  roomsContainer.innerHTML = rooms.map(room => `
    <div class="room-card" data-room-id="${room.id}">
      <div class="room-image">
        <img src="${room.images?.[0] || 'placeholder.jpg'}" alt="${room.name}">
      </div>
      <div class="room-info">
        <h3>${room.name}</h3>
        <p>${room.description}</p>
        <div class="room-stats">
          <span>KES ${room.price}</span>
          <span>${room.capacity} Guests</span>
        </div>
      </div>
      <div class="room-actions">
        <button onclick="editRoom('${room.id}')" class="btn-edit">Edit</button>
        <button onclick="deleteRoom('${room.id}', '${hotelId}')" class="btn-delete">Delete</button>
      </div>
    </div>
  `).join('')
}

// Utility functions
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES'
  }).format(amount)
}

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div')
  notification.className = `notification notification-${type}`
  notification.textContent = message
  
  // Add to page
  document.body.appendChild(notification)
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.remove()
  }, 3000)
}

// Export functions for use in HTML
window.initializeDashboard = initializeDashboard
window.createNewHotel = createNewHotel
window.updateExistingHotel = updateExistingHotel
window.deleteExistingHotel = deleteExistingHotel
window.createNewRoom = createNewRoom
window.updateExistingRoom = updateExistingRoom
window.deleteExistingRoom = deleteExistingRoom
window.loadHotelRooms = loadHotelRooms
