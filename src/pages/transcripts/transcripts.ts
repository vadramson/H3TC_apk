import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, AlertController, App, ToastController } from 'ionic-angular';
import { H3tcApiProvider } from '../../providers/h3tc-api/h3tc-api';

/**
 * Generated class for the TranscriptsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transcripts',
  templateUrl: 'transcripts.html',
})
export class TranscriptsPage {

  results_transcript: any;
  list_acc_year: any;
  gpa: any;
  credits_attempted: any;
  credits_earned: any;
  items: any;
  userDetails : any;
  responseData : any;
  successfully : any;
  redundancy : any;
  transcriptResults = {"user": "", "academic_year": ""};
  public datat: any;
  acc_yr_Data = {"user": ""};



  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public h3tcApiProvider: H3tcApiProvider, public events: Events, public app: App,
              public storage: Storage, public toastCtrl: ToastController) {

    this.storage.get('store').then((data) => {
      this.userDetails = data;
      this.acc_yr_Data.user = this.userDetails.user_id;
      this.transcriptResults.user = this.userDetails.user_id;
      this.loadAcademicYear();
      this.getTranscript();
    });

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TranscriptsPage');
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'bottom'
    });
    toast.present();
  }


  loadAcademicYear() {
    this.h3tcApiProvider.postData(this.acc_yr_Data, "academic/year/list/").then((result) => {
      this.responseData = result;
      console.log(this.responseData);
      if (this.responseData.acc_year) {
        this.list_acc_year=this.responseData.acc_year;
        console.log("this.list_acc_year");
        console.log(this.list_acc_year);
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
    this.items = this.list_acc_year.filter(item => item.context === ctxt);
  }


   getTranscript(){
    if(this.transcriptResults.user && this.transcriptResults.academic_year){
      this.h3tcApiProvider.postData(this.transcriptResults, "transcript/results/").then((result) => {
        this.responseData = result;
        this.redundancy = this.responseData.reply;
        if (this.responseData.my_transcript) {
          this.results_transcript=this.responseData.my_transcript;
          this.credits_attempted=this.responseData.credit;
          this.credits_earned=this.responseData.credit_earn;
          this.gpa=this.responseData.gpa;
          console.log("this.results_semester");
          console.log(this.results_transcript);
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
