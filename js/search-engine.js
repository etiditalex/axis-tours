// Advanced Search Engine for Axis Tours & Travel
// Real-time location search, date calendar, and guest selection

class SearchEngine {
    constructor() {
        this.destinations = [
            { name: "Nairobi", country: "Kenya", type: "city" },
            { name: "Mombasa", country: "Kenya", type: "city" },
            { name: "Diani Beach", country: "Kenya", type: "beach" },
            { name: "Maasai Mara", country: "Kenya", type: "safari" },
            { name: "Amboseli", country: "Kenya", type: "safari" },
            { name: "Lake Nakuru", country: "Kenya", type: "safari" },
            { name: "Samburu", country: "Kenya", type: "safari" },
            { name: "Tsavo East", country: "Kenya", type: "safari" },
            { name: "Tsavo West", country: "Kenya", type: "safari" },
            { name: "Malindi", country: "Kenya", type: "beach" },
            { name: "Watamu", country: "Kenya", type: "beach" },
            { name: "Lamu", country: "Kenya", type: "island" },
            { name: "Mount Kenya", country: "Kenya", type: "mountain" },
            { name: "Hell's Gate", country: "Kenya", type: "park" },
            { name: "Lake Naivasha", country: "Kenya", type: "lake" },
            { name: "Aberdare", country: "Kenya", type: "park" },
            { name: "Meru", country: "Kenya", type: "safari" },
            { name: "Ol Pejeta", country: "Kenya", type: "conservancy" },
            { name: "Lewa", country: "Kenya", type: "conservancy" },
            { name: "Baringo", country: "Kenya", type: "lake" },
            { name: "Bogoria", country: "Kenya", type: "lake" },
            { name: "Turkana", country: "Kenya", type: "lake" },
            { name: "Kakamega", country: "Kenya", type: "forest" },
            { name: "Arabuko Sokoke", country: "Kenya", type: "forest" },
            { name: "Shimba Hills", country: "Kenya", type: "park" },
            { name: "Taita Hills", country: "Kenya", type: "mountain" },
            { name: "Chyulu Hills", country: "Kenya", type: "mountain" },
            { name: "Mount Elgon", country: "Kenya", type: "mountain" },
            { name: "Crescent Island", country: "Kenya", type: "island" },
            { name: "Kiwayu", country: "Kenya", type: "island" }
        ];
        
        this.selectedDates = {
            checkIn: null,
            checkOut: null
        };
        
        this.selectedGuests = {
            adults: 2,
            children: 0,
            rooms: 1
        };
        
        this.init();
    }

    init() {
        this.setupDestinationSearch();
        this.setupDatePicker();
        this.setupGuestSelector();
        this.setupSearchButton();
        this.setupEventListeners();
    }

    setupDestinationSearch() {
        const destinationInput = document.getElementById('destination');
        const destinationField = document.querySelector('.destination-field');
        
        // Create autocomplete dropdown
        const autocompleteContainer = document.createElement('div');
        autocompleteContainer.className = 'autocomplete-dropdown';
        autocompleteContainer.style.display = 'none';
        destinationField.appendChild(autocompleteContainer);

        destinationInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if (query.length < 2) {
                autocompleteContainer.style.display = 'none';
                return;
            }

            const matches = this.destinations.filter(dest => 
                dest.name.toLowerCase().includes(query) ||
                dest.type.toLowerCase().includes(query)
            );

            if (matches.length > 0) {
                this.showAutocomplete(matches, autocompleteContainer, destinationInput);
            } else {
                autocompleteContainer.style.display = 'none';
            }
        });

        // Hide autocomplete when clicking outside
        document.addEventListener('click', (e) => {
            if (!destinationField.contains(e.target)) {
                autocompleteContainer.style.display = 'none';
            }
        });
    }

    showAutocomplete(matches, container, input) {
        container.innerHTML = '';
        container.style.display = 'block';

        matches.slice(0, 8).forEach(match => {
            const item = document.createElement('div');
            item.className = 'autocomplete-item';
            item.innerHTML = `
                <div class="autocomplete-content">
                    <i class="fas fa-map-marker-alt"></i>
                    <div class="autocomplete-text">
                        <div class="autocomplete-name">${match.name}</div>
                        <div class="autocomplete-type">${match.type} • ${match.country}</div>
                    </div>
                </div>
            `;
            
            item.addEventListener('click', () => {
                input.value = match.name;
                container.style.display = 'none';
                this.selectedDestination = match;
            });
            
            container.appendChild(item);
        });
    }

    setupDatePicker() {
        const dateInput = document.getElementById('dates');
        const dateField = document.querySelector('.date-field');
        
        // Create calendar container
        const calendarContainer = document.createElement('div');
        calendarContainer.className = 'calendar-dropdown';
        calendarContainer.style.display = 'none';
        dateField.appendChild(calendarContainer);

        // Create calendar HTML
        calendarContainer.innerHTML = `
            <div class="calendar-header">
                <button class="calendar-nav" id="prev-month">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <div class="calendar-month-year" id="current-month-year"></div>
                <button class="calendar-nav" id="next-month">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            <div class="calendar-grid" id="calendar-grid"></div>
            <div class="calendar-actions">
                <button class="calendar-btn clear-btn" id="clear-dates">Clear</button>
                <button class="calendar-btn apply-btn" id="apply-dates">Apply</button>
            </div>
        `;

        this.currentDate = new Date();
        this.renderCalendar();

        // Event listeners
        dateInput.addEventListener('click', () => {
            calendarContainer.style.display = calendarContainer.style.display === 'none' ? 'block' : 'none';
        });

        document.getElementById('prev-month').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendar();
        });

        document.getElementById('next-month').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
        });

        document.getElementById('clear-dates').addEventListener('click', () => {
            this.selectedDates = { checkIn: null, checkOut: null };
            dateInput.value = '';
            this.renderCalendar();
        });

        document.getElementById('apply-dates').addEventListener('click', () => {
            if (this.selectedDates.checkIn && this.selectedDates.checkOut) {
                const checkInStr = this.formatDate(this.selectedDates.checkIn);
                const checkOutStr = this.formatDate(this.selectedDates.checkOut);
                dateInput.value = `${checkInStr} — ${checkOutStr}`;
            }
            calendarContainer.style.display = 'none';
        });

        // Hide calendar when clicking outside
        document.addEventListener('click', (e) => {
            if (!dateField.contains(e.target)) {
                calendarContainer.style.display = 'none';
            }
        });
    }

    renderCalendar() {
        const monthYear = document.getElementById('current-month-year');
        const grid = document.getElementById('calendar-grid');
        
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        monthYear.textContent = `${monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
        
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();
        
        grid.innerHTML = '';
        
        // Add day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            grid.appendChild(dayHeader);
        });
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day empty';
            grid.appendChild(emptyCell);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            const currentDate = new Date(year, month, day);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (currentDate < today) {
                dayElement.classList.add('past');
            } else if (currentDate.getTime() === today.getTime()) {
                dayElement.classList.add('today');
            }
            
            // Check if this date is selected
            if (this.selectedDates.checkIn && currentDate.getTime() === this.selectedDates.checkIn.getTime()) {
                dayElement.classList.add('selected', 'check-in');
            }
            if (this.selectedDates.checkOut && currentDate.getTime() === this.selectedDates.checkOut.getTime()) {
                dayElement.classList.add('selected', 'check-out');
            }
            
            // Check if this date is in range
            if (this.selectedDates.checkIn && this.selectedDates.checkOut) {
                if (currentDate > this.selectedDates.checkIn && currentDate < this.selectedDates.checkOut) {
                    dayElement.classList.add('in-range');
                }
            }
            
            dayElement.addEventListener('click', () => {
                if (currentDate < today) return;
                
                if (!this.selectedDates.checkIn || (this.selectedDates.checkIn && this.selectedDates.checkOut)) {
                    // Start new selection
                    this.selectedDates.checkIn = currentDate;
                    this.selectedDates.checkOut = null;
                } else if (currentDate > this.selectedDates.checkIn) {
                    // Complete selection
                    this.selectedDates.checkOut = currentDate;
                } else {
                    // Select new start date
                    this.selectedDates.checkIn = currentDate;
                    this.selectedDates.checkOut = null;
                }
                
                this.renderCalendar();
            });
            
            grid.appendChild(dayElement);
        }
    }

    formatDate(date) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]} ${date.getDate()}`;
    }

    setupGuestSelector() {
        const guestsInput = document.getElementById('guests');
        const guestsField = document.querySelector('.guests-field');
        
        // Create guest selector dropdown
        const guestSelector = document.createElement('div');
        guestSelector.className = 'guest-selector-dropdown';
        guestSelector.style.display = 'none';
        guestsField.appendChild(guestSelector);

        guestSelector.innerHTML = `
            <div class="guest-selector-content">
                <div class="guest-option">
                    <div class="guest-label">
                        <i class="fas fa-user"></i>
                        <span>Adults</span>
                    </div>
                    <div class="guest-controls">
                        <button class="guest-btn" id="adults-minus">-</button>
                        <span class="guest-count" id="adults-count">2</span>
                        <button class="guest-btn" id="adults-plus">+</button>
                    </div>
                </div>
                <div class="guest-option">
                    <div class="guest-label">
                        <i class="fas fa-child"></i>
                        <span>Children</span>
                        <small>Ages 0-17</small>
                    </div>
                    <div class="guest-controls">
                        <button class="guest-btn" id="children-minus">-</button>
                        <span class="guest-count" id="children-count">0</span>
                        <button class="guest-btn" id="children-plus">+</button>
                    </div>
                </div>
                <div class="guest-option">
                    <div class="guest-label">
                        <i class="fas fa-bed"></i>
                        <span>Rooms</span>
                    </div>
                    <div class="guest-controls">
                        <button class="guest-btn" id="rooms-minus">-</button>
                        <span class="guest-count" id="rooms-count">1</span>
                        <button class="guest-btn" id="rooms-plus">+</button>
                    </div>
                </div>
                <div class="guest-actions">
                    <button class="guest-btn apply-guest-btn" id="apply-guests">Apply</button>
                </div>
            </div>
        `;

        // Event listeners
        guestsInput.addEventListener('click', () => {
            guestSelector.style.display = guestSelector.style.display === 'none' ? 'block' : 'none';
        });

        // Adults controls
        document.getElementById('adults-minus').addEventListener('click', () => {
            if (this.selectedGuests.adults > 1) {
                this.selectedGuests.adults--;
                this.updateGuestDisplay();
            }
        });

        document.getElementById('adults-plus').addEventListener('click', () => {
            if (this.selectedGuests.adults < 20) {
                this.selectedGuests.adults++;
                this.updateGuestDisplay();
            }
        });

        // Children controls
        document.getElementById('children-minus').addEventListener('click', () => {
            if (this.selectedGuests.children > 0) {
                this.selectedGuests.children--;
                this.updateGuestDisplay();
            }
        });

        document.getElementById('children-plus').addEventListener('click', () => {
            if (this.selectedGuests.children < 10) {
                this.selectedGuests.children++;
                this.updateGuestDisplay();
            }
        });

        // Rooms controls
        document.getElementById('rooms-minus').addEventListener('click', () => {
            if (this.selectedGuests.rooms > 1) {
                this.selectedGuests.rooms--;
                this.updateGuestDisplay();
            }
        });

        document.getElementById('rooms-plus').addEventListener('click', () => {
            if (this.selectedGuests.rooms < 10) {
                this.selectedGuests.rooms++;
                this.updateGuestDisplay();
            }
        });

        document.getElementById('apply-guests').addEventListener('click', () => {
            this.updateGuestInput();
            guestSelector.style.display = 'none';
        });

        // Hide guest selector when clicking outside
        document.addEventListener('click', (e) => {
            if (!guestsField.contains(e.target)) {
                guestSelector.style.display = 'none';
            }
        });
    }

    updateGuestDisplay() {
        document.getElementById('adults-count').textContent = this.selectedGuests.adults;
        document.getElementById('children-count').textContent = this.selectedGuests.children;
        document.getElementById('rooms-count').textContent = this.selectedGuests.rooms;
    }

    updateGuestInput() {
        const guestsInput = document.getElementById('guests');
        const { adults, children, rooms } = this.selectedGuests;
        guestsInput.value = `${adults} adults · ${children} children · ${rooms} room${rooms > 1 ? 's' : ''}`;
    }

    setupSearchButton() {
        const searchBtn = document.querySelector('.search-btn');
        searchBtn.addEventListener('click', () => {
            this.performSearch();
        });
    }

    setupEventListeners() {
        // Enter key to search
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && (e.target.id === 'destination' || e.target.id === 'dates' || e.target.id === 'guests')) {
                this.performSearch();
            }
        });
    }

    performSearch() {
        const destination = document.getElementById('destination').value;
        const dates = document.getElementById('dates').value;
        const guests = document.getElementById('guests').value;

        if (!destination) {
            this.showNotification('Please select a destination', 'error');
            return;
        }

        if (!dates) {
            this.showNotification('Please select check-in and check-out dates', 'error');
            return;
        }

        // Create search results
        const searchData = {
            destination: destination,
            checkIn: this.selectedDates.checkIn,
            checkOut: this.selectedDates.checkOut,
            guests: this.selectedGuests,
            timestamp: new Date().toISOString()
        };

        // Store search data
        localStorage.setItem('lastSearch', JSON.stringify(searchData));

        // Show loading
        this.showNotification('Searching for the best deals...', 'info');

        // Simulate search delay and redirect to results
        setTimeout(() => {
            // Redirect to hotels page with search parameters
            const params = new URLSearchParams({
                destination: destination,
                checkin: this.formatDateForURL(this.selectedDates.checkIn),
                checkout: this.formatDateForURL(this.selectedDates.checkOut),
                adults: this.selectedGuests.adults,
                children: this.selectedGuests.children,
                rooms: this.selectedGuests.rooms
            });
            
            window.location.href = `hotels.html?${params.toString()}`;
        }, 1500);
    }

    formatDateForURL(date) {
        return date.toISOString().split('T')[0];
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `search-notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
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
        switch (type) {
            case 'error':
                notification.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a24)';
                break;
            case 'success':
                notification.style.background = 'linear-gradient(135deg, #51cf66, #40c057)';
                break;
            default:
                notification.style.background = 'linear-gradient(135deg, #339af0, #228be6)';
        }

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize search engine when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SearchEngine();
});
