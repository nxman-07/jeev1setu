import { addRecord, getRecordsByHealthId } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const healthId = searchParams.get("healthId")

    if (!healthId) {
      return Response.json({ success: false, message: "Health ID required" }, { status: 400 })
    }

    const records = getRecordsByHealthId(healthId)
    console.log("[v0] Retrieved", records.length, "records for Health ID:", healthId)
    return Response.json({ success: true, records, message: "Records retrieved" })
  } catch (error) {
    console.error("[v0] Error fetching records:", error)
    return Response.json({ success: false, message: "Failed to fetch records" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { email, healthId, recordData } = await request.json()

    if (!healthId || !recordData) {
      return Response.json({ success: false, message: "Health ID and record data required" }, { status: 400 })
    }

    const newRecord = {
      id: `record_${Date.now()}`,
      email,
      healthId,
      patientHealthId: healthId,
      type: recordData.type || "consultation",
      title: recordData.title || "Medical Record",
      description: recordData.description || "",
      createdAt: new Date().toISOString(),
      data: recordData,
    }

    addRecord(newRecord)
    console.log("[v0] Record saved:", newRecord.id, "for Health ID:", healthId)

    return Response.json(
      {
        success: true,
        record: newRecord,
        message: "Record saved and synced to cloud",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Error saving record:", error)
    return Response.json({ success: false, message: "Failed to save record" }, { status: 500 })
  }
}
