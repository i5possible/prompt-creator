import type React from "react"
interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <a href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">AI Prompt Template</span>
            </a>
            <nav className="flex items-center space-x-4 text-sm font-medium">
              <a href="/dashboard" className="transition-colors hover:text-foreground/80">
                Dashboard
              </a>
              <a href="/templates/explore" className="transition-colors hover:text-foreground/80">
                Explore
              </a>
              <a href="/history" className="transition-colors hover:text-foreground/80">
                History
              </a>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <a href="/settings">
                <div className="h-8 w-8 rounded-full bg-muted"></div>
              </a>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="container">{children}</div>
      </main>
    </div>
  )
}

