import { Document } from "mongoose";

export type LogoModelType = {
  name: string;
  logoUrl?: string;
};

export type LogoReqModel = LogoModelType & {
  logoFile?: Express.Multer.File;
};

export type ILogo = LogoModelType & Document;
