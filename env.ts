import { env as loadEnv } from "custom-env";
import { z } from "zod";

process.env.APP_STAGE = process.env.APP_STAGE || "dev";

const isDevelopment = process.env.APP_STAGE === "development";
const isProduction = process.env.APP_STAGE === "production";
// const isTesting = process.env.APP_STAGE === "test";

if (isDevelopment) {
  loadEnv();
} else {
  loadEnv("test");
}

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  APP_STGE: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().positive().default(3000),
  // HOST: z.string().default('localhost'),
  DATABASE_URL: z.string().startsWith("postgresql://"),
  // DATABASE_POOL_MIN: z.coerce.number().min(0).default(2),
  // DATABASE_POOL_MAX: z.coerce.number().positive().default(10),
  JWT_SECRET: z.string().min(32, "Must be 32 char long"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  // REFRESH_TOKEN_SECRET: z.string().min(32).optional(),
  // REFRESH_TOKEN_EXPIRES_IN: z.string().default('30d'),
  BCRYPT_ROUNDS: z.coerce.number().min(10).max(20).default(12),
  // ----------------------------------------------------------
  // ----------------------------------------------------------
  /* CORS_ORIGIN: z
    .string()
    .or(z.array(z.string()))
    .transform((val) => {
      if (typeof val === 'string') {
        return val.split(',').map((origin) => origin.trim())
      }
      return val
    })
    .default([]), */
  /* LOG_LEVEL: z
    .enum(['error', 'warn', 'info', 'debug', 'trace'])
    .default(isProduction ? 'info' : 'debug'), */
});

export type Env = z.infer<typeof envSchema>;

let env: Env;

try {
  env = envSchema.parse(process.env);
} catch (e) {
  if (e instanceof z.ZodError) {
    console.log("Invalid env var");

    console.log("_____________________________");
    console.error(JSON.stringify(z.treeifyError(e), null, 2));

    e.issues.forEach((err) => {
      const path = err.path.join(".");
      console.log("_____________________________");
      console.log(`${path}: ${err.message}`);
    });

    process.exit(1);
  }

  throw e;
}

export const isProd = () => env.APP_STGE === "production";
export const isDev = () => env.APP_STGE === "dev";
export const isTest = () => env.APP_STGE === "test";

export { env };
export default env;
