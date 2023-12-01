import React, { useState, useRef,useEffect} from "react";
import axios from 'axios';
import "./chatbot.css";

const ChatBot = () => {
  const [showChat, setShowChat] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([
    { type: "incoming", content: "Hello, how can I assist you today?" },
    { type: "outgoing", content: "I have a question about your services." },
    {
      type: "incoming",
      content: "Sure, I'm here to help. What would you like to know?",
    },
  ]);

  const chatBodyRef = useRef(null);
  useEffect(() => {
   
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);
  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (userInput.trim() === "") {
      return; 
    }

    const newMessage = { type: "outgoing", content: userInput };
    setMessages([...messages, newMessage]);
    setUserInput(""); 

 
    axios.post("http://127.0.0.1:5000/api/ask", { query: userInput })
      .then((response) => {
        
        const serverResponse = { type: "incoming", content: response.data.answer };
        setMessages([...messages, serverResponse]);

      
        if (chatBodyRef.current) {
          chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
      })
      .catch((error) => {
        console.error("Error asking query:", error);
      
      });
  };

  return (
    <div className={`parent-chat ${showChat ? "show-chat" : ""}`}>
      <div className="chat-card">
        <div className="chat-header">
          <div className="h2">Ask any Query about our Website !!</div>
        </div>
        <div ref={chatBodyRef} className="chat-body">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              <p>{message.content}</p>
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            autoComplete="off"
            name="text"
            className="input-chat"
            placeholder="Chatbot"
            value={userInput}
            onChange={handleInputChange}
          />
          <button className="button-chat ml-4" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
      <button className="chatBtn" onClick={toggleChat}>
        {/* Your SVG Icon */}
        <span className="tooltip">Chat</span>
      </button>
    </div>
  );
};

export default ChatBot;
