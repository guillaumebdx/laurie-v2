(() => {
    'use strict';

    const header = document.querySelector('.site-header');
    const burger = document.getElementById('burger');
    const overlay = document.getElementById('menu-overlay');

    /* ---------- Header : fond verre au scroll ---------- */
    if (header) {
        const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* ---------- Menu mobile ---------- */
    if (burger && overlay) {
        const focusables = () => overlay.querySelectorAll('a, button');
        let lastFocus = null;

        const setOpen = (open) => {
            burger.setAttribute('aria-expanded', String(open));
            burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
            overlay.classList.toggle('is-open', open);
            overlay.setAttribute('aria-hidden', String(!open));
            document.body.classList.toggle('menu-open', open);
            if (open) {
                lastFocus = document.activeElement;
                const first = focusables()[0];
                if (first) setTimeout(() => first.focus({ preventScroll: true }), 120);
            } else if (lastFocus) {
                lastFocus.focus({ preventScroll: true });
            }
        };
        const isOpen = () => overlay.classList.contains('is-open');

        burger.addEventListener('click', () => setOpen(!isOpen()));
        overlay.addEventListener('click', (e) => {
            if (e.target.closest('a')) setOpen(false);
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen()) setOpen(false);
            if (e.key === 'Tab' && isOpen()) {
                const list = Array.from(focusables());
                if (!list.length) return;
                const first = list[0], last = list[list.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); burger.focus(); }
            }
        });
        window.matchMedia('(min-width: 900px)').addEventListener('change', (e) => {
            if (e.matches && isOpen()) setOpen(false);
        });
    }

    /* ---------- Apparition au scroll ---------- */
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver((entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        io.unobserve(entry.target);
                    }
                }
            }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
            revealEls.forEach((el) => io.observe(el));
        } else {
            revealEls.forEach((el) => el.classList.add('is-visible'));
        }
    }

    /* ---------- Copier un email ---------- */
    document.querySelectorAll('.copy-btn').forEach((btn) => {
        const original = btn.textContent;
        btn.addEventListener('click', async () => {
            const value = btn.dataset.copy;
            if (!value) return;
            try {
                await navigator.clipboard.writeText(value);
                btn.textContent = 'Copié !';
                btn.classList.add('is-copied');
                setTimeout(() => {
                    btn.textContent = original;
                    btn.classList.remove('is-copied');
                }, 1800);
            } catch {
                window.location.href = 'mailto:' + value;
            }
        });
    });
})();
