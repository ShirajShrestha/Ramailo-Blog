import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create indexes to fix unique constraint
userSchema.index({ username: 1, email: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);
export default User;
