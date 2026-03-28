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
}
