# Ravi's Portfolio Website

A modern, responsive, single-page portfolio built with pure HTML, CSS, and JavaScript.
Deployed on **GitHub Pages** with no frameworks or build tools required.

---

## 📁 Folder Structure

```
ravi-portfolio/
├── index.html        ← Main HTML (all sections)
├── style.css         ← All styles (dark/light mode, glassmorphism)
├── script.js         ← All interactions (typing, scroll reveal, form, etc.)
├── assets/
│   ├── profile.jpg   ← Your profile photo (recommended: 400×400px, square)
│   ├── about.jpg     ← About section image (recommended: 4:5 ratio)
│   ├── project1.jpg  ← Project screenshot
│   ├── project2.jpg
│   ├── project3.jpg
│   ├── project4.jpg
│   └── Ravi_Resume.pdf ← Your resume PDF
└── README.md
```

---

## 🚀 Step-by-Step GitHub Pages Deployment

### Step 1 — Create a GitHub Repository

1. Go to [https://github.com](https://github.com) and sign in.
2. Click **"New"** (top-left green button).
3. Repository name: `ravi-portfolio` (or `yourusername.github.io` for a root domain site).
4. Set visibility to **Public**.
5. Click **"Create repository"**.

---

### Step 2 — Upload Your Files

**Option A — Upload via GitHub UI (easiest)**

1. Open your new repository on GitHub.
2. Click **"uploading an existing file"** (or **Add file → Upload files**).
3. Drag and drop all these files/folders:
   - `index.html`
   - `style.css`
   - `script.js`
   - `assets/` folder (with all images and resume)
4. Add a commit message like `Initial portfolio deploy`.
5. Click **"Commit changes"**.

**Option B — Upload via Git (recommended)**

```bash
# 1. Clone the empty repo
git clone https://github.com/yourusername/ravi-portfolio.git
cd ravi-portfolio

# 2. Copy your portfolio files into this folder

# 3. Add, commit, and push
git add .
git commit -m "Initial portfolio deploy"
git push origin main
```

---

### Step 3 — Enable GitHub Pages

1. In your repository, go to **Settings** (top tab bar).
2. Scroll down to **"Pages"** in the left sidebar.
3. Under **"Source"**, select:
   - Branch: **main**
   - Folder: **/ (root)**
4. Click **Save**.
5. GitHub will show a green banner:
   `"Your site is published at https://yourusername.github.io/ravi-portfolio/"`

> It usually takes **1–3 minutes** for the site to go live.

---

### Step 4 — Add a Custom Domain (Optional)

1. Buy a domain (e.g., `raviportfolio.dev`) from Namecheap, GoDaddy, etc.
2. In your domain's DNS settings, add a **CNAME record**:
   - Name: `www`
   - Value: `yourusername.github.io`
3. In GitHub Pages settings → "Custom domain" → enter your domain.
4. Check **"Enforce HTTPS"**.

---

## ✏️ Customization Guide

### Personal Info
Search for these placeholders in `index.html` and replace them:

| Placeholder              | Replace with              |
|--------------------------|---------------------------|
| `ravi@example.com`       | Your email                |
| `+91 98765 43210`        | Your phone number         |
| `Puducherry, India`      | Your location             |
| `yourusername`           | Your GitHub/social handle |
| `Your University Name`   | Your actual university    |

### Profile Photo
- Replace `assets/profile.jpg` with your photo.
- Recommended: **400×400px**, square crop, good lighting.
- If no photo is provided, a placeholder avatar is shown automatically.

### Resume
- Replace `assets/Ravi_Resume.pdf` with your actual resume PDF.
- The download button in the hero section points to this file.

### Projects
- Add your own screenshots to `assets/project1.jpg` etc.
- Update project titles, descriptions, tech tags, and GitHub/demo links in `index.html`.

### Skills — Adjust Proficiency
In `index.html`, each skill bar has `style="--w:80%"` — change the percentage.

### Contact Form — Enable Email Sending
The form currently uses a `mailto:` fallback. To enable real email sending:

1. Sign up at [Formspree.io](https://formspree.io) (free tier available).
2. Create a form → copy your form ID.
3. In `script.js`, uncomment **OPTION A** and replace `YOUR_FORM_ID`.

---

## 🎨 Theme Customization

All colors are CSS variables in `:root` (top of `style.css`):

```css
--accent-1: #4A90D9;   /* Main blue */
--accent-2: #2563eb;   /* Darker blue */
--accent-3: #60a5fa;   /* Light blue */
```

Change these to any color and the entire site updates instantly.

---

## ✅ Features Checklist

- [x] Dark / Light mode toggle with localStorage persistence
- [x] Typing animation (hero tagline cycles through 6 phrases)
- [x] Scroll reveal animations on all sections
- [x] Animated skill progress bars
- [x] Sticky navbar with active link highlighting
- [x] Mobile-first responsive (tested at 320px–1440px)
- [x] Hamburger menu for mobile
- [x] Glassmorphism cards
- [x] Back-to-top button
- [x] Contact form with client-side validation
- [x] SEO meta tags + Open Graph
- [x] Keyboard accessible (focus-visible outlines)
- [x] Reduced-motion media query respected
- [x] GitHub Pages compatible (no server-side code)

---

## 📄 License

Feel free to use and customize this portfolio for personal use.
Built by Ravi — deployed with ❤️ on GitHub Pages.
