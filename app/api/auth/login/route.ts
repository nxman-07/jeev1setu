import { getUser } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return Response.json({ success: false, message: "Email and password required" }, { status: 400 })
    }

    const user = getUser(email)

    if (!user) {
      return Response.json({ success: false, message: "Email not found" }, { status: 401 })
    }

    console.log("[v0] User logged in:", email)
    return Response.json({ success: true, user, message: "Login successful" })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return Response.json({ success: false, message: "Login failed" }, { status: 500 })
  }
}
