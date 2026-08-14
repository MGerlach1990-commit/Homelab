# Martin Homelab

A modern, privacy-first website built with Astro. Features a clean design with no cookies, no tracking, and no data collection.

## Tech Stack

- **Astro 7.0.7** - Static site generation
- **TypeScript** - Type safety
- **React Integration** - For future interactive components
- **Node.js** - Runtime environment

## Project Structure

```
src/
+-- assets/
   +-- astro.svg
   +-- background.svg
+-- components/
   +-- TopNav.astro         - Sticky top navigation bar
   +-- BottomNav.astro      - Footer navigation
   +-- Welcome.astro        - Hero section
   +-- ContactDetails.astro - Contact information
   +-- InfoCard.astro       - Info card component
   +-- PolicySection.astro  - Privacy policy section
   +-- StepExplanation.astro- Step-by-step explanation
+-- data/
   +-- deployment.ts        - Deployment data
   +-- privacy.ts           - Privacy policy content
+-- layouts/
   +-- Layout.astro         - Root layout with navigation
+-- lib/
   +-- date.ts              - Date helpers
+-- pages/
   +-- index.astro          - Home page
   +-- about.astro          - About page
   +-- contact.astro        - Contact page
   +-- deployment.astro     - Deployment page
   +-- homelab.astro        - Homelab page
   +-- privacy-policy.astro - GDPR privacy policy
```

##  Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |

##  Privacy

This website collects **no personal data**. There are no cookies, no analytics, and no tracking technologies. Visit completely anonymously.

##  License

All rights reserved &copy; 2026 Martin Homelab
