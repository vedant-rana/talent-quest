import { ILogo, LogoReqModel } from "../types/modelTypes/logoTypes.js";

export interface ILogoRepository {
  getAllLogos(): Promise<ILogo[]>;

  getLogoById(id: string): Promise<ILogo | null>;

  getLogoByCustomObj(searchObj: object): Promise<ILogo | null>;

  createLogo(category: LogoReqModel): Promise<ILogo | null>;

  updateLogo(id: string, category: LogoReqModel): Promise<ILogo | null>;

  deleteLogo(id: string): Promise<ILogo | null>;
}
