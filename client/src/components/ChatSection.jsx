import React, { useState, useEffect, useRef } from 'react';
import { sendMessageToBuddy, getChatHistory, transcribeAudio } from '../lib/api';

const ChatSection = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatBottomRef = useRef(null);
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);

  const getEmotionEmoji = (emotion) => {
    switch (emotion?.toLowerCase()) {
      case 'joy':
      case 'happiness':
        return '😊';
      case 'sadness':
        return '😢';
      case 'anger':
        return '😠';
      case 'fear':
        return '😨';
      case 'disgust':
        return '🤢';
      case 'surprise':
        return '😲';
      case 'neutral':
        return '😐';
      default:
        return '🧠';
    }
  };

  useEffect(() => {
    async function loadHistory() {
      const history = await getChatHistory('mani');
      setMessages(history);
    }
    loadHistory();
  }, []);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser doesn't support speech recognition.");
      return;
    }

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => prev + ' ' + transcript);
        setListening(false);
      };

      recognitionRef.current.onerror = () => setListening(false);
      recognitionRef.current.onend = () => setListening(false);
    }

    setListening(true);
    recognitionRef.current.start();
  };

  const handleWhisperRecord = async () => {
    try {
      console.log("🎙️ Requesting microphone access...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];
  
      mediaRecorder.onstart = () => {
        console.log("🎤 Recording started...");
      };
  
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunks.push(e.data);
          console.log("🧱 Chunk captured:", e.data);
        }
      };
  
      mediaRecorder.onstop = async () => {
        console.log("🛑 Recording stopped.");
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm;codecs=opus' });
        const audioFile = new File([audioBlob], 'recording.webm', { type: 'audio/webm' });
  
        const formData = new FormData();
        formData.append('file', audioFile);
        console.log("📦 FormData ready:", formData.get('file'));
  
        try {
          const transcript = await transcribeAudio(formData);
          console.log("📝 Transcription:", transcript);
          if (transcript) {
            setInput((prev) => prev + ' ' + transcript);
          } else {
            alert("No transcript received.");
          }
        } catch (error) {
          console.error("❌ Transcription failed:", error);
          alert("Transcription failed. Check console.");
        }
      };
  
      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), 5000); // Record for 5 sec
    } catch (err) {
      console.error('🎙️ Recording failed:', err);
      alert("Microphone access failed. Check permissions.");
    }
  };
  

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    const { reply, emotion } = await sendMessageToBuddy(input);
    const botMessage = { role: 'assistant', content: reply };

    setMessages((prev) => [...prev, { ...userMessage, emotion }, botMessage]);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-gray-800 text-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center text-purple-400">💬 Chat with UniBuddy</h2>

      <div className="h-[28rem] overflow-y-auto border border-gray-600 rounded-lg p-4 bg-gray-900 space-y-3">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div>
              <span
                className={`inline-block px-4 py-2 rounded-xl max-w-lg break-words shadow ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white text-right'
                    : 'bg-gray-700 text-gray-200 text-left'
                }`}
              >
                {msg.content}
              </span>
              {msg.role === 'user' && msg.emotion && (
                <p className="text-xs text-gray-400 italic mt-1">
                  Emotion: {getEmotionEmoji(msg.emotion)} {msg.emotion}
                </p>
              )}
            </div>
          </div>
        ))}
        <div ref={chatBottomRef} />
      </div>

      <div className="flex items-center mt-4 gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none"
          placeholder="Ask your buddy anything..."
        />

        <button
          onClick={handleVoiceInput}
          className={`bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition ${listening ? 'animate-pulse' : ''}`}
          title="Speak in English"
        >
          🎤
        </button>

        <button
          onClick={handleWhisperRecord}
          className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition"
          title="Multilingual Whisper"
        >
          🌍
        </button>

        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatSection;
