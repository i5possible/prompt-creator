// apps/web/src/trpc/client.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from 'api';

export const trpc = createTRPCReact<AppRouter>();

