const htmlHeaderElement = document.querySelector<HTMLElement>("#header");

let headerHasBackground = false;

function showHeaderBackground(header: HTMLElement): void {
  header.style.backgroundColor = "#f4efea";
  header.style.borderBottom = "1px solid #0f2e20";

  headerHasBackground = true;
}

function hideHeaderBackground(header: HTMLElement): void {
  header.style.cssText = "";

  headerHasBackground = false;
}

function onUserScrolls(): void {
  if (!htmlHeaderElement) {
    return;
  }

  if (window.scrollY > 0 && !headerHasBackground) {
    showHeaderBackground(htmlHeaderElement);

    headerHasBackground = true;
  } else if (window.scrollY === 0 && headerHasBackground) {
    hideHeaderBackground(htmlHeaderElement);

    headerHasBackground = false;
  }
}

window.addEventListener("scroll", onUserScrolls);

onUserScrolls();
