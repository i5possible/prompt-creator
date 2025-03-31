import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, Globe, Lock, MoreVertical, Share2, Star, Trash } from "lucide-react"
import Link from "next/link"

interface Template {
  id: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  isPublic: boolean
  usageCount: number
}

interface TemplateItemProps {
  template: Template
}

export function TemplateItem({ template }: TemplateItemProps) {
  const formattedDate = new Date(template.updatedAt).toLocaleDateString()

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">{template.title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" />
                <span>Share</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Star className="mr-2 h-4 w-4" />
                <span>Favorite</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="text-sm text-muted-foreground">{template.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            {template.isPublic ? <Globe className="mr-1 h-3 w-3" /> : <Lock className="mr-1 h-3 w-3" />}
            <span>{template.isPublic ? "Public" : "Private"}</span>
          </div>
          <div>Used {template.usageCount} times</div>
          <div>Updated {formattedDate}</div>
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
  )
}

