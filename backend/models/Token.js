import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
    },
    code: {
      type: String,
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["verification", "reset"],
      required: true,
    },
    payload: {
      type: Object,
      default: {},
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 600, // 10 minutes TTL index
    },
  }
);

const Token = mongoose.models.token || mongoose.model("token", TokenSchema);

export default Token;
