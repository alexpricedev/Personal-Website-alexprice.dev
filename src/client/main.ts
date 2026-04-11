import {
  initHoverParallax,
  initIcebergAnimation,
  initScrollAnimations,
} from "./animations";

const toggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-mobile-menu]");

const scrim = document.createElement("div");
scrim.className =
  "fixed inset-0 top-16 bg-black/50 z-40 hidden transition-opacity duration-200";
document.body.appendChild(scrim);

function closeMenu() {
  menu?.classList.add("hidden");
  scrim.classList.add("hidden");
  document.body.style.overflow = "";
}

function openMenu() {
  menu?.classList.remove("hidden");
  scrim.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const isOpen = !menu.classList.contains("hidden");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });
}

scrim.addEventListener("click", closeMenu);

initScrollAnimations();
initHoverParallax();

// Checklist counter (common-issues page only)
if (document.body.dataset.page === "assessment") {
  initIcebergAnimation();
  const checklist = document.querySelector("[data-checklist]");
  if (checklist) {
    const items = checklist.querySelectorAll<HTMLInputElement>(
      "[data-checklist-item]",
    );
    const counter = checklist.querySelector("[data-checklist-counter]");
    const cta = checklist.querySelector("[data-checklist-cta]");
    const total = items.length;

    function updateCount() {
      if (!checklist) return;
      const checked = checklist.querySelectorAll<HTMLInputElement>(
        "[data-checklist-item]:checked",
      ).length;
      if (counter) {
        counter.textContent = `${checked} of ${total} checked`;
      }
      if (cta) {
        if (checked >= 3) {
          cta.classList.remove("hidden");
        } else {
          cta.classList.add("hidden");
        }
      }
    }

    for (const item of items) {
      item.addEventListener("change", updateCount);
    }
  }
}
