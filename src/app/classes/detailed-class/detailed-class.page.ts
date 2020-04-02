import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-detailed-class",
  templateUrl: "./detailed-class.page.html",
  styleUrls: ["./detailed-class.page.scss"]
})
export class DetailedClassPage implements OnInit {
  classId = null;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.classId = this.activatedRoute.snapshot.paramMap.get("classId");
  }
}
