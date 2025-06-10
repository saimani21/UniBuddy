import React, { useState } from 'react';

const OCRUploader = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert('Please select an image.');

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:8000/api/ocr-upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      setExtractedText(data.extracted_text);
      setAnswer(data.answer);
    } catch (err) {
      alert('Failed to extract or generate answers.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg space-y-4 max-w-4xl mx-auto mt-6">
      <h2 className="text-xl font-bold text-purple-400">📷 Upload Question Paper</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-purple-600 file:text-white hover:file:bg-purple-700"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
      >
        {loading ? 'Processing...' : 'Generate Answers'}
      </button>

      {extractedText && (
        <div className="bg-gray-900 p-4 rounded-lg mt-4">
          <h3 className="text-lg font-semibold text-green-400 mb-2">📝 Extracted Questions:</h3>
          <pre className="text-sm text-gray-300 whitespace-pre-wrap">{extractedText}</pre>
        </div>
      )}

      {answer && (
        <div className="bg-gray-900 p-4 rounded-lg mt-4">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">🧠 Generated Answers:</h3>
          <pre className="text-sm text-gray-300 whitespace-pre-wrap">{answer}</pre>
        </div>
      )}
    </div>
  );
};

export default OCRUploader;
