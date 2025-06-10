import React, { useEffect, useState } from 'react';
import { getAllReminders } from '../lib/api';

const AllReminders = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    async function fetchAll() {
      const data = await getAllReminders();
      setReminders(data || []);
    }
    fetchAll();
  }, []);

  return (
    <div className="bg-gray-800 border border-pink-500 rounded-lg shadow p-4 mt-6">
      <h2 className="text-lg font-semibold text-pink-300 mb-2">📚 All Reminders</h2>

      {reminders.length === 0 ? (
        <p className="text-sm text-gray-400">No reminders yet.</p>
      ) : (
        <ul className="divide-y divide-gray-700 text-sm text-gray-200">
          {reminders.map((reminder, idx) => (
            <li key={idx} className="py-2">
              <span className="font-medium text-white">{reminder.text}</span> —{' '}
              {new Date(reminder.datetime).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllReminders;
