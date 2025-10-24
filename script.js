// Global Variables
let currentBikes = [...bikesData];
let displayedBikesCount = 12;
let selectedForComparison = [];

// DOM Elements
const bikesGrid = document.getElementById('bikesGrid');
const bikeSearch = document.getElementById('bikeSearch');
const heroSearch = document.getElementById('heroSearch');
const brandFilter = document.getElementById('brandFilter');
const priceFilter = document.getElementById('priceFilter');
const sortFilter = document.getElementById('sortFilter');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const compareBtn = document.getElementById('compareBtn');
const compareCount = document.getElementById('compareCount');
const compareModal = document.getElementById('compareModal');
const closeCompare = document.getElementById('closeCompare');
const bikeModal = document.getElementById('bikeModal');
const closeBikeModal = document.getElementById('closeBikeModal');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navbar = document.querySelector('.navbar');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderBikes();
    initializeEventListeners();
    initializeScrollEffects();
});

// Event Listeners
function initializeEventListeners() {
    // Search
    bikeSearch.addEventListener('input', handleFilters);
    heroSearch.addEventListener('input', (e) => {
        bikeSearch.value = e.target.value;
        handleFilters();
        scrollToBikesSection();
    });
    
    // Filters
    brandFilter.addEventListener('change', handleFilters);
    priceFilter.addEventListener('change', handleFilters);
    sortFilter.addEventListener('change', handleFilters);
    
    // Category filters
    document.querySelectorAll('.filter-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            filterByCategory(category);
        });
    });
    
    // Brand cards
    document.querySelectorAll('.brand-card').forEach(card => {
        card.addEventListener('click', () => {
            const brand = card.dataset.brand;
            brandFilter.value = brand;
            handleFilters();
            scrollToBikesSection();
        });
    });
    
    // Load More
    loadMoreBtn.addEventListener('click', () => {
        displayedBikesCount += 12;
        renderBikes();
    });
    
    // Comparison
    compareBtn.addEventListener('click', openCompareModal);
    closeCompare.addEventListener('click', closeCompareModal);
    closeBikeModal.addEventListener('click', closeBikeDetailsModal);
    
    // Mobile Menu
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Close modals on outside click
    compareModal.addEventListener('click', (e) => {
        if (e.target === compareModal) {
            closeCompareModal();
        }
    });
    
    bikeModal.addEventListener('click', (e) => {
        if (e.target === bikeModal) {
            closeBikeDetailsModal();
        }
    });
    
    // Search button in hero
    document.querySelector('.hero-search .search-btn').addEventListener('click', () => {
        bikeSearch.value = heroSearch.value;
        handleFilters();
        scrollToBikesSection();
    });
}

// Scroll Effects
function initializeScrollEffects() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for nav links
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
}

// Filter and Sort Functions
function handleFilters() {
    const searchTerm = bikeSearch.value.toLowerCase();
    const brand = brandFilter.value.toLowerCase();
    const priceRange = priceFilter.value;
    const sortBy = sortFilter.value;
    
    // Filter bikes
    currentBikes = bikesData.filter(bike => {
        const matchesSearch = bike.name.toLowerCase().includes(searchTerm) ||
                            bike.brand.toLowerCase().includes(searchTerm) ||
                            bike.category.toLowerCase().includes(searchTerm);
        
        const matchesBrand = !brand || bike.brand.toLowerCase() === brand;
        
        let matchesPrice = true;
        if (priceRange) {
            const [min, max] = priceRange.split('-').map(Number);
            matchesPrice = bike.price >= min && bike.price <= max;
        }
        
        return matchesSearch && matchesBrand && matchesPrice;
    });
    
    // Sort bikes
    sortBikes(sortBy);
    
    // Reset displayed count
    displayedBikesCount = 12;
    renderBikes();
}

function filterByCategory(category) {
    // Reset other filters
    brandFilter.value = '';
    priceFilter.value = '';
    bikeSearch.value = '';
    
    // Filter by category
    currentBikes = bikesData.filter(bike => bike.category === category);
    
    // Sort
    sortBikes(sortFilter.value);
    
    // Render
    displayedBikesCount = 12;
    renderBikes();
    scrollToBikesSection();
}

function sortBikes(sortBy) {
    switch (sortBy) {
        case 'price-low':
            currentBikes.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            currentBikes.sort((a, b) => b.price - a.price);
            break;
        case 'mileage':
            currentBikes.sort((a, b) => {
                const mileageA = parseInt(a.mileage);
                const mileageB = parseInt(b.mileage);
                return mileageB - mileageA;
            });
            break;
        case 'power':
            currentBikes.sort((a, b) => {
                const powerA = parseFloat(a.power);
                const powerB = parseFloat(b.power);
                return powerB - powerA;
            });
            break;
        default: // popular
            currentBikes.sort((a, b) => {
                if (a.popular && !b.popular) return -1;
                if (!a.popular && b.popular) return 1;
                return 0;
            });
    }
}

// Render Bikes
function renderBikes() {
    bikesGrid.innerHTML = '';
    
    const bikesToShow = currentBikes.slice(0, displayedBikesCount);
    
    if (bikesToShow.length === 0) {
        bikesGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-search" style="font-size: 64px; color: var(--text-muted); margin-bottom: 20px;"></i>
                <h3 style="font-size: 24px; margin-bottom: 10px;">No bikes found</h3>
                <p style="color: var(--text-muted);">Try adjusting your filters or search terms</p>
            </div>
        `;
        loadMoreBtn.style.display = 'none';
        return;
    }
    
    bikesToShow.forEach(bike => {
        const bikeCard = createBikeCard(bike);
        bikesGrid.appendChild(bikeCard);
    });
    
    // Show/hide load more button
    if (displayedBikesCount >= currentBikes.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-flex';
    }
}

// Create Bike Card
function createBikeCard(bike) {
    const card = document.createElement('div');
    card.className = 'bike-card';
    
    const isSelected = selectedForComparison.includes(bike.id);
    
    card.innerHTML = `
        <div class="bike-image">
            <img src="${bike.image}" alt="${bike.name}" onerror="this.src='https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop'">
            ${bike.popular ? '<span class="bike-badge">Popular</span>' : ''}
            <label class="compare-checkbox">
                <input type="checkbox" ${isSelected ? 'checked' : ''} onchange="toggleCompare(${bike.id})">
                <i class="fas fa-check"></i>
            </label>
        </div>
        <div class="bike-info">
            <div class="bike-brand">${bike.brand}</div>
            <h3 class="bike-name">${bike.name}</h3>
            <div class="bike-specs">
                <div class="spec-item">
                    <div class="spec-label">Engine</div>
                    <div class="spec-value">${bike.engine}</div>
                </div>
                <div class="spec-item">
                    <div class="spec-label">Power</div>
                    <div class="spec-value">${bike.power}</div>
                </div>
                <div class="spec-item">
                    <div class="spec-label">Mileage</div>
                    <div class="spec-value">${bike.mileage}</div>
                </div>
            </div>
            <div class="bike-price">
                <div class="price">₹${formatPrice(bike.price)}</div>
                <button class="view-details-btn" onclick="openBikeDetails(${bike.id})">
                    View Details
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Comparison Functions
function toggleCompare(bikeId) {
    const index = selectedForComparison.indexOf(bikeId);
    
    if (index > -1) {
        selectedForComparison.splice(index, 1);
    } else {
        if (selectedForComparison.length >= 3) {
            alert('You can compare maximum 3 bikes at a time');
            // Uncheck the checkbox
            event.target.checked = false;
            return;
        }
        selectedForComparison.push(bikeId);
    }
    
    updateCompareCount();
}

function updateCompareCount() {
    compareCount.textContent = selectedForComparison.length;
}

function openCompareModal() {
    if (selectedForComparison.length < 2) {
        alert('Please select at least 2 bikes to compare');
        return;
    }
    
    const selectedBikes = bikesData.filter(bike => selectedForComparison.includes(bike.id));
    
    // Render selected bikes
    const compareBikesContainer = document.getElementById('compareBikesContainer');
    compareBikesContainer.innerHTML = selectedBikes.map(bike => `
        <div class="compare-bike-item">
            <img src="${bike.image}" alt="${bike.name}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px; margin-bottom: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" onerror="this.src='https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop'">
            <h4 style="font-size: 18px; margin-bottom: 5px; color: #212529;">${bike.brand} ${bike.name}</h4>
            <p style="color: #ff6b35; font-size: 20px; font-weight: 700;">₹${formatPrice(bike.price)}</p>
        </div>
    `).join('');
    
    // Render comparison table
    const compareTableContainer = document.getElementById('compareTableContainer');
    compareTableContainer.innerHTML = `
        <table class="comparison-table">
            <thead>
                <tr>
                    <th>Specification</th>
                    ${selectedBikes.map(bike => `<th>${bike.brand} ${bike.name}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Price</strong></td>
                    ${selectedBikes.map(bike => `<td>₹${formatPrice(bike.price)}</td>`).join('')}
                </tr>
                <tr>
                    <td><strong>Engine</strong></td>
                    ${selectedBikes.map(bike => `<td>${bike.engine}</td>`).join('')}
                </tr>
                <tr>
                    <td><strong>Power</strong></td>
                    ${selectedBikes.map(bike => `<td>${bike.power}</td>`).join('')}
                </tr>
                <tr>
                    <td><strong>Torque</strong></td>
                    ${selectedBikes.map(bike => `<td>${bike.torque}</td>`).join('')}
                </tr>
                <tr>
                    <td><strong>Mileage</strong></td>
                    ${selectedBikes.map(bike => `<td>${bike.mileage}</td>`).join('')}
                </tr>
                <tr>
                    <td><strong>Top Speed</strong></td>
                    ${selectedBikes.map(bike => `<td>${bike.topSpeed}</td>`).join('')}
                </tr>
                <tr>
                    <td><strong>Weight</strong></td>
                    ${selectedBikes.map(bike => `<td>${bike.weight}</td>`).join('')}
                </tr>
                <tr>
                    <td><strong>Fuel Capacity</strong></td>
                    ${selectedBikes.map(bike => `<td>${bike.fuelCapacity}</td>`).join('')}
                </tr>
                <tr>
                    <td><strong>Transmission</strong></td>
                    ${selectedBikes.map(bike => `<td>${bike.transmission}</td>`).join('')}
                </tr>
                <tr>
                    <td><strong>Brakes</strong></td>
                    ${selectedBikes.map(bike => `<td>${bike.brakes}</td>`).join('')}
                </tr>
                <tr>
                    <td><strong>Cooling</strong></td>
                    ${selectedBikes.map(bike => `<td>${bike.cooling}</td>`).join('')}
                </tr>
                <tr>
                    <td><strong>Starter</strong></td>
                    ${selectedBikes.map(bike => `<td>${bike.starter}</td>`).join('')}
                </tr>
                <tr>
                    <td><strong>Category</strong></td>
                    ${selectedBikes.map(bike => `<td style="text-transform: capitalize;">${bike.category}</td>`).join('')}
                </tr>
            </tbody>
        </table>
    `;
    
    compareModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCompareModal() {
    compareModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Bike Details Modal
function openBikeDetails(bikeId) {
    const bike = bikesData.find(b => b.id === bikeId);
    if (!bike) return;
    
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="modal-detail-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px;">
            <div>
                <img src="${bike.image}" alt="${bike.name}" style="width: 100%; height: 400px; object-fit: cover; border-radius: 20px; margin-bottom: 20px; box-shadow: 0 4px 16px rgba(0,0,0,0.1);" onerror="this.src='https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop'">
                <h1 style="font-family: 'Orbitron', sans-serif; font-size: 42px; margin-bottom: 10px; color: #212529;">${bike.brand} ${bike.name}</h1>
                <p style="font-size: 36px; font-weight: 700; background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 20px;">₹${formatPrice(bike.price)}</p>
                <p style="color: #6c757d; line-height: 1.8; margin-bottom: 30px;">${bike.description}</p>
                
                <div style="margin-bottom: 30px;">
                    <h3 style="font-size: 20px; margin-bottom: 15px; color: #212529;">Available Colors:</h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                        ${bike.colors.map(color => `
                            <span style="background: #f8f9fa; border: 1px solid #dee2e6; padding: 8px 16px; border-radius: 20px; font-size: 14px; color: #212529;">${color}</span>
                        `).join('')}
                    </div>
                </div>
                
                <button onclick="toggleCompare(${bike.id}); renderBikes();" style="background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%); color: white; border: none; padding: 15px 30px; border-radius: 30px; font-size: 16px; font-weight: 600; cursor: pointer; margin-right: 15px; box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3); transition: all 0.3s ease;">
                    <i class="fas fa-balance-scale"></i> ${selectedForComparison.includes(bike.id) ? 'Remove from' : 'Add to'} Compare
                </button>
            </div>
            
            <div>
                <h2 style="font-size: 28px; margin-bottom: 25px; font-family: 'Orbitron', sans-serif; color: #212529;">Specifications</h2>
                <div style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 15px; padding: 30px; margin-bottom: 30px;">
                    <div style="display: grid; gap: 20px;">
                        <div style="display: flex; justify-content: space-between; padding-bottom: 15px; border-bottom: 1px solid #dee2e6;">
                            <span style="color: #6c757d;">Engine Displacement</span>
                            <span style="font-weight: 600; color: #212529;">${bike.engine}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding-bottom: 15px; border-bottom: 1px solid #dee2e6;">
                            <span style="color: #6c757d;">Max Power</span>
                            <span style="font-weight: 600; color: #212529;">${bike.power}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding-bottom: 15px; border-bottom: 1px solid #dee2e6;">
                            <span style="color: #6c757d;">Max Torque</span>
                            <span style="font-weight: 600; color: #212529;">${bike.torque}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding-bottom: 15px; border-bottom: 1px solid #dee2e6;">
                            <span style="color: #6c757d;">Mileage</span>
                            <span style="font-weight: 600; color: #212529;">${bike.mileage}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding-bottom: 15px; border-bottom: 1px solid #dee2e6;">
                            <span style="color: #6c757d;">Top Speed</span>
                            <span style="font-weight: 600; color: #212529;">${bike.topSpeed}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding-bottom: 15px; border-bottom: 1px solid #dee2e6;">
                            <span style="color: #6c757d;">Weight</span>
                            <span style="font-weight: 600; color: #212529;">${bike.weight}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding-bottom: 15px; border-bottom: 1px solid #dee2e6;">
                            <span style="color: #6c757d;">Fuel Tank Capacity</span>
                            <span style="font-weight: 600; color: #212529;">${bike.fuelCapacity}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding-bottom: 15px; border-bottom: 1px solid #dee2e6;">
                            <span style="color: #6c757d;">Transmission</span>
                            <span style="font-weight: 600; color: #212529;">${bike.transmission}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding-bottom: 15px; border-bottom: 1px solid #dee2e6;">
                            <span style="color: #6c757d;">Brakes</span>
                            <span style="font-weight: 600; color: #212529;">${bike.brakes}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding-bottom: 15px; border-bottom: 1px solid #dee2e6;">
                            <span style="color: #6c757d;">Cooling System</span>
                            <span style="font-weight: 600; color: #212529;">${bike.cooling}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span style="color: #6c757d;">Starting System</span>
                            <span style="font-weight: 600; color: #212529;">${bike.starter}</span>
                        </div>
                    </div>
                </div>
                
                <h3 style="font-size: 24px; margin-bottom: 20px; color: #212529;">Key Features</h3>
                <div style="display: grid; gap: 12px;">
                    ${bike.features.map(feature => `
                        <div style="display: flex; align-items: center; gap: 12px; background: #f8f9fa; border: 1px solid #dee2e6; padding: 15px; border-radius: 10px;">
                            <i class="fas fa-check-circle" style="color: #10b981; font-size: 20px;"></i>
                            <span style="color: #212529;">${feature}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    bikeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBikeDetailsModal() {
    bikeModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Utility Functions
function formatPrice(price) {
    if (price >= 100000) {
        return (price / 100000).toFixed(2) + ' L';
    }
    return price.toLocaleString('en-IN');
}

function scrollToBikesSection() {
    const bikesSection = document.getElementById('bikes');
    bikesSection.scrollIntoView({ behavior: 'smooth' });
}

// Make functions globally accessible
window.toggleCompare = toggleCompare;
window.openBikeDetails = openBikeDetails;

