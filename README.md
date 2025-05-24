# Rick and Morty Character Gallery

A character gallery from the Rick and Morty universe featuring filtering capabilities and detailed information about each character.

## 🚀 Local Development Setup

### Prerequisites

- Node.js version 14.0.0 or higher
- npm or yarn package manager

### Installation and Running Instructions

1. **Clone the repository:**
```bash
git clone [<repository-url>](https://github.com/TMaltseva/rick-and-morty-app.git)
cd elfsight-test-task
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm start
```

4. **Open your browser and navigate to:**
```
http://localhost:3000
```

### Additional Commands

- **Build for production:**
```bash
npm run build
```

- **Code linting (ESLint + Prettier):**
```bash
npm run lint
```

- **Deploy to GitHub Pages:**
```bash
npm run deploy
```

## ✨ Features

- 📋 Browse Rick and Morty character gallery
- 🔍 Filter by status, gender, species, name, and type
- 📱 Responsive design for all devices
- 🔗 URL synchronization for filters (shareable links)
- 📄 Result pagination
- 📝 Detailed character information in modal window
- 🎬 List of episodes featuring each character

## 🛠 Technologies Used

- React 18
- Styled Components
- Axios
- Rick and Morty API

## 📂 Project Structure

```
src/
├── components/
│   ├── card/          # Character card components
│   ├── common/        # Shared components
│   ├── filters/       # Filtering system
│   ├── header/        # Application header
│   ├── popup/         # Modal window
│   └── providers/     # Context and providers
├── assets/            # Images and icons
└── api-config.js      # API configuration
```

## 🎯 Task Completion Summary

### ✅ Bug Fixes Implemented:
- Fixed infinite loader in popup modal
- Added gender icons next to character names
- Identified and resolved additional application issues

### ✅ New Features Added:
- Implemented character filtering using Rick and Morty API
- Popup modal blocks main window scrolling
- Popup closes on backdrop click and Escape key press
- URL synchronization for filters (shareable filter states)

### ✅ Refactoring Completed:
- Resolved all ESLint errors and warnings
- Removed unused dependencies
- Refactored Card component (split into sub-components)

## 🏗 Architecture Highlights

- **Modern React Patterns**: Utilizes React Hooks and functional components
- **State Management**: Context API for global state management
- **Filter System**: Draft/applied state pattern for better UX
- **Performance**: Memoized components and optimized re-renders
- **Code Quality**: ESLint and Prettier configuration for consistent code style

## 🌐 Online Version

The application is deployed and available online at: **[Will be added after deployment]**

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices

## 🧪 Development Notes

- Uses `react-app-rewired` for custom build configuration
- Styled Components for CSS-in-JS styling approach
- Axios for HTTP requests to Rick and Morty API
- Custom hooks for reusable logic (useUrlSync, useFiltersData, useScrollLock)

---

**Developed as a test assignment for Elfsight**