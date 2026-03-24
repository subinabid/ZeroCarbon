// Theme Toggle Logic
const toggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

toggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Form Validation
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    if (name.value.trim().length < 2) {
        showError(name, "Name is too short");
        isValid = false;
    } else {
        hideError(name);
    }

    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        showError(email, "Enter a valid corporate email");
        isValid = false;
    } else {
        hideError(email);
    }

    if (isValid) {
        contactForm.style.display = 'none';
        formFeedback.classList.remove('hidden');
        console.log("Submission:", { name: name.value, email: email.value, msg: message.value });
    }
});

function showError(input, msg) {
    const group = input.parentElement;
    const error = group.querySelector('.error-msg');
    input.style.borderColor = '#ff7675';
    error.innerText = msg;
    error.style.display = 'block';
}

function hideError(input) {
    input.style.borderColor = 'var(--border)';
    input.parentElement.querySelector('.error-msg').style.display = 'none';
}

// Initial Load
if (localStorage.getItem('theme') === 'light') {
    htmlElement.setAttribute('data-theme', 'light');
}