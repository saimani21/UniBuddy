import React, { useEffect, useState } from 'react';
import { getTodayReminders } from '../lib/api';

const RemindersBox = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    async function fetchReminders() {
      const data = await getTodayReminders();
      setReminders(data || []);
    }
    fetchReminders();
  }, []);

  return (
    <div className="bg-gray-800 border border-yellow-500 rounded-lg p-4 mt-6 shadow">
      <h3 className="text-lg font-semibold text-yellow-300 mb-2">🗓️ Today’s Reminders</h3>
      {reminders.length === 0 ? (
        <p className="text-sm text-gray-400">No reminders set for today.</p>
      ) : (
        <ul className="list-disc list-inside text-sm space-y-1 text-gray-200">
          {reminders.map((reminder, index) => (
            <li key={index}>
              <span className="font-medium text-white">{reminder.text}</span> —{' '}
              {new Date(reminder.datetime).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RemindersBox;
