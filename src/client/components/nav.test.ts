import { afterEach, beforeEach, describe, expect, test } from "bun:test";

function mountNav(): void {
  document.body.innerHTML = `
    <nav data-component="nav" aria-label="Main navigation">
      <button class="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Menu"></button>
      <div id="nav-menu" class="nav-menu">
        <ul><li><a href="/#about">About me</a></li></ul>
        <a class="nav-contact" href="/#contact">Contact</a>
      </div>
    </nav>
    <main><p id="outside">elsewhere</p></main>
  `;
}

const toggle = () => document.querySelector(".nav-toggle") as HTMLButtonElement;
const menu = () => document.getElementById("nav-menu") as HTMLElement;

describe("initNav", () => {
  beforeEach(() => {
    mountNav();
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("does not throw when nav is absent", async () => {
    document.body.innerHTML = "";
    const { initNav } = await import("./nav");
    expect(() => initNav()).not.toThrow();
  });

  test("toggle opens and closes the menu", async () => {
    const { initNav } = await import("./nav");
    initNav();

    toggle().click();
    expect(toggle().getAttribute("aria-expanded")).toBe("true");
    expect(menu().dataset.open).toBe("true");

    toggle().click();
    expect(toggle().getAttribute("aria-expanded")).toBe("false");
    expect(menu().dataset.open).toBeUndefined();
  });

  test("clicking a menu link closes the menu", async () => {
    const { initNav } = await import("./nav");
    initNav();
    toggle().click();

    (menu().querySelector("a") as HTMLAnchorElement).click();
    expect(toggle().getAttribute("aria-expanded")).toBe("false");
  });

  test("Escape closes the menu and refocuses the toggle", async () => {
    const { initNav } = await import("./nav");
    initNav();
    toggle().click();

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(toggle().getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(toggle());
  });

  test("outside click closes the menu", async () => {
    const { initNav } = await import("./nav");
    initNav();
    toggle().click();

    (document.getElementById("outside") as HTMLElement).click();
    expect(toggle().getAttribute("aria-expanded")).toBe("false");
  });
});
