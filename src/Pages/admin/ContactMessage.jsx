import React, { useState } from 'react';
import { User, Mail, Phone, Clock, FileText, Trash2, X } from 'lucide-react';

// Helper function to format date and time in a readable format
const formatDateTime = (date) => {
    if (!date || !(date instanceof Date)) return '';
    return date.toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
};

// Data for messages with contact form fields
const initialMessagesData = [
    {
        id: 1,
        name: 'Tony Young',
        email: 'tony.young@example.com',
        phone: '+1-202-555-0104',
        subject: 'Kickoff Inquiry',
        message: "Hey everyone! It's time to get started on the help site redesign. I wanted to share the list of goals, priorities, and desired outcomes we've discussed. Looking forward to collaborating with all of you on this exciting project!",
        date: new Date('2025-09-22T14:30:00'),
        unread: true,
        avatarUrl: 'https://placehold.co/100x100/EBF8FF/4A5568?text=TY'
    },
    {
        id: 2,
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        phone: '+91-987-654-3210',
        subject: 'Website Feedback',
        message: "Just reviewed the new landing page design. I have a few suggestions regarding the color palette and font choices. Let's discuss this. Overall, it's a great start!",
        date: new Date('2025-09-24T08:55:00'),
        unread: true,
        avatarUrl: 'https://placehold.co/100x100/FEFBF6/4A5568?text=JD'
    },
     {
        id: 3,
        name: 'Admin Team',
        email: 'admin@example.com',
        phone: 'N/A',
        subject: 'Server Maintenance',
        message: "Please be advised that we will have a scheduled server maintenance this Friday at 10 PM. The service might be temporarily unavailable for about 30 minutes. We apologize for any inconvenience.",
        date: new Date(),
        unread: false,
        avatarUrl: 'https://placehold.co/100x100/FEE2E2/4A5568?text=A'
    }
];

// Reusable MessageItem component
const MessageItem = ({ message, onClick }) => (
    <div 
        onClick={onClick}
        className={`flex items-start space-x-4 p-5 transition-colors duration-200 rounded-lg shadow-sm border cursor-pointer ${
            message.unread ? 'bg-white hover:bg-gray-50 border-gray-200/80' : 'bg-gray-50 hover:bg-gray-100 border-gray-200/50'
        }`}
    >
        <img 
            src={message.avatarUrl}
            alt={`${message.name}'s avatar`}
            className="w-12 h-12 rounded-full flex-shrink-0"
        />
        <div className="flex-1 overflow-hidden">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900 truncate">{message.subject}</h3>
                {message.unread && (
                    <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0">
                        New
                    </span>
                )}
            </div>
            <p className="text-sm text-gray-600 mt-1">
                From: <span className="font-medium text-gray-800">{message.name}</span>
            </p>
            <p className="text-gray-700 mt-2 text-sm line-clamp-2">
                {message.message}
            </p>
        </div>
         <p className="text-xs text-gray-400 self-start flex-shrink-0">{formatDateTime(message.date)}</p>
    </div>
);

// Modal to display the full message details
const MessageDetailView = ({ message, onClose, onDelete }) => {
    if (!message) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="bg-white p-6 rounded-xl shadow-xl max-w-2xl w-full relative animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"><X size={24}/></button>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-3">{message.subject}</h2>
                
                <div className="space-y-4 mb-6">
                    <div className="flex items-center"><User className="w-5 h-5 mr-3 text-gray-500"/><span className="font-semibold mr-2">From:</span> {message.name}</div>
                    <div className="flex items-center"><Mail className="w-5 h-5 mr-3 text-gray-500"/><span className="font-semibold mr-2">Email:</span> <a href={`mailto:${message.email}`} className="text-blue-600 hover:underline">{message.email}</a></div>
                    <div className="flex items-center"><Phone className="w-5 h-5 mr-3 text-gray-500"/><span className="font-semibold mr-2">Phone:</span> {message.phone}</div>
                    <div className="flex items-center"><Clock className="w-5 h-5 mr-3 text-gray-500"/><span className="font-semibold mr-2">Received:</span> {formatDateTime(message.date)}</div>
                </div>

                <div className="prose max-w-none text-gray-800 text-base leading-relaxed bg-gray-50 p-4 rounded-lg border">
                    <h3 className="font-semibold text-gray-800 mb-2">Message:</h3>
                    <p>{message.message}</p>
                </div>

                <div className="mt-6 pt-4 border-t flex justify-end items-center gap-3">
                    <button onClick={onDelete} className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
                        <Trash2 size={16}/> Delete
                    </button>
                    <button onClick={onClose} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors">Close</button>
                </div>
            </div>
        </div>
    );
};

export default function ContactMessage() {
  const [messages, setMessages] = useState(initialMessagesData);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleMessageClick = (messageId) => {
    const messageToView = messages.find(msg => msg.id === messageId);
    setSelectedMessage(messageToView);

    // Mark the message as read
    setMessages(messages.map(msg =>
        msg.id === messageId ? { ...msg, unread: false } : msg
    ));
  };

  const handleCloseMessage = () => {
    setSelectedMessage(null);
  };

  const handleDeleteMessage = (messageId) => {
      if (window.confirm("Are you sure you want to delete this message? This action cannot be undone.")) {
          setMessages(messages.filter(msg => msg.id !== messageId));
          setSelectedMessage(null); // Close modal after deleting
      }
  };

  return (
    <>
        <style>{`
            @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            .animate-fade-in { animation: fade-in 0.3s ease-out; }
            .animate-slide-up { animation: slide-up 0.3s ease-out; }
        `}</style>
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto p-4 md:p-8">
                <header className="mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900">Contact Messages</h1>
                    <p className="mt-2 text-lg text-gray-600">Review and respond to all inquiries from one place.</p>
                </header>

                <main className="space-y-6">
                    {messages.length > 0 ? (
                        messages.map(message => (
                            <MessageItem key={message.id} message={message} onClick={() => handleMessageClick(message.id)} />
                        ))
                    ) : (
                        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                            <p className="text-gray-500 text-lg">You have no new messages.</p>
                        </div>
                    )}
                </main>
            </div>

            {selectedMessage && (
                <MessageDetailView 
                    message={selectedMessage} 
                    onClose={handleCloseMessage} 
                    onDelete={() => handleDeleteMessage(selectedMessage.id)}
                />
            )}
        </div>
    </>
  )
}
