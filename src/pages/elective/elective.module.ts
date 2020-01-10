import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ElectivePage } from './elective';

@NgModule({
  declarations: [
    ElectivePage,
  ],
  imports: [
    IonicPageModule.forChild(ElectivePage),
  ],
})
export class ElectivePageModule {}
