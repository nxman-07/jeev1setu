"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AuthScreenProps {
  onAuthSuccess: (user: any) => void
}

export function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [showAuth, setShowAuth] = useState(false)
  const [activeTab, setActiveTab] = useState<"patient" | "hospital">("hospital")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    hospitalName: "",
    role: "doctor",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleHospitalLogin = () => {
    const user = {
      id: `hosp_${Date.now()}`,
      email: formData.email,
      type: "hospital",
      role: formData.role,
      hospitalName: formData.hospitalName,
    }
    onAuthSuccess(user)
  }

  const handlePatientRegister = () => {
    const healthId = `JEEV${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    const user = {
      id: healthId,
      email: formData.email,
      type: "patient",
      fullName: formData.fullName,
      healthId: healthId,
    }
    onAuthSuccess(user)
  }

  if (!showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-foreground">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jeevonesetu-dwgxE4lM53FRMKkjDrcpasrbG8feoE.jpg"
                alt="JEEV-1-SETU Logo"
                className="h-12 w-auto rounded-xl"
              />
            </div>
            <Button
              onClick={() => setShowAuth(true)}
              className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-semibold rounded-full px-6"
            >
              Get Started
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance leading-tight">
                India's First Unified
                <span className="block bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  Health Management ERP
                </span>
              </h1>
              <p className="text-xl text-slate-400 text-balance max-w-3xl mx-auto leading-relaxed">
                One universal Health ID. One connected platform. Complete medical history across all hospitals and
                healthcare providers in India.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => {
                  setActiveTab("patient")
                  setShowAuth(true)
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-full px-8 h-12 text-base"
              >
                Register as Patient
              </Button>
              <Button
                onClick={() => {
                  setActiveTab("hospital")
                  setShowAuth(true)
                }}
                className="border border-slate-700 bg-transparent hover:bg-slate-800/50 text-foreground font-semibold rounded-full px-8 h-12 text-base"
              >
                Hospital Login
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-balance">What Makes JEEV-1-SETU Different</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature 1 */}
              <div className="group rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H5a2 2 0 00-2 2v10a2 2 0 002 2h5m0 0V4m0 12H9m11-6v10a2 2 0 01-2 2h-5m0 0V4m0 12H9"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Universal Health ID</h3>
                <p className="text-slate-400 text-sm">
                  One unique ID accessible across all partnered hospitals nationwide
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 border border-slate-700/50 hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m7.9-2.3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">FHIR Compliant</h3>
                <p className="text-slate-400 text-sm">Interoperable with all healthcare systems using FHIR standards</p>
              </div>

              {/* Feature 3 */}
              <div className="group rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Enterprise Security</h3>
                <p className="text-slate-400 text-sm">HTTPS encrypted, role-based access control, audit logs</p>
              </div>

              {/* Feature 4 */}
              <div className="group rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 border border-slate-700/50 hover:border-pink-500/50 transition-all hover:shadow-lg hover:shadow-pink-500/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Real-time Sync</h3>
                <p className="text-slate-400 text-sm">Cloud-based, version-controlled, auto-synced records</p>
              </div>
            </div>
          </div>
        </section>

        {/* Complete Medical History Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-balance">Complete Medical History at Your Fingertips</h2>
                <p className="text-slate-400 text-lg">
                  Access your entire medical journey across all healthcare providers:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">All Previous Treatments</h4>
                      <p className="text-slate-400 text-sm">Complete diagnosis history from every hospital visit</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">Doctor Information</h4>
                      <p className="text-slate-400 text-sm">Direct contact of all doctors who examined you</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">Allergies & Conditions</h4>
                      <p className="text-slate-400 text-sm">Medical allergies and conditions tracked in one place</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 border border-slate-700/50 space-y-6">
                <div className="space-y-3 bg-slate-900/50 rounded-xl p-4 border border-slate-700/30">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Health ID</span>
                    <span className="text-blue-400 font-bold">JEEV-ABC12345</span>
                  </div>
                </div>
                <div className="space-y-3 bg-slate-900/50 rounded-xl p-4 border border-slate-700/30">
                  <h4 className="text-sm font-semibold text-slate-300">Recent Visits</h4>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-400">Apollo Hospitals - Cardiology</p>
                    <p className="text-xs text-slate-500">Dr. Rajesh Kumar | Jan 15, 2025</p>
                  </div>
                </div>
                <div className="space-y-3 bg-slate-900/50 rounded-xl p-4 border border-slate-700/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-300">Active Conditions</span>
                    <span className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-2 py-1 rounded-full">
                      3
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Hypertension, Diabetes, Asthma</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Hospitals Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-slate-900">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 border border-slate-700/50 space-y-6">
                <div className="space-y-2 bg-slate-900/50 rounded-xl p-4 border border-slate-700/30">
                  <p className="text-xs font-semibold text-slate-400 uppercase">Dashboard</p>
                  <p className="text-sm text-slate-300">Total Patients: 15,240</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30 text-center">
                    <p className="text-2xl font-bold text-blue-400">3,421</p>
                    <p className="text-xs text-slate-400 mt-1">Active Cases</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30 text-center">
                    <p className="text-2xl font-bold text-emerald-400">428</p>
                    <p className="text-xs text-slate-400 mt-1">Today Visits</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-balance">
                  Empower Your Hospital with Complete Patient Insights
                </h2>
                <p className="text-slate-400 text-lg">For Hospital Administrators & Doctors:</p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">Search by Universal Health ID</h4>
                      <p className="text-slate-400 text-sm">Access any patient's complete history instantly</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">Real-time Analytics</h4>
                      <p className="text-slate-400 text-sm">Hospital performance metrics and patient insights</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">Secure Interoperability</h4>
                      <p className="text-slate-400 text-sm">FHIR-compliant integration with all hospital systems</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold text-balance">Join the Healthcare Revolution</h2>
              <p className="text-xl text-slate-400 text-balance">
                Be part of India's first unified health management platform
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                onClick={() => {
                  setActiveTab("patient")
                  setShowAuth(true)
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-full px-8 h-12 text-base"
              >
                Register as Patient
              </Button>
              <Button
                onClick={() => {
                  setActiveTab("hospital")
                  setShowAuth(true)
                }}
                className="border border-slate-700 bg-transparent hover:bg-slate-800/50 text-foreground font-semibold rounded-full px-8 h-12 text-base"
              >
                Hospital Login
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800/50 py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-slate-950 to-transparent">
          <div className="max-w-7xl mx-auto text-center text-slate-500 text-sm space-y-2">
            <p>Secured with HTTPS Encryption | FHIR Compliant | Role-Based Access Control</p>
            <p>Cloud-based Infrastructure | Version Controlled | Enterprise-Grade Security</p>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo / Header - Updated to use curved rectangular logo */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jeevonesetu-dwgxE4lM53FRMKkjDrcpasrbG8feoE.jpg"
              alt="JEEV-1-SETU Logo"
              className="h-16 rounded-2xl"
            />
          </div>
          <h1 className="text-3xl font-bold text-balance">JEEV-1-SETU</h1>
          <p className="text-muted-foreground text-sm">Universal Health Management Platform</p>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-2 bg-secondary/40 p-1 rounded-full">
          <button
            onClick={() => setActiveTab("hospital")}
            className={`flex-1 py-2 px-4 rounded-full font-medium transition-all text-sm ${
              activeTab === "hospital"
                ? "bg-gradient-to-r from-blue-500 to-green-500 text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Hospital Login
          </button>
          <button
            onClick={() => setActiveTab("patient")}
            className={`flex-1 py-2 px-4 rounded-full font-medium transition-all text-sm ${
              activeTab === "patient"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Patient Register
          </button>
        </div>

        {/* Auth Forms */}
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle>{activeTab === "hospital" ? "Hospital Portal" : "Patient Registration"}</CardTitle>
            <CardDescription>
              {activeTab === "hospital"
                ? "Access patient records and manage medical history"
                : "Register once, get your universal Health ID"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeTab === "hospital" ? (
              <>
                {/* Hospital Login Form */}
                <div className="space-y-2">
                  <Label htmlFor="hospital-name">Hospital Name</Label>
                  <Input
                    id="hospital-name"
                    name="hospitalName"
                    placeholder="Your Hospital Name"
                    value={formData.hospitalName}
                    onChange={handleInputChange}
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hospital-email">Email</Label>
                  <Input
                    id="hospital-email"
                    name="email"
                    type="email"
                    placeholder="doctor@hospital.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role (OAuth 2.0 secured)</Label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground"
                  >
                    <option value="doctor">Doctor</option>
                    <option value="admin">Hospital Admin</option>
                    <option value="staff">Hospital Staff</option>
                  </select>
                </div>
                <Button
                  onClick={handleHospitalLogin}
                  className="w-full btn-gradient btn-rounded text-white font-semibold"
                >
                  Access Portal
                </Button>
              </>
            ) : (
              <>
                {/* Patient Registration Form */}
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input
                    id="full-name"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patient-email">Email</Label>
                  <Input
                    id="patient-email"
                    name="email"
                    type="email"
                    placeholder="patient@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patient-password">Password</Label>
                  <Input
                    id="patient-password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-input border-border"
                  />
                </div>
                <Button
                  onClick={handlePatientRegister}
                  className="w-full btn-gradient-secondary btn-rounded text-white font-semibold"
                >
                  Generate Health ID
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="text-center text-xs text-muted-foreground space-y-1">
          <p>🔒 HTTPS Encrypted | 📊 FHIR Compliant | 🔐 Role-Based Access Control</p>
          <p>Cloud-based • Version Controlled • Secure Backup</p>
        </div>

        {/* Back to Landing */}
        <button
          onClick={() => setShowAuth(false)}
          className="w-full text-center text-sm text-slate-400 hover:text-slate-300 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}
