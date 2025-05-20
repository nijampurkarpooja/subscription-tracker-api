import mongoose from "mongoose";

const BlacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Blacklist = mongoose.model("Blacklist", BlacklistSchema);

export default Blacklist;
