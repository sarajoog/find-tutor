import { Injectable, computed, effect, signal } from '@angular/core';
import { inject } from '@angular/core';
import { 
  signInWithEmailAndPassword,
  signOut, 
  onAuthStateChanged, 
  UserCredential,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    router = inject(Router);
    auth = inject(Auth);
    firestore = inject(Firestore);
    datepipe = inject(DatePipe);

    #userSignal = signal<User | null>(null);
    user = this.#userSignal.asReadonly();

    #user_role = signal('');
    role = this.#user_role.asReadonly();

    isLoggedIn = computed(() => !!this.user());

    constructor() {
        this.initAuth();
        this.loadUserFromStorage();
    }

    private initAuth() {
        // Listen to Firebase auth state changes
        onAuthStateChanged(this.auth, (user) => {
            console.log('Auth state changed:', user);
            this.#userSignal.set(user);
            if (user) {
                localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
            } else {
                localStorage.removeItem(USER_STORAGE_KEY);
            }
        });
    }

    public set_user_role(role: string) {
        this.#user_role.set(role);
    }

    async login(email: string, password: string): Promise<UserCredential> {
        const userCredential = await signInWithEmailAndPassword(this.auth, email, password);   
        await this.router.navigateByUrl('/account/dashboard');
        return userCredential;
    }

    async logout() {
        try {
            await signOut(this.auth);
            this.#userSignal.set(null);
            this.#user_role.set('');
            localStorage.removeItem(USER_STORAGE_KEY);
            await this.router.navigateByUrl('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    private async loadUserFromStorage() {
        const json = localStorage.getItem(USER_STORAGE_KEY);
        if (json) {
            const user = JSON.parse(json) as User;
            this.#userSignal.set(user);
        }
    }
}
