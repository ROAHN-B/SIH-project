"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Image, Mic, X } from "lucide-react";

const API_KEY = "AIzaSyC6aOEvS9bKVUG_WJ14Te1GWO1IAuXlmDg";

interface Message {
  role: "user" | "bot";
  text: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessageToGemini = async (message: string) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: `Reply in ${language}: ${message}` }],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        console.error("API error:", errText);
        return "⚠️ API Error: " + errText;
      }

      const data = await response.json();
      return (
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        data.candidates?.[0]?.output ||
        "⚠️ No response from AI"
      );
    } catch (error) {
      console.error(error);
      return "⚠️ Error connecting to AI.";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const reply = await sendMessageToGemini(input);
    const botMessage: Message = { role: "bot", text: reply };
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-xl flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
      >
        <MessageCircle size={28} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-6 w-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border-2 border-green-500 z-50"
          >
            {/* Header */}
            <div className="bg-green-600 text-white px-4 py-3 font-semibold text-lg flex justify-between items-center">
              🌿 Krishi Mitra Assistant
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-green-700 p-1 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* Language Selector */}
            <div className="p-2 bg-green-50 border-b border-green-200">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2 rounded-md border border-green-300"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="mr">मराठी</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50 max-h-96">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg max-w-[80%] ${
                    msg.role === "user"
                      ? "bg-green-500 text-white self-end ml-auto"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex items-center border-t border-gray-200 p-2 gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Image size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Mic size={20} />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 border border-green-300 rounded-lg px-3 py-2 focus:outline-none"
              />
              <button
                onClick={handleSend}
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg"
              >
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

