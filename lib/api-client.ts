export const apiClient = {
  // Auth endpoints
  async signup(email: string, password: string, fullName: string, type: "patient" | "hospital", additionalData?: any) {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, fullName, type, additionalData }),
    })
    return res.json()
  },

  async login(email: string, password: string) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    return res.json()
  },

  // Patient search endpoint
  async searchPatient(healthId: string) {
    console.log("[v0] Searching for patient with Health ID:", healthId)
    const res = await fetch(`/api/patients/search?healthId=${encodeURIComponent(healthId)}`)
    const data = await res.json()
    console.log("[v0] Search result:", data)
    return data
  },

  // Record management
  async addRecord(email: string, record: any) {
    console.log("[v0] Adding medical record for:", email)
    const res = await fetch("/api/records/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, record }),
    })
    const data = await res.json()
    console.log("[v0] Add record response:", data)
    return data
  },

  async getPatientRecords(healthId: string) {
    console.log("[v0] Fetching records for Health ID:", healthId)
    const res = await fetch(`/api/records?healthId=${encodeURIComponent(healthId)}`)
    return res.json()
  },
}
