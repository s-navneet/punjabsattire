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
├── assets/
│   ├── css/
│   │   └── style.css               # Custom CSS styles, color variables & hero background rules
│   ├── images/
│   │   ├── background.jpg          # Seamless background image (clean center for HTML overlay)
│   │   ├── image0.jpg              # Original design mockup reference
│   │   └── logo.png                # Official brand logo & favicon
│   └── js/
│       ├── config.local.js.example    # Local development configuration template
│       └── main.js                 # Client-side form handling and waitlist logic
├── index.html                      # Main landing page HTML
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
3. Run a local server:
   ```bash
   python3 -m http.server 8000
   ```
4. Open `http://localhost:8000` in your web browser.
