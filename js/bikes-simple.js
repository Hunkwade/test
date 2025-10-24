// ============================================
// Bikes Page - Simplified (No Filters)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Bikes page loading...');
    
    // DOM Elements
    const bikesGrid = document.querySelector('.bikes-grid');
    const bikeCards = document.querySelectorAll('.bike-card');
    const sortSelect = document.getElementById('sortBy');
    const bikeCount = document.getElementById('bikeCount');
    const bikeSearchBar = document.getElementById('bikeSearchBar');
    
    // Search Functionality
    if (bikeSearchBar && bikeCards) {
        bikeSearchBar.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            let visibleCount = 0;
            
            bikeCards.forEach(card => {
                const bikeName = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
                const bikeBrand = card.dataset.brand ? card.dataset.brand.toLowerCase() : '';
                
                if (bikeName.includes(searchTerm) || bikeBrand.includes(searchTerm) || searchTerm === '') {
                    card.style.display = '';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    visibleCount++;
                } else {
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
            
            console.log('Search:', searchTerm, '- Showing:', visibleCount, 'bikes');
        });
        
        // Clear search on ESC
        bikeSearchBar.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                bikeSearchBar.value = '';
                bikeSearchBar.dispatchEvent(new Event('input'));
            }
        });
    }

    // Sort Functionality
    function sortBikes() {
        if (!sortSelect || !bikesGrid) return;
        
        const sortValue = sortSelect.value;
        const cardsArray = Array.from(bikeCards);
        
        cardsArray.sort((a, b) => {
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
                    return mileageB - mileageA;
                default:
                    return 0;
            }
        });
        
        // Clear and re-append
        bikesGrid.innerHTML = '';
        cardsArray.forEach((card, index) => {
            bikesGrid.appendChild(card);
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 30);
        });
        
        console.log('Sorted by:', sortValue);
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', sortBikes);
    }

    // Pagination
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    if (paginationBtns.length > 0) {
        paginationBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.disabled) return;
                
                paginationBtns.forEach(b => {
                    if (!b.querySelector('i')) {
                        b.classList.remove('active');
                    }
                });
                
                if (!this.querySelector('i')) {
                    this.classList.add('active');
                }
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
    }

    // Compare functionality
    const compareButtons = document.querySelectorAll('.btn-icon');
    let compareList = [];

    if (compareButtons.length > 0) {
        compareButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const card = this.closest('.bike-card');
                if (!card) return;
                
                const bikeName = card.querySelector('h3').textContent;
                
                if (compareList.includes(bikeName)) {
                    compareList = compareList.filter(name => name !== bikeName);
                    this.style.backgroundColor = '';
                    this.style.color = '';
                } else {
                    if (compareList.length >= 3) {
                        alert('You can compare up to 3 bikes only');
                        return;
                    }
                    compareList.push(bikeName);
                    this.style.backgroundColor = 'var(--accent-red)';
                    this.style.color = 'white';
                }
                
                updateFloatingCompare();
            });
        });
    }

    function updateFloatingCompare() {
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
            if (compareBtn) compareBtn.remove();
        }
    }
    
    // Initialize
    if (bikeCards && bikeCount) {
        bikeCount.textContent = bikeCards.length;
        bikeCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }
    
    console.log('Bikes page loaded successfully!');
    console.log('Total bikes:', bikeCards.length);
});

