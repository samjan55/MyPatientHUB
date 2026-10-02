import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import FindDoctor from './pages/FindDoctor'
import FindClinic from './pages/FindClinic'
import Specialty from './pages/Specialty'
import Marketplace from './pages/Marketplace'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/finddoctor" element={<FindDoctor />} />
        <Route path="/findclinic" element={<FindClinic />} />
        <Route path="/specialty" element={<Specialty />} />
        <Route path="/marketplace" element={<Marketplace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App