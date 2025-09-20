import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Layout from './layouts/Layouts'
import HomePage from './Pages/HomePage'
import { About } from './Pages/about'
import ContactForm from './Pages/Contact'
import CoursesPage from './Pages/Courses'
import Dashboard from './Pages/admin/Dashboard'
import AdminLayouts from './layouts/AdminLayouts'
import AboutForm from './Pages/admin/AboutFrom'
import { Settings } from 'lucide-react'
import MainSettings from './Pages/admin/MainSettings'
import HelpCare from './Pages/HalpCenter'
import PrivacyPolicy from './Pages/PrivacyPolicy'


const router = createBrowserRouter(
  createRoutesFromElements(
<>

        <Route path="/" element={<Layout />}>

          <Route index={true} element={<HomePage/>} />
          
          <Route path='/about' element={<About />} />

          <Route path='/contact' element={<ContactForm/>} />

          <Route path='/courses' element={<CoursesPage/>} />

          <Route path='/helpcare' element={<HelpCare/>}/>

          <Route path='/privacypolicy' element={<PrivacyPolicy/>}/>


        </Route>


        /////////// admin Route
        <Route path='/admin' element={<AdminLayouts/>}>

          <Route index={true} element={<Dashboard/>} />

          <Route path='aboutfrom' element={<AboutForm/>}/>

          <Route path='settings' element={<MainSettings/>}/>

        </Route>
</>
  ))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
