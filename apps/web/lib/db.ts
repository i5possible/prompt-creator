import { createClient } from "@supabase/supabase-js"

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Template types
export type Template = {
  id: string
  title: string
  description: string
  prompt: string
  variables: Record<string, string>
  is_public: boolean
  user_id: string
  created_at: string
  updated_at: string
  usage_count: number
}

export type TemplateShare = {
  id: string
  template_id: string
  user_id: string
  shared_with_id: string
  created_at: string
}

export type Conversation = {
  id: string
  template_id: string
  user_id: string
  prompt: string
  response: string
  created_at: string
}

// Template functions
export async function getTemplates(userId: string) {
  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })

  if (error) throw error
  return data as Template[]
}

export async function getTemplateById(id: string) {
  const { data, error } = await supabase.from("templates").select("*").eq("id", id).single()

  if (error) throw error
  return data as Template
}

export async function createTemplate(template: Omit<Template, "id" | "created_at" | "updated_at" | "usage_count">) {
  const { data, error } = await supabase.from("templates").insert([template]).select().single()

  if (error) throw error
  return data as Template
}

export async function updateTemplate(id: string, updates: Partial<Template>) {
  const { data, error } = await supabase
    .from("templates")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data as Template
}

export async function deleteTemplate(id: string) {
  const { error } = await supabase.from("templates").delete().eq("id", id)

  if (error) throw error
  return true
}

// Conversation functions
export async function getConversations(userId: string) {
  const { data, error } = await supabase
    .from("conversations")
    .select("*, templates(title)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function getConversationById(id: string) {
  const { data, error } = await supabase.from("conversations").select("*, templates(title)").eq("id", id).single()

  if (error) throw error
  return data
}

export async function createConversation(conversation: Omit<Conversation, "id" | "created_at">) {
  const { data, error } = await supabase.from("conversations").insert([conversation]).select().single()

  if (error) throw error
  return data
}

// Template sharing functions
export async function shareTemplate(templateId: string, userId: string, sharedWithId: string) {
  const { data, error } = await supabase
    .from("template_shares")
    .insert([
      {
        template_id: templateId,
        user_id: userId,
        shared_with_id: sharedWithId,
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getSharedTemplates(userId: string) {
  const { data, error } = await supabase.from("template_shares").select("*, templates(*)").eq("shared_with_id", userId)

  if (error) throw error
  return data
}

// Public templates
export async function getPublicTemplates() {
  const { data, error } = await supabase
    .from("templates")
    .select("*, profiles(username)")
    .eq("is_public", true)
    .order("usage_count", { ascending: false })

  if (error) throw error
  return data
}

