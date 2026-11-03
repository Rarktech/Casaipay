'use client';

import { useEffect } from 'react';

/**
 * Scroll reveals and the stat counters. Kept as one DOM-level effect so every
 * other section can stay a plain server component.
 */
export default function Effects() {
  useEffect(() => {
    const reveal = Array.from(document.querySelectorAll<HTMLElement>('.rv'));
    const counters = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const observers: IntersectionObserver[] = [];

    if (reduced || !('IntersectionObserver' in window)) {
      reveal.forEach((el) => el.classList.add('in'));
      counters.forEach((el) => {
        el.textContent = (el.dataset.prefix || '') + el.dataset.count + (el.dataset.suffix || '');
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const siblings = Array.from(el.parentElement?.children ?? []).filter((c) =>
            c.classList.contains('rv')
          );
          const i = Math.max(0, siblings.indexOf(el));
          el.style.transitionDelay = `${Math.min(i * 70, 350)}ms`;
          el.classList.add('in');
          io.unobserve(el);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );
    reveal.forEach((el) => io.observe(el));
    observers.push(io);

    const runCount = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.count || '0');
      const pre = el.dataset.prefix || '';
      const suf = el.dataset.suffix || '';
      const decimals = (String(target).split('.')[1] || '').length;
      const dur = 1100;
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min((t - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = pre + (target * eased).toFixed(decimals) + suf;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          runCount(e.target as HTMLElement);
          co.unobserve(e.target);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => co.observe(el));
    observers.push(co);

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return null;
}
