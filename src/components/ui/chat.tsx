'use client'
import { useState, useEffect, useRef } from "react";
import { Phone, Video, MoreHorizontal, Send, Paperclip } from "lucide-react"; 

interface Message {
  sender: "user" | "contact";
  text: string;
  time: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "contact", text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", time: "18:00" },
    { sender: "user", text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", time: "18:00" },
  ]);

  const [newMessage, setNewMessage] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const message: Message = {
      sender: "user",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-100 rounded-2xl p-6 border-[1.8px]">
      
      <div className="flex items-center justify-between mb-4 border-b pb-3">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-black rounded-full"></div>
          <div>
            <h2 className="text-lg font-semibold">Leandro</h2>
            <p className="text-xs text-gray-500">#CU6789H</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 text-azulAps">
          <Phone size={20} />
          <Video size={20} />
          <MoreHorizontal size={20} />
        </div>
      </div>

      
      <div className="flex flex-col space-y-4 overflow-y-auto max-h-[60vh] p-2 flex-grow">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} items-end`}
          >
            <div className={`max-w-xs p-3 rounded-lg ${message.sender === "user" ? "bg-azulAps text-white" : "bg-gray-200 text-gray-800"}`}>
              <p className="text-sm">{message.text}</p>
            </div>
            
            <span className="text-xs text-gray-400 ml-2">{message.time}</span>
          </div>
        ))}
        
        <div ref={messagesEndRef} />
      </div>

      
      <div className="flex items-center border-t pt-3 mt-4 space-x-2">
        <button className="text-gray-500 hover:text-gray-700">
          <MoreHorizontal size={20} />
        </button>
        <input
          type="text"
          placeholder="Digite a mensagem"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-grow text-sm p-4 rounded-full border text-gray-700 placeholder-gray-400 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-azulAps"
        />
        <button className="text-gray-500 hover:text-gray-700">
          <Paperclip size={20} />
        </button>
        <button
          onClick={handleSendMessage}
          className="p-2 bg-azulAps text-white rounded-full hover:bg-blue-600"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
