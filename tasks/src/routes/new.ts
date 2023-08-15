import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@echoeventix/common";

import { Task } from "../models/task";

const router = express.Router();

router.post(
  "/api/tasks",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const task = Task.build({ title, price, userId: req.currentUser!.id });
    await task.save();

    res.status(201).send(task);
  }
);

export { router as createTaskRouter };
