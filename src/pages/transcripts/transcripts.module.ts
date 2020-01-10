import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranscriptsPage } from './transcripts';

@NgModule({
  declarations: [
    TranscriptsPage,
  ],
  imports: [
    IonicPageModule.forChild(TranscriptsPage),
  ],
})
export class TranscriptsPageModule {}
