import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  validateRequest,
  NotFoundError,
  NotAuthorizedError,
  requireAuth,
} from "@echoeventix/common";
import { Task } from "../models/task";

const router = express.Router();

router.put(
  "/api/tasks/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required!"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be provided and greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
      throw new NotFoundError();
    }

    if (task.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    task.set({
      title: req.body.title,
      price: req.body.price,
    });

    await task.save();

    res.send(task);
  }
);

export { router as updateTaskRouter };
