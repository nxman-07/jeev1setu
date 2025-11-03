import { saveUser, getUser } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { email, password, fullName, type, hospitalName, role } = await request.json()

    if (!email || !password) {
      return Response.json({ success: false, message: "Email and password required" }, { status: 400 })
    }

    if (getUser(email)) {
      return Response.json({ success: false, message: "Email already registered" }, { status: 400 })
    }

    const healthId = type === "patient" ? `JEEV${Math.random().toString(36).substr(2, 9).toUpperCase()}` : undefined

    const user = {
      id: `user_${Date.now()}`,
      email,
      type,
      fullName: type === "patient" ? fullName : hospitalName,
      healthId,
      hospitalName: type === "hospital" ? hospitalName : undefined,
      role: type === "hospital" ? role : undefined,
      createdAt: new Date().toISOString(),
      medicalRecords: [],
    }

    saveUser(email, user)
    console.log("[v0] User registered:", email, "Health ID:", healthId)

    return Response.json({ success: true, user, message: "Registration successful" }, { status: 201 })
  } catch (error) {
    console.error("[v0] Signup error:", error)
    return Response.json({ success: false, message: "Signup failed" }, { status: 500 })
  }
}
