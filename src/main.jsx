import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Import your global CSS
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Layout from './layouts/Layouts.jsx';
import HomePage from './Pages/HomePage.jsx';
import About  from './Pages/about.jsx';
import ContactForm from './Pages/Contact.jsx';
import CoursesPage from './Pages/Courses.jsx';
import Dashboard from './Pages/admin/Dashboard.jsx';
import AdminLayouts from './layouts/AdminLayouts.jsx';
import AboutForm from './Pages/admin/AboutFrom.jsx';
import MainSettings from './Pages/admin/MainSettings.jsx';
import HelpCare from './Pages/HalpCenter.jsx';
import PrivacyPolicy from './Pages/PrivacyPolicy.jsx';
// import LoginForm from './components/Login.jsx';
import AddCourseForm from './Pages/admin/AddCourseForm.jsx';
import UserTable from './Pages/admin/UserData.jsx';
import ContactMessage from './Pages/admin/ContactMessage.jsx';
import Enrollments from './Pages/admin/Enrollments.jsx';
import Testimonials from './Pages/testimonials.jsx';
// import CourseTable from './Pages/admin/CourseData.jsx';

// Define your router with routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Main Routes */}
      <Route path="/" element={<Layout />}>
        <Route index={true} element={<HomePage />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<ContactForm />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="helpcare" element={<HelpCare />} />
        <Route path="privacypolicy" element={<PrivacyPolicy />} />
        <Route path="enrollments" element={<Enrollments/>}/>
        {/* <Route path="login" element={<LoginForm/>}/> */}
        <Route path='testimonials' element={<Testimonials/>}/>
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/" element={<AdminLayouts />}>
        <Route index={true} element={<Dashboard/>} />
        <Route path="aboutfrom" element={<AboutForm />} />
        <Route path="settings" element={<MainSettings />} />
        <Route path="user" element={<UserTable/>}/>
        <Route path="courseform" element={<AddCourseForm/>}/>
        <Route path="message" element={<ContactMessage/>}/>
        {/* <Route path="form" element={<Enrollments />}> */}
      </Route>
    </>
  )
);

// Rendering the React app and wrapping it in RouterProvider to enable routing
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
