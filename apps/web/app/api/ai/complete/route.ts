import { type NextRequest, NextResponse } from "next/server"
import { completePrompt } from "@/lib/ai"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { partialPrompt, context } = body

    if (!partialPrompt) {
      return NextResponse.json({ error: "Partial prompt is required" }, { status: 400 })
    }

    const completedPrompt = await completePrompt(partialPrompt, context)

    return NextResponse.json({ completedPrompt })
  } catch (error) {
    console.error("Error completing prompt:", error)
    return NextResponse.json({ error: "Failed to complete prompt" }, { status: 500 })
  }
}

