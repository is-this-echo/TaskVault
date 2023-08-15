import express, { Request, Response } from "express";
import { Task } from "../models/task";

const router = express.Router();

router.get("/api/tasks", async (req: Request, res: Response) => {
  const tasks = await Task.find({});

  res.send(tasks);
});

export { router as indexTaskRouter };
