// src/utils/gsapAnimate.js — Helper functions GSAP ScrollTrigger animations
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * fadeInUp — fade + slide up saat elemen masuk viewport
 * @param {string | Element | NodeList} targets
 * @param {object} options
 */
export function fadeInUp(targets, options = {}) {
  if (prefersReducedMotion()) return;
  return gsap.from(targets, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.12,
    scrollTrigger: {
      trigger: typeof targets === 'string' ? targets : targets[0] || targets,
      start: 'top 88%',
      toggleActions: 'play none none none',
    },
    ...options,
  });
}

/**
 * fadeInLeft — slide dari kiri
 */
export function fadeInLeft(targets, options = {}) {
  if (prefersReducedMotion()) return;
  return gsap.from(targets, {
    x: -60,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: typeof targets === 'string' ? targets : targets[0] || targets,
      start: 'top 88%',
      toggleActions: 'play none none none',
    },
    ...options,
  });
}

/**
 * fadeInRight — slide dari kanan
 */
export function fadeInRight(targets, options = {}) {
  if (prefersReducedMotion()) return;
  return gsap.from(targets, {
    x: 60,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: typeof targets === 'string' ? targets : targets[0] || targets,
      start: 'top 88%',
      toggleActions: 'play none none none',
    },
    ...options,
  });
}

/**
 * staggerCards — stagger animation untuk grid cards
 */
export function staggerCards(targets, triggerEl, options = {}) {
  if (prefersReducedMotion()) return;
  return gsap.from(targets, {
    y: 40,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: triggerEl,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    ...options,
  });
}

/**
 * revealSection — reveal keseluruhan section dengan clip-path
 */
export function revealSection(trigger, options = {}) {
  if (prefersReducedMotion()) return;
  return gsap.from(trigger, {
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger,
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
    ...options,
  });
}

/**
 * progressBar — animasikan lebar progress bar skill
 * @param {Element[]} bars — array elemen .progress-bar
 */
export function animateProgressBars(bars) {
  if (prefersReducedMotion()) return;
  bars.forEach((bar) => {
    const target = bar.dataset.width || bar.style.width;
    gsap.from(bar, {
      width: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: bar,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
    bar.style.width = target; // pastikan lebar akhir diset
  });
}

export default { fadeInUp, fadeInLeft, fadeInRight, staggerCards, revealSection, animateProgressBars };
