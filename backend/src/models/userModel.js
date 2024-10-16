import mongoose from "mongoose";

//creamos un esquema para los usuarios con los campos a utilizar
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profileImage: {
      public_id: String,
      url: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//creamos un modelo para el esquema
const UserModel = mongoose.model("users", userSchema);

//finalmente lo exportamos para su uso
export default UserModel;
