// Firebase Integration for Partner Dashboard
// This file replaces static data with real Firebase database calls

import { 
  auth,
  signUp,
  signIn,
  signOutUser,
  getCurrentUser,
  createHotel,
  getPartnerHotels,
  updateHotel,
  deleteHotel,
  createRoom,
  getRooms,
  updateRoom,
  deleteRoom,
  createBooking,
  getUserBookings,
  uploadImage,
  subscribeToHotels,
  subscribeToRooms,
  formatCurrency,
  formatDate,
  generateBookingId
} from './firebase.js';

// Initialize dashboard with real data
async function initializeDashboard() {
  try {
    // Check if user is authenticated
    const user = await getCurrentUser();
    if (!user) {
      // Redirect to login if not authenticated
      window.location.href = 'hotel-partner-portal.html';
      return;
    }

    console.log('User authenticated:', user.email);
    
    // Load hotels for this partner
    await loadPartnerHotels(user.uid);
    
    // Set up real-time updates
    setupRealTimeUpdates(user.uid);
    
    // Update user info display
    updateUserInfo(user);
    
  } catch (error) {
    console.error('Error initializing dashboard:', error);
    showNotification('Error loading dashboard: ' + error.message, 'error');
  }
}

// Load partner's hotels
async function loadPartnerHotels(partnerId) {
  try {
    const { data: hotels, error } = await getPartnerHotels(partnerId);
    
    if (error) throw new Error(error);
    
    console.log('Loaded hotels:', hotels);
    
    // Update dashboard stats
    updateDashboardStats(hotels);
    
    // Render hotels list
    renderHotelsList(hotels);
    
  } catch (error) {
    console.error('Error loading hotels:', error);
    showNotification('Error loading hotels: ' + error.message, 'error');
  }
}

// Create new hotel
async function createNewHotel(hotelData) {
  try {
    const { id, error } = await createHotel(hotelData);
    
    if (error) throw new Error(error);
    
    showNotification('Hotel created successfully!', 'success');
    
    // Refresh hotels list
    const user = await getCurrentUser();
    await loadPartnerHotels(user.uid);
    
    return { id, error: null };
    
  } catch (error) {
    console.error('Error creating hotel:', error);
    showNotification('Error creating hotel: ' + error.message, 'error');
    return { id: null, error: error.message };
  }
}

// Update hotel
async function updateExistingHotel(hotelId, updates) {
  try {
    const { error } = await updateHotel(hotelId, updates);
    
    if (error) throw new Error(error);
    
    showNotification('Hotel updated successfully!', 'success');
    
    // Refresh hotels list
    const user = await getCurrentUser();
    await loadPartnerHotels(user.uid);
    
    return { error: null };
    
  } catch (error) {
    console.error('Error updating hotel:', error);
    showNotification('Error updating hotel: ' + error.message, 'error');
    return { error: error.message };
  }
}

// Delete hotel
async function deleteExistingHotel(hotelId) {
  try {
    if (!confirm('Are you sure you want to delete this hotel? This action cannot be undone.')) {
      return;
    }

    const { error } = await deleteHotel(hotelId);
    
    if (error) throw new Error(error);
    
    showNotification('Hotel deleted successfully!', 'success');
    
    // Refresh hotels list
    const user = await getCurrentUser();
    await loadPartnerHotels(user.uid);
    
  } catch (error) {
    console.error('Error deleting hotel:', error);
    showNotification('Error deleting hotel: ' + error.message, 'error');
  }
}

// Load rooms for a specific hotel
async function loadHotelRooms(hotelId) {
  try {
    const { data: rooms, error } = await getRooms(hotelId);
    
    if (error) throw new Error(error);
    
    console.log('Loaded rooms:', rooms);
    renderRoomsList(rooms, hotelId);
    
  } catch (error) {
    console.error('Error loading rooms:', error);
    showNotification('Error loading rooms: ' + error.message, 'error');
  }
}

// Create new room
async function createNewRoom(roomData) {
  try {
    const { id, error } = await createRoom(roomData);
    
    if (error) throw new Error(error);
    
    showNotification('Room created successfully!', 'success');
    
    // Refresh rooms list
    await loadHotelRooms(roomData.hotel_id);
    
    return { id, error: null };
    
  } catch (error) {
    console.error('Error creating room:', error);
    showNotification('Error creating room: ' + error.message, 'error');
    return { id: null, error: error.message };
  }
}

// Update room
async function updateExistingRoom(roomId, updates) {
  try {
    const { error } = await updateRoom(roomId, updates);
    
    if (error) throw new Error(error);
    
    showNotification('Room updated successfully!', 'success');
    
    // Refresh rooms list
    await loadHotelRooms(updates.hotel_id);
    
    return { error: null };
    
  } catch (error) {
    console.error('Error updating room:', error);
    showNotification('Error updating room: ' + error.message, 'error');
    return { error: error.message };
  }
}

// Delete room
async function deleteExistingRoom(roomId, hotelId) {
  try {
    if (!confirm('Are you sure you want to delete this room?')) {
      return;
    }

    const { error } = await deleteRoom(roomId);
    
    if (error) throw new Error(error);
    
    showNotification('Room deleted successfully!', 'success');
    
    // Refresh rooms list
    await loadHotelRooms(hotelId);
    
  } catch (error) {
    console.error('Error deleting room:', error);
    showNotification('Error deleting room: ' + error.message, 'error');
  }
}

// Set up real-time updates
function setupRealTimeUpdates(partnerId) {
  // Subscribe to hotel changes
  const unsubscribeHotels = subscribeToHotels((hotels) => {
    // Filter hotels for this partner
    const partnerHotels = hotels.filter(hotel => hotel.partner_id === partnerId);
    updateDashboardStats(partnerHotels);
    renderHotelsList(partnerHotels);
  });

  // Store unsubscribe function for cleanup
  window.unsubscribeFirebase = unsubscribeHotels;
}

// Update dashboard statistics
function updateDashboardStats(hotels) {
  const totalHotels = hotels.length;
  const totalRooms = hotels.reduce((sum, hotel) => sum + (hotel.room_count || 0), 0);
  const totalBookings = hotels.reduce((sum, hotel) => sum + (hotel.booking_count || 0), 0);
  const totalRevenue = hotels.reduce((sum, hotel) => sum + (hotel.total_revenue || 0), 0);

  // Update stats display if elements exist
  const totalHotelsEl = document.getElementById('totalHotels');
  const totalRoomsEl = document.getElementById('totalRooms');
  const totalBookingsEl = document.getElementById('totalBookings');
  const totalRevenueEl = document.getElementById('totalRevenue');

  if (totalHotelsEl) totalHotelsEl.textContent = totalHotels;
  if (totalRoomsEl) totalRoomsEl.textContent = totalRooms;
  if (totalBookingsEl) totalBookingsEl.textContent = totalBookings;
  if (totalRevenueEl) totalRevenueEl.textContent = formatCurrency(totalRevenue);
}

// Render hotels list
function renderHotelsList(hotels) {
  const hotelsContainer = document.getElementById('hotelsList');
  if (!hotelsContainer) return;

  hotelsContainer.innerHTML = hotels.map(hotel => `
    <div class="hotel-card" data-hotel-id="${hotel.id}">
      <div class="hotel-image">
        <img src="${hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'}" alt="${hotel.name}">
      </div>
      <div class="hotel-info">
        <h3>${hotel.name}</h3>
        <p>${hotel.location || 'Location not specified'}</p>
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
  `).join('');
}

// Render rooms list
function renderRoomsList(rooms, hotelId) {
  const roomsContainer = document.getElementById('roomsList');
  if (!roomsContainer) return;

  roomsContainer.innerHTML = rooms.map(room => `
    <div class="room-card" data-room-id="${room.id}">
      <div class="room-image">
        <img src="${room.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'}" alt="${room.name}">
      </div>
      <div class="room-info">
        <h3>${room.name}</h3>
        <p>${room.description || 'No description'}</p>
        <div class="room-stats">
          <span>KES ${room.price || 0}</span>
          <span>${room.capacity || 1} Guests</span>
        </div>
      </div>
      <div class="room-actions">
        <button onclick="editRoom('${room.id}')" class="btn-edit">Edit</button>
        <button onclick="deleteRoom('${room.id}', '${hotelId}')" class="btn-delete">Delete</button>
      </div>
    </div>
  `).join('');
}

// Update user info display
function updateUserInfo(user) {
  const userInfoElements = document.querySelectorAll('.user-email, .partner-email');
  userInfoElements.forEach(el => {
    el.textContent = user.email;
  });
}

// Show notification
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Handle sign out
async function handleSignOut() {
  try {
    await signOutUser();
    window.location.href = 'hotel-partner-portal.html';
  } catch (error) {
    console.error('Error signing out:', error);
    showNotification('Error signing out: ' + error.message, 'error');
  }
}

// Export functions for use in HTML
window.initializeDashboard = initializeDashboard;
window.createNewHotel = createNewHotel;
window.updateExistingHotel = updateExistingHotel;
window.deleteExistingHotel = deleteExistingHotel;
window.createNewRoom = createNewRoom;
window.updateExistingRoom = updateExistingRoom;
window.deleteExistingRoom = deleteExistingRoom;
window.loadHotelRooms = loadHotelRooms;
window.handleSignOut = handleSignOut;

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on a dashboard page
  if (window.location.pathname.includes('partner-dashboard') || 
      window.location.pathname.includes('room-management') ||
      window.location.pathname.includes('photo-gallery-management') ||
      window.location.pathname.includes('pricing-management') ||
      window.location.pathname.includes('analytics-dashboard') ||
      window.location.pathname.includes('availability-calendar') ||
      window.location.pathname.includes('bulk-operations')) {
    initializeDashboard();
  }
});

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
  if (window.unsubscribeFirebase) {
    window.unsubscribeFirebase();
  }
});
