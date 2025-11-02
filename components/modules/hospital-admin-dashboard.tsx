"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts"

interface HospitalAdminDashboardProps {
  user: any
  onLogout: () => void
}

export function HospitalAdminDashboard({ user, onLogout }: HospitalAdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "doctors" | "patients" | "reports">("overview")
  const [showAddDoctor, setShowAddDoctor] = useState(false)
  const [doctorForm, setDoctorForm] = useState({
    name: "",
    email: "",
    specialty: "general",
    license: "",
    phone: "",
  })

  const mockDoctors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialty: "Cardiology",
      license: "MC/2019/45621",
      patients: 124,
      status: "active",
    },
    { id: 2, name: "Dr. Amit Singh", specialty: "Neurology", license: "MC/2020/12345", patients: 89, status: "active" },
    {
      id: 3,
      name: "Dr. Vikram Kapoor",
      specialty: "Orthopedics",
      license: "MC/2018/98765",
      patients: 156,
      status: "active",
    },
  ]

  const mockMetrics = [
    { month: "Jan", admissions: 120, discharges: 95, surgeries: 45 },
    { month: "Feb", admissions: 145, discharges: 130, surgeries: 52 },
    { month: "Mar", admissions: 130, discharges: 120, surgeries: 48 },
    { month: "Apr", admissions: 160, discharges: 145, surgeries: 58 },
    { month: "May", admissions: 175, discharges: 165, surgeries: 62 },
    { month: "Jun", admissions: 190, discharges: 175, surgeries: 68 },
  ]

  const mockStaff = [
    { role: "Doctors", count: 42, status: "active" },
    { role: "Nurses", count: 156, status: "active" },
    { role: "Staff", count: 89, status: "active" },
    { role: "Interns", count: 23, status: "on-duty" },
  ]

  const handleAddDoctor = () => {
    if (doctorForm.name && doctorForm.email && doctorForm.license) {
      setShowAddDoctor(false)
      setDoctorForm({ name: "", email: "", specialty: "general", license: "", phone: "" })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">{user.hospitalName}</h2>
          <p className="text-muted-foreground">Admin Panel - {user.email}</p>
        </div>
        <Button onClick={onLogout} variant="outline" className="rounded-full border-border bg-transparent">
          Logout
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 bg-secondary/40 p-1 rounded-full">
        {["overview", "doctors", "patients", "reports"].map((tab) => (
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

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 border-blue-700">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">Total Patients</p>
                  <p className="text-4xl font-bold text-blue-400">2,847</p>
                  <p className="text-xs text-blue-300 mt-1">+8.2% this month</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/30 to-green-800/30 border-green-700">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">Active Doctors</p>
                  <p className="text-4xl font-bold text-green-400">42</p>
                  <p className="text-xs text-green-300 mt-1">All verified</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 border-purple-700">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">Beds Available</p>
                  <p className="text-4xl font-bold text-purple-400">156</p>
                  <p className="text-xs text-purple-300 mt-1">Out of 250 total</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/30 to-orange-800/30 border-orange-700">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">Avg. Stay (Days)</p>
                  <p className="text-4xl font-bold text-orange-400">4.2</p>
                  <p className="text-xs text-orange-300 mt-1">↓ 0.3 vs last month</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle>Hospital Activity</CardTitle>
                <CardDescription>Admissions, discharges, and surgeries</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockMetrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                    <XAxis dataKey="month" stroke="#a0aec0" />
                    <YAxis stroke="#a0aec0" />
                    <Tooltip contentStyle={{ backgroundColor: "#1a1f28", border: "1px solid #2d3748" }} />
                    <Legend />
                    <Line type="monotone" dataKey="admissions" stroke="#3b82f6" name="Admissions" />
                    <Line type="monotone" dataKey="discharges" stroke="#10b981" name="Discharges" />
                    <Line type="monotone" dataKey="surgeries" stroke="#8b5cf6" name="Surgeries" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle>Staff Overview</CardTitle>
                <CardDescription>Current staff distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockStaff.map((staff) => (
                    <div key={staff.role} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">{staff.role}</span>
                        <Badge variant={staff.status === "active" ? "default" : "secondary"} className="rounded-full">
                          {staff.status}
                        </Badge>
                      </div>
                      <span className="text-2xl font-bold text-primary">{staff.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Doctors Tab */}
      {activeTab === "doctors" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Registered Doctors</h3>
            <Button onClick={() => setShowAddDoctor(!showAddDoctor)} className="btn-gradient btn-rounded text-white">
              {showAddDoctor ? "Cancel" : "+ Add Doctor"}
            </Button>
          </div>

          {/* Add Doctor Form */}
          {showAddDoctor && (
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle>Register New Doctor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="doctor-name">Full Name</Label>
                    <Input
                      id="doctor-name"
                      placeholder="Dr. Name"
                      value={doctorForm.name}
                      onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctor-email">Email</Label>
                    <Input
                      id="doctor-email"
                      type="email"
                      placeholder="doctor@hospital.com"
                      value={doctorForm.email}
                      onChange={(e) => setDoctorForm({ ...doctorForm, email: e.target.value })}
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Specialty</Label>
                    <select
                      id="specialty"
                      value={doctorForm.specialty}
                      onChange={(e) => setDoctorForm({ ...doctorForm, specialty: e.target.value })}
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground"
                    >
                      <option value="general">General Practice</option>
                      <option value="cardiology">Cardiology</option>
                      <option value="neurology">Neurology</option>
                      <option value="orthopedics">Orthopedics</option>
                      <option value="pediatrics">Pediatrics</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license">Medical License</Label>
                    <Input
                      id="license"
                      placeholder="MC/2019/12345"
                      value={doctorForm.license}
                      onChange={(e) => setDoctorForm({ ...doctorForm, license: e.target.value })}
                      className="bg-input border-border"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    placeholder="+91 9876543210"
                    value={doctorForm.phone}
                    onChange={(e) => setDoctorForm({ ...doctorForm, phone: e.target.value })}
                    className="bg-input border-border"
                  />
                </div>
                <Button
                  onClick={handleAddDoctor}
                  className="btn-gradient btn-rounded text-white w-full"
                  disabled={!doctorForm.name || !doctorForm.email || !doctorForm.license}
                >
                  Register Doctor
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Doctors List */}
          <div className="grid gap-4">
            {mockDoctors.map((doctor) => (
              <Card key={doctor.id} className="bg-card/50 border-border">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-lg">{doctor.name}</h4>
                        <Badge className="rounded-full">{doctor.specialty}</Badge>
                        <Badge variant={doctor.status === "active" ? "default" : "secondary"} className="rounded-full">
                          {doctor.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">License</p>
                          <p className="font-medium">{doctor.license}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Active Patients</p>
                          <p className="font-medium">{doctor.patients}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Verified</p>
                          <p className="font-medium text-green-400">✓</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="rounded-full border-border bg-transparent">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-full border-border bg-transparent">
                        Suspend
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Patients Tab */}
      {activeTab === "patients" && (
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle>Patient Management</CardTitle>
            <CardDescription>Search and manage patient records</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Search by Health ID or name..." className="bg-input border-border" />
            <p className="text-muted-foreground text-sm">Search functionality will display patient list</p>
          </CardContent>
        </Card>
      )}

      {/* Reports Tab */}
      {activeTab === "reports" && (
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle>Hospital Reports</CardTitle>
            <CardDescription>Generate and view hospital analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <Button variant="outline" className="rounded-full border-border py-6 bg-transparent">
                Monthly Report
              </Button>
              <Button variant="outline" className="rounded-full border-border py-6 bg-transparent">
                Staff Performance
              </Button>
              <Button variant="outline" className="rounded-full border-border py-6 bg-transparent">
                Patient Satisfaction
              </Button>
              <Button variant="outline" className="rounded-full border-border py-6 bg-transparent">
                Bed Occupancy
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
