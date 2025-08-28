"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Sprout, Clock, ArrowLeft, Edit, Save, Home } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/translations"

export default function ProfilePage() {
  const { language } = useLanguage()
  const t = useTranslation(language)

  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    fullName: "राम कुमार",
    phoneNumber: "+91 98765 43210",
    village: "सुंदरपुर",
    district: "मेरठ",
    state: "उत्तर प्रदेश",
    farmSize: "2.5",
    soilType: "दोमट मिट्टी",
    irrigationType: "ट्यूबवेल",
    mainCrops: "गेहूं, धान, गन्ना",
  })

  const [activities] = useState([
    {
      id: 1,
      type: "crop_query",
      description: "गेहूं",
      date: "2024-01-15",
      time: "10:30 AM",
    },
    {
      id: 2,
      type: "weather_check",
      description: "मेरठ",
      date: "2024-01-14",
      time: "08:15 AM",
    },
    {
      id: 3,
      type: "market_check",
      description: "धान",
      date: "2024-01-13",
      time: "02:45 PM",
    },
    {
      id: 4,
      type: "crop_query",
      description: "गन्ना",
      date: "2024-01-12",
      time: "11:20 AM",
    },
  ])

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to a database
    console.log("[v0] Profile saved:", profile)
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "crop_query":
        return <Sprout className="h-4 w-4 text-primary" />
      case "weather_check":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "market_check":
        return <Badge className="h-4 w-4 text-green-500" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getActivityText = (type: string) => {
    switch (type) {
      case "crop_query":
        return t.queriedCrop
      case "weather_check":
        return t.checkedWeather
      case "market_check":
        return t.checkedMarket
      default:
        return "Activity"
    }
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
                {t.appName}
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <User className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-gray-900">{t.farmerProfile}</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="md:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    {t.personalInfo}
                  </CardTitle>
                  <CardDescription>{t.personalInfo}</CardDescription>
                </div>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  size="sm"
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {t.saveProfile}
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      {t.editProfile}
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">{t.fullName}</Label>
                    <Input
                      id="fullName"
                      value={profile.fullName}
                      onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">{t.phoneNumber}</Label>
                    <Input
                      id="phoneNumber"
                      value={profile.phoneNumber}
                      onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="village">{t.village}</Label>
                    <Input
                      id="village"
                      value={profile.village}
                      onChange={(e) => setProfile({ ...profile, village: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="district">{t.district}</Label>
                    <Input
                      id="district"
                      value={profile.district}
                      onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="state">{t.state}</Label>
                    <Input
                      id="state"
                      value={profile.state}
                      onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Farm Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  {t.farmDetails}
                </CardTitle>
                <CardDescription>{t.farmDetails}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="farmSize">{t.farmSize}</Label>
                    <Input
                      id="farmSize"
                      value={profile.farmSize}
                      onChange={(e) => setProfile({ ...profile, farmSize: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="soilType">{t.soilType}</Label>
                    <Input
                      id="soilType"
                      value={profile.soilType}
                      onChange={(e) => setProfile({ ...profile, soilType: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="irrigationType">{t.irrigationType}</Label>
                    <Input
                      id="irrigationType"
                      value={profile.irrigationType}
                      onChange={(e) => setProfile({ ...profile, irrigationType: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mainCrops">{t.mainCrops}</Label>
                    <Input
                      id="mainCrops"
                      value={profile.mainCrops}
                      onChange={(e) => setProfile({ ...profile, mainCrops: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity History */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {t.activityHistory}
                </CardTitle>
                <CardDescription>{t.recentActivities}</CardDescription>
              </CardHeader>
              <CardContent>
                {activities.length > 0 ? (
                  <div className="space-y-4">
                    {activities.map((activity, index) => (
                      <div key={activity.id}>
                        <div className="flex items-start gap-3">
                          <div className="mt-1">{getActivityIcon(activity.type)}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">
                              {getActivityText(activity.type)} {activity.description}
                            </p>
                            <p className="text-xs text-gray-500">
                              {activity.date} • {activity.time}
                            </p>
                          </div>
                        </div>
                        {index < activities.length - 1 && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-8">{t.noHistory}</p>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{t.cropQueries}</span>
                  <Badge variant="secondary">2</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{t.weatherChecks}</span>
                  <Badge variant="secondary">1</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{t.marketPriceChecks}</span>
                  <Badge variant="secondary">1</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
