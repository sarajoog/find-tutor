import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { 
  Auth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User
} from '@angular/fire/auth';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private logger = inject(LoggerService);
  private router = inject(Router);

  private readonly currentUser = signal<User | null>(null);

  constructor() {
    // Listen to auth state changes
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser.set(user);
    });
  }

  isAuthenticated(): boolean {
    return !!this.currentUser();
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      this.logger.info('Attempting sign in', { email });
      await signInWithEmailAndPassword(this.auth, email, password);
      this.logger.info('Sign in successful', { email });
    } catch (error) {
      this.logger.error('Sign in failed', error);
      throw this.handleAuthError(error);
    }
  }

  async signOut(): Promise<void> {
    try {
      this.logger.info('Attempting sign out');
      await signOut(this.auth);
      this.logger.info('Sign out successful');
    } catch (error) {
      this.logger.error('Sign out failed', error);
      throw this.handleAuthError(error);
    }
  }

  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  private handleAuthError(error: any): Error {
    const errorMessage = this.getErrorMessage(error.code);
    return new Error(errorMessage);
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email';
      case 'auth/wrong-password':
        return 'Invalid password';
      case 'auth/invalid-email':
        return 'Invalid email format';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later';
      default:
        return 'Authentication failed. Please try again.';
    }
  }
}
