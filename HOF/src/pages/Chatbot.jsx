import { useState } from "react";
import { Send } from "lucide-react";

export default function Chatbot({ data }) {
  const [messages, setMessages] = useState([
    { text: "Hello! What problem do you face", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    setMessages([...messages, newMessage]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: `Your grievance is under ${data.department}`, sender: "bot" },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Display */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`p-3 rounded-lg mb-2 max-w-xs ${
                msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-4 bg-white flex items-center border-t">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="ml-2 p-2 bg-blue-500 text-white rounded-lg" onClick={sendMessage}>
          <Send />
        </button>
      </div>
    </div>
  );
}
