import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DURATION = 0.35;
const Y_OFFSET = 24;
const EASING = "power2.out";
const STAGGER_DELAY = 0.08;
const TRIGGER_START = "top 85%";

function initCharAnimation(): void {
  const container = document.querySelector<HTMLElement>(
    '[data-animate="chars"]',
  );
  if (!container) return;

  const chars = container.querySelectorAll<HTMLElement>("span");
  gsap.fromTo(
    chars,
    { opacity: 0, y: 8 },
    {
      opacity: 1,
      y: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.out",
      delay: 0.4,
    },
  );
}

export function initScrollAnimations(): void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    // Still show the chars if reduced motion
    const chars = document.querySelectorAll<HTMLElement>(
      '[data-animate="chars"] span',
    );
    gsap.set(chars, { opacity: 1 });
    return;
  }

  initCharAnimation();

  const sections = document.querySelectorAll<HTMLElement>(
    '[data-animate="section"]',
  );
  for (const section of sections) {
    gsap.set(section, { opacity: 0, y: Y_OFFSET });
    ScrollTrigger.create({
      trigger: section,
      start: TRIGGER_START,
      once: true,
      onEnter: () => {
        gsap.to(section, {
          opacity: 1,
          y: 0,
          duration: DURATION,
          ease: EASING,
        });
      },
    });
  }

  const staggerContainers = document.querySelectorAll<HTMLElement>(
    '[data-animate="stagger"]',
  );
  for (const container of staggerContainers) {
    const children = container.children;
    gsap.set(children, { opacity: 0, y: Y_OFFSET });
    ScrollTrigger.create({
      trigger: container,
      start: TRIGGER_START,
      once: true,
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: DURATION,
          ease: EASING,
          stagger: STAGGER_DELAY,
        });
      },
    });
  }

  // Fade list — pure opacity fade, slower timing (insights articles)
  const fadeLists = document.querySelectorAll<HTMLElement>(
    '[data-animate="fade-list"]',
  );
  for (const container of fadeLists) {
    const children = container.children;
    gsap.set(children, { opacity: 0 });
    ScrollTrigger.create({
      trigger: container,
      start: TRIGGER_START,
      once: true,
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          duration: 0.6,
          ease: "power1.out",
          stagger: 0.12,
        });
      },
    });
  }

  // Sequence animations — children with [data-seq] animate one after another
  const sequenceContainers = document.querySelectorAll<HTMLElement>(
    '[data-animate="sequence"]',
  );
  for (const container of sequenceContainers) {
    const items = container.querySelectorAll<HTMLElement>("[data-seq]");
    gsap.set(items, { opacity: 0, y: Y_OFFSET });
    ScrollTrigger.create({
      trigger: container,
      start: TRIGGER_START,
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: DURATION,
          ease: EASING,
          stagger: 0.15,
        });
      },
    });
  }
}
