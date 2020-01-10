import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SemesterResultsPage } from './semester-results';

@NgModule({
  declarations: [
    SemesterResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(SemesterResultsPage),
  ],
})
export class SemesterResultsPageModule {}
