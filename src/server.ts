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

export { app }; // for tests
export default app; // for convenience
