// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create cherry blossom elements
    createCherryBlossoms();
    
    // Initialize Intersection Observer for scroll animations
    initScrollAnimations();
    
    // Set up owl mascot interaction
    setupOwlMascot();
});

// Create falling cherry blossoms
function createCherryBlossoms() {
    const heroSection = document.querySelector('#home');
    const blossomCount = 15;
    
    for (let i = 0; i < blossomCount; i++) {
        const blossom = document.createElement('div');
        blossom.className = 'cherry-blossom';
        
        // Random positioning and animation delay
        blossom.style.left = `${Math.random() * 100}%`;
        blossom.style.animationDelay = `${Math.random() * 5}s`;
        blossom.style.opacity = Math.random() * 0.5 + 0.3;
        blossom.style.width = `${Math.random() * 20 + 10}px`;
        blossom.style.height = blossom.style.width;
        
        heroSection.appendChild(blossom);
    }
}

// Initialize scroll animations
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Set up owl mascot interaction
function setupOwlMascot() {
    const owl = document.querySelector('.owl-mascot');
    if (owl) {
        owl.addEventListener('mouseenter', () => {
            owl.style.transform = 'scale(1.1)';
        });
        
        owl.addEventListener('mouseleave', () => {
            owl.style.transform = 'scale(1)';
        });
    }
}

// Initialize gallery lightbox
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s;
    `;
    
    const img = document.createElement('img');
    img.style.maxHeight = '80%';
    img.style.maxWidth = '80%';
    
    lightbox.appendChild(img);
    document.body.appendChild(lightbox);

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            lightbox.style.opacity = '1';
            lightbox.style.pointerEvents = 'auto';
            img.src = item.src;
            img.alt = item.alt;
        });
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target !== img) {
            lightbox.style.opacity = '0';
            lightbox.style.pointerEvents = 'none';
        }
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create cherry blossom elements
    createCherryBlossoms();
    
    // Initialize Intersection Observer for scroll animations
    initScrollAnimations();
    
    // Set up owl mascot interaction
    setupOwlMascot();
    
    // Initialize gallery lightbox
    initGalleryLightbox();
});
