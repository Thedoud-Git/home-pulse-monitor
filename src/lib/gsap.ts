// FIX #2 — Centralized GSAP plugin registration.
// Imported once at app boot; safe to import elsewhere (idempotent).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

// SSR-safe layout effect (Lovable uses CSR, but kept for portability).
import { useEffect, useLayoutEffect } from 'react';
export const useIsoLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
