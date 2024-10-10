import React, { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle, Loader, Copy, Check } from "lucide-react";
import "../styles/chatbot.css";
import { inputChatBot } from "../helper/helper";

const ChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isChatOpen) {
      chatInputRef.current?.focus();
    }
  }, [isChatOpen]);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen && messages.length === 0) {
      setMessages([
        {
          text: "Hello! I'm StudyEasy ChatBot. How can I help you today?",
          isUser: false,
        },
      ]);
    }
  };

  const formatCodeResponse = (response) => {
    // Split response into sections based on markdown code blocks
    const parts = response.split("```");
    let formattedResponse = [];

    parts.forEach((part, index) => {
      if (index % 2 === 0) {
        // Regular text
        if (part.trim()) {
          // Split by section markers
          const sections = part.split("**").filter((s) => s.trim());
          sections.forEach((section) => {
            formattedResponse.push({
              type: "text",
              content: section.trim(),
            });
          });
        }
      } else {
        // Code block
        const [language, ...codeLines] = part.split("\n");
        formattedResponse.push({
          type: "code",
          language: language.trim(),
          content: codeLines.join("\n").trim(),
        });
      }
    });

    return formattedResponse;
  };

  const handleCopyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const MessageContent = ({ content }) => {
    if (typeof content === "string") {
      return <div className="message-text">{content}</div>;
    }

    return (
      <div className="formatted-response">
        {content.map((section, index) => (
          <div key={index} className={`response-section ${section.type}`}>
            {section.type === "code" ? (
              <div className="code-block">
                <div className="code-header">
                  <span className="language-tag">{section.language}</span>
                  <button
                    className="copy-button"
                    onClick={() => handleCopyCode(section.content, index)}
                  >
                    {copiedIndex === index ? (
                      <Check size={16} className="text-green-500" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
                <pre>
                  <code>{section.content}</code>
                </pre>
              </div>
            ) : (
              <div className="text-section">{section.content}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (input.trim()) {
      const userMessage = { text: input, isUser: true };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      try {
        const response = await inputChatBot({ prompt: input });
        const botMessage = {
          text: formatCodeResponse(response.data.result),
          isUser: false,
        };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error("Error fetching API:", error);
        const errorMessage = {
          text: "Sorry, I encountered an error. Please try again later.",
          isUser: false,
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className={`chatbot-container ${isChatOpen ? "open" : ""}`}>
      {!isChatOpen && (
        <button
          onClick={handleChatToggle}
          className="chat-icon"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isChatOpen && (
        <div className="chat-overlay">
          <div className="chat-header">
            <h2>StudyEasy ChatBot</h2>
            <button
              onClick={handleChatToggle}
              className="close-button"
              aria-label="Close chat"
            >
              <X size={24} />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.isUser ? "user" : "bot"}`}
              >
                <div className="message-content">
                  <MessageContent content={msg.text} />
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot">
                <div className="message-content">
                  <div className="typing-indicator">
                    <Loader className="animate-spin" size={20} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="chat-input-form">
            <input
              ref={chatInputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              className="chat-input"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="send-button"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
