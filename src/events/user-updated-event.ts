import { Subjects } from "./subjects";

export interface UserUpdatedEvent {
    subject: Subjects.UserUpdated,
    data: {
        id: string;
        nombre: string;
        apellido: string;
        correo: string;
        password: string;
        foto?: string;
        tipo: string;
    }
}