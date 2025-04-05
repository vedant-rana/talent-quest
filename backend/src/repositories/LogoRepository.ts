import { ILogoRepository } from "../interfaces/ILogoRepository.js";
import Logo from "../models/logoModel.js";
import { ILogo, LogoReqModel } from "../types/modelTypes/logoTypes.js";

export const LogoRepository: ILogoRepository = {
  async getAllLogos(): Promise<ILogo[]> {
    return await Logo.find();
  },

  async getLogoById(id: string): Promise<ILogo | null> {
    return await Logo.findById(id);
  },

  async getLogoByCustomObj(searchObj: object): Promise<ILogo | null> {
    return await Logo.findOne(searchObj);
  },

  async createLogo(dataObj: LogoReqModel): Promise<ILogo | null> {
    return await Logo.create(dataObj);
  },

  async updateLogo(id: string, dataObj: LogoReqModel): Promise<ILogo | null> {
    return await Logo.findByIdAndUpdate(id, dataObj, {
      new: true,
    });
  },

  async deleteLogo(id: string): Promise<ILogo | null> {
    return await Logo.findByIdAndDelete(id);
  },
};
