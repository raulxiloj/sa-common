import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {

    statusCode = 500;
    reason = 'Error al conectarse a la base de datos';

    constructor() {
        super('Error al conectarse a la base de datos');
    
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    
    serializeErrors() {
        return [
            { message: this.reason }
        ];
    }

}