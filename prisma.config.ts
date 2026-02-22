import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL || "postgresql://mock:mock@localhost:5432/mock",
  },
});
