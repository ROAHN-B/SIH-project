"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, Mic, MicOff, X, Minimize2, Maximize2, Bot, User, Trash2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/translations"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()
  const t = useTranslation(language)

  const suggestions = [t.suggestion1, t.suggestion2, t.suggestion3, t.suggestion4, t.suggestion5]

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message when chat opens for the first time
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: t.chatWelcome,
        isBot: true,
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, t.chatWelcome])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (text: string = inputValue) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(text.trim())
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    // Simple response logic based on keywords
    if (input.includes("crop") || input.includes("plant") || input.includes("फसल") || input.includes("বীজ")) {
      return language === "hi"
        ? "आपकी मिट्टी और जलवायु के आधार पर, मैं धान, गेहूं, या दालें सुझाऊंगा। आपकी मिट्टी का प्रकार क्या है?"
        : "Based on your soil and climate, I'd recommend rice, wheat, or pulses. What's your soil type?"
    }

    if (input.includes("weather") || input.includes("rain") || input.includes("मौसम") || input.includes("বৃষ্টি")) {
      return language === "hi"
        ? "इस सप्ताह हल्की बारिश की संभावना है। अपनी फसलों को सुरक्षित रखें और जल निकासी की व्यवस्था करें।"
        : "Light rainfall is expected this week. Keep your crops protected and ensure proper drainage."
    }

    if (input.includes("price") || input.includes("market") || input.includes("भाव") || input.includes("দাম")) {
      return language === "hi"
        ? "आज के बाज़ार भाव: धान ₹2,200/क्विंटल, गेहूं ₹2,500/क्विंटल। कल की तुलना में 3% वृद्धि।"
        : "Today's market rates: Rice ₹2,200/quintal, Wheat ₹2,500/quintal. 3% increase from yesterday."
    }

    if (input.includes("pest") || input.includes("disease") || input.includes("कीट") || input.includes("পোকা")) {
      return language === "hi"
        ? "कीट नियंत्रण के लिए नीम का तेल या जैविक कीटनाशक का उपयोग करें। नियमित निरीक्षण जरूरी है।"
        : "For pest control, use neem oil or organic pesticides. Regular inspection is essential."
    }

    // Default response
    return language === "hi"
      ? "मैं आपकी मदद करने के लिए यहाँ हूँ। कृपया अपना प्रश्न और विस्तार से बताएं या सुझावों में से चुनें।"
      : "I'm here to help you! Please provide more details about your question or choose from the suggestions."
  }

  const toggleVoiceInput = () => {
    setIsListening(!isListening)
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setInputValue(t.suggestion1)
        setIsListening(false)
      }, 2000)
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        text: t.chatWelcome,
        isBot: true,
        timestamp: new Date(),
      },
    ])
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg hover-lift bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 pulse-glow"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card
        className={`glass-effect border-primary/20 shadow-2xl transition-all duration-300 ${
          isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
        }`}
      >
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-primary/10">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Bot className="h-6 w-6 text-primary float-animation" />
              <div className="absolute -inset-1 bg-primary/20 rounded-full blur-sm"></div>
            </div>
            <CardTitle className="text-lg text-gradient">{t.chatbot}</CardTitle>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearChat}
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsMinimized(!isMinimized)} className="h-8 w-8 p-0">
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[calc(600px-80px)]">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-2 ${message.isBot ? "justify-start" : "justify-end"}`}
                  >
                    {message.isBot && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isBot
                          ? "bg-gray-100/50 text-gray-900"
                          : "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    {!message.isBot && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-accent" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-gray-100/50 p-3 rounded-lg">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Quick Suggestions */}
            {messages.length <= 1 && (
              <div className="p-4 border-t border-primary/10">
                <p className="text-sm text-gray-500 mb-2">{t.chatSuggestions}:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.slice(0, 3).map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendMessage(suggestion)}
                      className="text-xs h-8 hover-lift"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-primary/10">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t.chatPlaceholder}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 glass-effect border-primary/20 focus:border-primary/50"
                />
                <Button
                  onClick={toggleVoiceInput}
                  variant={isListening ? "default" : "outline"}
                  size="sm"
                  className={`px-3 hover-lift ${isListening ? "pulse-glow" : ""}`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button
                  onClick={() => handleSendMessage()}
                  size="sm"
                  className="px-3 hover-lift bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  disabled={!inputValue.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
