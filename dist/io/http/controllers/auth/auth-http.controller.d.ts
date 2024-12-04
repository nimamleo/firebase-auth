import { AbstractHttpController } from '../../../../common/http/abstract-http.controller';
import { RegisterRequest } from './models/register.model';
import { AuthService } from '../../../../application/services/auth.service';
export declare class AuthHttpController extends AbstractHttpController {
    private readonly authService;
    constructor(authService: AuthService);
    register(response: Response, body: RegisterRequest): Promise<void>;
}
