# Project Planning: Responsive Calculator (Figma to HTML/Tailwind)

## Overview
This project brings a Figma-designed responsive calculator to life using HTML and Tailwind CSS, with smooth interactivity and dark/light mode support.

## Goals
- Faithfully implement the Figma calculator design (dark mode first, light mode to follow)
- Use HTML and Tailwind CSS for layout and styling
- Add smooth, modern interactivity (button presses, calculation logic, transitions)
- Support dark/light mode toggle
- Ensure responsive design for all device sizes

## Tech Stack
- HTML5
- Tailwind CSS (CDN, no build step)
- Vanilla JavaScript (for interactivity and mode toggle)

## Architecture & Structure
- `index.html`: Main entry point, contains calculator markup
- `style.css`: (Optional) For custom styles if needed
- `script.js`: Handles calculator logic and UI interactivity
- All assets and logic are self-contained for easy deployment

## Folder Structure
```
/ (root)
├── index.html
├── style.css
├── script.js
└── AI Assistant Reference/
    ├── PLANNING.md
    └── Tasks/
        ├── planning/
        ├── ongoing/
        └── completed/
```

## Naming Conventions
- Files: kebab-case (e.g., `index.html`, `script.js`)
- CSS classes: Tailwind utility classes, with custom classes in `style.css` if needed
- JavaScript: camelCase for variables/functions

## Workflows
- All new features/ideas are logged as task files in `Tasks/planning/` (with timestamp)
- Tasks move to `Tasks/ongoing/` when started, and to `Tasks/completed/` when finished
- Any changes to features or architecture are reflected in both the relevant task file and this PLANNING.md

## Patterns
- Responsive design using Tailwind's responsive utilities
- Modular, readable code (no file >600 lines)
- No hardcoded secrets or credentials
- .env and AI Assistant Reference/ are .gitignored

## Next Steps
- [x] Create GitHub repository "Figma Calculator Design MCP Test"
- [ ] Implement dark mode calculator UI in HTML/Tailwind
- [ ] Add interactive calculator logic (JS)
- [ ] Implement dark/light mode toggle
- [ ] Document everything in README.md

---
_Last updated: 2024-06-10_ 