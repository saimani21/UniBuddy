import React, { useState } from 'react';
import { createReminder } from '../lib/api';

const ReminderForm = ({ onCreated }) => {
  const [text, setText] = useState('');
  const [datetime, setDatetime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text || !datetime) return alert("Please enter both text and time");

    await createReminder({
      user: "mani",
      text,
      datetime
    });

    setText('');
    setDatetime('');
    if (onCreated) onCreated();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 shadow-lg rounded-lg px-6 py-4 border border-gray-700 space-y-4"
    >
      <h2 className="text-lg font-semibold text-yellow-300">➕ Add Reminder</h2>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="e.g. bring project file"
        className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded px-4 py-2 focus:outline-none"
      />

      <input
        type="datetime-local"
        value={datetime}
        onChange={(e) => setDatetime(e.target.value)}
        className="w-full bg-gray-700 text-white border border-gray-600 rounded px-4 py-2 focus:outline-none"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition"
      >
        Add Reminder
      </button>
    </form>
  );
};

export default ReminderForm;
