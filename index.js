/* ═══════════════════════════════════════════════════════
   TERMINAL PORTFOLIO — behaviour
   ═══════════════════════════════════════════════════════ */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── footer year ─────────────────────────────────────── */
document.getElementById("year").textContent = new Date().getFullYear();

/* ── live clock in the terminal header ───────────────── */
(function clock() {
  const el = document.getElementById("clock");
  if (!el) return;
  const tick = () => {
    const d = new Date();
    el.textContent =
      String(d.getHours()).padStart(2, "0") + ":" +
      String(d.getMinutes()).padStart(2, "0");
  };
  tick();
  setInterval(tick, 15000);
})();

/* ── scroll reveal ───────────────────────────────────── */
(function reveals() {
  const blocks = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    blocks.forEach((b) => b.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  blocks.forEach((b) => io.observe(b));
})();

/* ── headline scramble/decode ────────────────────────── */
(function scramble() {
  const el = document.querySelector("[data-scramble]");
  if (!el || reduceMotion) return;
  const final = el.dataset.scramble;
  const glyphs = "!<>-_\\/[]{}—=+*^?#01ABCDEFabcdef$%&";
  let frame = 0;

  const render = (text) => {
    el.textContent = text;
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.textContent = ".";
    el.appendChild(dot);
  };

  const run = () => {
    let done = true;
    let out = "";
    for (let i = 0; i < final.length; i++) {
      const settleAt = i * 1.5;
      if (frame >= settleAt || final[i] === " ") {
        out += final[i];
      } else if (frame < settleAt + 8) {
        done = false;
        out += glyphs[Math.floor(Math.random() * glyphs.length)];
      } else {
        out += final[i];
      }
    }
    render(out);
    frame++;
    if (!done) requestAnimationFrame(run);
    else render(final);
  };

  render("");
  setTimeout(() => requestAnimationFrame(run), 260);
})();

/* ── hero terminal typewriter ────────────────────────── */
(function typewriter() {
  const body = document.querySelector(".term-body");
  if (!body || reduceMotion) return;

  const nodes = [...body.children];
  const saved = nodes.map((n) => n.innerHTML);
  nodes.forEach((n) => {
    n.style.visibility = "hidden";
  });

  const typeCommand = (node, html, done) => {
    // Only the .cmd text is typed; prompt + cursor stay put.
    const cmdEl = node.querySelector(".cmd");
    const text = cmdEl.textContent;
    cmdEl.textContent = "";
    node.style.visibility = "visible";
    let i = 0;
    const step = () => {
      cmdEl.textContent = text.slice(0, ++i);
      if (i < text.length) setTimeout(step, 26 + Math.random() * 34);
      else setTimeout(done, 220);
    };
    setTimeout(step, 120);
  };

  const show = (node, ms, next) => setTimeout(() => {
    node.style.visibility = "visible";
    next();
  }, ms);

  const play = (index) => {
    if (index >= nodes.length) {
      nodes.forEach((n, i) => {
        n.style.visibility = "visible";
        n.innerHTML = saved[i];
      });
      return;
    }
    const node = nodes[index];
    if (node.classList.contains("line")) {
      typeCommand(node, saved[index], () => play(index + 1));
    } else {
      show(node, 150, () => play(index + 1));
    }
  };

  // Wait until the hero is on screen, then play once.
  const start = () => play(0);
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        if (entries[0].isIntersecting) { obs.disconnect(); setTimeout(start, 350); }
      },
      { threshold: 0.2 }
    );
    io.observe(body);
  } else {
    start();
  }
})();

/* ── interactive shell ───────────────────────────────── */
(function shell() {
  const form = document.getElementById("shell-form");
  const input = document.getElementById("shell-cmd");
  const out = document.getElementById("shell-out");
  if (!form || !input || !out) return;

  const history = [];
  let hIndex = -1;

  const write = (text, cls) => {
    const line = document.createElement("div");
    if (cls) line.className = cls;
    line.textContent = text;
    out.appendChild(line);
    out.scrollTop = out.scrollHeight;
  };

  // Aligned fixed-width table (docker ps / kubectl get …)
  const table = (rows) => {
    const widths = rows[0].map((_, c) =>
      Math.max(...rows.map((r) => String(r[c]).length))
    );
    const block = document.createElement("div");
    block.className = "tbl";
    block.textContent = rows
      .map((r) =>
        r
          .map((cell, c) =>
            c === r.length - 1 ? String(cell) : String(cell).padEnd(widths[c])
          )
          .join("  ")
      )
      .join("\n");
    out.appendChild(block);
    out.scrollTop = out.scrollHeight;
  };

  const dockerPs = () =>
    table([
      ["CONTAINER ID", "IMAGE", "COMMAND", "CREATED", "STATUS", "PORTS", "NAMES"],
      ["9f2c1a7b4d3e", "nginx:1.27", '"/docker-entrypoint…"', "3 weeks ago", "Up 3 weeks", "80/tcp, 443/tcp", "edge-proxy"],
      ["1c8b042f7a9d", "portainer/portainer-ce", '"portainer -H unix:…"', "5 weeks ago", "Up 5 weeks", "9443/tcp", "portainer"],
      ["7d3b1e80c2af", "pihole/pihole:latest", '"/start.sh"', "2 months ago", "Up 2 months", "53/tcp, 53/udp", "pi-hole"],
      ["0c2be441a9f8", "traefik:v3.1", '"/entrypoint.sh tr…"', "2 months ago", "Up 2 months", "80/tcp, 8080/tcp", "ingress"],
      ["a1f90c2d3b4e", "ghcr.io/caesarico/api:prod", '"node dist/main.js"', "4 hours ago", "Up 4 hours", "3000->80/tcp", "web-profile"],
    ]);

  const dockerImages = () =>
    table([
      ["REPOSITORY", "TAG", "IMAGE ID", "CREATED", "SIZE"],
      ["nginx", "1.27", "6a2f9c1b", "3 weeks ago", "188MB"],
      ["traefik", "v3.1", "0c2be441", "2 months ago", "112MB"],
      ["pihole/pihole", "latest", "7d3b1e80", "2 months ago", "426MB"],
      ["ghcr.io/caesarico/api", "prod", "a1f90c2d", "4 hours ago", "94.2MB"],
      ["portainer/portainer-ce", "latest", "1c8b042f", "5 weeks ago", "204MB"],
    ]);

  const kubectl = (args = []) => {
    const [verb, resource] = args;
    const res = (resource || "").toLowerCase();
    if (verb !== "get")
      return ["kubectl: only `get` is wired up here. try `kubectl get pods`."];
    if (/^(pods?|po)$/.test(res))
      return table([
        ["NAMESPACE", "NAME", "READY", "STATUS", "RESTARTS", "AGE"],
        ["ingress-nginx", "nginx-ingress-7f9c4b-x2kq", "1/1", "Running", "0", "21d"],
        ["default", "web-profile-6d8f9c7b5d-p4mn", "1/1", "Running", "0", "4h"],
        ["default", "redis-0", "1/1", "Running", "0", "6d"],
        ["kube-system", "coredns-5d78c9869d-rt4w", "1/1", "Running", "0", "31d"],
        ["monitoring", "grafana-5b7c9d6f4-k8zq", "1/1", "Running", "0", "12d"],
      ]);
    if (/^no(de|des)?$/.test(res))
      return table([
        ["NAME", "STATUS", "ROLES", "AGE", "VERSION"],
        ["homelab-master", "Ready", "control-plane", "31d", "v1.30.4"],
        ["homelab-worker-1", "Ready", "<none>", "31d", "v1.30.4"],
        ["homelab-worker-2", "Ready", "<none>", "28d", "v1.30.4"],
      ]);
    return [
      `error: the server doesn't have a resource type "${res}" — try: pods, nodes`,
    ];
  };

  const commands = {
    help: () => [
      "available commands:",
      "  whoami        who is talking",
      "  skills        tech stack overview",
      "  projects      what I have built",
      "  exp           work experience",
      "  contact       how to reach me",
      "  github        open my GitHub",
      "  docker ps     running containers in the homelab",
      "  docker images pulled images",
      "  kubectl get   pods / nodes on the k3s cluster",
      "  date          current date & time",
      "  clear         wipe the screen",
    ],
    whoami: () => [
      "caesarico.bayu — 12th grade, Computer & Network Engineering",
      "SMK Darma Siswa 1 Waru, Sidoarjo, East Java, Indonesia",
    ],
    skills: () => [
      "systems     linux (ubuntu, kali) · bash/cli · sysadmin · termux",
      "networking  tcp/ip · vlan/routing · firewall rules · DNS",
      "servers     virtualization · proxmox · ubuntu server · ssh hardening",
      "devops      docker/containers · kubernetes · ci/cd · github actions · nginx",
      "security    threat analysis · OSINT · wireshark · nmap",
    ],
    projects: () => [
      "[prod] csrg/web-profile   — CSRG PENS web profile → c307.pens.ac.id",
      "[24/7] ~/homelab          — proxmox + ubuntu + kali + docker compose",
      "[git ] infra/pipelines    — dockerised services, CI/CD, zero-downtime",
      "[lab ] netlab/topologies  — routing, vlan, firewall, threat models",
    ],
    exp: () => [
      "a1f90c2  Intern @ PT E-T-A Indonesia          2026 — present",
      "7d3b1e8  Web Developer & Intern @ CSRG PENS   2024 — 2025",
      "0c2be44  Homelab, DevOps & Security @ localhost  2022 — present",
    ],
    contact: () => [
      "mail    caesaricob@gmail.com",
      "github  github.com/AuthenticCaesarSalad",
      "web     projek-bayu.my.id",
    ],
    github: () => {
      window.open("https://github.com/AuthenticCaesarSalad", "_blank", "noopener");
      return ["opening github.com/AuthenticCaesarSalad …"];
    },
    sudo: () => ["nice try. you are not in the sudoers file. this incident will be reported. ;)"],
    ls: () => ["about/  projects/  stack/  experience/  contact/"],
    date: () => [new Date().toString()],

    docker: (args) => {
      const sub = args[0];
      if (!sub)
        return ["usage: docker <ps | images | version>", "", "try: docker ps"];
      if (/^(ps|container ls|ls)$/.test(sub)) return dockerPs();
      if (sub === "images" || sub === "image") return dockerImages();
      if (sub === "version" || sub === "--version")
        return table([
          ["CLIENT", "SERVER"],
          ["Docker version 27.1.1, build 1c8b042f", "Docker version 27.1.1, api 1.47 (ubuntu.server)"],
        ]);
      if (sub === "compose")
        return [
          "docker compose — 4 projects running",
          "  ~/homelab/edge            up  3 services",
          "  ~/homelab/monitoring      up  2 services",
          "  ~/infra/web-profile       up  2 services",
          "  ~/infra/pi-hole           up  1 service",
        ];
      return [`docker '${sub}': permission denied — is the docker socket mounted?`];
    },

    kubectl: (args) => kubectl(args),
    k: (args) => kubectl(args),
    kubeadm: () => ["kubeadm is not installed here — the cluster runs on k3s."],

    clear: "clear",
  };

  const aliases = { h: "help", me: "whoami", stack: "skills", work: "exp", mail: "contact", exit: "help" };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const raw = input.value.trim();
    if (!raw) return;
    history.push(raw);
    hIndex = history.length;

    write("$ " + raw);
    input.value = "";

    const [name, ...rest] = raw.toLowerCase().split(/\s+/);
    const key = aliases[name] || name;

    if (key === "cd") {
      write(rest.length ? rest.join(" ") + ": no such directory — try the sections above" : "usage: cd <section>", "err");
      return;
    }

    // Two-word commands first: "docker ps", "docker images", "kubectl get" …
    const compound = commands[key] ? key + " " + (rest[0] || "") : null;
    const target =
      compound && commands[compound] ? compound
      : commands[key] ? key
      : null;

    if (!target) {
      write(key + ": command not found. type 'help' for a list.", "err");
      return;
    }
    const cmd = commands[target];
    if (cmd === "clear") { out.textContent = ""; return; }

    const args = target === key ? rest : rest.slice(1);
    const result = typeof cmd === "function" ? cmd(args, raw) : cmd;
    (Array.isArray(result) ? result : [result]).forEach((l) => write(l));
  });

  // ↑ / ↓ through history
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      hIndex = Math.max(0, hIndex - 1);
      input.value = history[hIndex] ?? "";
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      hIndex = Math.min(history.length, hIndex + 1);
      input.value = history[hIndex] ?? "";
    }
  });
})();
