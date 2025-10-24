// ============================================
// Reviews Page - Enhanced JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Reviews page initializing...');

    // DOM Elements
    const writeReviewBtn = document.getElementById('writeReviewBtn');
    const reviewForm = document.getElementById('reviewForm');
    const submitReviewForm = document.getElementById('submitReviewForm');
    const reviewsList = document.querySelector('.reviews-list');
    const reviewItems = document.querySelectorAll('.review-item');
    const helpfulBtns = document.querySelectorAll('.btn-helpful');
    
    // Filter elements
    const brandFilter = document.querySelector('.reviews-filter select:first-of-type');
    const ratingFilter = document.querySelector('.reviews-filter select:last-of-type');

    console.log('Found elements:', {
        reviewItems: reviewItems.length,
        helpfulBtns: helpfulBtns.length,
        writeReviewBtn: !!writeReviewBtn,
        filters: { brand: !!brandFilter, rating: !!ratingFilter }
    });

    // Write Review Button
    if (writeReviewBtn && reviewForm) {
        writeReviewBtn.addEventListener('click', () => {
            if (reviewForm.style.display === 'none' || !reviewForm.style.display) {
                reviewForm.style.display = 'block';
                reviewForm.style.animation = 'slideDown 0.4s ease';
                setTimeout(() => {
                    reviewForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
                writeReviewBtn.textContent = 'Cancel';
                writeReviewBtn.classList.add('btn-secondary');
                writeReviewBtn.classList.remove('btn-primary');
                console.log('Review form opened');
            } else {
                reviewForm.style.display = 'none';
                writeReviewBtn.textContent = 'Write a Review';
                writeReviewBtn.classList.add('btn-primary');
                writeReviewBtn.classList.remove('btn-secondary');
                console.log('Review form closed');
            }
        });
    }

    // Submit Review Form
    if (submitReviewForm) {
        submitReviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const reviewName = document.getElementById('reviewName').value.trim();
            const reviewBike = document.getElementById('reviewBike').value.trim();
            const reviewRating = document.getElementById('reviewRating').value;
            const reviewTitle = document.getElementById('reviewTitle').value.trim();
            const reviewText = document.getElementById('reviewText').value.trim();
            
            if (reviewName && reviewBike && reviewRating && reviewTitle && reviewText) {
                // Show success message
                if (typeof showNotification === 'function') {
                    showNotification('Thank you! Your review will be published after moderation.', 'success');
                } else {
                    alert('Thank you! Your review has been submitted.');
                }
                
                // Reset form
                submitReviewForm.reset();
                reviewForm.style.display = 'none';
                
                // Reset button
                if (writeReviewBtn) {
                    writeReviewBtn.textContent = 'Write a Review';
                    writeReviewBtn.classList.add('btn-primary');
                    writeReviewBtn.classList.remove('btn-secondary');
                }
                
                console.log('Review submitted:', {
                    name: reviewName,
                    bike: reviewBike,
                    rating: reviewRating,
                    title: reviewTitle
                });
            } else {
                if (typeof showNotification === 'function') {
                    showNotification('Please fill in all required fields', 'error');
                } else {
                    alert('Please fill in all required fields');
                }
            }
        });
    }

    // Helpful Button Functionality
    if (helpfulBtns.length > 0) {
        helpfulBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const currentText = this.textContent;
                const match = currentText.match(/\((\d+)\)/);
                
                if (match) {
                    let count = parseInt(match[1]);
                    
                    if (!this.classList.contains('marked-helpful')) {
                        count++;
                        this.classList.add('marked-helpful');
                        this.innerHTML = `<i class="fas fa-thumbs-up"></i> Helpful (${count})`;
                        
                        if (typeof showNotification === 'function') {
                            showNotification('Thanks for your feedback!', 'success');
                        }
                        
                        console.log('Marked as helpful');
                    } else {
                        count--;
                        this.classList.remove('marked-helpful');
                        this.innerHTML = `<i class="fas fa-thumbs-up"></i> Helpful (${count})`;
                        console.log('Unmarked as helpful');
                    }
                }
            });
        });
    }

    // Filter Reviews
    function filterReviews() {
        const brandValue = brandFilter ? brandFilter.value.toLowerCase() : '';
        const ratingValue = ratingFilter ? ratingFilter.value : '';
        
        let visibleCount = 0;
        
        reviewItems.forEach(review => {
            const reviewMeta = review.querySelector('.review-meta');
            const reviewStars = review.querySelectorAll('.review-rating .fa-star, .review-rating .fa-star-half-alt');
            const reviewRating = reviewStars.length;
            
            let show = true;
            
            // Brand filter
            if (brandValue && reviewMeta) {
                const reviewText = reviewMeta.textContent.toLowerCase();
                if (!reviewText.includes(brandValue)) {
                    show = false;
                }
            }
            
            // Rating filter
            if (ratingValue) {
                const minRating = parseInt(ratingValue);
                if (reviewRating < minRating) {
                    show = false;
                }
            }
            
            // Show/hide review
            if (show) {
                review.style.display = 'block';
                review.style.opacity = '1';
                review.style.transform = 'translateY(0)';
                visibleCount++;
            } else {
                review.style.opacity = '0';
                review.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    review.style.display = 'none';
                }, 300);
            }
        });
        
        console.log('Filtered reviews:', visibleCount, 'visible out of', reviewItems.length);
    }

    // Add filter event listeners
    if (brandFilter) {
        brandFilter.addEventListener('change', (e) => {
            console.log('Brand filter changed:', e.target.value);
            filterReviews();
        });
    }
    
    if (ratingFilter) {
        ratingFilter.addEventListener('change', (e) => {
            console.log('Rating filter changed:', e.target.value);
            filterReviews();
        });
    }

    // Add animation to review items on scroll
    if ('IntersectionObserver' in window) {
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

        reviewItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            item.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(item);
        });
    }

    console.log('Reviews page - Initialized successfully!');
    console.log('Total reviews:', reviewItems.length);
});
