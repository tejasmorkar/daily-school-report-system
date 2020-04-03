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
import { firestore } from "firebase/";

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

    const data: Teacher = {
      name: `${name}`,
      teacherId: `${teacherId}`,
      class: `${classString}`,
      designation: `${designation}`,
      attendance: Number(attendance)
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

  async getTeacherDetails(teacherId: string, date: string, email: string) {
    return this.afs
      .doc(`teachers-daily-details/${teacherId}-data-${date}-${email}`)
      .valueChanges();
  }

  async setTeacherDetails(
    teacherId: string,
    date: string,
    email: string,
    detailData: any
  ) {
    const teacherDetailRef = this.afs.doc(
      `teachers-daily-details/${teacherId}-data-${date}-${email}`
    );

    const data = {
      attendance: detailData.attendance,
      lessonPlan: detailData.lessonPlan,
      dayBook: detailData.dayBook,
      assemblyParticipation: detailData.assemblyParticipation,
      otherActivities: detailData.otherActivities,
      activities: detailData.activities
    };

    return teacherDetailRef
      .set(data, { merge: true })
      .then(() => {
        this.presentToast(`Data Submitted Successfully!`);
      })
      .catch(err => {
        this.presentErrorToast(err);
      });
  }

  async changeAttendance(val: boolean, teacherId: string, email: string) {
    const teacherRef: AngularFirestoreCollection<Teacher> = this.afs.collection(
      `teachers-${email}`
    );

    let change;

    if (val) {
      change = firestore.FieldValue.increment(1);
    } else {
      change = firestore.FieldValue.increment(-1);
    }

    return teacherRef
      .doc(`${teacherId}`)
      .update({ attendance: change })
      .then(() => {
        this.presentToast(`Attendance Updated Successfully!`);
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
