import { IAuthRepository } from "../interfaces/IAuthRepository.js";
import User from "../models/userModel.js";
import { IUser } from "../types/modelTypes/userModelTypes.js";
import { LoginType } from "../types/authTypes/authTypes.js";

export const AuthRepository: IAuthRepository = {
  async login(credentials: LoginType): Promise<IUser | null> {
    const user = await User.findOne({ email: credentials.email });
    if (!user) {
      return null;
    }

    const isMatch = await user.comparePassword(credentials.password);
    if (!isMatch) {
      return null;
    }

    return user;
  },
};
