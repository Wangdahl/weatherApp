# Weather App

## Overview
This Weather App demonstrates modern web development practices, built using:

- **React**
- **Redux (Redux Toolkit)**
- **React Router**
- **Vite**
- **CSS**

The application fetches weather data (current weather, a 5-day forecast, and detailed hourly forecasts) using the **Tomorrow.io API**. The design prioritizes a mobile-first approach.

## Folder Structure
```
weather-app/
├── node_modules/            # Installed dependencies (auto-generated)
├── public/
├── src/
│   ├── assets/              # (images, icons, etc.)
│   ├── main.jsx             # Entry point for React
│   ├── app.jsx              # Main App component
│   ├── app.css              # Global app styles
│   ├── main.css             # Additional global styles
│   ├── Components/
│   │   ├── CurrentWeather/
│   │   │   ├── CurrentWeather.jsx
│   │   │   └── CurrentWeather.css
│   │   ├── ForecastDayCard/
│   │   │   ├── ForecastDayCard.jsx
│   │   │   └── ForecastDayCard.css
│   │   ├── ForecastList/
│   │   │   ├── ForecastList.jsx
│   │   │   └── ForecastList.css
│   │   ├── SearchBar/
│   │   │   ├── SearchBar.jsx
│   │   │   └── SearchBar.css
│   │   └── Spinner/
│   │       ├── Spinner.jsx
│   │       └── Spinner.css
│   ├── Pages/
│   │   ├── HomePage/
│   │   │   ├── HomePage.jsx
│   │   │   └── HomePage.css
│   │   └── ForecastDetailPage/
│   │       ├── ForecastDetailPage.jsx
│   │       └── ForecastDetailPage.css
│   └── redux/
│       ├── weatherSlice.js    # Redux slice for weather API calls and state
│       └── store.js           # Redux store configuration
├── index.html                 # Main HTML file
├── .env                       # Environment variables (API keys)
├── .gitignore                 # Git ignore file
├── package.json               # Project metadata, scripts, dependencies
├── package-lock.json          
├── vite.config.js             # Vite configuration
└── README.md                  # Project documentation (this file)
```

## Installation

### 1. Clone the Repository
```bash
git clone https://your-repo-url.git
```

### 2. Navigate to the Project Directory
```bash
cd weather-app
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure API Key
Create a `.env` file in the root directory:

```env
VITE_TOMORROW_API_KEY=your_api_key_here
```

### 5. Run Development Server
```bash
npm run dev
```

## Usage

### Search Weather
- Enter a city, area, or ZIP code in the **Search Bar** on the Home Page to get current weather and a 5-day forecast.

### View Hourly Forecast
- Click a forecast day from the **5-day forecast** to view hourly details.

### Responsive Design
- Optimized for mobile; scales seamlessly to larger screens.

## Deployment

Build the production-ready app:
```bash
npm run build
```
Deploy the generated `dist` folder using your preferred hosting service (e.g., Netlify).

## Technologies
- React
- Redux (Redux Toolkit)
- React Router
- Vite
- CSS
- Tomorrow.io API
