const htmlElement = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

const setTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

const preferredTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
setTheme(preferredTheme);

themeToggle.addEventListener('click', () => {
    const current = htmlElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
});

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;

    if (name.value.trim().length < 2) {
        showError(name, 'Please enter your name.');
        isValid = false;
    } else {
        hideError(name);
    }

    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        showError(email, 'Enter a valid email address.');
        isValid = false;
    } else {
        hideError(email);
    }

    if (message.value.trim().length < 10) {
        showError(message, 'Tell us a bit more about your project.');
        isValid = false;
    } else {
        hideError(message);
    }

    if (!isValid) {
        return;
    }

    contactForm.reset();
    contactForm.classList.add('hidden');
    formFeedback.classList.remove('hidden');
    console.log('Contact intent submitted:', {
        name: name.value,
        email: email.value,
        message: message.value,
    });
});

function showError(field, message) {
    const group = field.closest('.input-group');
    const error = group.querySelector('.error-msg');
    field.style.borderColor = '#f87171';
    error.textContent = message;
    error.style.display = 'block';
}

function hideError(field) {
    const group = field.closest('.input-group');
    const error = group.querySelector('.error-msg');
    field.style.borderColor = 'var(--border)';
    error.style.display = 'none';
}
