"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "@/components/theme-toggle"

interface AuthScreenProps {
  onAuthSuccess: (user: any) => void
}

export function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [showAuth, setShowAuth] = useState(false)
  const [activeTab, setActiveTab] = useState<"patient" | "hospital">("hospital")
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
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
    setError("")
  }

  const handleHospitalLogin = async () => {
    if (!formData.email || !formData.password) {
      setError("Email and password required")
      return
    }

    setLoading(true)
    try {
      if (isLogin) {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        })
        const data = await response.json()
        if (data.success) {
          onAuthSuccess(data.user)
        } else {
          setError(data.message || "Login failed")
        }
      } else {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            type: "hospital",
            hospitalName: formData.hospitalName,
            role: formData.role,
          }),
        })
        const data = await response.json()
        if (data.success) {
          onAuthSuccess(data.user)
        } else {
          setError(data.message || "Signup failed")
        }
      }
    } catch (err) {
      setError("Authentication failed")
    } finally {
      setLoading(false)
    }
  }

  const handlePatientRegister = async () => {
    if (!formData.email || !formData.password || !formData.fullName) {
      setError("All fields required")
      return
    }

    setLoading(true)
    try {
      if (isLogin) {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        })
        const data = await response.json()
        if (data.success) {
          onAuthSuccess(data.user)
        } else {
          setError(data.message || "Login failed")
        }
      } else {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            fullName: formData.fullName,
            type: "patient",
          }),
        })
        const data = await response.json()
        if (data.success) {
          onAuthSuccess(data.user)
        } else {
          setError(data.message || "Signup failed")
        }
      }
    } catch (err) {
      setError("Authentication failed")
    } finally {
      setLoading(false)
    }
  }

  if (!showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background text-foreground">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jeevonesetu-dwgxE4lM53FRMKkjDrcpasrbG8feoE.jpg"
                alt="JEEV-1-SETU Logo"
                className="h-12 w-auto rounded-xl"
              />
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button onClick={() => setShowAuth(true)} className="btn-gradient btn-rounded text-white font-semibold">
                Get Started
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance leading-tight">
                India's First Unified
                <span className="block bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">
                  Health Management ERP
                </span>
              </h1>
              <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
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
                className="btn-gradient-secondary btn-rounded text-white font-semibold"
              >
                Register as Patient
              </Button>
              <Button
                onClick={() => {
                  setActiveTab("hospital")
                  setShowAuth(true)
                }}
                variant="outline"
                className="border-border bg-transparent hover:bg-secondary/50 font-semibold rounded-full px-8 h-12 text-base"
              >
                Hospital Login
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-balance">What Makes JEEV-1-SETU Different</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group rounded-2xl bg-card border border-border p-6 hover:border-red-500/50 transition-all hover:shadow-lg hover:shadow-red-500/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
                <p className="text-muted-foreground text-sm">
                  One unique ID accessible across all partnered hospitals nationwide
                </p>
              </div>

              <div className="group rounded-2xl bg-card border border-border p-6 hover:border-red-500/50 transition-all hover:shadow-lg hover:shadow-red-500/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
                <p className="text-muted-foreground text-sm">
                  Interoperable with all healthcare systems using FHIR standards
                </p>
              </div>

              <div className="group rounded-2xl bg-card border border-border p-6 hover:border-red-500/50 transition-all hover:shadow-lg hover:shadow-red-500/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
                <p className="text-muted-foreground text-sm">HTTPS encrypted, role-based access control, audit logs</p>
              </div>

              <div className="group rounded-2xl bg-card border border-border p-6 hover:border-red-500/50 transition-all hover:shadow-lg hover:shadow-red-500/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
                <p className="text-muted-foreground text-sm">Cloud-based, version-controlled, auto-synced records</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold text-balance">Join the Healthcare Revolution</h2>
              <p className="text-xl text-muted-foreground text-balance">
                Be part of India's first unified health management platform
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                onClick={() => {
                  setActiveTab("patient")
                  setShowAuth(true)
                }}
                className="btn-gradient-secondary btn-rounded text-white font-semibold"
              >
                Register as Patient
              </Button>
              <Button
                onClick={() => {
                  setActiveTab("hospital")
                  setShowAuth(true)
                }}
                variant="outline"
                className="border-border bg-transparent hover:bg-secondary/50 font-semibold rounded-full px-8 h-12 text-base"
              >
                Hospital Login
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/50 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center text-muted-foreground text-sm space-y-2">
            <p>Secured with HTTPS Encryption | FHIR Compliant | Role-Based Access Control</p>
            <p>Cloud-based Infrastructure | Version Controlled | Enterprise-Grade Security</p>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-start mb-4">
          <div className="text-center flex-1">
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
          <ThemeToggle />
        </div>

        {/* Tab Selection */}
        <div className="flex gap-2 bg-secondary/40 p-1 rounded-full">
          <button
            onClick={() => setActiveTab("hospital")}
            className={`flex-1 py-2 px-4 rounded-full font-medium transition-all text-sm ${
              activeTab === "hospital" ? "btn-gradient text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Hospital
          </button>
          <button
            onClick={() => setActiveTab("patient")}
            className={`flex-1 py-2 px-4 rounded-full font-medium transition-all text-sm ${
              activeTab === "patient"
                ? "btn-gradient-secondary text-white"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Patient
          </button>
        </div>

        {/* Login/Register Toggle */}
        <div className="flex gap-2 bg-secondary/40 p-1 rounded-full">
          <button
            onClick={() => {
              setIsLogin(true)
              setError("")
            }}
            className={`flex-1 py-2 px-4 rounded-full font-medium transition-all text-sm ${
              isLogin ? "btn-gradient text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsLogin(false)
              setError("")
            }}
            className={`flex-1 py-2 px-4 rounded-full font-medium transition-all text-sm ${
              !isLogin ? "btn-gradient-secondary text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Register
          </button>
        </div>

        {/* Auth Forms */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>{isLogin ? "Login" : "Register"}</CardTitle>
            <CardDescription>
              {activeTab === "hospital"
                ? isLogin
                  ? "Access patient records and manage medical history"
                  : "Register your hospital account"
                : isLogin
                  ? "Login to your health portal"
                  : "Register once, get your universal Health ID"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Common Fields */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="user@example.com"
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

            {/* Hospital-Specific Fields */}
            {activeTab === "hospital" && !isLogin && (
              <>
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
                  <Label htmlFor="role">Role</Label>
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
              </>
            )}

            {/* Patient-Specific Fields */}
            {activeTab === "patient" && !isLogin && (
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
            )}

            <Button
              onClick={activeTab === "hospital" ? handleHospitalLogin : handlePatientRegister}
              disabled={loading}
              className="w-full btn-gradient btn-rounded text-white font-semibold"
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Register"}
            </Button>
          </CardContent>
        </Card>

        {/* Back to Landing */}
        <button
          onClick={() => setShowAuth(false)}
          className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}
