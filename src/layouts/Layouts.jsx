
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Layout() {
  return (
    <div className=''>
      <Navbar/>
      
      <div className='overflow-hidden'>
            <Outlet />
      </div>
      
      <Footer/>
    </div>
  )
}

export default  Layout;
