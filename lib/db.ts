// Server-side database store (using in-memory storage + localStorage fallback)
// In production, replace with Supabase or similar database

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

interface MedicalRecord {
  id: string
  email: string
  healthId?: string
  patientHealthId?: string
  type: string
  title: string
  description: string
  createdAt: string
  updatedAt?: string
  data?: any
}

// In-memory storage (acts as cloud database)
const usersStore: Record<string, User> = {}
const recordsStore: MedicalRecord[] = []

// Initialize with any existing data
export function initializeDatabase() {
  // This would load from actual database in production
  return { users: usersStore, records: recordsStore }
}

export function getAllUsers(): Record<string, User> {
  return usersStore
}

export function getUser(email: string): User | null {
  return usersStore[email] || null
}

export function saveUser(email: string, user: User): void {
  usersStore[email] = user
  console.log("[v0] User saved to database:", email)
}

export function getAllRecords(): MedicalRecord[] {
  return recordsStore
}

export function addRecord(record: MedicalRecord): void {
  recordsStore.push(record)
  console.log("[v0] Record added to database:", record.id)
}

export function getRecordsByHealthId(healthId: string): MedicalRecord[] {
  return recordsStore.filter((r) => r.healthId === healthId || r.patientHealthId === healthId)
}

export function updateRecord(recordId: string, updates: any): boolean {
  const index = recordsStore.findIndex((r) => r.id === recordId)
  if (index !== -1) {
    recordsStore[index] = { ...recordsStore[index], ...updates, updatedAt: new Date().toISOString() }
    console.log("[v0] Record updated:", recordId)
    return true
  }
  return false
}

export function findUserByHealthId(healthId: string): User | null {
  for (const email in usersStore) {
    if (usersStore[email].healthId === healthId) {
      return usersStore[email]
    }
  }
  return null
}
