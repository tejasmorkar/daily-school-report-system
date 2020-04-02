import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-result",
  templateUrl: "./result.page.html",
  styleUrls: ["./result.page.scss"]
})
export class ResultPage implements OnInit {
  classId = null;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.classId = this.activatedRoute.snapshot.paramMap.get("classId");
  }
}
