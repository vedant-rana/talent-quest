import { Model, Schema, model } from "mongoose";
import { ILogo } from "../types/modelTypes/logoTypes.js";
import { DEFAULT_LOGO_URL } from "../utils/constants/commonConstants.js";

const logoSchema: Schema = new Schema<ILogo>(
  {
    name: {
      type: String,
      required: [true, "Logo name is required"],
    },
    logoUrl: {
      type: String,
      default: DEFAULT_LOGO_URL,
    },
  },
  {
    timestamps: true,
  }
);

const Logo: Model<ILogo> = model<ILogo>("Logo", logoSchema);

export default Logo;
