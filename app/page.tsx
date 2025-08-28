"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Chatbot } from "@/components/chatbot"
import {
  Mic,
  MicOff,
  Sprout,
  Cloud,
  TrendingUp,
  Users,
  Globe,
  MessageSquare,
  Sparkles,
  Leaf,
  Sun,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation, languages, type Language } from "@/lib/translations"

export default function HomePage() {
  const [isListening, setIsListening] = useState(false)
  const [voiceQuery, setVoiceQuery] = useState("")
  const [mounted, setMounted] = useState(false)
  const { language, setLanguage } = useLanguage()
  const t = useTranslation(language)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleVoiceAssistant = () => {
    setIsListening(!isListening)
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setVoiceQuery(t.questionPlaceholder)
        setIsListening(false)
      }, 3000)
    }
  }

  const features = [
    {
      icon: <Sprout className="h-8 w-8 text-primary" />,
      title: t.cropAdvisory,
      description: t.cropAdvisoryDesc,
      href: "/advisory",
      color: "from-emerald-500 to-green-600",
    },
    {
      icon: <Cloud className="h-8 w-8 text-blue-500" />,
      title: t.weatherUpdates,
      description: t.weatherUpdatesDesc,
      href: "/weather-market",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-orange-500" />,
      title: t.marketPrices,
      description: t.marketPricesDesc,
      href: "/weather-market",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: t.expertSupport,
      description: t.expertSupportDesc,
      href: "#",
      color: "from-purple-500 to-pink-600",
    },
  ]

  const stats = [
    { icon: <Users className="h-6 w-6" />, value: "50K+", label: "Farmers Helped" },
    { icon: <Leaf className="h-6 w-6" />, value: "200+", label: "Crop Varieties" },
    { icon: <Sun className="h-6 w-6" />, value: "99%", label: "Accuracy Rate" },
    { icon: <BarChart3 className="h-6 w-6" />, value: "30%", label: "Yield Increase" },
  ]

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <header className="glass-effect border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-2 ${mounted ? "bounce-in" : ""}`}>
              <div className="relative">
                <Sprout className="h-8 w-8 text-primary float-animation" />
                <div className="absolute -inset-1 bg-primary/20 rounded-full blur-sm"></div>
              </div>
              <h1 className="text-2xl font-bold text-gradient">{t.appName}</h1>
            </div>

            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="flex items-center gap-2 hover-lift">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2 text-sm hover:border-primary/50 transition-colors"
                >
                  {Object.entries(languages).map(([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Voice Assistant Toggle */}
              <Button
                onClick={toggleVoiceAssistant}
                variant={isListening ? "default" : "outline"}
                size="sm"
                className={`flex items-center gap-2 hover-lift ${isListening ? "pulse-glow" : ""}`}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                {isListening ? t.listening : t.voiceHelp}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-10"></div>
        <div className="absolute inset-0 bg-[url('/abstract-agricultural-pattern.png')] opacity-5"></div>

        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <div className={`${mounted ? "bounce-in" : ""}`} style={{ animationDelay: "0.2s" }}>
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Sparkles className="h-16 w-16 text-primary float-animation" />
                <div className="absolute -inset-2 bg-primary/20 rounded-full blur-lg"></div>
              </div>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-gradient mb-6 text-balance">{t.heroTitle}</h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty">{t.heroSubtitle}</p>
          </div>

          {/* Voice Query Display */}
          {voiceQuery && (
            <Card
              className={`mb-8 bg-primary/5 border-primary/20 hover-lift ${mounted ? "bounce-in" : ""}`}
              style={{ animationDelay: "0.4s" }}
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-primary">
                  <MessageSquare className="h-5 w-5 float-animation" />
                  <span className="font-medium">
                    {t.youAsked}: "{voiceQuery}"
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 ${mounted ? "bounce-in" : ""}`}
            style={{ animationDelay: "0.6s" }}
          >
            <Link href="/advisory">
              <Button
                size="lg"
                className="text-lg px-8 py-6 hover-lift bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              >
                <Sprout className="mr-2 h-5 w-5" />
                {t.getCropAdvice}
              </Button>
            </Link>
            <Link href="/profile">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 hover-lift glass-effect bg-transparent">
                <Users className="mr-2 h-5 w-5" />
                {t.farmerProfile}
              </Button>
            </Link>
          </div>

          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${mounted ? "bounce-in" : ""}`}
            style={{ animationDelay: "0.8s" }}
          >
            {stats.map((stat, index) => (
              <Card key={index} className="glass-effect hover-lift">
                <CardContent className="pt-6 text-center">
                  <div className="flex justify-center mb-2 text-primary">{stat.icon}</div>
                  <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/30 relative">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-4xl font-bold text-center mb-16 text-gradient">{t.featuresTitle}</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href}>
                <Card
                  className={`text-center hover-lift cursor-pointer glass-effect group ${mounted ? "bounce-in" : ""}`}
                  style={{ animationDelay: `${1 + index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex justify-center mb-4 relative">
                      <div
                        className={`p-4 rounded-full bg-gradient-to-r ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                      >
                        {feature.icon}
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5"></div>
        <div className="container mx-auto max-w-2xl relative z-10">
          <Card className={`glass-effect hover-lift ${mounted ? "bounce-in" : ""}`} style={{ animationDelay: "1.4s" }}>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-gradient">{t.askQuestion}</CardTitle>
              <CardDescription className="text-lg">{t.askQuestionDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder={t.questionPlaceholder}
                  className="text-lg py-6 glass-effect border-primary/20 focus:border-primary/50"
                  value={voiceQuery}
                  onChange={(e) => setVoiceQuery(e.target.value)}
                />
                <Button
                  onClick={toggleVoiceAssistant}
                  size="lg"
                  variant={isListening ? "default" : "outline"}
                  className={`px-6 hover-lift ${isListening ? "pulse-glow" : ""}`}
                >
                  {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
              </div>
              <Link href="/advisory">
                <Button className="w-full mt-4 text-lg py-6 hover-lift bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                  {t.getAdviceNow}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="glass-effect border-t py-12 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="relative">
              <Sprout className="h-8 w-8 text-primary float-animation" />
              <div className="absolute -inset-1 bg-primary/20 rounded-full blur-sm"></div>
            </div>
            <span className="text-2xl font-bold text-gradient">{t.appName}</span>
          </div>
          <p className="text-lg text-muted-foreground mb-4">{t.footerTagline}</p>
          <p className="text-sm text-muted-foreground">
            {t.helpline}: 1800-XXX-XXXX | {t.availableLanguages}
          </p>
        </div>
      </footer>

      <Chatbot />
    </div>
  )
}
