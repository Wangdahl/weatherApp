import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage'
import ForecastDetailPage from './Pages/ForeCastDetails/ForecastDetails'
import './App.css'

function App() {

  return (
    <>
      <div className='App'>
        <Routes>
          {/* Home page route */}
          <Route path='/' element={<HomePage />} />
          {/* Detail page route */}
          <Route path='/forecast/:dayIndex' element={<ForecastDetailPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
