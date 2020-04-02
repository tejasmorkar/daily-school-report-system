import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TeachersPage } from "./teachers.page";

const routes: Routes = [
  {
    path: "",
    component: TeachersPage
  },
  {
    path: "teacher/:teacherId",
    loadChildren: () =>
      import("./teacher/teacher.module").then(m => m.TeacherPageModule)
  },
  {
    path: 'add-teacher',
    loadChildren: () => import('./add-teacher/add-teacher.module').then( m => m.AddTeacherPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersPageRoutingModule {}
