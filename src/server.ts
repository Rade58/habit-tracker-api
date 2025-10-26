import express from "express";

const app = express();

// health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "Habit Tracker api",
  });
});

app.get("/dugme", (req, res) => {
  res.status(200).send(`<button>dugme</button>`);
});

// if we have analitics
/* if (env.FEATURE_ANALYTICS) {
  app.use('/api/analytics', analyticsRoutes)
}
 */
export { app }; // for tests
export default app; // for convenience
