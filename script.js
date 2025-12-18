// script.js - Frontend JavaScript for portfolio website

// Hide preloader when page loads
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(function() {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 500);
    }
});

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.name.value;
            const email = this.email.value;
            const message = this.message.value;
            
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, message })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    // Show success message
                    alert(data.message || 'Thank you for your message! I will get back to you soon.');
                    
                    // Reset form
                    this.reset();
                } else {
                    alert('Error: ' + (data.error || 'Failed to send message'));
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while sending your message. Please try again.');
            }
        });
    }

    // Project detail buttons
    const projectButtons = document.querySelectorAll('.project-btn');
    projectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const project = this.closest('.project');
            const projectName = project.querySelector('h3').textContent;
            alert(`Details for "${projectName}" would be shown here in a modal or dedicated page.`);
        });
    });

    // Load more projects button
    const loadMoreButton = document.querySelector('.portfolio-actions .btn');
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            alert('In a real implementation, this would load more projects from the server.');
        });
    }
});