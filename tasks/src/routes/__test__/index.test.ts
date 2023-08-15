import request from "supertest";
import { app } from "../../app";

const createTask = () => {
  return request(app)
    .post("/api/tasks")
    .set("Cookie", global.signin())
    .send({ title: "dota2", price: 100 });
};

it("Can fetch a list of all tasks", async () => {
  await createTask();
  await createTask();
  await createTask();

  const response = await request(app).get("/api/tasks").send().expect(200);

  expect(response.body.length).toEqual(3);
});
