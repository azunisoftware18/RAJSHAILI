import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Layout from './layouts/Layouts.jsx';
import HomePage from './Pages/HomePage.jsx';
import About from './Pages/about.jsx';
import ContactForm from './Pages/Contact.jsx';
import CoursesPage from './Pages/Courses.jsx';
import Dashboard from './Pages/admin/Dashboard.jsx';
import AdminLayouts from './layouts/AdminLayouts.jsx';
import AboutForm from './Pages/admin/AboutFrom.jsx';
import MainSettings from './Pages/admin/MainSettings.jsx';
import HelpCare from './Pages/HalpCenter.jsx';
import PrivacyPolicy from './Pages/PrivacyPolicy.jsx';
import AddCourseForm from './Pages/admin/AddCourseForm.jsx';
import UserTable from './Pages/admin/UserData.jsx';
import ContactMessage from './Pages/admin/ContactMessage.jsx';
import Enrollments from './Pages/admin/Enrollments.jsx';
import Testimonials from './Pages/testimonials.jsx';
import Login from './Pages/Login.jsx';
import Profile from './Pages/Profile.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'; // ✅ import added

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
        <Route path="enrollments" element={<Enrollments />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* ✅ Protected Admin Routes */}
      <Route
        path="/admin/"
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminLayouts />
          </ProtectedRoute>
        }
      >
        <Route index={true} element={<Dashboard />} />
        <Route path="aboutfrom" element={<AboutForm />} />
        <Route path="settings" element={<MainSettings />} />
        <Route path="user" element={<UserTable />} />
        <Route path="courseform" element={<AddCourseForm />} />
        <Route path="message" element={<ContactMessage />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
