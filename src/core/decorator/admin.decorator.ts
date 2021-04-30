import { SetMetadata } from '@nestjs/common';
import { RoleAdm } from '../enum/role.adm.enum';

export const ROLES_KEY_ADM = 'rolesAdmin';
export const RolesAdmin = (...rolesAdmin: RoleAdm[]) =>
  SetMetadata(ROLES_KEY_ADM, rolesAdmin);
