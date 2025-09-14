"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabaseClient" // Corrected import path
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Save, Home, AlertCircle, ArrowLeft, Leaf, Loader2 } from "lucide-react"

// Define the structure for the profile form data
type ProfileFormData = {
  fullName: string;
  phoneNumber: string;
  aadharNumber: string; 
  village: string;
  district: string;
  state: string;
  farmSize: string | number;
  soilType: string;
  irrigationType: string;
  mainCrops: string;
}

// Initial state for the blank form
const initialProfileState: ProfileFormData = {
  fullName: '',
  phoneNumber: '',
  aadharNumber: '',
  village: '',
  district: '',
  state: '',
  farmSize: '',
  soilType: '',
  irrigationType: '',
  mainCrops: '',
};

export default function CreateProfilePage() {
  const [profile, setProfile] = useState<ProfileFormData>(initialProfileState);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generic handler to update any field in the profile state
  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateProfile = async () => {
    setStatusMessage(null);
    setIsSubmitting(true);

    // 1. Insert data into the 'personal_info' table
    const { data: personalData, error: personalError } = await supabase
      .from("personal_info")
      .insert({
        full_name: profile.fullName,
        phone_number: profile.phoneNumber,
        aadhar_number: profile.aadharNumber, 
        village: profile.village,
        district: profile.district,
        state: profile.state,
      })
      .select('id') // Important: select the ID of the new row
      .single();

    if (personalError) {
      console.error("Error creating personal info:", personalError.message);
      setStatusMessage({ type: 'error', text: `Failed to save personal details: ${personalError.message}` });
      setIsSubmitting(false);
      return;
    }

    // 2. Use the new ID to insert data into the 'farm_details' table
    const newFarmerId = personalData.id;
    const { error: farmError } = await supabase
      .from("farm_details")
      .insert({
        personal_info_id: newFarmerId, // Link to the personal_info record
        farm_size_acres: profile.farmSize,
        soil_type: profile.soilType,
        irrigation_type: profile.irrigationType,
        main_crops: profile.mainCrops,
      });

    setIsSubmitting(false);
    if (farmError) {
      console.error("Error creating farm details:", farmError.message);
      setStatusMessage({ type: 'error', text: `Failed to save farm details: ${farmError.message}` });
    } else {
      console.log("Profile created successfully!");
      setStatusMessage({ type: 'success', text: 'New farmer profile has been created successfully!' });
      setProfile(initialProfileState); // Reset form after successful submission
    }
  }

  return (
    <div className="min-h-screen bg-green-50">
      <header className="sticky top-0 z-10 border-b border-green-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Leaf className="h-7 w-7 text-green-600" />
            <h1 className="text-xl font-bold text-green-900">Create New Farmer Profile</h1>
          </div>
          <a href="/">
            <Button variant="outline" size="sm" className="text-green-700 border-green-300 hover:bg-green-100 hover:text-green-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </a>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-10">
        {/* Status Message Display */}
        {statusMessage && (
          <div className={`mb-6 flex items-center gap-3 rounded-lg p-4 text-sm ${statusMessage.type === 'error' ? 'bg-red-100 text-red-900' : 'bg-green-100 text-green-900'}`}>
            <AlertCircle className="h-5 w-5" />
            <p>{statusMessage.text}</p>
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); handleCreateProfile(); }} className="space-y-8">
          {/* Personal Information Card */}
          <Card className="shadow-sm">
            <CardHeader className="border-b bg-white">
              <div className="flex items-center gap-3">
                <User className="h-6 w-6 text-green-600" />
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Enter the personal details for the new farmer.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" value={profile.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} required className="mt-1 border border-gray-300 focus-visible:ring-green-500" />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input id="phoneNumber" type="tel" value={profile.phoneNumber} onChange={(e) => handleInputChange('phoneNumber', e.target.value)} required className="mt-1 border border-gray-300 focus-visible:ring-green-500" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="aadharNumber">Aadhar Number</Label>
                  <Input id="aadharNumber" value={profile.aadharNumber} onChange={(e) => handleInputChange('aadharNumber', e.target.value)} placeholder="XXXX XXXX XXXX" required className="mt-1 border border-gray-300 focus-visible:ring-green-500" />
                </div>
                <div>
                  <Label htmlFor="village">Village</Label>
                  <Input id="village" value={profile.village} onChange={(e) => handleInputChange('village', e.target.value)} className="mt-1 border border-gray-300 focus-visible:ring-green-500" />
                </div>
                <div>
                  <Label htmlFor="district">District</Label>
                  <Input id="district" value={profile.district} onChange={(e) => handleInputChange('district', e.target.value)} className="mt-1 border border-gray-300 focus-visible:ring-green-500" />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" value={profile.state} onChange={(e) => handleInputChange('state', e.target.value)} className="mt-1 border border-gray-300 focus-visible:ring-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Farm Details Card */}
          <Card className="shadow-sm">
            <CardHeader className="border-b bg-white">
              <div className="flex items-center gap-3">
                <Home className="h-6 w-6 text-green-600" />
                <div>
                  <CardTitle>Farm Details</CardTitle>
                  <CardDescription>Enter the farmer's farm information.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="farmSize">Farm Size (acres)</Label>
                  <Input id="farmSize" type="number" value={profile.farmSize} onChange={(e) => handleInputChange('farmSize', e.target.value)} className="mt-1 border border-gray-300 focus-visible:ring-green-500" />
                </div>
                <div>
                  <Label htmlFor="soilType">Soil Type</Label>
                  <Input id="soilType" value={profile.soilType} onChange={(e) => handleInputChange('soilType', e.target.value)} className="mt-1 border border-gray-300 focus-visible:ring-green-500" />
                </div>
                <div>
                  <Label htmlFor="irrigationType">Irrigation Type</Label>
                  <Input id="irrigationType" value={profile.irrigationType} onChange={(e) => handleInputChange('irrigationType', e.target.value)} className="mt-1 border border-gray-300 focus-visible:ring-green-500" />
                </div>
                <div>
                  <Label htmlFor="mainCrops">Main Crops</Label>
                  <Input id="mainCrops" value={profile.mainCrops} onChange={(e) => handleInputChange('mainCrops', e.target.value)} className="mt-1 border border-gray-300 focus-visible:ring-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="ghost" className="text-green-700" onClick={() => { setProfile(initialProfileState); setStatusMessage(null); }}>
              Reset Form
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-green-600 text-white hover:bg-green-700">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Create Profile
                </>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}

