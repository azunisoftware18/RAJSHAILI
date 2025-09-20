import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-6">
          
          {/* Stats Cards */} 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Page Views', value: '4,42,236', percent: '59.3%', color: 'blue', extra: '35,000' },
              { label: 'Total Users', value: '78,250', percent: '70.5%', color: 'green', extra: '8,900' },
              { label: 'Total Order', value: '18,800', percent: '27.4%', color: 'orange', extra: '1,943' },
              { label: 'Total Sales', value: '$35,078', percent: '27.4%', color: 'red', extra: '$20,395' }
            ].map((card, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">{card.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                    <div className="flex items-center mt-2">
                      <span className={`text-xs bg-${card.color}-100 text-${card.color}-800 px-2 py-1 rounded`}>{card.percent}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">You made an extra <span className={`text-${card.color}-600 font-medium`}>{card.extra}</span> this year</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Unique Visitor</h3>
              <div className="h-64 flex items-end justify-between space-x-2">
                <div className="relative w-full h-full">
                  <svg className="w-full h-full" viewBox="0 0 400 200">
                    <defs>
                      <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1"/>
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 150 Q 57 120 114 130 T 228 100 Q 285 80 342 60 Q 371 55 400 50 L 400 200 L 0 200 Z"
                      fill="url(#areaGradient)"
                    />
                    <path
                      d="M 0 150 Q 57 120 114 130 T 228 100 Q 285 80 342 60 Q 371 55 400 50"
                      stroke="#3B82F6"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M 0 170 Q 57 160 114 150 T 228 140 Q 285 130 342 120 Q 371 115 400 110"
                      stroke="#60A5FA"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 pt-2">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center mt-4 space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-600">Page Views</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-300"></div>
                  <span className="text-sm text-gray-600">Sessions</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Income Overview</h3>
              <div className="text-center mb-4">
                <p className="text-xs text-gray-500 mb-2">This Week Statistics</p>
                <p className="text-2xl font-bold text-gray-900">$7,650</p>
              </div>
              <div className="space-y-1">
                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day, index) => {
                  const heights = [60, 80, 70, 50, 65, 45, 75];
                  return (
                    <div key={day} className="flex items-end justify-between">
                      <span className="text-xs text-gray-500 w-6">{day}</span>
                      <div className="flex-1 mx-2">
                        <div className="bg-gray-100 rounded h-2">
                          <div 
                            className="bg-teal-400 rounded h-2" 
                            style={{ width: `${heights[index]}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;
