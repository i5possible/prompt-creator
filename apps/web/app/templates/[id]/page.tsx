import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Share2, Star } from "lucide-react"
import Link from "next/link"

export default function TemplatePage({ params }: { params: { id: string } }) {
  // This would normally fetch from the database
  const template = {
    id: params.id,
    title: "Blog Post Generator",
    description: "Generate blog posts with a specific topic and tone",
    prompt: `Write a blog post about {{topic}} with a {{tone}} tone. The post should be {{length}} words long and include {{num_sections}} sections.

Include the following key points:
{{key_points}}

Target audience: {{audience}}`,
    variables: {
      topic: "artificial intelligence",
      tone: "informative",
      length: "1000",
      num_sections: "3",
      key_points: "- History of AI\n- Current applications\n- Future possibilities",
      audience: "tech professionals",
    },
    isPublic: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    usageCount: 15,
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Link href="/dashboard" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>
      <div className="flex flex-col space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{template.title}</h1>
            <p className="text-muted-foreground">{template.description}</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon">
              <Star className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Template Variables</CardTitle>
                <CardDescription>Fill in the variables to generate your prompt</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(template.variables).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={`var-${key}`}>{key}</Label>
                    {key === "key_points" ? (
                      <Textarea id={`var-${key}`} defaultValue={value as string} rows={3} />
                    ) : (
                      <Input id={`var-${key}`} defaultValue={value as string} />
                    )}
                  </div>
                ))}
                <Button className="w-full">Generate Prompt</Button>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Tabs defaultValue="preview">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="template">Template</TabsTrigger>
                <TabsTrigger value="result">Result</TabsTrigger>
              </TabsList>
              <TabsContent value="preview" className="space-y-4 pt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="rounded-md bg-muted p-4 font-mono text-sm">
                      <p>
                        Write a blog post about artificial intelligence with a informative tone. The post should be 1000
                        words long and include 3 sections.
                      </p>
                      <p className="mt-2">Include the following key points:</p>
                      <ul className="ml-4 list-disc">
                        <li>History of AI</li>
                        <li>Current applications</li>
                        <li>Future possibilities</li>
                      </ul>
                      <p className="mt-2">Target audience: tech professionals</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="template" className="space-y-4 pt-4">
                <Card>
                  <CardContent className="pt-6">
                    <Textarea className="min-h-[300px] font-mono" value={template.prompt} readOnly />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="result" className="space-y-4 pt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="rounded-md bg-muted p-4">
                      <h2 className="mb-4 text-xl font-bold">The Evolution and Impact of Artificial Intelligence</h2>
                      <p className="mb-2">
                        This is where the AI-generated content based on your prompt template and variables would appear.
                        Click "Generate Prompt" and then "Generate Content" to see the result.
                      </p>
                      <Button className="mt-4">Generate Content</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <Card>
              <CardHeader>
                <CardTitle>AI Completion</CardTitle>
                <CardDescription>Let AI complete your prompt with minimal input</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter a brief description of what you want, and AI will complete the prompt..."
                  className="min-h-[100px]"
                />
                <Button className="w-full">Complete with AI</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

