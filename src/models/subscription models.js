import mongoose, { Schema } from "mongoose";

const subscriptionSchma = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId, //one who is subscribing
      ref: "User",
    },
    channel: {
      type: Schema.Types.ObjectId, //one to whom subscriber
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

export const Subscription = mongoose.model("Subscription", subscriptionSchma);
