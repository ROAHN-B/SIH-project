// src/app/advisory/page.tsx

"use client"

import { useState, FC, ReactNode, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Sprout, ArrowLeft, Upload, FileImage, Loader2, Leaf, Droplets, FlaskConical, XCircle, FileText, ClipboardPenLine, Award, Mountain, Thermometer, Sun, Atom, Microscope, Download, ShoppingCart, ExternalLink
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/translations"
import Image from "next/image"
import { cn } from "@/lib/utils"
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Data structures
interface SoilReportData {
  ph: number; ec: number; oc: number;
  n: number; p: number; k: number;
  s: number; ca: number; mg: number;
  zn: number; b: number; fe: number; mn: number; cu: number;
}

interface Insight {
  title: string;
  value: string;
  level: "Very Low" | "Low" | "Optimal" | "High" | "Very High" | "Acidic" | "Neutral" | "Alkaline";
  color: "red" | "green" | "yellow" | "blue";
  description: string;
  icon: ReactNode;
}

interface FertilizerRecommendation {
  nutrient: string;
  productName: string;
  reason: string;
  icon: ReactNode;
  links: { name: string; url: string }[];
}


export default function AdvisoryPage() {
  const [flowStep, setFlowStep] = useState<"initial" | "upload" | "manualEntry" | "analyzing" | "insights" | "recommendations">("initial");
  
  const [soilCardImage, setSoilCardImage] = useState<File | null>(null);
  const [soilCardPreview, setSoilCardPreview] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [generatedInsights, setGeneratedInsights] = useState<Insight[]>([]);
  const [fertilizerPlan, setFertilizerPlan] = useState<FertilizerRecommendation[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  const [manualFormData, setManualFormData] = useState<SoilReportData>({
    ph: 7.0, ec: 0.5, oc: 0.8, n: 281, p: 13, k: 181, s: 7, ca: 0.3, mg: 0.06, fe: 2.5, mn: 1.0, zn: 0.5, cu: 0.3, b: 0.3
  });
  
  const reportRef = useRef<HTMLDivElement>(null);

  const { language } = useLanguage();
  const t = useTranslation(language);

  const handleManualFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setManualFormData(prev => ({ ...prev, [id]: parseFloat(value) || 0 }));
  };
  
  const handleDownload = () => {
    if (!reportRef.current) return;
    setIsDownloading(true);

    html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#f8fafc',
    }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Soil_Health_Report_${new Date().toLocaleDateString()}.pdf`);
        setIsDownloading(false);
    });
  };

  const generateInsightsFromData = (data: SoilReportData) => {
    const insights: Insight[] = [];
    const addInsight = (title: string, value: number, unit: string, idealRange: [number, number], icon: ReactNode, customLogic?: (val: number) => Partial<Insight>) => {
      let level: Insight["level"] = "Optimal", color: Insight["color"] = "green";
      if (value < idealRange[0]) { level = "Low"; color = "yellow"; }
      if (value > idealRange[1]) { level = "High"; color = "blue"; }
      
      let custom = customLogic ? customLogic(value) : {};
      insights.push({ title, value: `${(value || 0).toFixed(2)} ${unit}`, level, color, description: "", icon, ...custom });
    };

    addInsight("Soil pH", data.ph, "", [6.25, 7.5], <Thermometer className="h-6 w-6 text-blue-500" />, (val) => ({
      level: val < 6.25 ? "Acidic" : val > 7.5 ? "Alkaline" : "Neutral",
      color: val < 6.25 ? "yellow" : val > 7.5 ? "blue" : "green",
      description: val < 6.25 ? "Acidic soil can lock nutrients. Consider applying lime." : val > 7.5 ? "Alkaline soil can limit micronutrient uptake. Consider gypsum." : "Excellent pH for nutrient availability."
    }));
    addInsight("Conductivity (EC)", data.ec, "mS/cm", [0, 1.0], <Droplets className="h-6 w-6 text-sky-500" />, (val) => ({
      level: val > 1.0 ? "High" : "Optimal",
      color: val > 1.0 ? "red" : "green",
      description: val > 1.0 ? "High salinity can cause salt stress to plants." : "Ideal salt level, safe for all crops."
    }));
    addInsight("Organic Carbon", data.oc, "%", [0.75, Infinity], <FlaskConical className="h-6 w-6 text-amber-600" />, (val) => ({
      level: val < 0.75 ? "Low" : "Optimal",
      color: val < 0.75 ? "red" : "green",
      description: val < 0.75 ? "A critical area for improvement. Add compost or FYM." : "Excellent organic matter content for soil health."
    }));
    addInsight("Nitrogen (N)", data.n, "kg/ha", [281, 410], <Leaf className="h-6 w-6 text-green-500" />, (val) => ({ description: "For leafy growth."}));
    addInsight("Phosphorus (P)", data.p, "kg/ha", [13, 22], <Sun className="h-6 w-6 text-orange-500" />, (val) => ({ description: "For root and flower development."}));
    addInsight("Potassium (K)", data.k, "kg/ha", [181, 240], <Award className="h-6 w-6 text-purple-500" />, (val) => ({ description: "For overall vigor and disease resistance."}));
    addInsight("Sulphur (S)", data.s, "ppm", [7, 15], <Atom className="h-6 w-6 text-yellow-500" />, (val) => ({ description: "Key for protein synthesis and oilseeds."}));
    addInsight("Calcium (Ca)", data.ca, "%", [0.3, 0.8], <Mountain className="h-6 w-6 text-gray-500" />, (val) => ({ description: "Builds strong cell walls."}));
    addInsight("Magnesium (Mg)", data.mg, "%", [0.06, 0.15], <Sprout className="h-6 w-6 text-lime-600" />, (val) => ({ description: "Central to photosynthesis."}));
    addInsight("Iron (Fe)", data.fe, "ppm", [2.5, 4.5], <Microscope className="h-6 w-6 text-red-800" />, (val) => ({ description: "For chlorophyll formation."}));
    addInsight("Manganese (Mn)", data.mn, "ppm", [1.0, 2.0], <Microscope className="h-6 w-6 text-pink-700" />, (val) => ({ description: "Aids in photosynthesis."}));
    addInsight("Zinc (Zn)", data.zn, "ppm", [0.5, 1.2], <Microscope className="h-6 w-6 text-teal-600" />, (val) => ({ description: "For enzyme function."}));
    addInsight("Copper (Cu)", data.cu, "ppm", [0.3, 0.5], <Microscope className="h-6 w-6 text-orange-700" />, (val) => ({ description: "For reproductive growth."}));
    addInsight("Boron (B)", data.b, "ppm", [0.3, 0.5], <Microscope className="h-6 w-6 text-indigo-600" />, (val) => ({ description: "Crucial for fruit and seed setting."}));

    setGeneratedInsights(insights);
    setFlowStep("insights");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) { setApiError(null); setSoilCardImage(file); setSoilCardPreview(URL.createObjectURL(file)); }
  };

  const handleAnalyzeSoilCard = async () => {
    if (!soilCardImage) return;
    setFlowStep("analyzing");
    setApiError(null);
    const formData = new FormData();
    formData.append("file", soilCardImage);
    try {
      const response = await fetch("/api/analyze-soil-card", { method: "POST", body: formData });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }
      const result: SoilReportData = await response.json();
      generateInsightsFromData(result);
    } catch (error: any) {
      console.error("Analysis Error:", error);
      setApiError(error.message);
      setFlowStep("upload");
    }
  };

  const handleManualSubmit = () => {
    generateInsightsFromData(manualFormData);
  };

  const generateFertilizerPlan = () => {
    const plan: FertilizerRecommendation[] = [];
    const nutrientMap: { [key: string]: string } = {
      'Nitrogen (N)': 'Urea or DAP', 'Phosphorus (P)': 'DAP or Single Super Phosphate', 'Potassium (K)': 'Muriate of Potash (MOP)',
      'Sulphur (S)': 'Bensulf or Gypsum', 'Zinc (Zn)': 'Zinc Sulphate', 'Boron (B)': 'Borax Decahydrate'
    };
    
    generatedInsights.forEach(insight => {
      if (insight.level === "Low" || insight.level === "Very Low") {
        const productName = nutrientMap[insight.title];
        if (productName) {
          plan.push({
            nutrient: insight.title,
            productName,
            reason: `Your soil is deficient in ${insight.title}, which is crucial for ${insight.description.toLowerCase()}`,
            icon: insight.icon,
            links: [
              { name: "IFFCO BAZAR", url: `https://www.iffcobazar.in/en/search?q=${encodeURIComponent(productName)}`},
              { name: "AgriBegri", url: `https://www.agribegri.com/search?q=${encodeURIComponent(productName)}`},
            ]
          });
        }
      }
    });

    setFertilizerPlan(plan);
    setFlowStep('recommendations');
  };

  const InsightCard: FC<{ insight: Insight }> = ({ insight }) => {
    const colorVariants = {
      red: "border-red-200 bg-red-50/50 text-red-800",
      green: "border-green-200 bg-green-50/50 text-green-800",
      yellow: "border-yellow-200 bg-yellow-50/50 text-yellow-800",
      blue: "border-blue-200 bg-blue-50/50 text-blue-800",
    };
    const badgeVariants = {
      red: "bg-red-100 text-red-800",
      green: "bg-green-100 text-green-800",
      yellow: "bg-yellow-100 text-yellow-800",
      blue: "bg-blue-100 text-blue-800",
    };

    return (
      <div className={cn("rounded-xl border p-5 flex flex-col justify-between transition-all hover:shadow-lg hover:scale-[1.02]", colorVariants[insight.color])}>
        <div>
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-full border shadow-sm">
                {insight.icon}
              </div>
              <p className="font-semibold text-md text-gray-800">{insight.title}</p>
            </div>
            <Badge className={cn("font-medium text-xs", badgeVariants[insight.color])}>{insight.level}</Badge>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-2">{insight.value}</p>
        </div>
        <p className="text-xs text-gray-600 mt-auto">{insight.description}</p>
      </div>
    );
  };

  const InsightSection: FC<{ title: string; insights: Insight[] }> = ({ title, insights }) => (
    <div>
      <h2 className="text-2xl font-bold text-gray-700 mb-5 border-b-2 border-green-200 pb-3">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insights.map(insight => (
          <InsightCard key={insight.title} insight={insight} />
        ))}
      </div>
    </div>
  );
  
  const renderContent = () => {
    switch (flowStep) {
      case "initial":
        return (
          <Card className="max-w-2xl mx-auto text-center animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">Start Your Soil Analysis</CardTitle>
              <CardDescription>Do you have a soil health card?</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
              <Button size="lg" className="py-8 text-md" onClick={() => setFlowStep('upload')}>
                <Upload className="mr-2 h-5 w-5" /> Yes, Upload Card
              </Button>
              <Button size="lg" variant="outline" className="py-8 text-md" onClick={() => setFlowStep('manualEntry')}>
                <ClipboardPenLine className="mr-2 h-5 w-5" /> No, Enter Manually
              </Button>
            </CardContent>
          </Card>
        );

      case "upload":
        return (
          <Card className="max-w-2xl mx-auto animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="text-primary"/> Upload Soil Health Card
              </CardTitle>
              <CardDescription>Select or drag your soil report image to begin.</CardDescription>
            </CardHeader>
            <CardContent>
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg hover:border-primary transition-colors text-gray-500">
                  {soilCardPreview ? 
                    <Image src={soilCardPreview} alt="Preview" width={400} height={250} className="rounded-lg object-contain max-h-[250px]"/> : 
                    <div className="text-center">
                      <FileImage className="mx-auto h-12 w-12" />
                      <p className="mt-2 font-semibold text-primary">Click to select image</p>
                      <p className="text-xs">PNG, JPG, or WEBP</p>
                    </div>
                  }
                </div>
              </label>
              <Input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
              {apiError && <div className="flex items-center gap-2 p-3 mt-4 text-sm text-red-800 bg-red-50 rounded-lg"><XCircle className="h-4 w-4"/><p><strong>Error:</strong> {apiError}</p></div>}
              <Button onClick={handleAnalyzeSoilCard} disabled={!soilCardImage} className="w-full text-lg py-6 mt-4">
                <Sprout className="mr-2 h-5 w-5" /> Analyze with AI
              </Button>
            </CardContent>
          </Card>
        );

      case "manualEntry":
        return (
          <Card className="max-w-4xl mx-auto animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl"><ClipboardPenLine className="text-primary"/> Enter Soil Parameters Manually</CardTitle>
              <CardDescription>Provide the values from your soil test report.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2 text-lg">Core Properties</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5"><Label htmlFor="ph">Soil pH</Label><Input id="ph" type="number" step="0.1" value={manualFormData.ph} onChange={handleManualFormChange}/></div>
                  <div className="space-y-1.5"><Label htmlFor="ec">EC (mS/cm)</Label><Input id="ec" type="number" step="0.01" value={manualFormData.ec} onChange={handleManualFormChange}/></div>
                  <div className="space-y-1.5"><Label htmlFor="oc">Organic Carbon (%)</Label><Input id="oc" type="number" step="0.01" value={manualFormData.oc} onChange={handleManualFormChange}/></div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2 text-lg">Primary Nutrients (NPK)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5"><Label htmlFor="n">Nitrogen (kg/ha)</Label><Input id="n" type="number" value={manualFormData.n} onChange={handleManualFormChange}/></div>
                  <div className="space-y-1.5"><Label htmlFor="p">Phosphorus (kg/ha)</Label><Input id="p" type="number" value={manualFormData.p} onChange={handleManualFormChange}/></div>
                  <div className="space-y-1.5"><Label htmlFor="k">Potassium (kg/ha)</Label><Input id="k" type="number" value={manualFormData.k} onChange={handleManualFormChange}/></div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2 text-lg">Secondary Nutrients</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5"><Label htmlFor="s">Sulphur (ppm)</Label><Input id="s" type="number" value={manualFormData.s} onChange={handleManualFormChange}/></div>
                  <div className="space-y-1.5"><Label htmlFor="ca">Calcium (%)</Label><Input id="ca" type="number" step="0.01" value={manualFormData.ca} onChange={handleManualFormChange}/></div>
                  <div className="space-y-1.5"><Label htmlFor="mg">Magnesium (%)</Label><Input id="mg" type="number" step="0.01" value={manualFormData.mg} onChange={handleManualFormChange}/></div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2 text-lg">Micronutrients (ppm)</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="space-y-1.5"><Label htmlFor="fe">Iron</Label><Input id="fe" type="number" step="0.1" value={manualFormData.fe} onChange={handleManualFormChange}/></div>
                  <div className="space-y-1.5"><Label htmlFor="mn">Manganese</Label><Input id="mn" type="number" step="0.1" value={manualFormData.mn} onChange={handleManualFormChange}/></div>
                  <div className="space-y-1.5"><Label htmlFor="zn">Zinc</Label><Input id="zn" type="number" step="0.1" value={manualFormData.zn} onChange={handleManualFormChange}/></div>
                  <div className="space-y-1.5"><Label htmlFor="cu">Copper</Label><Input id="cu" type="number" step="0.1" value={manualFormData.cu} onChange={handleManualFormChange}/></div>
                  <div className="space-y-1.5"><Label htmlFor="b">Boron</Label><Input id="b" type="number" step="0.1" value={manualFormData.b} onChange={handleManualFormChange}/></div>
                </div>
              </div>
              <Button onClick={handleManualSubmit} className="w-full text-lg py-6">
                <Sprout className="mr-2 h-5 w-5" /> Generate Insights
              </Button>
            </CardContent>
          </Card>
        );
        
      case "analyzing":
        return (
          <div className="flex flex-col items-center justify-center text-center p-10 animate-fade-in">
            <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800">Analyzing Soil Card...</h2>
            <p className="text-gray-600 mt-2">Our AI is extracting key parameters from your report.</p>
          </div>
        );

      case "insights":
        return (
          <>
            <div ref={reportRef} className="space-y-10 animate-fade-in bg-slate-50 p-4 sm:p-8 rounded-lg">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800">Your Soil Health Report</h1>
                <p className="text-lg text-gray-600 mt-2">A detailed breakdown of your soil's condition based on the provided data.</p>
              </div>
              
              <InsightSection title="Core Properties" insights={generatedInsights.slice(0, 3)} />
              <InsightSection title="Primary Nutrients (NPK)" insights={generatedInsights.slice(3, 6)} />
              <InsightSection title="Secondary Nutrients" insights={generatedInsights.slice(6, 9)} />
              <InsightSection title="Micronutrients" insights={generatedInsights.slice(9)} />
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
              <Button size="lg" className="w-full md:w-auto text-lg py-7" onClick={generateFertilizerPlan}>
                <Sprout className="mr-2 h-5 w-5"/> Fertilizer Guidance
              </Button>
              <Button size="lg" variant="outline" className="w-full md:w-auto text-lg py-7" onClick={handleDownload} disabled={isDownloading}>
                {isDownloading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Download className="mr-2 h-5 w-5"/>}
                {isDownloading ? "Downloading..." : "Download Report"}
              </Button>
              <Button size="lg" variant="secondary" className="w-full md:w-auto text-lg py-7" onClick={() => setFlowStep('initial')}>
                Start Over
              </Button>
            </div>
          </>
        );
      
      case "recommendations":
        return (
          <div className="animate-fade-in">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-gray-800">Fertilizer Guidance</h1>
              <p className="text-lg text-gray-600 mt-2">Based on your soil report, here are the recommended fertilizers.</p>
            </div>

            {fertilizerPlan.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fertilizerPlan.map(item => (
                  <Card key={item.nutrient} className="flex flex-col">
                    <CardHeader className="flex-row items-center gap-4">
                      <div className="bg-green-100 p-3 rounded-full">{item.icon}</div>
                      <div>
                        <CardTitle>{item.productName}</CardTitle>
                        <CardDescription>To correct {item.nutrient}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-gray-700">{item.reason}.</p>
                    </CardContent>
                    <div className="p-4 border-t">
                      <h4 className="font-semibold text-sm mb-3 flex items-center gap-2"><ShoppingCart className="h-4 w-4 text-primary"/> Buying Links</h4>
                      <div className="flex flex-col gap-2">
                        {item.links.map(link => (
                          <a href={link.url} target="_blank" rel="noopener noreferrer" key={link.name}>
                            <Button variant="outline" className="w-full justify-between">
                              {link.name} <ExternalLink className="h-4 w-4 text-gray-500" />
                            </Button>
                          </a>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-green-50 rounded-lg">
                <h3 className="text-2xl font-semibold text-green-800">Excellent Soil Health!</h3>
                <p className="text-gray-600 mt-2">No specific nutrient deficiencies were found. Standard crop nutrition is recommended.</p>
              </div>
            )}
            
            <div className="text-center mt-10">
              <Button onClick={() => setFlowStep('insights')} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Insights
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-green-50/30">
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sprout className="h-7 w-7 text-primary" />
            <h1 className="text-xl font-bold text-gray-800">Crop Advisory Dashboard</h1>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />Back to Home
            </Button>
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-10">
        {renderContent()}
      </main>
    </div>
  )
}