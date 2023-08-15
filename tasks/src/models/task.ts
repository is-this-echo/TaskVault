import mongoose from "mongoose";

interface TaskAttrs {
  title: string;
  price: number;
  userId: string;
}

interface TaskDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

interface TaskModel extends mongoose.Model<TaskDoc> {
  build(attrs: TaskAttrs): TaskDoc;
}

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

taskSchema.statics.build = (attrs: TaskAttrs) => {
  return new Task(attrs);
};

const Task = mongoose.model<TaskDoc, TaskModel>("Ticket", taskSchema);

export { Task };
