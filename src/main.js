/**
 * syn-eye.blog - Final Stable JS
 */

// 0. Регистрация плагинов
gsap.registerPlugin(ScrollTrigger);

// 1. Плавный скролл
const lenis = new Lenis();
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Мобильное меню (Исправлено)
const initNavigation = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    const body = document.body;

    if (burger && nav) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            nav.classList.toggle('active');
            body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
    }

    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            if (burger) burger.classList.remove('active');
            if (nav) nav.classList.remove('active');
            body.style.overflow = '';
        });
    });
};

// 3. Анимация Hero (Надежный метод FromTo)
const initHero = () => {
    const tl = gsap.timeline({
        defaults: { ease: "expo.out", duration: 1.2 }
    });

    // Мы используем fromTo, чтобы четко сказать:
    // "Начни с 0 и закончи на 1", не полагаясь на текущее состояние CSS
    tl.fromTo('.hero__badge',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0 },
        "+=0.5"
    )
    .fromTo('.hero__title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0 },
        "-=0.8"
    )
    .fromTo('.hero__text',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        "-=0.9"
    )
    .fromTo('.hero__actions',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        "-=1"
    )
    .fromTo('.hero__visual',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1 },
        "-=1.2"
    );
};

// 4. Скролл-анимации остальных секций
const initScrollAnims = () => {
    document.querySelectorAll('[data-aos]').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 1
        });
    });

    // Изменение хедера при скролле
    const header = document.querySelector('.header');
    ScrollTrigger.create({
        start: "top -50",
        onUpdate: (self) => {
            if (self.direction === 1) {
                header.classList.add('header--scrolled');
            } else if (window.scrollY < 50) {
                header.classList.remove('header--scrolled');
            }
        }
    });
};

// 5. Контакты и Капча
const initForm = () => {
    const form = document.getElementById('ai-contact-form');
    if (!form) return;

    const n1 = Math.floor(Math.random() * 10);
    const n2 = Math.floor(Math.random() * 10);
    const sum = n1 + n2;
    const label = document.getElementById('captcha-label');
    if (label) label.innerText = `Сколько будет ${n1} + ${n2}?`;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const ans = document.getElementById('captcha-input').value;
        if (parseInt(ans) !== sum) {
            alert("Решите капчу правильно!");
            return;
        }

        const btn = form.querySelector('button');
        btn.innerText = "Отправка...";
        setTimeout(() => {
            form.reset();
            btn.innerText = "Отправить запрос";
            const success = document.getElementById('form-success');
            if (success) success.style.display = 'block';
        }, 1500);
    });
};

// Запуск всего
window.addEventListener('load', () => {
    initNavigation();
    initHero();
    initScrollAnims();
    initForm();
});

// Cookie Popup
const cookieBtn = document.getElementById('accept-cookies');
if (cookieBtn) {
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => document.getElementById('cookie-popup').classList.add('active'), 2000);
    }
    cookieBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        document.getElementById('cookie-popup').classList.remove('active');
    });
}