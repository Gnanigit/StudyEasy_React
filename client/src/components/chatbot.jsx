import React, { useState } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import "../styles/chatbot.css";
import { inputChatBot } from "../helper/helper";

const ChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleChatToggle = () => setIsChatOpen(!isChatOpen);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (input.trim()) {
      const newMessage = { text: input, isUser: true };
      setMessages([...messages, newMessage]);
      setInput("");

      try {
        const response = await inputChatBot({ prompt: input });

        const data = response.data;

        const responseMessage = {
          text: data.result,
          isUser: false,
        };
        setMessages((prevMessages) => [...prevMessages, responseMessage]);
      } catch (error) {
        console.error("Error fetching API:", error);
        const errorMessage = {
          text: "Sorry, something went wrong. Please try again later.",
          isUser: false,
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    }
  };

  return (
    <div className="chatbot-container">
      {!isChatOpen && (
        <button onClick={handleChatToggle} className="chat-icon">
          <MessageCircle size={30} />
        </button>
      )}

      {isChatOpen && (
        <div className="chat-overlay">
          <div className="chat-header">
            <h2>StudyEasy ChatBot</h2>
            <button onClick={handleChatToggle} className="close-button">
              <X size={24} />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.isUser ? "user" : "bot"}`}
              >
                <div className="message-content">{msg.text}</div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="chat-input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="chat-input"
            />
            <button type="submit" className="send-button">
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
