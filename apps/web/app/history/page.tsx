import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Search, LayoutTemplateIcon as Template } from "lucide-react"
import Link from "next/link"

export default function HistoryPage() {
  // This would normally fetch from the database
  const conversations = [
    {
      id: "1",
      templateName: "Blog Post Generator",
      templateId: "1",
      date: "2025-03-28T14:30:00Z",
      promptLength: 245,
      responseLength: 1250,
    },
    {
      id: "2",
      templateName: "Product Description",
      templateId: "2",
      date: "2025-03-27T10:15:00Z",
      promptLength: 180,
      responseLength: 520,
    },
    {
      id: "3",
      templateName: "Blog Post Generator",
      templateId: "1",
      date: "2025-03-26T16:45:00Z",
      promptLength: 260,
      responseLength: 1320,
    },
    {
      id: "4",
      templateName: "Email Newsletter",
      templateId: "3",
      date: "2025-03-25T09:20:00Z",
      promptLength: 310,
      responseLength: 980,
    },
    {
      id: "5",
      templateName: "Social Media Post",
      templateId: "5",
      date: "2025-03-24T13:10:00Z",
      promptLength: 150,
      responseLength: 320,
    },
  ]

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Conversation History</h1>
          <p className="text-muted-foreground">View and manage your past conversations with AI</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Filter your conversation history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search conversations..." className="pl-8" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Templates</SelectItem>
                  <SelectItem value="1">Blog Post Generator</SelectItem>
                  <SelectItem value="2">Product Description</SelectItem>
                  <SelectItem value="3">Email Newsletter</SelectItem>
                  <SelectItem value="5">Social Media Post</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="recent">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
              <Button className="md:w-[120px]">Filter</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Conversations</CardTitle>
            <CardDescription>Your most recent conversations with AI</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Template</TableHead>
                  <TableHead className="hidden md:table-cell">Prompt Length</TableHead>
                  <TableHead className="hidden md:table-cell">Response Length</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conversations.map((conversation) => (
                  <TableRow key={conversation.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        {new Date(conversation.date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Template className="mr-2 h-4 w-4 text-muted-foreground" />
                        {conversation.templateName}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{conversation.promptLength} chars</TableCell>
                    <TableCell className="hidden md:table-cell">{conversation.responseLength} chars</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/history/${conversation.id}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

