import { NextFunction, Response, Request } from "express";

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<Response<any, Record<string, any>> | void>;

export type DropDownListItem = {
  text: string;
  value: string | number;
};
