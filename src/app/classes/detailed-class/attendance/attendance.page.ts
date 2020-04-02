import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-attendance",
  templateUrl: "./attendance.page.html",
  styleUrls: ["./attendance.page.scss"]
})
export class AttendancePage implements OnInit {
  classId = null;
  selectedDate = null;
  isDisabled: boolean = true;
  attendanceList = null;
  todaysDate = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.classId = this.activatedRoute.snapshot.paramMap.get("classId");
    const today = new Date();
    const todaysDay = String(today.getDate()).padStart(2, "0");
    const todaysMonth = String(today.getMonth() + 1).padStart(2, "0");
    const todaysYear = today.getFullYear();
    this.todaysDate = `${todaysYear}-${todaysMonth}-${todaysDay}`;
    this.selectedDate = this.todaysDate;
    this.isDisabled = false;
    this.attendanceList = [
      {
        name: "Tejas Morkar",
        roll: 1,
        attendance: false
      },
      {
        name: "Richa Pawar",
        roll: 2,
        attendance: false
      },
      {
        name: "Suyash Sonawane",
        roll: 3,
        attendance: false
      },
      {
        name: "Aditya Mahajan",
        roll: 4,
        attendance: false
      },
      {
        name: "Harish Dalal",
        roll: 5,
        attendance: false
      },
      {
        name: "Jane Doe",
        roll: 6,
        attendance: false
      },
      {
        name: "Amit Thete",
        roll: 7,
        attendance: false
      }
    ];
  }

  dateSelected = event => {
    this.isDisabled = false;
    this.selectedDate = String(event.detail.value).substring(0, 10);
    this.isDisabled = this.todaysDate !== this.selectedDate;

    this.attendanceList = [
      {
        name: "Tejas Morkar",
        roll: 1,
        attendance: false
      },
      {
        name: "Richa Pawar",
        roll: 2,
        attendance: false
      },
      {
        name: "Suyash Sonawane",
        roll: 3,
        attendance: false
      },
      {
        name: "Aditya Mahajan",
        roll: 4,
        attendance: false
      },
      {
        name: "Harish Dalal",
        roll: 5,
        attendance: false
      },
      {
        name: "Jane Doe",
        roll: 6,
        attendance: false
      },
      {
        name: "Amit Thete",
        roll: 7,
        attendance: false
      }
    ];
  };

  attendanceMarked = event => {};

  async presentToast() {
    const toast = await this.toastController.create({
      message: `Only today's attendance can be updated!`,
      duration: 2000
    });
    toast.present();
  }

  update() {
    if (this.todaysDate === this.selectedDate) {
    } else {
      this.presentToast();
    }
  }
}
