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
  let accent = [13, 107, 69];
  let paper = [246, 244, 239];
  let drops = [];

  const toRgb = (value) => {
    const hex = value.trim().replace("#", "");
    if (hex.length !== 6) return null;
    return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  };

  const readTheme = () => {
    const styles = getComputedStyle(document.documentElement);
    accent = toRgb(styles.getPropertyValue("--accent")) || accent;
    paper = toRgb(styles.getPropertyValue("--paper")) || paper;
  };

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
    ctx.fillStyle = `rgba(${paper.join(",")}, 0.16)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `bold ${cell}px monospace`;
    for (let i = 0; i < drops.length; i++) {
      const drop = drops[i];
      const y = drop.y * cell;
      ctx.fillStyle = `rgba(${accent.join(",")}, 0.3)`;
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * cell, y - cell * 2);
      ctx.fillStyle = `rgba(${accent.join(",")}, 0.55)`;
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * cell, y - cell);
      ctx.fillStyle = `rgba(${accent.join(",")}, 1)`;
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * cell, y);
      drop.y += drop.speed;
      if (y > canvas.height && Math.random() > 0.975) drop.y = -Math.random() * 20;
    }
    requestAnimationFrame(draw);
  };

  readTheme();
  resize();
  draw();

  window.addEventListener("resize", resize);
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", readTheme);
}
