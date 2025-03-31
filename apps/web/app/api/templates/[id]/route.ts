import { type NextRequest, NextResponse } from "next/server"
import { getTemplateById, updateTemplate, deleteTemplate } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const template = await getTemplateById(params.id)

    return NextResponse.json({ template })
  } catch (error) {
    console.error("Error fetching template:", error)
    return NextResponse.json({ error: "Failed to fetch template" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { title, description, prompt, variables, is_public } = body

    const template = await updateTemplate(params.id, {
      title,
      description,
      prompt,
      variables,
      is_public,
    })

    return NextResponse.json({ template })
  } catch (error) {
    console.error("Error updating template:", error)
    return NextResponse.json({ error: "Failed to update template" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteTemplate(params.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting template:", error)
    return NextResponse.json({ error: "Failed to delete template" }, { status: 500 })
  }
}

