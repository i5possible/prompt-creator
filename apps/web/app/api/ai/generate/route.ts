import { type NextRequest, NextResponse } from "next/server"
import { generateContent } from "@/lib/ai"
import { createConversation } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, templateId } = body

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const content = await generateContent(prompt)

    // In a real app, you would get the user ID from the session
    const userId = "user-123"

    // Save the conversation to the database if templateId is provided
    if (templateId) {
      await createConversation({
        template_id: templateId,
        user_id: userId,
        prompt,
        response: content,
      })
    }

    return NextResponse.json({ content })
  } catch (error) {
    console.error("Error generating content:", error)
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 })
  }
}

