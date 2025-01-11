import { model, Schema, Types } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
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
        ref: "Post",
      },
    ],
    status: {
      type: String,
      enum: ["active", "restrict"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
export const User = model("User", userSchema);
