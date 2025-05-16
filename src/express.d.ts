import { Auth } from 'src/auth/entities/auth.entity';

declare global {
  namespace Express {
    interface Request {
      user: Auth;
    }
  }
}
