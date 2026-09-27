# Shreya Diwakar | CS Portfolio ✨

An interactive, modern Computer Science developer portfolio built with React 19, Vite, Tailwind CSS, Motion, and canvas animations. Featuring soft pastel aesthetics, physics-repelling floating CS background elements, custom neon cursor, interactive terminal, virtual sound keyboard, unfolding bento boxes, zoom-scroll projects, and an in-browser portfolio customizer.

---

## 🌟 Key Features

- **Soft Pastel Light & Glassmorphism Design**: Curated color palette with clean modern typography, backdrop blurs, and responsive cards.
- **Physics-Repelling Background**: Floating computer science symbols, binary beads, and syntax nodes that repel from the cursor interactively with customizable physics force.
- **Custom Neon Trail Cursor**: Smooth, glowing cursor trail with toggle controls.
- **Unfolding Bento Sections**: Scroll-linked unfolding cards highlighting education, research interests, and stats.
- **Interactive Mechanical Data Keyboard**: Playable virtual keyboard with sound feedback and animated keycaps.
- **Interactive CS Terminal**: Command-line interface with custom commands (`help`, `skills`, `projects`, `contact`, `clear`, `matrix`, `easteregg`).
- **Zoom & Scroll Project Gallery**: Detailed showcases with tech badges, GitHub links, and live demos.
- **Painting Corner**: Creative canvas corner showcasing artistic pursuits alongside engineering.
- **Resume Viewer Modal**: Built-in resume preview and download modal.
- **Live In-Browser Customizer**: Edit profile bio, tags, social links, and projects in real time with `localStorage` persistence.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/) (Framer Motion)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Effects**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **AI Integration**: [@google/genai](https://www.npmjs.com/package/@google/genai)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) and `npm` installed on your machine.

### Installation

1. **Clone or navigate to the repository:**
   ```bash
   cd Shreya-deployed
   ```

2. **Install dependencies:**
   > **Note:** If you see `'vite' is not recognized as an internal or external command`, it means dependencies haven't been installed yet. Run:
   ```bash
   npm install
   ```

3. **Set up environment variables (optional):**
   Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your `GEMINI_API_KEY` if utilizing Gemini AI features.

4. **Start the development server:**
   ```bash
   npm start
   # or
   npm run dev
   ```

5. **Open in browser:**
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm install` | Installs all required project dependencies |
| `npm start` | Starts the Vite dev server on port `3000` (host `0.0.0.0`) |
| `npm run dev` | Alias for `npm start` |
| `npm run build` | Compiles and bundles production-ready assets into `dist/` |
| `npm run preview` | Locally preview the production build |
| `npm run clean` | Cleans previous build artifacts (`dist/`) |

---

## 📂 Project Structure

```text
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── package.json                # Project dependencies and scripts
├── .env.example                # Sample environment variables
├── src/
│   ├── main.jsx                # React root bootstrap
│   ├── App.jsx                 # Main application layout & global state
│   ├── index.css               # Base Tailwind CSS rules
│   ├── data/
│   │   └── portfolioData.js    # Profile details, projects, skills, education
│   └── components/
│       ├── Navbar.jsx          # Header navigation bar
│       ├── HeroSection.jsx     # Hero headline and quick CTAs
│       ├── NeonCursor.jsx      # Dynamic glowing neon cursor trail
│       ├── DriftingElementsCanvas.jsx # Interactive physics floating particles
│       ├── UnfoldingBentoSection.jsx  # Bento grid showcase
│       ├── InteractiveTerminal.jsx    # Terminal emulator
│       ├── InteractiveDataKeyboard.jsx# Playable sound keyboard
│       ├── ProjectsSection.jsx # Project showcase cards & filters
│       ├── SkillsMatrix.jsx    # Categorized skill badges
│       ├── PaintingCornerSection.jsx # Artistic / creative gallery
│       ├── ResumeModal.jsx     # Resume preview dialog
│       ├── PortfolioCustomizerModal.jsx # Live in-browser profile editor
│       └── ...
```

---

## ✏️ Customization

To personalize the information shown on the portfolio:
1. Edit [src/data/portfolioData.js](src/data/portfolioData.js) to update default bio, education, experience, skills, and projects.
2. Or click the **Settings / Customize** floating button on the live site to modify values directly in the browser.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
