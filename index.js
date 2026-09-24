document.getElementById("year").textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const sections = document.querySelectorAll(".reveal");

if (reduceMotion) {
  sections.forEach((section) => section.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  sections.forEach((section) => observer.observe(section));
}

const canvas = document.querySelector(".matrix");
const ctx = canvas ? canvas.getContext("2d") : null;

if (canvas && ctx && !reduceMotion) {
  const cell = 16;
  const chars = "01<>{}[]/\\$#%&*+=";
  let drops = [];

  const resize = () => {
    // ponytail: 1x backing store, soft glyphs on HiDPI. Multiply by devicePixelRatio if it looks blurry.
    canvas.width = Math.ceil(window.innerWidth);
    canvas.height = Math.ceil(window.innerHeight);
    const columns = Math.ceil(canvas.width / cell);
    drops = Array.from({ length: columns }, () => ({
      y: Math.random() * -60,
      speed: 0.35 + Math.random() * 1.4,
    }));
  };

  const draw = () => {
    const paperR = getComputedStyle(document.documentElement).getPropertyValue("--paper-r").trim();
    const paperG = getComputedStyle(document.documentElement).getPropertyValue("--paper-g").trim();
    const paperB = getComputedStyle(document.documentElement).getPropertyValue("--paper-b").trim();
    const accentR = getComputedStyle(document.documentElement).getPropertyValue("--accent-r").trim();
    const accentG = getComputedStyle(document.documentElement).getPropertyValue("--accent-g").trim();
    const accentB = getComputedStyle(document.documentElement).getPropertyValue("--accent-b").trim();

    ctx.fillStyle = `rgba(${paperR},${paperG},${paperB}, 0.16)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `bold ${cell}px monospace`;
    for (let i = 0; i < drops.length; i++) {
      const drop = drops[i];
      const y = drop.y * cell;
      ctx.fillStyle = `rgba(${accentR},${accentG},${accentB}, 0.3)`;
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * cell, y - cell * 2);
      ctx.fillStyle = `rgba(${accentR},${accentG},${accentB}, 0.55)`;
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * cell, y - cell);
      ctx.fillStyle = `rgba(${accentR},${accentG},${accentB}, 1)`;
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * cell, y);
      drop.y += drop.speed;
      if (y > canvas.height && Math.random() > 0.975) drop.y = -Math.random() * 20;
    }
    requestAnimationFrame(draw);
  };

  resize();
  draw();

  window.addEventListener("resize", resize);
}
