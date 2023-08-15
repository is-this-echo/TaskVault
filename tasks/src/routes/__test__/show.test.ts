import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";

it("Returns a 404 status code if task is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).get(`/api/tasks/${id}`).send({}).expect(404);
});

it("Returns the task if the task is found", async () => {
  const title = "Arijit-Singh concert";
  const price = 30;

  const response = await request(app)
    .post("/api/tasks")
    .set("Cookie", global.signin())
    .send({
      title,
      price,
    })
    .expect(201);

  const taskResponse = await request(app)
    .get(`/api/tasks/${response.body.id}`)
    .send({})
    .expect(200);

  expect(taskResponse.body.title).toEqual(title);
  expect(taskResponse.body.price).toEqual(price);
});
