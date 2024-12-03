import { AbstractHttpController } from '../../../../common/http/abstract-http.controller';
import { RegisterRequest } from './models/register.model';
export declare class AuthHttpController extends AbstractHttpController {
    constructor();
    register(response: Response, body: RegisterRequest): Promise<void>;
}
