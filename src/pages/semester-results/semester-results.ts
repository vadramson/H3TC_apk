import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, AlertController, App, ToastController } from 'ionic-angular';
import { H3tcApiProvider } from '../../providers/h3tc-api/h3tc-api';


/**
 * Generated class for the SemesterResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-semester-results',
  templateUrl: 'semester-results.html',
})
export class SemesterResultsPage {

  results_semester: any;
  list_semester: any;
  gpa: any;
  credits_attempted: any;
  credits_earned: any;
  items: any;
  userDetails : any;
  responseData : any;
  successfully : any;
  redundancy : any;
  semesterResults = {"user": "", "semester": ""};
  public datat: any;
  semesterData = {"user": ""};



  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public h3tcApiProvider: H3tcApiProvider, public events: Events, public app: App,
              public storage: Storage, public toastCtrl: ToastController) {

    this.storage.get('store').then((data) => {
      this.userDetails = data;
      this.semesterData.user = this.userDetails.user_id;
      this.semesterResults.user = this.userDetails.user_id;
      this.loadSemester();
      this.getSemesterResults();
    });

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SemesterResultsPage');
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'bottom'
    });
    toast.present();
  }


  loadSemester() {
    this.h3tcApiProvider.postData(this.semesterData, "semester/list/").then((result) => {
      this.responseData = result;
      console.log(this.responseData);
      if (this.responseData.semester) {
        this.list_semester=this.responseData.semester;
        console.log("this.list_semester");
        console.log(this.list_semester);
      } else {
        console.log("Load Semester Error!");
      }
    }, (err) => {
      // alert Error Message
      console.log("Error Getting Semesters");
      let alert = this.alertCtrl.create({
        title: 'Connection Problem',
        subTitle: 'Check Your WiFi Connection or Data!',
        buttons: ['Ok'],
      });
      alert.present();
    });

  }

  onContextChange(ctxt: string): void {
    this.items = this.list_semester.filter(item => item.context === ctxt);
  }


   getSemesterResults(){
    if(this.semesterResults.user && this.semesterResults.semester){
      this.h3tcApiProvider.postData(this.semesterResults, "semester/results/").then((result) => {
        this.responseData = result;
        this.redundancy = this.responseData.reply;
        if (this.responseData.semester_results) {
          this.results_semester=this.responseData.semester_results;
          this.credits_attempted=this.responseData.credit;
          this.credits_earned=this.responseData.credit_earn;
          this.gpa=this.responseData.gpa;
          console.log("this.results_semester");
          console.log(this.results_semester);
          console.log(this.credits_attempted);
          console.log(this.credits_earned, this.gpa);
          console.log(this.gpa);
        } else {
        console.log("Error Occurred!");
        }

        if(this.redundancy){
          let insuficiency = this.alertCtrl.create({
            title: 'REDUNDANCY!!',
            subTitle: this.redundancy,
            buttons: ['Ok'],
          });
          insuficiency.present();
        }

      }, (err) => {
        // alert Error Message
        console.log("Error No Such Name");
        let alert = this.alertCtrl.create({
          title: 'Connection Problem',
          subTitle: 'Check Your WiFi Connection or Data!',
          buttons: ['Ok'],
        });
        alert.present();
      });
    }
  }

}
