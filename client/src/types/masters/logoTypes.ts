export type LogoFormData = {
  name: string;
  logo: FileList | null;
};

export type Logo = {
  _id: number;
  name: string;
  logoUrl: string;
};
