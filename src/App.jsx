import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import  Venues  from './pages/Venue'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/venue' element = {<Venues/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
