import { Document } from "mongoose";

export type userModelType = {
  firstName: string;
};

export type ICategoryType = userModelType & Document;
