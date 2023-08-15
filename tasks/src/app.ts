import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@echoeventix/common";

import { indexTaskRouter } from "./routes/index";
import { createTaskRouter } from "./routes/new";
import { showTaskRouter } from "./routes/show";
import { updateTaskRouter } from "./routes/update";

const app = express();

// allows express to trust the proxy connection created by ingress-nginx controller
app.set("trust proxy", true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);

app.use(createTaskRouter);
app.use(showTaskRouter);
app.use(indexTaskRouter);
app.use(updateTaskRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
