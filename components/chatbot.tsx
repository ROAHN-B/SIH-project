import React, { useState } from "react";
import { askGemini } from "./geminiService";
import { MessageSquare } from "lucide-react"; // chatbot icon

type Message = {
  role: "user" | "bot";
  text: string;
};

export default function ChatbotWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const reply = await askGemini(input);
      const botMessage = { role: "bot" as const, text: reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Floating Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-80 bg-white shadow-lg rounded-2xl border flex flex-col">
          <div className="h-64 overflow-y-auto p-2 border-b">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={msg.role === "user" ? "text-right" : "text-left"}
              >
                <span
                  className={
                    msg.role === "user"
                      ? "bg-blue-200 p-2 rounded-lg inline-block"
                      : "bg-gray-200 p-2 rounded-lg inline-block"
                  }
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="flex p-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 border rounded-l p-2"
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-4 rounded-r"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
