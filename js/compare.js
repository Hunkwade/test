// ============================================
// Compare Page - JavaScript Functionality
// ============================================

// Bike database with detailed specs
const bikesDatabase = {
    'yamaha-r15': {
        name: 'Yamaha R15 V4',
        brand: 'Yamaha',
        type: 'Sports',
        price: '₹1.82 Lakh',
        image: 'https://cdn.bikedekho.com/processedimages/yamaha/r15-v4/source/r15-v468bbb5ab2b458.jpg?imwidth=412&impolicy=resize',
        specs: {
            engine: '155cc',
            power: '18.4 bhp',
            torque: '14.2 Nm',
            transmission: '6-Speed',
            mileage: '40 km/l',
            fuelTank: '11 L',
            weight: '142 kg',
            groundClearance: '155 mm',
            wheelbase: '1,325 mm',
            frontBrake: '282mm Disc',
            rearBrake: '220mm Disc',
            abs: 'Yes',
            digitalConsole: 'Yes',
            ledLights: 'Yes',
            bluetooth: 'Yes'
        }
    },
    'ktm-duke-390': {
        name: 'KTM Duke 390',
        brand: 'KTM',
        type: 'Sports',
        price: '₹3.02 Lakh',
        image: 'https://cdn.bikedekho.com/processedimages/ktm/2021-390-duke/source/2021-390-duke67d19c0d0c17b.jpg?imwidth=412&impolicy=resize',
        specs: {
            engine: '373cc',
            power: '43.5 bhp',
            torque: '37 Nm',
            transmission: '6-Speed',
            mileage: '30 km/l',
            fuelTank: '13.4 L',
            weight: '172 kg',
            groundClearance: '185 mm',
            wheelbase: '1,357 mm',
            frontBrake: '320mm Disc',
            rearBrake: '230mm Disc',
            abs: 'Yes',
            digitalConsole: 'Yes',
            ledLights: 'Yes',
            bluetooth: 'Yes'
        }
    },
    'royal-enfield-classic': {
        name: 'Royal Enfield Classic 350',
        brand: 'Royal Enfield',
        type: 'Cruiser',
        price: '₹1.93 Lakh',
        image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/183389/classic-350-right-front-three-quarter-2.jpeg?isig=0&q=80',
        specs: {
            engine: '349cc',
            power: '20.2 bhp',
            torque: '27 Nm',
            transmission: '5-Speed',
            mileage: '35 km/l',
            fuelTank: '13 L',
            weight: '195 kg',
            groundClearance: '170 mm',
            wheelbase: '1,370 mm',
            frontBrake: '300mm Disc',
            rearBrake: '270mm Disc',
            abs: 'Yes',
            digitalConsole: 'Semi-Digital',
            ledLights: 'Yes',
            bluetooth: 'No'
        }
    },
    'honda-activa': {
        name: 'Honda Activa 6G',
        brand: 'Honda',
        type: 'Scooter',
        price: '₹74,536',
        image: 'https://imgd.aeplcdn.com/642x361/n/cw/ec/158667/honda-activa-6g-right-side-view1.jpeg?isig=0&q=75',
        specs: {
            engine: '110cc',
            power: '7.68 bhp',
            torque: '8.79 Nm',
            transmission: 'Automatic',
            mileage: '45 km/l',
            fuelTank: '5.3 L',
            weight: '109 kg',
            groundClearance: '171 mm',
            wheelbase: '1,260 mm',
            frontBrake: '130mm Drum',
            rearBrake: '130mm Drum',
            abs: 'CBS',
            digitalConsole: 'Analog',
            ledLights: 'Yes',
            bluetooth: 'No'
        }
    },
    'bajaj-dominar': {
        name: 'Bajaj Dominar 400',
        brand: 'Bajaj',
        type: 'Adventure',
        price: '₹2.30 Lakh',
        image: 'https://kaydeeauto.in/cdn/shop/files/BajajDominar400BS6-1_9499c99b-1b35-4198-b481-edf62b727900.png?v=1709361373&width=1445',
        specs: {
            engine: '373cc',
            power: '40 bhp',
            torque: '35 Nm',
            transmission: '6-Speed',
            mileage: '27 km/l',
            fuelTank: '13 L',
            weight: '187 kg',
            groundClearance: '173 mm',
            wheelbase: '1,453 mm',
            frontBrake: '320mm Disc',
            rearBrake: '230mm Disc',
            abs: 'Yes',
            digitalConsole: 'Yes',
            ledLights: 'Yes',
            bluetooth: 'No'
        }
    },
    'ola-electric': {
        name: 'Ola Electric S1 Pro',
        brand: 'Ola',
        type: 'Electric',
        price: '₹1.30 Lakh',
        image: 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/197219/s1-pro-left-side-view.jpeg?isig=0',
        specs: {
            engine: 'Electric Motor',
            power: '11 bhp',
            torque: '58 Nm',
            transmission: 'Automatic',
            mileage: '181 km Range',
            fuelTank: 'N/A',
            weight: '125 kg',
            groundClearance: '165 mm',
            wheelbase: '1,345 mm',
            frontBrake: 'Disc',
            rearBrake: 'Drum',
            abs: 'No',
            digitalConsole: 'Yes',
            ledLights: 'Yes',
            bluetooth: 'Yes'
        }
    }
};

// DOM Elements
const bike1Select = document.getElementById('bike1Select');
const bike2Select = document.getElementById('bike2Select');
const bike3Select = document.getElementById('bike3Select');

const selectedBike1 = document.getElementById('selectedBike1');
const selectedBike2 = document.getElementById('selectedBike2');
const selectedBike3 = document.getElementById('selectedBike3');

// Don't use sessionStorage anymore - we use URL parameters instead
// This ensures the comparison is shareable and bookmarkable

// Update bike preview when selection changes
if (bike1Select) {
    bike1Select.addEventListener('change', (e) => {
        updateBikePreview(1, e.target.value);
        updateComparisonTable();
    });
}

if (bike2Select) {
    bike2Select.addEventListener('change', (e) => {
        updateBikePreview(2, e.target.value);
        updateComparisonTable();
    });
}

if (bike3Select) {
    bike3Select.addEventListener('change', (e) => {
        updateBikePreview(3, e.target.value);
        updateComparisonTable();
    });
}

// Update bike preview function
function updateBikePreview(slotNumber, bikeId) {
    const previewElement = document.getElementById(`selectedBike${slotNumber}`);
    if (!previewElement) return;
    
    if (!bikeId || !bikesDatabase[bikeId]) {
        previewElement.style.display = 'none';
        previewElement.innerHTML = '<p class="no-selection">No bike selected</p>';
        return;
    }
    
    const bike = bikesDatabase[bikeId];
    previewElement.style.display = 'block';
    previewElement.innerHTML = `
        <img src="${bike.image}" alt="${bike.name}">
        <h4>${bike.name}</h4>
        <p class="price">${bike.price}</p>
    `;
}

// Update comparison table
function updateComparisonTable() {
    const bike1Id = bike1Select ? bike1Select.value : '';
    const bike2Id = bike2Select ? bike2Select.value : '';
    const bike3Id = bike3Select ? bike3Select.value : '';
    
    const bike1 = bikesDatabase[bike1Id];
    const bike2 = bikesDatabase[bike2Id];
    const bike3 = bikesDatabase[bike3Id];
    
    // Check if any bikes are selected
    const hasSelectedBikes = bike1Id || bike2Id || bike3Id;
    
    // Show/hide empty state and comparison table
    const emptyState = document.getElementById('emptyState');
    const comparisonTable = document.getElementById('comparisonTable');
    
    if (hasSelectedBikes) {
        if (emptyState) emptyState.style.display = 'none';
        if (comparisonTable) comparisonTable.style.display = 'block';
        
        // Generate comparison table content
        generateComparisonTable(bike1, bike2, bike3);
    } else {
        if (emptyState) emptyState.style.display = 'block';
        if (comparisonTable) comparisonTable.style.display = 'none';
    }
}

// Generate the comparison table dynamically
function generateComparisonTable(bike1, bike2, bike3) {
    const compareTable = document.getElementById('compareTable');
    if (!compareTable) return;
    
    // Clear existing content
    compareTable.innerHTML = '';
    
    // Create table structure
    const tableHTML = `
        <!-- Price & General -->
        <thead>
            <tr class="category-row">
                <th colspan="4">Price & General</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="spec-label">Price</td>
                <td>${bike1?.price || '-'}</td>
                <td>${bike2?.price || '-'}</td>
                <td>${bike3?.price || '-'}</td>
            </tr>
            <tr>
                <td class="spec-label">Type</td>
                <td>${bike1?.type || '-'}</td>
                <td>${bike2?.type || '-'}</td>
                <td>${bike3?.type || '-'}</td>
            </tr>
            <tr>
                <td class="spec-label">Brand</td>
                <td>${bike1?.brand || '-'}</td>
                <td>${bike2?.brand || '-'}</td>
                <td>${bike3?.brand || '-'}</td>
            </tr>
        </tbody>
        
        <!-- Engine & Performance -->
        <thead>
            <tr class="category-row">
                <th colspan="4">Engine & Performance</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="spec-label">Engine Capacity</td>
                <td>${bike1?.specs?.engine || '-'}</td>
                <td>${bike2?.specs?.engine || '-'}</td>
                <td>${bike3?.specs?.engine || '-'}</td>
            </tr>
            <tr>
                <td class="spec-label">Max Power</td>
                <td>${bike1?.specs?.power || '-'}</td>
                <td>${bike2?.specs?.power || '-'}</td>
                <td>${bike3?.specs?.power || '-'}</td>
            </tr>
            <tr>
                <td class="spec-label">Max Torque</td>
                <td>${bike1?.specs?.torque || '-'}</td>
                <td>${bike2?.specs?.torque || '-'}</td>
                <td>${bike3?.specs?.torque || '-'}</td>
            </tr>
            <tr>
                <td class="spec-label">Transmission</td>
                <td>${bike1?.specs?.transmission || '-'}</td>
                <td>${bike2?.specs?.transmission || '-'}</td>
                <td>${bike3?.specs?.transmission || '-'}</td>
            </tr>
        </tbody>
        
        <!-- Mileage & Fuel -->
        <thead>
            <tr class="category-row">
                <th colspan="4">Mileage & Fuel</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="spec-label">Mileage</td>
                <td>${bike1?.specs?.mileage || '-'}</td>
                <td>${bike2?.specs?.mileage || '-'}</td>
                <td>${bike3?.specs?.mileage || '-'}</td>
            </tr>
            <tr>
                <td class="spec-label">Fuel Tank</td>
                <td>${bike1?.specs?.fuelTank || '-'}</td>
                <td>${bike2?.specs?.fuelTank || '-'}</td>
                <td>${bike3?.specs?.fuelTank || '-'}</td>
            </tr>
        </tbody>
        
        <!-- Dimensions & Weight -->
        <thead>
            <tr class="category-row">
                <th colspan="4">Dimensions & Weight</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="spec-label">Kerb Weight</td>
                <td>${bike1?.specs?.weight || '-'}</td>
                <td>${bike2?.specs?.weight || '-'}</td>
                <td>${bike3?.specs?.weight || '-'}</td>
            </tr>
            <tr>
                <td class="spec-label">Ground Clearance</td>
                <td>${bike1?.specs?.groundClearance || '-'}</td>
                <td>${bike2?.specs?.groundClearance || '-'}</td>
                <td>${bike3?.specs?.groundClearance || '-'}</td>
            </tr>
            <tr>
                <td class="spec-label">Wheelbase</td>
                <td>${bike1?.specs?.wheelbase || '-'}</td>
                <td>${bike2?.specs?.wheelbase || '-'}</td>
                <td>${bike3?.specs?.wheelbase || '-'}</td>
            </tr>
        </tbody>
        
        <!-- Brakes & Suspension -->
        <thead>
            <tr class="category-row">
                <th colspan="4">Brakes & Suspension</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="spec-label">Front Brake</td>
                <td>${bike1?.specs?.frontBrake || '-'}</td>
                <td>${bike2?.specs?.frontBrake || '-'}</td>
                <td>${bike3?.specs?.frontBrake || '-'}</td>
            </tr>
            <tr>
                <td class="spec-label">Rear Brake</td>
                <td>${bike1?.specs?.rearBrake || '-'}</td>
                <td>${bike2?.specs?.rearBrake || '-'}</td>
                <td>${bike3?.specs?.rearBrake || '-'}</td>
            </tr>
            <tr>
                <td class="spec-label">ABS</td>
                <td>${bike1?.specs?.abs || '-'}</td>
                <td>${bike2?.specs?.abs || '-'}</td>
                <td>${bike3?.specs?.abs || '-'}</td>
            </tr>
        </tbody>
        
        <!-- Features -->
        <thead>
            <tr class="category-row">
                <th colspan="4">Features</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="spec-label">Digital Console</td>
                <td>${bike1?.specs?.digitalConsole || '-'}</td>
                <td>${bike2?.specs?.digitalConsole || '-'}</td>
                <td>${bike3?.specs?.digitalConsole || '-'}</td>
            </tr>
            <tr>
                <td class="spec-label">LED Lights</td>
                <td>${bike1?.specs?.ledLights || '-'}</td>
                <td>${bike2?.specs?.ledLights || '-'}</td>
                <td>${bike3?.specs?.ledLights || '-'}</td>
            </tr>
            <tr>
                <td class="spec-label">Bluetooth</td>
                <td>${bike1?.specs?.bluetooth || '-'}</td>
                <td>${bike2?.specs?.bluetooth || '-'}</td>
                <td>${bike3?.specs?.bluetooth || '-'}</td>
            </tr>
        </tbody>
    `;
    
    compareTable.innerHTML = tableHTML;
}

function updateTableRow(label, values) {
    const rows = document.querySelectorAll('.compare-table tbody tr');
    rows.forEach(row => {
        const labelCell = row.querySelector('.spec-label');
        if (labelCell && labelCell.textContent.trim() === label) {
            const cells = row.querySelectorAll('td:not(.spec-label)');
            cells.forEach((cell, index) => {
                if (values[index]) {
                    cell.textContent = values[index];
                } else {
                    cell.textContent = '-';
                }
            });
        }
    });
}

function highlightBetterValues(bike1, bike2, bike3) {
    // Remove all existing highlights
    document.querySelectorAll('.highlight-better').forEach(el => {
        el.classList.remove('highlight-better');
    });
    
    // Add highlights based on comparison logic
    // This is a simplified version - you can enhance it further
}

// Print comparison
function printComparison() {
    window.print();
}

// Share comparison
function shareComparison() {
    const bike1Id = bike1Select?.value || '';
    const bike2Id = bike2Select?.value || '';
    const bike3Id = bike3Select?.value || '';
    
    const url = `${window.location.origin}/compare.html?bike1=${bike1Id}&bike2=${bike2Id}&bike3=${bike3Id}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Bike Comparison - BikeLoo',
            text: 'Check out this bike comparison!',
            url: url
        }).then(() => {
            console.log('Shared successfully');
        }).catch(console.error);
    } else {
        // Copy to clipboard
        navigator.clipboard.writeText(url).then(() => {
            if (typeof showNotification === 'function') {
                showNotification('Comparison link copied to clipboard!', 'success');
            } else {
                alert('Link copied to clipboard!');
            }
        });
    }
}

// Check URL parameters for pre-selected bikes
const urlParams = new URLSearchParams(window.location.search);
const urlBike1 = urlParams.get('bike1');
const urlBike2 = urlParams.get('bike2');
const urlBike3 = urlParams.get('bike3');

console.log('URL Parameters:', { urlBike1, urlBike2, urlBike3 });

if (urlBike1 && bike1Select) {
    bike1Select.value = urlBike1;
    updateBikePreview(1, urlBike1);
    console.log('Loaded Bike 1:', urlBike1);
}
if (urlBike2 && bike2Select) {
    bike2Select.value = urlBike2;
    updateBikePreview(2, urlBike2);
    console.log('Loaded Bike 2:', urlBike2);
}
if (urlBike3 && bike3Select) {
    bike3Select.value = urlBike3;
    updateBikePreview(3, urlBike3);
    console.log('Loaded Bike 3:', urlBike3);
}

// Initial state - show empty state by default
setTimeout(() => {
    updateComparisonTable();
    console.log('Compare page initialized with empty state');
}, 100);

console.log('Compare Page - Initialized successfully!');

