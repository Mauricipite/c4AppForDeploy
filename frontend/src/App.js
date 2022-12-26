import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import LandingPage from './pages/LandingPage'
import AdminDashboard from './pages/AdminDashboard'
import InventoryForm from './pages/InventoryForm'
import InventoryForm2 from './pages/InventoryForm2.jsx'
import UsersInventory from './pages/UsersInventory'
import NotYet from './pages/NotYet'


function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/admin' element={<AdminDashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/new' element={<InventoryForm />} />
            <Route path='/neww' element={<InventoryForm2 />} />
            <Route path='/rent' element={<UsersInventory />} />
            <Route path='/notyet' element={<NotYet />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
