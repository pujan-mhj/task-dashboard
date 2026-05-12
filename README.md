# Task Dashboard

A minimalist personal task management application built with Vue 3 and Nuxt 3.

## Features

- ✅ Add, complete, and delete tasks
- 📊 Real-time dashboard with task statistics
- 📱 Responsive design for desktop and mobile
- ✨ Smooth animations and transitions
- 🔌 API integration with JSONPlaceholder for initial data

## Tech Stack

- **Vue 3** - Progressive JavaScript framework with Composition API
- **Nuxt 3** - Vue.js meta-framework with file-based routing
- **TypeScript** - Type-safe JavaScript
- **CSS3** - Modern styling with transitions and animations

## Project Structure

```
task-dashboard/
├── pages/              # File-based routing
│   ├── index.vue      # Dashboard page
│   ├── tasks.vue      # Tasks management page
│   └── about.vue      # About page
├── components/         # Reusable Vue components
│   ├── AppHeader.vue
│   ├── TaskInput.vue
│   ├── TaskItem.vue
│   ├── TaskList.vue
│   ├── SummaryCard.vue
│   └── ProgressBar.vue
├── composables/        # Shared reactive state
│   └── useTasks.ts    # Task management logic
├── layouts/            # Application layouts
│   └── default.vue
├── assets/             # Global styles
│   └── css/
│       └── main.css
└── nuxt.config.ts      # Nuxt configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd task-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit: `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build

## Usage

### Dashboard Page (`/`)
- View total tasks, completed tasks, and pending tasks
- See completion percentage with a visual progress bar
- All statistics update in real-time

### Tasks Page (`/tasks`)
- Add new tasks using the input field
- Mark tasks as complete/incomplete with checkboxes
- Delete tasks with the delete button
- Empty state message when no tasks exist

### About Page (`/about`)
- Information about the application
- Tech stack details
- Project structure overview

## Features in Detail

### Task Management
- Tasks are stored in reactive state using Vue's Composition API
- State persists across page navigation within the session
- Initial tasks are loaded from JSONPlaceholder API

### Responsive Design
- Mobile-first approach
- Breakpoint at 768px for tablet/mobile devices
- Touch-friendly interface elements

### Accessibility
- Keyboard navigation support
- ARIA labels for screen readers
- Focus indicators for interactive elements
- Color is not the sole indicator of status

### Animations
- Smooth page transitions
- Task list animations (add/remove)
- Hover effects on interactive elements
- Progress bar animation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Author

Built as a demonstration project for Vue 3 + Nuxt 3 development.
