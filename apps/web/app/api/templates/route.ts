import { type NextRequest, NextResponse } from "next/server"
import { createTemplate, getTemplates } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    // In a real app, you would get the user ID from the session
    const userId = "user-123"
    const templates = await getTemplates(userId)

    return NextResponse.json({ templates })
  } catch (error) {
    console.error("Error fetching templates:", error)
    return NextResponse.json({ error: "Failed to fetch templates" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, prompt, variables, is_public } = body

    // In a real app, you would get the user ID from the session
    const userId = "user-123"

    const template = await createTemplate({
      title,
      description,
      prompt,
      variables,
      is_public: is_public || false,
      user_id: userId,
    })

    return NextResponse.json({ template })
  } catch (error) {
    console.error("Error creating template:", error)
    return NextResponse.json({ error: "Failed to create template" }, { status: 500 })
  }
}

