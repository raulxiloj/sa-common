import { UserPayload } from "../../interfaces/UserPayload";

declare global {
  namespace Express {
    interface Request {
        currentUser?: UserPayload
    }
  }
}