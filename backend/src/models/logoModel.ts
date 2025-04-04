import { Model, Schema, model } from "mongoose";
import { ILogo } from "../types/modelTypes/logoTypes.js";

const logoSchema: Schema = new Schema<ILogo>(
  {
    name: {
      type: String,
      required: [true, "Logo name is required"],
    },
    logoUrl: {
      type: String,
      default: "defaultUrl",
    },
  },
  {
    timestamps: true,
  }
);

const Logo: Model<ILogo> = model<ILogo>("Logo", logoSchema);

export default Logo;
