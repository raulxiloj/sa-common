import { Subjects } from "./subjects";

export interface UserCreatedEvent {
    subject: Subjects.UserCreated,
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