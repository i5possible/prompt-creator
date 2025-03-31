import { generateText } from "ai"
import { deepseek } from "@ai-sdk/deepseek"

// Function to optimize a prompt template
export async function optimizePrompt(prompt: string) {
  const { text } = await generateText({
    model: deepseek("deepseek-chat"),
    system:
      "You are an expert at creating effective AI prompts. Your task is to optimize the given prompt template to make it more effective, clear, and likely to produce high-quality results.",
    prompt: `Please optimize this prompt template to make it more effective:\n\n${prompt}\n\nProvide only the optimized prompt template without explanations.`,
  })

  return text
}

// Function to analyze a prompt template
export async function analyzePrompt(prompt: string) {
  const { text } = await generateText({
    model: deepseek("deepseek-chat"),
    system:
      "You are an expert at analyzing AI prompts. Your task is to provide constructive feedback on the given prompt template.",
    prompt: `Please analyze this prompt template and provide feedback on its effectiveness:\n\n${prompt}\n\nProvide a detailed analysis with specific suggestions for improvement.`,
  })

  return text
}

// Function to complete a prompt from minimal input
export async function completePrompt(partialPrompt: string, context = "") {
  const { text } = await generateText({
    model: deepseek("deepseek-chat"),
    system:
      "You are an expert at creating effective AI prompts. Your task is to expand a minimal input into a complete, detailed prompt.",
    prompt: `Based on this minimal input: "${partialPrompt}"${context ? `\nAnd this additional context: ${context}` : ""}\n\nCreate a complete, detailed prompt that would produce high-quality results from an AI model. The prompt should be comprehensive and well-structured.`,
  })

  return text
}

// Function to generate content from a prompt
export async function generateContent(prompt: string) {
  const { text } = await generateText({
    model: deepseek("deepseek-chat"),
    prompt: prompt,
  })

  return text
}

// Function to fill template with variables
export function fillTemplate(template: string, variables: Record<string, string>) {
  let filledTemplate = template

  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g")
    filledTemplate = filledTemplate.replace(regex, value)
  }

  return filledTemplate
}

// Function to extract variables from a template
export function extractVariables(template: string): string[] {
  const regex = /{{(.*?)}}/g
  const matches = template.matchAll(regex)
  const variables = new Set<string>()

  for (const match of matches) {
    if (match[1]) {
      variables.add(match[1].trim())
    }
  }

  return Array.from(variables)
}

