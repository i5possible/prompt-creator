import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Star, Users } from "lucide-react"
import Link from "next/link"

export default function ExplorePage() {
  // This would normally fetch from the database
  const templates = [
    {
      id: "1",
      title: "Blog Post Generator",
      description: "Generate blog posts with a specific topic and tone",
      author: "John Doe",
      category: "Content",
      stars: 42,
      usageCount: 156,
    },
    {
      id: "2",
      title: "Product Description",
      description: "Create compelling product descriptions for e-commerce",
      author: "Jane Smith",
      category: "Marketing",
      stars: 28,
      usageCount: 98,
    },
    {
      id: "3",
      title: "Email Newsletter",
      description: "Generate engaging email newsletters for your subscribers",
      author: "Alex Johnson",
      category: "Marketing",
      stars: 35,
      usageCount: 120,
    },
    {
      id: "4",
      title: "Code Documentation",
      description: "Create clear and concise documentation for your code",
      author: "Sam Wilson",
      category: "Development",
      stars: 56,
      usageCount: 210,
    },
    {
      id: "5",
      title: "Social Media Post",
      description: "Create engaging social media posts for various platforms",
      author: "Emily Chen",
      category: "Social Media",
      stars: 31,
      usageCount: 145,
    },
    {
      id: "6",
      title: "Academic Essay",
      description: "Generate well-structured academic essays on various topics",
      author: "Michael Brown",
      category: "Education",
      stars: 24,
      usageCount: 87,
    },
  ]

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Explore Templates</h1>
          <p className="text-muted-foreground">Discover and use templates created by the community</p>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search templates..." className="pl-8" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="content">Content</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="social">Social Media</SelectItem>
                <SelectItem value="education">Education</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="popular">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="recent">Recently Added</SelectItem>
                <SelectItem value="stars">Most Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {templates.map((template) => (
                  <Card key={template.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">{template.title}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {template.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Users className="mr-1 h-3 w-3" />
                          <span>{template.usageCount} uses</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="mr-1 h-3 w-3" />
                          <span>{template.stars}</span>
                        </div>
                        <div>{template.category}</div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex space-x-2">
                        <Link href={`/templates/${template.id}`} className="w-full">
                          <Button variant="default" className="w-full">
                            Use Template
                          </Button>
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="featured" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {templates.slice(0, 3).map((template) => (
                  <Card key={template.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">{template.title}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {template.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Users className="mr-1 h-3 w-3" />
                          <span>{template.usageCount} uses</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="mr-1 h-3 w-3" />
                          <span>{template.stars}</span>
                        </div>
                        <div>{template.category}</div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex space-x-2">
                        <Link href={`/templates/${template.id}`} className="w-full">
                          <Button variant="default" className="w-full">
                            Use Template
                          </Button>
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="trending" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {templates.slice(3, 6).map((template) => (
                  <Card key={template.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">{template.title}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {template.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Users className="mr-1 h-3 w-3" />
                          <span>{template.usageCount} uses</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="mr-1 h-3 w-3" />
                          <span>{template.stars}</span>
                        </div>
                        <div>{template.category}</div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex space-x-2">
                        <Link href={`/templates/${template.id}`} className="w-full">
                          <Button variant="default" className="w-full">
                            Use Template
                          </Button>
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="new" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {templates.slice(1, 4).map((template) => (
                  <Card key={template.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">{template.title}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {template.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Users className="mr-1 h-3 w-3" />
                          <span>{template.usageCount} uses</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="mr-1 h-3 w-3" />
                          <span>{template.stars}</span>
                        </div>
                        <div>{template.category}</div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex space-x-2">
                        <Link href={`/templates/${template.id}`} className="w-full">
                          <Button variant="default" className="w-full">
                            Use Template
                          </Button>
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

