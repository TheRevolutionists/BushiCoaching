// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');
const tabButtons = document.querySelectorAll('.tab-button');
const serviceTabs = document.querySelectorAll('.services-grid');
const testimonialSlider = document.querySelector('.testimonial-slider');
const testimonials = document.querySelectorAll('.testimonial');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const bookingForm = document.getElementById('coaching-form');
const gameSelect = document.getElementById('game');
const serviceSelect = document.getElementById('service');
const hoursGroup = document.getElementById('hours-group');
const replaysGroup = document.getElementById('replays-group');
const hoursSelect = document.getElementById('hours');
const replaysSelect = document.getElementById('replays');
const priceDisplay = document.getElementById('price-display');
const contactForm = document.getElementById('contact-form');
const loginModal = document.getElementById('login-modal');
const closeButton = document.querySelector('.close-button');
const loginForm = document.getElementById('login-form');

// Mobile Navigation
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Sticky Navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Service Tabs
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show the corresponding service grid
        const gameId = button.getAttribute('data-game');
        serviceTabs.forEach(tab => {
            tab.classList.add('hidden');
        });
        document.getElementById(`${gameId}-services`).classList.remove('hidden');
    });
});

// Testimonial Slider
let currentSlide = 0;

// Hide all testimonials initially except the first one
function setupTestimonials() {
    if (testimonials.length > 0) {
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
    }
}

// Show the next testimonial
function nextSlide() {
    if (testimonials.length > 1) {
        testimonials[currentSlide].style.display = 'none';
        currentSlide = (currentSlide + 1) % testimonials.length;
        testimonials[currentSlide].style.display = 'block';
    }
}

// Show the previous testimonial
function prevSlide() {
    if (testimonials.length > 1) {
        testimonials[currentSlide].style.display = 'none';
        currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
        testimonials[currentSlide].style.display = 'block';
    }
}

// Add event listeners to testimonial navigation buttons
if (prevButton && nextButton) {
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
}

// Automatic testimonial cycling
let slideInterval;

function startSlideTimer() {
    if (testimonials.length > 1) {
        slideInterval = setInterval(nextSlide, 5000);
    }
}

function stopSlideTimer() {
    clearInterval(slideInterval);
}

// Pause automatic cycling when hovering over testimonials
if (testimonialSlider) {
    testimonialSlider.addEventListener('mouseenter', stopSlideTimer);
    testimonialSlider.addEventListener('mouseleave', startSlideTimer);
}

// Booking Form
function updateBookingForm() {
    const serviceType = serviceSelect.value;
    
    // Hide both input groups initially
    hoursGroup.style.display = 'none';
    replaysGroup.style.display = 'none';
    
    // Show the appropriate input based on service type
    if (serviceType === 'coaching') {
        hoursGroup.style.display = 'block';
        updatePrice();
    } else if (serviceType === 'replay') {
        replaysGroup.style.display = 'block';
        updatePrice();
    } else if (serviceType === 'team') {
        priceDisplay.textContent = 'Custom Quote';
    } else {
        priceDisplay.textContent = '$0.00';
    }
}

function updatePrice() {
    let total = 0;
    const serviceType = serviceSelect.value;
    
    if (serviceType === 'coaching') {
        const hours = parseInt(hoursSelect.value);
        total = hours * 25;
    } else if (serviceType === 'replay') {
        const replays = parseInt(replaysSelect.value);
        total = replays * 10;
    }
    
    priceDisplay.textContent = `$${total.toFixed(2)}`;
}

// Add event listeners to form elements
if (serviceSelect) {
    serviceSelect.addEventListener('change', updateBookingForm);
}

if (hoursSelect) {
    hoursSelect.addEventListener('change', updatePrice);
}

if (replaysSelect) {
    replaysSelect.addEventListener('change', updatePrice);
}

// Initialize form on page load
function initializeBookingForm() {
    if (serviceSelect && hoursGroup && replaysGroup) {
        // Initially hide both input groups
        hoursGroup.style.display = 'none';
        replaysGroup.style.display = 'none';
    }
}

// Form submission
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Perform validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const discord = document.getElementById('discord').value;
        const game = document.getElementById('game').value;
        const service = document.getElementById('service').value;
        
        if (!name || !email || !discord || !game || !service) {
            alert('Please fill out all required fields.');
            return;
        }
        
        // If validation passes, scroll to payment section
        document.getElementById('payment-options').scrollIntoView({
            behavior: 'smooth'
        });
        
        // In a real implementation, you would submit the form data to your server
        console.log('Form submitted successfully!');
    });
}

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Perform validation
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const subject = document.getElementById('contact-subject').value;
        const message = document.getElementById('contact-message').value;
        
        if (!name || !email || !subject || !message) {
            alert('Please fill out all required fields.');
            return;
        }
        
        // In a real implementation, you would submit the form data to your server
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Modal functionality
function openModal() {
    if (loginModal) {
        loginModal.style.display = 'block';
    }
}

function closeModal() {
    if (loginModal) {
        loginModal.style.display = 'none';
    }
}

// Add event listener to close button
if (closeButton) {
    closeButton.addEventListener('click', closeModal);
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === loginModal) {
        closeModal();
    }
});

// Login form submission
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Perform validation
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        if (!email || !password) {
            alert('Please enter your email and password.');
            return;
        }
        
        // In a real implementation, you would submit the login data to your server
        alert('Login functionality not implemented in this demo.');
    });
}

// PayPal integration
function initPayPalButton() {
    if (typeof paypal !== 'undefined') {
        paypal.Buttons({
            style: {
                shape: 'rect',
                color: 'blue',
                layout: 'vertical',
                label: 'paypal',
            },
            
            createOrder: function(data, actions) {
                const serviceType = serviceSelect.value;
                let amount = 0;
                
                if (serviceType === 'coaching') {
                    const hours = parseInt(hoursSelect.value);
                    amount = hours * 25;
                } else if (serviceType === 'replay') {
                    const replays = parseInt(replaysSelect.value);
                    amount = replays * 10;
                }
                
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            currency_code: 'USD',
                            value: amount.toString()
                        }
                    }]
                });
            },
            
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    alert('Transaction completed by ' + details.payer.name.given_name);
                    
                    // In a real implementation, you would send the order details to your server
                    // and redirect the user to a confirmation page
                    bookingForm.reset();
                });
            },
            
            onError: function(err) {
                console.error('PayPal error:', err);
                alert('There was an error processing your payment. Please try again.');
            }
        }).render('#paypal-button-container');
    } else {
        // If PayPal is not loaded yet, try again in a moment
        setTimeout(initPayPalButton, 500);
    }
}

// Load PayPal SDK
function loadPayPalScript() {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=USD';
    script.async = true;
    script.onload = initPayPalButton;
    document.body.appendChild(script);
}

// Initialize everything when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeBookingForm();
    setupTestimonials();
    startSlideTimer();
    updateBookingForm();
    loadPayPalScript();
});
