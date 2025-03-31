import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Download, Star, LayoutTemplateIcon as Template } from "lucide-react"
import Link from "next/link"

export default function ConversationDetailPage({ params }: { params: { id: string } }) {
  // This would normally fetch from the database
  const conversation = {
    id: params.id,
    templateName: "Blog Post Generator",
    templateId: "1",
    date: "2025-03-28T14:30:00Z",
    prompt: `Write a blog post about artificial intelligence with an informative tone. The post should be 1000 words long and include 3 sections.

Include the following key points:
- History of AI
- Current applications
- Future possibilities

Target audience: tech professionals`,
    response: `# The Evolution and Impact of Artificial Intelligence

Artificial Intelligence (AI) has transformed from a concept in science fiction to a reality that permeates our daily lives. This blog post explores the journey of AI from its inception to its current applications and future possibilities, providing tech professionals with a comprehensive overview of this revolutionary technology.

## The History of AI: From Concept to Reality

The concept of artificial intelligence dates back to ancient myths of mechanical beings endowed with intelligence or consciousness. However, the formal academic field of AI research was founded in 1956 at a workshop held at Dartmouth College. The early pioneers, including John McCarthy, Marvin Minsky, Allen Newell, and Herbert Simon, were optimistic about AI's potential, famously predicting that machines would be capable of any work a human could do within a generation.

The journey of AI development has been marked by cycles of optimism followed by disappointment and funding cuts, known as "AI winters." The field has experienced several such cycles, with breakthroughs followed by periods of reduced interest and investment. Despite these challenges, researchers persisted, and by the late 1990s and early 2000s, AI began to solve problems in limited domains.

The real breakthrough came with the advent of machine learning, particularly deep learning, which allowed computers to learn from experience rather than through explicit programming. This shift, coupled with the exponential growth in computing power and the availability of vast amounts of data, has led to the AI renaissance we are experiencing today.

## Current Applications: AI in Today's World

AI has permeated virtually every industry, transforming how we work, communicate, and live. Here are some of the most significant current applications:

1. **Healthcare**: AI is revolutionizing healthcare through improved diagnostic accuracy, personalized treatment plans, and drug discovery. Machine learning algorithms can analyze medical images to detect diseases like cancer often with greater accuracy than human radiologists. AI is also being used to predict patient outcomes and recommend treatment options based on vast databases of medical knowledge.

2. **Finance**: In the financial sector, AI is used for fraud detection, algorithmic trading, and customer service. Machine learning models can identify unusual patterns that might indicate fraudulent activity, while natural language processing powers chatbots that handle customer inquiries.

3. **Transportation**: The development of autonomous vehicles represents one of the most visible applications of AI. Companies like Tesla, Waymo, and traditional automakers are investing heavily in self-driving technology, which relies on a combination of computer vision, sensor fusion, and decision-making algorithms.

4. **Business and Productivity**: AI is streamlining business operations through process automation, predictive analytics, and enhanced decision-making. Tools like intelligent document processing can extract information from unstructured data, while predictive maintenance can anticipate equipment failures before they occur.

5. **Entertainment and Content Creation**: AI is being used to create and recommend content across various platforms. Streaming services use recommendation algorithms to suggest movies and music, while AI tools are increasingly being used to generate art, music, and even written content.

## Future Possibilities: The Road Ahead

As AI continues to evolve, its potential applications and impact on society will expand. Here are some exciting possibilities for the future:

1. **General AI**: While current AI systems are specialized for specific tasks (narrow AI), researchers are working toward developing Artificial General Intelligence (AGI) – systems that can understand, learn, and apply knowledge across a wide range of tasks at a level equal to or beyond human capabilities.

2. **Enhanced Human-AI Collaboration**: Rather than replacing humans, future AI systems will likely work alongside us, augmenting our capabilities. This collaborative approach could lead to unprecedented levels of productivity and innovation.

3. **Personalized Education**: AI could revolutionize education by providing personalized learning experiences tailored to each student's needs, learning style, and pace, potentially addressing educational inequalities and improving outcomes.

4. **Advanced Healthcare**: Future AI systems might predict and prevent diseases before symptoms appear, design custom treatments based on an individual's genetic makeup, and assist in complex surgeries with precision beyond human capabilities.

5. **Environmental Solutions**: AI could help address climate change and environmental degradation through optimized energy consumption, improved climate modeling, and the development of new sustainable technologies.

However, these advancements come with significant ethical, social, and regulatory challenges. Issues such as privacy, bias, job displacement, and the concentration of power must be addressed to ensure that AI benefits humanity as a whole.

## Conclusion

Artificial Intelligence has come a long way from its conceptual beginnings to become a transformative force in our world. For tech professionals, understanding AI's history, current applications, and future possibilities is essential for navigating the rapidly evolving technological landscape.

As we move forward, the responsible development and deployment of AI will require collaboration between technologists, policymakers, ethicists, and society at large. By approaching AI with both enthusiasm for its potential and awareness of its challenges, we can harness this powerful technology to create a better future for all.`,
    promptLength: 245,
    responseLength: 4250,
  }

  const formattedDate = new Date(conversation.date).toLocaleString()

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Link href="/history" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to History
        </Link>
      </div>
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Conversation Detail</h1>
          <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Template className="mr-1 h-4 w-4" />
              <span>{conversation.templateName}</span>
            </div>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Prompt</CardTitle>
              <CardDescription>The prompt that was sent to the AI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md bg-muted p-4 font-mono text-sm whitespace-pre-wrap">{conversation.prompt}</div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-between w-full">
                <div className="text-sm text-muted-foreground">{conversation.promptLength} characters</div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Response</CardTitle>
              <CardDescription>The response generated by the AI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md bg-muted p-4 text-sm max-h-[600px] overflow-y-auto whitespace-pre-wrap">
                {conversation.response}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-between w-full">
                <div className="text-sm text-muted-foreground">{conversation.responseLength} characters</div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Star className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="flex justify-end space-x-4">
          <Link href={`/templates/${conversation.templateId}`}>
            <Button variant="outline">Use Template Again</Button>
          </Link>
          <Button>Create Similar Template</Button>
        </div>
      </div>
    </div>
  )
}

