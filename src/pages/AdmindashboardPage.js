import { useState } from 'react'
import './Admindash.css'
//import Header from './Header'
 import Sidebar from './Sidebar'
 import Home from '../features/admin/components/Admin_dashboard'
 import Navbar from '../features/NavBar/Navbar'

function AdminDashboardPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <>
    <Navbar />
    <div className='grid-container'>
 
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Home />
    </div></>
    
  )
}

export default AdminDashboardPage