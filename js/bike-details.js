// ============================================
// Bike Details Page JavaScript
// ============================================

// Image Gallery
const mainImage = document.getElementById('mainBikeImage');
const thumbnails = document.querySelectorAll('.thumbnail');

if (thumbnails.length > 0) {
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Update main image
            mainImage.src = thumbnail.src.replace('w=200&h=120', 'w=800&h=500');
            
            // Update active state
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            thumbnail.classList.add('active');
        });
    });
}

console.log('Bike Details - Initialized successfully!');

