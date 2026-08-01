// src/hooks/useLenis.js — Lenis smooth scroll + GSAP ticker sync
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';

/**
 * useLenis — setup Lenis smooth scroll, sync dengan GSAP ticker.
 * Dihormati prefers-reduced-motion: jika user request reduce motion,
 * Lenis tidak diaktifkan.
 */
export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Hormati prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    // Sync dengan GSAP ticker untuk animasi yang presisi
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}

export default useLenis;
