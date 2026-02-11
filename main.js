/* ============================================
   SOULMATE'S SPACE - JAVASCRIPT
   Interactive functionality dan animations
   ============================================ */

// ============================================
// 1. CUSTOM CURSOR FOLLOWER
// ============================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-dot-outline');
let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

/**
 * Mengikuti pergerakan mouse dan membuat efek trailing cursor
 */
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Update dot langsung
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';

    // Update outline dengan lag untuk efek smooth
    setTimeout(() => {
        outlineX += (mouseX - outlineX) * 0.3;
        outlineY += (mouseY - outlineY) * 0.3;
        cursorOutline.style.left = outlineX - 20 + 'px';
        cursorOutline.style.top = outlineY - 20 + 'px';
    }, 10);
});

/**
 * Hide cursor saat mouse leave window
 */
document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorOutline.style.opacity = '0';
});

/**
 * Show cursor saat mouse masuk window
 */
document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
    cursorOutline.style.opacity = '1';
});

// ============================================
// 2. BUTTON INTERACTIONS
// ============================================

const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
const noText = document.getElementById('noText');
const landing = document.getElementById('landing');
const gallery = document.getElementById('gallery');

/**
 * Tombol YES - Navigasi ke Gallery
 * Memberikan transisi smooth dari landing ke gallery
 */
btnYes.addEventListener('click', () => {
    // Fade out landing section
    landing.style.display = 'none';
    
    // Show gallery dengan animasi fade-in
    gallery.classList.remove('hidden');
    gallery.style.animation = 'fadeIn 0.8s ease-in-out';
    
    // Smooth scroll ke atas
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/**
 * Tombol NO - Evasion mechanics
 * Tombol bergerak acak setiap kali diklik
 * Setelah 2 klik, muncul teks ajakan lucu
 */
let clickCount = 0;

btnNo.addEventListener('click', (e) => {
    clickCount++;
    
    // Generate posisi acak untuk tombol
    const randomX = Math.random() * (window.innerWidth - 200);
    const randomY = Math.random() * (window.innerHeight - 100);
    
    // Animate tombol menghindar dengan GSAP
    gsap.to(btnNo, {
        x: randomX - 150,
        y: randomY - 50,
        duration: 0.4,
        ease: 'back.out'
    });
    
    // Show teks ajakan setelah 2 kali klik
    if (clickCount >= 2) {
        noText.style.opacity = '1';
    }
});

// ============================================
// 3. MODAL FUNCTIONS
// ============================================

/**
 * Membuka modal dengan ID tertentu
 * @param {string} modalName - Nama modal tanpa prefix "modal-"
 */
function openModal(modalName) {
    const modal = document.getElementById(`modal-${modalName}`);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

/**
 * Menutup modal dengan ID tertentu
 * @param {string} modalName - Nama modal tanpa prefix "modal-"
 */
function closeModal(modalName) {
    const modal = document.getElementById(`modal-${modalName}`);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Enable scrolling
    }
}

/**
 * Event listener untuk membuka modal saat card diklik
 */
document.querySelectorAll('.card-item').forEach(card => {
    card.addEventListener('click', () => {
        const modalName = card.getAttribute('data-modal');
        openModal(modalName);
    });
});

/**
 * Event listener untuk menutup modal saat klik di overlay
 */
document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
        // Hanya close jika mengklik overlay, bukan content
        if (e.target === modal) {
            const modalId = modal.id.replace('modal-', '');
            closeModal(modalId);
        }
    });
});

/**
 * Close modal dengan tombol ESC keyboard
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Temukan modal yang aktif dan tutup
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) {
            const modalId = activeModal.id.replace('modal-', '');
            closeModal(modalId);
        }
    }
});

// ============================================
// 4. SCROLL ANIMATIONS
// ============================================

/**
 * Intersection Observer untuk fade-in animation
 * Elemen akan fade in saat masuk ke viewport
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.8s ease-in-out';
        }
    });
}, observerOptions);

// Observe semua card items
document.querySelectorAll('.card-item').forEach(card => {
    observer.observe(card);
});

// ============================================
// 5. PAGE LOAD ANIMATIONS
// ============================================

/**
 * Animasi saat halaman pertama kali dimuat
 * Menggunakan GSAP untuk animasi yang smooth
 */
window.addEventListener('load', () => {
    // Animate judul (h1)
    gsap.from('h1', {
        duration: 1,
        opacity: 0,
        y: 30,
        ease: 'power2.out'
    });

    // Animate paragraf di landing
    gsap.from('#landing p', {
        duration: 1,
        opacity: 0,
        y: 20,
        ease: 'power2.out',
        delay: 0.2
    });

    // Animate tombol dengan stagger
    gsap.from('#landing button', {
        duration: 1,
        opacity: 0,
        y: 20,
        ease: 'power2.out',
        delay: 0.4,
        stagger: 0.2
    });
});

// ============================================
// 6. UTILITY FUNCTIONS
// ============================================

/**
 * Detect if user is on mobile device
 * Useful untuk conditional behavior
 */
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || 
           (navigator.userAgent.indexOf('IEMobile') !== -1);
}

/**
 * Smooth scroll to element
 * @param {string} elementId - ID dari element
 * @param {number} offset - Offset dalam pixel
 */
function smoothScrollTo(elementId, offset = 0) {
    const element = document.getElementById(elementId);
    if (element) {
        window.scrollTo({
            top: element.offsetTop - offset,
            behavior: 'smooth'
        });
    }
}

/**
 * Add animation class ke element
 * @param {HTMLElement} element - Target element
 * @param {string} animationName - Nama animation
 */
function addAnimation(element, animationName) {
    element.style.animation = `${animationName} 0.8s ease-in-out`;
}

// ============================================
// 7. CONSOLE MESSAGING
// ============================================

/**
 * Styled console message saat page load
 * Untuk easter egg atau branding
 */
console.log(
    '%cWelcome to Our Soulmate\'s Space ✨', 
    'font-size: 20px; color: #c9a96e; font-family: Playfair Display; font-weight: bold;'
);

console.log(
    '%cEvery moment together is a masterpiece waiting to unfold.', 
    'font-size: 14px; color: #666; font-style: italic;'
);

console.log(
    '%cDesigned with love using HTML5, Tailwind CSS, and Vanilla JavaScript',
    'font-size: 12px; color: #999;'
);

// ============================================
// 8. PERFORMANCE OPTIMIZATION
// ============================================

/**
 * Lazy load images jika ada
 * Meningkatkan performance loading halaman
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    // Observe semua lazy-load images
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// END OF FILE
// ============================================
