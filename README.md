# Royal Doves Hotel · Website

A five-page website for a luxury hotel, with a 3D hero, room pages and a step-by-step booking flow.

Built by Caleb Samson Etekpe ([Kaliv Digitals](https://github.com/etekpecaleb-hue)).

## Features

- **Pages:** Home, Rooms, Booking, Gallery and Contact, with client-side routing (React Router).
- **Rooms:** four room types, from Classic Room to Royal Penthouse, each with a photo carousel, amenities and nightly price.
- **Booking in four steps:** choose a room, pick check-in and check-out dates, enter guest details, then review and confirm. Each step is validated before you can move on (dates in the right order, a valid email, required fields), with toast messages explaining what's missing, and a summary with the total before you confirm.
- **3D hero:** a Three.js scene rendered with WebGL, with GSAP and Framer Motion for page and scroll animation.
- **Responsive:** built mobile-first with Tailwind CSS.

> The booking flow is a front-end demo. No payment is taken and nothing is sent to a server.

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS · Three.js · GSAP · Framer Motion · React Router · date-fns · react-datepicker

## Run it locally

```bash
npm install
npm run dev       # local dev server
npm run build     # production build in dist/
npm run preview   # serve the production build
```

## Project structure

| Folder | What it holds |
| --- | --- |
| `src/pages/` | Home, Rooms, Booking, Gallery and Contact pages |
| `src/components/` | Navbar, footer, 3D hero, room cards, carousel, page loader |
| `src/utils/data.ts` | Room types, prices and guest reviews |
