import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.page.html",
  styleUrls: ["./student-list.page.scss"]
})
export class StudentListPage implements OnInit {
  classId = null;
  students = null;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.classId = this.activatedRoute.snapshot.paramMap.get("classId");
    this.students = [
      {
        name: "Tejas Morkar",
        roll: 1,
        gender: "Male"
      },
      {
        name: "Richa Pawar",
        roll: 2,
        gender: "Female"
      },
      {
        name: "Suyash Sonawane",
        roll: 3,
        gender: "Male"
      },
      {
        name: "Aditya Mahajan",
        roll: 4,
        gender: "Male"
      },
      {
        name: "Harish Dalal",
        roll: 5,
        gender: "Male"
      },
      {
        name: "Jane Doe",
        roll: 6,
        gender: "Female"
      },
      {
        name: "Amit Thete",
        roll: 7,
        gender: "Male"
      }
    ];
  }
}
