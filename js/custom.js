/**
 * Axis Tours & Travel Custom JavaScript
 * 
 * @package Axis_Tours
 * @author Alex Etidit
 */

jQuery(document).ready(function($) {
    'use strict';

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth Scrolling for Anchor Links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });

    // Fade In Animation for Elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('.section, .card, .destination-card, .testimonial, .blog-card').forEach(el => {
        observer.observe(el);
    });

    // Form Validation for Booking Form
    $('.booking-form form').on('submit', function(e) {
        const requiredFields = $(this).find('[required]');
        let isValid = true;
        
        requiredFields.each(function() {
            if (!$(this).val().trim()) {
                isValid = false;
                $(this).css('border-color', '#dc3545');
            } else {
                $(this).css('border-color', '#e9ecef');
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            alert('Please fill in all required fields.');
        }
    });

    // Package Selection Functionality
    $('.card').on('click', function() {
        $('.card').removeClass('active');
        $(this).addClass('active');
    });

    // Contact Form AJAX Submission
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        
        const form = $(this);
        const submitBtn = form.find('button[type="submit"]');
        const originalText = submitBtn.text();
        
        // Show loading state
        submitBtn.text('Sending...').prop('disabled', true);
        
        $.ajax({
            url: axis_tours_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'contact_form',
                nonce: axis_tours_ajax.nonce,
                name: form.find('input[name="name"]').val(),
                email: form.find('input[name="email"]').val(),
                message: form.find('textarea[name="message"]').val()
            },
            success: function(response) {
                if (response === 'success') {
                    form.html('<div class="success-message"><h3>Thank you!</h3><p>Your message has been sent successfully. We\'ll get back to you soon.</p></div>');
                } else {
                    alert('There was an error sending your message. Please try again.');
                }
            },
            error: function() {
                alert('There was an error sending your message. Please try again.');
            },
            complete: function() {
                submitBtn.text(originalText).prop('disabled', false);
            }
        });
    });

    // Image Gallery Lightbox (if using)
    if (typeof $.fn.magnificPopup !== 'undefined') {
        $('.gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }

    // Sticky Header
    let lastScrollTop = 0;
    $(window).scroll(function() {
        const scrollTop = $(this).scrollTop();
        const header = $('.header');
        
        if (scrollTop > 100) {
            header.addClass('sticky');
        } else {
            header.removeClass('sticky');
        }
        
        lastScrollTop = scrollTop;
    });

    // Back to Top Button
    const backToTop = $('<button class="back-to-top"><i class="fas fa-chevron-up"></i></button>');
    $('body').append(backToTop);
    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            backToTop.addClass('show');
        } else {
            backToTop.removeClass('show');
        }
    });
    
    backToTop.on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });

    // Testimonial Slider (if multiple testimonials)
    if ($('.testimonial').length > 1) {
        $('.testimonials-container').slick({
            dots: true,
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: false
        });
    }

    // Destination Filter
    $('.destination-filter button').on('click', function() {
        const filter = $(this).data('filter');
        
        $('.destination-filter button').removeClass('active');
        $(this).addClass('active');
        
        if (filter === 'all') {
            $('.destination-card').show();
        } else {
            $('.destination-card').hide();
            $('.destination-card[data-category="' + filter + '"]').show();
        }
    });

    // Booking Form Date Picker Enhancement
    $('input[type="date"]').on('change', function() {
        const selectedDate = new Date($(this).val());
        const today = new Date();
        
        if (selectedDate < today) {
            alert('Please select a future date.');
            $(this).val('');
        }
    });

    // Number Counter Animation
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.text(Math.floor(current));
        }, 20);
    }

    // Trigger counter animation when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $('.stat-number').each(function() {
                    const target = parseInt($(this).text().replace(/\D/g, ''));
                    animateCounter($(this), target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    });

    $('.stats').each(function() {
        statsObserver.observe(this);
    });

    // Search Functionality Enhancement
    $('.search-form input[type="search"]').on('input', function() {
        const query = $(this).val();
        if (query.length > 2) {
            // You can add live search functionality here
            // For now, we'll just show a loading indicator
            $(this).addClass('searching');
        } else {
            $(this).removeClass('searching');
        }
    });

    // Lazy Loading for Images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Mobile Menu Close on Outside Click
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.nav-container, .hamburger').length) {
            $('.hamburger').removeClass('active');
            $('#nav-menu').removeClass('active');
        }
    });

    // Keyboard Navigation for Mobile Menu
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            $('.hamburger').removeClass('active');
            $('#nav-menu').removeClass('active');
        }
    });

    // Preloader (if needed)
    $(window).on('load', function() {
        $('.preloader').fadeOut('slow');
    });

    // Console Log for Theme Info
    console.log('Axis Tours & Travel Theme v1.0.0 by Alex Etidit');
});
