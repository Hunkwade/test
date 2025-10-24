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
        image: 'https://images.unsplash.com/photo-1558981001-5864b9f7ff2e?w=400&h=250&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1591768575417-8a3dc8dc3a8f?w=400&h=250&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=250&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=400&h=250&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400&h=250&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=250&fit=crop',
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
        previewElement.innerHTML = '<p class="no-selection">No bike selected</p>';
        return;
    }
    
    const bike = bikesDatabase[bikeId];
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
    
    // Update table based on selected bikes
    const compareTable = document.querySelector('.compare-table');
    if (!compareTable) return;
    
    // Find all better values and highlight them
    highlightBetterValues(bike1, bike2, bike3);
    
    // Update table content
    updateTableRow('Price', [bike1?.price, bike2?.price, bike3?.price]);
    updateTableRow('Type', [bike1?.type, bike2?.type, bike3?.type]);
    updateTableRow('Brand', [bike1?.brand, bike2?.brand, bike3?.brand]);
    
    // Engine & Performance
    updateTableRow('Engine Capacity', [bike1?.specs.engine, bike2?.specs.engine, bike3?.specs.engine]);
    updateTableRow('Max Power', [bike1?.specs.power, bike2?.specs.power, bike3?.specs.power]);
    updateTableRow('Max Torque', [bike1?.specs.torque, bike2?.specs.torque, bike3?.specs.torque]);
    updateTableRow('Transmission', [bike1?.specs.transmission, bike2?.specs.transmission, bike3?.specs.transmission]);
    
    // Mileage & Fuel
    updateTableRow('Mileage', [bike1?.specs.mileage, bike2?.specs.mileage, bike3?.specs.mileage]);
    updateTableRow('Fuel Tank', [bike1?.specs.fuelTank, bike2?.specs.fuelTank, bike3?.specs.fuelTank]);
    
    // Dimensions & Weight
    updateTableRow('Kerb Weight', [bike1?.specs.weight, bike2?.specs.weight, bike3?.specs.weight]);
    updateTableRow('Ground Clearance', [bike1?.specs.groundClearance, bike2?.specs.groundClearance, bike3?.specs.groundClearance]);
    updateTableRow('Wheelbase', [bike1?.specs.wheelbase, bike2?.specs.wheelbase, bike3?.specs.wheelbase]);
    
    // Brakes
    updateTableRow('Front Brake', [bike1?.specs.frontBrake, bike2?.specs.frontBrake, bike3?.specs.frontBrake]);
    updateTableRow('Rear Brake', [bike1?.specs.rearBrake, bike2?.specs.rearBrake, bike3?.specs.rearBrake]);
    updateTableRow('ABS', [bike1?.specs.abs, bike2?.specs.abs, bike3?.specs.abs]);
    
    // Features
    updateTableRow('Digital Console', [bike1?.specs.digitalConsole, bike2?.specs.digitalConsole, bike3?.specs.digitalConsole]);
    updateTableRow('LED Lights', [bike1?.specs.ledLights, bike2?.specs.ledLights, bike3?.specs.ledLights]);
    updateTableRow('Bluetooth', [bike1?.specs.bluetooth, bike2?.specs.bluetooth, bike3?.specs.bluetooth]);
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
            title: 'Bike Comparison - Bikeloo',
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

// Initial table update
setTimeout(() => {
    if (bike1Select?.value || bike2Select?.value || bike3Select?.value) {
        updateComparisonTable();
        console.log('Comparison table updated');
    }
}, 100);

console.log('Compare Page - Initialized successfully!');

