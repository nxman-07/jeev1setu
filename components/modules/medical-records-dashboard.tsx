"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"

interface MedicalRecordsDashboardProps {
  user: any
}

interface MedicalRecord {
  id: string
  healthId: string
  patientName: string
  recordType: string
  date: string
  hospital: string
  doctor: string
  diagnosis: string
  status: "active" | "archived" | "pending"
  priority: "high" | "medium" | "low"
}

export function MedicalRecordsDashboard({ user }: MedicalRecordsDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"date" | "name" | "hospital">("date")
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null)

  // Mock medical records data
  const mockRecords: MedicalRecord[] = [
    {
      id: "REC001",
      healthId: "JEEV12345ABC",
      patientName: "Rajesh Kumar",
      recordType: "Consultation",
      date: "2024-10-15",
      hospital: "City Medical Center",
      doctor: "Dr. Priya Sharma",
      diagnosis: "Hypertension - Stage 2",
      status: "active",
      priority: "high",
    },
    {
      id: "REC002",
      healthId: "JEEV12345ABC",
      patientName: "Rajesh Kumar",
      recordType: "Lab Test",
      date: "2024-10-14",
      hospital: "City Medical Center",
      doctor: "Dr. Priya Sharma",
      diagnosis: "Blood Test - Results Normal",
      status: "active",
      priority: "medium",
    },
    {
      id: "REC003",
      healthId: "JEEVXYZ789DEF",
      patientName: "Priya Patel",
      recordType: "Surgery",
      date: "2024-10-10",
      hospital: "Apollo Hospital",
      doctor: "Dr. Vikram Kapoor",
      diagnosis: "Appendectomy - Successful",
      status: "active",
      priority: "high",
    },
    {
      id: "REC004",
      healthId: "JEEV456DEF789",
      patientName: "Amit Kumar",
      recordType: "Follow-up",
      date: "2024-10-08",
      hospital: "Metro Hospital",
      doctor: "Dr. Amit Singh",
      diagnosis: "Post-Surgery Follow-up",
      status: "archived",
      priority: "low",
    },
    {
      id: "REC005",
      healthId: "JEEVXYZ789DEF",
      patientName: "Priya Patel",
      recordType: "Medication Review",
      date: "2024-10-20",
      hospital: "Metro Hospital",
      doctor: "Dr. Amit Singh",
      diagnosis: "Diabetes Medication Adjustment",
      status: "pending",
      priority: "medium",
    },
    {
      id: "REC006",
      healthId: "JEEV12345ABC",
      patientName: "Rajesh Kumar",
      recordType: "Imaging",
      date: "2024-10-12",
      hospital: "Health Plus Hospital",
      doctor: "Dr. Sanjay Gupta",
      diagnosis: "CT Scan - Heart Assessment",
      status: "active",
      priority: "high",
    },
  ]

  // Filter and search logic
  const filteredRecords = useMemo(() => {
    let results = mockRecords

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (record) =>
          record.healthId.toLowerCase().includes(query) ||
          record.patientName.toLowerCase().includes(query) ||
          record.hospital.toLowerCase().includes(query) ||
          record.doctor.toLowerCase().includes(query) ||
          record.diagnosis.toLowerCase().includes(query),
      )
    }

    // Type filter
    if (filterType !== "all") {
      results = results.filter((record) => record.recordType === filterType)
    }

    // Status filter
    if (filterStatus !== "all") {
      results = results.filter((record) => record.status === filterStatus)
    }

    // Sorting
    results.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortBy === "name") {
        return a.patientName.localeCompare(b.patientName)
      } else if (sortBy === "hospital") {
        return a.hospital.localeCompare(b.hospital)
      }
      return 0
    })

    return results
  }, [searchQuery, filterType, filterStatus, sortBy])

  const recordTypes = ["Consultation", "Lab Test", "Surgery", "Follow-up", "Imaging", "Medication Review"]
  const statusOptions = ["active", "archived", "pending"]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "default"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-900/30 border-green-700"
      case "archived":
        return "bg-gray-900/30 border-gray-700"
      case "pending":
        return "bg-yellow-900/30 border-yellow-700"
      default:
        return "bg-card/50 border-border"
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle>Medical Records Search & Dashboard</CardTitle>
          <CardDescription>Search across all patient records with advanced filtering</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="space-y-2">
            <Label htmlFor="search">Search Records</Label>
            <Input
              id="search"
              placeholder="Search by Health ID, patient name, hospital, doctor, or diagnosis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-input border-border"
            />
          </div>

          {/* Filter Controls */}
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="type-filter">Record Type</Label>
              <select
                id="type-filter"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm"
              >
                <option value="all">All Types</option>
                {recordTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status-filter">Status</Label>
              <select
                id="status-filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm"
              >
                <option value="all">All Status</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sort-by">Sort By</Label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm"
              >
                <option value="date">Date (Latest First)</option>
                <option value="name">Patient Name</option>
                <option value="hospital">Hospital</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Results</Label>
              <div className="px-3 py-2 bg-secondary/30 rounded-lg border border-border flex items-center">
                <span className="font-semibold text-lg">{filteredRecords.length}</span>
                <span className="text-xs text-muted-foreground ml-2">records found</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Records List */}
      <div className="space-y-3">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <Card
              key={record.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${getStatusColor(record.status)} ${
                selectedRecord?.id === record.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedRecord(record)}
            >
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    {/* Header Row */}
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="font-semibold text-lg">{record.patientName}</h4>
                      <Badge variant={getPriorityColor(record.priority)} className="rounded-full text-xs">
                        {record.priority.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="rounded-full text-xs">
                        {record.status}
                      </Badge>
                    </div>

                    {/* Record Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Health ID</p>
                        <p className="font-mono font-medium text-sm">{record.healthId}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Record Type</p>
                        <p className="font-medium text-sm">{record.recordType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Date</p>
                        <p className="font-medium text-sm">{new Date(record.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Hospital</p>
                        <p className="font-medium text-sm">{record.hospital}</p>
                      </div>
                    </div>

                    {/* Diagnosis */}
                    <div className="mb-2">
                      <p className="text-xs text-muted-foreground mb-1">Diagnosis</p>
                      <p className="text-sm">{record.diagnosis}</p>
                    </div>

                    {/* Doctor */}
                    <p className="text-xs text-muted-foreground">Physician: {record.doctor}</p>
                  </div>

                  {/* Actions */}
                  <div className="ml-4 flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="rounded-full border-border bg-transparent">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full border-border bg-transparent">
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="bg-card/50 border-dashed border-border">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground text-lg">No records found matching your search criteria</p>
              <p className="text-muted-foreground text-sm mt-2">Try adjusting your filters or search query</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Selected Record Detail View */}
      {selectedRecord && (
        <Card className="bg-card/50 border-border ring-2 ring-primary">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Record Details - {selectedRecord.recordType}</CardTitle>
                <CardDescription>ID: {selectedRecord.id}</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedRecord(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕ Close
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Patient Information */}
            <div>
              <h4 className="font-semibold mb-3">Patient Information</h4>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-xs text-muted-foreground">Full Name</p>
                  <p className="font-medium">{selectedRecord.patientName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Health ID</p>
                  <p className="font-medium font-mono">{selectedRecord.healthId}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <Badge className="rounded-full mt-1">{selectedRecord.status}</Badge>
                </div>
              </div>
            </div>

            {/* Record Information */}
            <div>
              <h4 className="font-semibold mb-3">Record Information</h4>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-xs text-muted-foreground">Record Type</p>
                  <p className="font-medium">{selectedRecord.recordType}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-medium">{new Date(selectedRecord.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Priority</p>
                  <Badge variant={getPriorityColor(selectedRecord.priority)} className="rounded-full mt-1">
                    {selectedRecord.priority}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div>
              <h4 className="font-semibold mb-3">Medical Information</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground">Hospital</p>
                  <p className="font-medium">{selectedRecord.hospital}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Physician</p>
                  <p className="font-medium">{selectedRecord.doctor}</p>
                </div>
              </div>
            </div>

            {/* Diagnosis */}
            <div>
              <h4 className="font-semibold mb-3">Diagnosis & Findings</h4>
              <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                <p className="text-sm">{selectedRecord.diagnosis}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button className="btn-gradient btn-rounded text-white">Download Record</Button>
              <Button variant="outline" className="rounded-full border-border bg-transparent">
                Share with Provider
              </Button>
              <Button variant="outline" className="rounded-full border-border bg-transparent">
                Print
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info Footer */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card/50 border-border">
          <CardContent className="pt-6 text-center">
            <p className="text-2xl mb-2">🔐</p>
            <p className="font-semibold text-sm">End-to-End Encrypted</p>
            <p className="text-xs text-muted-foreground">All records encrypted in transit and at rest</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border">
          <CardContent className="pt-6 text-center">
            <p className="text-2xl mb-2">📋</p>
            <p className="font-semibold text-sm">FHIR Compliant</p>
            <p className="text-xs text-muted-foreground">Interoperable with healthcare systems</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border">
          <CardContent className="pt-6 text-center">
            <p className="text-2xl mb-2">⏱️</p>
            <p className="font-semibold text-sm">Real-time Sync</p>
            <p className="text-xs text-muted-foreground">Data synchronized across all facilities</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
