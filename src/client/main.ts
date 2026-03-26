import { initHoverParallax, initScrollAnimations } from "./animations";

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
