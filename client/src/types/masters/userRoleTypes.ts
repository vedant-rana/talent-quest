export type UserRoleFormData = {
  roleName: string;
  isActive: boolean;
};

export type UserRole = UserRoleFormData & {
  _id: string;
  roleCode: string;
  isDeactivatable: boolean;
  createdAt?: string;
  updatedAt?: string;
};
