export type LogoFormData = {
  name: string;
  logo: FileList | null;
};

export type Logo = {
  _id: string;
  name: string;
  logoUrl: string;
  createdAt: string;
  updatedAt: string;
};
