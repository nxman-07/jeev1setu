// In-memory user store (simulating cloud database)
// In production, this would connect to Supabase or similar

interface User {
  id: string
  email: string
  type: "patient" | "hospital"
  fullName?: string
  healthId?: string
  hospitalName?: string
  role?: string
  createdAt: string
  medicalRecords?: any[]
}

interface AuthResponse {
  success: boolean
  user?: User
  message: string
}

// Simulated cloud storage
const STORAGE_KEY = "jeev_users"
const RECORDS_KEY = "jeev_records"

function getUsers(): Record<string, User> {
  if (typeof window === "undefined") return {}
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : {}
}

function saveUsers(users: Record<string, User>) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
  }
}

function getRecords(): any[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(RECORDS_KEY)
  return stored ? JSON.parse(stored) : []
}

function saveRecords(records: any[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(RECORDS_KEY, JSON.stringify(records))
  }
}

export function signUp(
  email: string,
  password: string,
  fullName: string,
  type: "patient" | "hospital",
  additionalData?: any,
): AuthResponse {
  const users = getUsers()

  if (users[email]) {
    return { success: false, message: "Email already registered" }
  }

  const healthId = type === "patient" ? `JEEV${Math.random().toString(36).substr(2, 9).toUpperCase()}` : undefined

  const user: User = {
    id: `user_${Date.now()}`,
    email,
    type,
    fullName: type === "patient" ? fullName : additionalData?.hospitalName,
    healthId,
    hospitalName: type === "hospital" ? additionalData?.hospitalName : undefined,
    role: type === "hospital" ? additionalData?.role : undefined,
    createdAt: new Date().toISOString(),
    medicalRecords: [],
  }

  users[email] = user
  saveUsers(users)

  return { success: true, user, message: "Registration successful" }
}

export function login(email: string, password: string): AuthResponse {
  const users = getUsers()

  if (!users[email]) {
    return { success: false, message: "Email not found" }
  }

  const user = users[email]
  return { success: true, user, message: "Login successful" }
}

export function addMedicalRecord(email: string, record: any): AuthResponse {
  const users = getUsers()
  const records = getRecords()

  if (!users[email]) {
    return { success: false, message: "User not found" }
  }

  const newRecord = {
    id: `record_${Date.now()}`,
    ...record,
    createdAt: new Date().toISOString(),
    email,
  }

  records.push(newRecord)
  saveRecords(records)

  const user = users[email]
  if (!user.medicalRecords) user.medicalRecords = []
  user.medicalRecords.push(newRecord)
  users[email] = user
  saveUsers(users)

  return { success: true, user, message: "Record saved and synced to cloud" }
}

export function searchPatientByHealthId(healthId: string): { success: boolean; patient?: User; message: string } {
  const users = getUsers()

  for (const email in users) {
    if (users[email].healthId === healthId) {
      return { success: true, patient: users[email], message: "Patient found" }
    }
  }

  return { success: false, message: "Patient not found" }
}

export function getPatientRecords(healthId: string): any[] {
  const records = getRecords()
  return records.filter((r) => r.healthId === healthId || r.patientHealthId === healthId)
}

export function updatePatientRecord(email: string, recordId: string, updates: any): AuthResponse {
  const users = getUsers()
  const records = getRecords()

  if (!users[email]) {
    return { success: false, message: "User not found" }
  }

  const recordIndex = records.findIndex((r) => r.id === recordId)
  if (recordIndex === -1) {
    return { success: false, message: "Record not found" }
  }

  records[recordIndex] = { ...records[recordIndex], ...updates, updatedAt: new Date().toISOString() }
  saveRecords(records)

  return { success: true, user: users[email], message: "Record updated and synced" }
}
