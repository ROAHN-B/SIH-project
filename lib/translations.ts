export type Language = "mr"|"en" | "hi" | "bn" | "ta" | "te" | "kn"

export const languages = {
  en: "English",
  mr: "मराठी",
  hi: "हिंदी",
  bn: "বাংলা",
  ta: "தமிழ்",
  te: "తెలుగు",
  kn: "ಕನ್ನಡ",
}

export const translations= {
  en: {
    // Header
    heroSubtitle:
      "Get expert crop advice, weather updates, and market information - all in your language, with voice support",
    youAsked: "You asked",
    getCropAdvice: "Get Crop Advice",
    callExpert: "Call Expert",

    // Features
    featuresTitle: "Everything You Need for Better Farming",
    cropAdvisory: "Crop Advisory",
    cropAdvisoryDesc: "Get personalized crop recommendations based on your soil and climate",
    weatherUpdates: "Weather Updates",
    weatherUpdatesDesc: "Real-time weather forecasts and alerts for your farming area",
    marketPrices: "Market Prices",
    marketPricesDesc: "Latest market rates and price trends for your crops",
    expertSupport: "Expert Support",
    expertSupportDesc: "Connect with agricultural experts and fellow farmers",

    // Query Section
    askQuestion: "Ask Your Farming Question",
    askQuestionDesc: "Type your question or use voice input for instant advice",
    questionPlaceholder: "What crops should I plant this season?",
    getAdviceNow: "Get Advice Now",

    // Footer
    footerTagline: "Empowering small and marginal farmers with smart technology",
    helpline: "Helpline",
    availableLanguages: "Available in 6+ languages",

    // Advisory Page
    cropAdvisoryDashboard: "Crop Advisory Dashboard",
    backToHome: "Back to Home",
    farmDetails: "Farm Details",
    farmDetailsDesc: "Tell us about your farm to get personalized recommendations",
    location: "Location (Village, District, State)",
    locationPlaceholder: "e.g., Pune, Maharashtra",
    soilType: "Soil Type",
    soilTypePlaceholder: "Select your soil type",
    farmSize: "Farm Size (in acres)",
    farmSizePlaceholder: "e.g., 2.5",
    plantingSeason: "Planting Season",
    plantingSeasonPlaceholder: "Select planting season",
    additionalInfo: "Additional Information",
    previousCrop: "Previous Crop (if any)",
    previousCropPlaceholder: "e.g., Rice, Cotton, Sugarcane",
    budgetRange: "Budget Range (₹)",
    budgetPlaceholder: "e.g., 50,000 - 1,00,000",
    farmingExperience: "Farming Experience",
    experiencePlaceholder: "Select your experience level",
    getCropRecommendations: "Get Crop Recommendations",

    // How it works
    howItWorks: "How It Works",
    step1: "Fill in your farm details and location",
    step2: "Our AI analyzes soil, climate, and market data",
    step3: "Get personalized crop recommendations",
    step4: "Follow expert tips for maximum yield",

    // Current conditions
    currentConditions: "Current Conditions",
    humidity: "Humidity",
    goodForPlanting: "Good for Planting",

    // Recommendations
    recommendedCrops: "Recommended Crops for Your Farm",
    modifyDetails: "Modify Details",
    expectedYield: "Expected Yield",
    investment: "Investment",
    duration: "Duration",
    marketPrice: "Market Price",
    expertTips: "Expert Tips",
    needConsultation: "Need Expert Consultation?",
    consultationText: "Call our agricultural experts at",
    forGuidance: "for personalized guidance",

    // Soil types
    claySoil: "Clay Soil",
    sandySoil: "Sandy Soil",
    loamySoil: "Loamy Soil",
    siltSoil: "Silt Soil",
    redSoil: "Red Soil",
    blackSoil: "Black Soil",
    alluvialSoil: "Alluvial Soil",

    // Seasons
    kharif: "Kharif (Monsoon)",
    rabi: "Rabi (Winter)",
    zaid: "Zaid (Summer)",

    // Experience levels
    beginner: "Beginner (0-2 years)",
    intermediate: "Intermediate (3-5 years)",
    experienced: "Experienced (5+ years)",

    // Risk levels
    lowRisk: "Low Risk",
    mediumRisk: "Medium Risk",
    highRisk: "High Risk",

    // Suitability
    excellent: "Excellent",
    veryGood: "Very Good",
    good: "Good",

    // Weather & Market Info
    weatherMarketInfo: "Weather & Market Info",
    currentWeather: "Current Weather",
    weatherForecast: "7-Day Forecast",
    priceAlerts: "Price Alerts",
    weatherAlerts: "Weather Alerts",
    temperature: "Temperature",
    rainfall: "Rainfall",
    windSpeed: "Wind Speed",
    uvIndex: "UV Index",
    visibility: "Visibility",
    pressure: "Pressure",
    feelsLike: "Feels Like",

    // Market Info
    todaysPrices: "Today's Prices",
    priceChange: "Price Change",
    marketTrends: "Market Trends",
    cropPrices: "Crop Prices",
    lastUpdated: "Last Updated",
    pricePerKg: "Price per Kg",
    wholesale: "Wholesale",
    retail: "Retail",

    // Alerts
    weatherWarning: "Weather Warning",
    priceAlert: "Price Alert",
    heavyRainAlert: "Heavy rain expected in your area. Protect your crops.",
    heatWaveAlert: "Heat wave warning. Ensure adequate irrigation.",
    priceDropAlert: "Tomato prices dropped by 15%. Consider selling soon.",
    priceRiseAlert: "Onion prices increased by 20%. Good time to sell.",

    // Days of week
    today: "Today",
    tomorrow: "Tomorrow",
    monday: "Monday",
    tuesday: "Tuesday",    appName: "KrishiMitra",
    voiceHelp: "Voice Help",
    listening: "Listening...",

    // Homepage
    heroTitle: "Smart Farming Made Simple",

    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",

    // Weather conditions
    sunny: "Sunny",
    cloudy: "Cloudy",
    rainy: "Rainy",
    stormy: "Stormy",
    partlyCloudy: "Partly Cloudy",
    overcast: "Overcast",

    // Market locations
    nearbyMarkets: "Nearby Markets",
    mandiPrices: "Mandi Prices",
    selectMarket: "Select Market",

    // Profile Page
    farmerProfile: "Farmer Profile",
    personalInfo: "Personal Information",
    farmDetails: "Farm Details",
    preferences: "Preferences",
    activityHistory: "Activity History",
    editProfile: "Edit Profile",
    saveProfile: "Save Profile",

    // Personal Info
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    village: "Village",
    district: "District",
    state: "State",

    // Farm Details
    farmSize: "Farm Size (acres)",
    soilType: "Soil Type",
    irrigationType: "Irrigation Type",
    mainCrops: "Main Crops",

    // History
    recentActivities: "Recent Activities",
    cropQueries: "Crop Queries",
    weatherChecks: "Weather Checks",
    marketPriceChecks: "Market Price Checks",
    noHistory: "No activity history yet",

    // Activity Types
    queriedCrop: "Queried crop advice for",
    checkedWeather: "Checked weather for",
    checkedMarket: "Checked market prices for",

    // Profile Success
    profileUpdated: "Profile updated successfully",
    profileSaved: "Profile saved successfully",

    // Chatbot
    chatbot: "AI Assistant",
    chatWithBot: "Chat with AI",
    askAnything: "Ask me anything about farming",
    chatPlaceholder: "Type your farming question here...",
    sendMessage: "Send",
    chatWelcome: "Hello! I'm your AI farming assistant. How can I help you today?",
    chatTyping: "AI is typing...",
    voiceInput: "Voice Input",
    clearChat: "Clear Chat",
    chatHistory: "Chat History",
    newChat: "New Chat",
    chatSuggestions: "Quick Questions",
    suggestion1: "What crops are best for my soil?",
    suggestion2: "When should I plant rice?",
    suggestion3: "How to prevent pest attacks?",
    suggestion4: "What's the weather forecast?",
    suggestion5: "Current market prices?",
    chatError: "Sorry, I couldn't process that. Please try again.",
    chatOffline: "Chat is currently offline. Please try again later.",
  },
  mr: {
    // Header
    heroSubtitle:
      "तज्ज्ञांचे पिक सल्ले, हवामान अद्यतने आणि बाजार माहिती - तुमच्या भाषेत, व्हॉइस सपोर्टसह",
    youAsked: "तुम्ही विचारले",
    getCropAdvice: "फळसल सल्ला मिळवा",
    callExpert: "तज्ज्ञांना कॉल करा",

    // Features
    featuresTitle: "चांगल्या शेतीसाठी सर्वकाही",
    cropAdvisory: "फळसल सल्ला",
    cropAdvisoryDesc: "तुमच्या माती व हवामानानुसार वैयक्तिक शिफारसी मिळवा",
    weatherUpdates: "हवामान अद्यतने",
    weatherUpdatesDesc: "तुमच्या शेतासाठी रिअल-टाइम हवामान अंदाज आणि इशारे",
    marketPrices: "बाजार दर",
    marketPricesDesc: "तुमच्या पिकांसाठी नवीनतम बाजार दर आणि किंमत ट्रेंड",
    expertSupport: "तज्ज्ञांचे सहाय्य",
    expertSupportDesc: "कृषि तज्ज्ञ व इतर शेतकर्‍यांशी संपर्क करा",

    // Query Section
    askQuestion: "तुमचा शेती प्रश्न विचारा",
    askQuestionDesc: "तुमचा प्रश्न टाईप करा किंवा त्वरित सल्ल्यासाठी व्हॉइस वापरा",
    questionPlaceholder: "या हंगामात कोणती पिके लावावी?",
    getAdviceNow: "आता सल्ला मिळवा",

    // Footer
    footerTagline: "स्मार्ट तंत्रज्ञानाने लहान व सीमांत शेतकर्‍यांना समर्थ बनवणे",
    helpline: "हेल्पलाइन",
    availableLanguages: "६+ भाषांमध्ये उपलब्ध",

    // Advisory Page
    cropAdvisoryDashboard: "फळसल सल्ला डॅशबोर्ड",
    backToHome: "मुख्यपृष्ठावर परत जा",
    farmDetails: "शेताची माहिती",
    farmDetailsDesc: "वैयक्तिक शिफारसीसाठी तुमच्या शेताची माहिती द्या",
    location: "स्थान (गाव, जिल्हा, राज्य)",
    locationPlaceholder: "उदा., पुणे, महाराष्ट्र",
    soilType: "मातीचा प्रकार",
    soilTypePlaceholder: "तुमच्या मातीचा प्रकार निवडा",
    farmSize: "शेताचे क्षेत्रफळ (एकरांमध्ये)",
    farmSizePlaceholder: "उदा., 2.5",
    plantingSeason: "पिक लावण्याचा हंगाम",
    plantingSeasonPlaceholder: "लागवड हंगाम निवडा",
    additionalInfo: "अतिरिक्त माहिती",
    previousCrop: "मागील पिक (जर असेल तर)",
    previousCropPlaceholder: "उदा., तांदूळ, कापूस, साखरपूर",
    budgetRange: "बजेट रेंज (₹)",
    budgetPlaceholder: "उदा., 50,000 - 1,00,000",
    farmingExperience: "शेतीचा अनुभव",
    experiencePlaceholder: "तुमचा अनुभव स्तर निवडा",
    getCropRecommendations: "पिक सल्ले मिळवा",

    // How it works
    howItWorks: "हे कसे कार्य करते",
    step1: "तुमच्या शेताची माहिती व स्थान भरा",
    step2: "आमची AI माती, हवामान व बाजार डेटा विश्लेषण करते",
    step3: "वैयक्तिक पिक सल्ले मिळवा",
    step4: "जास्त उत्पादनासाठी तज्ज्ञांचे टिप्स फॉलो करा",

    // Current conditions
    currentConditions: "सद्य परिस्थिती",
    humidity: "आर्द्रता",
    goodForPlanting: "लावणीसाठी योग्य",

    // Recommendations
    recommendedCrops: "तुमच्या शेतासाठी शिफारस केलेली पिके",
    modifyDetails: "तपशील बदलाः",
    expectedYield: "अपेक्षित उत्पादन",
    investment: "गुंतवणूक",
    duration: "कालावधी",
    marketPrice: "बाजार किंमत",
    expertTips: "तज्ज्ञांचे टिप्स",
    needConsultation: "तज्ज्ञ सल्ल्याची गरज आहे?",
    consultationText: "आमच्या कृषि तज्ज्ञांना कॉल करा",
    forGuidance: "वैयक्तिक मार्गदर्शनासाठी",

    // Soil types
    claySoil: "माती (Clay Soil)",
    sandySoil: "वाळूमाती (Sandy Soil)",
    loamySoil: "लोअमी माती (Loamy Soil)",
    siltSoil: "सिल्ट माती (Silt Soil)",
    redSoil: "लाल माती (Red Soil)",
    blackSoil: "काळी माती (Black Soil)",
    alluvialSoil: "अल्लुवियल माती (Alluvial Soil)",

    // Seasons
    kharif: "खरीप (पावसाळा)",
    rabi: "रबी (हिवाळा)",
    zaid: "झैद (उन्हाळा)",

    // Experience levels
    beginner: "नवशिक्या (0-2 वर्षे)",
    intermediate: "मध्यम (3-5 वर्षे)",
    experienced: "अनुभवी (5+ वर्षे)",

    // Risk levels
    lowRisk: "कमी धोका",
    mediumRisk: "मध्यम धोका",
    highRisk: "उच्च धोका",

    // Suitability
    excellent: "उत्कृष्ट",
    veryGood: "खूप चांगले",
    good: "चांगले",

    // Weather & Market Info
    weatherMarketInfo: "हवामान व बाजार माहिती",
    currentWeather: "सध्याचे हवामान",
    weatherForecast: "७ दिवसांचा अंदाज",
    priceAlerts: "किंमत सूचना",
    weatherAlerts: "हवामान सूचना",
    temperature: "तापमान",
    rainfall: "पाऊस",
    windSpeed: "वारा वेग",
    uvIndex: "UV निर्देशांक",
    visibility: "दृश्यता",
    pressure: "दाब",
    feelsLike: "असं वाटतं",

    // Market Info
    todaysPrices: "आजच्या किंमती",
    priceChange: "किंमत बदल",
    marketTrends: "बाजार ट्रेंड",
    cropPrices: "पिक किंमती",
    lastUpdated: "अद्ययावत",
    pricePerKg: "प्रति किलो किंमत",
    wholesale: "घाऊक",
    retail: "सर्वसामान्य",

    // Alerts
    weatherWarning: "हवामान इशारा",
    priceAlert: "किंमत इशारा",
    heavyRainAlert: "तुमच्या भागात जोरदार पाऊस अपेक्षित. तुमची पिके सुरक्षित ठेवा.",
    heatWaveAlert: "उष्णता लाट चेतावणी. पुरेशी सिंचन सुनिश्चित करा.",
    priceDropAlert: "टोमॅटोच्या किंमती 15% नी घसरल्या. लवकर विक्री विचार करा.",
    priceRiseAlert: "कांद्याच्या किंमती 20% नी वाढल्या. विक्रीसाठी योग्य वेळ आहे.",

    // Days of week
    today: "आज",
    tomorrow: "उद्या",
    monday: "सोमवार",
    tuesday: "मंगळवार",
    wednesday: "बुधवार",
    thursday: "गुरुवार",
    friday: "शुक्रवार",
    saturday: "शनिवार",
    sunday: "रविवार",
    appName: "कृषीमित्र",
    voiceHelp: "व्हॉइस सहाय्य",
    listening: "ऐकत आहे...",

    // Homepage
    heroTitle: "स्मार्ट शेती सोपी केली",

    // Weather conditions
    sunny: "सूर्यप्रकाश",
    cloudy: "ढगाळ",
    rainy: "पावसाळा",
    stormy: "वादळी",
    partlyCloudy: "अर्धवट ढगाळ",
    overcast: "पूर्ण ढगाळ",

    // Market locations
    nearbyMarkets: "जवळचे बाजार",
    mandiPrices: "मंडी किंमती",
    selectMarket: "बाजार निवडा",

    // Profile Page
    farmerProfile: "शेतकरी प्रोफाइल",
    personalInfo: "वैयक्तिक माहिती",
    farmDetails: "शेताची माहिती",
    preferences: "प्राधान्यक्रम",
    activityHistory: "क्रियाकलाप इतिहास",
    editProfile: "प्रोफाइल संपादित करा",
    saveProfile: "प्रोफाइल जतन करा",

    // Personal Info
    fullName: "पूर्ण नाव",
    phoneNumber: "फोन नंबर",
    village: "गाव",
    district: "जिल्हा",
    state: "राज्य",

    // Farm Details
    farmSize: "शेताचे क्षेत्र (एकर)",
    soilType: "मातीचा प्रकार",
    irrigationType: "सिंचन प्रकार",
    mainCrops: "मुख्य पिके",

    // History
    recentActivities: "अलीकडील क्रियाकलाप",
    cropQueries: "पिक प्रश्न",
    weatherChecks: "हवामान तपासले",
    marketPriceChecks: "बाजार किंमत तपासले",
    noHistory: "अजून क्रियाकलाप इतिहास नाही",

    // Activity Types
    queriedCrop: "पिक सल्ल्यासाठी विचारले",
    checkedWeather: "हवामान तपासले",
    checkedMarket: "बाजार किंमत तपासली",

    // Profile Success
    profileUpdated: "प्रोफाइल यशस्वीरित्या अपडेट केले",
    profileSaved: "प्रोफाइल यशस्वीरित्या जतन केली",

    // Chatbot
    chatbot: "AI सहाय्यक",
    chatWithBot: "AI सह गप्पा",
    askAnything: "शेतीबद्दल काहीही विचारा",
    chatPlaceholder: "इथे तुमचा शेती प्रश्न टाईप करा...",
    sendMessage: "पाठवा",
    chatWelcome: "हॅलो! मी तुमचा AI शेती सहाय्यक आहे. मी तुम्हाला कशी मदत करू?",
    chatTyping: "AI टाइप करत आहे...",
    voiceInput: "व्हॉइस इनपुट",
    clearChat: "चॅट साफ करा",
    chatHistory: "चॅट इतिहास",
    newChat: "नवीन चॅट",
    chatSuggestions: "त्वरित प्रश्न",
    suggestion1: "माझ्या मातीसाठी कोणती पिके उत्तम?",
    suggestion2: "मी तांदूळ कधी पेरावे?",
    suggestion3: "कीटक प्रतिबंध कसे करावे?",
    suggestion4: "हवामान अंदाज काय आहे?",
    suggestion5: "सध्याच्या बाजार किंमती काय आहेत?",
    chatError: "माफ करा, मी प्रक्रिया करू शकलो नाही. कृपया पुन्हा प्रयत्न करा.",
    chatOffline: "चॅट सध्या ऑफलाइन आहे. कृपया नंतर प्रयत्न करा.",
  },
  

  hi: {
    // Header
    appName: "कृषिमित्र",
    voiceHelp: "आवाज़ सहायता",
    listening: "सुन रहा है...",

    // Homepage
    heroTitle: "स्मार्ट खेती को आसान बनाया",
    heroSubtitle: "विशेषज्ञ फसल सलाह, मौसम अपडेट और बाज़ार की जानकारी पाएं - आपकी भाषा में, आवाज़ सहायता के साथ",
    youAsked: "आपने पूछा",
    getCropAdvice: "फसल सलाह पाएं",
    callExpert: "विशेषज्ञ को कॉल करें",

    // Features
    featuresTitle: "बेहतर खेती के लिए आपको जो कुछ चाहिए",
    cropAdvisory: "फसल सलाह",
    cropAdvisoryDesc: "अपनी मिट्टी और जलवायु के आधार पर व्यक्तिगत फसल सिफारिशें पाएं",
    weatherUpdates: "मौसम अपडेट",
    weatherUpdatesDesc: "आपके खेती क्षेत्र के लिए वास्तविक समय मौसम पूर्वानुमान और अलर्ट",
    marketPrices: "बाज़ार भाव",
    marketPricesDesc: "आपकी फसलों के लिए नवीनतम बाज़ार दरें और मूल्य रुझान",
    expertSupport: "विशेषज्ञ सहायता",
    expertSupportDesc: "कृषि विशेषज्ञों और साथी किसानों से जुड़ें",

    // Query Section
    askQuestion: "अपना खेती का सवाल पूछें",
    askQuestionDesc: "अपना सवाल टाइप करें या तुरंत सलाह के लिए आवाज़ इनपुट का उपयोग करें",
    questionPlaceholder: "इस मौसम में मुझे कौन सी फसल लगानी चाहिए?",
    getAdviceNow: "अभी सलाह पाएं",

    // Footer
    footerTagline: "स्मार्ट तकनीक के साथ छोटे और सीमांत किसानों को सशक्त बनाना",
    helpline: "हेल्पलाइन",
    availableLanguages: "6+ भाषाओं में उपलब्ध",

    // Advisory Page
    cropAdvisoryDashboard: "फसल सलाह डैशबोर्ड",
    backToHome: "होम पर वापस",
    farmDetails: "खेत का विवरण",
    farmDetailsDesc: "व्यक्तिगत सिफारिशें पाने के लिए अपने खेत के बारे में बताएं",
    location: "स्थान (गांव, जिला, राज्य)",
    locationPlaceholder: "जैसे, पुणे, महाराष्ट्र",
    soilType: "मिट्टी का प्रकार",
    soilTypePlaceholder: "अपनी मिट्टी का प्रकार चुनें",
    farmSize: "खेत का आकार (एकड़ में)",
    farmSizePlaceholder: "जैसे, 2.5",
    plantingSeason: "बुआई का मौसम",
    plantingSeasonPlaceholder: "बुआई का मौसम चुनें",
    additionalInfo: "अतिरिक्त जानकारी",
    previousCrop: "पिछली फसल (यदि कोई हो)",
    previousCropPlaceholder: "जैसे, धान, कपास, गन्ना",
    budgetRange: "बजट रेंज (₹)",
    budgetPlaceholder: "जैसे, 50,000 - 1,00,000",
    farmingExperience: "खेती का अनुभव",
    experiencePlaceholder: "अपना अनुभव स्तर चुनें",
    getCropRecommendations: "फसल सिफारिशें पाएं",

    // How it works
    howItWorks: "यह कैसे काम करता है",
    step1: "अपने खेत का विवरण और स्थान भरें",
    step2: "हमारा AI मिट्टी, जलवायु और बाज़ार डेटा का विश्लेषण करता है",
    step3: "व्यक्तिगत फसल सिफारिशें पाएं",
    step4: "अधिकतम उपज के लिए विशेषज्ञ सुझावों का पालन करें",

    // Current conditions
    currentConditions: "वर्तमान स्थितियां",
    humidity: "नमी",
    goodForPlanting: "बुआई के लिए अच्छा",

    // Recommendations
    recommendedCrops: "आपके खेत के लिए सुझाई गई फसलें",
    modifyDetails: "विवरण संशोधित करें",
    expectedYield: "अपेक्षित उपज",
    investment: "निवेश",
    duration: "अवधि",
    marketPrice: "बाज़ार भाव",
    expertTips: "विशेषज्ञ सुझाव",
    needConsultation: "विशेषज्ञ सलाह चाहिए?",
    consultationText: "व्यक्तिगत मार्गदर्शन के लिए हमारे कृषि विशेषज्ञों को कॉल करें",
    forGuidance: "",

    // Soil types
    claySoil: "चिकनी मिट्टी",
    sandySoil: "रेतीली मिट्टी",
    loamySoil: "दोमट मिट्टी",
    siltSoil: "गाद मिट्टी",
    redSoil: "लाल मिट्टी",
    blackSoil: "काली मिट्टी",
    alluvialSoil: "जलोढ़ मिट्टी",

    // Seasons
    kharif: "खरीफ (मानसून)",
    rabi: "रबी (सर्दी)",
    zaid: "जायद (गर्मी)",

    // Experience levels
    beginner: "शुरुआती (0-2 साल)",
    intermediate: "मध्यम (3-5 साल)",
    experienced: "अनुभवी (5+ साल)",

    // Risk levels
    lowRisk: "कम जोखिम",
    mediumRisk: "मध्यम जोखिम",
    highRisk: "उच्च जोखिम",

    // Suitability
    excellent: "उत्कृष्ट",
    veryGood: "बहुत अच्छा",
    good: "अच्छा",

    // Weather & Market Info
    weatherMarketInfo: "मौसम और बाज़ार की जानकारी",
    currentWeather: "वर्तमान मौसम",
    weatherForecast: "7-दिन का पूर्वानुमान",
    priceAlerts: "मूल्य अलर्ट",
    weatherAlerts: "मौसम अलर्ट",
    temperature: "तापमान",
    rainfall: "वर्षा",
    windSpeed: "हवा की गति",
    uvIndex: "यूवी इंडेक्स",
    visibility: "दृश्यता",
    pressure: "दबाव",
    feelsLike: "महसूस होता है",

    // Market Info
    todaysPrices: "आज के भाव",
    priceChange: "मूल्य परिवर्तन",
    marketTrends: "बाज़ार के रुझान",
    cropPrices: "फसल के भाव",
    lastUpdated: "अंतिम अपडेट",
    pricePerKg: "प्रति किलो भाव",
    wholesale: "थोक",
    retail: "खुदरा",

    // Alerts
    weatherWarning: "मौसम चेतावनी",
    priceAlert: "मूल्य अलर्ट",
    heavyRainAlert: "आपके क्षेत्र में भारी बारिश की संभावना। अपनी फसलों की सुरक्षा करें।",
    heatWaveAlert: "लू की चेतावनी। पर्याप्त सिंचाई सुनिश्चित करें।",
    priceDropAlert: "टमाटर के भाव में 15% गिरावट। जल्दी बेचने पर विचार करें।",
    priceRiseAlert: "प्याज के भाव में 20% वृद्धि। बेचने का अच्छा समय।",

    // Days of week
    today: "आज",
    tomorrow: "कल",
    monday: "सोमवार",
    tuesday: "मंगलवार",
    wednesday: "बुधवार",
    thursday: "गुरुवार",
    friday: "शुक्रवार",
    saturday: "शनिवार",
    sunday: "रविवार",

    // Weather conditions
    sunny: "धूप",
    cloudy: "बादल",
    rainy: "बारिश",
    stormy: "तूफान",
    partlyCloudy: "आंशिक बादल",
    overcast: "घने बादल",

    // Market locations
    nearbyMarkets: "नजदीकी बाज़ार",
    mandiPrices: "मंडी भाव",
    selectMarket: "बाज़ार चुनें",

    // Profile Page
    farmerProfile: "किसान प्रोफाइल",
    personalInfo: "व्यक्तिगत जानकारी",
    farmDetails: "खेत की जानकारी",
    preferences: "प्राथमिकताएं",
    activityHistory: "गतिविधि इतिहास",
    editProfile: "प्रोफाइल संपादित करें",
    saveProfile: "प्रोफाइल सहेजें",

    // Personal Info
    fullName: "पूरा नाम",
    phoneNumber: "फोन नंबर",
    village: "गांव",
    district: "जिला",
    state: "राज्य",

    // Farm Details
    farmSize: "खेत का आकार (एकड़)",
    soilType: "मिट्टी का प्रकार",
    irrigationType: "सिंचाई का प्रकार",
    mainCrops: "मुख्य फसलें",

    // History
    recentActivities: "हाल की गतिविधियां",
    cropQueries: "फसल प्रश्न",
    weatherChecks: "मौसम जांच",
    marketPriceChecks: "बाजार मूल्य जांच",
    noHistory: "अभी तक कोई गतिविधि इतिहास नहीं",

    // Activity Types
    queriedCrop: "फसल सलाह के लिए पूछताछ की",
    checkedWeather: "मौसम की जांच की",
    checkedMarket: "बाजार मूल्य की जांच की",

    // Profile Success
    profileUpdated: "प्रोफाइल सफलतापूर्वक अपडेट किया गया",
    profileSaved: "प्रोफाइल सफलतापूर्वक सहेजा गया",

    // Chatbot
    chatbot: "AI सहायक",
    chatWithBot: "AI से बात करें",
    askAnything: "खेती के बारे में मुझसे कुछ भी पूछें",
    chatPlaceholder: "यहाँ अपना खेती का सवाल लिखें...",
    sendMessage: "भेजें",
    chatWelcome: "नमस्ते! मैं आपका AI खेती सहायक हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?",
    chatTyping: "AI टाइप कर रहा है...",
    voiceInput: "आवाज़ इनपुट",
    clearChat: "चैट साफ़ करें",
    chatHistory: "चैट इतिहास",
    newChat: "नई चैट",
    chatSuggestions: "त्वरित प्रश्न",
    suggestion1: "मेरी मिट्टी के लिए कौन सी फसल सबसे अच्छी है?",
    suggestion2: "धान कब लगाना चाहिए?",
    suggestion3: "कीट के हमले से कैसे बचें?",
    suggestion4: "मौसम का पूर्वानुमान क्या है?",
    suggestion5: "वर्तमान बाज़ार भाव?",
    chatError: "माफ़ करें, मैं इसे प्रोसेस नहीं कर सका। कृपया फिर से कोशिश करें।",
    chatOffline: "चैट फिलहाल ऑफलाइन है। कृपया बाद में कोशिश करें।",
  },

  bn: {
    // Header
    appName: "কৃষিমিত্র",
    voiceHelp: "ভয়েস সাহায্য",
    listening: "শুনছি...",

    // Homepage
    heroTitle: "স্মার্ট চাষাবাদ সহজ করা হয়েছে",
    heroSubtitle: "বিশেষজ্ঞ ফসল পরামর্শ, আবহাওয়া আপডেট এবং বাজারের তথ্য পান - আপনার ভাষায়, ভয়েস সাপোর্ট সহ",
    youAsked: "আপনি জিজ্ঞেস করেছেন",
    getCropAdvice: "ফসল পরামর্শ নিন",
    callExpert: "বিশেষজ্ঞকে কল করুন",

    // Features
    featuresTitle: "ভাল চাষাবাদের জন্য আপনার যা প্রয়োজন",
    cropAdvisory: "ফসল পরামর্শ",
    cropAdvisoryDesc: "আপনার মাটি এবং জলবায়ুর উপর ভিত্তি করে ব্যক্তিগত ফসল সুপারিশ পান",
    weatherUpdates: "আবহাওয়া আপডেট",
    weatherUpdatesDesc: "আপনার চাষাবাদ এলাকার জন্য রিয়েল-টাইম আবহাওয়া পূর্বাভাস এবং সতর্কতা",
    marketPrices: "বাজার দর",
    marketPricesDesc: "আপনার ফসলের জন্য সর্বশেষ বাজার দর এবং মূল্য প্রবণতা",
    expertSupport: "বিশেষজ্ঞ সহায়তা",
    expertSupportDesc: "কৃষি বিশেষজ্ঞ এবং সহকর্মী কৃষকদের সাথে যোগাযোগ করুন",

    // Query Section
    askQuestion: "আপনার চাষাবাদের প্রশ্ন জিজ্ঞাসা করুন",
    askQuestionDesc: "আপনার প্রশ্ন টাইপ করুন বা তাৎক্ষণিক পরামর্শের জন্য ভয়েস ইনপুট ব্যবহার করুন",
    questionPlaceholder: "এই মৌসুমে আমার কোন ফসল লাগানো উচিত?",
    getAdviceNow: "এখনই পরামর্শ নিন",

    // Footer
    footerTagline: "স্মার্ট প্রযুক্তির সাথে ছোট এবং প্রান্তিক কৃষকদের ক্ষমতায়ন",
    helpline: "হেল্পলাইন",
    availableLanguages: "৬+ ভাষায় উপলব্ধ",

    // Advisory Page
    cropAdvisoryDashboard: "ফসল পরামর্শ ড্যাশবোর্ড",
    backToHome: "হোমে ফিরে যান",
    farmDetails: "খামারের বিবরণ",
    farmDetailsDesc: "ব্যক্তিগত সুপারিশ পেতে আপনার খামার সম্পর্কে বলুন",
    location: "অবস্থান (গ্রাম, জেলা, রাজ্য)",
    locationPlaceholder: "যেমন, পুনে, মহারাষ্ট্র",
    soilType: "মাটির ধরন",
    soilTypePlaceholder: "আপনার মাটির ধরন নির্বাচন করুন",
    farmSize: "খামারের আকার (একরে)",
    farmSizePlaceholder: "যেমন, ২.৫",
    plantingSeason: "রোপণের মৌসুম",
    plantingSeasonPlaceholder: "রোপণের মৌসুম নির্বাচন করুন",
    additionalInfo: "অতিরিক্ত তথ্য",
    previousCrop: "পূর্ববর্তী ফসল (যদি থাকে)",
    previousCropPlaceholder: "যেমন, ধান, তুলা, আখ",
    budgetRange: "বাজেট পরিসীমা (৳)",
    budgetPlaceholder: "যেমন, ৫০,০০০ - ১,০০,০০০",
    farmingExperience: "চাষাবাদের অভিজ্ঞতা",
    experiencePlaceholder: "আপনার অভিজ্ঞতার স্তর নির্বাচন করুন",
    getCropRecommendations: "ফসল সুপারিশ পান",

    // How it works
    howItWorks: "এটি কীভাবে কাজ করে",
    step1: "আপনার খামারের বিবরণ এবং অবস্থান পূরণ করুন",
    step2: "আমাদের AI মাটি, জলবায়ু এবং বাজার ডেটা বিশ্লেষণ করে",
    step3: "ব্যক্তিগত ফসল সুপারিশ পান",
    step4: "সর্বোচ্চ ফলনের জন্য বিশেষজ্ঞ টিপস অনুসরণ করুন",

    // Current conditions
    currentConditions: "বর্তমান অবস্থা",
    humidity: "আর্দ্রতা",
    goodForPlanting: "রোপণের জন্য ভাল",

    // Recommendations
    recommendedCrops: "আপনার খামারের জন্য প্রস্তাবিত ফসল",
    modifyDetails: "বিবরণ সংশোধন করুন",
    expectedYield: "প্রত্যাশিত ফলন",
    investment: "বিনিয়োগ",
    duration: "সময়কাল",
    marketPrice: "বাজার দর",
    expertTips: "বিশেষজ্ঞ টিপস",
    needConsultation: "বিশেষজ্ঞ পরামর্শ প্রয়োজন?",
    consultationText: "ব্যক্তিগত নির্দেশনার জন্য আমাদের কৃষি বিশেষজ্ঞদের কল করুন",
    forGuidance: "",

    // Soil types
    claySoil: "কাদামাটি",
    sandySoil: "বালুকা মাটি",
    loamySoil: "দোআঁশ মাটি",
    siltSoil: "পলি মাটি",
    redSoil: "লাল মাটি",
    blackSoil: "কালো মাটি",
    alluvialSoil: "পলিমাটি",

    // Seasons
    kharif: "খরিফ (বর্ষা)",
    rabi: "রবি (শীত)",
    zaid: "জায়েদ (গ্রীষ্ম)",

    // Experience levels
    beginner: "নতুন (০-২ বছর)",
    intermediate: "মধ্যম (৩-৫ বছর)",
    experienced: "অভিজ্ঞ (৫+ বছর)",

    // Risk levels
    lowRisk: "কಡಿಮೆ ಅಪಾಯ",
    mediumRisk: "ಮಧ್ಯಮ ಅಪಾಯ",
    highRisk: "ಹೆಚ್ಚಿನ ಅಪಾಯ",

    // Suitability
    excellent: "ಅತ್ಯುತ್ತಮ",
    veryGood: "ಬಹುಳ ಒಳ್ಳೆಯದು",
    good: "ಒಳ್ಳೆಯದು",

    // Weather & Market Info
    weatherMarketInfo: "আবহাওয়া ও বাজার তথ্য",
    currentWeather: "ಪ್ರಸ್ತುತ ಹವಾಮಾನ",
    weatherForecast: "7-ದಿನಗಳ ಮುನ್ನೋಟ",
    priceAlerts: "ಬೆಲೆ ಎಚ್ಚರಿಕೆಗಳು",
    weatherAlerts: "ಹವಾಮಾನ ಎಚ್ಚರಿಕೆಗಳು",
    temperature: "ತಾಪಮಾನ",
    rainfall: "ಮಳೆ",
    windSpeed: "ಗಾಳಿಯ ವೇಗ",
    uvIndex: "UV ಸೂಚಿ",
    visibility: "ದೃಶ್ಯತೆ",
    pressure: "ಒತ್ತಡ",
    feelsLike: "ಅನುಭವ",

    // Market Info
    todaysPrices: "ಇಂದಿನ ಬೆಲೆಗಳು",
    priceChange: "ಬೆಲೆ ಬದಲಾವಣೆ",
    marketTrends: "ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿಗಳು",
    cropPrices: "ಬೆಳೆ ಬೆಲೆಗಳು",
    lastUpdated: "ಕೊನೆಯ ಬಾರಿ ನವೀಕರಿಸಲಾಗಿದೆ",
    pricePerKg: "ಪ್ರತಿ ಕೆಜಿ ಬೆಲೆ",
    wholesale: "ಸಗಟು",
    retail: "ಚಿಲ್ಲರೆ",

    // Alerts
    weatherWarning: "ಹವಾಮಾನ ಎಚ್ಚರಿಕೆ",
    priceAlert: "ಬೆಲೆ ಎಚ್ಚರಿಕೆ",
    heavyRainAlert: "ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ಭಾರೀ ಮಳೆ ನಿರೀಕ್ಷೆ. ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ರಕ್ಷಿಸಿ.",
    heatWaveAlert: "ಶಾಖದ ಅಲೆಯ ಎಚ್ಚರಿಕೆ. ಸಾಕಷ್ಟು ನೀರಾವರಿ ಖಚಿತಪಡಿಸಿ.",
    priceDropAlert: "ಟೊಮೇಟೊ ಬೆಲೆಗಳು 15% ಕಡಿಮೆಯಾಗಿವೆ. ಬೇಗ ಮಾರಾಟ ಮಾಡುವುದನ್ನು ಪರಿಗಣಿಸಿ.",
    priceRiseAlert: "ಈರುಳ್ಳಿ ಬೆಲೆಗಳು 20% ಹೆಚ್ಚಾಗಿವೆ. ಮಾರಾಟಕ್ಕೆ ಒಳ್ಳೆಯ ಸಮಯ.",

    // Days of week
    today: "ಇಂದು",
    tomorrow: "ನಾಳೆ",
    monday: "ಸೋಮವಾರ",
    tuesday: "ಮಂಗಳವಾರ",
    wednesday: "ಬುಧವಾರ",
    thursday: "ಗುರುವಾರ",
    friday: "ಶುಕ್ರವಾರ",
    saturday: "ಶನಿವಾರ",
    sunday: "ಭಾನುವಾರ",

    // Weather conditions
    sunny: "ಬಿಸಿಲು",
    cloudy: "ಮೋಡ",
    rainy: "ಮಳೆ",
    stormy: "ಚಂಡಮಾರುತ",
    partlyCloudy: "ಭಾಗಶಃ ಮೋಡ",
    overcast: "ದಟ್ಟ ಮೋಡ",

    // Market locations
    nearbyMarkets: "ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆಗಳು",
    mandiPrices: "ಮಂಡಿ ಬೆಲೆಗಳು",
    selectMarket: "ಮಾರುಕಟ್ಟೆ ಆಯ್ಕೆಮಾಡಿ",

    // Profile Page
    farmerProfile: "কৃষক প্রোফাইল",
    personalInfo: "ব্যক্তিগত তথ্য",
    farmDetails: "খামারের বিবরণ",
    preferences: "পছন্দসমূহ",
    activityHistory: "কার্যকলাপের ইতিহাস",
    editProfile: "প্রোফাইল সম্পাদনা",
    saveProfile: "প্রোফাইল সংরক্ষণ",

    // Personal Info
    fullName: "পূর্ণ নাম",
    phoneNumber: "ফোন নম্বর",
    village: "গ্রাম",
    district: "জেলা",
    state: "রাজ্য",

    // Farm Details
    farmSize: "খামারের আকার (একর)",
    soilType: "মাটির ধরন",
    irrigationType: "সেচের ধরন",
    mainCrops: "প্রধান ফসল",

    // History
    recentActivities: "সাম্প্রতিক কার্যকলাপ",
    cropQueries: "ফসল প্রশ্ন",
    weatherChecks: "আবহাওয়া পরীক্ষা",
    marketPriceChecks: "বাজার মূল্য পরীক্ষা",
    noHistory: "এখনও কোনো কার্যকলাপের ইতিহাস নেই",

    // Activity Types
    queriedCrop: "ফসলের পরামর্শের জন্য জিজ্ঞাসা করেছেন",
    checkedWeather: "আবহাওয়া পরীক্ষা করেছেন",
    checkedMarket: "বাজার মূল্য পরীক্ষা করেছেন",

    // Profile Success
    profileUpdated: "প্রোফাইল সফলভাবে আপডেট হয়েছে",
    profileSaved: "প্রোফাইল সফলভাবে সংরক্ষিত হয়েছে",

    // Chatbot
    chatbot: "AI সহায়ক",
    chatWithBot: "AI এর সাথে চ্যাট করুন",
    askAnything: "কৃষি সম্পর্কে আমাকে যেকোনো কিছু জিজ্ঞাসা করুন",
    chatPlaceholder: "এখানে আপনার কৃষি প্রশ্ন লিখুন...",
    sendMessage: "পাঠান",
    chatWelcome: "হ্যালো! আমি আপনার AI কৃষি সহায়ক। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
    chatTyping: "AI টাইপ করছে...",
    voiceInput: "ভয়েস ইনপুট",
    clearChat: "চ্যাট পরিষ্কার করুন",
    chatHistory: "চ্যাট ইতিহাস",
    newChat: "নতুন চ্যাট",
    chatSuggestions: "দ্রুত প্রশ্ন",
    suggestion1: "আমার মাটির জন্য কোন ফসল সবচেয়ে ভালো?",
    suggestion2: "ধান কখন রোপণ করব?",
    suggestion3: "কীটপতঙ্গের আক্রমণ কীভাবে প্রতিরোধ করব?",
    suggestion4: "আবহাওয়ার পূর্বাভাস কী?",
    suggestion5: "বর্তমান বাজার দর?",
    chatError: "দুঃখিত, আমি এটি প্রক্রিয়া করতে পারিনি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    chatOffline: "চ্যাট বর্তমানে অফলাইন। অনুগ্রহ করে পরে আবার চেষ্টা করুন।",
  },

  ta: {
    // Header
    appName: "கிருஷிமித்ரா",
    voiceHelp: "குரல் உதவி",
    listening: "கேட்கிறது...",

    // Homepage
    heroTitle: "ஸ்மார்ட் விவசாயம் எளிதாக்கப்பட்டது",
    heroSubtitle: "நிபுணர் பயிர் ஆலோசனை, வானிலை புதுப்பிப்புகள் மற்றும் சந்தை தகவல்களைப் பெறுங்கள் - உங்கள் மொழியில், குரல் ஆதரவுடன்",
    youAsked: "நீங்கள் கேட்டீர்கள்",
    getCropAdvice: "பயிர் ஆலோசனை பெறுங்கள்",
    callExpert: "நிபுணரை அழைக்கவும்",

    // Features
    featuresTitle: "சிறந்த விவசாயத்திற்கு உங்களுக்குத் தேவையான அனைத்தும்",
    cropAdvisory: "பயிர் ஆலோசனை",
    cropAdvisoryDesc: "உங்கள் மண் மற்றும் காலநிலையின் அடிப்படையில் தனிப்பட்ட பயிர் பரிந்துரைகளைப் பெறுங்கள்",
    weatherUpdates: "வானிலை புதுப்பிப்புகள்",
    weatherUpdatesDesc: "உங்கள் விவசாய பகுதிக்கான நிகழ்நேர வானிலை முன்னறிவிப்புகள் மற்றும் எச்சரிக்கைகள்",
    marketPrices: "சந்தை விலைகள்",
    marketPricesDesc: "உங்கள் பயிர்களுக்கான சமீபத்திய சந்தை விலைகள் மற்றும் விலை போக்குகள்",
    expertSupport: "நிபுணர் ஆதரவு",
    expertSupportDesc: "விவசாய நிபுணர்கள் மற்றும் சக விவசாயிகளுடன் இணைக்கவும்",

    // Query Section
    askQuestion: "உங்கள் விவசாய கேள்வியைக் கேளுங்கள்",
    askQuestionDesc: "உங்கள் கேள்வியை தட்டச்சு செய்யுங்கள் அல்லது உடனடி ஆலோசனைக்கு குரல் உள்ளீட்டைப் பயன்படுத்துங்கள்",
    questionPlaceholder: "இந்த பருவத்தில் நான் எந்த பயிர்களை நடவு செய்ய வேண்டும்?",
    getAdviceNow: "இப்போது ஆலோசனை பெறுங்கள்",

    // Footer
    footerTagline: "ஸ்மார்ட் தொழில்நுட்பத்துடன் சிறு மற்றும் குறு விவசாயிகளை மேம்படுத்துதல்",
    helpline: "உதவி எண்",
    availableLanguages: "6+ மொழிகளில் கிடைக்கிறது",

    // Advisory Page
    cropAdvisoryDashboard: "பயிர் ஆலோசனை டாஷ்போர்டு",
    backToHome: "முகப்புக்கு திரும்பு",
    farmDetails: "பண்ணை விவரங்கள்",
    farmDetailsDesc: "தனிப்பட்ட பரிந்துரைகளைப் பெற உங்கள் பண்ணையைப் பற்றி எங்களிடம் கூறுங்கள்",
    location: "இடம் (கிராமம், மாவட்டம், மாநிலம்)",
    locationPlaceholder: "எ.கா., புனே, மகாராஷ்டிரா",
    soilType: "மண் வகை",
    soilTypePlaceholder: "உங்கள் மண் வகையைத் தேர்ந்தெடுக்கவும்",
    farmSize: "பண்ணை அளவு (ஏக்கரில்)",
    farmSizePlaceholder: "எ.கா., 2.5",
    plantingSeason: "நடவு பருவம்",
    plantingSeasonPlaceholder: "நடவு பருவத்தைத் தேர்ந்தெடுக்கவும்",
    additionalInfo: "கூடுதல் தகவல்",
    previousCrop: "முந்தைய பயிர் (ஏதேனும் இருந்தால்)",
    previousCropPlaceholder: "எ.கா., அரிசி, பருத்தி, கரும்பு",
    budgetRange: "பட்ஜெட் வரம்பு (₹)",
    budgetPlaceholder: "எ.கா., 50,000 - 1,00,000",
    farmingExperience: "விவசாய அனுபவம்",
    experiencePlaceholder: "உங்கள் அனுபவ நிலையைத் தேர்ந்தெடுக்கவும்",
    getCropRecommendations: "பயிர் பரிந்துரைகளைப் பெறுங்கள்",

    // How it works
    howItWorks: "இது எப்படி வேலை செய்கிறது",
    step1: "உங்கள் பண்ணை விவரங்கள் மற்றும் இடத்தை நிரப்புங்கள்",
    step2: "எங்கள் AI மண், காலநிலை மற்றும் சந்தை தரவுகளை பகுப்பாய்வு செய்கிறது",
    step3: "தனிப்பட்ட பயிர் பரிந்துரைகளைப் பெறுங்கள்",
    step4: "அதிகபட்ச விளைச்சலுக்கு நிபுணர் குறிப்புகளைப் பின்பற்றுங்கள்",

    // Current conditions
    currentConditions: "தற்போதைய நிலைமைகள்",
    humidity: "ஈரப்பதம்",
    goodForPlanting: "நடவுக்கு நல்லது",

    // Recommendations
    recommendedCrops: "உங்கள் பண்ணைக்கு பரிந்துரைக்கப்பட்ட பயிர்கள்",
    modifyDetails: "விவரங்களை மாற்றுங்கள்",
    expectedYield: "எதிர்பார்க்கப்படும் விளைச்சல்",
    investment: "முதலீடு",
    duration: "காலம்",
    marketPrice: "சந்தை விலை",
    expertTips: "நிபுணர் குறிப்புகள்",
    needConsultation: "நிபுணர் ஆலோசனை தேவையா?",
    consultationText: "தனிப்பட்ட வழிகாட்டுதலுக்காக எங்கள் விவசாய நிபுணர்களை அழைக்கவும்",
    forGuidance: "",

    // Soil types
    claySoil: "களிமண்",
    sandySoil: "மணல் மண்",
    loamySoil: "வண்டல் மண்",
    siltSoil: "சேற்று மண்",
    redSoil: "சிவப்பு மண்",
    blackSoil: "கருப்பு மண்",
    alluvialSoil: "வண்டல் மண்",

    // Seasons
    kharif: "கரீப் (பருவமழை)",
    rabi: "ரபி (குளிர்காலம்)",
    zaid: "ஜாயத் (கோடைகாலம்)",

    // Experience levels
    beginner: "ஆரம்பநிலை (0-2 ஆண்டுகள்)",
    intermediate: "இடைநிலை (3-5 ஆண்டுகள்)",
    experienced: "அனுபவமிக்க (5+ ஆண்டுகள்)",

    // Risk levels
    lowRisk: "குறைந்த ஆபத்து",
    mediumRisk: "நடுத்தர ஆபத்து",
    highRisk: "அதிக ஆபத்து",

    // Suitability
    excellent: "சிறந்த",
    veryGood: "மிகவும் நல்ல",
    good: "நல்ல",

    // Weather & Market Info
    weatherMarketInfo: "வானிலை மற்றும் சந்தை தகவல்",
    currentWeather: "தற்போதைய வானிலை",
    weatherForecast: "7-நாள் முன்னறிவிப்பு",
    priceAlerts: "விலை எச்சரிக்கைகள்",
    weatherAlerts: "வானிலை எச்சரிக்கைகள்",
    temperature: "வெப்பநிலை",
    rainfall: "மழைப்பொழிவு",
    windSpeed: "காற்றின் வேகம்",
    uvIndex: "UV குறியீடு",
    visibility: "தெரிவுநிலை",
    pressure: "அழுத்தம்",
    feelsLike: "உணர்வு",

    // Market Info
    todaysPrices: "இன்றைய விலைகள்",
    priceChange: "விலை மாற்றம்",
    marketTrends: "சந்தை போக்குகள்",
    cropPrices: "பயிர் விலைகள்",
    lastUpdated: "கடைசியாக புதுப்பிக்கப்பட்டது",
    pricePerKg: "கிலோ ஒன்றுக்கு விலை",
    wholesale: "மொத்த விற்பனை",
    retail: "சில்லறை",

    // Alerts
    weatherWarning: "வானிலை எச்சரிக்கை",
    priceAlert: "விலை எச்சரிக்கை",
    heavyRainAlert: "உங்கள் பகுதியில் கனமழை எதிர்பார்க்கப்படுகிறது। உங்கள் பயிர்களைப் பாதுகாக்கவும்.",
    heatWaveAlert: "வெப்ப அலை எச்சரிக்கை. போதுமான நீர்ப்பாசனம் உறுதி செய்யவும்.",
    priceDropAlert: "தக்காளி விலை 15% குறைந்துள்ளது. விரைவில் விற்பனை செய்வதைக் கருத்தில் கொள்ளுங்கள்.",
    priceRiseAlert: "வெங்காய விலை 20% அதிகரித்துள்ளது. விற்பனைக்கு நல்ல நேரம்.",

    // Days of week
    today: "இன்று",
    tomorrow: "நாளை",
    monday: "திங்கள்",
    tuesday: "செவ்வாய்",
    wednesday: "புதன்",
    thursday: "வியாழன்",
    friday: "வெள்ளி",
    saturday: "சனி",
    sunday: "ஞாயிறு",

    // Weather conditions
    sunny: "வெயில்",
    cloudy: "மேகமூட்டம்",
    rainy: "மழை",
    stormy: "புயல்",
    partlyCloudy: "பகுதி மேகமூட்டம்",
    overcast: "அடர் மேகம்",

    // Market locations
    nearbyMarkets: "அருகிலுள்ள சந்தைகள்",
    mandiPrices: "மண்டி விலைகள்",
    selectMarket: "சந்தையைத் தேர்ந்தெடுக்கவும்",

    // Profile Page
    farmerProfile: "விவசாயி சுயவிவரம்",
    personalInfo: "தனிப்பட்ட தகவல்",
    farmDetails: "பண்ணை விவரங்கள்",
    preferences: "விருப்பத்தேர்வுகள்",
    activityHistory: "செயல்பாட்டு வரலாறு",
    editProfile: "சுயவிவரத்தை திருத்து",
    saveProfile: "சுயவிவரத்தை சேமி",

    // Personal Info
    fullName: "முழு பெயர்",
    phoneNumber: "தொலைபேசி எண்",
    village: "கிராமம்",
    district: "மாவட்டம்",
    state: "மாநிலம்",

    // Farm Details
    farmSize: "பண்ணை அளவு (ஏக்கர்)",
    soilType: "மண் வகை",
    irrigationType: "நீர்ப்பாசன வகை",
    mainCrops: "முக்கிய பயிர்கள்",

    // History
    recentActivities: "சமீபத்திய செயல்பாடுகள்",
    cropQueries: "பயிர் கேள்விகள்",
    weatherChecks: "வானிலை சோதனைகள்",
    marketPriceChecks: "சந்தை விலை சோதனைகள்",
    noHistory: "இன்னும் செயல்பாட்டு வரலாறு இல்லை",

    // Activity Types
    queriedCrop: "பயிர் ஆலோசனைக்காக கேட்டார்",
    checkedWeather: "வானிலையை சோதித்தார்",
    checkedMarket: "சந்தை விலையை சோதித்தார்",

    // Profile Success
    profileUpdated: "சுயவிவரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது",
    profileSaved: "சுயவிவரம் வெற்றிகரமாக சேமிக்கப்பட்டது",

    // Chatbot
    chatbot: "AI உதவியாளர்",
    chatWithBot: "AI உடன் அரட்டை",
    askAnything: "விவசாயம் பற்றி என்னிடம் எதையும் கேளுங்கள்",
    chatPlaceholder: "உங்கள் விவசாய கேள்வியை இங்கே தட்டச்சு செய்யுங்கள்...",
    sendMessage: "அனுப்பு",
    chatWelcome: "வணக்கம்! நான் உங்கள் AI விவசாய உதவியாளர். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
    chatTyping: "AI தட்டச்சு செய்கிறது...",
    voiceInput: "குரல் உள்ளீடு",
    clearChat: "அரட்டையை அழி",
    chatHistory: "அரட்டை வரலாறு",
    newChat: "புதிய அரட்டை",
    chatSuggestions: "விரைவு கேள்விகள்",
    suggestion1: "என் மண்ணுக்கு எந்த பயிர் சிறந்தது?",
    suggestion2: "நெல் எப்போது நடவு செய்ய வேண்டும்?",
    suggestion3: "பூச்சி தாக்குதலை எப்படி தடுப்பது?",
    suggestion4: "வானிலை முன்னறிவிப்பு என்ன?",
    suggestion5: "தற்போதைய சந்தை விலை?",
    chatError: "மன்னிக்கவும், என்னால் அதை செயல்படுத்த முடியவில்லை. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",
    chatOffline: "அரட்டை தற்போது ஆஃப்லைனில் உள்ளது. தயவுசெய்து பின்னர் முயற்சிக்கவும்.",
  },

  te: {
    // Header
    appName: "కృషిమిత్ర",
    voiceHelp: "వాయిస్ సహాయం",
    listening: "వింటోంది...",

    // Homepage
    heroTitle: "స్మార్ట్ వ్యవసాయం సులభం చేయబడింది",
    heroSubtitle: "నిపుణుల పంట సలహా, వాతావరణ అప్‌డేట్‌లు మరియు మార్కెట్ సమాచారం పొందండి - మీ భాషలో, వాయిస్ సపోర్ట్‌తో",
    youAsked: "మీరు అడిగారు",
    getCropAdvice: "పంట సలహా పొందండి",
    callExpert: "నిపుణుడిని కాల్ చేయండి",

    // Features
    featuresTitle: "మెరుగైన వ్యవసాయానికి మీకు అవసరమైనవన్నీ",
    cropAdvisory: "పంట సలహా",
    cropAdvisoryDesc: "మీ మట్టి మరియు వాతావరణం ఆధారంగా వ్యక్తిగత పంట సిఫార్సులు పొందండి",
    weatherUpdates: "వాతావరణ అప్‌డేట్‌లు",
    weatherUpdatesDesc: "మీ వ్యవసాయ ప్రాంతానికి రియల్-టైమ్ వాతావరణ అంచనాలు మరియు హెచ్చరికలు",
    marketPrices: "మార్కెట్ ధరలు",
    marketPricesDesc: "మీ పంటలకు తాజా మార్కెట్ రేట్లు మరియు ధర ట్రెండ్‌లు",
    expertSupport: "నిపుణుల మద్దతు",
    expertSupportDesc: "వ్యవసాయ నిపుణులు మరియు తోటి రైతులతో కనెక్ట్ అవ్వండి",

    // Query Section
    askQuestion: "మీ వ్యవసాయ ప్రశ్న అడగండి",
    askQuestionDesc: "మీ ప్రశ్నను టైప్ చేయండి లేదా తక్షణ సలహా కోసం వాయిస్ ఇన్‌పుట్ ఉపయోగించండి",
    questionPlaceholder: "ఈ సీజన్‌లో నేను ఏ పంటలు నాటాలి?",
    getAdviceNow: "ఇప్పుడే సలహా పొందండి",

    // Footer
    footerTagline: "స్మార్ట్ టెక్నాలజీతో చిన్న మరియు సరిహద్దు రైతులను శక్తివంతం చేయడం",
    helpline: "హెల్ప్‌లైన్",
    availableLanguages: "6+ భాషలలో అందుబాటులో",

    // Advisory Page
    cropAdvisoryDashboard: "పంట సలహా డాష్‌బోర్డ్",
    backToHome: "హోమ్‌కు తిరిగి వెళ్ళు",
    farmDetails: "వ్యవసాయ వివరాలు",
    farmDetailsDesc: "వ్యక్తిగత సిఫార్సులు పొందడానికి మీ వ్యవసాయం గురించి మాకు చెప్పండి",
    location: "స్థానం (గ్రామం, జిల్లా, రాష్ట్రం)",
    locationPlaceholder: "ఉదా., పూణే, మహారాష్ట్ర",
    soilType: "మట్టి రకం",
    soilTypePlaceholder: "మీ మట్టి రకాన్ని ఎంచుకోండి",
    farmSize: "వ్యవసాయ పరిమాణం (ఎకరాలలో)",
    farmSizePlaceholder: "ఉదా., 2.5",
    plantingSeason: "నాటడం సీజన్",
    plantingSeasonPlaceholder: "నాటడం సీజన్‌ను ఎంచుకోండి",
    additionalInfo: "అదనపు సమాచారం",
    previousCrop: "మునుపటి పంట (ఏదైనా ఉంటే)",
    previousCropPlaceholder: "ఉదా., వరి, పత్తి, చెరకు",
    budgetRange: "బడ్జెట్ పరిధి (₹)",
    budgetPlaceholder: "ఉదా., 50,000 - 1,00,000",
    farmingExperience: "వ్యవసాయ అనుభవం",
    experiencePlaceholder: "మీ అనుభవ స్థాయిని ఎంచుకోండి",
    getCropRecommendations: "పంట సిఫార్సులు పొందండి",

    // How it works
    howItWorks: "ఇది ఎలా పని చేస్తుంది",
    step1: "మీ వ్యవసాయ వివరాలు మరియు స్థానాన్ని పూరించండి",
    step2: "మా AI మట్టి, వాతావరణం మరియు మార్కెట్ డేటాను విశ్లేషిస్తుంది",
    step3: "వ్యక్తిగత పంట సిఫార్సులు పొందండి",
    step4: "గరిష్ట దిగుబడి కోసం నిపుణుల చిట్కాలను అనుసరించండి",

    // Current conditions
    currentConditions: "ప్రస్తుత పరిస్థితులు",
    humidity: "తేమ",
    goodForPlanting: "నాటడానికి మంచిది",

    // Recommendations
    recommendedCrops: "మీ వ్యవసాయానికి సిఫార్సు చేయబడిన పంటలు",
    modifyDetails: "వివరాలను మార్చండి",
    expectedYield: "ఆశించిన దిగుబడి",
    investment: "పెట్టుబడి",
    duration: "వ్యవధి",
    marketPrice: "మార్కెట్ ధర",
    expertTips: "నిపుణుల చిట్కాలు",
    needConsultation: "నిపుణుల సలహా అవసరమా?",
    consultationText: "వ్యక్తిగత మార్గదర్శకత్వం కోసం మా వ్యవసాయ నిపుణులను కాల్ చేయండి",
    forGuidance: "",

    // Soil types
    claySoil: "బంకమట్టి",
    sandySoil: "ఇసుక మట్టి",
    loamySoil: "లోమ్ మట్టి",
    siltSoil: "సిల్ట్ మట్టి",
    redSoil: "ఎర్ర మట్టి",
    blackSoil: "నల్ల మట్టి",
    alluvialSoil: "వరద మట్టి",

    // Seasons
    kharif: "ఖరీఫ్ (వర్షాకాలం)",
    rabi: "రబీ (శీతాకాలం)",
    zaid: "జాయద్ (వేసవికాలం)",

    // Experience levels
    beginner: "ప్రారంభకుడు (0-2 సంవత్సరాలు)",
    intermediate: "మధ్యస్థ (3-5 సంవత్సరాలు)",
    experienced: "అనుభవజ్ఞుడు (5+ సంవత్సరాలు)",

    // Risk levels
    lowRisk: "తక్కువ రిస్క్",
    mediumRisk: "మధ్యస్థ రిస్క్",
    highRisk: "అధిక రిస్క్",

    // Suitability
    excellent: "అద్భుతమైన",
    veryGood: "చాలా మంచి",
    good: "మంచి",

    // Weather & Market Info
    weatherMarketInfo: "వాతావరణం మరియు మార్కెట్ సమాచారం",
    currentWeather: "ప్రస్తుత వాతావరణం",
    weatherForecast: "7-రోజుల మున్నోಟ",
    priceAlerts: "ధర హెచ్చరికలు",
    weatherAlerts: "వాతావరణ హెచ్చరికలు",
    temperature: "ఉష్నోగ్రత",
    rainfall: "వర్షపాతం",
    windSpeed: "గಾలి వేగం",
    uvIndex: "UV సూచిక",
    visibility: "దృశ్యత",
    pressure: "ఒత్తిడి",
    feelsLike: "అనుభవం",

    // Market Info
    todaysPrices: "నేటి ధరలు",
    priceChange: "ధర మార్పు",
    marketTrends: "మార్కెట్ ట్రెండ్‌లు",
    cropPrices: "పంట ధరలు",
    lastUpdated: "కొనెಯ ಬಾరಿ ನవೀకరిసಲಾಗಿದೆ",
    pricePerKg: "కిలో ధర",
    wholesale: "టోకు",
    retail: "రిటైల్",

    // Alerts
    weatherWarning: "వాతావరణ హెచ్చరిక",
    priceAlert: "ధర హెచ్చరిక",
    heavyRainAlert: "మీ ప్రాంతంలో భారీ వర్షాలు అంచనా. మీ పంటలను రక్షించండి.",
    heatWaveAlert: "వేడిమి తరంగ హెచ్చరిక. తగిన నీటిపారుదల నిర్ధారించండి.",
    priceDropAlert: "టమాటో ధరలు 15% తగ్గాయి. త్వరగా అమ్మడాన్ని పరిగణించండి.",
    priceRiseAlert: "ఉల్లిపాయ ధరలు 20% పెరిగాయి. అమ్మడానికి మంచి సమయం.",

    // Days of week
    today: "ఈరోజు",
    tomorrow: "నಾಳೆ",
    monday: "సోమవారం",
    tuesday: "మంగళవారం",
    wednesday: "ಬುಧವಾರ",
    thursday: "గುರುವಾರ",
    friday: "ಶುಕ್రವಾರ",
    saturday: "ಶನಿವಾರ",
    sunday: "ఆదివಾర",

    // Weather conditions
    sunny: "ఎండ",
    cloudy: "మేఘాలు",
    rainy: "వర్షం",
    stormy: "ಚಂಡಮಾరುత",
    partlyCloudy: "పాక్షిక మేఘాలు",
    overcast: "దట్టమైన మేఘాలు",

    // Market locations
    nearbyMarkets: "సమీప మార్కెట్లు",
    mandiPrices: "మండి ధరలు",
    selectMarket: "మార్కెట్ ఎంచుకోండి",

    // Profile Page
    farmerProfile: "రైతు ప్రొఫైల్",
    personalInfo: "వ్యక్తిగత సమాచారం",
    farmDetails: "వ్యవసాయ వివరాలు",
    preferences: "ప్రాధాన్యతలు",
    activityHistory: "కార్యకలాప చరిత్ర",
    editProfile: "ప్రొఫైల్ సవరించు",
    saveProfile: "ప్రొఫైల్ సংరక్న",

    // Personal Info
    fullName: "పూర్తి పేరు",
    phoneNumber: "ఫోన్ నంబర్",
    village: "గ్రామం",
    district: "జిల్లా",
    state: "రాష్ట్రం",

    // Farm Details
    farmSize: "వ్యవసాయ పరిమాణం (ఎకరాలు)",
    soilType: "మట్టి రకం",
    irrigationType: "నీటిపారుదల రకం",
    mainCrops: "ప్రధాన పంటలు",

    // History
    recentActivities: "ఇటీవలి కార్యకలాపాలు",
    cropQueries: "పంట ప్రశ్నలు",
    weatherChecks: "వాతావరణం తనిఖీలు",
    marketPriceChecks: "మార్కెట్ ధర తనిఖీలు",
    noHistory: "ఇంకా కార్యకలాప చరిత్ర లేదు",

    // Activity Types
    queriedCrop: "పంట సలహా కోసం జిజ్ఞసా కరేన",
    checkedWeather: "వాతావరణం తనిఖీ చేశారు",
    checkedMarket: "మార్కెట్ ధరలు తనిఖీ చేశారు",

    // Profile Success
    profileUpdated: "ప్రొఫైల్ విజయవంతంగా అప్‌డేట్ చేయబడింది",
    profileSaved: "ప్రొఫైల్ విజయవంతంగా సేవ్ చేయబడింది",

    // Chatbot
    chatbot: "AI సహాయకుడు",
    chatWithBot: "AI తో చాట్ చేయండి",
    askAnything: "వ్యవసాయం గురించి నన్ను ఏదైనా అడగండి",
    chatPlaceholder: "మీ వ్యవసాయ ప్రశ్నను ఇక్కడ టైప్ చేయండి...",
    sendMessage: "పంపండి",
    chatWelcome: "హలో! నేను మీ AI వ్యవసాయ సహాయకుడను. ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?",
    chatTyping: "AI టైప్ చేస్తోంది...",
    voiceInput: "వాయిస్ ఇన్‌పుట్",
    clearChat: "చాట్ క్లియర్ చేయండి",
    chatHistory: "చాట్ చరిత్ర",
    newChat: "కొత్త చాట్",
    chatSuggestions: "త్వరిత ప్రశ్నలు",
    suggestion1: "నా మట్టికి ఏ పంట మంచిది?",
    suggestion2: "వరిని ఎప్పుడు నాటాలి?",
    suggestion3: "కీటకాల దాడిని ఎలా నిరోధించాలి?",
    suggestion4: "వాతావరణ సూచన ఏమిటి?",
    suggestion5: "ప్రస్తుత మార్కెట్ ధరలు?",
    chatError: "క్షమించండి, నేను దానిని ప్రాసెస్ చేయలేకపోయాను. దయచేసి మళ్లీ ప్రయత్నించండి.",
    chatOffline: "చాట్ ప్రస్తుతం ఆఫ్‌లైన్‌లో ఉంది. దయచేసి తర్వాత ప్రయత్నించండి.",
  },

  kn: {
    // Header
    appName: "ಕೃಷಿಮಿತ್ರ",
    voiceHelp: "ಧ್ವನಿ ಸಹಾಯ",
    listening: "ಕೇಳುತ್ತಿದೆ...",

    // Homepage
    heroTitle: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿಯನ್ನು ಸರಳಗೊಳಿಸಲಾಗಿದೆ",
    heroSubtitle: "ತಜ್ಞರ ಬೆಳೆ ಸಲಹೆ, ಹವಾಮಾನ ಅಪ್‌ಡೇಟ್‌ಗಳು ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿಯನ್ನು ಪಡೆಯಿರಿ - ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ, ಧ್ವನಿ ಬೆಂಬಲದೊಂದಿಗೆ",
    youAsked: "ನೀವು ಕೇಟಿದ್ದೀರಿ",
    getCropAdvice: "ಬೆಳೆ ಸಲಹೆ ಪಡೆಯಿರಿ",
    callExpert: "ತಜ್ಞರನ್ನು ಕರೆ ಮಾಡಿ",

    // Features
    featuresTitle: "ಉತ್ತಮ ಕೃಷಿಗೆ ನಿಮಗೆ ಬೇಕಾದದ್ದೆಲ್ಲವೂ",
    cropAdvisory: "ಬೆಳೆ ಸಲಹೆ",
    cropAdvisoryDesc: "ನಿಮ್ಮ ಮಣ್ಣು ಮತ್ತು ಹವಾಮಾನದ ಆಧಾರದ ಮೇಲೆ ವೈಯಕ್ತಿಕ ಬೆಳೆ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ",
    weatherUpdates: "ಹವಾಮಾನ ಅಪ್‌ಡೇಟ್‌ಗಳು",
    weatherUpdatesDesc: "ನಿಮ್ಮ ಕೃಷಿ ಪ್ರದೇಶಕ್ಕೆ ನೈజ-ಸಮಯದ ಹವಾಮಾನ ಮುನ್ನೋಟಗಳು ಮತ್ತು ಎಚ್ಚರಿಕೆಗಳು",
    marketPrices: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು",
    marketPricesDesc: "ನಿಮ್ಮ ಬೆಳೆಗಳಿಗೆ ಇತ್ತೀಚಿನ ಮಾರುಕಟ್ಟೆ ದರಗಳು ಮತ್ತು ಬೆಲೆ ಪ್ರವೃತ್ತಿಗಳು",
    expertSupport: "ತಜ್ಞರ ಬೆಂಬಲ",
    expertSupportDesc: "ಕೃಷಿ ತಜ್ಞರು ಮತ್ತು ಸಹ ರೈತರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ",

    // Query Section
    askQuestion: "ನಿಮ್ಮ ಕೃಷಿ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ",
    askQuestionDesc: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ ಅಥವಾ ತ್ವರಿತ ಸಲಹೆಗಾಗಿ ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಬಳಸಿ",
    questionPlaceholder: "ಈ ಋತುವಿನಲ್ಲಿ ನಾನು ಯಾವ ಬೆಳೆಗಳನ್ನು ನೆಡಬೇಕು?",
    getAdviceNow: "ಈಗ ಸಲಹೆ ಪಡೆಯಿರಿ",

    // Footer
    footerTagline: "ಸ್ಮಾರ್ಟ್ ತಂತ್ರಜ್ಞಾನದೊಂದಿಗೆ ಸಣ್ಣ ಮತ್ತು ಕನಿಷ್ಠ ರೈತರನ್ನು ಸಶಕ್ತಗೊಳಿಸುವುದು",
    helpline: "ಸಹಾಯವಾಣಿ",
    availableLanguages: "6+ ಭಾಷೆಗಳಲ್ಲಿ ಲಭ್ಯ",

    // Advisory Page
    cropAdvisoryDashboard: "ಬೆಳೆ ಸಲಹೆ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    backToHome: "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
    farmDetails: "ಕೃಷಿ ವಿವರಗಳು",
    farmDetailsDesc: "ವೈಯಕ್ತಿಕ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಲು ನಿಮ್ಮ ಕೃಷಿಯ ಬಗೆ ನಮಗೆ ತಿಳಿಸಿ",
    location: "ಸ್ಥಳ (ಗ್ರಾಮ, ಜಿಲ್ಲೆ, ರಾಜ್ಯ)",
    locationPlaceholder: "ಉದಾ., ಪುಣೆ, ಮಹಾರಾಷ್ಟ್ರ",
    soilType: "ಮಣ್ಣಿನ ಪ್ರಕಾರ",
    soilTypePlaceholder: "ನಿಮ್ಮ ಮಣ್ಣಿನ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    farmSize: "ಕೃಷಿ ಗಾತ್ರ (ಎಕರೆಗಳಲ್ಲಿ)",
    farmSizePlaceholder: "ಉದಾ., 2.5",
    plantingSeason: "ನೆಟ್ಟ ಋತು",
    plantingSeasonPlaceholder: "ನೆಟ್ಟ ಋತುವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    additionalInfo: "ಹೆಚ್ಚುವರಿ ಮಾಹಿತಿ",
    previousCrop: "ಹಿಂದಿನ ಬೆಳೆ (ಏನಾದರೂ ಇದ್ದರೆ)",
    previousCropPlaceholder: "ಉದಾ., ಅಕ್ಕಿ, ಹತ್ತಿ, ಕಬ್ಬು",
    budgetRange: "ಬಜೆಟ್ ವ್ಯಾಪ್ತಿ (₹)",
    budgetPlaceholder: "ಉದಾ., 50,000 - 1,00,000",
    farmingExperience: "ಕೃಷಿ ಅನುಭವ",
    experiencePlaceholder: "ನಿಮ್ಮ ಅನುಭವದ ಮಟ್ಟವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    getCropRecommendations: "ಬೆಳೆ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ",

    // How it works
    howItWorks: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    step1: "ನಿಮ್ಮ ಕೃಷಿ ವಿವರಗಳು ಮತ್ತು ಸ್ಥಳವನ್ನು ಭರ್ತಿ ಮಾಡಿ",
    step2: "ನಮ್ಮ AI ಮಣ್ಣು, ಹವಾಮಾನ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಡೇಟಾವನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತದೆ",
    step3: "ವೈಯಕ್ತಿಕ ಬೆಳೆ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ",
    step4: "ಗರಿಷ್ಠ ಇಳುವರಿಗಾಗಿ ತಜ್ಞರ ಸಲಹೆಗಳನ್ನು ಅನುಸರಿಸಿ",

    // Current conditions
    currentConditions: "ಪ್ರಸ್ತುತ ಪರಿಸ್ಥಿತಿಗಳು",
    humidity: "ಆರ್ದ್ರತೆ",
    goodForPlanting: "ನೆಡಲು ಒಳ್ಳೆಯದು",

    // Recommendations
    recommendedCrops: "ನಿಮ್ಮ ಕೃಷಿಗೆ ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆಗಳು",
    modifyDetails: "ವಿವರಗಳನ್ನು ಮಾರ್ಪಡಿಸಿ",
    expectedYield: "ನಿರೀಕ್ಷಿತ ಇಳುವರಿ",
    investment: "ಹೂಡಿಕೆ",
    duration: "ಅವಧಿ",
    marketPrice: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ",
    expertTips: "ತಜ್ಞರ ಸಲಹೆಗಳು",
    needConsultation: "ತಜ್ಞರ ಸಲಹೆ ಬೇಕೇ?",
    consultationText: "ವೈಯಕ್ತಿಕ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ನಮ್ಮ ಕೃಷಿ ತಜ್ಞರನ್ನು ಕರೆ ಮಾಡಿ",
    forGuidance: "",

    // Soil types
    claySoil: "ಜೇಡಿಮಣ್ಣು",
    sandySoil: "ಮರಳು ಮಣ್ಣು",
    loamySoil: "ಲೋಮ್ ಮಣ್ಣು",
    siltSoil: "ಸಿಲ್ಟ್ ಮಣ್ಣು",
    redSoil: "ಕೆಂಪು ಮಣ್ಣು",
    blackSoil: "ಕಪ್ಪು ಮಣ್ಣು",
    alluvialSoil: "ಮೆಕ್ಕಲು ಮಣ್ಣು",

    // Seasons
    kharif: "ಖರೀಫ್ (ಮಾನ್ಸೂನ್)",
    rabi: "ರಬಿ (ಚಳಿಗಾಲ)",
    zaid: "ಜಾಯದ್ (ಬೇಸಿಗೆ)",

    // Experience levels
    beginner: "ಆರಂಭಿಕ (0-2 ವರ್ಷಗಳು)",
    intermediate: "ಮಧ್ಯಮ (3-5 ವರ್ಷಗಳು)",
    experienced: "ಅನುಭವಿ (5+ ವರ್ಷಗಳು)",

    // Risk levels
    lowRisk: "ಕಡಿಮೆ ಅಪಾಯ",
    mediumRisk: "ಮಧ್ಯಮ ಅಪಾಯ",
    highRisk: "ಹೆಚ್ಚಿನ ಅಪಾಯ",

    // Suitability
    excellent: "ಅತ್ಯುತ್ತಮ",
    veryGood: "ಬಹಳ ಒಳ್ಳೆಯದು",
    good: "ಒಳ್ಳೆಯದು",

    // Weather & Market Info
    weatherMarketInfo: "ಹವಾಮಾನ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿ",
    currentWeather: "ಪ್ರಸ್ತುತ ಹವಾಮಾನ",
    weatherForecast: "7-ದಿನಗಳ ಮುನ್ನೋಟ",
    priceAlerts: "ಬೆಲೆ ಎಚ್ಚರಿಕೆಗಳು",
    weatherAlerts: "ಹವಾಮಾನ ಎಚ್ಚರಿಕೆಗಳು",
    temperature: "ತಾಪಮಾನ",
    rainfall: "ಮಳೆ",
    windSpeed: "ಗಾಳಿಯ ವೇಗ",
    uvIndex: "UV ಸೂಚಿ",
    visibility: "ದೃಶ್ಯತೆ",
    pressure: "ಒತ್ತಡ",
    feelsLike: "ಅನುಭವ",

    // Market Info
    todaysPrices: "ಇಂದಿನ ಬೆಲೆಗಳು",
    priceChange: "ಬೆಲೆ ಬದಲಾವಣೆ",
    marketTrends: "ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿಗಳು",
    cropPrices: "ಬೆಳೆ ಬೆಲೆಗಳು",
    lastUpdated: "ಕೊನೆಯ ಬಾರಿ ನವೀಕರಿಸಲಾಗಿದೆ",
    pricePerKg: "ಪ್ರತಿ ಕೆಜಿ ಬೆಲೆ",
    wholesale: "ಸಗಟು",
    retail: "ಚಿಲ್ಲರೆ",

    // Alerts
    weatherWarning: "ಹವಾಮಾನ ಎಚ್ಚರಿಕೆ",
    priceAlert: "ಬೆಲೆ ಎಚ್ಚರಿಕೆ",
    heavyRainAlert: "ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ಭಾರೀ ಮಳೆ ನಿರೀಕ್ಷೆ. ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ರಕ್ಷಿಸಿ.",
    heatWaveAlert: "ಶಾಖದ ಅಲೆಯ ಎಚ್ಚರಿಕೆ. ಸಾಕಷ್ಟು ನೀರಾವರಿ ಖಚಿತಪಡಿಸಿ.",
    priceDropAlert: "ಟೊಮೇಟೊ ಬೆಲೆಗಳು 15% ಕಡಿಮೆಯಾಗಿವೆ. ಬೇಗ ಮಾರಾಟ ಮಾಡುವುದನ್ನು ಪರಿಗಣಿಸಿ.",
    priceRiseAlert: "ಈರುಳ್ಳಿ ಬೆಲೆಗಳು 20% ಹೆಚ್ಚಾಗಿವೆ. ಮಾರಾಟಕ್ಕೆ ಒಳ್ಳೆಯ ಸಮಯ.",

    // Days of week
    today: "ಇಂದು",
    tomorrow: "ನಾಳೆ",
    monday: "ಸೋಮವಾರ",
    tuesday: "ಮಂಗಳವಾರ",
    wednesday: "ಬುಧವಾರ",
    thursday: "ಗುರುವಾರ",
    friday: "ಶುಕ್ರವಾರ",
    saturday: "ಶನಿವಾರ",
    sunday: "ಭಾನುವಾರ",

    // Weather conditions
    sunny: "ಬಿಸಿಲು",
    cloudy: "ಮೋಡ",
    rainy: "ಮಳೆ",
    stormy: "ಚಂಡಮಾರುತ",
    partlyCloudy: "ಭಾಗಶಃ ಮೋಡ",
    overcast: "ದಟ್ಟ ಮೋಡ",

    // Market locations
    nearbyMarkets: "ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆಗಳು",
    mandiPrices: "ಮಂಡಿ ಬೆಲೆಗಳು",
    selectMarket: "ಮಾರುಕಟ್ಟೆ ಆಯ್ಕೆಮಾಡಿ",

    // Profile Page
    farmerProfile: "ರೈತ ಪ್ರೊಫೈಲ್",
    personalInfo: "ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ",
    farmDetails: "ಕೃಷಿ ವಿವರಗಳು",
    preferences: "ಆದ್ಯತೆಗಳು",
    activityHistory: "ಚಟುವಟಿಕೆ ಇತಿಹಾಸ",
    editProfile: "ಪ್ರೊಫೈಲ್ ಸಂಪಾದಿಸಿ",
    saveProfile: "ಪ್ರೊಫೈಲ್ ಉಳಿಸಿ",

    // Personal Info
    fullName: "ಪೂರ್ಣ ಹೆಸರು",
    phoneNumber: "ಫೋನ್ ಸಂಖ್ಯೆ",
    village: "ಗ್ರಾಮ",
    district: "ಜಿಲ್ಲೆ",
    state: "ರಾಜ್ಯ",

    // Farm Details
    farmSize: "ಕೃಷಿ ಗಾತ್ರ (ಎಕರೆ)",
    soilType: "ಮಣ್ಣಿನ ಪ್ರಕಾರ",
    irrigationType: "ನೀರಾವರಿ ಪ್ರಕಾರ",
    mainCrops: "ಮುಖ್ಯ ಬೆಳೆಗಳು",

    // History
    recentActivities: "ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆಗಳು",
    cropQueries: "ಬೆಳೆ ಪ್ರಶ್ನೆಗಳು",
    weatherChecks: "ಹವಾಮಾನ ಪರಿಶೀಲನೆಗಳು",
    marketPriceChecks: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಪರಿಶೀಲನೆಗಳು",
    noHistory: "ಇನ್ನೂ ಚಟುವಟಿಕೆ ಇತಿಹಾಸ ಇಲ್ಲ",

    // Activity Types
    queriedCrop: "ಬೆಳೆ ಸಲಹೆಗಾಗಿ ಕೇಟಿದರು",
    checkedWeather: "ಹವಾಮಾನ ಪರಿಶೀಲಿಸಿದರು",
    checkedMarket: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿದರು",

    // Profile Success
    profileUpdated: "ಪ್ರೊಫೈಲ್ ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ",
    profileSaved: "ಪ್ರೊಫೈಲ್ ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ",

    // Chatbot
    chatbot: "AI ಸಹಾಯಕ",
    chatWithBot: "AI ಜೊತೆ ಚಾಟ್ ಮಾಡಿ",
    askAnything: "ಕೃಷಿಯ ಬಗ್ಗೆ ನನ್ನನ್ನು ಏನಾದರೂ ಕೇಳಿ",
    chatPlaceholder: "ನಿಮ್ಮ ಕೃಷಿ ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ...",
    sendMessage: "ಕಳುಹಿಸಿ",
    chatWelcome: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ಕೃಷಿ ಸಹಾಯಕ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
    chatTyping: "AI ಟೈಪ್ ಮಾಡುತ್ತಿದೆ...",
    voiceInput: "ಧ್ವನಿ ಇನ್‌ಪುಟ್",
    clearChat: "ಚಾಟ್ ಅನ್ನು ತೆರವುಗೊಳಿಸಿ",
    chatHistory: "ಚಾಟ್ ಇತಿಹಾಸ",
    newChat: "ಹೊಸ ಚಾಟ್",
    chatSuggestions: "ತ್ವರಿತ ಪ್ರಶ್ನೆಗಳು",
    suggestion1: "ನನ್ನ ಮಣ್ಣಿಗೆ ಯಾವ ಬೆಳೆ ಉತ್ತಮ?",
    suggestion2: "ಅಕ್ಕಿಯನ್ನು ಯಾವಾಗ ನೆಡಬೇಕು?",
    suggestion3: "ಕೀಟಗಳ ದಾಳಿಯನ್ನು ಹೇಗೆ ತಡೆಯುವುದು?",
    suggestion4: "ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ಏನು?",
    suggestion5: "ಪ್ರಸ್ತುತ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು?",
    chatError: "ಕ್ಷಮಿಸಿ, ನನಗೆ ಅದನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    chatOffline: "ಚಾಟ್ ಪ್ರಸ್ತುತ ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿದೆ. ದಯವಿಟ್ಟು ನಂತರ ಪ್ರಯತ್ನಿಸಿ.",
  },
}

export function useTranslation(language: Language = "mr") {
  return translations[language] || translations.en
}
