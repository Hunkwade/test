// ============================================
// Reviews Page JavaScript
// ============================================

const writeReviewBtn = document.getElementById('writeReviewBtn');
const reviewForm = document.getElementById('reviewForm');
const submitReviewForm = document.getElementById('submitReviewForm');

if (writeReviewBtn && reviewForm) {
    writeReviewBtn.addEventListener('click', () => {
        if (reviewForm.style.display === 'none') {
            reviewForm.style.display = 'block';
            reviewForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            reviewForm.style.display = 'none';
        }
    });
}

if (submitReviewForm) {
    submitReviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const reviewName = document.getElementById('reviewName').value.trim();
        const reviewBike = document.getElementById('reviewBike').value.trim();
        const reviewRating = document.getElementById('reviewRating').value;
        const reviewTitle = document.getElementById('reviewTitle').value.trim();
        const reviewText = document.getElementById('reviewText').value.trim();
        
        if (reviewName && reviewBike && reviewRating && reviewTitle && reviewText) {
            // Show success message (using the notification function from main.js)
            if (typeof showNotification === 'function') {
                showNotification('Thank you for your review! It will be published after moderation.', 'success');
            }
            submitReviewForm.reset();
            reviewForm.style.display = 'none';
        }
    });
}

console.log('Reviews - Initialized successfully!');

