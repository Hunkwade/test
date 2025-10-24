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

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navbarMenu = document.getElementById('navbarMenu');

if (menuToggle && navbarMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navbarMenu.contains(e.target)) {
            menuToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
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

// Sample bike data for search suggestions
const bikeData = [
    'Yamaha R15 V4',
    'Ola Electric S1 Pro',
    'Royal Enfield Classic 350',
    'Honda Activa 6G',
    'KTM Duke 390',
    'Bajaj Dominar 400',
    'Suzuki Gixxer',
    'TVS Apache RTR 160',
    'Hero Splendor Plus',
    'Kawasaki Ninja 300',
    'Harley Davidson Street 750',
    'Ducati Panigale V2'
];

if (heroSearch && searchSuggestions) {
    heroSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        if (searchTerm.length > 0) {
            const filteredBikes = bikeData.filter(bike => 
                bike.toLowerCase().includes(searchTerm)
            );
            
            if (filteredBikes.length > 0) {
                searchSuggestions.innerHTML = filteredBikes
                    .slice(0, 6)
                    .map(bike => `<div class="suggestion-item">${bike}</div>`)
                    .join('');
                searchSuggestions.classList.add('active');
                
                // Add click handlers to suggestions
                document.querySelectorAll('.suggestion-item').forEach(item => {
                    item.addEventListener('click', () => {
                        heroSearch.value = item.textContent;
                        searchSuggestions.classList.remove('active');
                    });
                });
            } else {
                searchSuggestions.innerHTML = '<div class="suggestion-item">No results found</div>';
                searchSuggestions.classList.add('active');
            }
        } else {
            searchSuggestions.classList.remove('active');
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
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background-color: ${type === 'success' ? '#4caf50' : '#ff3b30'};
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

console.log('Bikeloo - Initialized successfully!');

