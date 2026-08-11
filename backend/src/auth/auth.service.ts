import { Injectable } from '@nestjs/common';
import { DataStore, UserSession } from '../database/data.store';

@Injectable()
export class AuthService {
  loginGuest(): { success: boolean; session: UserSession; token: string } {
    const session = DataStore.createGuestSession();
    // Guest token simulation
    const token = `guest_token_${session.id}_${Date.now()}`;
    return {
      success: true,
      session,
      token,
    };
  }
}
