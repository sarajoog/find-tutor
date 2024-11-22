import { Injectable, computed, effect, signal } from '@angular/core';
import { inject } from '@angular/core';


import { 
  getAuth, 
  signInWithEmailAndPassword,
  signOut, 
  onAuthStateChanged, 
  updatePassword,
  UserCredential,
  User,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
  deleteUser
} from '@angular/fire/auth';

import { getFirestore, doc, setDoc, addDoc, collection, updateDoc, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Auth } from '@angular/fire/auth';
const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

    router = inject(Router);
    #userSignal = signal<User | null>(null);
    user = this.#userSignal.asReadonly();

    #user_role = signal('');
    role = this.#user_role.asReadonly();

    isLoggedIn = computed(() => !!this.user());

    firestore = inject(Firestore);
    auth      = inject(Auth);
    datepipe = inject(DatePipe);

    constructor() {
        //this.initAuth();
        this.loadUserFromStorage();

        effect(() => {
            const user = this.user();
            if (user) {
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
            }
        })
    }


    public set_user_role(role: string) {
        this.#user_role.set(role);
    }

    async login(email: string, password: string): Promise<UserCredential> {
        const userCredential = await signInWithEmailAndPassword(this.auth, email, password);   
        this.#userSignal.set(userCredential.user);
        return userCredential;
    }

    async loadUserFromStorage() {
        const json = localStorage.getItem(USER_STORAGE_KEY);
        if (json) {
        const user = JSON.parse(json) as User;
        this.#userSignal.set(user);
        await this.router.navigateByUrl('/account/dashboard');
        } else {
        console.log(`No user found in storage.`);
        }
    }

}
