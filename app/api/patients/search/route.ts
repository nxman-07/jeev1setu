import { searchPatientByHealthId, getPatientRecords } from "@/lib/auth-service"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const healthId = searchParams.get("healthId")

    if (!healthId) {
      return Response.json({ success: false, message: "Health ID required" }, { status: 400 })
    }

    const result = searchPatientByHealthId(healthId)

    if (result.success) {
      const records = getPatientRecords(healthId)
      return Response.json({ success: true, patient: result.patient, records, message: "Patient found" })
    }

    return Response.json(result)
  } catch (error) {
    return Response.json({ success: false, message: "Search failed" }, { status: 500 })
  }
}
