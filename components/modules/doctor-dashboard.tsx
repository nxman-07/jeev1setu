"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { apiClient } from "@/lib/api-client"

interface DoctorDashboardProps {
  user: any
  onLogout: () => void
}

export function DoctorDashboard({ user, onLogout }: DoctorDashboardProps) {
  const [activeTab, setActiveTab] = useState<"patients" | "schedule" | "records">("patients")
  const [searchHealthId, setSearchHealthId] = useState("")
  const [searchedPatient, setSearchedPatient] = useState<any>(null)
  const [searchError, setSearchError] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearchPatient = async () => {
    if (!searchHealthId.trim()) {
      setSearchError("Please enter a Health ID")
      return
    }

    setIsSearching(true)
    setSearchError("")
    console.log("[v0] Doctor searching for patient:", searchHealthId)

    try {
      const result = await apiClient.searchPatient(searchHealthId)
      console.log("[v0] Search response:", result)

      if (result.success && result.patient) {
        setSearchedPatient(result.patient)
        setSearchError("")
      } else {
        setSearchedPatient(null)
        setSearchError(result.message || "Patient not found")
      }
    } catch (err) {
      console.error("[v0] Search error:", err)
      setSearchError("Failed to search patient. Please try again.")
      setSearchedPatient(null)
    } finally {
      setIsSearching(false)
    }
  }

  const mockSchedule = [
    { time: "09:00 AM", patient: "Rajesh Kumar", type: "Consultation", room: "A-101" },
    { time: "10:30 AM", patient: "Priya Patel", type: "Follow-up", room: "A-102" },
    { time: "02:00 PM", patient: "Amit Kumar", type: "Review", room: "A-101" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">{user.role === "doctor" ? "Doctor" : "Hospital"} Portal</h2>
          <p className="text-muted-foreground">Welcome, {user.email}</p>
        </div>
        <Button onClick={onLogout} variant="outline" className="rounded-full border-border bg-transparent">
          Logout
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 bg-secondary/40 p-1 rounded-full">
        {["patients", "schedule", "records"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 py-2 px-4 rounded-full font-medium transition-all text-sm ${
              activeTab === tab
                ? "bg-gradient-to-r from-white to-red-500 text-black"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 border-blue-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">Total Patients</p>
              <p className="text-4xl font-bold text-blue-400">124</p>
              <p className="text-xs text-blue-300 mt-1">Active cases</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/30 to-green-800/30 border-green-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">Today Appointments</p>
              <p className="text-4xl font-bold text-green-400">3</p>
              <p className="text-xs text-green-300 mt-1">Scheduled</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 border-purple-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">Pending Records</p>
              <p className="text-4xl font-bold text-purple-400">12</p>
              <p className="text-xs text-purple-300 mt-1">To review</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/30 to-orange-800/30 border-orange-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">Avg. Consultation Time</p>
              <p className="text-4xl font-bold text-orange-400">18</p>
              <p className="text-xs text-orange-300 mt-1">minutes</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patients Tab */}
      {activeTab === "patients" && (
        <div className="space-y-6">
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle>Search Patients by Health ID</CardTitle>
              <CardDescription>
                Enter patient's unique Health ID to access their complete medical history
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter Health ID (e.g., JEEVXYZ123ABC)"
                  value={searchHealthId}
                  onChange={(e) => setSearchHealthId(e.target.value.toUpperCase())}
                  onKeyPress={(e) => e.key === "Enter" && handleSearchPatient()}
                  className="bg-input border-border flex-1"
                />
                <Button
                  onClick={handleSearchPatient}
                  disabled={isSearching || !searchHealthId.trim()}
                  className="btn-gradient btn-rounded text-white px-6 font-semibold"
                >
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </div>

              {searchError && (
                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                  {searchError}
                </div>
              )}
            </CardContent>
          </Card>

          {searchedPatient && (
            <div className="space-y-4">
              <Card className="bg-card/50 border-border">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">{searchedPatient.fullName || "Patient"}</CardTitle>
                      <CardDescription>Health ID: {searchedPatient.healthId}</CardDescription>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/50 rounded-full">Active</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 bg-secondary/30 rounded-lg border border-border">
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-mono text-sm">{searchedPatient.email}</p>
                    </div>
                    <div className="p-3 bg-secondary/30 rounded-lg border border-border">
                      <p className="text-xs text-muted-foreground">Patient Type</p>
                      <p className="font-medium text-sm capitalize">{searchedPatient.type}</p>
                    </div>
                    <div className="p-3 bg-secondary/30 rounded-lg border border-border">
                      <p className="text-xs text-muted-foreground">Member Since</p>
                      <p className="text-sm">{new Date(searchedPatient.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="p-3 bg-secondary/30 rounded-lg border border-border">
                      <p className="text-xs text-muted-foreground">Total Records</p>
                      <p className="text-2xl font-bold">{searchedPatient.medicalRecords?.length || 0}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h4 className="font-semibold mb-3">Medical Records</h4>
                    {searchedPatient.medicalRecords && searchedPatient.medicalRecords.length > 0 ? (
                      <div className="space-y-2">
                        {searchedPatient.medicalRecords.map((record: any, idx: number) => (
                          <div key={idx} className="p-3 bg-secondary/20 rounded-lg border border-border text-sm">
                            <p className="font-medium">{record.diagnosis}</p>
                            <p className="text-xs text-muted-foreground">{record.date}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No medical records found</p>
                    )}
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button className="btn-gradient btn-rounded text-white flex-1 font-semibold">Add New Record</Button>
                    <Button variant="outline" className="rounded-full border-border bg-transparent">
                      View History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* Schedule Tab */}
      {activeTab === "schedule" && (
        <div className="space-y-6">
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Your appointments for today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockSchedule.map((slot, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg border border-border"
                >
                  <div className="flex-1">
                    <p className="font-semibold">{slot.time}</p>
                    <p className="text-sm text-muted-foreground">{slot.patient}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="rounded-full mb-1 block">
                      {slot.type}
                    </Badge>
                    <p className="text-sm text-muted-foreground">Room {slot.room}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Records Tab */}
      {activeTab === "records" && (
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle>Patient Records</CardTitle>
            <CardDescription>Add new records or view existing patient data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Button variant="outline" className="rounded-full border-border py-6 bg-transparent">
                Add New Record
              </Button>
              <Button variant="outline" className="rounded-full border-border py-6 bg-transparent">
                View All Records
              </Button>
            </div>
            <p className="text-muted-foreground text-sm">FHIR-compliant records management</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
