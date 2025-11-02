"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PatientHistoryModule } from "./modules/patient-history-module"
import { AddHistoryModule } from "./modules/add-history-module"
import { AnalyticsModule } from "./modules/analytics-module"
import { HospitalAdminDashboard } from "./modules/hospital-admin-dashboard"
import { DoctorDashboard } from "./modules/doctor-dashboard"
import { MedicalRecordsDashboard } from "./modules/medical-records-dashboard"

interface DashboardLayoutProps {
  user: any
  onLogout: () => void
}

export function DashboardLayout({ user, onLogout }: DashboardLayoutProps) {
  const [activeModule, setActiveModule] = useState<"view" | "add" | "analytics" | "records">("view")
  const [patientRecords, setPatientRecords] = useState<any[]>([])

  // If user is from hospital (admin or doctor), show their respective portals
  if (user.type === "hospital") {
    if (user.role === "admin") {
      return <HospitalAdminDashboard user={user} onLogout={onLogout} />
    } else if (user.role === "doctor" || user.role === "staff") {
      return <DoctorDashboard user={user} onLogout={onLogout} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">J1</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">JEEV-1-SETU</h1>
              <p className="text-xs text-muted-foreground">
                {user.type === "hospital" ? `${user.hospitalName} - ${user.role}` : `Patient ID: ${user.healthId}`}
              </p>
            </div>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="rounded-full border-border hover:bg-secondary/50 bg-transparent"
          >
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Module Navigation */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          <button
            onClick={() => setActiveModule("view")}
            className={`p-4 rounded-2xl transition-all font-medium ${
              activeModule === "view"
                ? "bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg"
                : "bg-card border border-border text-foreground hover:bg-secondary/50"
            }`}
          >
            📋 View History
          </button>
          <button
            onClick={() => setActiveModule("records")}
            className={`p-4 rounded-2xl transition-all font-medium ${
              activeModule === "records"
                ? "bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg"
                : "bg-card border border-border text-foreground hover:bg-secondary/50"
            }`}
          >
            🔍 Search Records
          </button>
          <button
            onClick={() => setActiveModule("add")}
            className={`p-4 rounded-2xl transition-all font-medium ${
              activeModule === "add"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                : "bg-card border border-border text-foreground hover:bg-secondary/50"
            }`}
          >
            ➕ Add Record
          </button>
          <button
            onClick={() => setActiveModule("analytics")}
            className={`p-4 rounded-2xl transition-all font-medium ${
              activeModule === "analytics"
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                : "bg-card border border-border text-foreground hover:bg-secondary/50"
            }`}
          >
            📊 Analytics
          </button>
        </div>

        {/* Module Content */}
        <div>
          {activeModule === "view" && <PatientHistoryModule user={user} patientRecords={patientRecords} />}
          {activeModule === "records" && <MedicalRecordsDashboard user={user} />}
          {activeModule === "add" && (
            <AddHistoryModule user={user} onRecordAdd={(record) => setPatientRecords([...patientRecords, record])} />
          )}
          {activeModule === "analytics" && <AnalyticsModule user={user} />}
        </div>
      </main>
    </div>
  )
}
