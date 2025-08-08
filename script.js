// Park Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeInteractiveElements();
    initializeWeatherSimulation();
    initializeParallaxEffects();
});

// Initialize entrance animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.hero-content, .park-feature, .activity-card').forEach(el => {
        observer.observe(el);
    });

    // Stagger animation for activity cards
    const activityCards = document.querySelectorAll('.activity-card');
    activityCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
}

// Interactive park elements
function initializeInteractiveElements() {
    // Floating leaves animation
    createFloatingLeaves();
    
    // Interactive park sounds
    initializeSoundEffects();
    
    // Dynamic greeting based on time
    updateTimeBasedGreeting();
    
    // Interactive park map hotspots
    initializeMapHotspots();
}

// Create floating leaves effect
function createFloatingLeaves() {
    const leavesContainer = document.createElement('div');
    leavesContainer.className = 'floating-leaves';
    leavesContainer.innerHTML = `
        <div class="leaf leaf-1">🍃</div>
        <div class="leaf leaf-2">🍂</div>
        <div class="leaf leaf-3">🌿</div>
        <div class="leaf leaf-4">🍃</div>
        <div class="leaf leaf-5">🍂</div>
    `;
    
    document.body.appendChild(leavesContainer);
    
    // Animate leaves
    const leaves = document.querySelectorAll('.leaf');
    leaves.forEach((leaf, index) => {
        animateLeaf(leaf, index);
    });
}

function animateLeaf(leaf, index) {
    const duration = 8000 + Math.random() * 4000;
    const delay = index * 1600;
    const xMovement = 100 + Math.random() * 200;
    
    leaf.style.left = Math.random() * 100 + '%';
    leaf.style.animationDuration = duration + 'ms';
    leaf.style.animationDelay = delay + 'ms';
    leaf.style.setProperty('--x-movement', xMovement + 'px');
}

// Sound effects for park ambiance
function initializeSoundEffects() {
    const soundToggle = document.createElement('button');
    soundToggle.className = 'sound-toggle';
    soundToggle.innerHTML = '🔊';
    soundToggle.setAttribute('aria-label', 'Toggle park sounds');
    
    let soundEnabled = false;
    let ambientSound = null;
    
    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundToggle.innerHTML = soundEnabled ? '🔊' : '🔇';
        
        if (soundEnabled) {
            playAmbientSounds();
        } else {
            stopAmbientSounds();
        }
    });
    
    document.body.appendChild(soundToggle);
    
    function playAmbientSounds() {
        // Simulate bird chirping and wind sounds
        const birdChirps = [
            () => console.log('🐦 Bird chirping...'),
            () => console.log('🕊️ Dove cooing...'),
            () => console.log('🐿️ Squirrel chattering...')
        ];
        
        if (soundEnabled) {
            const randomBird = birdChirps[Math.floor(Math.random() * birdChirps.length)];
            randomBird();
            setTimeout(playAmbientSounds, 3000 + Math.random() * 7000);
        }
    }
    
    function stopAmbientSounds() {
        if (ambientSound) {
            clearTimeout(ambientSound);
        }
    }
}

// Dynamic greeting based on time of day
function updateTimeBasedGreeting() {
    const greetingElement = document.querySelector('.dynamic-greeting');
    if (!greetingElement) return;
    
    const hour = new Date().getHours();
    let greeting, timeClass;
    
    if (hour < 6) {
        greeting = "Good night! The park sleeps peacefully 🌙";
        timeClass = 'night';
    } else if (hour < 12) {
        greeting = "Good morning! Perfect time for a park visit 🌅";
        timeClass = 'morning';
    } else if (hour < 17) {
        greeting = "Good afternoon! Enjoy the sunshine 🌞";
        timeClass = 'afternoon';
    } else if (hour < 21) {
        greeting = "Good evening! Beautiful sunset awaits 🌅";
        timeClass = 'evening';
    } else {
        greeting = "Good night! The park is magical under the stars ✨";
        timeClass = 'night';
    }
    
    greetingElement.textContent = greeting;
    greetingElement.className = `dynamic-greeting ${timeClass}`;
}

// Weather simulation
function initializeWeatherSimulation() {
    const weather = ['sunny', 'cloudy', 'rainy', 'windy'];
    const currentWeather = weather[Math.floor(Math.random() * weather.length)];
    
    document.body.classList.add(`weather-${currentWeather}`);
    
    // Create weather indicator
    const weatherIndicator = document.createElement('div');
    weatherIndicator.className = 'weather-indicator';
    
    const weatherIcons = {
        sunny: '☀️',
        cloudy: '⛅',
        rainy: '🌧️',
        windy: '💨'
    };
    
    weatherIndicator.innerHTML = `
        <span class="weather-icon">${weatherIcons[currentWeather]}</span>
        <span class="weather-text">Perfect ${currentWeather} day for the park!</span>
    `;
    
    document.body.appendChild(weatherIndicator);
    
    // Weather effects
    if (currentWeather === 'rainy') {
        createRainEffect();
    } else if (currentWeather === 'windy') {
        document.body.classList.add('windy-effect');
    }
}

function createRainEffect() {
    const rainContainer = document.createElement('div');
    rainContainer.className = 'rain-effect';
    
    for (let i = 0; i < 50; i++) {
        const raindrop = document.createElement('div');
        raindrop.className = 'raindrop';
        raindrop.style.left = Math.random() * 100 + '%';
        raindrop.style.animationDelay = Math.random() * 2 + 's';
        raindrop.style.animationDuration = (1 + Math.random()) + 's';
        rainContainer.appendChild(raindrop);
    }
    
    document.body.appendChild(rainContainer);
}

// Parallax effects
function initializeParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
}

// Interactive map hotspots
function initializeMapHotspots() {
    const hotspots = document.querySelectorAll('.park-hotspot');
    
    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', (e) => {
            e.preventDefault();
            
            const info = hotspot.dataset.info;
            showHotspotInfo(info, hotspot);
        });
        
        hotspot.addEventListener('mouseenter', () => {
            hotspot.classList.add('hotspot-hover');
        });
        
        hotspot.addEventListener('mouseleave', () => {
            hotspot.classList.remove('hotspot-hover');
        });
    });
}

function showHotspotInfo(info, hotspot) {
    // Remove existing info bubbles
    document.querySelectorAll('.hotspot-info').forEach(bubble => bubble.remove());
    
    const infoBubble = document.createElement('div');
    infoBubble.className = 'hotspot-info';
    infoBubble.innerHTML = `
        <div class="info-content">
            <button class="close-info" aria-label="Close info">&times;</button>
            <p>${info}</p>
        </div>
    `;
    
    document.body.appendChild(infoBubble);
    
    // Position bubble near hotspot
    const rect = hotspot.getBoundingClientRect();
    infoBubble.style.left = (rect.left + rect.width / 2) + 'px';
    infoBubble.style.top = (rect.top - 10) + 'px';
    
    // Close functionality
    const closeBtn = infoBubble.querySelector('.close-info');
    closeBtn.addEventListener('click', () => {
        infoBubble.remove();
    });
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (infoBubble.parentNode) {
            infoBubble.remove();
        }
    }, 5000);
}

// Smooth scrolling for navigation
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

// Park visitor counter simulation
function initializeVisitorCounter() {
    const counter = document.querySelector('.visitor-counter');
    if (!counter) return;
    
    let visitors = 1247 + Math.floor(Math.random() * 100);
    
    function updateCounter() {
        counter.textContent = `👥 ${visitors} visitors today`;
        
        // Random visitor updates
        if (Math.random() < 0.3) {
            visitors += Math.floor(Math.random() * 3) + 1;
            counter.classList.add('counter-update');
            setTimeout(() => counter.classList.remove('counter-update'), 500);
        }
    }
    
    updateCounter();
    setInterval(updateCounter, 30000); // Update every 30 seconds
}

// Initialize visitor counter
initializeVisitorCounter();

// Error handling
window.addEventListener('error', (e) => {
    console.error('Park script error:', e.error);
});

// Performance optimization
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Low priority initializations
        initializeVisitorCounter();
    });
}