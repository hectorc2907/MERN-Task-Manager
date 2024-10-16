import mongoose from "mongoose";

// Creamos un esquema para las tareas con los campos que vamos a utilizar
const tasksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Creamos un modelo para el esquema
const TasksModel = mongoose.model("tasks", tasksSchema);

// Finalmente lo exportamos para su uso
export default TasksModel;
