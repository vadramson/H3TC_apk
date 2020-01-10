import { Component } from '@angular/core';
import {AlertController, NavController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { H3tcApiProvider } from '../../providers/h3tc-api/h3tc-api';
import {ProfilePage} from "../profile/profile";
import {CourseRegPage} from "../course-reg/course-reg";
import {FormbPage} from "../formb/formb";
import {CaResultsPage} from "../ca-results/ca-results";
import {ExamResultsPage} from "../exam-results/exam-results";
import {SemesterResultsPage} from "../semester-results/semester-results";
import {TranscriptsPage} from "../transcripts/transcripts";
import {LoginPage} from "../login/login";




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userDetails : any;
  public curentUserData : any;

  clockIn = {"user": ""};
  clockinResponseData: any;
  clockInDataSet: any;

  name: any;
  username: any;
  picture: any;
  user_id: any;

  birthDate: any;
  department: any;
  matriculation: any;
  program: any;
  nationality: any;
  phone: any;
  address: any;
  birthPlace: any;
  marital_status: any;
  gender: any;
  region: any;

  constructor(public navCtrl: NavController, public storage: Storage, public app: App, public alertCtrl: AlertController, public h3tcApiProvider: H3tcApiProvider) {

  this.storage.get('store').then((data) => {
      this.userDetails = data;
      this.name = this.userDetails.Name;
      this.username = this.userDetails.Username;
      this.picture = this.userDetails.picture;

      this.birthDate = this.userDetails.birthDate;
      this.department = this.userDetails.department;
      this.matriculation = this.userDetails.matriculation;
      this.program = this.userDetails.program;
      this.nationality = this.userDetails.nationality;
      this.phone = this.userDetails.phone;
      this.address = this.userDetails.address;
      this.birthPlace = this.userDetails.birthPlace;
      this.marital_status = this.userDetails.marital_status;
      this.gender = this.userDetails.gender;
      this.region = this.userDetails.region;

      console.log('Your age is in Home.ts', this.userDetails);
      console.log('Name is ', this.userDetails.Name);
      console.log('Username is ', this.userDetails.Username);
    });

  this.doRefresh(0);
  }




    doRefresh(refresh){
    this.storage.get('store').then((data) => {
      this.userDetails = data;
      this.name = this.userDetails.Name;
      this.username = this.userDetails.Username;
      this.picture = this.userDetails.picture;
      this.birthDate = this.userDetails.birthDate;
      this.department = this.userDetails.department;
      this.matriculation = this.userDetails.matriculation;
      this.program = this.userDetails.program;
      this.nationality = this.userDetails.nationality;
      this.phone = this.userDetails.phone;
      this.address = this.userDetails.address;
      this.birthPlace = this.userDetails.birthPlace;
      this.marital_status = this.userDetails.marital_status;
      this.gender = this.userDetails.gender;
      this.region = this.userDetails.region;

      console.log('Your age is in Home.ts', this.userDetails);
      console.log('Name is ', this.userDetails.Name);
      console.log('Username is ', this.userDetails.Username);

      this.clockIn.user = this.userDetails.user_id;
      console.log(this.clockIn);

      if(refresh !=0)
        refresh.complete();

    });
  }

  backToWelcome(){
    this.navCtrl.setRoot(LoginPage);
  }

  logout(){
    this.storage.clear();
    setTimeout(()=> this.backToWelcome(), 1000);
  }


  myProfile(){this.navCtrl.setRoot(ProfilePage);}
  courseReg(){this.navCtrl.setRoot(CourseRegPage);}
  formB(){this.navCtrl.setRoot(FormbPage);}
  caResults(){this.navCtrl.setRoot(CaResultsPage);}
  examResults(){this.navCtrl.setRoot(ExamResultsPage);}
  semester_Results(){this.navCtrl.setRoot(SemesterResultsPage);}
  transcript_request(){this.navCtrl.setRoot(TranscriptsPage);}

}
