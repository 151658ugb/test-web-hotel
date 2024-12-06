// ฟังก์ชันให้ไปที่หน้า index ใหม่เมื่อโหลดหน้า
window.addEventListener('load', () => {
    // ตรวจสอบว่าเป็นการโหลดจากการรีเฟรช (F5)
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        window.location.href = 'index.html'; // กำหนด URL ของหน้า index ที่ต้องการ
    }
});

// แสดงปีปัจจุบันใน footer
const currentYear = new Date().getFullYear();
document.getElementById('year').textContent = currentYear;

// ฟังก์ชันเปิด/ปิด hamburger menu
document.querySelector('.hamburger').addEventListener('click', function() {
    const navBar = document.querySelector('.nav-bar');
    navBar.classList.toggle('active');
    this.classList.toggle('active');
});

// ฟังก์ชันสำหรับ dropdown ภาษา
const languageToggle = document.querySelector('.language-toggle');
const dropdown = document.querySelector('.dropdown');
const languageOptions = document.querySelectorAll('.language-toggle .dropdown a');

// เปิด/ปิด dropdown ภาษา
languageToggle.addEventListener('click', function(event) {
    event.stopPropagation(); // หยุดการคลิกจากการไปที่ส่วนอื่นของหน้า
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

// ฟังก์ชันปิด dropdown เมื่อคลิกในที่อื่น ๆ
document.addEventListener('click', function(event) {
    if (!languageToggle.contains(event.target)) {
        dropdown.style.display = 'none'; // ปิด dropdown เมื่อคลิกที่อื่น
    }
});

// จัดการการเลือกภาษา
languageOptions.forEach(option => {
    option.addEventListener('click', function() {
        languageOptions.forEach(option => option.classList.remove('selected')); // ลบคลาส selected ออกจากทุกตัวเลือก
        this.classList.add('selected'); // เพิ่มคลาส selected ให้กับตัวเลือกที่ถูกคลิก
        const selectedLang = option.getAttribute('data-lang');
        changeLanguage(selectedLang);
        dropdown.style.display = 'none'; // ปิด dropdown หลังจากเลือกภาษา
    });
});

// ฟังก์ชันเปลี่ยนภาษา
function changeLanguage(lang) {
    const langFile = `lang/lang-${lang}.json`;

    fetch(langFile)
        .then(response => response.json())
        .then(translations => {
            document.getElementById('site-title').textContent = translations['site-title'];
        });
}

// ฟังก์ชันจัดการลิงก์ใน Navbar และ Smooth Scroll
const navLinks = document.querySelectorAll('.nav-bar ul li a');
const hamburger = document.querySelector('.hamburger');
const navBar = document.querySelector('.nav-bar');

navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        if (this.getAttribute('href').startsWith('#')) {
            event.preventDefault();

            // ลบคลาส active ออกจากทุกลิงก์
            navLinks.forEach(link => link.classList.remove('active'));

            // เพิ่มคลาส active ให้กับลิงก์ที่ถูกคลิก
            this.classList.add('active');

            // Smooth scroll ไปยัง section ที่ต้องการ
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // ลบ offset ของ header
                    behavior: "smooth",
                });
            }

            // ปิด Hamburger Menu เมื่อคลิกในโหมดมือถือ
            if (navBar.classList.contains('active')) {
                navBar.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// เมื่อโหลดหน้าแรก ให้ตั้ง active ไว้ที่ "หน้าแรก"
window.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.querySelector('a[href="#slide"]');
    homeLink.classList.add('active'); // ตั้ง active ที่ "หน้าแรก"
});


// ฟังก์ชันเลื่อนภาพ
let currentIndex = 0;
const images = document.querySelectorAll('.slider-image');
const totalImages = images.length;

function showNextImage() {
    currentIndex = (currentIndex + 1) % totalImages;
    const offset = -currentIndex * 100 / totalImages;
    document.querySelector('.slider-images').style.transform = `translateX(${offset}%)`;
}

setInterval(showNextImage, 19500); // ภาพจะเปลี่ยนทุก 7.5 วินาที