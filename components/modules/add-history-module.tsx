"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { apiClient } from "@/lib/api-client"

interface AddHistoryModuleProps {
  user: any
  onRecordAdd?: (record: any) => void
}

export function AddHistoryModule({ user, onRecordAdd }: AddHistoryModuleProps) {
  const [activeTab, setActiveTab] = useState<"consultation" | "lab" | "prescription">("consultation")
  const [isSaving, setIsSaving] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [formData, setFormData] = useState({
    healthId: "",
    treatmentType: "consultation",
    diagnosis: "",
    prescription: "",
    notes: "",
    hospitalName: "",
    doctorName: "",
    doctorPhone: "",
    date: new Date().toISOString().split("T")[0],
    symptoms: "",
    vitals: "",
    labTests: "",
    followUp: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (!formData.healthId || !formData.diagnosis || !formData.hospitalName || !formData.doctorName) {
      setSubmitError("Please fill in all required fields")
      return
    }

    setIsSaving(true)
    setSubmitError("")
    console.log("[v0] Saving record to cloud for user:", user.email)

    try {
      const recordData = {
        ...formData,
        treatment: activeTab === "consultation" ? "Consultation" : activeTab === "lab" ? "Lab Test" : "Prescription",
        status: "completed",
        id: `R${Date.now()}`,
      }

      const result = await apiClient.addRecord(user.email, recordData)
      console.log("[v0] Record save response:", result)

      if (result.success) {
        setSubmitted(true)
        if (onRecordAdd) {
          onRecordAdd(recordData)
        }

        setTimeout(() => {
          setSubmitted(false)
          setFormData({
            healthId: "",
            treatmentType: "consultation",
            diagnosis: "",
            prescription: "",
            notes: "",
            hospitalName: "",
            doctorName: "",
            doctorPhone: "",
            date: new Date().toISOString().split("T")[0],
            symptoms: "",
            vitals: "",
            labTests: "",
            followUp: "",
          })
        }, 3000)
      } else {
        setSubmitError(result.message || "Failed to save record")
      }
    } catch (err) {
      console.error("[v0] Error saving record:", err)
      setSubmitError("Failed to sync to cloud. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleClear = () => {
    setFormData({
      healthId: "",
      treatmentType: "consultation",
      diagnosis: "",
      prescription: "",
      notes: "",
      hospitalName: "",
      doctorName: "",
      doctorPhone: "",
      date: new Date().toISOString().split("T")[0],
      symptoms: "",
      vitals: "",
      labTests: "",
      followUp: "",
    })
    setSubmitError("")
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle>Add New Medical Record</CardTitle>
          <CardDescription>Auto-sync updates to cloud database (Version Controlled - FHIR Compliant)</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="consultation">Consultation</TabsTrigger>
              <TabsTrigger value="lab">Lab Test</TabsTrigger>
              <TabsTrigger value="prescription">Prescription</TabsTrigger>
            </TabsList>

            {/* Consultation Tab */}
            <TabsContent value="consultation" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="health-id">Patient Health ID</Label>
                    <Input
                      id="health-id"
                      name="healthId"
                      placeholder="JEEV12345ABC"
                      value={formData.healthId}
                      onChange={handleInputChange}
                      className="bg-input border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hospital">Hospital Name</Label>
                    <Input
                      id="hospital"
                      name="hospitalName"
                      placeholder="City Medical Center"
                      value={formData.hospitalName}
                      onChange={handleInputChange}
                      className="bg-input border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Date of Consultation</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="bg-input border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vitals">Vitals (BP, Temp, HR)</Label>
                    <Input
                      id="vitals"
                      name="vitals"
                      placeholder="120/80, 98.6°F, 72 bpm"
                      value={formData.vitals}
                      onChange={handleInputChange}
                      className="bg-input border-border"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="doctor">Doctor Name</Label>
                    <Input
                      id="doctor"
                      name="doctorName"
                      placeholder="Dr. Priya Sharma"
                      value={formData.doctorName}
                      onChange={handleInputChange}
                      className="bg-input border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Doctor Contact (Optional)</Label>
                    <Input
                      id="phone"
                      name="doctorPhone"
                      placeholder="+91 9876543210"
                      value={formData.doctorPhone}
                      onChange={handleInputChange}
                      className="bg-input border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="diagnosis">Diagnosis</Label>
                    <Input
                      id="diagnosis"
                      name="diagnosis"
                      placeholder="Patient diagnosis"
                      value={formData.diagnosis}
                      onChange={handleInputChange}
                      className="bg-input border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="symptoms">Symptoms</Label>
                    <Input
                      id="symptoms"
                      name="symptoms"
                      placeholder="Chief complaints and symptoms"
                      value={formData.symptoms}
                      onChange={handleInputChange}
                      className="bg-input border-border"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="notes">Clinical Notes</Label>
                  <textarea
                    id="notes"
                    name="notes"
                    placeholder="Detailed clinical observations and recommendations..."
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm"
                    rows={4}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Lab Test Tab */}
            <TabsContent value="lab" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="health-id-lab">Patient Health ID</Label>
                    <Input
                      id="health-id-lab"
                      name="healthId"
                      placeholder="JEEV12345ABC"
                      value={formData.healthId}
                      onChange={handleInputChange}
                      className="bg-input border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hospital-lab">Hospital Name</Label>
                    <Input
                      id="hospital-lab"
                      name="hospitalName"
                      placeholder="Laboratory Name"
                      value={formData.hospitalName}
                      onChange={handleInputChange}
                      className="bg-input border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date-lab">Test Date</Label>
                    <Input
                      id="date-lab"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="bg-input border-border"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="doctor-lab">Ordering Doctor</Label>
                    <Input
                      id="doctor-lab"
                      name="doctorName"
                      placeholder="Dr. Name"
                      value={formData.doctorName}
                      onChange={handleInputChange}
                      className="bg-input border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lab-tests">Lab Tests Performed</Label>
                    <Input
                      id="lab-tests"
                      name="labTests"
                      placeholder="e.g., CBC, Blood Sugar, Lipid Panel"
                      value={formData.labTests}
                      onChange={handleInputChange}
                      className="bg-input border-border"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="results">Test Results & Analysis</Label>
                  <textarea
                    id="results"
                    name="notes"
                    placeholder="Lab results, reference ranges, and clinical interpretation..."
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm"
                    rows={4}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Prescription Tab */}
            <TabsContent value="prescription" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="health-id-rx">Patient Health ID</Label>
                    <Input
                      id="health-id-rx"
                      name="healthId"
                      placeholder="JEEV12345ABC"
                      value={formData.healthId}
                      onChange={handleInputChange}
                      className="bg-input border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doctor-rx">Prescribing Doctor</Label>
                    <Input
                      id="doctor-rx"
                      name="doctorName"
                      placeholder="Dr. Name"
                      value={formData.doctorName}
                      onChange={handleInputChange}
                      className="bg-input border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date-rx">Prescription Date</Label>
                    <Input
                      id="date-rx"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="bg-input border-border"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="hospital-rx">Hospital/Clinic</Label>
                    <Input
                      id="hospital-rx"
                      name="hospitalName"
                      placeholder="Facility Name"
                      value={formData.hospitalName}
                      onChange={handleInputChange}
                      className="bg-input border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="follow-up">Follow-up Date</Label>
                    <Input
                      id="follow-up"
                      name="followUp"
                      type="date"
                      value={formData.followUp}
                      onChange={handleInputChange}
                      className="bg-input border-border"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="prescription-details">Medications & Instructions</Label>
                  <textarea
                    id="prescription-details"
                    name="prescription"
                    placeholder="List all medications with dosage, frequency, duration, and special instructions..."
                    value={formData.prescription}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm"
                    rows={4}
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="additional-notes">Additional Notes</Label>
                  <textarea
                    id="additional-notes"
                    name="notes"
                    placeholder="Any warnings, allergies, or special precautions..."
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm"
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Submission */}
          <div className="mt-6 space-y-3">
            {submitError && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {submitError}
              </div>
            )}
            <div className="flex gap-3">
              <Button
                onClick={handleSubmit}
                disabled={
                  isSaving ||
                  !formData.healthId ||
                  !formData.diagnosis ||
                  !formData.hospitalName ||
                  !formData.doctorName
                }
                className="btn-gradient btn-rounded text-white flex-1 font-semibold"
              >
                {isSaving ? "Syncing to Cloud..." : "Save & Sync to Cloud"}
              </Button>
              <Button variant="outline" className="rounded-full border-border bg-transparent" onClick={handleClear}>
                Clear Form
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success Message */}
      {submitted && (
        <Card className="bg-green-500/20 border-green-500/50">
          <CardContent className="py-4 flex items-center gap-3">
            <span className="text-2xl">✓</span>
            <div>
              <p className="font-semibold text-green-400">Record Saved Successfully</p>
              <p className="text-sm text-muted-foreground">Changes synced to cloud database with version control</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card/50 border-border">
          <CardContent className="pt-6 text-center">
            <p className="text-2xl mb-2">🔐</p>
            <p className="font-semibold text-sm">HTTPS Encrypted</p>
            <p className="text-xs text-muted-foreground">All data encrypted in transit</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border">
          <CardContent className="pt-6 text-center">
            <p className="text-2xl mb-2">📝</p>
            <p className="font-semibold text-sm">Version Controlled</p>
            <p className="text-xs text-muted-foreground">Track all record changes</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border">
          <CardContent className="pt-6 text-center">
            <p className="text-2xl mb-2">☁️</p>
            <p className="font-semibold text-sm">Cloud Backup</p>
            <p className="text-xs text-muted-foreground">Secure cloud storage</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
