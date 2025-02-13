import React, { useState, useRef, useEffect } from "react";
import { sendMessage } from "../pages/Chatbot";

const ChatbotComponent = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const sessionId = "user_123";
    const chatEndRef = useRef(null);
 
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // const handleSendMessage = async () => {
    //     if (!input.trim()) return;
        
    //     const userMessage = { sender: "user", text: input };
    //     setMessages([...messages, userMessage]);

    //     const botResponse = await sendMessage(sessionId, input);
    //     setMessages([...messages, userMessage, { sender: "bot", text: botResponse }]);

    //     setInput("");
    // };
    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };
        setMessages([...messages, userMessage]);

        const response = await sendMessage(sessionId, input);

        // Extract text values properly
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", text: response.classificationMessage }, // Show department classification
            { sender: "bot", text: response.chatbotResponse } // Show chatbot response
        ]);

        setInput("");
    };
    
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevents adding a new line
            handleSendMessage();
        }
    };

    return (
        // <div style={{ maxWidth: "w-full", margin: "auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
        //     <h3>Chatbot</h3>
        //     <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "10px", padding: "10px", border: "1px solid #ccc" }}>
        //         {messages.map((msg, index) => (
        //             <div key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left", marginBottom: "5px" }}>
        //                 <b>{msg.sender === "user" ? "You" : "Bot"}:</b> {msg.text}
        //             </div>
        //         ))}
        //     </div>
        //     <input
        //         type="text"
        //         value={input}
        //         onChange={(e) => setInput(e.target.value)}
        //         placeholder="Type a message..."
        //         style={{ width: "80%", padding: "5px" }}
        //     />
        //     <button onClick={handleSendMessage} style={{ padding: "5px", marginLeft: "5px" }}>Send</button>
        // </div>
        <div className="flex flex-col h-screen w-full bg-gray-100">
            <h3 className="text-center py-4 bg-gray-900 text-white text-lg font-semibold shadow-md">
                State your Grievance
            </h3>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`px-4 py-2 rounded-lg max-w-xs ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-900"}`}>
                            <b>{msg.sender === "user" ? "You" : "Bot"}:</b> {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef}></div>
            </div>

            <div className="flex items-center p-4 bg-white border-t border-gray-300">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe your issue..."
                    className="flex-1 p-3 border rounded-full outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleSendMessage}
                    className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatbotComponent;
