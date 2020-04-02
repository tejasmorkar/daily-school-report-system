import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-tests",
  templateUrl: "./tests.page.html",
  styleUrls: ["./tests.page.scss"]
})
export class TestsPage implements OnInit {
  classId = null;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.classId = this.activatedRoute.snapshot.paramMap.get("classId");
  }
}
