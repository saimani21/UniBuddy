import React, { useState } from 'react';
import ChatSection from './components/ChatSection';
import RemindersBox from './components/RemindersBox';
import AllReminders from './components/AllReminders';
import ReminderForm from './components/ReminderForm';
import NextClassBox from './components/NextClassBox';
import OCRUploader from './components/OCRUploader'; // 📷 OCR Feature

const App = () => {
  const [activeView, setActiveView] = useState('chat');
  const [refresh, setRefresh] = useState(false);

  const handleReminderCreated = () => setRefresh(!refresh);

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">

      {/* 📚 Sidebar Navigation */}
      <aside className="w-64 bg-gray-800 p-6 space-y-6">
        <h1 className="text-2xl font-bold text-purple-400">🎓 UniBuddy</h1>

        <button
          onClick={() => setActiveView('chat')}
          className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition ${
            activeView === 'chat' ? 'bg-purple-700 text-white' : 'text-gray-300'
          }`}
        >
          💬 Chat
        </button>

        <button
          onClick={() => setActiveView('reminders')}
          className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition ${
            activeView === 'reminders' ? 'bg-yellow-600 text-white' : 'text-gray-300'
          }`}
        >
          🗓 Reminders
        </button>

        <button
          onClick={() => setActiveView('schedule')}
          className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition ${
            activeView === 'schedule' ? 'bg-blue-600 text-white' : 'text-gray-300'
          }`}
        >
          📘 Schedule
        </button>

        <button
          onClick={() => setActiveView('ocr')}
          className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition ${
            activeView === 'ocr' ? 'bg-green-600 text-white' : 'text-gray-300'
          }`}
        >
          📷 OCR Upload
        </button>
      </aside>

      {/* 🧠 Main View */}
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <h2 className="text-2xl font-semibold">
          {activeView === 'chat' && '💬 Chat with UniBuddy'}
          {activeView === 'reminders' && '🗓 Manage Your Reminders'}
          {activeView === 'schedule' && '📘 Class Schedule'}
          {activeView === 'ocr' && '📷 Upload Question Paper'}
        </h2>

        {activeView === 'chat' && <ChatSection />}

        {activeView === 'reminders' && (
          <div className="space-y-4">
            <ReminderForm onCreated={handleReminderCreated} />
            <RemindersBox key={refresh} />
            <AllReminders key={refresh} />
          </div>
        )}

        {activeView === 'schedule' && <NextClassBox />}

        {activeView === 'ocr' && <OCRUploader />}
      </main>
    </div>
  );
};

export default App;
