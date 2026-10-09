import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FindDoctor from './pages/FindDoctor';
import FindClinic from './pages/FindClinic';
import Specialty from './pages/Specialty';
import Marketplace from './pages/Marketplace';
import MyDependents from './pages/MyDependents';
import FindPharmacy from './pages/FindPharmacy';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/finddoctor" element={<FindDoctor />} />
        <Route path="/findclinic" element={<FindClinic />} />
        <Route path="/specialty" element={<Specialty />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/mydependents" element={<MyDependents />} />
        <Route path="/findpharmacy" element={<FindPharmacy />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App