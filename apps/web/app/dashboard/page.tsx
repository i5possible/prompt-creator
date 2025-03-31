import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { TemplateCreateButton } from "@/components/dashboard/template-create-button"
import { TemplateItem } from "@/components/dashboard/template-item"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  // This would normally fetch from the database
  const templates = [
    {
      id: "1",
      title: "Blog Post Generator",
      description: "Generate blog posts with a specific topic and tone",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPublic: true,
      usageCount: 15,
    },
    {
      id: "2",
      title: "Product Description",
      description: "Create compelling product descriptions for e-commerce",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPublic: false,
      usageCount: 8,
    },
  ]

  const hasTemplates = templates.length > 0

  return (
    <DashboardShell>
      <DashboardHeader heading="Templates" text="Create and manage your prompt templates.">
        <TemplateCreateButton />
      </DashboardHeader>
      <Tabs defaultValue="my-templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="my-templates">My Templates</TabsTrigger>
          <TabsTrigger value="shared-with-me">Shared With Me</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
        <TabsContent value="my-templates" className="space-y-4">
          {hasTemplates ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <TemplateItem key={template.id} template={template} />
              ))}
            </div>
          ) : (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="file-text" />
              <EmptyPlaceholder.Title>No templates created</EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                You don&apos;t have any templates yet. Start creating one.
              </EmptyPlaceholder.Description>
              <Link href="/templates/new">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Template
                </Button>
              </Link>
            </EmptyPlaceholder>
          )}
        </TabsContent>
        <TabsContent value="shared-with-me" className="space-y-4">
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="share" />
            <EmptyPlaceholder.Title>No shared templates</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>No one has shared any templates with you yet.</EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        </TabsContent>
        <TabsContent value="favorites" className="space-y-4">
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="star" />
            <EmptyPlaceholder.Title>No favorite templates</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You haven&apos;t added any templates to your favorites yet.
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

