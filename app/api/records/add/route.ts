import { addMedicalRecord } from "@/lib/auth-service"

export async function POST(request: Request) {
  try {
    const { email, record } = await request.json()

    if (!email || !record) {
      return Response.json({ success: false, message: "Email and record data required" }, { status: 400 })
    }

    const result = addMedicalRecord(email, record)

    return Response.json(result)
  } catch (error) {
    return Response.json({ success: false, message: "Failed to add record" }, { status: 500 })
  }
}
