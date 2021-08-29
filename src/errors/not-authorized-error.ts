import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {

    statusCode = 401;

    constructor() {
        super('No autorizado');
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeErrors() {
        return [{ message: 'No autorizado' }];
    }

}