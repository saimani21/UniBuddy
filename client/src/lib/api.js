// 💬 Send a chat message to GPT-4o-mini
export async function sendMessageToBuddy(message, user = "mani") {
  const response = await fetch("http://127.0.0.1:8000/api/chat/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, user }),
  });

  const data = await response.json();
  return data.reply || "(No reply)";
}

// 🧠 Get full chat history for a user
export async function getChatHistory(user = "mani") {
  const response = await fetch(`http://127.0.0.1:8000/api/chat/history/${user}`);
  const data = await response.json();
  return data.history || [];
}

// 🗓️ Get today’s reminders for the user
export async function getTodayReminders(user = "mani") {
  const res = await fetch(`http://127.0.0.1:8000/api/reminders/today/${user}`);
  const data = await res.json();
  return data.reminders || [];
}

// 📚 Get all reminders for the user
export async function getAllReminders(user = "mani") {
  const res = await fetch(`http://127.0.0.1:8000/api/reminders/${user}`);
  const data = await res.json();
  return data.reminders || [];
}

// ➕ Create a new reminder manually
export async function createReminder(reminder) {
  const res = await fetch("http://127.0.0.1:8000/api/reminders/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reminder),
  });

  const data = await res.json();
  return data;
}

// 📘 Get the Next Class (e.g., for "What's my next class?" button)
export async function getNextClass() {
  const res = await fetch("http://127.0.0.1:8000/api/next-class");
  const data = await res.json();
  return data.message;
}

// 🔔 Optional: Check if class is within 15 minutes
export async function getNextClassAlert() {
  const res = await fetch("http://127.0.0.1:8000/api/next-class");
  const data = await res.json();

  if (data.status === "alert") {
    return data.message; // Class within 15 mins
  }

  return null; // No alert needed
}

// 📁 client/lib/api.js
export async function transcribeAudio(formData) {
  const res = await fetch("http://localhost:8000/api/voice-transcribe", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return data.transcript;
}


