import { Router } from "express";
//
import {
  validateBody,
  validateParams,
  validateQueryParams,
} from "../middleware/validation.ts";

import { z } from "zod";

const createHabitSchema = z.object({
  name: z.string().nonoptional(),
});

const completeHabitSchema = z.object({
  id: z.coerce.number(),
});

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Get all habits" });
});

router.post("/", [validateBody(createHabitSchema)], (req, res) => {
  res.status(201).json({ message: "Habit created" });
});

router.post(
  "/:id/completed",
  validateParams(completeHabitSchema),
  (req, res) => {
    res.json({ message: `Mark habit ${req.params.id} complete` });
  }
);

router.get(
  "/:id/stats",

  (req, res) => {
    res.json({ message: `Get stats for habit ${req.params.id}` });
  }
);

router.delete("/:id", [], (req, res) => {
  res.status(204).json({ message: `Habit ${req.params.id} deleted` });
});

export default router;
