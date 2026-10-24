import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login'
import SignUp from './pages/SignUp'
import RegisterAs from './pages/RegisterAs'
import Dashboard from './pages/Dashboard'
import FindDoctor from './pages/FindDoctor'
import FindClinic from './pages/FindClinic'
import Specialty from './pages/Specialty'
import Marketplace from './pages/Marketplace'
import MyDependents from './pages/MyDependents'
import FindPharmacy from './pages/FindPharmacy'
import Appointment from './pages/Appointment'
import Chat from './pages/Chat'
import MyAccount from './pages/MyAccount'
import Settings from './pages/Settings'
import ChatBot from './components/ChatBot'
import Layout from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/register-as" element={<RegisterAs />} />
          
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/finddoctor" element={<FindDoctor />} />
          <Route path="/findclinic" element={<FindClinic />} />
          <Route path="/specialty" element={<Specialty />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/mydependents" element={<MyDependents />} />
          <Route path="/findpharmacy" element={<FindPharmacy />} />
          <Route path="/appointments" element={<Appointment />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>

      {/* Floating AI Chatbot */}
      <ChatBot />
    </BrowserRouter>
  )
}

export default App