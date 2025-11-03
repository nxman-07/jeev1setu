"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PatientHistoryModule } from "./modules/patient-history-module"
import { AddHistoryModule } from "./modules/add-history-module"
import { AnalyticsModule } from "./modules/analytics-module"
import { HospitalAdminDashboard } from "./modules/hospital-admin-dashboard"
import { DoctorDashboard } from "./modules/doctor-dashboard"
import { MedicalRecordsDashboard } from "./modules/medical-records-dashboard"
import { ThemeToggle } from "./theme-toggle"

interface DashboardLayoutProps {
  user: any
  onLogout: () => void
}

export function DashboardLayout({ user, onLogout }: DashboardLayoutProps) {
  const [activeModule, setActiveModule] = useState<"view" | "add" | "analytics" | "records">("view")
  const [patientRecords, setPatientRecords] = useState<any[]>([])
  const [userEmail] = useState(user.email)

  useEffect(() => {
    const stored = localStorage.getItem("jeev_records")
    if (stored) {
      const records = JSON.parse(stored)
      const userRecords = records.filter((r: any) => r.email === userEmail || r.createdAt)
      setPatientRecords(userRecords)
    }
  }, [userEmail])

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
            <div className="px-4 py-2 rounded-2xl bg-gradient-to-br from-white via-red-400 to-red-600 flex items-center justify-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jeevonesetu-dwgxE4lM53FRMKkjDrcpasrbG8feoE.jpg"
                alt="JEEV-1-SETU"
                className="h-8 w-auto"
              />
            </div>
            <div>
              <h1 className="font-bold text-lg">JEEV-1-SETU</h1>
              <p className="text-xs text-muted-foreground">
                {user.fullName || user.healthId} • {user.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button onClick={onLogout} variant="outline" className="rounded-full border-border bg-transparent">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Module Navigation */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {[
            { id: "view", label: "📋 View History", gradient: "btn-gradient" },
            { id: "records", label: "🔍 Search Records", gradient: "btn-gradient" },
            { id: "add", label: "➕ Add Record", gradient: "btn-gradient-secondary" },
            { id: "analytics", label: "📊 Analytics", gradient: "btn-gradient" },
          ].map((mod) => (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod.id as any)}
              className={`p-4 rounded-2xl transition-all font-medium ${
                activeModule === mod.id
                  ? `${mod.gradient} text-white shadow-lg`
                  : "bg-card border border-border text-foreground hover:bg-secondary/50"
              }`}
            >
              {mod.label}
            </button>
          ))}
        </div>

        {/* Module Content */}
        <div>
          {activeModule === "view" && <PatientHistoryModule user={user} patientRecords={patientRecords} />}
          {activeModule === "records" && <MedicalRecordsDashboard user={user} />}
          {activeModule === "add" && (
            <AddHistoryModule
              user={user}
              onRecordAdd={(record) => {
                setPatientRecords([...patientRecords, record])
              }}
            />
          )}
          {activeModule === "analytics" && <AnalyticsModule user={user} />}
        </div>
      </main>
    </div>
  )
}
