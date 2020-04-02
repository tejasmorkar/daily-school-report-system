import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "./user.model";

import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user$: Observable<User>;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private toastController: ToastController
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged In
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  get user(): any {
    return this.user$;
  }

  get isAuthenticated(): boolean {
    return this.user$ != null;
  }

  // async googleSignin() {
  //   const provider = new auth.GoogleAuthProvider();
  //   const credential = await this.afAuth.auth.signInWithPopup(provider);
  //   return this.updateUserData(credential.user);
  // }

  async createAccountWithEmailPassword(email: string, password: string) {
    await this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(creds => {
        this.updateUserData(creds.user);
      })
      .then(() => {
        this.presentToast(`User Account Created Successfully!`);
      })
      .catch(err => {
        this.presentErrorToast(err);
      });
  }

  async emailPasswordSignIn(email: string, password: string) {
    const credential = await this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(creds => {
        this.updateUserData(creds.user);
      })
      .catch(err => {
        this.presentErrorToast(err);
      });
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true }).catch(err => {
      this.presentErrorToast(err);
    });
  }

  async resetPasswordLink(email: string) {
    return this.afAuth.auth
      .sendPasswordResetEmail(email)
      .then(() => {
        this.presentToast(`Successfully Sent Password Reset Link to ${email}!`);
      })
      .catch(err => {
        this.presentErrorToast(err);
      });
  }

  async signOut() {
    await this.afAuth.auth.signOut().catch(err => {
      this.presentErrorToast(err);
    });
  }

  async presentErrorToast(err) {
    const toast = await this.toastController.create({
      message: `${err.message}`,
      duration: 4000
    });
    toast.present();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: `${msg}`,
      duration: 4000
    });
    toast.present();
  }
}
