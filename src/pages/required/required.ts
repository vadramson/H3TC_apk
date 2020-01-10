import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, AlertController, App, ToastController } from 'ionic-angular';
import { H3tcApiProvider } from '../../providers/h3tc-api/h3tc-api';

/**
 * Generated class for the RequiredPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-required',
  templateUrl: 'required.html',
})
export class RequiredPage {

   my_majorCourses: any;
  list_courses: any;
  items: any;
  userDetails : any;
  responseData : any;
  successfully : any;
  redundancy : any;
  majDel = {"user": "", "id": ""};
  public datat: any;
  courserData = {"user": ""};
  coursesData = {"user": ""};
  majorCourseData = {"user": "", "id": ""};

   constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public h3tcApiProvider: H3tcApiProvider, public events: Events, public app: App,
              public storage: Storage, public toastCtrl: ToastController) {

    this.storage.get('store').then((data) => {
      this.userDetails = data;
      this.courserData.user = this.userDetails.user_id;
      this.majorCourseData.user = this.userDetails.user_id;
      this.majDel.user = this.userDetails.user_id;
      this.loadCourses();
      this.addRequired();
      // this.dropMajor(ordIDNum);
      this.loadRequiredCourses();
    });


  }
   dropRequired(ordIDNum){
    if (ordIDNum){
      this.majDel.id = ordIDNum;
      console.log(this.majDel);
      this.h3tcApiProvider.postData(this.majDel, "drop/required/courses/").then((result) => {
        this.responseData = result;
        if (this.responseData.required) {
          this.my_majorCourses=this.responseData.required;
          console.log("this.my_majorCourses");
          console.log(this.my_majorCourses);
          this.presentToast(this.responseData.message);
        }
        else {
          console.log("Error Occurred!");
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
    else {
      console.log("Product Deleted " + ordIDNum);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MajorPage');
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'bottom'
    });
    toast.present();
  }

  addRequired() {
    if(this.majorCourseData.user && this.majorCourseData.id){
      this.h3tcApiProvider.postData(this.majorCourseData, "add/required/courses/").then((result) => {
        this.responseData = result;
        this.redundancy = this.responseData.error_msg;
        this.successfully = this.responseData.success_msg;
        if (this.responseData.required) {
          this.my_majorCourses=this.responseData.required;
          console.log("this.my_majorCourses");
          console.log(this.my_majorCourses);
        } else {
        console.log("Error Occurred!");
        }

        if(this.redundancy){
          let insuficiency = this.alertCtrl.create({
            title: 'REDUNDANCY!!',
            subTitle: 'Can`t Register the same Course Twice.',
            buttons: ['Ok'],
          });
          insuficiency.present();
        }
        if (this.successfully){
          this.presentToast("New Major Added....");
        }

        this.majorCourseData.user = '';
        this.majorCourseData.id = '';

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


   loadCourses() {

    this.h3tcApiProvider.postData(this.coursesData, "get/all/courses/").then((result) => {
      this.responseData = result;
      if (this.responseData.courses) {
        this.list_courses=this.responseData.courses;
        console.log("this.list_courses");
        console.log(this.list_courses);
      } else {
        console.log("Load Courses Error!");
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
    this.items = this.list_courses.filter(item => item.context === ctxt);
  }


  loadRequiredCourses() {

    this.h3tcApiProvider.postData(this.courserData, "get/all/required/courses/").then((result) => {
      this.responseData = result;
      if (this.responseData.required) {
        this.my_majorCourses=this.responseData.required;
        console.log("this.my_majorCourses");
        console.log(this.my_majorCourses);
      } else {
        console.log("Error Occurred!");
      }
    }, (err) => {
      // alert Error Message
      console.log("Error No Such Name");
      let alert = this.alertCtrl.create({
        title: 'Connection Problem',
        subTitle: 'Check Your WiFi Connection or Data Major!',
        buttons: ['Ok'],
      });
      alert.present();
    });

  }

}
