import { AbstractHttpController } from '../../../../common/http/abstract-http.controller';
import { RegisterRequest } from './models/register.model';
import { AuthService } from '../../../../application/services/auth.service';
import { Response } from 'express';
import { LoginRequest } from './models/login.model';
export declare class AuthHttpController extends AbstractHttpController {
    private readonly authService;
    constructor(authService: AuthService);
    register(response: Response, body: RegisterRequest): Promise<void>;
    login(response: Response, body: LoginRequest): Promise<void>;
}
