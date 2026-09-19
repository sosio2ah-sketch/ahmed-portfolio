// ============================
// نظام اللغة (عربي / إنجليزي)
// ============================

// حفظ اللغة المختارة
let currentLang = 'ar';

// عند فتح الموقع، تحقق إذا في لغة محفوظة
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('siteLang');
    if (savedLang) {
        // المستخدم اختار لغة من قبل
        applyLanguage(savedLang);
        hideOverlay();
    }
    // إذا ما في لغة محفوظة، تظهر النافذة
});

// اختيار لغة
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('siteLang', lang);
    applyLanguage(lang);
    hideOverlay();
}

// تطبيق اللغة على الموقع
function applyLanguage(lang) {
    const htmlRoot = document.getElementById('htmlRoot');
    
    if (lang === 'ar') {
        htmlRoot.setAttribute('lang', 'ar');
        htmlRoot.setAttribute('dir', 'rtl');
    } else {
        htmlRoot.setAttribute('lang', 'en');
        htmlRoot.setAttribute('dir', 'ltr');
    }
    
    // تحديث كل العناصر اللي فيها data-ar و data-en
    document.querySelectorAll('[data-ar][data-en]').forEach(el => {
        const text = el.getAttribute('data-' + lang);
        if (text) {
            el.textContent = text;
        }
    });
    
    // تحديث زر تبديل اللغة
    const toggleText = document.getElementById('langToggleText');
    if (toggleText) {
        toggleText.textContent = lang === 'ar' ? 'EN' : 'AR';
    }
}

// إخفاء نافذة اختيار اللغة
function hideOverlay() {
    const overlay = document.getElementById('langOverlay');
    const siteWrapper = document.getElementById('siteWrapper');
    
    overlay.classList.add('hidden');
    siteWrapper.classList.add('visible');
    
    // إخفاء كامل بعد الانتهاء من الأنيميشن
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 600);
}

// إعادة فتح نافذة اختيار اللغة
function openLangOverlay() {
    const overlay = document.getElementById('langOverlay');
    overlay.style.display = 'flex';
    setTimeout(() => {
        overlay.classList.remove('hidden');
    }, 10);
}

// ============================
// عرض المشاريع تلقائياً (1.jpg - 33.jpg)
// يدعم صيغ: jpg, JPG, png, PNG, jpeg
// ============================
const projectsGallery = document.getElementById('projectsGallery');
const totalProjects = 33;
const extensions = ['.jpg', '.JPG', '.png', '.PNG', '.jpeg'];

function tryLoadImage(basePath, extensions, onSuccess, onFail) {
    let index = 0;
    
    function tryNext() {
        if (index >= extensions.length) {
            onFail();
            return;
        }
        
        const testImg = new Image();
        testImg.onload = () => onSuccess(basePath + extensions[index]);
        testImg.onerror = () => {
            index++;
            tryNext();
        };
        testImg.src = basePath + extensions[index];
    }
    
    tryNext();
}

for (let i = 1; i <= totalProjects; i++) {
    const img = document.createElement('img');
    img.alt = 'Project ' + i;
    img.loading = 'lazy';
    
    tryLoadImage(
        i.toString(),
        extensions,
        (src) => {
            img.src = src;
            img.onclick = () => openLightbox(src);
            projectsGallery.appendChild(img);
        },
        () => {
            console.warn('Project image not found: ' + i);
        }
    );
}

// ============================
// عرض الشهادات تلقائياً (Cert1.jpg - Cert13.jpg)
// ============================
const certificatesGrid = document.getElementById('certificatesGrid');
const totalCertificates = 13;
const certExtensions = ['.jpg', '.JPG', '.png', '.PNG', '.jpeg'];

for (let i = 1; i <= totalCertificates; i++) {
    const img = document.createElement('img');
    img.alt = 'Certificate ' + i;
    img.loading = 'lazy';
    
    tryLoadImage(
        'Cert' + i,
        certExtensions,
        (src) => {
            img.src = src;
            img.onclick = () => openLightbox(src);
            certificatesGrid.appendChild(img);
        },
        () => {
            console.warn('Certificate not found: ' + i);
        }
    );
}

// ============================
// نافذة عرض الصور (Lightbox)
// ============================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
}

function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
}

closeBtn.onclick = closeLightbox;

lightbox.onclick = (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// ============================
// التمرير السلس (Smooth Scroll)
// ============================
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
