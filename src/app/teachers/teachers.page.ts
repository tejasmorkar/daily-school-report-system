import { Component, OnInit } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { FirestoreServiceService } from "../services/firestore-service.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-teachers",
  templateUrl: "./teachers.page.html",
  styleUrls: ["./teachers.page.scss"]
})
export class TeachersPage implements OnInit {
  teachers = null;
  user = null;
  constructor(
    public toastController: ToastController,
    private firestoreService: FirestoreServiceService,
    private auth: AuthService
  ) {}

  ngOnInit() {
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
