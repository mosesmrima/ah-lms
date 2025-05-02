# Africa Tech Learning Management System (LMS)

This is a comprehensive Learning Management System (LMS) for Africa Tech, built with [Next.js](https://nextjs.org) and TypeScript.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Architecture

### Tech Stack
- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: 
  - @headlessui/react for accessible UI components (modals, dropdowns)
  - @heroicons/react for icons

### Directory Structure
- `/src`: Main source code
  - `/api`: API client and service functions
  - `/components`: Reusable UI components
    - `/home`: Homepage-specific components
    - `/layout`: Layout components (Navbar, Footer)
    - `/modals`: Modal components (Login, Signup)
  - `/constants`: Application constants
  - `/hooks`: Custom React hooks
  - `/pages`: Next.js page components
  - `/styles`: Global styles and Tailwind configuration

## Component Structure

### Layout Components
- **Navbar**: Navigation bar with responsive design, includes login/signup modals
- **Footer**: Site footer with navigation links and contact information

### Home Page Components
- **HeroSection**: Main banner with CTA buttons and image (two-column grid layout)
- **DealsSection**: Highlights special offers using custom card components
- **PopularCoursesSection**: Displays course cards in a grid layout
- **WhyChooseUsSection**: Features section with icons and explanations
- **FAQSection**: Collapsible FAQ items

### Pages
- **Home**: Main landing page
- **Happenings**: Events and updates page with:
  - Hero section
  - Partners section
  - Upcoming Events section
  - Other Updates section (Update cards and X Feeds)

### Authentication
- **LoginModal**: Popup modal with email/username and password fields
- **SignUpModal**: Registration modal with email, full name, and password fields

## Development Guidelines

### TypeScript Path Aliases
The project uses TypeScript path aliases for cleaner imports. Always use the `@/` prefix instead of relative paths:

```typescript
// Good
import { Component } from '@/components/Component';

// Avoid
import { Component } from '../../components/Component';
```

### Component Development
1. Create new components in the appropriate directory
2. Define TypeScript interfaces for all component props
3. Follow the existing styling patterns with Tailwind CSS
4. Ensure components are responsive (mobile-first approach)

### Styling
- Use Tailwind CSS classes for styling
- For the brand color scheme, use:
  - Primary red: #E7343A (for buttons and highlights)
  - Dark background: black (for main background)

### State Management
- Use React hooks for local state management
- Custom hooks are available in the `/hooks` directory:
  - `useScrollPosition`: Track scroll position
  - `useLocalStorage`: Persist data in localStorage

## API Integration
API client functions are located in the `/api` directory:
- `client.ts`: Base API client setup
- `courses.ts`: Course-related API functions

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Headless UI Documentation](https://headlessui.com/)

## Deployment

The application is configured for deployment on Vercel:

```bash
npm run build
# or
yarn build
```

Check out [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
