import { findUserByHealthId, getRecordsByHealthId } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const healthId = searchParams.get("healthId")

    if (!healthId) {
      return Response.json({ success: false, message: "Health ID required" }, { status: 400 })
    }

    const patient = findUserByHealthId(healthId)

    if (!patient) {
      console.log("[v0] Patient not found with Health ID:", healthId)
      return Response.json({ success: false, message: "Patient not found" }, { status: 404 })
    }

    const records = getRecordsByHealthId(healthId)
    console.log("[v0] Patient found:", patient.email, "Records:", records.length)

    return Response.json({
      success: true,
      patient: {
        id: patient.id,
        email: patient.email,
        fullName: patient.fullName,
        healthId: patient.healthId,
        createdAt: patient.createdAt,
      },
      records,
      message: "Patient found",
    })
  } catch (error) {
    console.error("[v0] Search error:", error)
    return Response.json({ success: false, message: "Search failed" }, { status: 500 })
  }
}
