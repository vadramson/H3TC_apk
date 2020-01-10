import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpModule } from "@angular/http";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import {ProfilePage} from '../pages/profile/profile';
import {CourseRegPage} from "../pages/course-reg/course-reg";
import {MajorPage} from "../pages/major/major";
import {MinorPage} from "../pages/minor/minor";
import {ElectivePage} from "../pages/elective/elective";
import {RequiredPage} from "../pages/required/required";
import {FormbPage} from "../pages/formb/formb";
import {CaResultsPage} from "../pages/ca-results/ca-results";
import {ExamResultsPage} from "../pages/exam-results/exam-results";
import {SemesterResultsPage} from "../pages/semester-results/semester-results";
import {TranscriptsPage} from "../pages/transcripts/transcripts";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { H3tcApiProvider } from '../providers/h3tc-api/h3tc-api';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ProfilePage,
    CourseRegPage,
    MajorPage,
    MinorPage,
    ElectivePage,
    RequiredPage,
    FormbPage,
    CaResultsPage,
    ExamResultsPage,
    SemesterResultsPage,
    TranscriptsPage
  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ListPage,
    ProfilePage,
    CourseRegPage,
    MajorPage,
    MinorPage,
    ElectivePage,
    RequiredPage,
    FormbPage,
    CaResultsPage,
    ExamResultsPage,
    SemesterResultsPage,
    TranscriptsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    H3tcApiProvider
  ]
})
export class AppModule {}
