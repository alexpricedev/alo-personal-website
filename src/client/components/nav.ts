export function initNav(): void {
  const toggle = document.querySelector<HTMLButtonElement>(".nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (!toggle || !menu) {
    return;
  }

  const isOpen = (): boolean => toggle.getAttribute("aria-expanded") === "true";

  const open = (): void => {
    toggle.setAttribute("aria-expanded", "true");
    menu.dataset.open = "true";
  };

  const close = (): void => {
    toggle.setAttribute("aria-expanded", "false");
    delete menu.dataset.open;
  };

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    isOpen() ? close() : open();
  });

  menu.addEventListener("click", (event) => {
    if ((event.target as HTMLElement).closest("a")) {
      close();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      close();
      toggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!isOpen()) {
      return;
    }
    const target = event.target as Node;
    if (!menu.contains(target) && !toggle.contains(target)) {
      close();
    }
  });
}
