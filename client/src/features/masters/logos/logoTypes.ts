import { Logo } from "../../../types/masters/logoTypes";

export interface LogoState {
  logos: Logo[];
  isLoading: boolean;
  error: string | null;
}
