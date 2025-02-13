const API_URL = "https://chatbot-e65a.onrender.com/chat";

export async function sendMessage(sessionId, message) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            session_id: sessionId,
            message: message,
        }),
    });
    const data = await response.json();

    return {
        department: data.department || "Unknown",
        classificationMessage: data.classification_message || "Unable to classify the issue.",
        chatbotResponse: data.chatbot_response || "I couldn't generate a response."
    };
}

