"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Image as ImageIcon, Mic, X, LoaderCircle, Sparkles, ArrowUp, Languages } from "lucide-react";

// In this environment, the API Key is provided automatically during the fetch call.
// Leaving this as an empty string is the correct and secure way to configure it here.
const API_KEY = "AIzaSyA_Mhtt4qLxJNWdil1DUjViVRjo3jWVsUY"; 

type Message = { role: "user" | "bot"; text: string; html?: string; image?: string; suggestions?: string[] };

// Helper function to convert a file to a base64 string
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
  });
};

/* ----------  DYNAMIC SYSTEM PROMPT (with Suggestions) ---------- */
const DYNAMIC_PROMPT =
  "You are Krishi-Mitra, a friendly and expert agricultural assistant. " +
  "If an image is provided, always analyze it first. " +
  "Your goal is to provide clear, helpful, and well-formatted answers. " +
  "Follow these guidelines for your responses:\n\n" +
  "1.  **Be Conversational:** For simple greetings or questions, provide a short, direct answer without extra formatting.\n" +
  "2.  **Use Markdown:** Use standard Markdown to structure your answers when necessary. Use headings (`##`), bold (`** **`), bullet points (`-`), and tables where they make the information clearer.\n" +
  "3.  **Choose the Best Format:** Adapt your response structure to the user's query. \n" +
  "    - For step-by-step instructions, use a numbered or bulleted list.\n" +
  "    - For comparing items (e.g., fertilizers, crops), use a simple table.\n" +
  "    - For general information, use paragraphs with bolded keywords and headings.\n" +
  "4.  **Do NOT use a fixed template for every response.** The structure should be dynamic and appropriate to the question.\n" +
  "5.  **Suggest Next Steps:** After your main response, add a section titled '🤔 Suggested Questions:' followed by a numbered list of 2-3 relevant follow-up questions the user might ask. This is mandatory.\n" +
  `6.  Reply in the user's language.`;


/* ----------  MARKDOWN → HTML ---------- */
const mdToHtml = (md: string): string =>
  md
    .replace(/^### (.*$)/gim, "<h3 class='font-bold mt-2 text-base'>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2 class='font-bold text-lg mt-4 mb-2'>$1</h2>")
    .replace(/^# (.*$)/gim,  "<h1 class='font-bold text-xl mt-4 mb-2'>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong class='font-semibold'>$1</strong>")
    .replace(/^[\*\-] (.*$)/gim, "<li class='ml-4 list-disc'>$1</li>")
    .replace(/^\| (.+) \| (.+) \|$/gim, "<tr><td class='border px-2 py-1'>$1</td><td class='border px-2 py-1'>$2</td></tr>")
    .replace(/^\| (.+) \|$/gim, (match, p1) => { // Handle tables better
        const headers = p1.trim().split('|').map((h: string) => h.trim());
        if (headers.every((h: string) => /^-+$/.test(h))) return ""; // This is a separator line
        if (headers.length > 1) {
            const cells = headers.map((h: string) => `<td class='border px-2 py-1'>${h}</td>`).join('');
            return `<tr>${cells}</tr>`;
        }
        return match;
    })
    .replace(/<\/tr><tr>/g, '</tr></thead><tbody><tr>') // Basic table structure assumption
    .replace(/(<tr><td.*<\/td><\/tr>)/, "<table class='w-full text-sm mt-2 mb-2'><thead>$1")
    .replace(/(<\/tr>)$/, "$1</tbody></table>")
    .replace(/\n/g, "<br />");

/* ----------  RESUMABLE SPEAKER WITH NATIVE VOICE ---------- */
function Speaker({ text, lang }: { text: string; lang: string }) {
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [startChar, setStartChar] = useState(0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => setVoices(speechSynthesis.getVoices());
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      speechSynthesis.onvoiceschanged = null;
      speechSynthesis.cancel();
    };
  }, []);

  const clean = (str: string) =>
    str
      .replace(/#{1,3}\s/g, "")
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/[\*\-]/g, "")
      .replace(/\|/g, "")
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const toggle = () => {
    const synth = speechSynthesis;
    if (!text || voices.length === 0) return;

    if (speaking && !paused) {
      synth.pause();
      setPaused(true);
      return;
    }
    if (paused) {
      synth.resume();
      setPaused(false);
      return;
    }

    const fullText = clean(text);
    const chunk = fullText.slice(startChar);
    const utter = new SpeechSynthesisUtterance(chunk);
    
    const voice =
      voices.find((v) => v.lang.startsWith(lang)) ||
      voices.find((v) => v.lang.startsWith(lang.split("-")[0])) ||
      voices[0];
      
    utter.voice = voice;
    utter.lang = voice?.lang || lang;

    utter.onstart = () => { setSpeaking(true); setPaused(false); };
    utter.onend = () => { setSpeaking(false); setPaused(false); setStartChar(0); };
    utter.onboundary = (e: any) => { if (e.name === "word") setStartChar(startChar + e.charIndex); };

    synth.cancel();
    synth.speak(utter);
  };

  return (
    <button
      onClick={toggle}
      className={`ml-1 transition text-gray-400 hover:text-green-600`}
      aria-label={speaking && !paused ? "Pause" : "Speak"}
    >
      {speaking && !paused ? "⏸️" : "🔊"}
    </button>
  );
}

/* ----------  SUGGESTION BUTTONS COMPONENT ---------- */
function SuggestionButtons({ suggestions, onSuggestionClick }: { suggestions: string[], onSuggestionClick: (suggestion: string) => void }) {
    return (
        <div className="flex flex-col w-full max-w-full sm:max-w-[85%] self-start gap-2 mt-2">
            {suggestions.map((suggestion, index) => (
                <button
                    key={index}
                    onClick={() => onSuggestionClick(suggestion)}
                    className="flex items-center w-full text-left gap-2.5 text-sm bg-white border border-gray-200 text-gray-700 px-3.5 py-2.5 rounded-xl hover:bg-gray-100 transition-colors shadow-sm"
                >
                    <Sparkles size={16} className="flex-shrink-0 text-green-500" />
                    <span>{suggestion}</span>
                </button>
            ))}
        </div>
    );
}


export default function Chatbot() {
  const initialMessages = () => {
    try {
      const saved = localStorage.getItem("krishi-mitra-chat-history");
      const parsed = saved ? JSON.parse(saved) : [];
      if (parsed.length === 0) {
        return [{
            role: 'bot',
            text: "Namaste! I am Krishi Mitra, your agricultural assistant. How can I help you today?",
            html: "<p><strong>नमस्ते!</strong> मैं कृषि मित्र हूँ, आपका कृषि सहायक। आज मैं आपकी कैसे मदद कर सकता हूँ?</p>",
            suggestions: ["आज का मौसम पूर्वानुमान", "मेरे क्षेत्र में गेहूं की कीमत", "फसल रोग की पहचान करें"]
        }];
      }
      return parsed;
    } catch (error) {
        console.error("Failed to parse chat history from localStorage", error);
        return [];
    }
  };

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<"en-US" | "hi-IN" | "mr-IN" | "pa-IN">("hi-IN");
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    localStorage.setItem("krishi-mitra-chat-history", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      const recognition = recognitionRef.current;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev ? `${prev} ${transcript}` : transcript);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === 'network') {
          setSpeechError("Speech recognition failed. Please check your network and microphone permissions.");
        } else {
          setSpeechError(`Speech error: ${event.error}. Please try again.`);
        }
        setIsListening(false);
        setTimeout(() => setSpeechError(null), 5000);
      };

      recognition.onend = () => setIsListening(false);
      
      return () => recognition.abort();
    }
  }, [language]);

  const sendMessageToGemini = async (message: string, image: File | null) => {
    setIsLoading(true);
    let userParts: any[] = [{ text: `My question in ${language} is: ${message || "Please analyze the image."}` }];

    if (image) {
      try {
        const base64Image = await fileToBase64(image);
        userParts.unshift({
          inlineData: { mimeType: image.type, data: base64Image },
        });
      } catch (error) {
        console.error("Error converting image to base64:", error);
        setMessages(prev => [...prev, {role: 'bot', text: '⚠️ Error processing image.'}]);
        setIsLoading(false);
        return;
      }
    }

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              { role: "user", parts: [{ text: DYNAMIC_PROMPT }] },
              { role: "model", parts: [{ text: "Ok, I am Krishi-Mitra. I will provide clear, well-formatted answers adapted to your questions. How can I help?" }] },
              ...messages.slice(0, -1).map(m => ({
                  role: m.role === 'bot' ? 'model' : 'user', 
                  parts: [{text: m.text}]
              })),
              { role: "user", parts: userParts },
            ],
          }),
        }
      );
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        console.error("API Error Response:", errorData || "No response body");
        throw new Error(`API error: ${res.status} ${res.statusText}. Check the console for details.`);
      }

      const data = await res.json();
      let raw = data.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response";
      
      let suggestions: string[] = [];
      const suggestionRegex = /🤔 Suggested Questions:[\s\n]*((?:\d+\.\s.*[\s\n]*)+)/;
      const match = raw.match(suggestionRegex);
      
      if (match && match[1]) {
        suggestions = match[1].split('\n').map((q: string) => q.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
        raw = raw.replace(suggestionRegex, '').trim();
      }

      const htmlReply = mdToHtml(raw);
      const botMsg: Message = { role: "bot", text: raw, html: htmlReply, suggestions };
      setMessages((prev) => [...prev, botMsg]);

    } catch (err: any) {
      console.error("Caught error during API call:", err);
      const errorMsgText = err.message.includes('Failed to fetch') 
        ? 'Connection to the AI service failed. Please check your network connection.'
        : 'An API error occurred. Please check the console for details and try again.';
      const errorMsg: Message = { role: 'bot', text: `⚠️ ${errorMsgText}` };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = (text: string, imageFile: File | null, imagePreview: string | null) => {
    if (!text.trim() && !imageFile) return;
    
    const userMsg: Message = { role: "user", text, image: imagePreview || undefined };
    setMessages((prev) => [...prev, userMsg]);
    
    sendMessageToGemini(text, imageFile);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    handleSend(suggestion, null, null);
    setInput("");
  };

  const submitCurrentInput = () => {
    handleSend(input, imageFile, imagePreview);
    setInput("");
    setImageFile(null);
    setImagePreview(null);
  }
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submitCurrentInput();
  };

  const handleImageButtonClick = () => fileInputRef.current?.click();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  }

  const handleMicClick = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setSpeechError(null);
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (err) {
         console.error("Could not start recognition:", err)
         setSpeechError("Could not start voice recognition.");
         setIsListening(false);
      }
    }
  };

  const renderMsg = (m: Message, index: number) =>
    m.role === "user" ? (
      <div key={`user-${index}`} className="flex justify-end w-full">
        <div className="p-3.5 rounded-t-2xl rounded-bl-2xl max-w-full sm:max-w-[85%] bg-gradient-to-br from-green-500 to-green-600 text-white shadow-md">
          {m.image && <img src={m.image} alt="User upload" className="rounded-lg mb-2 max-w-full" />}
          {m.text}
        </div>
      </div>
    ) : (
      <div key={`bot-${index}`} className="flex flex-col items-start w-full gap-1">
        <div className="flex items-end gap-2">
            <div
              className="p-3.5 rounded-t-2xl rounded-br-2xl max-w-full sm:max-w-[85%] bg-white text-gray-800 border border-gray-200 shadow-sm"
              dangerouslySetInnerHTML={{ __html: m.html || m.text }}
            />
            <Speaker text={m.text} lang={language} />
        </div>
        {m.suggestions && m.suggestions.length > 0 && 
            <SuggestionButtons suggestions={m.suggestions} onSuggestionClick={handleSuggestionClick} />
        }
      </div>
    );

  return (
    <div>
      <motion.button
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-xl flex items-center justify-center z-[100]"
        onClick={() => setIsOpen(!isOpen)} 
        whileHover={{ scale: 1.1 }}
        animate={{ scale: isOpen ? 0.8 : 1, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <MessageCircle size={28} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="fixed inset-0 z-50 flex flex-col bg-white sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[85vh] sm:max-w-lg sm:rounded-2xl sm:border sm:border-gray-200 sm:shadow-2xl overflow-hidden"
          >
            <div className="flex-shrink-0 bg-gradient-to-br from-green-600 to-green-700 p-4 text-white flex justify-between items-center shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full">🌿</div>
                <h2 className="font-bold text-lg">Krishi Mitra Assistant</h2>
              </div>
              <motion.button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-white/20">
                <X size={24} />
              </motion.button>
            </div>
            
            <div className="flex-shrink-0 p-3 bg-gray-50 border-b border-gray-200">
                <div className="relative">
                    <Languages className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select 
                        value={language} 
                        onChange={(e) => setLanguage(e.target.value as any)} 
                        className="w-full bg-white border border-gray-300 rounded-lg p-2 pl-10 text-sm focus:ring-green-500 focus:border-green-500 appearance-none"
                    >
                        <option value="hi-IN">हिंदी (Hindi)</option>
                        <option value="en-US">English</option>
                        <option value="mr-IN">मराठी (Marathi)</option>
                        <option value="pa-IN">ਪੰਜਾਬੀ (Punjabi)</option>
                    </select>
                </div>
            </div>

            <div className="flex-1 p-4 space-y-5 overflow-y-auto bg-gray-50/80">
              {messages.map((msg, index) => renderMsg(msg, index))}
              {isLoading && (
                  <div className="flex items-center gap-3 text-gray-500 p-3.5">
                      <LoaderCircle className="animate-spin" size={20}/>
                      <span>Krishi-Mitra is thinking...</span>
                  </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="flex-shrink-0 border-t border-gray-200 bg-white/95 backdrop-blur-sm p-2">
                {imagePreview && (
                  <div className="p-2">
                    <div className="relative inline-block">
                      <img src={imagePreview} alt="Preview" className="h-20 w-20 object-cover rounded-lg"/>
                      <button onClick={removeImage} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md"><X size={14}/></button>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden"/>
                  <button onClick={handleImageButtonClick} className="p-3 text-gray-500 hover:bg-gray-100 rounded-full"><ImageIcon size={22} /></button>
                  <button onClick={handleMicClick} className={`p-3 rounded-full transition-colors ${isListening ? 'bg-red-100 text-red-500' : 'text-gray-500 hover:bg-gray-100'}`}><Mic size={22} /></button>
                  <input
                    type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
                    placeholder="Ask or upload an image..."
                    className="flex-1 bg-gray-100 border-transparent rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                    disabled={isLoading}
                  />
                  <button
                    onClick={submitCurrentInput}
                    className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
                    disabled={(!input.trim() && !imageFile) || isLoading}
                  >
                    <ArrowUp size={22} />
                  </button>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



