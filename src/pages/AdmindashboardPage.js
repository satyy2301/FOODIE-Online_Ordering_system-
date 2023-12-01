import { useState } from 'react'
import './Admindash.css'
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
    <Navbar>
    <div className='grid-container h-full w-full'>
 
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Home />
      
    </div></Navbar></>
    
  )
}

export default AdminDashboardPage