import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export function init() {
  const lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  lenis.on("scroll", ScrollTrigger.update);

  const hero = document.querySelector(".stack-slab--hero");
  const left = document.querySelector(".hero-name-split-left");
  const right = document.querySelector(".hero-name-split-right");

  if (hero && left && right) {
    gsap.to(left, {
      ease: "none",
      scrollTrigger: {
        end: "bottom top",
        scrub: 1,
        start: "top top",
        trigger: hero,
      },
      xPercent: -18,
    });
    gsap.to(right, {
      ease: "none",
      scrollTrigger: {
        end: "bottom top",
        scrub: 1,
        start: "top top",
        trigger: hero,
      },
      xPercent: 18,
    });
  }

  initRevealAnimations();
  initBubbleAnimations();
}

function initRevealAnimations() {
  const reveals = document.querySelectorAll(".reveal");
  for (const el of reveals) {
    gsap.to(el, {
      autoAlpha: 1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        once: true,
        start: "top 85%",
        trigger: el,
      },
      y: 0,
    });
  }

  const revealsLeft = document.querySelectorAll(".reveal-left");
  for (const el of revealsLeft) {
    gsap.to(el, {
      autoAlpha: 1,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        once: true,
        start: "top 85%",
        trigger: el,
      },
      x: 0,
    });
  }

  const revealsRight = document.querySelectorAll(".reveal-right");
  for (const el of revealsRight) {
    gsap.to(el, {
      autoAlpha: 1,
      delay: 0.15,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        once: true,
        start: "top 85%",
        trigger: el,
      },
      x: 0,
    });
  }
}

function initBubbleAnimations() {
  const container = document.querySelector(".who-circles");
  const bubbles = document.querySelectorAll(".bubble");

  if (!container || bubbles.length === 0) return;

  const delays = [0, 0.12, 0.24, 0.18];

  bubbles.forEach((el, i) => {
    gsap.to(el, {
      autoAlpha: 1,
      delay: delays[i] || 0,
      duration: 1.1,
      ease: "back.out(1.4)",
      scale: 1,
      scrollTrigger: {
        once: true,
        start: "top 90%",
        trigger: container,
      },
      y: 0,
    });
  });
}
