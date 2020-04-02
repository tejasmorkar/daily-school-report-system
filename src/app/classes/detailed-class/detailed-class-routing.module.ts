import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DetailedClassPage } from "./detailed-class.page";

const routes: Routes = [
  {
    path: "",
    component: DetailedClassPage
  },
  {
    path: "attendance/:classId",
    loadChildren: () =>
      import("./attendance/attendance.module").then(m => m.AttendancePageModule)
  },
  {
    path: "student-list/:classId",
    loadChildren: () =>
      import("./student-list/student-list.module").then(
        m => m.StudentListPageModule
      )
  },
  {
    path: "tests/:classId",
    loadChildren: () =>
      import("./tests/tests.module").then(m => m.TestsPageModule)
  },
  {
    path: "result/:classId",
    loadChildren: () =>
      import("./result/result.module").then(m => m.ResultPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailedClassPageRoutingModule {}
