import express, { Request, Response } from "express";
import { NotFoundError } from "@echoeventix/common";
import { Task } from "../models/task";

const router = express.Router();

router.get("/api/tasks/:id", async (req: Request, res: Response) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new NotFoundError();
  }

  // if status-code is not specified, by default sends a 200
  res.send(task);
});

export { router as showTaskRouter };
