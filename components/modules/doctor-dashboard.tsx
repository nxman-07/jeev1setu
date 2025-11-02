"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface DoctorDashboardProps {
  user: any
  onLogout: () => void
}

export function DoctorDashboard({ user, onLogout }: DoctorDashboardProps) {
  const [activeTab, setActiveTab] = useState<"patients" | "schedule" | "records">("patients")
  const [searchHealthId, setSearchHealthId] = useState("")

  const mockPatients = [
    {
      healthId: "JEEV12345ABC",
      name: "Rajesh Kumar",
      condition: "Hypertension",
      status: "stable",
      nextVisit: "2024-11-10",
    },
    {
      healthId: "JEEVXYZ789DEF",
      name: "Priya Patel",
      condition: "Diabetes",
      status: "monitoring",
      nextVisit: "2024-11-15",
    },
    { healthId: "JEEV456DEF789", name: "Amit Kumar", condition: "Asthma", status: "stable", nextVisit: "2024-11-20" },
  ]

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
                ? "bg-gradient-to-r from-blue-500 to-green-500 text-primary-foreground"
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
              <CardTitle>Search Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Enter Health ID (e.g., JEEV12345ABC)"
                value={searchHealthId}
                onChange={(e) => setSearchHealthId(e.target.value.toUpperCase())}
                className="bg-input border-border"
              />
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {mockPatients.map((patient) => (
              <Card key={patient.healthId} className="bg-card/50 border-border">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-lg">{patient.name}</h4>
                        <Badge variant={patient.status === "stable" ? "default" : "secondary"} className="rounded-full">
                          {patient.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Health ID</p>
                          <p className="font-medium font-mono">{patient.healthId}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Condition</p>
                          <p className="font-medium">{patient.condition}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Next Visit</p>
                          <p className="font-medium">{patient.nextVisit}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="rounded-full border-border bg-transparent">
                        View Record
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-full border-border bg-transparent">
                        Update
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
