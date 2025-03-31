import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export function TemplateCreateButton() {
  return (
    <Link href="/templates/new">
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        New Template
      </Button>
    </Link>
  )
}

