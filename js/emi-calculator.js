// ============================================
// EMI Calculator JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const emiForm = document.getElementById('emiCalculatorForm');
    const resultsSection = document.getElementById('resultsSection');
    const resetBtn = document.getElementById('resetForm');
    const printBtn = document.getElementById('printResults');
    const shareBtn = document.getElementById('shareResults');

    // EMI Calculation function
    function calculateEMI(principal, rate, tenure) {
        const monthlyRate = rate / (12 * 100);
        const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                   (Math.pow(1 + monthlyRate, tenure) - 1);
        return Math.round(emi);
    }

    // Generate payment schedule
    function generatePaymentSchedule(principal, rate, tenure, emi) {
        const schedule = [];
        let balance = principal;
        const monthlyRate = rate / (12 * 100);
        
        for (let month = 1; month <= tenure; month++) {
            const interestPayment = Math.round(balance * monthlyRate);
            const principalPayment = emi - interestPayment;
            balance = Math.max(0, balance - principalPayment);
            
            schedule.push({
                month: month,
                emi: emi,
                principal: principalPayment,
                interest: interestPayment,
                balance: Math.round(balance)
            });
        }
        
        return schedule;
    }

    // Format currency
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    }

    // Update results display
    function updateResults(loanData) {
        const { principal, rate, tenure, emi, totalInterest, totalAmount, schedule } = loanData;
        
        // Update summary cards
        document.getElementById('monthlyEMI').textContent = formatCurrency(emi);
        document.getElementById('totalInterest').textContent = formatCurrency(totalInterest);
        document.getElementById('totalAmount').textContent = formatCurrency(totalAmount);
        
        // Update breakdown
        document.getElementById('principalAmount').textContent = formatCurrency(principal);
        document.getElementById('interestAmount').textContent = formatCurrency(totalInterest);
        document.getElementById('loanTenureDisplay').textContent = `${tenure} months`;
        document.getElementById('interestRateDisplay').textContent = `${rate}% p.a.`;
        
        // Update payment schedule table
        const tableBody = document.getElementById('scheduleTableBody');
        tableBody.innerHTML = '';
        
        schedule.forEach(payment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${payment.month}</td>
                <td>${formatCurrency(payment.emi)}</td>
                <td>${formatCurrency(payment.principal)}</td>
                <td>${formatCurrency(payment.interest)}</td>
                <td>${formatCurrency(payment.balance)}</td>
            `;
            tableBody.appendChild(row);
        });
        
        // Show results section
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Form submission handler
    emiForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const loanAmount = parseFloat(document.getElementById('loanAmount').value.replace(/,/g, ''));
        const interestRate = parseFloat(document.getElementById('interestRate').value);
        const tenure = parseInt(document.getElementById('loanTenure').value);
        const downPayment = parseFloat(document.getElementById('downPayment').value.replace(/,/g, '')) || 0;
        
        // Validation
        if (!loanAmount || loanAmount < 10000) {
            if (typeof showNotification === 'function') {
                showNotification('Loan amount must be at least ₹10,000!', 'error');
            }
            return;
        }
        
        if (loanAmount > 1000000) {
            if (typeof showNotification === 'function') {
                showNotification('Loan amount cannot exceed ₹10,00,000!', 'error');
            }
            return;
        }
        
        if (!interestRate || interestRate < 1 || interestRate > 30) {
            if (typeof showNotification === 'function') {
                showNotification('Interest rate must be between 1% and 30%!', 'error');
            }
            return;
        }
        
        if (!tenure || tenure < 12 || tenure > 84) {
            if (typeof showNotification === 'function') {
                showNotification('Please select a valid loan tenure!', 'error');
            }
            return;
        }
        
        // Calculate principal (loan amount - down payment)
        const principal = loanAmount - downPayment;
        
        if (principal <= 0) {
            if (typeof showNotification === 'function') {
                showNotification('Down payment cannot be greater than loan amount!', 'error');
            }
            return;
        }
        
        if (principal < 10000) {
            if (typeof showNotification === 'function') {
                showNotification('Principal amount after down payment must be at least ₹10,000!', 'error');
            }
            return;
        }
        
        // Calculate EMI
        const emi = calculateEMI(principal, interestRate, tenure);
        const totalAmount = emi * tenure;
        const totalInterest = totalAmount - principal;
        
        // Generate payment schedule
        const schedule = generatePaymentSchedule(principal, interestRate, tenure, emi);
        
        // Create loan data object
        const loanData = {
            principal,
            rate: interestRate,
            tenure,
            emi,
            totalInterest,
            totalAmount,
            schedule
        };
        
        // Update results
        updateResults(loanData);
        
        // Show success notification
        if (typeof showNotification === 'function') {
            showNotification('EMI calculated successfully!', 'success');
        }
        
        console.log('EMI Calculation:', loanData);
    });

    // Reset form
    resetBtn.addEventListener('click', function() {
        emiForm.reset();
        resultsSection.style.display = 'none';
        
        if (typeof showNotification === 'function') {
            showNotification('Form reset successfully!', 'info');
        }
    });

    // Print functionality
    printBtn.addEventListener('click', function() {
        const printContent = generatePrintContent();
        const printWindow = window.open('', '_blank');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    });

    // Share functionality
    shareBtn.addEventListener('click', function() {
        const shareData = generateShareData();
        showShareModal(shareData);
    });

    // Generate print content
    function generatePrintContent() {
        const emi = document.getElementById('monthlyEMI').textContent;
        const totalInterest = document.getElementById('totalInterest').textContent;
        const totalAmount = document.getElementById('totalAmount').textContent;
        const principal = document.getElementById('principalAmount').textContent;
        const tenure = document.getElementById('loanTenureDisplay').textContent;
        const rate = document.getElementById('interestRateDisplay').textContent;
        
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <title>EMI Calculation Report - BikeLoo</title>
                <style>
                    body { font-family: 'Poppins', Arial, sans-serif; margin: 20px; color: #333; }
                    .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #ff3b30; padding-bottom: 20px; }
                    .header h1 { color: #ff3b30; margin: 0; }
                    .header p { color: #666; margin: 5px 0 0 0; }
                    .summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 30px 0; }
                    .summary-card { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; border-left: 4px solid #ff3b30; }
                    .summary-card h3 { margin: 0 0 10px 0; color: #ff3b30; font-size: 24px; }
                    .summary-card p { margin: 0; color: #666; font-weight: 500; }
                    .breakdown { margin: 30px 0; }
                    .breakdown h3 { color: #333; margin-bottom: 15px; }
                    .breakdown-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
                    .breakdown-item { display: flex; justify-content: space-between; padding: 10px; background: #f8f9fa; border-radius: 5px; }
                    .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
                    @media print { body { margin: 0; } }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>EMI Calculation Report</h1>
                    <p>Generated by BikeLoo EMI Calculator</p>
                    <p>Date: ${new Date().toLocaleDateString()}</p>
                </div>
                
                <div class="summary">
                    <div class="summary-card">
                        <h3>${emi}</h3>
                        <p>Monthly EMI</p>
                    </div>
                    <div class="summary-card">
                        <h3>${totalInterest}</h3>
                        <p>Total Interest</p>
                    </div>
                    <div class="summary-card">
                        <h3>${totalAmount}</h3>
                        <p>Total Amount</p>
                    </div>
                </div>
                
                <div class="breakdown">
                    <h3>Loan Details</h3>
                    <div class="breakdown-grid">
                        <div class="breakdown-item">
                            <span>Principal Amount</span>
                            <span>${principal}</span>
                        </div>
                        <div class="breakdown-item">
                            <span>Interest Amount</span>
                            <span>${totalInterest}</span>
                        </div>
                        <div class="breakdown-item">
                            <span>Loan Tenure</span>
                            <span>${tenure}</span>
                        </div>
                        <div class="breakdown-item">
                            <span>Interest Rate</span>
                            <span>${rate}</span>
                        </div>
                    </div>
                </div>
                
                <div class="footer">
                    <p>This calculation is for reference purposes only. Actual EMI may vary based on lender terms and conditions.</p>
                    <p>© 2025 BikeLoo. All rights reserved.</p>
                </div>
            </body>
            </html>
        `;
    }

    // Generate share data
    function generateShareData() {
        const emi = document.getElementById('monthlyEMI').textContent;
        const totalAmount = document.getElementById('totalAmount').textContent;
        const tenure = document.getElementById('loanTenureDisplay').textContent;
        
        return {
            title: 'My Bike Loan EMI Calculation',
            text: `Check out my bike loan EMI calculation: ${emi} per month for ${tenure}. Total amount: ${totalAmount}. Calculate yours at BikeLoo!`,
            url: window.location.href
        };
    }

    // Show share modal
    function showShareModal(shareData) {
        const modal = document.createElement('div');
        modal.className = 'share-modal';
        modal.innerHTML = `
            <div class="share-modal-content">
                <div class="share-modal-header">
                    <h3>Share EMI Calculation</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="share-options">
                    <button class="share-option" data-platform="whatsapp">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </button>
                    <button class="share-option" data-platform="facebook">
                        <i class="fab fa-facebook"></i> Facebook
                    </button>
                    <button class="share-option" data-platform="twitter">
                        <i class="fab fa-twitter"></i> Twitter
                    </button>
                    <button class="share-option" data-platform="email">
                        <i class="fas fa-envelope"></i> Email
                    </button>
                    <button class="share-option" data-platform="copy">
                        <i class="fas fa-copy"></i> Copy Link
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Handle share options
        modal.querySelectorAll('.share-option').forEach(option => {
            option.addEventListener('click', () => {
                const platform = option.dataset.platform;
                handleShare(platform, shareData);
                modal.remove();
            });
        });
    }

    // Handle different share platforms
    function handleShare(platform, shareData) {
        const { title, text, url } = shareData;
        
        switch (platform) {
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'email':
                window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`);
                break;
            case 'copy':
                navigator.clipboard.writeText(url).then(() => {
                    if (typeof showNotification === 'function') {
                        showNotification('Link copied to clipboard!', 'success');
                    }
                });
                break;
        }
    }

    // Input validation and formatting
    const loanAmountInput = document.getElementById('loanAmount');
    const loanAmountSlider = document.getElementById('loanAmountSlider');
    const interestRateInput = document.getElementById('interestRate');
    const downPaymentInput = document.getElementById('downPayment');
    
    // Sync slider with input
    if (loanAmountSlider) {
        loanAmountSlider.addEventListener('input', function() {
            loanAmountInput.value = this.value;
            loanAmountInput.dispatchEvent(new Event('input'));
        });
        
        loanAmountInput.addEventListener('input', function() {
            const value = parseFloat(this.value.replace(/,/g, '')) || 0;
            if (value >= 10000 && value <= 1000000) {
                loanAmountSlider.value = value;
            }
        });
    }

    // Add input formatting and validation
    [loanAmountInput, downPaymentInput].forEach(input => {
        input.addEventListener('input', function() {
            // Remove any non-numeric characters except decimal point
            let value = this.value.replace(/[^0-9.]/g, '');
            
            // Ensure only one decimal point
            const parts = value.split('.');
            if (parts.length > 2) {
                value = parts[0] + '.' + parts.slice(1).join('');
            }
            
            // Update the input value
            this.value = value;
            
            // Real-time validation for loan amount
            if (this.id === 'loanAmount') {
                const numValue = parseFloat(value) || 0;
                this.classList.remove('error', 'success');
                
                if (numValue > 1000000) {
                    this.classList.add('error');
                } else if (numValue >= 10000 && numValue <= 1000000) {
                    this.classList.add('success');
                }
            }
        });
        
        // Add blur event to format numbers
        input.addEventListener('blur', function() {
            const numValue = parseFloat(this.value);
            if (!isNaN(numValue) && numValue > 0) {
                this.value = numValue.toLocaleString('en-IN');
            }
        });
        
        // Add focus event to show raw number for editing
        input.addEventListener('focus', function() {
            const numValue = parseFloat(this.value.replace(/,/g, ''));
            if (!isNaN(numValue)) {
                this.value = numValue.toString();
            }
        });
    });

    // Real-time EMI preview (optional)
    function updateEMIPreview() {
        const loanAmount = parseFloat(loanAmountInput.value.replace(/,/g, '')) || 0;
        const interestRate = parseFloat(interestRateInput.value) || 0;
        const tenure = parseInt(document.getElementById('loanTenure').value) || 0;
        const downPayment = parseFloat(downPaymentInput.value.replace(/,/g, '')) || 0;
        
        if (loanAmount > 0 && interestRate > 0 && tenure > 0) {
            const principal = loanAmount - downPayment;
            if (principal > 0) {
                const emi = calculateEMI(principal, interestRate, tenure);
                // You can add a preview element here if needed
            }
        }
    }

    console.log('EMI Calculator - Initialized successfully!');
});
