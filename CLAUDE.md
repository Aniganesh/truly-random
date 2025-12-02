# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple static website project for "Truly Random" - a personal portfolio/landing page. The entire application is contained in a single `index.html` file with embedded CSS and JavaScript.

## Architecture

- **Single-file architecture**: Everything (HTML, CSS, JavaScript) is contained in `index.html`
- **Frontend-only**: Static website with no backend or build process
- **Features**:
  - Dark/light mode toggle with system preference detection
  - Responsive design with media queries for larger screens
  - Pure vanilla JavaScript for theme switching
  - CSS custom properties for theming

## Development

Since this is a static HTML file, development is straightforward:

- Open `index.html` directly in a browser to view changes
- No build process, package manager, or dependencies required
- All styles are embedded in the `<style>` tag within the HTML
- All JavaScript is embedded in the `<script>` tag within the HTML

## Deployment

This is a static site that can be hosted on any web server or static hosting service. The project contains only the single HTML file that needs to be served.