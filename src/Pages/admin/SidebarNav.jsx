import React from 'react'

import { 
  Home,
  Settings,
  CardSim,
  BookA,
  Book,
  User2,
  SubscriptIcon,
  DollarSign
} from 'lucide-react';
import {Link} from "react-router-dom"

import { FcAbout } from 'react-icons/fc';

export default function SidebarNav() {
  return (
    <>
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white shadow-sm border-r border-gray-200 md:fixed md:h-screen h-110 ">
        {/* Logo */}
        <div className="flex items-center px-4 py-4 border-b border-gray-200">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="text-xl font-semibold text-gray-900 md:pb-2">Mantis</span>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          <div className="px-4 mb-5">
            <Link to="/admin" className="flex items-center px-2 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg mb-1">
              <Home className="w-4 h-4 mr-3" />
              Dashboard
            </Link>
          </div>

          <div className="px-4 mb-5">
            <Link to="/admin/aboutfrom" className="flex items-center px-2 py-2 text-sm font-medium  bg-blue-50 rounded-lg mb-1">
              <FcAbout className="w-4 h-4 mr-3" />
              About
            </Link>
          </div>

          <div className="px-4 mb-5">
            <Link to="settings" className="flex items-center px-2 py-2 text-sm font-medium  bg-blue-50 rounded-lg mb-1">
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </Link>
          </div>

          <div className="px-4 mb-5">
            <a href="#" className="flex items-center px-2 py-2 text-sm font-medium  bg-blue-50 rounded-lg mb-1">
              <Book className="w-4 h-4 mr-3" />
                Courses
            </a>
          </div>

          <div className="px-4 mb-5">
            <a href="#" className="flex items-center px-2 py-2 text-sm font-medium  bg-blue-50 rounded-lg mb-1">
              <User2 className="w-4 h-4 mr-3" />
              User
            </a>
          </div>

          <div className="px-4 mb-5">
            <a href="#" className="flex items-center px-2 py-2 text-sm font-medium  bg-blue-50 rounded-lg mb-1">
              <DollarSign className="w-4 h-4 mr-3" />
                subscription
            </a>
          </div>

        
        </nav>
      </div>
    </>
  )
}
