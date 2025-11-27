# AI Prompt Template Creator

A powerful platform to create, optimize, and share AI prompt templates. Built with a modern tech stack to ensure performance, scalability, and a premium user experience.

## Features

- **Create Custom Templates**: Design your own prompt templates with variables and instructions.
- **AI-Powered Optimization**: Leverage AI to optimize your templates for better results.
- **Share & Explore**: Share your templates with the community or explore templates created by others.
- **Dashboard**: Manage your templates and view usage statistics.
- **Authentication**: Secure user accounts with Supabase Auth.

## Tech Stack

This project is a monorepo managed by [TurboRepo](https://turbo.build/repo), containing the following applications and packages:

### Apps

- **`web`**: The main web application.
  - **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
  - **Language**: TypeScript
  - **Styling**: Tailwind CSS, Radix UI, Lucide Icons
  - **State/Data**: Supabase (Auth & Database), AI SDK
  - **Charts**: Recharts
- **`api`**: Backend API service.
  - **Framework**: [NestJS 11](https://nestjs.com/)
  - **Language**: TypeScript
  - **Database**: Prisma ORM
- **`docs`**: Documentation site (Next.js).

### Packages

- **`@repo/ui`**: Shared UI component library.
- **`@repo/db`**: Database configuration and Prisma schema.
- **`@repo/eslint-config`**: Shared ESLint configurations.
- **`@repo/typescript-config`**: Shared TypeScript configurations.

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm (managed via `packageManager` in `package.json`)

### Installation

Install dependencies for all apps and packages:

```bash
pnpm install
```

### Development

Start the development server for all apps:

```bash
pnpm dev
```

Or run specific apps:

```bash
pnpm dev:web  # Start only the web app
pnpm dev:api  # Start only the api app
```

### Build

Build all apps and packages:

```bash
pnpm build
```

## Database

The project uses PostgreSQL with Prisma.

Generate Prisma client:

```bash
pnpm db:generate
```

Run migrations:

```bash
pnpm db:migrate
```

## License

This project is licensed under the MIT License.
