import { IAuthRepository } from "../interfaces/IAuthRepository.js";
import User from "../models/userModel.js";
import { IUser, UserModelType } from "../types/modelTypes/userModelTypes.js";
import { LoginType, SignupType } from "../types/authTypes/authTypes.js";

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

  async signup(credentials: SignupType): Promise<IUser | null> {
    const user = await User.findOne({ email: credentials.email });

    if (user != null) {
      return null;
    }

    const credenetialData: UserModelType = {
      ...credentials,
      isActive: true,
      role: 0,
    };

    const newUser = await User.create(credenetialData);

    if (!newUser) {
      return null;
    }

    return newUser;
  },
};
