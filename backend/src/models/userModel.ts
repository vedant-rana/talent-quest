import { Model, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser } from "../types/modelTypes/userModelTypes.js";

const userSchema: Schema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password as string);
};

// userSchema.methods.getJWTToken = function (): string {
//   const secretToken: string = process.env.JWT_SECRET || "default_secret"; // Ensure it's always a string
//   const expiresIn: string | number = process.env.JWT_EXPIRE || "1d"; // Default value

//   return jwt.sign({ id: this._id }, secretToken, {
//     expiresIn, // This can be a number (seconds) or string ("1h", "7d", etc.)
//   });
// };

const User: Model<IUser> = model<IUser>("User", userSchema);

export default User;
