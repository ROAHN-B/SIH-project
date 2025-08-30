export type Language = "en" | "mr" | "hi" | "bn" | "kn" | "ta" | "te"

export const languages: Record<Language, string> = {
  en: "English",
  mr: "मराठी",
  hi: "हिन्दी",
  bn: "বাংলা",
  kn: "ಕನ್ನಡ",
  ta: "தமிழ்",
  te: "తెలుగు",
}

export const translations: Record<Language, any> = {
  // ✅ English
  en: {
    appName: "Smart Farming",
    heroTitle: "Grow Smarter with AI-Powered Farming",
    heroSubtitle: "Personalized crop advice, real-time weather, and expert guidance at your fingertips.",
    getCropAdvice: "Get Crop Advice",
    farmerProfile: "Farmer Profile",
    getAdviceNow: "Get Advice Now",
    footerTagline: "Empowering farmers with technology for a sustainable future.",
    helpline: "Helpline",
    availableLanguages: "Available in multiple languages",

    featuresTitle: "Powerful Features for Smarter Farming",
    cropAdvisory: "Crop Advisory",
    cropAdvisoryDesc: "AI-powered recommendations for better yields.",
    weatherUpdates: "Weather Updates",
    weatherUpdatesDesc: "Stay updated with real-time forecasts.",
    marketPrices: "Market Prices",
    marketPricesDesc: "Track prices for your crops instantly.",
    expertSupport: "Expert Support",
    expertSupportDesc: "Get guidance from agricultural experts.",

    voiceHelp: "Voice Help",
    listening: "Listening...",
    youAsked: "You asked",
    askQuestion: "Ask a Question",
    askQuestionDesc: "Type or speak your farming queries, and get instant advice.",
    questionPlaceholder: "What crop should I grow this season?",

    farmersHelped: "Farmers Helped",
    cropVarieties: "Crop Varieties",
    accuracyRate: "Accuracy Rate",
    yieldIncrease: "Yield Increase",
  },

  // ✅ Marathi
  mr: {
    appName: "स्मार्ट शेती",
    heroTitle: "एआयच्या मदतीने स्मार्ट शेती करा",
    heroSubtitle: "वैयक्तिक पीक सल्ला, हवामानाची माहिती आणि तज्ज्ञांचे मार्गदर्शन तुमच्या हातात.",
    getCropAdvice: "पीक सल्ला घ्या",
    farmerProfile: "शेतकरी प्रोफाईल",
    getAdviceNow: "सल्ला घ्या आत्ता",
    footerTagline: "शाश्वत भविष्यासाठी शेतकऱ्यांना तंत्रज्ञानाची साथ.",
    helpline: "हेल्पलाईन",
    availableLanguages: "उपलब्ध भाषा",

    featuresTitle: "स्मार्ट शेतीसाठी प्रभावी वैशिष्ट्ये",
    cropAdvisory: "पीक सल्ला",
    cropAdvisoryDesc: "जास्त उत्पादनासाठी एआय-आधारित शिफारसी.",
    weatherUpdates: "हवामान माहिती",
    weatherUpdatesDesc: "रिअल-टाईम हवामान अपडेट्स मिळवा.",
    marketPrices: "बाजारभाव",
    marketPricesDesc: "तुमच्या पिकांचे भाव तत्काळ जाणून घ्या.",
    expertSupport: "तज्ज्ञ मदत",
    expertSupportDesc: "कृषी तज्ज्ञांकडून मार्गदर्शन मिळवा.",

    voiceHelp: "व्हॉईस मदत",
    listening: "ऐकले जात आहे...",
    youAsked: "तुम्ही विचारले",
    askQuestion: "प्रश्न विचारा",
    askQuestionDesc: "तुमचे कृषी प्रश्न टाईप करा किंवा बोला आणि त्वरित सल्ला मिळवा.",
    questionPlaceholder: "या हंगामात कोणते पीक घ्यावे?",

    farmersHelped: "शेतकऱ्यांना मदत",
    cropVarieties: "पीक प्रकार",
    accuracyRate: "अचूकता दर",
    yieldIncrease: "उत्पन्न वाढ",
  },

  // ✅ Hindi
  hi: {
    appName: "स्मार्ट खेती",
    heroTitle: "एआई के साथ स्मार्ट खेती करें",
    heroSubtitle: "व्यक्तिगत फसल सलाह, मौसम अपडेट और विशेषज्ञ मार्गदर्शन आपकी उंगलियों पर।",
    getCropAdvice: "फसल सलाह लें",
    farmerProfile: "किसान प्रोफ़ाइल",
    getAdviceNow: "सलाह अभी लें",
    footerTagline: "किसानों को तकनीक से सशक्त बनाना।",
    helpline: "हेल्पलाइन",
    availableLanguages: "उपलब्ध भाषाएं",

    featuresTitle: "स्मार्ट खेती के लिए प्रभावशाली विशेषताएँ",
    cropAdvisory: "फसल सलाह",
    cropAdvisoryDesc: "बेहतर उत्पादन के लिए एआई आधारित सुझाव।",
    weatherUpdates: "मौसम अपडेट",
    weatherUpdatesDesc: "रीयल-टाइम पूर्वानुमान पाएं।",
    marketPrices: "बाजार भाव",
    marketPricesDesc: "अपनी फसलों के दाम तुरंत जानें।",
    expertSupport: "विशेषज्ञ सहायता",
    expertSupportDesc: "कृषि विशेषज्ञों से मार्गदर्शन प्राप्त करें।",

    voiceHelp: "वॉइस सहायता",
    listening: "सुन रहे हैं...",
    youAsked: "आपने पूछा",
    askQuestion: "प्रश्न पूछें",
    askQuestionDesc: "अपना कृषि प्रश्न टाइप करें या बोलें और तुरंत सलाह पाएं।",
    questionPlaceholder: "इस सीजन में कौन सी फसल लें?",

    farmersHelped: "किसानों की मदद",
    cropVarieties: "फसल किस्में",
    accuracyRate: "सटीकता दर",
    yieldIncrease: "उत्पादन वृद्धि",
  },

  // ✅ Bengali
  bn: {
    appName: "স্মার্ট কৃষি",
    heroTitle: "এআই দিয়ে স্মার্ট কৃষি",
    heroSubtitle: "ব্যক্তিগত ফসল পরামর্শ, আবহাওয়ার আপডেট এবং বিশেষজ্ঞের দিকনির্দেশনা।",
    getCropAdvice: "ফসল পরামর্শ নিন",
    farmerProfile: "কৃষকের প্রোফাইল",
    getAdviceNow: "পরামর্শ নিন এখনই",
    footerTagline: "কৃষকদের প্রযুক্তির মাধ্যমে শক্তিশালী করা।",
    helpline: "হেল্পলাইন",
    availableLanguages: "উপলব্ধ ভাষা",

    featuresTitle: "স্মার্ট কৃষির জন্য শক্তিশালী বৈশিষ্ট্য",
    cropAdvisory: "ফসল পরামর্শ",
    cropAdvisoryDesc: "ভালো ফলনের জন্য এআই ভিত্তিক সুপারিশ।",
    weatherUpdates: "আবহাওয়ার আপডেট",
    weatherUpdatesDesc: "রিয়েল-টাইম পূর্বাভাস পান।",
    marketPrices: "বাজার মূল্য",
    marketPricesDesc: "আপনার ফসলের দাম সঙ্গে সঙ্গে জানুন।",
    expertSupport: "বিশেষজ্ঞ সহায়তা",
    expertSupportDesc: "কৃষি বিশেষজ্ঞদের কাছ থেকে দিকনির্দেশনা পান।",

    voiceHelp: "ভয়েস সহায়তা",
    listening: "শোনা হচ্ছে...",
    youAsked: "আপনি জিজ্ঞাসা করেছেন",
    askQuestion: "প্রশ্ন জিজ্ঞাসা করুন",
    askQuestionDesc: "আপনার কৃষি প্রশ্ন লিখুন বা বলুন এবং তৎক্ষণাৎ পরামর্শ পান।",
    questionPlaceholder: "এই মৌসুমে কোন ফসল নেব?",

    farmersHelped: "কৃষকদের সহায়তা",
    cropVarieties: "ফসলের প্রজাতি",
    accuracyRate: "সঠিকতার হার",
    yieldIncrease: "উৎপাদন বৃদ্ধি",
  },

  // ✅ Kannada
  kn: {
    appName: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ",
    heroTitle: "ಎಐ ಸಹಾಯದಿಂದ ಸ್ಮಾರ್ಟ್ ಕೃಷಿ",
    heroSubtitle: "ವೈಯಕ್ತಿಕ ಬೆಳೆ ಸಲಹೆ, ಹವಾಮಾನ ನವೀಕರಣಗಳು ಮತ್ತು ತಜ್ಞರ ಮಾರ್ಗದರ್ಶನ ನಿಮ್ಮ ಕೈಯಲ್ಲಿ.",
    getCropAdvice: "ಬೆಳೆ ಸಲಹೆ ಪಡೆಯಿರಿ",
    farmerProfile: "ರೈತರ ಪ್ರೊಫೈಲ್",
    getAdviceNow: "ಸಲಹೆ ಪಡೆಯಿರಿ",
    footerTagline: "ಸ್ಥಿರ ಭವಿಷ್ಯಕ್ಕಾಗಿ ರೈತರನ್ನು ತಂತ್ರಜ್ಞಾನದೊಂದಿಗೆ ಶಕ್ತಿಪಡಿಸುವುದು.",
    helpline: "ಸಹಾಯವಾಣಿ",
    availableLanguages: "ಲಭ್ಯವಿರುವ ಭಾಷೆಗಳು",

    featuresTitle: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿಗಾಗಿ ಶಕ್ತಿಶಾಲಿ ವೈಶಿಷ್ಟ್ಯಗಳು",
    cropAdvisory: "ಬೆಳೆ ಸಲಹೆ",
    cropAdvisoryDesc: "ಉತ್ತಮ ಫಲಿತಾಂಶಕ್ಕಾಗಿ ಎಐ ಆಧಾರಿತ ಶಿಫಾರಸುಗಳು.",
    weatherUpdates: "ಹವಾಮಾನ ನವೀಕರಣಗಳು",
    weatherUpdatesDesc: "ರಿಯಲ್-ಟೈಮ್ ಮುನ್ಸೂಚನೆಗಳನ್ನು ಪಡೆಯಿರಿ.",
    marketPrices: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು",
    marketPricesDesc: "ನಿಮ್ಮ ಬೆಳೆ ಬೆಲೆಗಳನ್ನು ತಕ್ಷಣ ತಿಳಿಯಿರಿ.",
    expertSupport: "ತಜ್ಞರ ಸಹಾಯ",
    expertSupportDesc: "ಕೃಷಿ ತಜ್ಞರಿಂದ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.",

    voiceHelp: "ವಾಯ್ಸ್ ಸಹಾಯ",
    listening: "ಕೇಳಲಾಗುತ್ತಿದೆ...",
    youAsked: "ನೀವು ಕೇಳಿದಿರಿ",
    askQuestion: "ಪ್ರಶ್ನೆ ಕೇಳಿ",
    askQuestionDesc: "ನಿಮ್ಮ ಕೃಷಿ ಪ್ರಶ್ನೆಗಳನ್ನು ಟೈಪ್ ಮಾಡಿ ಅಥವಾ ಮಾತನಾಡಿ ಮತ್ತು ತಕ್ಷಣ ಸಲಹೆ ಪಡೆಯಿರಿ.",
    questionPlaceholder: "ಈ ಹಂಗಾಮಿನಲ್ಲಿ ಯಾವ ಬೆಳೆ ಬೆಳೆಸಬೇಕು?",

    farmersHelped: "ರೈತರಿಗೆ ಸಹಾಯ",
    cropVarieties: "ಬೆಳೆ ಜಾತಿಗಳು",
    accuracyRate: "ಖಚಿತತೆ ದರ",
    yieldIncrease: "ಉತ್ಪಾದನೆ ಹೆಚ್ಚಳ",
  },

  // ✅ Tamil
  ta: {
    appName: "ஸ்மார்ட் விவசாயம்",
    heroTitle: "ஏஐ உதவியுடன் ஸ்மார்ட் விவசாயம்",
    heroSubtitle: "தனிப்பட்ட பயிர் ஆலோசனை, காலநிலை புதுப்பிப்பு மற்றும் நிபுணர் வழிகாட்டுதல் உங்கள் கையில்.",
    getCropAdvice: "பயிர் ஆலோசனை பெறவும்",
    farmerProfile: "விவசாயி சுயவிவரம்",
    getAdviceNow: "உடனடி ஆலோசனை பெறவும்",
    footerTagline: "நிலையான எதிர்காலத்திற்காக விவசாயிகளை தொழில்நுட்பத்தால் வலுப்படுத்துதல்.",
    helpline: "உதவி எண்",
    availableLanguages: "கிடைக்கக்கூடிய மொழிகள்",

    featuresTitle: "ஸ್ಮಾರ್ಟ್ விவசಾಯத்திற்கான சக்திவாய்ந்த அம்சங்கள்",
    cropAdvisory: "பயிர் ஆலோசனை",
    cropAdvisoryDesc: "மேலும் சிறந்த விளைச்சலுக்கான ஏஐ அடிப்படையிலான பரிந்துரைகள்.",
    weatherUpdates: "வானிலை புதுப்பிப்புகள்",
    weatherUpdatesDesc: "நேரடி வானிலை முன்னறிவிப்பு.",
    marketPrices: "சந்தை விலை",
    marketPricesDesc: "உங்கள் பயிர்களின் விலைகளை உடனடியாக அறியவும்.",
    expertSupport: "நிபுணர் உதவி",
    expertSupportDesc: "விவசாய நிபுணர்களிடமிருந்து வழிகாட்டுதல் பெறவும்.",

    voiceHelp: "குரல் உதவி",
    listening: "கேட்கப்படுகிறது...",
    youAsked: "நீங்கள் கேட்டது",
    askQuestion: "கேள்வி கேட்கவும்",
    askQuestionDesc: "உங்கள் விவசாய கேள்விகளை தட்டச்சு செய்யவும் அல்லது பேசவும், உடனடி ஆலோசனை பெறவும்.",
    questionPlaceholder: "இந்த பருவத்தில் எந்த பயிரை வளர்க்கலாம்?",

    farmersHelped: "விவசாயிகள் உதவி பெற்றனர்",
    cropVarieties: "பயிர் வகைகள்",
    accuracyRate: "துல்லிய விகிதம்",
    yieldIncrease: "விளைச்சல் அதிகரிப்பு",
  },

  // ✅ Telugu
  te: {
    appName: "స్మార్ట్ వ్యవసాయం",
    heroTitle: "ఎఐ సహాయంతో స్మార్ట్ వ్యవసాయం",
    heroSubtitle: "వ్యక్తిగత పంట సలహాలు, వాతావరణ అప్‌డేట్‌లు మరియు నిపుణుల మార్గదర్శకం మీ చేతుల్లో.",
    getCropAdvice: "పంట సలహా పొందండి",
    farmerProfile: "రైతు ప్రొఫైల్",
    getAdviceNow: "ఇప్పుడే సలహా పొందండి",
    footerTagline: "స్థిరమైన భవిష్యత్తు కోసం రైతులను సాంకేతికతతో శక్తివంతం చేయడం.",
    helpline: "హెల్ప్‌లైన్",
    availableLanguages: "అందుబాటులో ఉన్న భాషలు",

    featuresTitle: "స్మార్ట్ వ్యవసాయం కోసం శక్తివంతమైన లక్షణాలు",
    cropAdvisory: "పంట సలహా",
    cropAdvisoryDesc: "మరింత పంట కోసం ఎఐ ఆధారిత సిఫార్సులు.",
    weatherUpdates: "వాతావరణ అప్‌డేట్‌లు",
    weatherUpdatesDesc: "తక్షణ వాతావరణ అంచనాలను పొందండి.",
    marketPrices: "మార్కెట్ ధరలు",
    marketPricesDesc: "మీ పంటల ధరలను వెంటనే తెలుసుకోండి.",
    expertSupport: "నిపుణుల సహాయం",
    expertSupportDesc: "వ్యవసాయ నిపుణుల నుండి మార్గదర్శకత్వం పొందండి.",

    voiceHelp: "వాయిస్ సహాయం",
    listening: "వినబడుతోంది...",
    youAsked: "మీరు అడిగారు",
    askQuestion: "ప్రశ్న అడగండి",
    askQuestionDesc: "మీ వ్యవసాయ ప్రశ్నలను టైప్ చేయండి లేదా మాట్లాడండి మరియు వెంటనే సలహా పొందండి.",
    questionPlaceholder: "ఈ సీజన్‌లో ఏ పంట వేయాలి?",

    farmersHelped: "రైతులకు సహాయం చేయబడింది",
    cropVarieties: "పంట రకాలు",
    accuracyRate: "ఖచ్చితత్వం",
    yieldIncrease: "ఉత్పత్తి పెరుగుదల",
  },
}


export function useTranslation(language: Language) {
  return translations[language]
}
