# RITVerse Frontend

A beautiful, space-themed frontend application for the RITVerse career exploration quiz. Discover your unique Explorer Pass through an engaging quiz experience!

## Features

- 🚀 **Stunning Landing Page** - Animated space theme with floating planets
- 📝 **Interactive Quiz** - Smooth question flow with progress tracking
- 👤 **Student Profile Form** - Clean, validated form for student information
- 🎫 **Explorer Pass Display** - Animated, celebratory pass reveal with traits and skills
- ✨ **Modern UI/UX** - Beautiful gradients, animations, and responsive design
- 🌌 **Space Theme** - Immersive cosmic experience throughout

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
ritverse-frontend/
├── src/
│   ├── components/
│   │   ├── LandingPage.jsx      # Landing page with space theme
│   │   ├── Quiz.jsx              # Quiz question interface
│   │   ├── StudentProfile.jsx    # Student information form
│   │   └── ExplorerPass.jsx      # Final pass display
│   ├── services/
│   │   └── api.js                # API service layer
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # React entry point
│   ├── App.css                   # App styles
│   └── index.css                 # Global styles
├── index.html                    # HTML template
├── package.json                  # Dependencies
├── vite.config.js               # Vite configuration
└── README.md                     # This file
```

## API Integration

The frontend connects to the RITVerse Backend API at:
- Base URL: `https://students-persona-backend.onrender.com`

### Endpoints Used

- `GET /question/start` - Fetch quiz questions
- `POST /quiz/submit` - Submit quiz answers and get explorer pass

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling with animations and gradients
- **Google Fonts** - Orbitron & Space Grotesk fonts

## Features in Detail

### Landing Page
- Animated starfield background
- Floating planet decorations
- Smooth entrance animations
- Call-to-action button

### Quiz Interface
- Progress bar showing completion
- Planet category badges
- Single and multi-select question support
- Navigation between questions
- Answer validation

### Student Profile
- Form validation
- Error messages
- Responsive grid layout
- Loading states

### Explorer Pass
- Celebration animations
- Animated badge reveal
- Power traits display
- Fun skills showcase
- Share functionality
- Restart option

## Customization

### Changing API URL

Edit `src/services/api.js`:
```javascript
const API_BASE_URL = 'your-api-url-here';
```

### Styling

All styles are in CSS files. Main color variables are defined in `src/index.css`:
- `--space-dark`: Main background
- `--space-blue`: Primary blue
- `--space-purple`: Purple accent
- `--gradient-1`, `--gradient-2`, `--gradient-3`: Gradient combinations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is part of the RITVerse application.

