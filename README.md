# Task Dashboard

A minimalist personal task management application built with Vue 3 and Nuxt 3.

## Features

- ✅ Add, complete, edit, and delete tasks
- 📊 Real-time dashboard with task statistics
- 🔍 Filter tasks by All / Active / Completed
- 🌓 Dark mode with system preference detection
- 📱 Responsive design for desktop and mobile
- ✨ Smooth animations and transitions
- 🔌 API integration with JSONPlaceholder for initial data
- 💾 LocalStorage persistence across sessions

## Tech Stack

- **Vue 3** - Progressive JavaScript framework with Composition API
- **Nuxt 3** - Vue.js meta-framework with file-based routing
- **@nuxtjs/color-mode** - Dark mode support with system preference detection
- **TypeScript** - Type-safe JavaScript
- **CSS3** - Modern styling with CSS variables and transitions

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
│   ├── TaskFilter.vue
│   ├── ThemeToggle.vue
│   ├── SummaryCard.vue
│   ├── ProgressBar.vue
│   └── ConfirmModal.vue
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
- **Filter tasks** by All, Active, or Completed status
- Filter buttons show real-time counts for each category
- Mark tasks as complete/incomplete with checkboxes
- Edit tasks inline with keyboard shortcuts (Enter to save, Escape to cancel)
- Delete tasks with confirmation modal
- Empty state message when no tasks match the current filter

### About Page (`/about`)
- Information about the application
- Tech stack details
- Project structure overview

## Features in Detail

### Task Management
- Tasks are stored in reactive state using Vue's Composition API
- State persists across page navigation within the session
- LocalStorage persistence survives browser refreshes
- Initial tasks are loaded from JSONPlaceholder API on first visit
- **Filter tasks** by status: All, Active (incomplete), or Completed
- Real-time count updates for each filter category

### Responsive Design
- Mobile-first approach
- Breakpoint at 768px for tablet/mobile devices
- Touch-friendly interface elements

### Dark Mode
- **System preference detection** - Automatically matches your OS theme
- **Manual toggle** - Click the sun/moon icon in the header to switch themes
- **Persistent preference** - Your choice is saved in localStorage
- **Smooth transitions** - All colors transition smoothly between themes
- **CSS variables** - Consistent theming across all components

### Accessibility
- Keyboard navigation support
- ARIA labels for screen readers
- Focus indicators for interactive elements
- Color is not the sole indicator of status
- High contrast in both light and dark modes

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
