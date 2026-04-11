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

export function initHoverParallax(): void {
  const containers = document.querySelectorAll<HTMLElement>("[data-parallax]");

  for (const container of containers) {
    const bg = container.querySelector<HTMLElement>(
      '[data-parallax-layer="bg"]',
    );
    const fg = container.querySelector<HTMLElement>(
      '[data-parallax-layer="fg"]',
    );
    if (!bg || !fg) continue;

    const BG_STRENGTH = 20;
    const FG_STRENGTH = 10;

    container.addEventListener("mousemove", (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(bg, {
        x: x * BG_STRENGTH,
        y: y * BG_STRENGTH,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.to(fg, {
        x: x * -FG_STRENGTH,
        y: y * -FG_STRENGTH,
        duration: 0.6,
        ease: "power2.out",
      });
    });

    container.addEventListener("mouseleave", () => {
      gsap.to([bg, fg], { x: 0, y: 0, duration: 0.6, ease: "power2.out" });
    });
  }
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

export function initIcebergAnimation(): void {
  const svg = document.querySelector<SVGElement>("[data-iceberg]");
  if (!svg) return;

  const shape = svg.querySelector("[data-iceberg-shape]");
  const labels = svg.querySelectorAll("[data-iceberg-label]");
  const waterline = svg.querySelector("[data-iceberg-waterline]");

  if (!shape) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducedMotion) return;

  // Set initial states
  gsap.set(shape, { opacity: 0 });
  gsap.set(labels, { opacity: 0 });
  if (waterline) gsap.set(waterline, { opacity: 0 });

  // Create timeline triggered by scroll
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: svg,
      start: "top 85%",
      once: true,
    },
  });

  // Phase 1: Iceberg shape fades in
  tl.to(shape, {
    opacity: 1,
    duration: 0.6,
    ease: "power2.out",
  });

  // Waterline fades in with shape
  if (waterline) {
    tl.to(waterline, { opacity: 1, duration: 0.6, ease: "power2.out" }, "<");
  }

  // Phase 2: Labels stagger in after
  tl.to(labels, {
    opacity: 1,
    duration: 0.3,
    ease: "power2.out",
    stagger: 0.08,
  });

  // Phase 3: Start organic bobbing after reveal completes
  tl.call(() => {
    // Iceberg bobs with layered motions for organic feel
    const bobTl = gsap.timeline({ repeat: -1, yoyo: true });
    bobTl.to(shape, {
      y: 6,
      x: 1,
      rotation: 0.2,
      transformOrigin: "50% 50%",
      duration: 2.8,
      ease: "sine.inOut",
    });
    bobTl.to(shape, {
      y: -2,
      x: -0.5,
      rotation: -0.15,
      duration: 3.5,
      ease: "sine.inOut",
    });

    // Waterline bobs with its own layered motions
    if (waterline) {
      const waterTl = gsap.timeline({ repeat: -1, yoyo: true });
      waterTl.to(waterline, {
        y: 2.5,
        duration: 3.2,
        ease: "sine.inOut",
      });
      waterTl.to(waterline, {
        y: -1.5,
        duration: 4,
        ease: "sine.inOut",
      });
    }
  });
}
