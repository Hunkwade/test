// ============================================
// Bikeloo - Main JavaScript
// ============================================

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }, 500);
    }
});

// Mobile Menu Toggle - Enhanced
const menuToggle = document.getElementById('menuToggle');
const navbarMenu = document.getElementById('navbarMenu');
const menuBackdrop = document.getElementById('menuBackdrop');

if (menuToggle && navbarMenu) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = navbarMenu.classList.contains('active');
        
        if (isActive) {
            // Close menu
            navbarMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            if (menuBackdrop) menuBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            // Open menu
            navbarMenu.classList.add('active');
            menuToggle.classList.add('active');
            if (menuBackdrop) menuBackdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });

    // Close menu when clicking backdrop
    if (menuBackdrop) {
        menuBackdrop.addEventListener('click', () => {
            navbarMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close menu when clicking a link
    const menuLinks = navbarMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            if (menuBackdrop) menuBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            if (menuBackdrop) menuBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Search Functionality with Auto-suggest
const heroSearch = document.getElementById('heroSearch');
const searchSuggestions = document.getElementById('searchSuggestions');
const searchBtn = document.getElementById('searchBtn');

// Bike data with details for search
const bikeData = [
    { name: 'Yamaha R15 V4', brand: 'Yamaha', type: 'Sports', price: '₹1.82 Lakh', image: 'https://images.unsplash.com/photo-1558981001-5864b9f7ff2e?w=80&h=60&fit=crop' },
    { name: 'Ola Electric S1 Pro', brand: 'Ola', type: 'Electric', price: '₹1.30 Lakh', image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=80&h=60&fit=crop' },
    { name: 'Royal Enfield Classic 350', brand: 'Royal Enfield', type: 'Cruiser', price: '₹1.93 Lakh', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=80&h=60&fit=crop' },
    { name: 'Honda Activa 6G', brand: 'Honda', type: 'Scooter', price: '₹74,536', image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=80&h=60&fit=crop' },
    { name: 'KTM Duke 390', brand: 'KTM', type: 'Sports', price: '₹3.02 Lakh', image: 'https://images.unsplash.com/photo-1591768575417-8a3dc8dc3a8f?w=80&h=60&fit=crop' },
    { name: 'Bajaj Dominar 400', brand: 'Bajaj', type: 'Adventure', price: '₹2.30 Lakh', image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=80&h=60&fit=crop' },
    { name: 'Suzuki Gixxer', brand: 'Suzuki', type: 'Sports', price: '₹1.25 Lakh', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=60&fit=crop' },
    { name: 'TVS Apache RTR 160', brand: 'TVS', type: 'Sports', price: '₹1.16 Lakh', image: 'https://images.unsplash.com/photo-1568772585286-f59e2f37daa5?w=80&h=60&fit=crop' },
    { name: 'Hero Splendor Plus', brand: 'Hero', type: 'Commuter', price: '₹67,000', image: 'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=80&h=60&fit=crop' },
    { name: 'Kawasaki Ninja 300', brand: 'Kawasaki', type: 'Sports', price: '₹3.43 Lakh', image: 'https://images.unsplash.com/photo-1558981001-5864b9f7ff2e?w=80&h=60&fit=crop' },
    { name: 'Harley Davidson Street 750', brand: 'Harley Davidson', type: 'Cruiser', price: '₹5.34 Lakh', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=80&h=60&fit=crop' },
    { name: 'Ducati Panigale V2', brand: 'Ducati', type: 'Sports', price: '₹17.50 Lakh', image: 'https://images.unsplash.com/photo-1558981001-5864b9f7ff2e?w=80&h=60&fit=crop' }
];

// Function to navigate to bike details
function goToBikeDetails(bikeName) {
    // Encode the bike name for URL
    const encodedName = encodeURIComponent(bikeName);
    window.location.href = `bike-details.html?bike=${encodedName}`;
}

// Function to perform search
function performSearch() {
    const searchTerm = heroSearch.value.trim();
    if (searchTerm) {
        const bike = bikeData.find(b => b.name.toLowerCase() === searchTerm.toLowerCase());
        if (bike) {
            goToBikeDetails(bike.name);
        } else {
            // If exact match not found, go to bikes page with search parameter
            window.location.href = `bikes.html?search=${encodeURIComponent(searchTerm)}`;
        }
    }
}

if (heroSearch && searchSuggestions) {
    heroSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        if (searchTerm.length > 0) {
            const filteredBikes = bikeData.filter(bike => 
                bike.name.toLowerCase().includes(searchTerm) ||
                bike.brand.toLowerCase().includes(searchTerm) ||
                bike.type.toLowerCase().includes(searchTerm)
            );
            
            if (filteredBikes.length > 0) {
                searchSuggestions.innerHTML = filteredBikes
                    .slice(0, 6)
                    .map(bike => `
                        <div class="suggestion-item" data-bike="${bike.name}">
                            <img src="${bike.image}" alt="${bike.name}" class="suggestion-img">
                            <div class="suggestion-info">
                                <div class="suggestion-name">${bike.name}</div>
                                <div class="suggestion-details">${bike.type} • ${bike.price}</div>
                            </div>
                            <i class="fas fa-arrow-right suggestion-arrow"></i>
                        </div>
                    `)
                    .join('');
                searchSuggestions.classList.add('active');
                
                // Add click handlers to suggestions
                document.querySelectorAll('.suggestion-item').forEach(item => {
                    item.addEventListener('click', () => {
                        const bikeName = item.dataset.bike;
                        goToBikeDetails(bikeName);
                    });
                });
            } else {
                searchSuggestions.innerHTML = '<div class="suggestion-item no-results"><i class="fas fa-search"></i> No bikes found</div>';
                searchSuggestions.classList.add('active');
            }
        } else {
            searchSuggestions.classList.remove('active');
        }
    });
    
    // Search button click
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    // Enter key to search
    heroSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!heroSearch.contains(e.target) && !searchSuggestions.contains(e.target)) {
            searchSuggestions.classList.remove('active');
        }
    });
}

// Active Navigation Link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.navbar-menu a');

navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.bike-card, .category-card, .brand-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form Validation (for contact page)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (name && email && message) {
            // Show success message
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
        } else {
            showNotification('Please fill in all fields.', 'error');
        }
    });
}

// Review Form (for reviews page)
const reviewForm = document.getElementById('reviewForm');
if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const reviewName = document.getElementById('reviewName').value.trim();
        const reviewBike = document.getElementById('reviewBike').value.trim();
        const reviewRating = document.getElementById('reviewRating').value;
        const reviewText = document.getElementById('reviewText').value.trim();
        
        if (reviewName && reviewBike && reviewRating && reviewText) {
            showNotification('Thank you for your review!', 'success');
            reviewForm.reset();
        } else {
            showNotification('Please fill in all fields.', 'error');
        }
    });
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    let bgColor, icon;
    if (type === 'success') {
        bgColor = '#4caf50';
        icon = 'check-circle';
    } else if (type === 'info') {
        bgColor = '#2196F3';
        icon = 'info-circle';
    } else {
        bgColor = '#ff3b30';
        icon = 'exclamation-circle';
    }
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background-color: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 0.95rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Filter functionality for bikes page
const filterBrand = document.getElementById('filterBrand');
const filterType = document.getElementById('filterType');
const filterPrice = document.getElementById('filterPrice');
const sortBy = document.getElementById('sortBy');

function applyFilters() {
    const bikeCards = document.querySelectorAll('.bike-card');
    
    bikeCards.forEach(card => {
        let showCard = true;
        
        // Apply filters based on selected values
        // This is a simplified version - you would implement actual filtering logic
        
        if (showCard) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

if (filterBrand) filterBrand.addEventListener('change', applyFilters);
if (filterType) filterType.addEventListener('change', applyFilters);
if (filterPrice) filterPrice.addEventListener('change', applyFilters);
if (sortBy) sortBy.addEventListener('change', applyFilters);

// ============================================
// Quick Compare Functionality
// ============================================

const compareSlots = document.querySelectorAll('.compare-slot');
const bikeSelectorModal = document.getElementById('bikeSelectorModal');
const modalClose = document.getElementById('modalClose');
const bikeSelectionGrid = document.getElementById('bikeSelectionGrid');
const startCompareBtn = document.getElementById('startCompareBtn');

let selectedBikes = {
    1: null,
    2: null,
    3: null
};

let currentSlot = null;

// Bikes available for quick compare - MUST match compare.js database IDs
const quickCompareBikes = [
    { id: 'yamaha-r15', name: 'Yamaha R15 V4', price: '₹1.82 Lakh', type: 'Sports', image: 'https://images.unsplash.com/photo-1558981001-5864b9f7ff2e?w=200&h=150&fit=crop' },
    { id: 'ola-electric', name: 'Ola Electric S1 Pro', price: '₹1.30 Lakh', type: 'Electric', image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=200&h=150&fit=crop' },
    { id: 'royal-enfield-classic', name: 'Royal Enfield Classic 350', price: '₹1.93 Lakh', type: 'Cruiser', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=200&h=150&fit=crop' },
    { id: 'honda-activa', name: 'Honda Activa 6G', price: '₹74,536', type: 'Scooter', image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=200&h=150&fit=crop' },
    { id: 'ktm-duke-390', name: 'KTM Duke 390', price: '₹3.02 Lakh', type: 'Sports', image: 'https://images.unsplash.com/photo-1591768575417-8a3dc8dc3a8f?w=200&h=150&fit=crop' },
    { id: 'bajaj-dominar', name: 'Bajaj Dominar 400', price: '₹2.30 Lakh', type: 'Adventure', image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=200&h=150&fit=crop' },
    { id: 'suzuki-gixxer', name: 'Suzuki Gixxer', price: '₹1.25 Lakh', type: 'Sports', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=150&fit=crop' },
    { id: 'tvs-apache', name: 'TVS Apache RTR 160', price: '₹1.16 Lakh', type: 'Sports', image: 'https://images.unsplash.com/photo-1568772585286-f59e2f37daa5?w=200&h=150&fit=crop' },
    { id: 'hero-splendor', name: 'Hero Splendor Plus', price: '₹67,000', type: 'Commuter', image: 'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=200&h=150&fit=crop' }
];

// Open modal to select bike
if (compareSlots.length > 0) {
    compareSlots.forEach(slot => {
        slot.addEventListener('click', (e) => {
            // Don't trigger if clicking remove button
            if (e.target.closest('.remove-bike')) {
                return;
            }
            currentSlot = slot.dataset.slot;
            openBikeSelector();
        });
    });
}

function openBikeSelector() {
    if (!bikeSelectorModal || !bikeSelectionGrid) return;
    
    // Populate bikes
    bikeSelectionGrid.innerHTML = quickCompareBikes.map(bike => `
        <div class="bike-select-card" data-bike-id="${bike.id}">
            <img src="${bike.image}" alt="${bike.name}">
            <h4>${bike.name}</h4>
            <p class="bike-type">${bike.type}</p>
            <p class="bike-price-sm">${bike.price}</p>
        </div>
    `).join('');
    
    // Show modal
    bikeSelectorModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add click handlers
    document.querySelectorAll('.bike-select-card').forEach(card => {
        card.addEventListener('click', () => {
            const bikeId = card.dataset.bikeId;
            const bike = quickCompareBikes.find(b => b.id === bikeId);
            selectBike(bike);
        });
    });
}

function selectBike(bike) {
    if (!currentSlot || !bike) return;
    
    selectedBikes[currentSlot] = bike;
    updateCompareSlot(currentSlot, bike);
    closeBikeSelector();
    updateCompareButton();
    
    // Show notification
    if (typeof showNotification === 'function') {
        showNotification(`${bike.name} added to comparison!`, 'success');
    }
    
    console.log('Bike selected for slot', currentSlot, ':', bike.name);
    console.log('Current selections:', selectedBikes);
}

function updateCompareSlot(slotNumber, bike) {
    const slot = document.getElementById(`compareSlot${slotNumber}`);
    if (!slot) return;
    
    slot.innerHTML = `
        <button class="remove-bike" onclick="removeBike(${slotNumber})">
            <i class="fas fa-times"></i>
        </button>
        <img src="${bike.image}" alt="${bike.name}" class="selected-bike-img">
        <h4>${bike.name}</h4>
        <p class="selected-price">${bike.price}</p>
    `;
    slot.classList.add('selected');
}

function removeBike(slotNumber) {
    const removedBike = selectedBikes[slotNumber];
    selectedBikes[slotNumber] = null;
    const slot = document.getElementById(`compareSlot${slotNumber}`);
    if (slot) {
        slot.innerHTML = `
            <i class="fas fa-plus-circle"></i>
            <p>Select Bike ${slotNumber}</p>
        `;
        slot.classList.remove('selected');
    }
    updateCompareButton();
    
    // Show notification
    if (removedBike && typeof showNotification === 'function') {
        showNotification(`${removedBike.name} removed from comparison`, 'info');
    }
    
    console.log('Bike removed from slot', slotNumber);
}

// Make removeBike globally accessible
window.removeBike = removeBike;

function closeBikeSelector() {
    if (bikeSelectorModal) {
        bikeSelectorModal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function updateCompareButton() {
    const selectedCount = Object.values(selectedBikes).filter(b => b !== null).length;
    if (startCompareBtn) {
        startCompareBtn.disabled = selectedCount < 2;
        
        if (selectedCount >= 2) {
            startCompareBtn.textContent = `Compare ${selectedCount} Bike${selectedCount > 1 ? 's' : ''}`;
            startCompareBtn.classList.add('btn-active');
        } else {
            startCompareBtn.textContent = 'Select at least 2 bikes to compare';
            startCompareBtn.classList.remove('btn-active');
        }
    }
    
    console.log('Compare button updated:', selectedCount, 'bikes selected');
}

// Close modal handlers
if (modalClose) {
    modalClose.addEventListener('click', closeBikeSelector);
}

if (bikeSelectorModal) {
    bikeSelectorModal.addEventListener('click', (e) => {
        if (e.target === bikeSelectorModal) {
            closeBikeSelector();
        }
    });
}

// Start comparing
if (startCompareBtn) {
    startCompareBtn.addEventListener('click', () => {
        const selectedBikesList = Object.values(selectedBikes).filter(b => b !== null);
        
        console.log('Starting comparison with bikes:', selectedBikesList);
        
        if (selectedBikesList.length >= 2) {
            // Build URL with bike IDs
            const bikeIds = selectedBikesList.map(b => b.id);
            let compareUrl = 'compare.html?';
            
            if (bikeIds[0]) compareUrl += `bike1=${bikeIds[0]}`;
            if (bikeIds[1]) compareUrl += `&bike2=${bikeIds[1]}`;
            if (bikeIds[2]) compareUrl += `&bike3=${bikeIds[2]}`;
            
            console.log('Redirecting to:', compareUrl);
            
            // Redirect to compare page
            window.location.href = compareUrl;
        } else {
            alert('Please select at least 2 bikes to compare');
        }
    });
}

console.log('Bikeloo - Initialized successfully!');

