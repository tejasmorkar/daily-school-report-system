import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { FirestoreServiceService } from "src/app/services/firestore-service.service";
import { AuthService } from "src/app/services/auth.service";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-teacher",
  templateUrl: "./teacher.page.html",
  styleUrls: ["./teacher.page.scss"]
})
export class TeacherPage implements OnInit {
  user = null;
  userEmail: string = null;
  teacherId = null;
  selectedDate = null;
  todaysDate = null;
  isDisabled: boolean = null;
  teacherDailyData = null;
  attendance: boolean = null;
  lessonPlan: boolean = null;
  dayBook: boolean = null;
  assemblyParticipation: boolean = null;
  otherActivities: boolean = null;
  activities: string[] = null;
  activityInput: string = null;
  user1: Subscription;
  user2: Subscription;
  user3: Subscription;
  user4: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private firestoreService: FirestoreServiceService,
    private auth: AuthService,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.teacherId = this.activatedRoute.snapshot.paramMap.get("teacherId");
    const today = new Date();
    const todaysDay = String(today.getDate()).padStart(2, "0");
    const todaysMonth = String(today.getMonth() + 1).padStart(2, "0");
    const todaysYear = today.getFullYear();
    this.todaysDate = `${todaysYear}-${todaysMonth}-${todaysDay}`;
    this.selectedDate = this.todaysDate;

    this.user1 = this.auth.user$.subscribe(data => {
      this.user = data;
      if (data) {
        const email = this.user.email;
        this.getTeachersDailyData(this.selectedDate, email);
      }
    });
  }

  getTeachersDailyData(date, email) {
    this.firestoreService
      .getTeacherDetails(this.teacherId, date, email)
      .then(data => {
        data.subscribe(val => {
          if (val) {
            this.teacherDailyData = val;
          } else {
            this.teacherDailyData = {
              attendance: false,
              lessonPlan: false,
              dayBook: false,
              assemblyParticipation: false,
              otherActivities: false,
              activities: []
            };
          }
          if (this.teacherDailyData) {
            this.attendance = this.teacherDailyData.attendance;
            this.lessonPlan = this.teacherDailyData.lessonPlan;
            this.dayBook = this.teacherDailyData.dayBook;
            this.assemblyParticipation = this.teacherDailyData.assemblyParticipation;
            this.otherActivities = this.teacherDailyData.otherActivities;
            this.activities = this.teacherDailyData.activities;
          }
        });
      });
  }

  dateSelected = event => {
    this.isDisabled = false;
    this.selectedDate = String(event.detail.value).substring(0, 10);
    this.isDisabled = this.todaysDate !== this.selectedDate;

    this.user3 = this.auth.user$.subscribe(data => {
      this.user = data;
      if (data) {
        const email = this.user.email;
        this.getTeachersDailyData(this.selectedDate, email);
      }
    });
  };

  onAttendanceToggle = event => {
    this.user4 = this.auth.user$.subscribe(data => {
      this.user = data;
      if (data) {
        const email = this.user.email;
        this.firestoreService.changeAttendance(
          this.attendance,
          this.teacherId,
          email
        );

        this.teacherDailyData.attendance = this.attendance;

        this.firestoreService.setTeacherDetails(
          this.teacherId,
          this.selectedDate,
          email,
          this.teacherDailyData
        );
      }
    });
  };

  onLessonPlanToggle = event => {};

  onDayBookToggle = event => {};

  onAssemblyParticipationToggle = event => {};

  onOtherActivitiesToggle = event => {};

  onActivityAdd = (data: string) => {
    if (data) {
      this.activities.push(data);
      this.activityInput = "";
    }
  };

  onActivityRemove = activity => {
    let index = this.activities.indexOf(activity);
    if (index > -1) {
      this.activities.splice(index, 1);
    }
    console.log(this.activities);
  };

  async presentToast() {
    const toast = await this.toastController.create({
      message: `Only today's attendance can be updated!`,
      duration: 2000
    });
    toast.present();
  }

  update() {
    if (this.todaysDate === this.selectedDate) {
      this.teacherDailyData.attendance = this.attendance;
      this.teacherDailyData.lessonPlan = this.lessonPlan;
      this.teacherDailyData.dayBook = this.dayBook;
      this.teacherDailyData.assemblyParticipation = this.assemblyParticipation;
      this.teacherDailyData.otherActivities = this.otherActivities;
      this.teacherDailyData.activities = this.activities;

      this.user2 = this.auth.user$.subscribe(data => {
        this.user = data;
        if (data) {
          const email = this.user.email;
          this.firestoreService.setTeacherDetails(
            this.teacherId,
            this.selectedDate,
            email,
            this.teacherDailyData
          );
        }
      });
    } else {
      this.presentToast();
    }
  }

  ngOnDestroy() {
    if (this.user1) this.user1.unsubscribe();
    if (this.user2) this.user2.unsubscribe();
    if (this.user3) this.user3.unsubscribe();
    if (this.user4) this.user4.unsubscribe();
  }
}
