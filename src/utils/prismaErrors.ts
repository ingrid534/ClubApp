import { Prisma } from '@prisma/client';

export function handlePrismaError(err: unknown, location: string): void {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    console.error(
      `[${location}]: Prisma known error (code: ${err.code}): ${err.message}`,
    );
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    console.error(`[${location}]: Prisma unknown error: ${err.message}`);
  } else {
    console.error(`[${location}]: Unexpected error:`, err);
  }
}
