import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, AlertController, App, ToastController } from 'ionic-angular';
import { H3tcApiProvider } from '../../providers/h3tc-api/h3tc-api';

/**
 * Generated class for the ExamResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exam-results',
  templateUrl: 'exam-results.html',
})
export class ExamResultsPage {
  results_exam: any;
  list_exam: any;
  items: any;
  userDetails : any;
  responseData : any;
  successfully : any;
  redundancy : any;
  examResults = {"user": "", "exam": ""};
  public datat: any;
  examData = {"user": ""};



  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public h3tcApiProvider: H3tcApiProvider, public events: Events, public app: App,
              public storage: Storage, public toastCtrl: ToastController) {

    this.storage.get('store').then((data) => {
      this.userDetails = data;
      this.examData.user = this.userDetails.user_id;
      this.examResults.user = this.userDetails.user_id;
      // this.loadMajorCourses();
      this.loadExam();
      this.getExamResults();
      // this.dropMajor(ordIDNum);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExamResultsPage');
  }

   presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'bottom'
    });
    toast.present();
  }


  loadExam() {
    this.h3tcApiProvider.postData(this.examData, "exam/list/").then((result) => {
      this.responseData = result;
      if (this.responseData.exam) {
        this.list_exam=this.responseData.exam;
        console.log("this.list_exam");
        console.log(this.list_exam);
      } else {
        console.log("Load Exam Error!");
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

  onContextChange(ctxt: string): void {
    this.items = this.list_exam.filter(item => item.context === ctxt);
  }


   getExamResults(){
    if(this.examResults.user && this.examResults.exam){
      this.h3tcApiProvider.postData(this.examResults, "exam/results/").then((result) => {
        this.responseData = result;
        this.redundancy = this.responseData.reply;
        if (this.responseData.exam_results) {
          this.results_exam=this.responseData.exam_results;
          console.log("this.results_eaxm");
          console.log(this.results_exam);
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
