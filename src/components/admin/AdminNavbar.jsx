import React from 'react'
import { 
  Home, LogIn, UserPlus, Type, Palette, Layers, Star, 
  FileText, HelpCircle, Search, Bell, User 
} from 'lucide-react';

export default function AdminNavbar() {
  return (
    <>
      {/* Header */}
              <header className="bg-white border-b border-gray-200 px-4 py-4 flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 md:z-50 md:sticky md:top-0">
                <div className="relative w-full md:w-1/3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Ctrl + K"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">JWT User</span>
                  </div>
                </div>
              </header>
      
    </>
  )
}
