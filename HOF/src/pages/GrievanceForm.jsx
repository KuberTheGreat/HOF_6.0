// import React, {useState} from 'react'
// import Chatbot from './Chatbot';

// const GrievanceForm = () => {
//     const [statement, setStatement] = useState("");
//     const [department, setDepartment] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const response = await fetch("https://project-deployement.onrender.com/predict/", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({statement})
//         });

//         const data = await response.json();
//         setDepartment(data);
//     }
    
//   return (
//     <div>
//         <div>
//             <h2>Public Grievance Classifier</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     value={statement}
//                     onChange={(e) => setStatement(e.target.value)}
//                     placeholder="Enter grievance statement"
//                     required
//                 />
//                 <button type="submit">Classify</button>
//             </form>
//             {department && <Chatbot data={department}/>}
//         </div>
//     </div>
//   )
// }

// export default GrievanceForm


import React, {useState} from 'react'
import { Send } from "lucide-react";

const GrievanceForm = () => {
    const [statement, setStatement] = useState("");
    const [department, setDepartment] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://project-deployement.onrender.com/predict/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({statement})
        });

        const data = await response.json();
        setDepartment(data.department);
    }
    
    const [messages, setMessages] = useState([
        { text: "Hello! What problem do you face", sender: "bot" },
    ]);
    const [input, setInput] = useState("");

    const sendMessage = async(e) => {
        if (!input.trim()) return;
        

        // e.preventDefault();
        const response = await fetch("https://project-deployement.onrender.com/predict/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({statement:input})
        });

        const data = await response.json();

        const newMessage = { text: input, sender: "user" };
        setMessages([...messages, newMessage]);
        setInput("");
        
        // Simulate bot response
        setMessages((prev) => [
        ...prev,
        { text: `Your grievance is sent to ${data.department} department`, sender: "bot" },
        ]);
    };
    
  return (
    // <div>
    //     <div>
    //         <h2>Public Grievance Classifier</h2>
    //         <form onSubmit={handleSubmit}>
    //             <input
    //                 type="text"
    //                 value={statement}
    //                 onChange={(e) => setStatement(e.target.value)}
    //                 placeholder="Enter grievance statement"
    //                 required
    //             />
    //             <button type="submit">Classify</button>
    //         </form>
    //         {department && <Chatbot data={department}/>}
    //     </div>
    // </div>
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
  )
}

export default GrievanceForm
