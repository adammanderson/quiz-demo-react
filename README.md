# Quiz UI Demo

## Features

- UI based on wireframing
- Multi-select question support
- Answer selection persists when navigating between questions
- Navigation controls (Previous/Next with proper edge case handling)
- Review & Submit page with answer summary
- Results page with scoring and confirmation message
- Comprehensive unit tests for utilities and UI components

---

## Getting Started

### Prerequisites

- Node.js 22+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Run Tests

```bash
npm test
```

### Build for Production

```bash
npm run build
```

---

## Project Structure

```
src/
├── components/         # React components
│   ├── ui/             # Reusable UI components with tests
│   ├── NavControls.tsx
│   ├── QuestionView.tsx
│   ├── ReviewView.tsx
│   ├── ResultView.tsx
│   └── ...
├── hooks/              # Custom React hooks
│   └── useQuiz.ts
├── state/              # State management (Context + Reducer)
│   ├── quizContext.ts
│   └── quizReducer.ts
├── utils/              # Pure utility functions
│   ├── selection.ts    # Answer selection logic
│   ├── scoring.ts      # Score calculation
│   ├── navigation.ts   # Navigation helpers
│   └── __tests__/      # Unit tests for utils
├── types/              # TypeScript type definitions
└── data.ts             # Static quiz data
```

---

## Time Spent

**Approximately 3 hours** including:

- Initial setup and architecture planning (30 min)
- Component implementation and state management (1.5 hours)
- Utility functions with unit tests (45 min)
- Polish and documentation (15 min)

---

## Trade-offs & Future Improvements

### Trade-offs Made

1. **Context API vs. State Management Library**

   - Used React Context + useReducer for simplicity
   - Works well for this scope; avoids Redux/Zustand overhead

2. **Static JSON Data**

   - Quiz data is imported directly from `data.ts`
   - No API layer or data fetching logic

3. **Inline Styles with Tailwind**

   - Quick styling with utility classes
   - Could be extracted to component-level CSS modules

4. **Basic Accessibility**

   - Added `aria-pressed`, `aria-label` where obvious
   - Full WCAG 2.1 AA compliance would need more audit

### What I Would Improve with More Time

1. **Enhanced Accessibility**

   - Keyboard navigation (Tab, Enter, Space)
   - Focus management when navigating between questions
   - ARIA live regions for dynamic content
   - Screen reader announcements for state changes

2. **Persistence**

   - Save progress to localStorage or sessionStorage
   - Resume quiz on page reload

3. **Animation & Transitions**

   - Smooth transitions between questions
   - Progress bar animation
   - Result animations

4. **Advanced Features**

   - Question types: single-select, text input, drag-and-drop
   - Timer per question or for entire quiz
   - Detailed explanations for correct/incorrect answers
   - Question shuffle and option randomization

5. **Better Error Handling**

   - Loading states with skeleton screens
   - Error boundaries for component failures
   - Graceful degradation if data is malformed

6. **Testing**

   - Integration tests with React Testing Library
   - E2E tests with Playwright or Cypress
   - Visual regression tests

7. **Performance**

   - Code splitting for larger question sets
   - Virtual scrolling for long option lists
   - Memoization optimizations (already used in places)

8. **Analytics**

   - Track time spent per question
   - Track retry attempts
   - Export results as PDF or shareable link

9. **Internationalization**

   - i18n support for multiple languages
   - RTL layout support

10. **Design System**
    - Extract components to a shared library
    - Storybook documentation
    - Design tokens for consistent theming

---

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast dev server and build
- **Tailwind CSS** for styling
- **Vitest** for unit testing
- **React Testing Library** for component tests

---
