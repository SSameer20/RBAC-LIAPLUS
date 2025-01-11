import { model, Schema, Types } from "mongoose";

const postSchema = new Schema({
  creator: {
    type: Types.ObjectId,
    ref: "User",
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  modifiedAt: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["active", "restrict"],
    default: "active",
  },
});

export const Post = model("Post", postSchema);
