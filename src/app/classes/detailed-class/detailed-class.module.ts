import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailedClassPageRoutingModule } from './detailed-class-routing.module';

import { DetailedClassPage } from './detailed-class.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailedClassPageRoutingModule
  ],
  declarations: [DetailedClassPage]
})
export class DetailedClassPageModule {}
