"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const API_KEY = "AIzaSyC79NBaptOURpddlnooRMB5dfKSsKGS0fc"; // Replace with your key

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateMessage?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content: [
                  {
                    type: "text",
                    text: `You are Krishi Mitra Assistant. 
Always reply in ${language}. 
Translate the user input to ${language} if necessary. 
Provide helpful, clear answers about agriculture and crops.`
                  }
                ]
              },
              {
                role: "user",
                content: [{ type: "text", text: input }]
              }
            ],
            temperature: 0.7
          }),
        }
      );

      const data = await response.json();

      const aiText =
        data?.candidates?.[0]?.content?.[0]?.text ||
        "⚠️ No response from AI.";

      setMessages((prev) => [...prev, { role: "ai", text: aiText }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "❌ Error: " + error },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      {/* Chatbot Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg z-[9999]"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-[9999]"
        >
          {/* Header */}
          <div className="bg-green-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <h2 className="text-lg font-bold">🌱 Krishi Mitra Assistant</h2>
            <button onClick={() => setIsOpen(false)} className="text-white">
              ✖
            </button>
          </div>

          {/* Language Selector */}
          <div className="p-2 bg-green-100 flex justify-center">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="p-2 border rounded-md text-sm"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="mr">Marathi</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-green-600 text-white self-end ml-auto"
                    : "bg-gray-200 text-black self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="p-3 bg-gray-200 rounded-xl w-fit">⏳ Typing...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 flex border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 border p-2 rounded-lg text-sm"
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-green-600 text-white p-2 rounded-lg"
            >
              <Send size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Chatbot;
