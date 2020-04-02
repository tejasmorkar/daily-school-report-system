import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ClassesPage } from "./classes.page";

const routes: Routes = [
  {
    path: "",
    component: ClassesPage
  },
  {
    path: "class/:classId",
    loadChildren: () =>
      import("./detailed-class/detailed-class.module").then(
        m => m.DetailedClassPageModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesPageRoutingModule {}
