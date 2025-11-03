import { signUp } from "@/lib/auth-service"

export async function POST(request: Request) {
  try {
    const { email, password, fullName, type, hospitalName, role } = await request.json()

    if (!email || !password) {
      return Response.json({ success: false, message: "Email and password required" }, { status: 400 })
    }

    const result = signUp(email, password, fullName, type, { hospitalName, role })

    return Response.json(result)
  } catch (error) {
    return Response.json({ success: false, message: "Signup failed" }, { status: 500 })
  }
}
