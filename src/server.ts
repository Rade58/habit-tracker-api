import express from "express";

import userRoutes from "./routes/userRoutes.ts";
import habitRoutes from "./routes/habitRoutes.ts";
import authRoutes from "./routes/authRoutes.ts";

const app = express();

// health check endpoint
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

app.post("/cake/:name/:id", (req, res) => {
  res.status(201).send(req.params);
});

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
