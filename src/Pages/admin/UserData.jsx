import React, { useState } from 'react';

// --- SVG Icons for Actions ---
const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
    </svg>
);

const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 .91-2.905 3.1-5.186 5.76-6.118M15.363 5.363A12.003 12.003 0 0121.542 12c-1.274 4.057-5.064 7-9.542 7-1.42 0-2.774-.32-4.01-.875" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 2l20 20" />
    </svg>
);

const BlockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
);

const UnblockIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


// --- Main UserTable Component ---
const UserTable = () => {
    // --- State for User Data (mock data with status) ---
    const [users, setUsers] = useState([
        { id: 1, name: 'Faiz A.', email: 'test@example.com', phone: '9876543210', password: 'secret123', isBlocked: false },
        { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', phone: '8765432109', password: 'password456', isBlocked: true },
        { id: 3, name: 'John Smith', email: 'john.smith@example.com', phone: '7654321098', password: 'userpass789', isBlocked: false },
        { id: 4, name: 'Emily White', email: 'emily.white@example.com', phone: '6543210987', password: 'securepass1', isBlocked: false },
    ]);

    // --- State for password visibility ---
    const [passwordVisibility, setPasswordVisibility] = useState({});

    // --- Handler Functions for Actions ---
    const handleEdit = (userId) => {
        alert(`Editing user with ID: ${userId}`);
    };

    const handleDelete = (userId) => {
        if (window.confirm(`Are you sure you want to delete user with ID: ${userId}?`)) {
            setUsers(users.filter(user => user.id !== userId));
        }
    };

    const togglePasswordVisibility = (userId) => {
        setPasswordVisibility(prevState => ({
            ...prevState,
            [userId]: !prevState[userId]
        }));
    };
    
    const handleToggleBlock = (userId) => {
        setUsers(users.map(user => 
            user.id === userId ? { ...user, isBlocked: !user.isBlocked } : user
        ));
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
                    <p className="text-gray-500 mt-1">A list of all the users in your account including their name, email and phone.</p>
                </header>

                {/* --- Table for larger screens --- */}
                <div className="hidden md:block bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user.id} className={user.isBlocked ? 'bg-gray-50 opacity-60' : ''}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div>{user.email}</div>
                                            <div>{user.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex items-center space-x-2">
                                                <span>
                                                    {passwordVisibility[user.id] ? user.password : '••••••••'}
                                                </span>
                                                <button onClick={() => togglePasswordVisibility(user.id)} className="text-gray-400 hover:text-gray-600">
                                                    {passwordVisibility[user.id] ? <EyeOffIcon /> : <EyeIcon />}
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                                {user.isBlocked ? 'Blocked' : 'Active'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                            <div className="flex items-center justify-center space-x-4">
                                                <button onClick={() => handleToggleBlock(user.id)} className={`flex items-center transition-colors ${user.isBlocked ? 'text-green-600 hover:text-green-900' : 'text-yellow-600 hover:text-yellow-900'}`}>
                                                    {user.isBlocked ? <UnblockIcon /> : <BlockIcon />}
                                                    {user.isBlocked ? 'Unblock' : 'Block'}
                                                </button>
                                                <button onClick={() => handleEdit(user.id)} className="flex items-center text-indigo-600 hover:text-indigo-900 transition-colors">
                                                    <EditIcon /> Edit
                                                </button>
                                                <button onClick={() => handleDelete(user.id)} className="flex items-center text-red-600 hover:text-red-900 transition-colors">
                                                    <DeleteIcon /> Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- Cards for smaller screens --- */}
                <div className="block md:hidden">
                    <div className="space-y-4">
                        {users.map((user) => (
                            <div key={user.id} className={`bg-white shadow-md rounded-lg p-4 ${user.isBlocked ? 'opacity-60' : ''}`}>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                            <p className="text-sm text-gray-500">{user.phone}</p>
                                        </div>
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                            {user.isBlocked ? 'Blocked' : 'Active'}
                                        </span>
                                    </div>
                                    
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-gray-500">
                                                {passwordVisibility[user.id] ? user.password : '••••••••'}
                                            </span>
                                            <button onClick={() => togglePasswordVisibility(user.id)} className="text-gray-400 hover:text-gray-600">
                                                {passwordVisibility[user.id] ? <EyeOffIcon /> : <EyeIcon />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex justify-end space-x-4 pt-2 border-t border-gray-200 mt-2">
                                        <button onClick={() => handleToggleBlock(user.id)} className={`flex items-center text-sm transition-colors ${user.isBlocked ? 'text-green-600 hover:text-green-900' : 'text-yellow-600 hover:text-yellow-900'}`}>
                                            {user.isBlocked ? <UnblockIcon /> : <BlockIcon />}
                                            {user.isBlocked ? 'Unblock' : 'Block'}
                                        </button>
                                        <button onClick={() => handleEdit(user.id)} className="flex items-center text-indigo-600 hover:text-indigo-900 transition-colors text-sm">
                                            <EditIcon /> Edit
                                        </button>
                                        <button onClick={() => handleDelete(user.id)} className="flex items-center text-red-600 hover:text-red-900 transition-colors text-sm">
                                            <DeleteIcon /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserTable;

