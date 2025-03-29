// Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registration-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm()) {
                // Form is valid - show success
                showSuccess();
            }
        });
    }
});

function validateForm() {
    let isValid = true;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const schoolInput = document.getElementById('school');
    const competitionSelect = document.getElementById('competition');

    // Reset error states
    document.querySelectorAll('.error').forEach(el => el.textContent = '');

    // Name validation
    if (!nameInput.value.trim()) {
        document.getElementById('name-error').textContent = 'Please enter your name';
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email';
        isValid = false;
    }

    // School validation
    if (!schoolInput.value.trim()) {
        document.getElementById('school-error').textContent = 'Please enter your school';
        isValid = false;
    }

    // Competition validation
    if (!competitionSelect.value) {
        document.getElementById('competition-error').textContent = 'Please select a competition';
        isValid = false;
    }

    return isValid;
}

function showSuccess() {
    // Show confetti animation
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold">Registration Successful!</strong>
            <span class="block sm:inline">We'll contact you with more details soon.</span>
        </div>
    `;
    
    const form = document.getElementById('registration-form');
    form.parentNode.insertBefore(successMessage, form.nextSibling);
    
    // Reset form
    form.reset();
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}