import { Component, OnInit } from "@angular/core";
import { FirestoreServiceService } from "../services/firestore-service.service";
import { AuthService } from "../services/auth.service";

import { ToastController } from "@ionic/angular";

import { Plugins } from "@capacitor/core";

const { App } = Plugins;

@Component({
  selector: "app-teachers",
  templateUrl: "./teachers.page.html",
  styleUrls: ["./teachers.page.scss"]
})
export class TeachersPage implements OnInit {
  teachers = null;
  user = null;
  clickCount: number = 0;
  backButtonListener;
  constructor(
    public toastController: ToastController,
    private firestoreService: FirestoreServiceService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.clickCount = 0;
    this.backButtonListener = App.addListener("backButton", () => {
      if (this.clickCount == 0) {
        this.clickCount += 1;
        this.presentToast(`Press Again To Exit`);
      } else {
        Plugins.App.exitApp();
      }
    });

    this.auth.user$.subscribe(data => {
      this.user = data;
      if (data) {
        this.firestoreService
          .getTeachersList(this.user.email)
          .then(teachersData => {
            teachersData.subscribe(value => {
              this.teachers = value;
            });
          });
      }
    });
  }

  ngOnDestroy() {
    this.backButtonListener.remove();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: `${msg}`,
      duration: 4000
    });
    toast.present();
  }

  async presentDeleteToastWithOptions(teacher) {
    const toast = await this.toastController.create({
      header: "Alert!",
      message: `Are you sure you want to delete ${teacher.teacherId}`,
      position: "bottom",
      buttons: [
        {
          text: "Yes",
          handler: () => {
            this.onTeacherDelete(teacher);
          }
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {}
        }
      ]
    });
    toast.present();
  }

  onTeacherDelete = teacher => {
    this.firestoreService.deleteTeacher(teacher.teacherId, this.user.email);
  };
}
