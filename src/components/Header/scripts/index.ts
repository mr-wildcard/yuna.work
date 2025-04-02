if (!CSS.supports("animation-timeline", "scroll(y root)")) {
  import("./sticky-header.fallback").then(({ default: stickThatHeader }) =>
    stickThatHeader(),
  );
}

const header = document.querySelector<HTMLElement>("#header");

const mobileMenuOpener = document.querySelector<HTMLElement>(
  "#mobile-menu-opener",
);

const mobileMenu = document.querySelector<HTMLElement>("#mobile-menu");

function openMobileMenu() {
  if (header && mobileMenuOpener && mobileMenu) {
    header.setAttribute("data-menu-opened", "true");
    mobileMenuOpener.setAttribute("aria-expanded", "true");
    document.body.classList.add("overflow-hidden");
  }
}

function closeMobileMenu() {
  if (header && mobileMenuOpener && mobileMenu) {
    header.setAttribute("data-menu-opened", "false");
    mobileMenuOpener.setAttribute("aria-expanded", "false");
    document.body.classList.remove("overflow-hidden");
  }
}

function onKeypress(event: KeyboardEvent) {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
}

if (header && mobileMenuOpener && mobileMenu) {
  mobileMenuOpener.addEventListener("click", () => {
    const { menuOpened } = header.dataset;

    if (menuOpened === "true") {
      document.body.addEventListener("keydown", onKeypress);

      closeMobileMenu();
    } else {
      document.body.addEventListener("keydown", onKeypress);

      openMobileMenu();
    }
  });
}
