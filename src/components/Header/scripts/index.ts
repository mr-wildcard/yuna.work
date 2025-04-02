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

const inertElements: HTMLElement[] = [];

const elementsToIgnore = [mobileMenu, mobileMenuOpener];

function inertChild(child: ChildNode) {
  const childHTMLElements = child.childNodes;

  for (const childHTMLElement of childHTMLElements) {
    const htmlElement = childHTMLElement as HTMLElement;

    if (elementsToIgnore.some((element) => element === htmlElement)) {
      htmlElement.inert = false;

      break;
    }

    if (elementsToIgnore.some((element) => htmlElement.contains(element))) {
      inertChild(htmlElement);
    } else {
      htmlElement.inert = true;

      inertElements.push(htmlElement);
    }
  }
}

function openMobileMenu() {
  if (header && mobileMenuOpener && mobileMenu) {
    header.setAttribute("data-menu-opened", "true");
    mobileMenuOpener.setAttribute("aria-expanded", "true");
    document.body.classList.add("overflow-hidden");
    inertChild(document.body);
  }
}

function closeMobileMenu() {
  if (header && mobileMenuOpener && mobileMenu) {
    header.setAttribute("data-menu-opened", "false");
    mobileMenuOpener.setAttribute("aria-expanded", "false");
    document.body.classList.remove("overflow-hidden");

    let inertElement: HTMLElement | undefined;
    while ((inertElement = inertElements.pop())) {
      inertElement.removeAttribute("inert");
    }
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
