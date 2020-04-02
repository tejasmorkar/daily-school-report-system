import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-teacher",
  templateUrl: "./teacher.page.html",
  styleUrls: ["./teacher.page.scss"]
})
export class TeacherPage implements OnInit {
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
  constructor(
    private activatedRoute: ActivatedRoute,
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

    this.teacherDailyData = [
      {
        attendance: false,
        lessonPlan: false,
        dayBook: false,
        assemblyParticipation: false,
        otherActivities: false,
        activities: []
      }
    ];

    this.attendance = this.teacherDailyData[0].attendance;
    this.lessonPlan = this.teacherDailyData[0].lessonPlan;
    this.dayBook = this.teacherDailyData[0].dayBook;
    this.assemblyParticipation = this.teacherDailyData[0].assemblyParticipation;
    this.otherActivities = this.teacherDailyData[0].otherActivities;
    this.activities = this.teacherDailyData[0].activities;
  }

  dateSelected = event => {
    this.isDisabled = false;
    this.selectedDate = String(event.detail.value).substring(0, 10);
    this.isDisabled = this.todaysDate !== this.selectedDate;

    this.teacherDailyData = [
      {
        attendance: false,
        lessonPlan: false,
        dayBook: false,
        assemblyParticipation: false,
        otherActivities: false,
        activities: []
      }
    ];

    this.attendance = this.teacherDailyData[0].attendance;
    this.lessonPlan = this.teacherDailyData[0].lessonPlan;
    this.dayBook = this.teacherDailyData[0].dayBook;
    this.assemblyParticipation = this.teacherDailyData[0].assemblyParticipation;
    this.otherActivities = this.teacherDailyData[0].otherActivities;
    this.activities = this.teacherDailyData[0].activities;
  };

  onAttendanceToggle = event => {
    console.log(`Attendance: ${this.attendance}`);
  };

  onLessonPlanToggle = event => {
    console.log(`Lesson Plan: ${this.lessonPlan}`);
  };

  onDayBookToggle = event => {
    console.log(`Day Book: ${this.dayBook}`);
  };

  onAssemblyParticipationToggle = event => {
    console.log(`Assembly Participation: ${this.assemblyParticipation}`);
  };

  onOtherActivitiesToggle = event => {
    console.log(`Other Activities: ${this.otherActivities}`);
  };

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
      this.teacherDailyData[0].attendance = this.attendance;
      this.teacherDailyData[0].lessonPlan = this.lessonPlan;
      this.teacherDailyData[0].dayBook = this.dayBook;
      this.teacherDailyData[0].assemblyParticipation = this.assemblyParticipation;
      this.teacherDailyData[0].otherActivities = this.otherActivities;
      this.teacherDailyData[0].activities = this.activities;
      console.log(this.teacherDailyData);
    } else {
      this.presentToast();
    }
  }
}
