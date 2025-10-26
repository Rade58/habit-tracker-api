import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Get all habits" });
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "Habit created" });
});

router.post("/:id/completed", (req, res) => {
  res.json({ message: `Mark habit ${req.params.id} complete` });
});

router.get("/:id/stats", (req, res) => {
  res.json({ message: `Get stats for habit ${req.params.id}` });
});

router.delete("/:id", (req, res) => {
  res.status(204).json({ message: `Habit ${req.params.id} deleted` });
});

export default router;
