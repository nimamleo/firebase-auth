import { SetMetadata } from '@nestjs/common';
import { Role } from '../../../enum/role.enum';

export const RBAC_KEY = 'rbac';

export const RBAC = (...roles: Role[]) => SetMetadata('rbac', roles);
