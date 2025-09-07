// Real Booking System with Firebase Integration
// This handles the complete booking flow with real data persistence

import { 
  createBooking, 
  getServiceById, 
  getCurrentUser, 
  formatDate, 
  formatCurrency,
  searchServices,
  getAllServices
} from './firebase-integration.js';

class BookingSystem {
  constructor() {
    this.currentBooking = null;
    this.selectedService = null;
    this.bookingSteps = ['service', 'details', 'confirmation', 'complete'];
    this.currentStep = 0;
    
    this.initializeBookingSystem();
  }
  
  initializeBookingSystem() {
    this.setupEventListeners();
    this.loadInitialData();
  }
  
  setupEventListeners() {
    // Search functionality
    const searchInput = document.querySelector('#search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.handleSearch(e.target.value);
      });
    }
    
    // Service selection
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('book-service-btn')) {
        const serviceId = e.target.dataset.serviceId;
        const serviceType = e.target.dataset.serviceType;
        this.selectService(serviceId, serviceType);
      }
    });
    
    // Booking form submission
    const bookingForm = document.querySelector('#booking-form');
    if (bookingForm) {
      bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.processBooking();
      });
    }
  }
  
  async loadInitialData() {
    try {
      const services = await getAllServices();
      this.populateServiceCards(services);
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  }
  
  handleSearch(searchTerm) {
    if (searchTerm.length < 2) return;
    
    const results = searchServices(searchTerm);
    this.displaySearchResults(results);
  }
  
  displaySearchResults(results) {
    const resultsContainer = document.querySelector('#search-results');
    if (!resultsContainer) return;
    
    if (results.length === 0) {
      resultsContainer.innerHTML = '<p>No results found. Try a different search term.</p>';
      return;
    }
    
    const resultsHTML = results.map(service => `
      <div class="search-result-item" data-service-id="${service.id}" data-service-type="${service.serviceType}">
        <div class="result-image">
          <img src="${service.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'}" alt="${service.name}">
        </div>
        <div class="result-content">
          <h3>${service.name}</h3>
          <p class="result-location">${service.location || service.destination}</p>
          <p class="result-description">${service.description?.substring(0, 100)}...</p>
          <div class="result-price">${formatCurrency(service.price)}</div>
          <button class="book-service-btn btn" data-service-id="${service.id}" data-service-type="${service.serviceType}">
            Book Now
          </button>
        </div>
      </div>
    `).join('');
    
    resultsContainer.innerHTML = resultsHTML;
  }
  
  async selectService(serviceId, serviceType) {
    try {
      this.selectedService = await getServiceById(serviceType, serviceId);
      
      if (!this.selectedService) {
        this.showNotification('Service not found', 'error');
        return;
      }
      
      this.showBookingModal();
    } catch (error) {
      console.error('Error selecting service:', error);
      this.showNotification('Error loading service details', 'error');
    }
  }
  
  showBookingModal() {
    const modal = document.createElement('div');
    modal.className = 'booking-modal';
    modal.innerHTML = `
      <div class="booking-modal-content">
        <div class="booking-header">
          <h2>Book ${this.selectedService.name}</h2>
          <button class="close-booking-modal">&times;</button>
        </div>
        
        <div class="booking-steps">
          <div class="step active" data-step="0">
            <span class="step-number">1</span>
            <span class="step-label">Service Details</span>
          </div>
          <div class="step" data-step="1">
            <span class="step-number">2</span>
            <span class="step-label">Your Details</span>
          </div>
          <div class="step" data-step="2">
            <span class="step-number">3</span>
            <span class="step-label">Confirmation</span>
          </div>
        </div>
        
        <div class="booking-content">
          ${this.renderBookingStep()}
        </div>
        
        <div class="booking-actions">
          ${this.renderBookingActions()}
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    this.setupBookingModalEvents(modal);
  }
  
  renderBookingStep() {
    switch (this.currentStep) {
      case 0:
        return this.renderServiceDetailsStep();
      case 1:
        return this.renderUserDetailsStep();
      case 2:
        return this.renderConfirmationStep();
      default:
        return '';
    }
  }
  
  renderServiceDetailsStep() {
    return `
      <div class="service-details-step">
        <div class="service-info">
          <img src="${this.selectedService.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'}" alt="${this.selectedService.name}">
          <div class="service-details">
            <h3>${this.selectedService.name}</h3>
            <p class="service-location">${this.selectedService.location || this.selectedService.destination}</p>
            <p class="service-description">${this.selectedService.description}</p>
            <div class="service-price">${formatCurrency(this.selectedService.price)}</div>
          </div>
        </div>
        
        <div class="booking-dates">
          <div class="form-group">
            <label for="check-in">Check-in Date</label>
            <input type="date" id="check-in" name="checkIn" required>
          </div>
          <div class="form-group">
            <label for="check-out">Check-out Date</label>
            <input type="date" id="check-out" name="checkOut" required>
          </div>
        </div>
        
        <div class="booking-guests">
          <div class="form-group">
            <label for="guests">Number of Guests</label>
            <select id="guests" name="guests" required>
              <option value="1">1 Guest</option>
              <option value="2" selected>2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5+ Guests</option>
            </select>
          </div>
        </div>
      </div>
    `;
  }
  
  renderUserDetailsStep() {
    const user = getCurrentUser();
    
    return `
      <div class="user-details-step">
        <h3>Your Contact Information</h3>
        
        <div class="form-row">
          <div class="form-group">
            <label for="full-name">Full Name</label>
            <input type="text" id="full-name" name="fullName" value="${user?.displayName || ''}" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" value="${user?.email || ''}" required>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" required>
          </div>
          <div class="form-group">
            <label for="nationality">Nationality</label>
            <select id="nationality" name="nationality" required>
              <option value="">Select Nationality</option>
              <option value="Kenyan">Kenyan</option>
              <option value="American">American</option>
              <option value="British">British</option>
              <option value="German">German</option>
              <option value="French">French</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        
        <div class="form-group">
          <label for="special-requests">Special Requests (Optional)</label>
          <textarea id="special-requests" name="specialRequests" rows="3" placeholder="Any special requirements or requests..."></textarea>
        </div>
      </div>
    `;
  }
  
  renderConfirmationStep() {
    const formData = this.getFormData();
    const totalPrice = this.calculateTotalPrice(formData);
    
    return `
      <div class="confirmation-step">
        <h3>Confirm Your Booking</h3>
        
        <div class="booking-summary">
          <div class="summary-item">
            <h4>Service</h4>
            <p>${this.selectedService.name}</p>
          </div>
          
          <div class="summary-item">
            <h4>Dates</h4>
            <p>${formData.checkIn} to ${formData.checkOut}</p>
          </div>
          
          <div class="summary-item">
            <h4>Guests</h4>
            <p>${formData.guests} ${formData.guests === '1' ? 'Guest' : 'Guests'}</p>
          </div>
          
          <div class="summary-item">
            <h4>Contact</h4>
            <p>${formData.fullName}<br>${formData.email}<br>${formData.phone}</p>
          </div>
          
          <div class="summary-item">
            <h4>Total Price</h4>
            <p class="total-price">${formatCurrency(totalPrice)}</p>
          </div>
        </div>
        
        <div class="booking-terms">
          <label>
            <input type="checkbox" id="accept-terms" required>
            I agree to the <a href="#" target="_blank">Terms and Conditions</a> and <a href="#" target="_blank">Privacy Policy</a>
          </label>
        </div>
      </div>
    `;
  }
  
  renderBookingActions() {
    const actions = [];
    
    if (this.currentStep > 0) {
      actions.push('<button type="button" class="btn btn-outline" id="prev-step">Previous</button>');
    }
    
    if (this.currentStep < this.bookingSteps.length - 1) {
      actions.push('<button type="button" class="btn" id="next-step">Next</button>');
    } else {
      actions.push('<button type="button" class="btn" id="confirm-booking">Confirm Booking</button>');
    }
    
    return actions.join(' ');
  }
  
  setupBookingModalEvents(modal) {
    // Close modal
    modal.querySelector('.close-booking-modal').addEventListener('click', () => {
      this.closeBookingModal();
    });
    
    // Step navigation
    const nextBtn = modal.querySelector('#next-step');
    const prevBtn = modal.querySelector('#prev-step');
    const confirmBtn = modal.querySelector('#confirm-booking');
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.validateCurrentStep()) {
          this.currentStep++;
          this.updateBookingModal(modal);
        }
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.currentStep--;
        this.updateBookingModal(modal);
      });
    }
    
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        this.processBooking();
      });
    }
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeBookingModal();
      }
    });
  }
  
  updateBookingModal(modal) {
    // Update steps
    modal.querySelectorAll('.step').forEach((step, index) => {
      step.classList.toggle('active', index === this.currentStep);
      step.classList.toggle('completed', index < this.currentStep);
    });
    
    // Update content
    modal.querySelector('.booking-content').innerHTML = this.renderBookingStep();
    
    // Update actions
    modal.querySelector('.booking-actions').innerHTML = this.renderBookingActions();
    
    // Re-setup events for new buttons
    this.setupBookingModalEvents(modal);
  }
  
  validateCurrentStep() {
    const modal = document.querySelector('.booking-modal');
    const requiredFields = modal.querySelectorAll('[required]');
    
    for (const field of requiredFields) {
      if (!field.value.trim()) {
        this.showNotification(`Please fill in ${field.previousElementSibling.textContent}`, 'error');
        field.focus();
        return false;
      }
    }
    
    // Validate dates
    if (this.currentStep === 0) {
      const checkIn = new Date(modal.querySelector('#check-in').value);
      const checkOut = new Date(modal.querySelector('#check-out').value);
      
      if (checkIn >= checkOut) {
        this.showNotification('Check-out date must be after check-in date', 'error');
        return false;
      }
      
      if (checkIn < new Date()) {
        this.showNotification('Check-in date cannot be in the past', 'error');
        return false;
      }
    }
    
    return true;
  }
  
  getFormData() {
    const modal = document.querySelector('.booking-modal');
    const formData = {};
    
    const inputs = modal.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      formData[input.name] = input.value;
    });
    
    return formData;
  }
  
  calculateTotalPrice(formData) {
    const basePrice = this.selectedService.price;
    const guests = parseInt(formData.guests);
    const nights = this.calculateNights(formData.checkIn, formData.checkOut);
    
    // Simple pricing logic - can be made more complex
    let totalPrice = basePrice * nights;
    
    if (guests > 2) {
      totalPrice += (guests - 2) * 50; // Extra guest fee
    }
    
    return totalPrice;
  }
  
  calculateNights(checkIn, checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  
  async processBooking() {
    try {
      const user = getCurrentUser();
      if (!user) {
        this.showNotification('Please log in to make a booking', 'error');
        this.closeBookingModal();
        // Redirect to login
        window.location.href = 'login.html';
        return;
      }
      
      const formData = this.getFormData();
      const totalPrice = this.calculateTotalPrice(formData);
      
      const bookingData = {
        serviceId: this.selectedService.id,
        serviceType: this.selectedService.serviceType || 'hotels',
        serviceName: this.selectedService.name,
        serviceImage: this.selectedService.image,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: parseInt(formData.guests),
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        nationality: formData.nationality,
        specialRequests: formData.specialRequests,
        totalPrice: totalPrice,
        basePrice: this.selectedService.price,
        status: 'pending'
      };
      
      const result = await createBooking(bookingData);
      
      if (result.success) {
        this.showNotification('Booking created successfully!', 'success');
        this.closeBookingModal();
        this.showBookingConfirmation(bookingData, result.bookingId);
      } else {
        this.showNotification('Error creating booking: ' + result.error, 'error');
      }
    } catch (error) {
      console.error('Error processing booking:', error);
      this.showNotification('Error processing booking', 'error');
    }
  }
  
  showBookingConfirmation(bookingData, bookingId) {
    const confirmationModal = document.createElement('div');
    confirmationModal.className = 'confirmation-modal';
    confirmationModal.innerHTML = `
      <div class="confirmation-content">
        <div class="confirmation-header">
          <div class="success-icon">✓</div>
          <h2>Booking Confirmed!</h2>
        </div>
        
        <div class="confirmation-details">
          <p><strong>Booking ID:</strong> ${bookingId}</p>
          <p><strong>Service:</strong> ${bookingData.serviceName}</p>
          <p><strong>Dates:</strong> ${bookingData.checkIn} to ${bookingData.checkOut}</p>
          <p><strong>Guests:</strong> ${bookingData.guests}</p>
          <p><strong>Total:</strong> ${formatCurrency(bookingData.totalPrice)}</p>
        </div>
        
        <div class="confirmation-actions">
          <button class="btn" onclick="window.location.href='my-bookings.html'">View My Bookings</button>
          <button class="btn btn-outline" onclick="this.closest('.confirmation-modal').remove()">Close</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(confirmationModal);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (document.body.contains(confirmationModal)) {
        confirmationModal.remove();
      }
    }, 10000);
  }
  
  closeBookingModal() {
    const modal = document.querySelector('.booking-modal');
    if (modal) {
      modal.remove();
    }
    this.currentStep = 0;
    this.selectedService = null;
  }
  
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '15px 20px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '600',
      zIndex: '10001',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
      maxWidth: '300px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
    });
    
    // Set background color based on type
    const colors = {
      success: 'linear-gradient(135deg, #51cf66, #40c057)',
      error: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
      info: 'linear-gradient(135deg, #339af0, #228be6)'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
  
  populateServiceCards(services) {
    // This will be called to populate service cards on various pages
    const serviceContainers = document.querySelectorAll('.services-grid, .hotels-grid, .tours-grid');
    
    serviceContainers.forEach(container => {
      const serviceType = container.dataset.serviceType || 'hotels';
      const serviceList = services[serviceType] || [];
      
      if (serviceList.length > 0) {
        container.innerHTML = serviceList.map(service => `
          <div class="service-card">
            <div class="service-image">
              <img src="${service.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'}" alt="${service.name}">
            </div>
            <div class="service-content">
              <h3>${service.name}</h3>
              <p class="service-location">${service.location || service.destination}</p>
              <p class="service-description">${service.description?.substring(0, 100)}...</p>
              <div class="service-price">${formatCurrency(service.price)}</div>
              <button class="book-service-btn btn" data-service-id="${service.id}" data-service-type="${serviceType}">
                Book Now
              </button>
            </div>
          </div>
        `).join('');
      }
    });
  }
}

// Initialize booking system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.bookingSystem = new BookingSystem();
});

export default BookingSystem;
