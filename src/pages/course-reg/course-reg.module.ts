import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CourseRegPage } from './course-reg';

@NgModule({
  declarations: [
    CourseRegPage,
  ],
  imports: [
    IonicPageModule.forChild(CourseRegPage),
  ],
})
export class CourseRegPageModule {}
