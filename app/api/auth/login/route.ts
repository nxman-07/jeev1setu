import { login } from "@/lib/auth-service"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return Response.json({ success: false, message: "Email and password required" }, { status: 400 })
    }

    const result = login(email, password)

    return Response.json(result)
  } catch (error) {
    return Response.json({ success: false, message: "Login failed" }, { status: 500 })
  }
}
