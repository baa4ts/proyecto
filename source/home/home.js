document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        toggleTheme();
    }

    const themeToggle = document.getElementById('themeToggle');
    themeToggle?.addEventListener('click', toggleTheme);

    const nav = document.getElementById('navbar');
    if (!nav) return;

    let hasScrolledDown = false;
    let hasScrolledUp = true;
    const threshold = 190;

    window.addEventListener('scroll', debounce(() => {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        if (scrollPosition > threshold && !hasScrolledDown) {
            hasScrolledDown = true;
            hasScrolledUp = false;
            nav.classList.remove('nav-hidden');
        } else if (scrollPosition < threshold && !hasScrolledUp) {
            hasScrolledUp = true;
            hasScrolledDown = false;
            nav.classList.add('nav-hidden');
        }
    }, 50));
});

function toggleTheme() {
    const htmlElement = document.documentElement;
    const currentScheme = htmlElement.getAttribute('data-scheme') || 'light';
    htmlElement.setAttribute('data-scheme', currentScheme === 'dark' ? 'light' : 'dark');
}

function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
