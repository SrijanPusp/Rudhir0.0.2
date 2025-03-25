// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 1000);
    }
    
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Scroll animations
    const sections = document.querySelectorAll('.section');
    const header = document.querySelector('header');
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        // Check scroll direction for header
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (header) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.classList.add('scroll-down');
                header.classList.remove('scroll-up');
            } else {
                header.classList.remove('scroll-down');
                header.classList.add('scroll-up');
            }
        }
        
        lastScrollTop = scrollTop;
        
        // Animate sections on scroll
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.8) {
                section.classList.add('visible');
            }
        });
        
        // Show/hide scroll to top button
        if (scrollTopBtn) {
            if (scrollTop > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
    });
    
    // Scroll to top
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Helper function to show toast notification
    function showToast(message, type = 'info') {
        // Create toast element if it doesn't exist
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        
        // Set content and type
        toast.textContent = message;
        toast.className = `toast ${type}`;
        
        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // Helper function for element animation
    function animateElement(element) {
        element.classList.add('animate');
        setTimeout(() => {
            element.classList.remove('animate');
        }, 500);
    }
    
    // ----- SEARCH FUNCTIONALITY -----
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const bloodGroup = document.getElementById('blood-group').value;
            const location = document.getElementById('location').value;
            
            if (!bloodGroup || !location) {
                showToast('Please select a blood group and enter your location', 'error');
                // Animate form fields that are empty
                if (!bloodGroup) {
                    const bloodGroupSelect = document.getElementById('blood-group');
                    bloodGroupSelect.style.borderColor = 'var(--primary)';
                    setTimeout(() => {
                        bloodGroupSelect.style.borderColor = '';
                    }, 1000);
                }
                if (!location) {
                    const locationInput = document.getElementById('location');
                    locationInput.style.borderColor = 'var(--primary)';
                    setTimeout(() => {
                        locationInput.style.borderColor = '';
                    }, 1000);
                }
                return;
            }
            
            // Add loading animation to button
            searchBtn.classList.add('loading');
            searchBtn.innerHTML = '<span>Searching...</span>';
            
            // Simulate search delay
            setTimeout(() => {
                searchBtn.classList.remove('loading');
                searchBtn.innerHTML = 'Search';
                showToast(`Found ${bloodGroup} blood donors in ${location}!`, 'success');
            }, 1500);
        });
    }
    
    // ----- USE CURRENT LOCATION -----
    const locationBtn = document.getElementById('use-location');
    if (locationBtn) {
        locationBtn.addEventListener('click', function() {
            // Add animation to the button
            locationBtn.classList.add('pulse');
            
            if (navigator.geolocation) {
                showToast('Getting your location...', 'info');
                
                navigator.geolocation.getCurrentPosition(
                    position => {
                        // Success: show location found animation
                        locationBtn.classList.remove('pulse');
                        locationBtn.innerHTML = '<i class="fas fa-check"></i>';
                        setTimeout(() => {
                            locationBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i>';
                        }, 1500);
                        
                        document.getElementById('location').value = 'Using current location';
                        showToast('Location found!', 'success');
                    },
                    error => {
                        // Error: show error animation
                        locationBtn.classList.remove('pulse');
                        locationBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
                        setTimeout(() => {
                            locationBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i>';
                        }, 1500);
                        
                        showToast('Error accessing location: ' + error.message, 'error');
                    }
                );
            } else {
                locationBtn.classList.remove('pulse');
                showToast('Geolocation is not supported by this browser.', 'error');
            }
        });
    }
    
    // ----- REGISTER AS DONOR -----
    const donorBtn = document.getElementById('donor-btn');
    if (donorBtn) {
        donorBtn.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            donorBtn.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 300);
            
            // Show modal instead of alert
            showModal('Donor Registration', 'To register as a donor, please sign up or log in first.', [
                {
                    text: 'Sign Up',
                    class: 'btn btn-primary',
                    callback: () => {
                        closeModal();
                        showToast('Opening sign up form...', 'info');
                    }
                },
                {
                    text: 'Cancel',
                    class: 'btn btn-outline',
                    callback: closeModal
                }
            ]);
        });
    }
    
    // ----- LOGIN/SIGNUP -----
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add scale animation
            loginBtn.classList.add('scale');
            setTimeout(() => {
                loginBtn.classList.remove('scale');
            }, 300);
            
            showToast('Opening login form...', 'info');
            
            // Here you would typically open a modal with login form
            // For demo purposes, we'll simulate a successful login after delay
            setTimeout(() => {
                showToast('Login successful!', 'success');
            }, 2000);
        });
    }
    
    if (signupBtn) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add scale animation
            signupBtn.classList.add('scale');
            setTimeout(() => {
                signupBtn.classList.remove('scale');
            }, 300);
            
            showToast('Opening sign up form...', 'info');
            
            // Here you would typically open a modal with signup form
            // For demo purposes, we'll simulate a successful registration after delay
            setTimeout(() => {
                showToast('Registration successful! Welcome to BloodDonor.', 'success');
            }, 2000);
        });
    }
    
    // ----- MODAL FUNCTIONALITY -----
    // Create modal container if it doesn't exist
    if (!document.querySelector('.modal-container')) {
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';
        document.body.appendChild(modalContainer);
    }
    
    // Function to show modal
    function showModal(title, content, buttons = []) {
        const modalContainer = document.querySelector('.modal-container');
        
        // Create modal HTML
        modalContainer.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-content">
                    ${content}
                </div>
                <div class="modal-footer">
                    <!-- Buttons will be added here -->
                </div>
            </div>
        `;
        
        // Add buttons
        const modalFooter = modalContainer.querySelector('.modal-footer');
        buttons.forEach(button => {
            const btn = document.createElement('button');
            btn.textContent = button.text;
            btn.className = button.class || 'btn';
            btn.addEventListener('click', button.callback);
            modalFooter.appendChild(btn);
        });
        
        // Show modal with animation
        modalContainer.style.display = 'flex';
        setTimeout(() => {
            modalContainer.classList.add('active');
            modalContainer.querySelector('.modal').classList.add('active');
        }, 10);
        
        // Close button event
        modalContainer.querySelector('.modal-close').addEventListener('click', closeModal);
        
        // Close on click outside
        modalContainer.addEventListener('click', function(e) {
            if (e.target === modalContainer) {
                closeModal();
            }
        });
    }
    
    // Function to close modal
    function closeModal() {
        const modalContainer = document.querySelector('.modal-container');
        const modal = modalContainer.querySelector('.modal');
        
        modalContainer.classList.remove('active');
        modal.classList.remove('active');
        
        setTimeout(() => {
            modalContainer.style.display = 'none';
        }, 300);
    }
    
    // ----- BLOOD CARDS ANIMATION -----
    const bloodCards = document.querySelectorAll('.blood-card');
    bloodCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // ----- FAQ ACCORDION -----
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle active class
            item.classList.toggle('active');
            
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
    
    // Initialize AOS (Animate on Scroll) if you added the library
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease',
            once: true
        });
    }
});

// Add CSS for new JavaScript elements
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .modal-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .modal-container.active {
            opacity: 1;
        }
        
        .modal {
            background-color: white;
            border-radius: 8px;
            width: 90%;
            max-width: 500px;
            transform: translateY(20px);
            transition: transform 0.3s ease;
            overflow: hidden;
        }
        
        .modal.active {
            transform: translateY(0);
        }
        
        .modal-header {
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #eee;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #999;
            transition: color 0.3s ease;
        }
        
        .modal-close:hover {
            color: var(--primary);
        }
        
        .modal-content {
            padding: 20px;
        }
        
        .modal-footer {
            padding: 15px 20px;
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            border-top: 1px solid #eee;
        }
        
        /* Button animations */
        .pulse {
            animation: pulse 1.5s infinite;
        }
        
        .scale {
            animation: scale 0.3s ease;
        }
        
        @keyframes scale {
            0% { transform: scale(1); }
            50% { transform: scale(0.95); }
            100% { transform: scale(1); }
        }
        
        .ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(2.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});