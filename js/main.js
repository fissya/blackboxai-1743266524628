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
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-labelledby', 'lightbox-title');
    lightbox.classList.add('hide');
    
    // Lightbox content container
    const content = document.createElement('div');
    content.className = 'lightbox-content';
    
    // Image element with loading state
    const img = document.createElement('img');
    img.className = 'lightbox-image';
    img.setAttribute('alt', '');
    
    // Loading spinner
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.setAttribute('aria-hidden', 'true');
    
    // Navigation controls
    const closeButton = document.createElement('button');
    closeButton.className = 'lightbox-close';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Close lightbox');
    
    const prevButton = document.createElement('button');
    prevButton.className = 'lightbox-nav prev';
    prevButton.innerHTML = '&larr;';
    prevButton.setAttribute('aria-label', 'Previous image');
    
    const nextButton = document.createElement('button');
    nextButton.className = 'lightbox-nav next';
    nextButton.innerHTML = '&rarr;';
    nextButton.setAttribute('aria-label', 'Next image');
    
    // Image counter
    const counter = document.createElement('div');
    counter.className = 'lightbox-counter';
    
    // Build lightbox structure
    content.appendChild(img);
    content.appendChild(spinner);
    content.appendChild(counter);
    lightbox.appendChild(content);
    lightbox.appendChild(closeButton);
    lightbox.appendChild(prevButton);
    lightbox.appendChild(nextButton);
    document.body.appendChild(lightbox);
    
    let currentIndex = 0;
    let isAnimating = false;
    
    // Preload adjacent images
    function preloadAdjacentImages(index) {
        const prevIndex = (index > 0) ? index - 1 : galleryItems.length - 1;
        const nextIndex = (index < galleryItems.length - 1) ? index + 1 : 0;
        
        [prevIndex, nextIndex].forEach(i => {
            const img = new Image();
            img.src = galleryItems[i].src;
        });
    }
    
    // Show loading state
    function showLoading() {
        spinner.style.display = 'block';
        img.style.opacity = '0';
    }
    
    // Hide loading state
    function hideLoading() {
        spinner.style.display = 'none';
        img.style.opacity = '1';
    }
    
    // Update image counter
    function updateCounter() {
        counter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
    }
    
    // Load image with transition
    function loadImage(index) {
        if (isAnimating) return;
        isAnimating = true;
        
        showLoading();
        preloadAdjacentImages(index);
        
        img.src = galleryItems[index].src;
        img.alt = galleryItems[index].alt;
        
        img.onload = () => {
            hideLoading();
            updateCounter();
            isAnimating = false;
        };
        
        img.onerror = () => {
            hideLoading();
            isAnimating = false;
        };
    }
    
    // Show lightbox with animation
    function showLightbox() {
        lightbox.classList.remove('hide');
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
        closeButton.focus();
    }
    
    // Hide lightbox with animation
    function hideLightbox() {
        lightbox.classList.remove('show');
        lightbox.classList.add('hide');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            lightbox.classList.remove('hide');
        }, 300);
    }
    
    // Navigation functions
    function showPrev() {
        if (isAnimating) return;
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : galleryItems.length - 1;
        loadImage(currentIndex);
    }
    
    function showNext() {
        if (isAnimating) return;
        currentIndex = (currentIndex < galleryItems.length - 1) ? currentIndex + 1 : 0;
        loadImage(currentIndex);
    }
    
    // Event listeners
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            loadImage(currentIndex);
            showLightbox();
        });
    });
    
    closeButton.addEventListener('click', hideLightbox);
    prevButton.addEventListener('click', showPrev);
    nextButton.addEventListener('click', showNext);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            hideLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('show')) return;
        
        switch (e.key) {
            case 'Escape':
                hideLightbox();
                break;
            case 'ArrowLeft':
                showPrev();
                break;
            case 'ArrowRight':
                showNext();
                break;
        }
    });
    
    // Focus trapping
    lightbox.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            const focusableElements = [closeButton, prevButton, nextButton];
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    });
}

// Initialize lazy loading for gallery
function initGalleryLazyLoad() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const loadMargin = 200; // px from viewport to start loading
  
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const item = entry.target;
          const img = item.querySelector('.gallery-image');
          const spinner = item.querySelector('.gallery-spinner');
          const placeholder = item.querySelector('.skeleton-placeholder');
          
          // Only load if not already loaded
          if (!img.dataset.loaded) {
            loadImage(img, spinner, placeholder);
          }
          observer.unobserve(item);
        }
      });
    }, {
      rootMargin: `${loadMargin}px`,
      threshold: 0.01
    });
  
    // Observe all gallery items
    galleryItems.forEach(item => {
      observer.observe(item);
    });
  }
  
  // Load individual image with transition
  function loadImage(imgElement, spinnerElement, placeholderElement) {
    const src = imgElement.dataset.src;
    if (!src) return;
  
    // Show loading spinner
    spinnerElement.classList.add('active');
    
    // Create new image to preload
    const tempImg = new Image();
    tempImg.src = src;
    
    tempImg.onload = () => {
      // Set the actual image source
      imgElement.src = src;
      
      // Mark as loaded and trigger transitions
      setTimeout(() => {
        imgElement.classList.add('loaded');
        spinnerElement.classList.remove('active');
        
        // Remove placeholder after transition
        setTimeout(() => {
          placeholderElement.style.opacity = '0';
          setTimeout(() => {
            placeholderElement.remove();
          }, 300);
        }, 200);
      }, 200); // 200ms delay for smoother perception
    };
  
    tempImg.onerror = () => {
      spinnerElement.classList.remove('active');
      // Handle error state if needed
    };
  
    // Mark as loaded to prevent duplicate loading
    imgElement.dataset.loaded = 'true';
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

    initGalleryLazyLoad();
});
