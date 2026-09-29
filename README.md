# Portfolio

A single-page, **terminal-style** portfolio site. No build step, no dependencies, no framework — just HTML, CSS and vanilla JS.


## About

**Caesarico Bayu Sejati** — twelfth-grade Computer & Network Engineering student at SMK Darma Siswa 1 Waru, Sidoarjo, East Java, Indonesia.

I work on IT infrastructure, Linux system administration, and cybersecurity.

## Contact

| | |
|---|---|
| **Email** | [caesaricob@gmail.com](mailto:caesaricob@gmail.com) |
| **GitHub** | [@AuthenticCaesarSalad](https://github.com/AuthenticCaesarSalad) |

## What I Do

### Systems & Tooling
Linux (Ubuntu, Kali) · Bash / CLI · System administration · Termux

### Networking
Computer networking · Network configuration

### Servers & Virtualization
Virtual machines · Proxmox · Ubuntu Server · Server administration

### DevOps
Docker containerization · Docker Compose · Kubernetes (k3s) · CI/CD pipelines · GitHub Actions · Nginx / reverse proxy

### Security Research
Cybersecurity · Threat analysis · OSINT

## Experience

### Intern — PT E-T-A Indonesia
*Current · 12th grade*

Senior-year internship supporting IT operations, applying networking and system administration skills in a real-world industrial environment.

### Web Developer & Intern — CSRG PENS
*11th grade*

Internship with the Cyber Security Research Group at Politeknik Elektronika Negeri Surabaya (PENS), contributing to their web profile. See [c307.pens.ac.id](https://c307.pens.ac.id).

### Homelab, DevOps & Security Research
*Personal*

Most of my free time goes to Linux: managing virtual machines, containerising services with Docker and Docker Compose, wiring up CI/CD pipelines with GitHub Actions, and building virtual labs to practice server deployment, administration and infrastructure automation.

## Repository Structure

| File | Purpose |
|---|---|
| `index.html` | Page markup and content |
| `style.css` | Terminal theme, responsive layout, reduced-motion handling |
| `index.js` | Scramble headline, typewriter terminal, live clock, scroll reveals, interactive shell |
| `favico.png` | Site favicon (512×512), also used as the apple-touch-icon |
| `.backup/` | The original paper/editorial design, kept for reference |

## Interactive Shell

The contact section has a real command prompt. Supported commands:

`help` · `whoami` · `skills` · `projects` · `exp` · `contact` · `github` · `ls` · `date` · `clear` · `sudo`

Docker &amp; Kubernetes: `docker ps` · `docker images` · `docker version` · `docker compose` · `kubectl get pods` · `kubectl get nodes` (alias `k`)

Aliases: `h`, `me`, `stack`, `work`, `mail`. Use `↑` / `↓` to walk through command history.

## Running Locally

Open `index.html` in any browser, or serve it:

```powershell
python -m http.server 8000
# then visit http://localhost:8000
```
