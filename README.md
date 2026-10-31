# 🏛️ Punjab's Attire — Official Frontend Repository

Welcome to the official GitHub repository for **Punjab's Attire**, a luxury menswear brand celebrating heritage, sophistication, and modern elegance.

## 🌐 Live Website
* **Production URL:** [https://punjabsattire.in](https://punjabsattire.in)

## 👥 Core Team & Roles
* **Navneet Singh** (Main Lead & Technical Direction)
* **Taran** (Frontend Developer)
* **Paramveer** (Design & Content)
* **Navkiran** (Operations & Non-Tech)

## 🛠️ Tech Stack & Architecture
* **Frontend:** Custom HTML5, Tailwind CSS, JavaScript (Responsive Mobile-First Design)
* **Hosting:** GitHub Pages
* **Domain Management:** GoDaddy (`punjabsattire.in`)
* **Communication & Workflow:** Discord (Connected via GitHub Webhooks for automated push notifications)

## 📁 Project Structure

```text
punjabsattire/
├── src/
│   ├── index.html                  # Master layout template with component includes
│   └── components/                 # Clean modular components
│       ├── seo-head.html           # Meta tags, social cards, Google JSON-LD schema
│       ├── header.html             # Brand logo, name, WhatsApp VIP button
│       ├── hero.html               # Coming soon banner, tagline, countdown & waitlist form
│       ├── about.html              # Brand story, heritage & Pune location info
│       ├── footer.html             # Brand footer, links & copyright
│       └── scripts.html            # JavaScript bundle loaders
├── scripts/
│   └── build.js                    # Zero-dependency HTML compiler (with live --watch)
├── assets/
│   ├── css/
│   │   └── style.css               # Custom CSS styles, color variables & hero background rules
│   ├── images/
│   │   ├── background.jpg          # Desktop background image
│   │   ├── background-mobile.jpg   # Mobile-optimized background image (124 KB)
│   │   ├── favicon.png             # Crisp brand favicon
│   │   └── logo.png                # Official brand logo
│   └── js/
│       ├── config.local.js.example # Local development configuration template
│       └── main.js                 # Client-side form handling and waitlist logic
├── index.html                      # Compiled static production file (auto-generated)
├── package.json                    # Development scripts (build, dev, watch)
└── README.md                       # Project documentation
```

## 🚀 Local Development Setup
To run the landing page locally on your machine:
1. Clone the repository:
   ```bash
   git clone https://github.com/s-navneet/punjabsattire.git
   cd punjabsattire
   ```
2. (Optional) For local form testing, copy `assets/js/config.local.js.example` to `assets/js/config.local.js` and set your local endpoint.

3. **Working with Modular Components (`src/components/`):**
   * Edit any component in `src/components/` (`header.html`, `hero.html`, `about.html`, etc.).
   * Start auto-rebuilding in watch mode:
     ```bash
     npm run dev
     # or: node scripts/build.js --watch
     ```
   * Or build once manually:
     ```bash
     npm run build
     # or: node scripts/build.js
     ```

4. **Running Local Dev Server:**
   * Start a local server:
     ```bash
     npm start
     # or: python3 -m http.server 8000
     ```
   * Open `http://localhost:8000` in your web browser.

5. **VS Code Recommended Setup:**
   * Open the project in VS Code (`code .`).
   * Recommended extensions are pre-configured in `.vscode/extensions.json` (`Prettier`, `Tailwind CSS IntelliSense`, `Live Server`).
   * Press `Cmd+Shift+B` (or `Ctrl+Shift+B`) to run the default build task, or use **Terminal -> Run Task... -> Watch HTML Modules (Live Auto-Rebuild)**.
