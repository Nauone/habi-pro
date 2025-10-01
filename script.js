document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navAnchors = navLinks.querySelectorAll('a[href^="#"]');
    const sections = Array.from(document.querySelectorAll('main section'));
    const navBar = document.querySelector('.navbar');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!expanded));
            navLinks.classList.toggle('open', !expanded);
        });
    }

    navAnchors.forEach((anchor) => {
        anchor.addEventListener('click', () => {
            navToggle?.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('open');
        });
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2,
        }
    );

    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));

    const highlightNav = () => {
        const scrollPosition = window.scrollY + navBar.offsetHeight + 10;
        let currentId = sections[0]?.id || '';

        for (const section of sections) {
            if (scrollPosition >= section.offsetTop) {
                currentId = section.id;
            }
        }

        navAnchors.forEach((anchor) => {
            anchor.classList.toggle('active', anchor.getAttribute('href') === `#${currentId}`);
        });
    };

    highlightNav();
    window.addEventListener('scroll', highlightNav, { passive: true });

    const yearNode = document.getElementById('year');
    if (yearNode) {
        yearNode.textContent = new Date().getFullYear();
    }
});
