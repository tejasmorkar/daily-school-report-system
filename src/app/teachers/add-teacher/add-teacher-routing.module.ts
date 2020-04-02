import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTeacherPage } from './add-teacher.page';

const routes: Routes = [
  {
    path: '',
    component: AddTeacherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTeacherPageRoutingModule {}
