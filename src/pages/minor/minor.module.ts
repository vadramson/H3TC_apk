import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinorPage } from './minor';

@NgModule({
  declarations: [
    MinorPage,
  ],
  imports: [
    IonicPageModule.forChild(MinorPage),
  ],
})
export class MinorPageModule {}
