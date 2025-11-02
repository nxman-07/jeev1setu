"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  Area,
  AreaChart,
  ComposedChart,
  LineChart,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AnalyticsModuleProps {
  user: any
}

export function AnalyticsModule({ user }: AnalyticsModuleProps) {
  const [cloudStatus, setCloudStatus] = useState(0)

  // Simulate cloud server live counting
  useEffect(() => {
    const interval = setInterval(() => {
      setCloudStatus(Math.floor(Math.random() * 100) + 50)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const isHospitalUser = user.type === "hospital"

  // ============ HOSPITAL STAFF ANALYTICS DATA ============
  const treatmentData = [
    { name: "Consultation", value: 45, color: "#3b82f6" },
    { name: "Surgery", value: 20, color: "#10b981" },
    { name: "Checkup", value: 25, color: "#8b5cf6" },
    { name: "Emergency", value: 10, color: "#ef4444" },
  ]

  const hospitalVisitsData = [
    { hospital: "City Medical", visits: 12 },
    { hospital: "Apollo", visits: 8 },
    { hospital: "Metro Hospital", visits: 10 },
    { hospital: "Health Plus", visits: 6 },
    { hospital: "Fortis", visits: 9 },
  ]

  const patientActivityData = [
    { month: "Jan", patients: 120, records: 450, admissions: 45, discharges: 38 },
    { month: "Feb", patients: 145, records: 520, admissions: 52, discharges: 48 },
    { month: "Mar", patients: 130, records: 480, admissions: 48, discharges: 44 },
    { month: "Apr", patients: 160, records: 610, admissions: 58, discharges: 52 },
    { month: "May", patients: 175, records: 680, admissions: 62, discharges: 58 },
    { month: "Jun", patients: 190, records: 720, admissions: 68, discharges: 64 },
  ]

  const responseTimeData = [
    { time: "Jan", response: 45, uptime: 99.2 },
    { time: "Feb", response: 42, uptime: 99.5 },
    { time: "Mar", response: 38, uptime: 99.8 },
    { time: "Apr", response: 35, uptime: 99.9 },
    { time: "May", response: 32, uptime: 99.95 },
    { time: "Jun", response: 28, uptime: 99.98 },
  ]

  const heatmapData = [
    { hour: "6am", mon: 2, tue: 3, wed: 2, thu: 4, fri: 5, sat: 1, sun: 0 },
    { hour: "9am", mon: 8, tue: 9, wed: 7, thu: 10, fri: 11, sat: 3, sun: 2 },
    { hour: "12pm", mon: 12, tue: 14, wed: 13, thu: 15, fri: 16, sat: 5, sun: 4 },
    { hour: "3pm", mon: 10, tue: 11, wed: 9, thu: 12, fri: 13, sat: 4, sun: 3 },
    { hour: "6pm", mon: 6, tue: 7, wed: 5, thu: 8, fri: 9, sat: 6, sun: 5 },
  ]

  const departmentData = [
    { dept: "Cardiology", bed: 28, occ: 85, wait: 12 },
    { dept: "Neurology", bed: 24, occ: 72, wait: 8 },
    { dept: "Orthopedics", bed: 32, occ: 78, wait: 15 },
    { dept: "Pediatrics", bed: 20, occ: 68, wait: 5 },
    { dept: "Surgery", bed: 36, occ: 92, wait: 22 },
  ]

  const appointmentTypes = [
    { type: "Follow-up", count: 245, percentage: 35 },
    { type: "New Patient", count: 180, percentage: 26 },
    { type: "Urgent", count: 125, percentage: 18 },
    { type: "Consultation", count: 165, percentage: 24 },
  ]

  const ageDistribution = [
    { range: "0-10", patients: 45, avgStay: 2.1 },
    { range: "11-20", patients: 38, avgStay: 1.8 },
    { range: "21-30", patients: 92, avgStay: 2.3 },
    { range: "31-40", patients: 125, avgStay: 2.6 },
    { range: "41-50", patients: 165, avgStay: 3.2 },
    { range: "51-60", patients: 210, avgStay: 4.1 },
    { range: "61+", patients: 185, avgStay: 5.8 },
  ]

  // ============ PATIENT PERSONAL ANALYTICS DATA ============
  const patientPersonalData = {
    totalVisits: 12,
    lastVisit: "2 weeks ago",
    conditions: [
      { name: "Hypertension", diagnosed: "2020", status: "Ongoing", doctor: "Dr. Sharma" },
      { name: "Type 2 Diabetes", diagnosed: "2019", status: "Ongoing", doctor: "Dr. Patel" },
      { name: "Asthma", diagnosed: "2015", status: "Controlled", doctor: "Dr. Singh" },
    ],
    medications: [
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily", since: "2019" },
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", since: "2020" },
      { name: "Albuterol", dosage: "100mcg", frequency: "As needed", since: "2015" },
    ],
    allergies: ["Penicillin", "Shellfish", "Latex"],
    visitHistory: [
      { month: "Jan", visits: 2 },
      { month: "Feb", visits: 1 },
      { month: "Mar", visits: 3 },
      { month: "Apr", visits: 2 },
      { month: "May", visits: 2 },
      { month: "Jun", visits: 2 },
    ],
    treatmentsByType: [
      { name: "Checkup", value: 6, color: "#3b82f6" },
      { name: "Lab Tests", value: 3, color: "#10b981" },
      { name: "Consultation", value: 2, color: "#8b5cf6" },
      { name: "Procedure", value: 1, color: "#f59e0b" },
    ],
    hospitalVisits: [
      { hospital: "City Medical", visits: 5 },
      { hospital: "Apollo", visits: 4 },
      { hospital: "Metro Hospital", visits: 3 },
    ],
  }

  const getHeatmapColor = (value: number) => {
    if (value === 0) return "#1a1f28"
    if (value < 5) return "#1e3a5f"
    if (value < 10) return "#1e4d7b"
    if (value < 15) return "#2563eb"
    return "#0ea5e9"
  }

  const getDeptColor = (occupancy: number) => {
    if (occupancy < 50) return "#10b981"
    if (occupancy < 75) return "#f59e0b"
    return "#ef4444"
  }

  // ============ PATIENT ANALYTICS VIEW ============
  if (!isHospitalUser) {
    return (
      <div className="space-y-6">
        {/* Patient Header Metrics */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 border-blue-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-2">Health ID</p>
                <p className="text-2xl font-bold text-blue-400">{user.healthId}</p>
                <p className="text-xs text-blue-300 mt-1">Unique identifier</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/30 to-green-800/30 border-green-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-2">Total Visits</p>
                <p className="text-4xl font-bold text-green-400">{patientPersonalData.totalVisits}</p>
                <p className="text-xs text-green-300 mt-1">Last: {patientPersonalData.lastVisit}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 border-purple-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-2">Active Conditions</p>
                <p className="text-4xl font-bold text-purple-400">
                  {patientPersonalData.conditions.filter((c) => c.status === "Ongoing").length}
                </p>
                <p className="text-xs text-purple-300 mt-1">Under treatment</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patient Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="conditions">Conditions & Meds</TabsTrigger>
            <TabsTrigger value="history">Visit History</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="grid gap-6 md:grid-cols-2">
            {/* Treatment Types for Patient */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="text-lg">Your Treatment Distribution</CardTitle>
                <CardDescription>Breakdown of your medical records</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={patientPersonalData.treatmentsByType}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {patientPersonalData.treatmentsByType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  {patientPersonalData.treatmentsByType.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">
                        {item.name} ({item.value})
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Patient Hospital Visits */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="text-lg">Hospitals Visited</CardTitle>
                <CardDescription>Your medical facility visits</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={patientPersonalData.hospitalVisits}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                    <XAxis dataKey="hospital" stroke="#a0aec0" fontSize={12} />
                    <YAxis stroke="#a0aec0" />
                    <Tooltip contentStyle={{ backgroundColor: "#1a1f28", border: "1px solid #2d3748" }} />
                    <Bar dataKey="visits" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Patient Visit Timeline */}
            <Card className="bg-card/50 border-border md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Your Visit Timeline</CardTitle>
                <CardDescription>Monthly medical visits over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={patientPersonalData.visitHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                    <XAxis dataKey="month" stroke="#a0aec0" />
                    <YAxis stroke="#a0aec0" />
                    <Tooltip contentStyle={{ backgroundColor: "#1a1f28", border: "1px solid #2d3748" }} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="visits"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: "#3b82f6", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Conditions & Medications Tab */}
          <TabsContent value="conditions" className="grid gap-6">
            {/* Medical Conditions */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="text-lg">Your Medical Conditions</CardTitle>
                <CardDescription>Active and historical diagnoses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {patientPersonalData.conditions.map((condition, idx) => (
                    <div key={idx} className="p-4 border border-border rounded-lg bg-card/30">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{condition.name}</h4>
                          <p className="text-sm text-muted-foreground">Diagnosed: {condition.diagnosed}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            condition.status === "Ongoing"
                              ? "bg-orange-500/20 text-orange-300"
                              : "bg-green-500/20 text-green-300"
                          }`}
                        >
                          {condition.status}
                        </span>
                      </div>
                      <p className="text-sm text-blue-300">Doctor: {condition.doctor}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Medications */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="text-lg">Current Medications</CardTitle>
                <CardDescription>Your prescribed medications and dosages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {patientPersonalData.medications.map((med, idx) => (
                    <div key={idx} className="p-4 border border-border rounded-lg bg-card/30">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{med.name}</h4>
                          <p className="text-sm text-muted-foreground">Dosage: {med.dosage}</p>
                          <p className="text-sm text-muted-foreground">Frequency: {med.frequency}</p>
                        </div>
                        <span className="text-xs text-green-300">Since {med.since}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Allergies */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="text-lg">Known Allergies</CardTitle>
                <CardDescription>Important allergy information for your safety</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {patientPersonalData.allergies.map((allergy, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-2 rounded-full bg-red-500/20 border border-red-500/50 text-red-300 font-medium text-sm"
                    >
                      ⚠️ {allergy}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Visit History Tab */}
          <TabsContent value="history" className="grid gap-6">
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="text-lg">Your Medical History</CardTitle>
                <CardDescription>Timeline of your recent medical records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 border border-border rounded-lg bg-card/30 hover:bg-card/50 transition">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">Routine Checkup</h4>
                      <span className="text-xs text-muted-foreground">Jun 15, 2024</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">City Medical • Dr. Sharma</p>
                    <p className="text-sm">BP: 128/82, Heart Rate: 72, Weight: 78kg</p>
                  </div>

                  <div className="p-4 border border-border rounded-lg bg-card/30 hover:bg-card/50 transition">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">Lab Tests</h4>
                      <span className="text-xs text-muted-foreground">Jun 8, 2024</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Apollo Hospital • Dr. Patel</p>
                    <p className="text-sm">Blood Sugar: 145 mg/dL, Cholesterol: 198 mg/dL</p>
                  </div>

                  <div className="p-4 border border-border rounded-lg bg-card/30 hover:bg-card/50 transition">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">Consultation</h4>
                      <span className="text-xs text-muted-foreground">May 30, 2024</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Metro Hospital • Dr. Singh</p>
                    <p className="text-sm">Follow-up on asthma management, prescribed inhaler refill</p>
                  </div>

                  <div className="p-4 border border-border rounded-lg bg-card/30 hover:bg-card/50 transition">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">Checkup</h4>
                      <span className="text-xs text-muted-foreground">May 15, 2024</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">City Medical • Dr. Sharma</p>
                    <p className="text-sm">Hypertension management review, medication adjusted</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Patient Info Footer */}
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle>Your Health Data Privacy</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground mb-2">Data Access</p>
              <p className="font-semibold">Restricted</p>
              <p className="text-xs text-green-400">Only you and authorized doctors can access</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-2">Encryption</p>
              <p className="font-semibold">HTTPS Secured</p>
              <p className="text-xs text-green-400">Your data is encrypted in transit & at rest</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-2">Last Updated</p>
              <p className="font-semibold">2 days ago</p>
              <p className="text-xs text-green-400">Regularly synced with cloud</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ============ HOSPITAL STAFF ANALYTICS VIEW ============
  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 border-blue-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">Cloud Server Status</p>
              <p className="text-4xl font-bold text-blue-400">{cloudStatus}%</p>
              <p className="text-xs text-blue-300 mt-1">Real-time active</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/30 to-green-800/30 border-green-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">Total Patients</p>
              <p className="text-4xl font-bold text-green-400">1,247</p>
              <p className="text-xs text-green-300 mt-1">+12% this month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 border-purple-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">Medical Records</p>
              <p className="text-4xl font-bold text-purple-400">5,842</p>
              <p className="text-xs text-purple-300 mt-1">Synced to cloud</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/30 to-orange-800/30 border-orange-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">Avg Response Time</p>
              <p className="text-4xl font-bold text-orange-400">28ms</p>
              <p className="text-xs text-orange-300 mt-1">FHIR API Gateway</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different analytics views */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="heatmaps">Heatmaps</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="grid gap-6 md:grid-cols-2">
          {/* Treatment Types Pie Chart */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg">Treatment Distribution</CardTitle>
              <CardDescription>Records by treatment type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={treatmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {treatmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                {treatmentData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hospital Visits Bar Chart */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg">Visits by Hospital</CardTitle>
              <CardDescription>Patient distribution across facilities</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={hospitalVisitsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                  <XAxis dataKey="hospital" stroke="#a0aec0" fontSize={12} />
                  <YAxis stroke="#a0aec0" />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1f28", border: "1px solid #2d3748" }} />
                  <Bar dataKey="visits" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Patient & Records Growth */}
          <Card className="bg-card/50 border-border md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Platform Growth</CardTitle>
              <CardDescription>Patient and record growth over 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={patientActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                  <XAxis dataKey="month" stroke="#a0aec0" />
                  <YAxis yAxisId="left" stroke="#a0aec0" />
                  <YAxis yAxisId="right" orientation="right" stroke="#a0aec0" />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1f28", border: "1px solid #2d3748" }} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="patients" stroke="#10b981" strokeWidth={2} />
                  <Bar yAxisId="right" dataKey="records" fill="#3b82f6" radius={[8, 8, 0, 0]} opacity={0.8} />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Heatmaps Tab */}
        <TabsContent value="heatmaps" className="grid gap-6">
          {/* Consultation Frequency Heatmap */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg">Consultation Frequency Heatmap</CardTitle>
              <CardDescription>Patient volume by hour of day and day of week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-muted-foreground">Time</th>
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                        <th key={day} className="px-3 py-2 text-center text-muted-foreground">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {heatmapData.map((row) => (
                      <tr key={row.hour}>
                        <td className="px-4 py-2 font-medium text-foreground">{row.hour}</td>
                        <td
                          className="px-3 py-2 text-center rounded text-white"
                          style={{ backgroundColor: getHeatmapColor(row.mon) }}
                        >
                          {row.mon}
                        </td>
                        <td
                          className="px-3 py-2 text-center rounded text-white"
                          style={{ backgroundColor: getHeatmapColor(row.tue) }}
                        >
                          {row.tue}
                        </td>
                        <td
                          className="px-3 py-2 text-center rounded text-white"
                          style={{ backgroundColor: getHeatmapColor(row.wed) }}
                        >
                          {row.wed}
                        </td>
                        <td
                          className="px-3 py-2 text-center rounded text-white"
                          style={{ backgroundColor: getHeatmapColor(row.thu) }}
                        >
                          {row.thu}
                        </td>
                        <td
                          className="px-3 py-2 text-center rounded text-white"
                          style={{ backgroundColor: getHeatmapColor(row.fri) }}
                        >
                          {row.fri}
                        </td>
                        <td
                          className="px-3 py-2 text-center rounded text-white"
                          style={{ backgroundColor: getHeatmapColor(row.sat) }}
                        >
                          {row.sat}
                        </td>
                        <td
                          className="px-3 py-2 text-center rounded text-white"
                          style={{ backgroundColor: getHeatmapColor(row.sun) }}
                        >
                          {row.sun}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex gap-4 justify-center text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: "#1a1f28" }} />
                  <span>Low</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: "#1e3a5f" }} />
                  <span>Medium</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: "#2563eb" }} />
                  <span>High</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: "#0ea5e9" }} />
                  <span>Peak</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Department Occupancy Heatmap */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg">Department Occupancy Status</CardTitle>
              <CardDescription>Real-time bed availability and wait times</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {departmentData.map((dept) => (
                  <div key={dept.dept} className="space-y-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-sm">{dept.dept}</span>
                      <span className="text-xs text-muted-foreground">
                        {dept.bed} beds • {dept.occ}% occupied • {dept.wait}min wait
                      </span>
                    </div>
                    <div className="h-6 bg-secondary/30 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${dept.occ}%`,
                          backgroundColor: getDeptColor(dept.occ),
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Distribution Tab */}
        <TabsContent value="distribution" className="grid gap-6 md:grid-cols-2">
          {/* Appointment Type Distribution */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg">Appointment Types</CardTitle>
              <CardDescription>Distribution of appointment categories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {appointmentTypes.map((apt) => (
                <div key={apt.type}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{apt.type}</span>
                    <span className="text-sm text-muted-foreground">{apt.percentage}%</span>
                  </div>
                  <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-green-500"
                      style={{ width: `${apt.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{apt.count} appointments</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Age Distribution */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg">Patient Age Distribution</CardTitle>
              <CardDescription>Demographics and average stay duration</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ageDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                  <XAxis dataKey="range" stroke="#a0aec0" fontSize={12} />
                  <YAxis stroke="#a0aec0" />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1f28", border: "1px solid #2d3748" }} />
                  <Legend />
                  <Bar dataKey="patients" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="grid gap-6">
          {/* API Response Time and Uptime */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg">FHIR API Performance</CardTitle>
              <CardDescription>Response time and uptime metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                  <XAxis dataKey="time" stroke="#a0aec0" />
                  <YAxis yAxisId="left" label={{ value: "Response (ms)", angle: -90, position: "insideLeft" }} />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{ value: "Uptime (%)", angle: 90, position: "insideRight" }}
                  />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1f28", border: "1px solid #2d3748" }} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="response" fill="#8b5cf6" radius={[8, 8, 0, 0]} opacity={0.8} />
                  <Line yAxisId="right" type="monotone" dataKey="uptime" stroke="#10b981" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Admissions and Discharges */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg">Hospital Activity Trends</CardTitle>
              <CardDescription>Monthly admissions and discharge patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={patientActivityData}>
                  <defs>
                    <linearGradient id="colorAdmissions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorDischarges" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                  <XAxis dataKey="month" stroke="#a0aec0" />
                  <YAxis stroke="#a0aec0" />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1f28", border: "1px solid #2d3748" }} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="admissions"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorAdmissions)"
                    name="Admissions"
                  />
                  <Area
                    type="monotone"
                    dataKey="discharges"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorDischarges)"
                    name="Discharges"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* System Health Footer */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle>System Health</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground mb-2">Encryption Status</p>
            <p className="font-semibold">HTTPS Active</p>
            <p className="text-xs text-green-400">All data encrypted in transit & at rest</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-2">Database Backup</p>
            <p className="font-semibold">Last: 2 hours ago</p>
            <p className="text-xs text-green-400">Version controlled & redundant</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-2">Interoperability</p>
            <p className="font-semibold">FHIR Compliant</p>
            <p className="text-xs text-green-400">API Gateway operational</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
