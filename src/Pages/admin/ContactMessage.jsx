import React, { useState } from 'react';

// Helper function to format date and time in a readable format
const formatDateTime = (date) => {
    if (!date || !(date instanceof Date)) return '';
    // Formats to: "Sep 24, 2025, 10:45 AM"
    return date.toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
};


// Data for messages with actual Date objects
const initialMessagesData = [
    {
        id: 1,
        title: 'Kickoff',
        author: 'Tony Young',
        date: new Date('2025-09-22T14:30:00'), // Past date
        type: 'Announcement',
        icon: '📣',
        content: "Hey everyone! It's time to get started on the help site redesign. I wanted to share the list of goals, priorities, and desired outcomes we've discussed. Looking forward to collaborating with all of you on this exciting project!",
        unreadCount: 1,
        avatarUrl: 'https://placehold.co/100x100/EBF8FF/4A5568?text=TY'
    },
    {
        id: 2,
        title: 'Inspiration',
        author: 'Tony Young',
        date: new Date('2025-09-23T09:15:00'), // Past date
        type: 'Question',
        icon: '💡',
        content: "Hey folks! Have you seen any help sites that really shined structure wise? Leave a comment below so we can talk about what makes them great! I'm looking for examples with clear navigation and intuitive user experience.",
        unreadCount: 0,
        avatarUrl: 'https://placehold.co/100x100/EBF8FF/4A5568?text=TY'
    },
    {
        id: 3,
        title: 'Website Feedback',
        author: 'Jane Doe',
        date: new Date('2025-09-24T08:55:00'), // Today's date, earlier time
        type: 'Feedback',
        icon: '📝',
        content: "Just reviewed the new landing page design. I have a few suggestions regarding the color palette and font choices. Let's discuss this. Overall, it's a great start!",
        unreadCount: 5,
        avatarUrl: 'https://placehold.co/100x100/FEFBF6/4A5568?text=JD'
    },
     {
        id: 4,
        title: 'Server Maintenance',
        author: 'Admin Team',
        date: new Date(), // Current date and time
        type: 'Alert',
        icon: '⚠️',
        content: "Please be advised that we will have a scheduled server maintenance this Friday at 10 PM. The service might be temporarily unavailable for about 30 minutes. We apologize for any inconvenience.",
        unreadCount: 0,
        avatarUrl: 'https://placehold.co/100x100/FEE2E2/4A5568?text=A'
    }
];

// Reusable MessageItem component
const MessageItem = ({ message, onClick }) => (
    <div 
        onClick={onClick}
        className="flex items-start space-x-4 p-5 bg-white hover:bg-gray-50 transition-colors duration-200 rounded-lg shadow-sm border border-gray-200/80 cursor-pointer"
    >
        <img 
            src={message.avatarUrl}
            alt={`${message.author}'s avatar`}
            className="w-12 h-12 rounded-full flex-shrink-0"
        />
        <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">{message.title}</h3>
            <p className="text-sm text-gray-500 mt-1">
                <span className="mr-1">{message.icon}</span> 
                {message.type} by <span className="font-medium text-gray-700">{message.author}</span> • {formatDateTime(message.date)}
            </p>
            <p className="text-gray-700 mt-2 text-base line-clamp-2">
                {message.content}
            </p>
        </div>
        {message.unreadCount > 0 && (
            <div className="bg-purple-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0">
                {message.unreadCount}
            </div>
        )}
    </div>
);

// Modal to display the full message
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
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
                <div className="flex items-start space-x-4 mb-5">
                    <img src={message.avatarUrl} alt={`${message.author}'s avatar`} className="w-14 h-14 rounded-full" />
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{message.title}</h2>
                        <p className="text-sm text-gray-500">{message.type} by <span className="font-medium text-gray-800">{message.author}</span> • {formatDateTime(message.date)}</p>
                    </div>
                </div>
                <div className="prose max-w-none text-gray-800 text-base leading-relaxed">
                    <p>{message.content}</p>
                </div>
                <div className="mt-6 pt-4 border-t flex justify-end items-center gap-3">
                    <button onClick={onDelete} className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-colors">
                        Delete
                    </button>
                    <button onClick={onClose} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Close
                    </button>
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

    // Mark the message as read by setting unreadCount to 0
    setMessages(messages.map(msg =>
        msg.id === messageId ? { ...msg, unreadCount: 0 } : msg
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
            @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slide-up {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .animate-fade-in { animation: fade-in 0.3s ease-out; }
            .animate-slide-up { animation: slide-up 0.3s ease-out; }
        `}</style>
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto p-4 md:p-8">
                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900">
                        Contact Messages
                    </h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Review and respond to all inquiries from one place.
                    </p>
                </header>

                {/* Messages List */}
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

            {/* Render the modal if a message is selected */}
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

