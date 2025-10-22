// JavaScript for Bikeloo website

document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Dark Mode Toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            // You might want to save the preference in localStorage
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('bikeloo-theme', 'dark');
            } else {
                localStorage.setItem('bikeloo-theme', 'light');
            }
        });

        // Check for saved theme preference
        if (localStorage.getItem('bikeloo-theme') === 'dark') {
            body.classList.add('dark-mode');
        }
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Bike Filtering and Sorting for All Bikes page
    const brandFilter = document.getElementById('brand-filter');
    const engineCCFilter = document.getElementById('engine-cc-filter');
    const priceRangeFilter = document.getElementById('price-range-filter');
    const typeFilter = document.getElementById('type-filter');
    const sortSelect = document.getElementById('sort-select');
    const bikeCardsGrid = document.querySelector('.bike-cards-grid-all');

    if (bikeCardsGrid) {
        const bikeCards = Array.from(bikeCardsGrid.children); // Convert HTMLCollection to Array

        function filterAndSortBikes() {
            const selectedBrand = brandFilter.value;
            const selectedEngineCC = engineCCFilter.value;
            const selectedPriceRange = priceRangeFilter.value;
            const selectedType = typeFilter.value;
            const selectedSort = sortSelect.value;

            let visibleBikes = bikeCards.filter(card => {
                const brand = card.querySelector('p').textContent.trim().toLowerCase().replace(/ /g, '-');
                const engineCC = getEngineCCFromCard(card); // Function to extract engine CC
                const price = parseFloat(card.querySelector('.price').textContent.replace('$', '').replace(',', ''));
                const bikeType = getBikeTypeFromCard(card); // Function to extract bike type

                const matchesBrand = selectedBrand === '' || brand.includes(selectedBrand);
                const matchesEngineCC = selectedEngineCC === '' || checkEngineCC(engineCC, selectedEngineCC);
                const matchesPriceRange = selectedPriceRange === '' || checkPriceRange(price, selectedPriceRange);
                const matchesType = selectedType === '' || bikeType.includes(selectedType);

                return matchesBrand && matchesEngineCC && matchesPriceRange && matchesType;
            });

            // Sort bikes
            visibleBikes.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.price').textContent.replace('$', '').replace(',', ''));
                const priceB = parseFloat(b.querySelector('.price').textContent.replace('$', '').replace(',', ''));
                const nameA = a.querySelector('h3').textContent.trim();
                const nameB = b.querySelector('h3').textContent.trim();

                if (selectedSort === 'price-asc') {
                    return priceA - priceB;
                } else if (selectedSort === 'price-desc') {
                    return priceB - priceA;
                } else { // 'popularity' or default
                    return nameA.localeCompare(nameB); // Default sort by name for now
                }
            });

            // Clear current grid and append sorted/filtered bikes
            bikeCardsGrid.innerHTML = '';
            visibleBikes.forEach(card => bikeCardsGrid.appendChild(card));

            // Helper functions to extract data for filtering
            function getEngineCCFromCard(card) {
                // This is a placeholder. In a real scenario, engine CC would be in a data attribute or more accessible.
                const bikeName = card.querySelector('h3').textContent.toLowerCase();
                if (bikeName.includes('883')) return 883;
                if (bikeName.includes('400')) return 400;
                if (bikeName.includes('350')) return 350;
                if (bikeName.includes('310')) return 310;
                if (bikeName.includes('390')) return 390;
                // Add more logic to extract CC based on bike name or a hidden data attribute
                return 0; // Default if not found
            }

            function checkEngineCC(cc, range) {
                if (range === 'under-200') return cc < 200;
                if (range === '200-400') return cc >= 200 && cc <= 400;
                if (range === '400-600') return cc >= 400 && cc <= 600;
                if (range === 'above-600') return cc > 600;
                return false;
            }

            function getBikeTypeFromCard(card) {
                // This is a placeholder. In a real scenario, bike type would be in a data attribute or more accessible.
                const bikeName = card.querySelector('h3').textContent.toLowerCase();
                if (bikeName.includes('sportster') || bikeName.includes('ninja') || bikeName.includes('speed') || bikeName.includes('duke') || bikeName.includes('svartpilen')) return 'sports';
                if (bikeName.includes('classic')) return 'cruiser';
                if (bikeName.includes('zero') || bikeName.includes('ola') || bikeName.includes('ultraviolette')) return 'electric';
                // Add more logic for other types
                return '';
            }

            function checkPriceRange(price, range) {
                if (range === 'under-5000') return price < 5000;
                if (range === '5000-10000') return price >= 5000 && price <= 10000;
                if (range === 'above-10000') return price > 10000;
                return false;
            }
        }

        // Attach event listeners
        brandFilter.addEventListener('change', filterAndSortBikes);
        engineCCFilter.addEventListener('change', filterAndSortBikes);
        priceRangeFilter.addEventListener('change', filterAndSortBikes);
        typeFilter.addEventListener('change', filterAndSortBikes);
        sortSelect.addEventListener('change', filterAndSortBikes);

        // Initial call to display all bikes (unsorted, unfiltered)
        filterAndSortBikes();
    }

    // Brands Filtering for Brands page
    const brandNameFilter = document.getElementById('brand-name-filter');
    const brandGrid = document.querySelector('.brand-grid');

    if (brandGrid) {
        const brandCards = Array.from(brandGrid.children); // Convert HTMLCollection to Array

        function filterBrands() {
            const selectedBrand = brandNameFilter.value;

            brandCards.forEach(card => {
                const cardBrand = card.dataset.brand; // Get brand from data-brand attribute
                if (selectedBrand === 'all' || cardBrand === selectedBrand) {
                    card.style.display = 'block'; // Show card
                } else {
                    card.style.display = 'none'; // Hide card
                }
            });
        }

        // Attach event listener
        brandNameFilter.addEventListener('change', filterBrands);

        // Initial call to display all brands
        filterBrands();
    }

    // Data for bikes (simplified for demonstration)
    const bikesData = {
        'sportster-iron-883': {
            name: 'Sportster Iron 883',
            brand: 'Harley-Davidson',
            price: '$11,999',
            image: 'assets/images/popular-bike-1.jpg',
            specs: {
                'engine-type': 'Air-cooled, Evolution™',
                'displacement': '883 cc',
                'max-torque': '70 Nm @ 3500 rpm',
                'fuel-capacity': '12.5 Liters',
                'weight': '256 kg',
                'brakes': 'Disc (Front & Rear)'
            }
        },
        'kawasaki-ninja-400': {
            name: 'Kawasaki Ninja 400',
            brand: 'Kawasaki',
            price: '$5,299',
            image: 'assets/images/popular-bike-2.jpg',
            specs: {
                'engine-type': 'Liquid-cooled, 4-stroke Parallel Twin',
                'displacement': '399 cc',
                'max-torque': '38 Nm @ 8000 rpm',
                'fuel-capacity': '14 Liters',
                'weight': '168 kg',
                'brakes': 'Disc (Front & Rear)'
            }
        },
        'royal-enfield-classic-350': {
            name: 'Royal Enfield Classic 350',
            brand: 'Royal Enfield',
            price: '$4,999',
            image: 'assets/images/popular-bike-3.jpg',
            specs: {
                'engine-type': 'Air-Oil Cooled, 4-stroke, Single Cylinder',
                'displacement': '349 cc',
                'max-torque': '27 Nm @ 4000 rpm',
                'fuel-capacity': '13 Liters',
                'weight': '195 kg',
                'brakes': 'Disc (Front & Rear)'
            }
        },
        'bmw-g310gs': {
            name: 'BMW G 310 GS',
            brand: 'BMW Motorrad',
            price: '$6,495',
            image: 'assets/images/popular-bike-4.jpg',
            specs: {
                'engine-type': 'Water-cooled, single-cylinder 4-stroke',
                'displacement': '313 cc',
                'max-torque': '28 Nm @ 7500 rpm',
                'fuel-capacity': '11 Liters',
                'weight': '175 kg',
                'brakes': 'Disc (Front & Rear)'
            }
        },
        'triumph-speed-400': {
            name: 'Triumph Speed 400',
            brand: 'Triumph',
            price: '$5,595',
            image: 'assets/images/latest-bike-1.jpg',
            specs: {
                'engine-type': 'Liquid-cooled, 4-valve, DOHC, single-cylinder',
                'displacement': '398 cc',
                'max-torque': '37.5 Nm @ 6500 rpm',
                'fuel-capacity': '13 Liters',
                'weight': '170 kg',
                'brakes': 'Disc (Front & Rear)'
            }
        },
        'ktm-390-duke': {
            name: 'KTM 390 Duke',
            brand: 'KTM',
            price: '$5,899',
            image: 'assets/images/latest-bike-2.jpg',
            specs: {
                'engine-type': 'Liquid-cooled, single-cylinder, 4-stroke',
                'displacement': '373.2 cc',
                'max-torque': '37 Nm @ 7000 rpm',
                'fuel-capacity': '13.4 Liters',
                'weight': '167 kg',
                'brakes': 'Disc (Front & Rear)'
            }
        },
        'husqvarna-svartpilen-401': {
            name: 'Husqvarna Svartpilen 401',
            brand: 'Husqvarna',
            price: '$5,399',
            image: 'assets/images/latest-bike-3.jpg',
            specs: {
                'engine-type': 'Liquid-cooled, single-cylinder, 4-stroke',
                'displacement': '373 cc',
                'max-torque': '37 Nm @ 7000 rpm',
                'fuel-capacity': '9.5 Liters',
                'weight': '152 kg',
                'brakes': 'Disc (Front & Rear)'
            }
        },
        'zero-srf': {
            name: 'Zero SR/F',
            brand: 'Zero Motorcycles',
            price: '$19,495',
            image: 'assets/images/electric-bike-1.jpg',
            specs: {
                'engine-type': 'Z-Force 75-10 permanent magnet AC motor',
                'displacement': 'Electric',
                'max-torque': '190 Nm',
                'fuel-capacity': 'N/A',
                'weight': '220 kg',
                'brakes': 'J-Juan radial 4-piston calipers (Front), J-Juan floating 1-piston caliper (Rear)'
            }
        },
        'ola-s1-pro': {
            name: 'Ola S1 Pro',
            brand: 'Ola Electric',
            price: '$1,899',
            image: 'assets/images/electric-bike-2.jpg',
            specs: {
                'engine-type': 'Mid-drive IPM Motor',
                'displacement': 'Electric',
                'max-torque': '58 Nm',
                'fuel-capacity': 'N/A',
                'weight': '125 kg',
                'brakes': 'Disc (Front & Rear)'
            }
        },
        'ultraviolette-f77': {
            name: 'Ultraviolette F77',
            brand: 'Ultraviolette Automotive',
            price: '$4,999',
            image: 'assets/images/electric-bike-3.jpg',
            specs: {
                'engine-type': 'Permanent Magnet AC Motor',
                'displacement': 'Electric',
                'max-torque': '90 Nm (wheel)',
                'fuel-capacity': 'N/A',
                'weight': '158 kg',
                'brakes': 'Disc (Front & Rear)'
            }
        }
    };

    // Compare Bikes Page functionality
    const bike1Select = document.getElementById('bike1-select');
    const bike2Select = document.getElementById('bike2-select');
    const compareButton = document.getElementById('compare-button');
    const compareResults = document.querySelector('.compare-results');
    const noComparisonSelected = document.querySelector('.no-comparison-selected');
    const compareBike1Img = document.getElementById('compare-bike1-img');
    const compareBike1Name = document.getElementById('compare-bike1-name');
    const compareBike2Img = document.getElementById('compare-bike2-img');
    const compareBike2Name = document.getElementById('compare-bike2-name');
    const compareTableBody = document.querySelector('.compare-table tbody');
    const compareSpecBike1Header = document.getElementById('compare-spec-bike1');
    const compareSpecBike2Header = document.getElementById('compare-spec-bike2');

    if (compareButton) {
        compareButton.addEventListener('click', () => {
            const bike1Id = bike1Select.value;
            const bike2Id = bike2Select.value;

            if (bike1Id && bike2Id) {
                const bike1 = bikesData[bike1Id];
                const bike2 = bikesData[bike2Id];

                if (bike1 && bike2) {
                    displayComparison(bike1, bike2);
                    compareResults.style.display = 'flex';
                    noComparisonSelected.style.display = 'none';
                } else {
                    alert('Please select valid bikes for comparison.');
                    compareResults.style.display = 'none';
                    noComparisonSelected.style.display = 'block';
                }
            } else {
                alert('Please select two bikes to compare.');
                compareResults.style.display = 'none';
                noComparisonSelected.style.display = 'block';
            }
        });
    }

    function displayComparison(bike1, bike2) {
        // Update bike info
        compareBike1Img.src = bike1.image;
        compareBike1Name.textContent = bike1.name;
        compareSpecBike1Header.textContent = bike1.name;

        compareBike2Img.src = bike2.image;
        compareBike2Name.textContent = bike2.name;
        compareSpecBike2Header.textContent = bike2.name;

        // Populate comparison table
        compareTableBody.innerHTML = ''; // Clear previous results

        const allSpecs = new Set([...Object.keys(bike1.specs), ...Object.keys(bike2.specs)]);

        allSpecs.forEach(specKey => {
            const row = document.createElement('tr');
            const specNameTd = document.createElement('td');
            specNameTd.textContent = formatSpecName(specKey);
            row.appendChild(specNameTd);

            const bike1Spec = bike1.specs[specKey] || 'N/A';
            const bike2Spec = bike2.specs[specKey] || 'N/A';

            const bike1ValueTd = document.createElement('td');
            bike1ValueTd.textContent = bike1Spec;
            row.appendChild(bike1ValueTd);

            const bike2ValueTd = document.createElement('td');
            bike2ValueTd.textContent = bike2Spec;
            row.appendChild(bike2ValueTd);

            // Highlight differences
            if (bike1Spec !== bike2Spec) {
                bike1ValueTd.classList.add('highlight-diff');
                bike2ValueTd.classList.add('highlight-diff');
            }
            compareTableBody.appendChild(row);
        });
    }

    function formatSpecName(specKey) {
        return specKey.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

});
