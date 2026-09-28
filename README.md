# Shreya Diwakar | CS Portfolio ✨

An interactive, modern Computer Science developer portfolio built with React 19, Vite, Tailwind CSS, Motion, and canvas animations. 

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

