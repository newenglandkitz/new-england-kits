// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const bars = navToggle.querySelectorAll('.bar');
    bars.forEach(bar => bar.classList.toggle('active'));
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Add to Cart functionality
let cart = [];

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
        const jerseyItem = this.closest('.jersey-item');
        const jerseyName = jerseyItem.querySelector('h3').textContent;
        const jerseyPrice = jerseyItem.querySelector('.jersey-price').textContent;
        const jerseyImage = jerseyItem.querySelector('img').src;
        
        addToCart(jerseyName, jerseyPrice, jerseyImage);
        
        // Visual feedback
        this.textContent = 'Added!';
        this.style.background = '#10b981';
        
        setTimeout(() => {
            this.textContent = 'Add to Cart';
            this.style.background = '#2563eb';
        }, 2000);
    });
});

function addToCart(name, price, image) {
    const item = {
        name: name,
        price: price,
        image: image,
        quantity: 1
    };
    
    // Check if item already exists in cart
    const existingItem = cart.find(cartItem => cartItem.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(item);
    }
    
    updateCartDisplay();
    showNotification(`${name} added to cart!`);
}

function updateCartDisplay() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    console.log(`Cart updated: ${cartCount} items`);
    // You can add a cart icon with count display here
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Quick View functionality
document.querySelectorAll('.quick-view-btn').forEach(button => {
    button.addEventListener('click', function() {
        const jerseyItem = this.closest('.jersey-item');
        const jerseyName = jerseyItem.querySelector('h3').textContent;
        const jerseyTeam = jerseyItem.querySelector('.jersey-team').textContent;
        const jerseyPrice = jerseyItem.querySelector('.jersey-price').textContent;
        const jerseyImage = jerseyItem.querySelector('img').src;
        
        showQuickView(jerseyName, jerseyTeam, jerseyPrice, jerseyImage);
    });
});

function showQuickView(name, team, price, image) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        border-radius: 15px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        text-align: center;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    modalContent.innerHTML = `
        <img src="${image}" alt="${name}" style="width: 100%; max-width: 300px; border-radius: 10px; margin-bottom: 1rem;">
        <h2 style="color: #1e293b; margin-bottom: 0.5rem;">${name}</h2>
        <p style="color: #64748b; margin-bottom: 0.5rem;">${team}</p>
        <p style="font-size: 1.5rem; font-weight: 700; color: #2563eb; margin-bottom: 1.5rem;">${price}</p>
        <button class="modal-add-to-cart" style="background: #2563eb; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; margin-right: 1rem;">Add to Cart</button>
        <button class="modal-close" style="background: #64748b; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer;">Close</button>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 100);
    
    // Close modal functionality
    const closeBtn = modalContent.querySelector('.modal-close');
    const addToCartBtn = modalContent.querySelector('.modal-add-to-cart');
    
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    addToCartBtn.addEventListener('click', () => {
        addToCart(name, price, image);
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBtn.click();
        }
    });
}

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simulate form submission
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Message sent successfully!');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        // Simulate subscription
        const submitBtn = this.querySelector('button');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Successfully subscribed to newsletter!');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Intersection Observer for animations
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

// Load Jerseys from CSV
async function loadJerseysFromCSV() {
    try {
        console.log('Loading jerseys from CSV...');
        // Add cache-busting parameter to force fresh load
        const response = await fetch(`jerseys.csv?t=${Date.now()}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        console.log('CSV loaded:', csvText.substring(0, 200) + '...');
        const jerseys = parseCSV(csvText);
        console.log('Parsed jerseys:', jerseys.length, 'items');
        displayJerseys(jerseys);
    } catch (error) {
        console.error('Error loading jerseys:', error);
        // Fallback to static content if CSV fails to load
        displayFallbackJerseys();
    }
}

// Parse CSV text into array of objects
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const jerseys = [];
    
    console.log('=== CSV PARSING DEBUG ===');
    console.log('Headers:', headers);
    console.log('Total lines in CSV:', lines.length);
    console.log('Raw CSV content:', csvText);
    console.log('First line (headers):', lines[0]);
    console.log('Second line (first data):', lines[1]);
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) {
            console.log(`Skipping empty line ${i}`);
            continue; // Skip empty lines
        }
        
        console.log(`\n--- Processing line ${i} ---`);
        console.log(`Raw line: "${line}"`);
        
        // Simple split by comma for now, handle edge cases
        const values = line.split(',').map(v => v.trim());
        console.log(`Split values:`, values);
        console.log(`Values length:`, values.length);
        console.log(`Headers length:`, headers.length);
        
        const jersey = {};
        headers.forEach((header, index) => {
            const value = values[index] ? values[index].replace(/"/g, '') : '';
            jersey[header] = value;
            console.log(`Setting ${header} = "${value}"`);
        });
        
        console.log('Final jersey object:', jersey);
        
        // Check status with more detailed logging
        const statusValue = jersey.status;
        const isAvailable = statusValue === 'Available';
        
        console.log(`\n--- Status Check ---`);
        console.log(`Status value: "${statusValue}"`);
        console.log(`Status value type: ${typeof statusValue}`);
        console.log(`Status value length: ${statusValue ? statusValue.length : 0}`);
        console.log(`Status value char codes: ${statusValue ? statusValue.split('').map(c => c.charCodeAt(0)) : 'undefined'}`);
        console.log(`Is available: ${isAvailable}`);
        console.log(`Comparison: "${statusValue}" === "Available" = ${statusValue === 'Available'}`);
        
        // Check why jersey might be filtered out
        if (!jersey.name) {
            console.log(`❌ Jersey filtered out - missing name`);
        }
        if (!jersey.image) {
            console.log(`❌ Jersey "${jersey.name}" filtered out - missing image`);
        }
        
        // Only add if has required fields (include all regardless of status)
        if (jersey.name && jersey.image) {
            jerseys.push(jersey);
            console.log(`✅ Added jersey: ${jersey.name} (status: ${statusValue})`);
        } else {
            console.log(`❌ Filtered out jersey: ${jersey.name} (name: ${!!jersey.name}, image: ${!!jersey.image})`);
        }
    }
    
    console.log('\n=== FINAL RESULTS ===');
    console.log('Total jerseys parsed:', jerseys.length);
    console.log('All parsed jerseys:', jerseys);
    return jerseys;
}

// Display jerseys in the grid
function displayJerseys(jerseys) {
    const jerseyGrid = document.getElementById('jersey-grid');
    if (!jerseyGrid) {
        console.error('Jersey grid element not found!');
        return;
    }
    
    console.log('Displaying', jerseys.length, 'jerseys in grid');
    jerseyGrid.innerHTML = '';
    
    if (jerseys.length === 0) {
        console.warn('No jerseys to display, using fallback');
        displayFallbackJerseys();
        return;
    }
    
    jerseys.forEach((jersey, index) => {
        console.log(`Creating jersey item ${index + 1}:`, jersey.name);
        const jerseyItem = createJerseyItem(jersey);
        jerseyGrid.appendChild(jerseyItem);
    });
    
    console.log('Jersey grid now contains', jerseyGrid.children.length, 'items');
    
    // Reinitialize event listeners for new elements
    initializeJerseyEventListeners();
}

// Debug function to show all jerseys regardless of available flag
function displayAllJerseysFromCSV() {
    console.log('DEBUG: Loading ALL jerseys regardless of available flag');
    fetch(`jerseys.csv?t=${Date.now()}`)
        .then(response => response.text())
        .then(csvText => {
            const lines = csvText.trim().split('\n');
            const headers = lines[0].split(',').map(h => h.trim());
            const allJerseys = [];
            
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) continue;
                
                const values = line.split(',').map(v => v.trim());
                const jersey = {};
                headers.forEach((header, index) => {
                    jersey[header] = values[index] ? values[index].replace(/"/g, '') : '';
                });
                
                // Include all jerseys regardless of status
                if (jersey.name && jersey.image) {
                    allJerseys.push(jersey);
                    console.log(`DEBUG: Added jersey "${jersey.name}" (status: ${jersey.status})`);
                }
            }
            
            console.log('DEBUG: Found', allJerseys.length, 'total jerseys');
            displayJerseys(allJerseys);
        })
        .catch(error => {
            console.error('DEBUG: Error loading all jerseys:', error);
        });
}

// Manual refresh function
function refreshJerseys() {
    console.log('Manual refresh triggered');
    loadJerseysFromCSV();
}

// Create a single jersey item element
function createJerseyItem(jersey) {
    const jerseyItem = document.createElement('div');
    jerseyItem.className = 'jersey-item';
    
    // Add status indicator
    const isAvailable = jersey.status === 'Available';
    const availabilityClass = isAvailable ? 'available' : 'unavailable';
    
    console.log(`Jersey: ${jersey.name}, Status: "${jersey.status}", IsAvailable: ${isAvailable}, Class: ${availabilityClass}`);
    
    // Apply the availability class to the jersey item
    jerseyItem.classList.add(availabilityClass);
    
    jerseyItem.innerHTML = `
        <div class="jersey-image">
            <img src="${jersey.image}" alt="${jersey.name}" onerror="this.src='https://via.placeholder.com/300x400/cccccc/666666?text=Image+Not+Found'">
            <div class="jersey-overlay">
                <button class="quick-view-btn">Quick View</button>
            </div>
        </div>
        <div class="jersey-info">
            <h3>${jersey.name}</h3>
            <p class="jersey-team">${jersey.team}</p>
            <p class="jersey-price">$${jersey.price}</p>
        </div>
    `;
    
    // Add visual styling for unavailable items
    if (jersey.available !== 'true') {
        jerseyItem.style.opacity = '0.6';
        jerseyItem.style.filter = 'grayscale(50%)';
    }
    
    return jerseyItem;
}

// Fallback jerseys if CSV fails to load
function displayFallbackJerseys() {
    console.log('Using fallback jerseys');
    const fallbackJerseys = [
        {
            image: './img/IMG_7440.JPG',
            name: 'Arsenal 25/26 Home Player Version',
            team: 'Arsenal FC',
            price: '40'
        },
        {
            image: 'img/IMG_7441.jpg',
            name: 'PSG 25/26 Home Player Version',
            team: 'PSG',
            price: '40'
        },
        {
            image: 'img/IMG-4808.jpeg',
            name: 'Barcelona Pink Special Edition',
            team: 'Barcelona',
            price: '45'
        },
        {
            image: 'img/Bellingham.avif',
            name: 'Real Madrid Away Bellingham',
            team: 'Real Madrid',
            price: '50'
        },
        {
            image: 'img/Real home.webp',
            name: 'Real 25/26 Madrid Home Player Version',
            team: 'Real Madrid CF',
            price: '40'
        },
        {
            image: 'Img/Real Madrid.jpg',
            name: 'Real Madrid 25/26 Away Player Version',
            team: 'Real Madrid CF',
            price: '40'
        },
        {
            image: 'Img/Roronoa Zoro.jpeg',
            name: 'Japan Roronoa Zoro',
            team: 'Japan',
            price: '45'
        },
        {
            image: 'Img/Liverpool_FC_25-26_Home_Jersey_Red_JV6423_01_laydown.webp',
            name: 'Liverpool 25/26 Home',
            team: 'Liverpool FC',
            price: '40'
        },
        {
            image: 'Img/arsenal 3rd.webp',
            name: 'Arsenal 3rd Kit',
            team: 'Arsenal FC',
            price: '40'
        },
        {
            image: 'Img/Chelsea Home.jpg',
            name: 'Chelsea Home 25/26 Player Version',
            team: 'Chelsea FC',
            price: '40'
        },
        {
            image: 'Img/barcelona-x-travis-scott-cactus-jack-jersey.webp',
            name: 'Travis Scott Barcelona Home Special Edition',
            team: 'Barcelona FC',
            price: '45'
        },
        {
            image: 'Img/Travis-Scott-x-Nike-x-FC-Barcelona-Retro-2000-01-Home-Skeleton-Jersey-Multicolor.avif',
            name: 'Travis Scott Barcelona Skeleton Special Edition',
            team: 'FC Barcelona',
            price: '45'
        }
    ];
    
    displayJerseys(fallbackJerseys);
}

// Initialize event listeners for jersey items
function initializeJerseyEventListeners() {
    // Add to cart functionality
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const jerseyItem = this.closest('.jersey-item');
            const jerseyName = jerseyItem.querySelector('h3').textContent;
            const jerseyPrice = jerseyItem.querySelector('.jersey-price').textContent;
            const jerseyImage = jerseyItem.querySelector('img').src;
            
            addToCart(jerseyName, jerseyPrice, jerseyImage);
            
            // Visual feedback
            this.textContent = 'Added!';
            this.style.background = '#10b981';
            
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.background = 'var(--secondary-red)';
            }, 2000);
        });
    });

    // Quick view functionality
    document.querySelectorAll('.quick-view-btn').forEach(button => {
        button.addEventListener('click', function() {
            const jerseyItem = this.closest('.jersey-item');
            const jerseyName = jerseyItem.querySelector('h3').textContent;
            const jerseyTeam = jerseyItem.querySelector('.jersey-team').textContent;
            const jerseyPrice = jerseyItem.querySelector('.jersey-price').textContent;
            const jerseyImage = jerseyItem.querySelector('img').src;
            
            showQuickView(jerseyName, jerseyTeam, jerseyPrice, jerseyImage);
        });
    });
}

// Load jerseys when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing jersey grid...');
    
    // Small delay to ensure everything is ready
    setTimeout(() => {
        loadJerseysFromCSV();
    }, 100);
    
    // Also initialize existing elements for animation
    const animateElements = document.querySelectorAll('.category-card, .about-content, .contact-content');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Test function to check CSV parsing
function testCSVParsing() {
    console.log('=== CSV PARSING TEST ===');
    fetch(`jerseys.csv?t=${Date.now()}`)
        .then(response => response.text())
        .then(csvText => {
            console.log('Raw CSV:', csvText);
            
            const lines = csvText.trim().split('\n');
            console.log('Lines:', lines);
            
            const headers = lines[0].split(',').map(h => h.trim());
            console.log('Headers:', headers);
            
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) continue;
                
                const values = line.split(',').map(v => v.trim());
                console.log(`Line ${i} values:`, values);
                
                const jersey = {};
                headers.forEach((header, index) => {
                    jersey[header] = values[index] ? values[index].replace(/"/g, '') : '';
                });
                
                console.log(`Jersey ${i}:`, jersey);
                console.log(`Available value: "${jersey.available}" (length: ${jersey.available.length})`);
                console.log(`Available === 'true': ${jersey.available === 'true'}`);
                console.log('---');
            }
        })
        .catch(error => {
            console.error('Test error:', error);
        });
}

// Simple test to check CSV content
function testCSVContent() {
    console.log('=== SIMPLE CSV CONTENT TEST ===');
    fetch(`jerseys.csv?t=${Date.now()}`)
        .then(response => response.text())
        .then(csvText => {
            console.log('Raw CSV content:');
            console.log('---START---');
            console.log(csvText);
            console.log('---END---');
            
            const lines = csvText.trim().split('\n');
            console.log('Number of lines:', lines.length);
            
            lines.forEach((line, index) => {
                console.log(`Line ${index}: "${line}"`);
                if (index > 0) { // Skip header
                    const firstValue = line.split(',')[0].trim();
                    console.log(`  First value (availability): "${firstValue}"`);
                    console.log(`  Is "true": ${firstValue === 'true'}`);
                }
            });
        })
        .catch(error => {
            console.error('Error reading CSV:', error);
        });
}

// Manual trigger for debugging
window.loadJerseys = loadJerseysFromCSV;
window.loadAllJerseys = displayAllJerseysFromCSV;
window.refreshJerseys = refreshJerseys; // Add manual refresh function to window
window.testCSV = testCSVParsing; // Add test function to window
window.testCSVContent = testCSVContent; // Add simple content test

// Lazy loading for images
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src; // Trigger load
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// Search functionality (placeholder)
function searchJerseys(query) {
    const jerseyItems = document.querySelectorAll('.jersey-item');
    const searchTerm = query.toLowerCase();
    
    jerseyItems.forEach(item => {
        const jerseyName = item.querySelector('h3').textContent.toLowerCase();
        const jerseyTeam = item.querySelector('.jersey-team').textContent.toLowerCase();
        
        if (jerseyName.includes(searchTerm) || jerseyTeam.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Filter functionality (placeholder)
function filterByLeague(league) {
    const jerseyItems = document.querySelectorAll('.jersey-item');
    
    jerseyItems.forEach(item => {
        if (league === 'all') {
            item.style.display = 'block';
        } else {
            // This would need to be implemented based on your data structure
            item.style.display = 'block';
        }
    });
}

// Initialize tooltips for category cards
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });
    
    card.addEventListener('click', function() {
        const league = this.querySelector('h3').textContent;
        filterByLeague(league.toLowerCase());
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Jersey Carousel Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

// Auto-advance carousel every 3 seconds
setInterval(nextSlide, 3000);

// Add click event listeners to dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
    });
});

// Preload critical images
const criticalImages = [
    'https://via.placeholder.com/300x400/ff6b6b/ffffff?text=Arsenal+Home',
    'https://via.placeholder.com/300x400/4ecdc4/ffffff?text=Barcelona+Away'
];

criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
});

// QR Code Generation
document.addEventListener('DOMContentLoaded', function() {
    // Check if QR code section exists
    const qrSection = document.getElementById('qr-code');
    if (!qrSection) return;

    // Generate QR Code
    const qrcode = new QRCode(document.getElementById("qrcode"), {
        text: "https://www.newenglandkitz.com",
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // Download QR Code functionality
    document.getElementById('downloadQR').addEventListener('click', function() {
        const canvas = document.querySelector('#qrcode canvas');
        if (canvas) {
            const link = document.createElement('a');
            link.download = 'newenglandkitz-qr.png';
            link.href = canvas.toDataURL();
            link.click();
        }
    });
});
