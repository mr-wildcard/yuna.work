const header = document.querySelector<HTMLElement>("#header");

const mobileMenuOpener = document.querySelector<HTMLElement>(
  "#mobile-menu-opener",
);

const mobileMenu = document.querySelector<HTMLElement>("#mobile-menu");

if (header && mobileMenuOpener && mobileMenu) {
  mobileMenuOpener.addEventListener("click", () => {
    const { menuOpened } = header.dataset;

    if (menuOpened === "true") {
      header.setAttribute("data-menu-opened", "false");
      mobileMenuOpener.setAttribute("aria-expanded", "false");
      document.body.classList.remove("overflow-hidden");
    } else {
      const mobileMenuHeight = window.innerHeight - header.offsetHeight;

      header.setAttribute("data-menu-opened", "true");
      mobileMenuOpener.setAttribute("aria-expanded", "true");
      mobileMenu.style.height = `${mobileMenuHeight}px`;
      document.body.classList.add("overflow-hidden");
    }
  });
}
