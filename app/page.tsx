"use client"

import { useState } from "react"
import { AuthScreen } from "@/components/auth-screen"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function Home() {
  const [user, setUser] = useState<any>(null)

  if (!user) {
    return <AuthScreen onAuthSuccess={setUser} />
  }

  return <DashboardLayout user={user} onLogout={() => setUser(null)} />
}
