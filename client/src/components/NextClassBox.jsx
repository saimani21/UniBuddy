import React, { useState, useEffect } from 'react';
import { getNextClass } from '../lib/api';

const NextClassBox = () => {
  const [nextClass, setNextClass] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const loadNextClass = async () => {
    const result = await getNextClass();
    setNextClass(result.message);
    setShowAlert(result.alert);
  };

  useEffect(() => {
    loadNextClass();
  }, []);

  return (
    <div className="bg-gray-800 border border-blue-600 rounded-lg shadow p-4 mt-6 text-white">
      <h3 className="font-semibold text-lg text-blue-400 mb-2">📘 Class Schedule</h3>

      <button
        onClick={loadNextClass}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition"
      >
        What's my next class?
      </button>

      {nextClass && (
        <p className="mt-4 bg-blue-700 text-blue-100 p-3 rounded border border-blue-500">
          {nextClass}
        </p>
      )}

      {showAlert && (
        <div className="mt-4 bg-yellow-500 text-black font-semibold p-3 rounded shadow">
          ⏰ Hurry! Class starts in 15 mins!
        </div>
      )}
    </div>
  );
};

export default NextClassBox;
