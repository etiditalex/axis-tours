import { Map, tileLayer, marker, popup, layerGroup } from 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
import * as turf from 'https://unpkg.com/@turf/turf@6/turf.min.js';
import FlexSearch from 'https://unpkg.com/flexsearch@0.7.31/dist/flexsearch.min.js';
import flatpickr from 'https://unpkg.com/flatpickr@4.6.13/dist/flatpickr.min.js';

// Booking System Class
export class BookingSystem {
  constructor() {
    this.properties = [];
    this.filteredProperties = [];
    this.searchIndex = null;
    this.map = null;
    this.markers = null;
    this.currentView = 'list'; // 'list' or 'map'
    
    this.init();
  }

  async init() {
    await this.loadProperties();
    this.initializeSearch();
    this.initializeFilters();
    this.initializeDatePickers();
    this.initializeMap();
    this.renderProperties();
  }

  async loadProperties() {
    // Sample property data - in real app, this would come from an API
    this.properties = [
      {
        id: 1,
        name: "Baobab Beach Resort",
        type: "Resort",
        location: "Diani Beach",
        coordinates: [-4.2925, 39.5856],
        price: 45000,
        rating: 4.8,
        amenities: ["Beach Access", "Pool", "Spa", "Restaurant"],
        images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"],
        description: "Luxury beachfront resort with stunning ocean views",
        distance: 0.1, // km from beach
        category: "Luxury"
      },
      {
        id: 2,
        name: "Tiwi Beach Cottages",
        type: "Cottage",
        location: "Tiwi Beach",
        coordinates: [-4.2333, 39.6000],
        price: 25000,
        rating: 4.5,
        amenities: ["Beach Access", "Kitchen", "Garden"],
        images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"],
        description: "Charming beachfront cottages perfect for families",
        distance: 0.05,
        category: "Mid-range"
      },
      {
        id: 3,
        name: "Shanzu Beach Hotel",
        type: "Hotel",
        location: "Shanzu Beach",
        coordinates: [-3.9833, 39.7333],
        price: 35000,
        rating: 4.3,
        amenities: ["Beach Access", "Pool", "Bar", "Restaurant"],
        images: ["https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800"],
        description: "Modern hotel with excellent beach access",
        distance: 0.08,
        category: "Mid-range"
      }
    ];
    
    this.filteredProperties = [...this.properties];
  }

  initializeSearch() {
    // Initialize FlexSearch for fast text search
    this.searchIndex = new FlexSearch.Index({
      tokenize: "forward",
      resolution: 9
    });

    // Index all properties
    this.properties.forEach((property, index) => {
      const searchText = `${property.name} ${property.location} ${property.description} ${property.amenities.join(' ')}`;
      this.searchIndex.add(index, searchText);
    });

    // Search input handler
    const searchInput = document.getElementById('property-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.performSearch(e.target.value);
      });
    }
  }

  performSearch(query) {
    if (!query.trim()) {
      this.filteredProperties = [...this.properties];
    } else {
      const results = this.searchIndex.search(query);
      this.filteredProperties = results.map(index => this.properties[index]);
    }
    
    this.applyFilters();
    this.renderProperties();
    this.updateMap();
  }

  initializeFilters() {
    // Location filter
    const locationFilter = document.getElementById('location-filter');
    if (locationFilter) {
      locationFilter.addEventListener('change', () => this.applyFilters());
    }

    // Price filter
    const priceFilter = document.getElementById('price-filter');
    if (priceFilter) {
      priceFilter.addEventListener('change', () => this.applyFilters());
    }

    // Category filter
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
      categoryFilter.addEventListener('change', () => this.applyFilters());
    }

    // Distance filter
    const distanceFilter = document.getElementById('distance-filter');
    if (distanceFilter) {
      distanceFilter.addEventListener('change', () => this.applyFilters());
    }
  }

  applyFilters() {
    let filtered = [...this.filteredProperties];

    // Location filter
    const locationFilter = document.getElementById('location-filter');
    if (locationFilter && locationFilter.value !== 'all') {
      filtered = filtered.filter(property => property.location === locationFilter.value);
    }

    // Price filter
    const priceFilter = document.getElementById('price-filter');
    if (priceFilter && priceFilter.value !== 'all') {
      const [min, max] = priceFilter.value.split('-').map(Number);
      filtered = filtered.filter(property => {
        if (max) {
          return property.price >= min && property.price <= max;
        } else {
          return property.price >= min;
        }
      });
    }

    // Category filter
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter && categoryFilter.value !== 'all') {
      filtered = filtered.filter(property => property.category === categoryFilter.value);
    }

    // Distance filter
    const distanceFilter = document.getElementById('distance-filter');
    if (distanceFilter && distanceFilter.value !== 'all') {
      const maxDistance = Number(distanceFilter.value);
      filtered = filtered.filter(property => property.distance <= maxDistance);
    }

    this.filteredProperties = filtered;
    this.renderProperties();
    this.updateMap();
  }

  initializeDatePickers() {
    // Check-in date picker
    const checkinInput = document.getElementById('checkin-date');
    if (checkinInput) {
      flatpickr(checkinInput, {
        minDate: "today",
        dateFormat: "Y-m-d",
        onChange: (selectedDates) => {
          this.updateAvailability(selectedDates[0]);
        }
      });
    }

    // Check-out date picker
    const checkoutInput = document.getElementById('checkout-date');
    if (checkoutInput) {
      flatpickr(checkoutInput, {
        minDate: "today",
        dateFormat: "Y-m-d",
        onChange: (selectedDates) => {
          this.updateAvailability(null, selectedDates[0]);
        }
      });
    }
  }

  initializeMap() {
    const mapContainer = document.getElementById('property-map');
    if (!mapContainer) return;

    // Initialize Leaflet map
    this.map = new Map(mapContainer).setView([-4.0, 39.6], 10);
    
    // Add OpenStreetMap tiles
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.markers = layerGroup().addTo(this.map);
    this.updateMap();
  }

  updateMap() {
    if (!this.map || !this.markers) return;

    // Clear existing markers
    this.markers.clearLayers();

    // Add markers for filtered properties
    this.filteredProperties.forEach(property => {
      const markerElement = marker(property.coordinates)
        .bindPopup(`
          <div class="map-popup">
            <h3>${property.name}</h3>
            <p>${property.location}</p>
            <p class="price">KES ${property.price.toLocaleString()}/night</p>
            <button onclick="bookingSystem.viewProperty(${property.id})" class="btn btn-sm">
              View Details
            </button>
          </div>
        `);
      
      this.markers.addLayer(markerElement);
    });

    // Fit map to show all markers
    if (this.filteredProperties.length > 0) {
      const bounds = this.markers.getBounds();
      this.map.fitBounds(bounds, { padding: [20, 20] });
    }
  }

  renderProperties() {
    const container = document.getElementById('properties-container');
    if (!container) return;

    if (this.currentView === 'list') {
      this.renderListView(container);
    } else {
      this.renderMapView(container);
    }
  }

  renderListView(container) {
    container.innerHTML = this.filteredProperties.map(property => `
      <div class="property-card card p-6 mb-6" data-property-id="${property.id}">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="property-image">
            <img src="${property.images[0]}" alt="${property.name}" 
                 class="w-full h-48 object-cover rounded-lg">
          </div>
          <div class="property-info md:col-span-2">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-2xl font-bold text-black mb-2">${property.name}</h3>
                <p class="text-gray-600 mb-2">
                  <i class="fas fa-map-marker-alt text-gold mr-2"></i>
                  ${property.location}
                </p>
                <div class="flex items-center mb-3">
                  <div class="flex text-gold">
                    ${this.generateStarRating(property.rating)}
                  </div>
                  <span class="ml-2 text-gray-600">${property.rating}</span>
                </div>
              </div>
              <div class="text-right">
                <div class="text-3xl font-bold text-gold">KES ${property.price.toLocaleString()}</div>
                <div class="text-gray-500">per night</div>
              </div>
            </div>
            
            <p class="text-gray-700 mb-4">${property.description}</p>
            
            <div class="flex flex-wrap gap-2 mb-4">
              ${property.amenities.map(amenity => 
                `<span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">${amenity}</span>`
              ).join('')}
            </div>
            
            <div class="flex justify-between items-center">
              <div class="text-sm text-gray-600">
                <i class="fas fa-ruler text-gold mr-1"></i>
                ${property.distance}km from beach
              </div>
              <button onclick="bookingSystem.viewProperty(${property.id})" class="btn">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderMapView(container) {
    container.innerHTML = `
      <div class="map-container h-96 rounded-lg overflow-hidden">
        <div id="property-map" class="w-full h-full"></div>
      </div>
    `;
    
    // Reinitialize map in the new container
    setTimeout(() => {
      this.initializeMap();
    }, 100);
  }

  generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let stars = '';
    for (let i = 0; i < fullStars; i++) {
      stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
      stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
      stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
  }

  toggleView() {
    this.currentView = this.currentView === 'list' ? 'map' : 'list';
    this.renderProperties();
  }

  viewProperty(propertyId) {
    const property = this.properties.find(p => p.id === propertyId);
    if (property) {
      // Navigate to property detail page or show modal
      console.log('Viewing property:', property);
      // In a real app, this would navigate to a detail page
    }
  }

  updateAvailability(checkinDate, checkoutDate) {
    // Update property availability based on selected dates
    console.log('Checking availability for:', checkinDate, checkoutDate);
    // In a real app, this would check actual availability
  }
}

// Initialize the booking system when the page loads
document.addEventListener('DOMContentLoaded', () => {
  window.bookingSystem = new BookingSystem();
});
