# Responsive Calculator (Figma to HTML/Tailwind CSS)

## Overview
This project brings a responsive calculator design from Figma to life using HTML and Tailwind CSS, featuring smooth interactivity and a dark/light mode toggle.

## Features
- **Responsive Design**: Adapts to various screen sizes.
- **Dark Mode UI**: Implements the dark theme from the Figma design.
- **Interactive Calculator**: Basic arithmetic operations (addition, subtraction, multiplication, division), percentage, plus/minus, clear, and backspace functionalities.
- **Smooth Transitions**: Enhanced user experience with subtle UI animations.
- **Dark/Light Mode Toggle**: Functionality to switch between dark and light themes (light mode UI to be implemented).

## GitHub Repository
[Figma Calculator Design MCP Test](https://github.com/Shanmus4/Figma-Calculator-Design-MCP-Test)

## Live Demo
(Will be updated with a live demo link once deployed)

## Installation Guide

### 1. Clone the Repository
```bash
git clone <your-repo-link>
cd Figma-MCP-Test # Or whatever your project folder is named
```

### 2. Dependency Setup
This project uses Tailwind CSS via CDN and vanilla JavaScript, so no explicit dependency installation (like `npm install` or `pip install`) is required beyond having Python for a local server.

### 3. Run Locally
To run the project locally, you can use Python's built-in HTTP server:

1.  **Open your terminal** and navigate to the project root directory (`Figma-MCP-Test`).
2.  **Start the HTTP server**: 
    ```bash
    python -m http.server 8000
    ```
    This will serve the project on `http://localhost:8000`.
3.  **Open your web browser** and go to `http://localhost:8000` to view the calculator.

### 4. Deployment
(Deployment instructions will be added here once a deployment platform is chosen, e.g., Vercel, Netlify, Heroku, Railway, etc.)

## How It Works Technically
- **HTML5**: Provides the semantic structure of the calculator UI.
- **Tailwind CSS**: Utility-first CSS framework used via CDN for rapid styling and responsive layout. Custom styles are minimized.
- **Vanilla JavaScript**: Handles all calculator logic, including input processing, arithmetic operations, display updates, and the dark/light mode toggle functionality.
- **CSS Variables**: Used in `style.css` for easy theme switching and maintaining consistency. 