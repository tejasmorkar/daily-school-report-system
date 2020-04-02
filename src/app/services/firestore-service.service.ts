import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { ToastController } from "@ionic/angular";
import { AuthService } from "./auth.service";

import { Teacher } from "./teacher.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class FirestoreServiceService {
  constructor(
    private afs: AngularFirestore,
    private toastController: ToastController,
    private authService: AuthService
  ) {}

  async getTeachersList(email: string) {
    return this.afs.collection(`teachers-${email}`).valueChanges();
  }

  async addTeacher(
    name: string,
    teacherId: string,
    classString: string,
    designation: string,
    attendance: number,
    email: string
  ) {
    const teacherRef: AngularFirestoreCollection<Teacher> = this.afs.collection(
      `teachers-${email}`
    );

    const data = {
      name: name,
      teacherId: teacherId,
      class: classString,
      designation: designation,
      attendance: attendance
    };

    return teacherRef
      .doc(`${data.teacherId}`)
      .set(data)
      .then(data => {
        this.presentToast(`Teacher Added Successfully!`);
      })
      .catch(err => {
        this.presentErrorToast(err);
      });
  }

  async deleteTeacher(teacherId: string, email: string) {
    const teacherDoc: AngularFirestoreDocument<Teacher> = this.afs.doc(
      `teachers-${email}/${teacherId}`
    );

    teacherDoc
      .delete()
      .then(() => {
        this.presentToast(`Deleted Successfully!`);
      })
      .catch(err => {
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
