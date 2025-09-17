// src/app/advisory/page.tsx

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Sprout,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Upload,
  FileImage,
  Loader2,
  Leaf,
  Droplets,
  FlaskConical,
  BarChart,
  XCircle,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/translations"
import Image from "next/image"

// Define the structure for the soil analysis results
interface SoilAnalysisResult {
  nitrogen: { value: number; level: "Low" | "Medium" | "High"; ideal: string }
  phosphorus: { value: number; level: "Low" | "Medium" | "High"; ideal: string }
  potassium: { value: number; level: "Low" | "Medium" | "High"; ideal: string }
  ph: { value: number; level: "Acidic" | "Neutral" | "Alkaline"; ideal: string }
  organicCarbon: { value: number; level: "Low" | "Medium" | "High"; ideal: string }
  summary: string
  recommendations: string[]
}

type HealthStatus = {
  level: "Good" | "Needs Improvement" | "Poor";
  color: "green" | "yellow" | "red";
};


export default function AdvisoryPage() {
  const [step, setStep] = useState<"upload" | "analyzing" | "insights" | "recommendations">("upload")
  const [soilCardImage, setSoilCardImage] = useState<File | null>(null)
  const [soilCardPreview, setSoilCardPreview] = useState<string | null>(null)
  const [analysisResult, setAnalysisResult] = useState<SoilAnalysisResult | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [healthStatus, setHealthStatus] = useState<HealthStatus>({ level: "Good", color: "green" });

  const { language } = useLanguage()
  const t = useTranslation(language)

  // Dynamically calculate overall soil health based on the analysis
  const calculateOverallHealth = (result: SoilAnalysisResult): HealthStatus => {
    const lowCount = Object.values(result).filter(
      (nutrient: any) => nutrient.level === "Low"
    ).length;

    if (lowCount >= 2) {
      return { level: "Poor", color: "red" };
    }
    if (lowCount === 1) {
      return { level: "Needs Improvement", color: "yellow" };
    }
    return { level: "Good", color: "green" };
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setApiError(null)
      setSoilCardImage(file)
      setSoilCardPreview(URL.createObjectURL(file))
    }
  }

  // Securely calls the backend API route
  const handleAnalyzeSoilCard = async () => {
    if (!soilCardImage) return;
    setStep("analyzing");
    setApiError(null);

    const formData = new FormData();
    formData.append("file", soilCardImage);

    try {
      const response = await fetch("/api/analyze-soil-card", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const result: SoilAnalysisResult = await response.json();
      setAnalysisResult(result);
      setHealthStatus(calculateOverallHealth(result)); // Set dynamic health status
      setStep("insights");

    } catch (error: any) {
      console.error("Analysis Error:", error);
      setApiError(error.message);
      setStep("upload");
    }
  };
  
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
                `Your soil's ${analysisResult?.ph.level.toLowerCase()} pH is ideal for nutrient uptake in tomatoes.`,
                `Supplement with a nitrogen-rich fertilizer as your soil is ${analysisResult?.nitrogen.level.toLowerCase()} in N.`,
                "Use drip irrigation for efficient water use.",
            ],
            riskLevel: t.lowRisk,
        },
        {
            crop: "Maize (Kharif)",
            suitability: t.veryGood,
            expectedYield: "6-7 tons/hectare",
            investment: "₹20,000-25,000/hectare",
            duration: "100-110 days",
            marketPrice: "₹18-22/kg",
            tips: [
                "Maize is a heavy nitrogen feeder; significant urea application is needed.",
                `Your ${analysisResult?.potassium.level.toLowerCase()} Potassium levels are good for stalk strength.`,
                "Monitor for fall armyworm pests.",
            ],
            riskLevel: t.mediumRisk,
        },
    ]
    setRecommendations(mockRecommendations)
    setStep("recommendations")
  }

  const getNutrientLevelColor = (level: string) => {
    const lowerLevel = level.toLowerCase()
    if (lowerLevel.includes("high") || lowerLevel.includes("neutral")) return "text-green-600 bg-green-50 border-green-200"
    if (lowerLevel.includes("medium")) return "text-yellow-600 bg-yellow-50 border-yellow-200"
    if (lowerLevel.includes("low") || lowerLevel.includes("acidic") || lowerLevel.includes("alkaline")) return "text-red-600 bg-red-50 border-red-200"
    return "text-gray-600 bg-gray-50 border-gray-200"
  }
  
  const getSuitabilityColor = (suitability: string) => {
    if (suitability === t.excellent) return "bg-green-100 text-green-800 border-green-200"
    if (suitability === t.veryGood) return "bg-blue-100 text-blue-800 border-blue-200"
    return "bg-yellow-100 text-yellow-800 border-yellow-200"
  }

  const getRiskColor = (risk: string) => {
    if (risk === t.lowRisk) return "text-green-600"
    if (risk === t.mediumRisk) return "text-yellow-600"
    return "text-red-600"
  }
    
  const renderContent = () => {
    switch (step) {
      case "upload":
        return (
          <Card className="max-w-2xl mx-auto animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">{t.cropAdvisory}</CardTitle>
              <CardDescription>{t.soilCardUploadDesc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <label htmlFor="soil-card-upload" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg hover:border-primary transition-colors">
                  {soilCardPreview ? (
                     <Image src={soilCardPreview} alt="Soil Card Preview" width={400} height={250} className="rounded-lg object-contain max-h-[250px]" />
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 font-semibold text-primary">{t.selectImage}</p>
                      <p className="text-xs text-gray-500">{t.dragAndDrop}</p>
                    </div>
                  )}
                </div>
              </label>
              <Input id="soil-card-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
              {apiError && (
                 <div className="flex items-center gap-2 p-3 text-sm text-red-800 bg-red-50 rounded-lg">
                    <XCircle className="h-4 w-4"/>
                    <p><strong>Error:</strong> {apiError}</p>
                 </div>
              )}
              <Button onClick={handleAnalyzeSoilCard} disabled={!soilCardImage} className="w-full text-lg py-6 mt-4">
                <Sprout className="mr-2 h-5 w-5" />
                {t.analyzeSoilCard}
              </Button>
            </CardContent>
          </Card>
        )
      case "analyzing":
        return (
            <div className="flex flex-col items-center justify-center text-center p-10 animate-fade-in">
                <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800">{t.analyzingTitle}</h2>
                <p className="text-gray-600 mt-2">{t.analyzingDesc}</p>
            </div>
        )
      case "insights":
        if (!analysisResult) return null
        const { summary, recommendations } = analysisResult
        return (
          <div className="space-y-6 animate-fade-in">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">🌱 {t.soilHealthInsights}</CardTitle>
                <CardDescription>{t.soilHealthDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <NutrientCard icon={<Leaf />} name="Nitrogen (N)" data={analysisResult.nitrogen} unit="kg/ha" />
                  <NutrientCard icon={<Leaf className="text-orange-500" />} name="Phosphorus (P)" data={analysisResult.phosphorus} unit="kg/ha" />
                  <NutrientCard icon={<Leaf className="text-purple-500" />} name="Potassium (K)" data={analysisResult.potassium} unit="kg/ha" />
                  <NutrientCard icon={<Droplets />} name="Soil pH" data={analysisResult.ph} unit="" />
                  <NutrientCard icon={<FlaskConical />} name="Organic Carbon" data={analysisResult.organicCarbon} unit="%" />
                  
                  <Card className={`flex flex-col justify-center items-center p-4 bg-${healthStatus.color}-50/50 border-${healthStatus.color}-100`}>
                    <BarChart className={`h-8 w-8 text-${healthStatus.color}-600 mb-2`} />
                    <p className={`text-sm font-medium text-${healthStatus.color}-800`}>Overall Health</p>
                    <p className={`text-xl font-bold text-${healthStatus.color}-700`}>{healthStatus.level}</p>
                  </Card>
                </div>

                <div className="p-4 rounded-lg bg-green-50 border border-green-200 space-y-4">
                    <h3 className="font-semibold text-green-900">{t.aiSummary}</h3>
                    <p className="text-sm text-green-800">{summary}</p>
                    <h4 className="font-semibold text-green-900 pt-2">{t.keyRecommendations}</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-green-800">
                        {recommendations.map((rec: string, i: number) => <li key={i}>{rec}</li>)}
                    </ul>
                </div>

                <Button onClick={generateRecommendations} className="w-full text-lg py-6 mt-6">
                  {t.getCropRecommendations}
                </Button>
              </CardContent>
            </Card>
          </div>
        )
      case "recommendations":
        return (
          <div className="space-y-6 animate-fade-in">
             <div className="flex items-center justify-between">
               <h2 className="text-2xl font-bold text-foreground">{t.recommendedCrops}</h2>
               <Button onClick={() => setStep("upload")} variant="outline">
                 {t.startOver}
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
                           <Badge variant="outline" className={getRiskColor(rec.riskLevel)}>{rec.riskLevel}</Badge>
                         </div>
                       </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                           <div className="text-center p-3 bg-muted/50 rounded-lg"><p className="text-sm text-muted-foreground">{t.expectedYield}</p><p className="font-semibold text-primary">{rec.expectedYield}</p></div>
                           <div className="text-center p-3 bg-muted/50 rounded-lg"><p className="text-sm text-muted-foreground">{t.investment}</p><p className="font-semibold text-primary">{rec.investment}</p></div>
                           <div className="text-center p-3 bg-muted/50 rounded-lg"><p className="text-sm text-muted-foreground">{t.duration}</p><p className="font-semibold text-primary">{rec.duration}</p></div>
                           <div className="text-center p-3 bg-muted/50 rounded-lg"><p className="text-sm text-muted-foreground">{t.marketPrice}</p><p className="font-semibold text-primary">{rec.marketPrice}</p></div>
                         </div>
                         <div>
                           <h4 className="font-semibold mb-2 flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" />{t.expertTips}</h4>
                           <ul className="space-y-1">{rec.tips.map((tip: string, tipIndex: number) => (<li key={tipIndex} className="text-sm text-muted-foreground flex items-start gap-2"><span className="text-primary">•</span>{tip}</li>))}
                           </ul>
                         </div>
                    </CardContent>
                 </Card>
               ))}
             </div>
           </div>
        )
    }
  }

  const NutrientCard = ({ icon, name, data, unit }: { icon: React.ReactNode, name: string, data: any, unit: string }) => (
    <Card className="p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-primary">{icon}</div>
        <p className="font-semibold text-gray-700">{name}</p>
      </div>
      <p className="text-2xl font-bold text-gray-900">{data.value} <span className="text-base font-normal text-gray-500">{unit}</span></p>
      <Badge variant="outline" className={`mt-2 font-medium ${getNutrientLevelColor(data.level)}`}>{data.level}</Badge>
      <p className="text-xs text-gray-500 mt-2">Ideal: {data.ideal}</p>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sprout className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-gray-900">{t.cropAdvisoryDashboard}</h1>
            </div>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />{t.backToHome}
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {renderContent()}
      </main>
    </div>
  )
}