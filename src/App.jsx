import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import  Venues  from './pages/Venue'
import Login from './pages/Login'
import ProtectedRoute from './layout/protectedRoute'
import PublicRoute from './layout/publicRoute'
import Leads from './pages/Leads'
import Events from './pages/Event'
import Staffs from './pages/Staff'
import AddStaff from './pages/AddStaff'
import AddEvent from './pages/AddEvent'
import AddCategory from './pages/AddCategory'
import Categories from './pages/Categories'

function App() {
  return (
    <BrowserRouter>
      <Routes>

              <Route path="/" element={<LandingPage />} />
              <Route path='/venue' element = {<Venues/>}/>
        <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />

        </Route>
        
        <Route element = {<ProtectedRoute/>}>
              
              <Route path='/leads' element = {<Leads/>} />
              <Route path='/events' element = {<Events/>} />
              <Route path='/staffs' element = {<Staffs/>} />
              <Route path='/staffs/add' element = {<AddStaff/>}/>
              <Route path='/events/add' element = {<AddEvent/>}/>
              <Route path='/categories/add' element = {<AddCategory/>}/>
              <Route path='/categories' element={<Categories/>}/>
     
        </Route>


      </Routes>
    </BrowserRouter>
  )
}

export default App
