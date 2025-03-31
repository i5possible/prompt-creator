import { type NextRequest, NextResponse } from "next/server"
import { analyzePrompt } from "@/lib/ai"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt } = body

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const analysis = await analyzePrompt(prompt)

    return NextResponse.json({ analysis })
  } catch (error) {
    console.error("Error analyzing prompt:", error)
    return NextResponse.json({ error: "Failed to analyze prompt" }, { status: 500 })
  }
}

