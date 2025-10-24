// ============================================
// Bikes Page - Simplified (No Filters)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Bikes page JavaScript initializing...');
    
    // DOM Elements
    const bikesGrid = document.querySelector('.bikes-grid');
    const bikeCards = document.querySelectorAll('.bike-card');
    const viewBtns = document.querySelectorAll('.view-btn');
    const sortSelect = document.getElementById('sortBy');
    const bikeCount = document.getElementById('bikeCount');
    
    console.log('Found elements:', {
        bikeCards: bikeCards.length,
        bikesGrid: !!bikesGrid,
        viewBtns: viewBtns.length,
        sortSelect: !!sortSelect
    });


    // View Toggle (Grid/List)
    if (viewBtns.length > 0) {
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active from all
                viewBtns.forEach(b => b.classList.remove('active'));
                // Add active to clicked
                btn.classList.add('active');
                
                const view = btn.dataset.view;
                if (view === 'list' && bikesGrid) {
                    bikesGrid.classList.add('list-view');
                    bikesGrid.classList.remove('grid-view');
                } else if (bikesGrid) {
                    bikesGrid.classList.add('grid-view');
                    bikesGrid.classList.remove('list-view');
                }
            });
        });
    }

    // Filter Functionality
    function applyFilters() {
        const brandValue = filterBrand ? filterBrand.value.toLowerCase() : '';
        const typeValue = filterType ? filterType.value.toLowerCase() : '';
        const priceValue = filterPrice ? filterPrice.value : '';
        const searchValue = bikeSearch ? bikeSearch.value.toLowerCase().trim() : '';
        
        let visibleCount = 0;
        
        bikeCards.forEach(card => {
            const cardBrand = card.dataset.brand ? card.dataset.brand.toLowerCase() : '';
            const cardType = card.dataset.type ? card.dataset.type.toLowerCase() : '';
            const cardPrice = parseInt(card.dataset.price) || 0;
            const cardName = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
            
            let show = true;
            
            // Search filter
            if (searchValue && !cardName.includes(searchValue) && !cardBrand.includes(searchValue)) {
                show = false;
            }
            
            // Brand filter
            if (brandValue && cardBrand !== brandValue) {
                show = false;
            }
            
            // Type filter
            if (typeValue && cardType !== typeValue) {
                show = false;
            }
            
            // Price filter
            if (priceValue) {
                if (priceValue.includes('-')) {
                    const [min, max] = priceValue.split('-').map(v => parseInt(v));
                    if (cardPrice < min || cardPrice > max) {
                        show = false;
                    }
                } else if (priceValue.includes('+')) {
                    const min = parseInt(priceValue.replace('+', ''));
                    if (cardPrice < min) {
                        show = false;
                    }
                }
            }
        
        // Show/hide card with proper display
        if (show) {
            card.style.removeProperty('display');
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            visibleCount++;
            
            // Animate in
            requestAnimationFrame(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        } else {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
    
    // Update count
    if (bikeCount) {
        bikeCount.textContent = visibleCount;
    }
    
    // Show/hide no results message
    if (noResults) {
        if (visibleCount === 0) {
            noResults.style.display = 'block';
            if (bikesGrid) {
                bikesGrid.style.display = 'none';
            }
        } else {
            noResults.style.display = 'none';
            if (bikesGrid) {
                bikesGrid.style.display = 'grid';
            }
        }
    }
    
    // Close mobile filter after applying
    if (window.innerWidth <= 768 && filterSidebar && filterToggle) {
        filterSidebar.classList.remove('active');
        filterToggle.classList.remove('active');
        if (filterBackdrop) filterBackdrop.classList.remove('active');
        const icon = filterToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-filter');
        }
        document.body.style.overflow = ''; // Restore scroll
    }
    
        console.log(`Filter applied: ${visibleCount} bikes visible`);
    }

    // Sort Functionality
    function sortBikes() {
    const sortValue = sortSelect.value;
    const cardsArray = Array.from(bikeCards);
    
    // Only sort visible cards
    const visibleCards = cardsArray.filter(card => {
        return card.style.display !== 'none';
    });
    
    visibleCards.sort((a, b) => {
        const priceA = parseInt(a.dataset.price) || 0;
        const priceB = parseInt(b.dataset.price) || 0;
        const mileageA = parseInt(a.dataset.mileage) || 0;
        const mileageB = parseInt(b.dataset.mileage) || 0;
        
        switch (sortValue) {
            case 'price-low':
                return priceA - priceB;
            case 'price-high':
                return priceB - priceA;
            case 'mileage':
                return mileageB - mileageA; // Higher mileage first
            case 'newest':
                // Keep original order for newest
                return 0;
            default: // popular
                return 0;
        }
    });
    
    // Clear the grid
    while (bikesGrid.firstChild) {
        bikesGrid.removeChild(bikesGrid.firstChild);
    }
    
    // Re-append all cards (hidden ones first, then visible sorted ones)
    const hiddenCards = cardsArray.filter(card => card.style.display === 'none');
    
    hiddenCards.forEach(card => {
        bikesGrid.appendChild(card);
    });
    
    visibleCards.forEach(card => {
        bikesGrid.appendChild(card);
    });
    
    // Add animation
    visibleCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50); // Stagger animation
    });
    
        console.log(`Sorted by: ${sortValue}`);
    }

    // Clear/Reset Filters Function
    function resetAllFilters() {
        // Reset all selects
        if (filterBrand) filterBrand.value = '';
        if (filterType) filterType.value = '';
        if (filterPrice) filterPrice.value = '';
        if (bikeSearch) bikeSearch.value = '';
        
        // Show all bikes
        bikeCards.forEach(card => {
            card.style.removeProperty('display');
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'all 0.3s ease';
        });
        
        // Update count
        if (bikeCount) {
            bikeCount.textContent = bikeCards.length;
        }
        
        // Hide no results
        if (noResults) {
            noResults.style.display = 'none';
        }
        if (bikesGrid) {
            bikesGrid.style.display = 'grid';
        }
        
        console.log('Filters reset');
    }

    // Reset Filters from No Results
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', resetAllFilters);
    }
    
    // Search functionality
    if (bikeSearch) {
        bikeSearch.addEventListener('input', (e) => {
            console.log('Search value:', e.target.value);
            applyFilters();
        });
        
        // Clear search on ESC key
        bikeSearch.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                bikeSearch.value = '';
                applyFilters();
            }
        });
    }

    // Event Listeners - with debug logging
    if (filterBrand) {
        filterBrand.addEventListener('change', (e) => {
            console.log('Brand filter changed:', e.target.value);
            applyFilters();
        });
    }

    if (filterType) {
        filterType.addEventListener('change', (e) => {
            console.log('Type filter changed:', e.target.value);
            applyFilters();
        });
    }

    if (filterPrice) {
        filterPrice.addEventListener('change', (e) => {
            console.log('Price filter changed:', e.target.value);
            applyFilters();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            console.log('Sort changed:', e.target.value);
            sortBikes();
        });
    }

// Pagination functionality
const paginationBtns = document.querySelectorAll('.pagination-btn');
if (paginationBtns.length > 0) {
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.disabled) return;
            
            // Remove active from all
            paginationBtns.forEach(b => {
                if (!b.querySelector('i')) { // Not arrow buttons
                    b.classList.remove('active');
                }
            });
            
            // Add active to clicked (if not arrow button)
            if (!this.querySelector('i')) {
                this.classList.add('active');
            }
            
            // Scroll to top of listings
            document.querySelector('.bikes-listing').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

// Lazy load images (if needed)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Compare bike functionality
const compareButtons = document.querySelectorAll('.btn-icon');
let compareList = [];

if (compareButtons.length > 0) {
    compareButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.bike-card');
            const bikeName = card.querySelector('h3').textContent;
            
            if (compareList.includes(bikeName)) {
                // Remove from compare
                compareList = compareList.filter(name => name !== bikeName);
                this.style.backgroundColor = '';
                this.style.color = '';
                showNotification(`${bikeName} removed from comparison`, 'info');
            } else {
                if (compareList.length >= 3) {
                    showNotification('You can compare up to 3 bikes only', 'error');
                    return;
                }
                // Add to compare
                compareList.push(bikeName);
                this.style.backgroundColor = 'var(--accent-red)';
                this.style.color = 'white';
                showNotification(`${bikeName} added to comparison (${compareList.length}/3)`, 'success');
            }
            
            // Update compare button if exists
            updateCompareButton();
        });
    });
}

function updateCompareButton() {
    // You could add a floating compare button that shows when bikes are selected
    let compareBtn = document.getElementById('floatingCompare');
    
    if (compareList.length > 0) {
        if (!compareBtn) {
            compareBtn = document.createElement('a');
            compareBtn.id = 'floatingCompare';
            compareBtn.href = 'compare.html';
            compareBtn.className = 'floating-compare-btn';
            compareBtn.innerHTML = `
                <i class="fas fa-exchange-alt"></i>
                <span>Compare (${compareList.length})</span>
            `;
            document.body.appendChild(compareBtn);
        } else {
            compareBtn.querySelector('span').textContent = `Compare (${compareList.length})`;
        }
    } else {
        if (compareBtn) {
            compareBtn.remove();
        }
    }
}

    // Pagination functionality
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    if (paginationBtns.length > 0) {
        paginationBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.disabled) return;
                
                // Remove active from all
                paginationBtns.forEach(b => {
                    if (!b.querySelector('i')) { // Not arrow buttons
                        b.classList.remove('active');
                    }
                });
                
                // Add active to clicked (if not arrow button)
                if (!this.querySelector('i')) {
                    this.classList.add('active');
                }
                
                // Scroll to top of listings
                const bikesListing = document.querySelector('.bikes-listing');
                if (bikesListing) {
                    bikesListing.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Compare bike functionality
    const compareButtons = document.querySelectorAll('.btn-icon');
    let compareList = [];

    if (compareButtons.length > 0) {
        compareButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const card = this.closest('.bike-card');
                if (!card) return;
                
                const bikeName = card.querySelector('h3').textContent;
                
                if (compareList.includes(bikeName)) {
                    // Remove from compare
                    compareList = compareList.filter(name => name !== bikeName);
                    this.style.backgroundColor = '';
                    this.style.color = '';
                    if (typeof showNotification === 'function') {
                        showNotification(`${bikeName} removed from comparison`, 'info');
                    }
                } else {
                    if (compareList.length >= 3) {
                        if (typeof showNotification === 'function') {
                            showNotification('You can compare up to 3 bikes only', 'error');
                        } else {
                            alert('You can compare up to 3 bikes only');
                        }
                        return;
                    }
                    // Add to compare
                    compareList.push(bikeName);
                    this.style.backgroundColor = 'var(--accent-red)';
                    this.style.color = 'white';
                    if (typeof showNotification === 'function') {
                        showNotification(`${bikeName} added to comparison (${compareList.length}/3)`, 'success');
                    }
                }
                
                // Update compare button if exists
                updateFloatingCompareButton();
            });
        });
    }

    function updateFloatingCompareButton() {
        let compareBtn = document.getElementById('floatingCompare');
        
        if (compareList.length > 0) {
            if (!compareBtn) {
                compareBtn = document.createElement('a');
                compareBtn.id = 'floatingCompare';
                compareBtn.href = 'compare.html';
                compareBtn.className = 'floating-compare-btn';
                compareBtn.innerHTML = `
                    <i class="fas fa-exchange-alt"></i>
                    <span>Compare (${compareList.length})</span>
                `;
                document.body.appendChild(compareBtn);
            } else {
                compareBtn.querySelector('span').textContent = `Compare (${compareList.length})`;
            }
        } else {
            if (compareBtn) {
                compareBtn.remove();
            }
        }
    }
    
    // Ensure all bike cards are visible on load
    if (bikeCards) {
        bikeCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }
    
    // Update initial count
    if (bikeCount && bikeCards) {
        bikeCount.textContent = bikeCards.length;
    }
    
    console.log('Bikes Page - Enhanced functionality loaded!');
    console.log(`Total bikes: ${bikeCards ? bikeCards.length : 0}`);
});

