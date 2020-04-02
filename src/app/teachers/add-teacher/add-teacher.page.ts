import { Component, OnInit } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { FirestoreServiceService } from "src/app/services/firestore-service.service";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-teacher",
  templateUrl: "./add-teacher.page.html",
  styleUrls: ["./add-teacher.page.scss"]
})
export class AddTeacherPage implements OnInit {
  name: string = null;
  teacherId: string = null;
  class: string = null;
  designation: string = null;
  attendance: number = null;
  user = null;
  constructor(
    private toastController: ToastController,
    private firestoreService: FirestoreServiceService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.user$.subscribe(data => {
      if (data) {
        this.user = data;
      }
    });
  }

  onDesignationSelect() {}

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: `${msg}`,
      duration: 2000
    });
    toast.present();
  }

  onAddButtonClick() {
    if (
      this.name &&
      this.teacherId &&
      this.class &&
      this.designation &&
      this.attendance
    ) {
      if (this.user.uid) {
        // Submit Add Teacher Request
        this.firestoreService
          .addTeacher(
            this.name,
            this.teacherId,
            this.class,
            this.designation,
            this.attendance,
            this.user.email
          )
          .then(() => {
            this.name = null;
            this.teacherId = null;
            this.class = null;
            this.designation = null;
            this.attendance = null;
          })
          .then(() => {
            this.router.navigate(["./teachers"]);
          });
      } else {
        this.presentToast(`User Not Detected, Try Signing Out`);
      }
    } else {
      this.presentToast(`All The Data Is Mandatory!`);
    }
  }
}
