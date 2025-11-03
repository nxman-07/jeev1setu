import { getPatientRecords } from "@/lib/auth-service"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const healthId = searchParams.get("healthId")

    if (!healthId) {
      return Response.json({ success: false, message: "Health ID required" }, { status: 400 })
    }

    const records = getPatientRecords(healthId)
    return Response.json({ success: true, records, message: "Records retrieved" })
  } catch (error) {
    console.error("[v0] Error fetching records:", error)
    return Response.json({ success: false, message: "Failed to fetch records" }, { status: 500 })
  }
}
