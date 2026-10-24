import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className={sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <Outlet context={[ sidebarOpen, setSidebarOpen ]} />

    </div>
  )
}

export default Layout