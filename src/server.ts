import express from "express";

import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import userRoutes from "./routes/userRoutes.ts";
import habitRoutes from "./routes/habitRoutes.ts";
import authRoutes from "./routes/authRoutes.ts";

import { isDev, isTestEnv, env } from "../env.ts";

const app = express();

// ----------------------------------------

app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan("dev", {
    skip: () => isTestEnv(),
  })
);
// ----------------------------------------

// health check endpoint ---------------------------
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "Habit Tracker api",
  });
});
/* app.get("/dugme", (req, res) => {
  res.status(200).send(`<button>dugme</button>`);
}); */
// -------------------------------------------------

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/habits", habitRoutes);

// if we have analitics
/* if (env.FEATURE_ANALYTICS) {
  app.use('/api/analytics', analyticsRoutes)
}
 */
export { app }; // for tests
export default app; // for convenience
