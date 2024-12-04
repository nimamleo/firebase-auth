import { Role } from '../../../enum/role.enum';
export declare const RBAC_KEY = "rbac";
export declare const RBAC: (...roles: Role[]) => import("@nestjs/common").CustomDecorator<string>;
