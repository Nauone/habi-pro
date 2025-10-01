document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navAnchors = navLinks.querySelectorAll('a[href^="#"]');
    const navInteractionLinks = navLinks.querySelectorAll('a');
    const sections = Array.from(document.querySelectorAll('main section'));
    const navBar = document.querySelector('.navbar');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!expanded));
            navLinks.classList.toggle('open', !expanded);
        });
    }

    navInteractionLinks.forEach((anchor) => {
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

    const contactForm = document.getElementById('contact-form');
    const statusNode = contactForm?.querySelector('.form-status');

    if (contactForm && statusNode) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            statusNode.textContent = 'Envoi en cours...';
            statusNode.classList.remove('form-status--error', 'form-status--success');

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                    },
                    body: formData,
                });

                if (response.ok) {
                    statusNode.textContent = 'Merci, nous revenons vers vous sous 24 h.';
                    statusNode.classList.add('form-status--success');
                    contactForm.reset();
                } else {
                    const data = await response.json().catch(() => null);
                    const errorMessage = data?.errors?.[0]?.message || 'Une erreur est survenue. Merci de réessayer.';
                    statusNode.textContent = errorMessage;
                    statusNode.classList.add('form-status--error');
                }
            } catch (error) {
                statusNode.textContent = "Impossible d'envoyer votre message pour le moment.";
                statusNode.classList.add('form-status--error');
            }
        });
    }


    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        const toggleBackToTop = () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        };

        toggleBackToTop();
        window.addEventListener('scroll', toggleBackToTop, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (yearNode) {
        yearNode.textContent = new Date().getFullYear();
    }
});
