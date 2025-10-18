if (!CSS.supports("animation-timeline", "scroll(y root)")) {
  import("./sticky-header.fallback").then(({ default: stickThatHeader }) =>
    stickThatHeader(),
  );
}

const header = document.querySelector<HTMLElement>("header#header");

const mobileMenuOpener = document.querySelector<HTMLElement>(
  "button#mobile-menu-opener",
);

const mobileMenuCloser = document.querySelector<HTMLElement>(
  "button#mobile-menu-closer",
);

const mobileMenu =
  document.querySelector<HTMLDialogElement>("dialog#mobile-menu");

function openMobileMenu() {
  if (mobileMenuOpener && mobileMenu && mobileMenuCloser) {
    mobileMenu.showModal();

    mobileMenuOpener.setAttribute("aria-expanded", "true");

    mobileMenuCloser.addEventListener("click", closeMobileMenu, {
      once: true,
    });

    document.body.classList.add("overflow-hidden");
    document.body.addEventListener("keydown", onKeypress);
  }
}

function closeMobileMenu() {
  if (mobileMenuOpener && mobileMenu) {
    mobileMenuOpener.setAttribute("aria-expanded", "false");

    document.body.classList.remove("overflow-hidden");
    document.body.removeEventListener("keydown", onKeypress);
  }
}

function onKeypress(event: KeyboardEvent) {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
}

if (header && mobileMenuOpener) {
  mobileMenuOpener.addEventListener("click", openMobileMenu);
}
