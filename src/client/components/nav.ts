export function init() {
  const toggle = document.querySelector<HTMLButtonElement>(".nav-toggle");
  const menu = document.querySelector<HTMLElement>(".nav-menu");

  if (!toggle || !menu) {
    return;
  }

  const setOpen = (open: boolean) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.dataset.open = String(open);
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  for (const link of menu.querySelectorAll("a")) {
    link.addEventListener("click", () => setOpen(false));
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  });
}
