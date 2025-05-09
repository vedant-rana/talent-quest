import { LoginType, SignupType } from "../types/authTypes/authTypes.js";
import { IUser } from "../types/modelTypes/userModelTypes.js";

export interface IAuthRepository {
  login(credentials: LoginType): Promise<IUser | null>;

  signup(credentials: SignupType): Promise<IUser | null>;
}
