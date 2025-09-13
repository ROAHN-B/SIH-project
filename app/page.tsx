"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Chatbot from "@/components/chatbot"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet"
// ✨ 1. Import Dialog components for the mobile notification popup
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
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
  Bell,
  Menu,
} from "lucide-react"
import Link from "next/link"
import React from "react"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation, languages, type Language } from "@/lib/translations"
import { useAlerts } from "@/app/contexts/alert-context"
import { NotificationSimulator } from "@/components/notificationSimulator"


export default function HomePage() {
  const [isListening, setIsListening] = useState(false)
  const [voiceQuery, setVoiceQuery] = useState("")
  const [mounted, setMounted] = useState(false)
  const { language, setLanguage } = useLanguage()
  const t = useTranslation(language)
  const { alerts, hasUnreadAlerts, markAlertsAsRead } = useAlerts()
  const recognitionRef = useRef<any>(null);
  const [queryForChatbot, setQueryForChatbot] = useState("");

  const handleNotificationClick = () => {
    if (hasUnreadAlerts) markAlertsAsRead();
  };

  useEffect(() => {
    setMounted(true)
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language;
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setVoiceQuery(transcript);
        setQueryForChatbot(transcript);
        setIsListening(false);
      };
      recognition.onerror = (event: any) => { console.error("Speech recognition error:", event.error); setIsListening(false); };
      recognition.onend = () => setIsListening(false);
    }
  }, [language]);

  const toggleVoiceAssistant = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      if (recognitionRef.current) {
        setVoiceQuery("");
        setQueryForChatbot("");
        recognitionRef.current.start();
        setIsListening(true);
      } else {
        alert("Sorry, your browser does not support speech recognition.");
      }
    }
  }

  const features = [ { icon: <Sprout className="h-6 w-6 text-primary" />, title: t.cropAdvisory, description: t.cropAdvisoryDesc, href: "/advisory", color: "from-emerald-500 to-green-600" }, { icon: <Cloud className="h-6 w-6 text-blue-500" />, title: t.weatherUpdates, description: t.weatherUpdatesDesc, href: "/weather-market", color: "from-blue-500 to-cyan-600" }, { icon: <TrendingUp className="h-6 w-6 text-orange-500" />, title: t.marketPrices, description: t.marketPricesDesc, href: "/weather-market", color: "from-orange-500 to-red-600" }, { icon: <Users className="h-6 w-6 text-purple-500" />, title: t.expertSupport, description: t.expertSupportDesc, href: "#", color: "from-purple-500 to-pink-600" }, ]
  const stats = [ { icon: <Users className="h-6 w-6" />, value: "50K+", label: "Farmers Helped" }, { icon: <Leaf className="h-6 w-6" />, value: "200+", label: "Crop Varieties" }, { icon: <Sun className="h-6 w-6" />, value: "99%", label: "Accuracy Rate" }, { icon: <BarChart3 className="h-6 w-6" />, value: "30%", label: "Yield Increase" }, ]

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <header className="glass-effect border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative">
                <Sprout className="h-8 w-8 text-primary float-animation" />
                <div className="absolute -inset-1 bg-primary/20 rounded-full blur-sm"></div>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gradient">{t.appName}</h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2 sm:gap-4">
              <DropdownMenu onOpenChange={(open) => open && handleNotificationClick()}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative hover-lift">
                    <Bell className="h-5 w-5" />
                    {hasUnreadAlerts && (
                      <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 sm:w-96" sideOffset={12}>
                   <DropdownMenuLabel className="flex justify-between items-center">
                    <span>Notifications</span>
                    {alerts.length > 0 && <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{alerts.length} New</span>}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-80 overflow-y-auto pr-1">
                    {alerts.length > 0 ? (
                      alerts.map((alert, index) => (
                        <DropdownMenuItem key={index} className="flex items-start gap-3 whitespace-normal cursor-pointer p-3 transition-transform duration-200 hover:scale-[1.03]">
                          <div className="mt-1">
                            {alert.type === 'weather' ? <Cloud className="h-4 w-4 text-blue-500" /> : <TrendingUp className="h-4 w-4 text-orange-500" />}
                          </div>
                          <div className="flex flex-col">
                            <p className="font-semibold text-sm leading-tight">{alert.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                          </div>
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <DropdownMenuItem disabled className="p-3 text-center">You're all caught up!</DropdownMenuItem>
                    )}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/weather-market" className="cursor-pointer w-full justify-center">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      <span>View Weather & Markets</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <div className="flex items-center gap-2 hover-lift">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <select value={language} onChange={(e) => setLanguage(e.target.value as Language)} className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-sm hover:border-primary/50 transition-colors">
                  {Object.entries(languages).map(([code, name]) => (<option key={code} value={code}>{name}</option>))}
                </select>
              </div>

              <Button onClick={toggleVoiceAssistant} variant={isListening ? "default" : "outline"} size="sm" className={`flex items-center gap-2 hover-lift ${isListening ? "pulse-glow" : ""}`}>
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                <span className="hidden sm:inline">{isListening ? t.listening : t.voiceHelp}</span>
              </Button>
            </nav>

            {/* Mobile Navigation (Hamburger Menu) */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-sm">
                  <SheetHeader>
                    <SheetTitle>{t.appName} Menu</SheetTitle>
                    <SheetDescription>Quick access to all features.</SheetDescription>
                  </SheetHeader>
                  <nav className="flex flex-col gap-4 py-4">
                    {/* ✨ 2. This is now a Dialog Trigger, not a Link */}
                    <Dialog onOpenChange={(open) => open && handleNotificationClick()}>
                      <DialogTrigger asChild>
                        <button className="w-full flex items-center justify-between rounded-lg p-3 text-base font-medium hover:bg-muted transition-colors text-left">
                          <div className="flex items-center gap-3">
                            <Bell className="h-5 w-5" />
                            <span>Notifications</span>
                          </div>
                          {hasUnreadAlerts && (
                            <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>
                          )}
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Notifications</DialogTitle>
                          <DialogDescription>Here are your latest updates.</DialogDescription>
                        </DialogHeader>
                        <div className="max-h-[60vh] overflow-y-auto p-1">
                          {alerts.length > 0 ? (
                            alerts.map((alert, index) => (
                              <div key={index} className="flex items-start gap-3 p-3 border-b last:border-b-0">
                                <div className="mt-1">
                                  {alert.type === 'weather' ? <Cloud className="h-4 w-4 text-blue-500" /> : <TrendingUp className="h-4 w-4 text-orange-500" />}
                                </div>
                                <div className="flex flex-col">
                                  <p className="font-semibold text-sm leading-tight">{alert.title}</p>
                                  <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="p-4 text-center text-sm text-muted-foreground">You're all caught up!</p>
                          )}
                        </div>
                        <div className="pt-4 border-t">
                          <Button asChild className="w-full">
                            <Link href="/weather-market">
                              <BarChart3 className="mr-2 h-4 w-4" />
                              View Weather & Markets
                            </Link>
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <div className="flex items-center rounded-lg p-3 text-base font-medium">
                      <div className="flex items-center gap-3"><Globe className="h-5 w-5" /><span>Language</span></div>
                      <select id="mobile-lang-select" value={language} onChange={(e) => setLanguage(e.target.value as Language)} className="w-full bg-transparent text-right text-base border-0 focus:ring-0">
                        {Object.entries(languages).map(([code, name]) => (<option key={code} value={code}>{name}</option>))}
                      </select>
                    </div>
                     <Button onClick={toggleVoiceAssistant} variant={isListening ? "default" : "outline"} size="lg" className={`w-full flex items-center justify-center gap-3 text-base ${isListening ? "pulse-glow" : ""}`}>
                        {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                        {isListening ? t.listening : t.voiceHelp}
                      </Button>
                    <Separator className="my-2" />
                    <h4 className="px-3 text-sm font-semibold text-muted-foreground">Key Features</h4>
                    <div className="flex flex-col gap-1">
                        {features.map((feature, index) => (
                            <Link key={index} href={feature.href} className="flex items-center gap-4 p-3 rounded-md hover:bg-muted transition-colors text-base font-medium">
                                {React.cloneElement(feature.icon, { className: "h-6 w-6" })}
                                <span>{feature.title}</span>
                            </Link>
                        ))}
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      
      {/* ... Rest of JSX is unchanged ... */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-10"></div>
        <div className="absolute inset-0 bg-[url('/abstract-agricultural-pattern.png')] opacity-5"></div>
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <div className={`${mounted ? "bounce-in" : ""}`} style={{ animationDelay: "0.2s" }}>
            <div className="flex justify-center mb-6"><div className="relative"><Sparkles className="h-12 w-12 sm:h-16 sm:w-16 text-primary float-animation" /><div className="absolute -inset-2 bg-primary/20 rounded-full blur-lg"></div></div></div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gradient mb-4 sm:mb-6 text-balance">{t.heroTitle}</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 text-pretty">{t.heroSubtitle}</p>
          </div>
          {voiceQuery && (<Card className={`mb-8 bg-primary/5 border-primary/20 hover-lift ${mounted ? "bounce-in" : ""}`} style={{ animationDelay: "0.4s" }}><CardContent className="pt-6"><div className="flex items-center gap-2 text-primary text-sm sm:text-base"><MessageSquare className="h-5 w-5 float-animation" /><span className="font-medium text-left">{t.youAsked}: "{voiceQuery}"</span></div></CardContent></Card>)}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 ${mounted ? "bounce-in" : ""}`} style={{ animationDelay: "0.6s" }}>
            <Link href="/advisory"><Button size="lg" className="text-base px-6 py-4 sm:text-lg sm:px-8 sm:py-6 hover-lift bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"><Sprout className="mr-2 h-5 w-5" />{t.getCropAdvice}</Button></Link>
            <Link href="/profile"><Button size="lg" variant="outline" className="text-base px-6 py-4 sm:text-lg sm:px-8 sm:py-6 hover-lift glass-effect bg-transparent"><Users className="mr-2 h-5 w-5" />{t.farmerProfile}</Button></Link>
          </div>
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 ${mounted ? "bounce-in" : ""}`} style={{ animationDelay: "0.8s" }}>
            {stats.map((stat, index) => (<Card key={index} className="glass-effect hover-lift"><CardContent className="pt-6 text-center"><div className="flex justify-center mb-2 text-primary">{stat.icon}</div><div className="text-xl sm:text-2xl font-bold text-gradient">{stat.value}</div><div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div></CardContent></Card>))}
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20 px-4 bg-muted/30 relative">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 text-gradient">{t.featuresTitle}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (<Link key={index} href={feature.href}><Card className={`text-center hover-lift cursor-pointer glass-effect group ${mounted ? "bounce-in" : ""}`} style={{ animationDelay: `${1 + index * 0.1}s` }}><CardHeader><div className="flex justify-center mb-4 relative"><div className={`p-4 rounded-full bg-gradient-to-r ${feature.color} group-hover:scale-110 transition-transform duration-300`}>{React.cloneElement(feature.icon, { className: "h-8 w-8" })}</div></div><CardTitle className="text-xl group-hover:text-primary transition-colors">{feature.title}</CardTitle></CardHeader><CardContent><CardDescription className="text-base">{feature.description}</CardDescription></CardContent></Card></Link>))}
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5"></div>
        <div className="container mx-auto max-w-2xl relative z-10">
          <Card className={`glass-effect hover-lift ${mounted ? "bounce-in" : ""}`} style={{ animationDelay: "1.4s" }}>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl sm:text-3xl text-gradient">{t.askQuestion}</CardTitle>
              <CardDescription className="text-base sm:text-lg">{t.askQuestionDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input placeholder={t.questionPlaceholder} className="text-base sm:text-lg py-4 sm:py-6 glass-effect border-primary/20 focus:border-primary/50" value={voiceQuery} onChange={(e) => setVoiceQuery(e.target.value)} />
                <Button onClick={toggleVoiceAssistant} size="lg" variant={isListening ? "default" : "outline"} className={`px-4 sm:px-6 hover-lift ${isListening ? "pulse-glow" : ""}`}>{isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}</Button>
              </div>
              <Link href="/advisory"><Button className="w-full mt-4 text-base sm:text-lg py-4 sm:py-6 hover-lift bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">{t.getAdviceNow}</Button></Link>
            </CardContent>
          </Card>
        </div>
      </section>
      <footer className="glass-effect border-t py-10 sm:py-12 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
            <div className="relative"><Sprout className="h-8 w-8 text-primary float-animation" /><div className="absolute -inset-1 bg-primary/20 rounded-full blur-sm"></div></div>
            <span className="text-xl sm:text-2xl font-bold text-gradient">{t.appName}</span>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground mb-4">{t.footerTagline}</p>
          <p className="text-xs sm:text-sm text-muted-foreground">{t.helpline}: 1800-XXX-XXXX | {t.availableLanguages}</p>
        </div>
      </footer>

      <Chatbot 
        initialQuery={queryForChatbot} 
        onQueryProcessed={() => setQueryForChatbot("")} 
      />
      <NotificationSimulator />
    </div>
  )
}