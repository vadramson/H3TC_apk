import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, AlertController, App, ToastController } from 'ionic-angular';
import { H3tcApiProvider } from '../../providers/h3tc-api/h3tc-api';

/**
 * Generated class for the FormbPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-formb',
  templateUrl: 'formb.html',
})
export class FormbPage {

  userDetails : any;
  responseData : any;
  list_courses : any;
  public datat: any;
  courserData = {"user": ""};


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public h3tcApiProvider: H3tcApiProvider, public events: Events, public app: App,
              public storage: Storage, public toastCtrl: ToastController){

    this.storage.get('store').then((data) => {
      this.userDetails = data;
      this.courserData.user = this.userDetails.user_id;
      this.loadFinalCourses();
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormbPage');
  }


  loadFinalCourses() {

    this.h3tcApiProvider.postData(this.courserData, "my/courses/").then((result) => {
      this.responseData = result;
      if (this.responseData.my_courses) {
        this.list_courses=this.responseData.my_courses;
        console.log("Form B Here");
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

}
