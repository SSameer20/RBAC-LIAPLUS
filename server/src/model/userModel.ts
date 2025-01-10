import { model, Schema, Types } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
    default: "user",
  },
  posts: [
    {
      type: Types.ObjectId,
    },
  ],
});

export const User = model("User", userSchema);
