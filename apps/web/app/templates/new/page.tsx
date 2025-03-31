import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewTemplatePage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Link href="/dashboard" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Template</h1>
          <p className="text-muted-foreground">Create a new prompt template that you can use and share.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Template Name</Label>
              <Input id="name" placeholder="E.g., Blog Post Generator" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe what this template does and how to use it" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prompt">Prompt Template</Label>
              <Textarea
                id="prompt"
                className="min-h-[200px] font-mono"
                placeholder="Write your prompt template here. Use {{variables}} for placeholders."
                defaultValue={`Write a blog post about {{topic}} with a {{tone}} tone. The post should be {{length}} words long and include {{num_sections}} sections.

Include the following key points:
{{key_points}}

Target audience: {{audience}}
`}
              />
              <p className="text-sm text-muted-foreground">
                Use double curly braces for variables, e.g., {"{{variable}}"}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="public" />
              <Label htmlFor="public">Make this template public</Label>
            </div>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Template Variables</CardTitle>
                <CardDescription>Define the variables used in your template</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="var-topic">topic</Label>
                  <Input id="var-topic" placeholder="Default value or description" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="var-tone">tone</Label>
                  <Input id="var-tone" placeholder="Default value or description" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="var-length">length</Label>
                  <Input id="var-length" placeholder="Default value or description" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="var-num_sections">num_sections</Label>
                  <Input id="var-num_sections" placeholder="Default value or description" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="var-key_points">key_points</Label>
                  <Textarea id="var-key_points" placeholder="Default value or description" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="var-audience">audience</Label>
                  <Input id="var-audience" placeholder="Default value or description" />
                </div>
                <Button variant="outline" className="w-full">
                  Add Variable
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>AI Optimization</CardTitle>
                <CardDescription>Let AI help you optimize your prompt template</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="optimize">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="optimize">Optimize</TabsTrigger>
                    <TabsTrigger value="analyze">Analyze</TabsTrigger>
                  </TabsList>
                  <TabsContent value="optimize" className="space-y-4 pt-4">
                    <p className="text-sm text-muted-foreground">
                      AI will suggest improvements to your prompt template to get better results.
                    </p>
                    <Button className="w-full">Optimize Template</Button>
                  </TabsContent>
                  <TabsContent value="analyze" className="space-y-4 pt-4">
                    <p className="text-sm text-muted-foreground">
                      AI will analyze your template and provide feedback on its effectiveness.
                    </p>
                    <Button className="w-full">Analyze Template</Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <Button variant="outline">Save as Draft</Button>
          <Button>Create Template</Button>
        </div>
      </div>
    </div>
  )
}

