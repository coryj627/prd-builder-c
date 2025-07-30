# PRD Builder

A product requirements document builder that simplifies and speeds up creation for users unfamiliar with the product development lifecycle, enabling use with an AI agent.

## Features

### Core Functionality
- 📋 **Multi-step Wizard** - Comprehensive guided process for creating detailed PRDs
- ⚡ **Prototype Path** - Quick 10-question generator for basic PRDs
- 💾 **Session Persistence** - All data automatically saved to local storage
- 📄 **Markdown Export** - Download complete PRDs in markdown format
- 🎨 **AI-Ready Format** - Clear structure, examples, and acceptance criteria

### User Experience
- 🌍 **Full Accessibility** - WCAG 2.2 AA compliant with proper keyboard navigation
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🎨 **Modern UI** - Earth-tone theme with Material-UI components
- ⏭️ **Flexible Navigation** - Skip optional steps, go back to edit, jump between sections

### Technical Features  
- 🚀 Modern React 18 with functional components and hooks
- 🎨 Material-UI (MUI) for beautiful, consistent UI components
- 📁 Well-organized folder structure
- 🔧 Custom hooks for common functionality
- 📱 Responsive design with MUI Grid system
- 🧪 Testing setup with Jest and React Testing Library
- 🔄 Context API for state management
- 📦 Web vitals for performance monitoring

## Folder Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header/
│   │   ├── Header.js
│   │   └── index.js
│   └── FeatureCard/
│       ├── FeatureCard.js
│       └── index.js
├── pages/              # Page-level components
│   └── Home/
│       ├── Home.js
│       └── index.js
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.js
│   └── useApi.js
├── utils/              # Utility functions
│   ├── api.js
│   └── helpers.js
├── context/            # React Context for state management
│   └── AppContext.js
├── theme/              # MUI theme configuration
│   └── theme.js
├── __tests__/          # Test files
│   ├── App.test.js
│   └── setupTests.js
├── App.js              # Main App component
├── App.css             # App component styles
├── index.js            # Application entry point
├── index.css           # Global styles
└── reportWebVitals.js  # Performance monitoring
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure Explanation

### Components
Reusable UI components that can be used throughout the application. Each component has its own folder with the component file, styles, and an index file for clean imports.

### Pages
Page-level components that represent entire pages or views in the application.

### Hooks
Custom React hooks that encapsulate reusable logic and state management.

### Utils
Utility functions and API helpers that can be used across the application.

### Context
React Context providers for global state management.

### Theme
MUI theme configuration with custom colors, typography, and component styles.

## Material-UI (MUI) Integration

This project uses Material-UI for consistent, beautiful UI components. Key features:

- **Theme Provider**: Custom theme with consistent colors and typography
- **Component Library**: Pre-built components like AppBar, Card, Button, etc.
- **Responsive Grid**: MUI Grid system for responsive layouts
- **Icons**: Material Design icons from @mui/icons-material
- **Styling**: Use the `sx` prop for component-specific styles

### Using MUI Components

```jsx
import { Button, Card, Typography } from '@mui/material';
import { Home } from '@mui/icons-material';

function MyComponent() {
  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Hello World
      </Typography>
      <Button variant="contained" startIcon={<Home />}>
        Click Me
      </Button>
    </Card>
  );
}
```

## Customization

1. Create a new folder in `src/components/`
2. Add your component file and index.js
3. Use MUI components and the `sx` prop for styling
4. Import and use in your pages or other components

### Adding New Pages

1. Create a new folder in `src/pages/`
2. Add your page component and index.js
3. Use MUI components for layout and styling
4. Set up routing (if using React Router)

### Environment Variables

Create a `.env` file in the root directory for environment variables:

```
REACT_APP_API_BASE_URL=https://your-api-url.com
```

## Testing

Run tests with:
```bash
npm test
```

The project includes:
- Jest as the test runner
- React Testing Library for component testing
- Setup for DOM testing utilities

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License. 