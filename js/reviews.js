// ============================================
// Reviews Page JavaScript
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const writeReviewBtn = document.getElementById('writeReviewBtn');
    const reviewFormSection = document.getElementById('reviewFormSection');
    const googleFormBtn = document.getElementById('googleFormBtn');

    // Toggle review form visibility
    if (writeReviewBtn && reviewFormSection) {
        writeReviewBtn.addEventListener('click', () => {
            if (reviewFormSection.style.display === 'none' || !reviewFormSection.style.display) {
                reviewFormSection.style.display = 'block';
                reviewFormSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                writeReviewBtn.textContent = 'Close Form';
            } else {
                reviewFormSection.style.display = 'none';
                writeReviewBtn.textContent = 'Write a Review';
            }
        });
    }

    // Google Form button handler
    if (googleFormBtn) {
        googleFormBtn.addEventListener('click', () => {
            // ============================================
            // INSTRUCTIONS: Replace the URL below with your actual Google Form URL
            // 1. Go to Google Forms (forms.google.com)
            // 2. Create a new form for bike reviews
            // 3. Click "Send" button at top right
            // 4. Click the link icon (<>)
            // 5. Copy the form URL
            // 6. Replace the URL below
            // ============================================
            const googleFormUrl = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform';
            window.open(googleFormUrl, '_blank');
        });
    }

    // Helpful button functionality
    const helpfulButtons = document.querySelectorAll('.btn-helpful');
    helpfulButtons.forEach((button) => {
        button.addEventListener('click', function() {
            // Toggle helpful state
            if (this.classList.contains('helpful-active')) {
                this.classList.remove('helpful-active');
                const count = parseInt(this.textContent.match(/\d+/)[0]);
                this.innerHTML = `<i class="fas fa-thumbs-up"></i> Helpful (${count - 1})`;
            } else {
                this.classList.add('helpful-active');
                const count = parseInt(this.textContent.match(/\d+/)[0]);
                this.innerHTML = `<i class="fas fa-thumbs-up"></i> Helpful (${count + 1})`;
            }
            
            // Show notification
            if (typeof showNotification === 'function') {
                showNotification('Thank you for your feedback!', 'success');
            }
        });
    });

    // ============================================
    // Filter Functionality
    // ============================================
    const brandFilter = document.getElementById('filterBrand');
    const ratingFilter = document.getElementById('filterRating');
    const resetFiltersBtn = document.getElementById('resetFilters');
    
    // Function to count star ratings in a review
    function countStars(reviewItem) {
        const fullStars = reviewItem.querySelectorAll('.review-rating .fa-star:not(.fa-star-half-alt)').length;
        const halfStars = reviewItem.querySelectorAll('.review-rating .fa-star-half-alt').length;
        return fullStars + (halfStars * 0.5);
    }
    
    // Apply filters to reviews
    function applyFilters() {
        const selectedBrand = brandFilter.value.toLowerCase();
        const selectedRating = ratingFilter.value;
        const reviewItems = document.querySelectorAll('.review-item');
        
        let visibleCount = 0;
        
        reviewItems.forEach(item => {
            const reviewMeta = item.querySelector('.review-meta').textContent.toLowerCase();
            const starCount = countStars(item);
            
            let showItem = true;
            
            // Brand filter - check if brand exists in review meta
            if (selectedBrand) {
                if (selectedBrand === 'honda' && !reviewMeta.includes('honda')) {
                    showItem = false;
                } else if (selectedBrand === 'yamaha' && !reviewMeta.includes('yamaha')) {
                    showItem = false;
                } else if (selectedBrand === 'ktm' && !reviewMeta.includes('ktm')) {
                    showItem = false;
                } else if (selectedBrand === 'royal-enfield' && !reviewMeta.includes('royal enfield')) {
                    showItem = false;
                } else if (selectedBrand === 'bajaj' && !reviewMeta.includes('bajaj')) {
                    showItem = false;
                } else if (selectedBrand === 'ola' && !reviewMeta.includes('ola')) {
                    showItem = false;
                }
            }
            
            // Rating filter - show reviews with rating >= selected rating
            if (selectedRating && showItem) {
                const minRating = parseInt(selectedRating);
                if (starCount < minRating) {
                    showItem = false;
                }
            }
            
            // Show or hide the item
            if (showItem) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show result notification
        if (selectedBrand || selectedRating) {
            if (typeof showNotification === 'function') {
                showNotification(`Showing ${visibleCount} review${visibleCount !== 1 ? 's' : ''}`, 'info');
            }
        }
        
        console.log('Filters applied:', {
            brand: selectedBrand || 'all',
            rating: selectedRating || 'all',
            visible: visibleCount
        });
    }
    
    // Reset filters
    function resetFilters() {
        brandFilter.value = '';
        ratingFilter.value = '';
        
        const reviewItems = document.querySelectorAll('.review-item');
        reviewItems.forEach(item => {
            item.style.display = 'block';
        });
        
        if (typeof showNotification === 'function') {
            showNotification('Filters reset successfully!', 'success');
        }
        
        console.log('Filters reset');
    }
    
    // Attach event listeners
    if (brandFilter && ratingFilter) {
        brandFilter.addEventListener('change', applyFilters);
        ratingFilter.addEventListener('change', applyFilters);
        
        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener('click', resetFilters);
        }
        
        console.log('Review filters initialized successfully!');
    }

    console.log('Reviews page - Initialized successfully!');
});

