"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Sprout,
  MapPin,
  Calendar,
  Droplets,
  Thermometer,
  Mic,
  MicOff,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/translations"

export default function AdvisoryPage() {
  const router = useRouter()
  const [isListening, setIsListening] = useState(false)
  const [formData, setFormData] = useState({
    location: "",
    soilType: "",
    farmSize: "",
    season: "",
    previousCrop: "",
    budget: "",
    experience: "",
  })
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [showRecommendations, setShowRecommendations] = useState(false)

  const { language } = useLanguage()
  const t = useTranslation(language)

  const soilTypes = [
    { key: "claySoil", value: t.claySoil },
    { key: "sandySoil", value: t.sandySoil },
    { key: "loamySoil", value: t.loamySoil },
    { key: "siltSoil", value: t.siltSoil },
    { key: "redSoil", value: t.redSoil },
    { key: "blackSoil", value: t.blackSoil },
    { key: "alluvialSoil", value: t.alluvialSoil },
  ]

  const seasons = [
    { key: "kharif", value: t.kharif },
    { key: "rabi", value: t.rabi },
    { key: "zaid", value: t.zaid },
  ]

  const experienceLevels = [
    { key: "beginner", value: t.beginner },
    { key: "intermediate", value: t.intermediate },
    { key: "experienced", value: t.experienced },
  ]

  const toggleVoiceInput = () => {
    setIsListening(!isListening)
    if (!isListening) {
      setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          location: t.locationPlaceholder
            .replace("e.g., ", "")
            .replace("যেমন, ", "")
            .replace("जैसे, ", "")
            .replace("எ.கா., ", "")
            .replace("ఉదా., ", "")
            .replace("ಉದಾ., ", ""),
        }))
        setIsListening(false)
      }, 2000)
    }
  }

  const generateRecommendations = () => {
    const mockRecommendations = [
      {
        crop: "Tomato",
        suitability: t.excellent,
        expectedYield: "25-30 tons/hectare",
        investment: "₹40,000-50,000/hectare",
        duration: "120-130 days",
        marketPrice: "₹15-25/kg",
        tips: [
          "Plant during October-November for best results",
          "Ensure proper drainage to prevent root rot",
          "Use drip irrigation for water efficiency",
        ],
        riskLevel: t.lowRisk,
      },
      {
        crop: "Onion",
        suitability: t.veryGood,
        expectedYield: "20-25 tons/hectare",
        investment: "₹25,000-35,000/hectare",
        duration: "150-180 days",
        marketPrice: "₹20-40/kg",
        tips: [
          "Choose disease-resistant varieties",
          "Apply organic manure before planting",
          "Monitor for thrips and other pests",
        ],
        riskLevel: t.mediumRisk,
      },
      {
        crop: "Wheat",
        suitability: t.good,
        expectedYield: "4-5 tons/hectare",
        investment: "₹15,000-20,000/hectare",
        duration: "120-150 days",
        marketPrice: "₹20-25/kg",
        tips: [
          "Sow by mid-November for optimal yield",
          "Ensure adequate phosphorus in soil",
          "Use certified seeds for better results",
        ],
        riskLevel: t.lowRisk,
      },
    ]

    setRecommendations(mockRecommendations)
    setShowRecommendations(true)

    if (formData.location.trim()) {
      router.push(`/weather-market?city=${encodeURIComponent(formData.location.trim())}`)
    }
  }

  const getSuitabilityColor = (suitability: string) => {
    if (suitability === t.excellent) return "bg-green-100 text-green-800 border-green-200"
    if (suitability === t.veryGood) return "bg-blue-100 text-blue-800 border-blue-200"
    if (suitability === t.good) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-gray-100 text-gray-800 border-gray-200"
  }

  const getRiskColor = (risk: string) => {
    if (risk === t.lowRisk) return "text-green-600"
    if (risk === t.mediumRisk) return "text-yellow-600"
    if (risk === t.highRisk) return "text-red-600"
    return "text-gray-600"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t.backToHome}
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Sprout className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-gray-900">{t.cropAdvisoryDashboard}</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {!showRecommendations ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {t.farmDetails}
                  </CardTitle>
                  <CardDescription>{t.farmDetailsDesc}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">{t.location}</Label>
                    <div className="flex gap-2">
                      <Input
                        id="location"
                        placeholder={t.locationPlaceholder}
                        value={formData.location}
                        onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                      />
                      <Button onClick={toggleVoiceInput} variant={isListening ? "default" : "outline"} size="sm">
                        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="soilType">{t.soilType}</Label>
                    <Select
                      value={formData.soilType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, soilType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t.soilTypePlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {soilTypes.map((soil) => (
                          <SelectItem key={soil.key} value={soil.value}>
                            {soil.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="farmSize">{t.farmSize}</Label>
                    <Input
                      id="farmSize"
                      placeholder={t.farmSizePlaceholder}
                      value={formData.farmSize}
                      onChange={(e) => setFormData((prev) => ({ ...prev, farmSize: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="season">{t.plantingSeason}</Label>
                    <Select
                      value={formData.season}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, season: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t.plantingSeasonPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {seasons.map((season) => (
                          <SelectItem key={season.key} value={season.value}>
                            {season.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    {t.additionalInfo}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="previousCrop">{t.previousCrop}</Label>
                    <Input
                      id="previousCrop"
                      placeholder={t.previousCropPlaceholder}
                      value={formData.previousCrop}
                      onChange={(e) => setFormData((prev) => ({ ...prev, previousCrop: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">{t.budgetRange}</Label>
                    <Input
                      id="budget"
                      placeholder={t.budgetPlaceholder}
                      value={formData.budget}
                      onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">{t.farmingExperience}</Label>
                    <Select
                      value={formData.experience}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, experience: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t.experiencePlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level.key} value={level.value}>
                            {level.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={generateRecommendations}
                className="w-full text-lg py-6"
                disabled={!formData.location || !formData.soilType || !formData.season}
              >
                <Sprout className="mr-2 h-5 w-5" />
                {t.getCropRecommendations}
              </Button>
            </div>

            {/* Info Panel */}
            <div className="space-y-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary">{t.howItWorks}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <p className="text-sm">{t.step1}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <p className="text-sm">{t.step2}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <p className="text-sm">{t.step3}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <p className="text-sm">{t.step4}</p>
                  </div>
                </CardContent>
              </Card>

              
            </div>
          </div>
        ) : (
          /* Recommendations Display */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">{t.recommendedCrops}</h2>
              <Button onClick={() => setShowRecommendations(false)} variant="outline">
                {t.modifyDetails}
              </Button>
            </div>

            <div className="grid gap-6">
              {recommendations.map((rec, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{rec.crop}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={getSuitabilityColor(rec.suitability)}>{rec.suitability}</Badge>
                        <Badge variant="outline" className={getRiskColor(rec.riskLevel)}>
                          {rec.riskLevel}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">{t.expectedYield}</p>
                        <p className="font-semibold text-primary">{rec.expectedYield}</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">{t.investment}</p>
                        <p className="font-semibold text-primary">{rec.investment}</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">{t.duration}</p>
                        <p className="font-semibold text-primary">{rec.duration}</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">{t.marketPrice}</p>
                        <p className="font-semibold text-primary">{rec.marketPrice}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {t.expertTips}
                      </h4>
                      <ul className="space-y-1">
                        {rec.tips.map((tip: string, tipIndex: number) => (
                          <li key={tipIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900">{t.needConsultation}</p>
                    <p className="text-sm text-blue-700 mt-1">
                      {t.consultationText} <strong>1800-XXX-XXXX</strong> {t.forGuidance}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
