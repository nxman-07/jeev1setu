"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PatientHistoryModuleProps {
  user: any
  patientRecords?: any[]
}

export function PatientHistoryModule({ user, patientRecords = [] }: PatientHistoryModuleProps) {
  const [healthId, setHealthId] = useState("")
  const [patientData, setPatientData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [selectedTreatment, setSelectedTreatment] = useState<any>(null)

  // Mock data - in production, this would call FHIR API
  const mockPatients: Record<string, any> = {
    JEEV12345ABC: {
      name: "Rajesh Kumar",
      age: 45,
      bloodType: "O+",
      gender: "Male",
      dateOfBirth: "1979-05-15",
      contact: "+91 9876543210",
      address: "123 Main St, Delhi",
      emergencyContact: "Priya Kumar (Sister) +91 9876543211",
      allergies: ["Penicillin", "Shellfish"],
      chronicConditions: ["Hypertension", "Type 2 Diabetes"],
      previousTreatments: [
        {
          id: "T001",
          date: "2024-10-15",
          treatment: "Blood Pressure Management",
          hospital: "City Medical Center",
          doctor: "Dr. Priya Sharma (9876543210)",
          diagnosis: "Hypertension Stage 2",
          prescription: "Lisinopril 10mg daily",
          notes: "Patient responding well to medication. Continue monitoring.",
          status: "completed",
        },
        {
          id: "T002",
          date: "2024-08-20",
          treatment: "Annual Checkup",
          hospital: "Health Plus Hospital",
          doctor: "Dr. Amit Singh (9123456789)",
          diagnosis: "General Health Assessment",
          prescription: "No medication required",
          notes: "Patient in stable condition. All vitals normal.",
          status: "completed",
        },
        {
          id: "T003",
          date: "2024-10-12",
          treatment: "Lab Test",
          hospital: "City Medical Center",
          doctor: "Dr. Priya Sharma",
          diagnosis: "Blood Test - Analysis",
          prescription: "Fasting required for next test",
          notes: "Glucose level slightly elevated. Recommended lifestyle changes.",
          status: "pending-review",
        },
      ],
      hospitalsVisited: ["City Medical Center", "Health Plus Hospital", "Apollo Hospital"],
      lastUpdated: "2024-10-15",
    },
    JEEVXYZ789DEF: {
      name: "Priya Patel",
      age: 28,
      bloodType: "B+",
      gender: "Female",
      dateOfBirth: "1996-03-22",
      contact: "+91 9988776655",
      address: "456 Oak Ave, Mumbai",
      emergencyContact: "Rajesh Patel (Father) +91 9988776656",
      allergies: ["Sulfa drugs"],
      chronicConditions: ["None"],
      previousTreatments: [
        {
          id: "T004",
          date: "2024-09-10",
          treatment: "Routine Checkup",
          hospital: "Metro Hospital",
          doctor: "Dr. Vikram Kapoor (9988776655)",
          diagnosis: "Pre-operative Assessment",
          prescription: "No medication",
          notes: "Patient cleared for scheduled surgery.",
          status: "completed",
        },
        {
          id: "T005",
          date: "2024-09-15",
          treatment: "Surgery",
          hospital: "Metro Hospital",
          doctor: "Dr. Vikram Kapoor",
          diagnosis: "Appendectomy",
          prescription: "Pain management + Antibiotics",
          notes: "Surgery successful. Post-operative monitoring ongoing.",
          status: "completed",
        },
      ],
      hospitalsVisited: ["Metro Hospital"],
      lastUpdated: "2024-09-15",
    },
  }

  const handleSearch = () => {
    setLoading(true)
    setTimeout(() => {
      setPatientData(mockPatients[healthId] || null)
      setSelectedTreatment(null)
      setLoading(false)
    }, 800)
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "pending-review":
        return "secondary"
      case "ongoing":
        return "destructive"
      default:
        return "outline"
    }
  }

  if (user.type === "patient") {
    // Patient viewing their own data
    return (
      <div className="space-y-6">
        {patientRecords.length > 0 ? (
          <>
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="bg-card/50 border-border">
                <CardContent className="pt-6 text-center">
                  <p className="text-3xl font-bold text-primary mb-1">{patientRecords.length}</p>
                  <p className="text-sm text-muted-foreground">Total Records</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border">
                <CardContent className="pt-6 text-center">
                  <p className="text-3xl font-bold text-accent mb-1">
                    {new Set(patientRecords.map((r) => r.hospital)).size}
                  </p>
                  <p className="text-sm text-muted-foreground">Hospitals Visited</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border">
                <CardContent className="pt-6 text-center">
                  <p className="text-3xl font-bold text-blue-500 mb-1">
                    {new Set(patientRecords.map((r) => r.diagnosis)).size}
                  </p>
                  <p className="text-sm text-muted-foreground">Unique Conditions</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border">
                <CardContent className="pt-6 text-center">
                  <p className="text-3xl font-bold text-green-500 mb-1">
                    {patientRecords.filter((r) => r.status === "completed").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Completed Visits</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="timeline" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="conditions">Conditions</TabsTrigger>
                <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
              </TabsList>

              <TabsContent value="timeline">
                <Card className="bg-card/50 border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">My Medical History</CardTitle>
                    <CardDescription>{patientRecords.length} records added by you</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {patientRecords.map((record: any, idx: number) => (
                        <div
                          key={idx}
                          className="border border-border rounded-lg p-4 bg-secondary/20 cursor-pointer hover:bg-secondary/30 transition-colors"
                          onClick={() => setSelectedTreatment(record)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-semibold text-base">{record.treatment || record.diagnosis}</p>
                              <p className="text-xs text-muted-foreground">{record.date}</p>
                            </div>
                            <div className="flex gap-2">
                              <Badge variant="outline" className="rounded-full text-xs">
                                {record.hospital}
                              </Badge>
                              <Badge variant={getStatusBadgeColor(record.status)} className="rounded-full text-xs">
                                {record.status === "pending-review" ? "Pending" : record.status || "Saved"}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-foreground">{record.diagnosis}</p>
                          <p className="text-xs text-muted-foreground mt-2">👨‍⚕️ {record.doctorName}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="conditions">
                <Card className="bg-card/50 border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Your Conditions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {new Set(patientRecords.map((r) => r.diagnosis)).size > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {Array.from(new Set(patientRecords.map((r) => r.diagnosis))).map((condition: any) => (
                          <Badge key={condition} variant="secondary" className="rounded-full">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No conditions recorded</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="hospitals">
                <Card className="bg-card/50 border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Hospitals You've Visited</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {new Set(patientRecords.map((r) => r.hospital)).size > 0 ? (
                      <ul className="space-y-2">
                        {Array.from(new Set(patientRecords.map((r) => r.hospital))).map((hospital: any) => (
                          <li key={hospital} className="flex items-center gap-2 text-sm">
                            <span className="text-accent">✓</span>
                            <span className="text-foreground">{hospital}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No hospital visits recorded</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {selectedTreatment && (
              <Card className="bg-card/50 border-border ring-2 ring-primary">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedTreatment.treatment || selectedTreatment.diagnosis} - Details</CardTitle>
                      <CardDescription>Record from {selectedTreatment.date}</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedTreatment(null)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      ✕
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Date</p>
                      <p className="font-medium">{selectedTreatment.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Hospital</p>
                      <p className="font-medium">{selectedTreatment.hospital}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Doctor</p>
                      <p className="font-medium">{selectedTreatment.doctorName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Contact</p>
                      <p className="font-medium">{selectedTreatment.doctorPhone || "N/A"}</p>
                    </div>
                  </div>
                  {selectedTreatment.diagnosis && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Diagnosis</p>
                      <div className="p-3 bg-secondary/30 rounded-lg border border-border">
                        <p className="text-sm">{selectedTreatment.diagnosis}</p>
                      </div>
                    </div>
                  )}
                  {selectedTreatment.prescription && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Prescription/Medications</p>
                      <div className="p-3 bg-secondary/30 rounded-lg border border-border">
                        <p className="text-sm">{selectedTreatment.prescription}</p>
                      </div>
                    </div>
                  )}
                  {selectedTreatment.notes && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Notes</p>
                      <div className="p-3 bg-secondary/30 rounded-lg border border-border">
                        <p className="text-sm">{selectedTreatment.notes}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <Card className="bg-card/50 border-border border-dashed">
            <CardContent className="py-12 text-center">
              <p className="text-2xl mb-2">📋</p>
              <p className="font-semibold text-lg mb-2">No Medical History</p>
              <p className="text-muted-foreground">
                Start by adding your first medical record to build your health profile
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  // Hospital staff viewing patient records with search
  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle>Search Patient Medical History</CardTitle>
          <CardDescription>Enter the patient's Health ID (FHIR API Gateway)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="e.g., JEEV12345ABC"
              value={healthId}
              onChange={(e) => setHealthId(e.target.value.toUpperCase())}
              className="bg-input border-border"
            />
            <Button
              onClick={handleSearch}
              disabled={!healthId || loading}
              className="btn-gradient btn-rounded text-white px-8"
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
          {healthId && <div className="text-xs text-muted-foreground">Tip: Try JEEV12345ABC or JEEVXYZ789DEF</div>}
        </CardContent>
      </Card>

      {/* Patient Data Display */}
      {patientData && (
        <div className="grid gap-6">
          {/* Basic Info Section */}
          <Card className="bg-card/50 border-border">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <CardTitle className="text-2xl">{patientData.name}</CardTitle>
                  <CardDescription>Health ID: {healthId}</CardDescription>
                </div>
                <Badge className="bg-accent text-accent-foreground rounded-full text-sm">{patientData.bloodType}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Age</p>
                  <p className="font-semibold">{patientData.age} years</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Date of Birth</p>
                  <p className="font-semibold">{patientData.dateOfBirth}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Gender</p>
                  <p className="font-semibold">{patientData.gender}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Last Updated</p>
                  <p className="font-semibold">{patientData.lastUpdated}</p>
                </div>
              </div>
              <div className="border-t border-border pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Contact</p>
                  <p className="text-sm font-medium">{patientData.contact}</p>
                  <p className="text-xs text-muted-foreground mt-1">{patientData.address}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Emergency Contact</p>
                  <p className="text-sm font-medium">{patientData.emergencyContact}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Section */}
          <Tabs defaultValue="allergies" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="allergies">Allergies & Conditions</TabsTrigger>
              <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
              <TabsTrigger value="timeline">Treatment Timeline</TabsTrigger>
            </TabsList>

            {/* Allergies & Conditions Tab */}
            <TabsContent value="allergies" className="grid gap-4 md:grid-cols-2">
              <Card className="bg-card/50 border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Allergies</CardTitle>
                </CardHeader>
                <CardContent>
                  {patientData.allergies && patientData.allergies.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {patientData.allergies.map((allergy: string) => (
                        <Badge key={allergy} variant="destructive" className="rounded-full">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No known allergies</p>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Chronic Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                  {patientData.chronicConditions && patientData.chronicConditions.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {patientData.chronicConditions.map((condition: string) => (
                        <Badge key={condition} variant="secondary" className="rounded-full">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No chronic conditions recorded</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Hospitals Tab */}
            <TabsContent value="hospitals">
              <Card className="bg-card/50 border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Hospitals Visited</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {patientData.hospitalsVisited.map((hospital: string) => (
                      <li key={hospital} className="flex items-center gap-2 text-sm">
                        <span className="text-accent">✓</span>
                        <span className="text-foreground">{hospital}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Treatment Timeline Tab */}
            <TabsContent value="timeline">
              <Card className="bg-card/50 border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Treatment History</CardTitle>
                  <CardDescription>{patientData.previousTreatments.length} records found</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {patientData.previousTreatments.map((treatment: any, idx: number) => (
                      <div
                        key={idx}
                        className="border border-border rounded-lg p-4 bg-secondary/20 cursor-pointer hover:bg-secondary/30 transition-colors"
                        onClick={() => setSelectedTreatment(treatment)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-base">{treatment.treatment}</p>
                            <p className="text-xs text-muted-foreground">{treatment.date}</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="rounded-full">
                              {treatment.hospital}
                            </Badge>
                            <Badge variant={getStatusBadgeColor(treatment.status)} className="rounded-full text-xs">
                              {treatment.status === "pending-review" ? "Pending" : treatment.status}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-foreground">{treatment.diagnosis}</p>
                        <p className="text-xs text-muted-foreground mt-2">👨‍⚕️ {treatment.doctor}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Detailed Treatment View */}
          {selectedTreatment && (
            <Card className="bg-card/50 border-border ring-2 ring-primary">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedTreatment.treatment} - Detailed View</CardTitle>
                    <CardDescription>Record ID: {selectedTreatment.id}</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedTreatment(null)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Date</p>
                    <p className="font-medium">{selectedTreatment.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Treatment Type</p>
                    <p className="font-medium">{selectedTreatment.treatment}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Hospital</p>
                    <p className="font-medium">{selectedTreatment.hospital}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Physician</p>
                    <p className="font-medium">{selectedTreatment.doctor}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">Diagnosis</p>
                  <div className="p-3 bg-secondary/30 rounded-lg border border-border">
                    <p className="text-sm">{selectedTreatment.diagnosis}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">Prescription</p>
                  <div className="p-3 bg-secondary/30 rounded-lg border border-border">
                    <p className="text-sm">{selectedTreatment.prescription}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">Clinical Notes</p>
                  <div className="p-3 bg-secondary/30 rounded-lg border border-border">
                    <p className="text-sm">{selectedTreatment.notes}</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button className="btn-gradient btn-rounded text-white">Download PDF</Button>
                  <Button variant="outline" className="rounded-full border-border bg-transparent">
                    Share with Doctor
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Info */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-card/50 border-border">
              <CardContent className="pt-6 text-center">
                <p className="text-2xl mb-2">🔒</p>
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
                <p className="text-2xl mb-2">🔐</p>
                <p className="font-semibold text-sm">RLS Protected</p>
                <p className="text-xs text-muted-foreground">Row-level security enforced</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {healthId && !patientData && !loading && (
        <Card className="bg-card/50 border-border border-dashed">
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No patient record found for Health ID: {healthId}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
