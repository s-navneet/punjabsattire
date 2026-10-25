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
* **Waitlist Database:** Google Sheets (via Google Apps Script Web App)
* **Hosting:** GitHub Pages
* **Domain Management:** GoDaddy (`punjabsattire.in`)
* **Communication & Workflow:** Discord (Connected via GitHub Webhooks for automated push notifications)

## 📁 Project Structure

```text
punjabsattire/
├── assets/
│   ├── css/
│   │   └── style.css            # Custom CSS styles, color variables & hero background rules
│   ├── images/
│   │   ├── background.jpg       # Seamless background image (with clean center for HTML overlay)
│   │   └── image0.jpg           # Original design mockup reference
│   └── js/
│       └── main.js              # Client-side form handling and Google Sheets waitlist logic
├── index.html                   # Main landing page HTML
└── README.md                    # Project documentation
```

## 📊 Google Sheets Waitlist Setup (100% Free Forever)

To capture customer emails automatically into your private Google Sheet:

1. Open [Google Sheets](https://sheets.new) and create a new sheet (e.g., named **"Punjab's Attire - Waitlist"**).
2. Click **Extensions** > **Apps Script**.
3. Replace any code in the editor with:
   ```javascript
   function doPost(e) {
     try {
       var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
       
       // Ensure header row exists
       if (sheet.getLastRow() === 0) {
         sheet.appendRow(["Timestamp (IST)", "Phone / WhatsApp", "Email", "Status"]);
         sheet.getRange(1, 1, 1, 4).setFontWeight("bold").setBackground("#0b192c").setFontColor("#e5a93c");
       } else if (sheet.getRange(1, 2).getValue() === "Email") {
         // Auto-insert Phone column if upgrading from previous 3-column setup
         sheet.insertColumnBefore(2);
         sheet.getRange(1, 2).setValue("Phone / WhatsApp").setFontWeight("bold").setBackground("#0b192c").setFontColor("#e5a93c");
       }
       
       var phone = (e.parameter && e.parameter.phone) || "";
       var email = (e.parameter && e.parameter.email) || "";
       var timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
       
       if (phone || email) {
         sheet.appendRow([timestamp, phone ? "'" + phone : "", email, "Subscribed"]);
       }
       
       return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
         .setMimeType(ContentService.MimeType.JSON);
     } catch (err) {
       return ContentService.createTextOutput(JSON.stringify({ result: "error", error: err.message }))
         .setMimeType(ContentService.MimeType.JSON);
     }
   }
   ```
4. Click **Deploy** (top right) > **New deployment**.
5. Click the gear icon next to "Select type" and select **Web app**.
6. Set:
   * **Execute as:** *Me*
   * **Who has access:** *Anyone*
7. Click **Deploy**, authorize permissions, and copy the **Web app URL**.
8. **Save as GitHub Secret (Protects from Public Scraping)**:
   * Go to your repository on GitHub: **Settings** > **Secrets and variables** > **Actions**.
   * Click **New repository secret**.
   * Set **Name**: `GOOGLE_SHEET_URL`
   * Set **Value**: Paste your Google Web App URL.
   * Click **Add secret**.
   * On every push to `main`, GitHub Actions automatically and securely injects the secret during deployment—keeping your public git repository completely clean!

## 🚀 Local Development Setup
To run the landing page locally on your machine:
1. Clone the repository:
   ```bash
   git clone https://github.com/s-navneet/punjabsattire.git
   cd punjabsattire
   ```
2. Run a local server:
   ```bash
   python3 -m http.server 8000
   ```
3. Open `http://localhost:8000` in your web browser.
