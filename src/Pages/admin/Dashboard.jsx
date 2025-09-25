import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { DollarSign, Users, ShoppingCart, Eye, MoreHorizontal, ArrowUp, ArrowDown } from 'lucide-react';

// Sample data for charts
const visitorData = [
  { name: 'Mon', uv: 4000, pv: 2400 },
  { name: 'Tue', uv: 3000, pv: 1398 },
  { name: 'Wed', uv: 2000, pv: 9800 },
  { name: 'Thu', uv: 2780, pv: 3908 },
  { name: 'Fri', uv: 1890, pv: 4800 },
  { name: 'Sat', uv: 2390, pv: 3800 },
  { name: 'Sun', uv: 3490, pv: 4300 },
];

const salesData = [
    { name: 'Jan', sales: 400 },
    { name: 'Feb', sales: 300 },
    { name: 'Mar', sales: 600 },
    { name: 'Apr', sales: 800 },
    { name: 'May', sales: 500 },
    { name: 'Jun', sales: 700 },
];

// Reusable Stat Card Component
const StatCard = ({ icon, label, value, percentage, change, isPositive }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200/80 flex items-start justify-between hover:shadow-xl transition-shadow duration-300">
        <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
             <div className={`flex items-center mt-2 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
                <span>{percentage} ({change})</span>
            </div>
        </div>
        <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
            {icon}
        </div>
    </div>
);

// Recent Orders Table Component
const RecentOrders = () => {
    const orders = [
        { id: '#8453', name: 'Amit Kumar', date: 'Sept 23, 2025', total: '₹1,250', status: 'Completed' },
        { id: '#8454', name: 'Priya Sharma', date: 'Sept 23, 2025', total: '₹850', status: 'Pending' },
        { id: '#8455', name: 'Rahul Verma', date: 'Sept 22, 2025', total: '₹2,500', status: 'Completed' },
        { id: '#8456', name: 'Sneha Reddy', date: 'Sept 22, 2025', total: '₹500', status: 'Cancelled' },
    ];

    const getStatusClass = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200/80">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Order ID</th>
                            <th scope="col" className="px-6 py-3">Customer</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Total</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                                <td className="px-6 py-4">{order.name}</td>
                                <td className="px-6 py-4">{order.date}</td>
                                <td className="px-6 py-4">{order.total}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default function Dashboard() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900">Welcome Back, Admin!</h1>
            <p className="text-gray-600 mt-1">Here's a snapshot of your website's performance.</p>
        </div>

        {/* Stats Cards */} 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard icon={<DollarSign/>} label="Total Sales" value="₹3,50,078" percentage="12.5%" change="+ ₹20,395" isPositive={true} />
            <StatCard icon={<Users/>} label="Total Users" value="78,250" percentage="8.2%" change="+ 8,900" isPositive={true} />
            <StatCard icon={<ShoppingCart/>} label="Total Orders" value="18,800" percentage="5.1%" change="- 1,943" isPositive={false} />
            <StatCard icon={<Eye/>} label="Total Views" value="4,42,236" percentage="25.9%" change="+ 35,000" isPositive={true} />
        </div>

        {/* Charts and Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg border border-gray-200/80">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Unique Visitor Analytics</h3>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <AreaChart data={visitorData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="gray" />
                            <YAxis stroke="gray"/>
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200/80">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Sales Overview</h3>
                 <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={salesData}>
                            <XAxis dataKey="name" stroke="gray" />
                            <YAxis stroke="gray" />
                            <Tooltip />
                            <Bar dataKey="sales" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        {/* Recent Orders Table */}
        <div className="mt-8">
            <RecentOrders />
        </div>
      </main>
    </div>
  );
};
