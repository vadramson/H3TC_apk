import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, AlertController, App, ToastController } from 'ionic-angular';
import { H3tcApiProvider } from '../../providers/h3tc-api/h3tc-api';

/**
 * Generated class for the CaResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ca-results',
  templateUrl: 'ca-results.html',
})
export class CaResultsPage {

  results_ca: any;
  list_ca: any;
  items: any;
  userDetails : any;
  responseData : any;
  successfully : any;
  redundancy : any;
  caResults = {"user": "", "ca": ""};
  public datat: any;
  caData = {"user": ""};



  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public h3tcApiProvider: H3tcApiProvider, public events: Events, public app: App,
              public storage: Storage, public toastCtrl: ToastController) {

    this.storage.get('store').then((data) => {
      this.userDetails = data;
      this.caData.user = this.userDetails.user_id;
      this.caResults.user = this.userDetails.user_id;
      // this.loadMajorCourses();
      this.loadCA();
      this.getCAResults();
      // this.dropMajor(ordIDNum);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CaResultsPage');
  }

   presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'bottom'
    });
    toast.present();
  }


  loadCA() {
    this.h3tcApiProvider.postData(this.caData, "ca/list/").then((result) => {
      this.responseData = result;
      if (this.responseData.ca) {
        this.list_ca=this.responseData.ca;
        console.log("this.list_ca");
        console.log(this.list_ca);
      } else {
        console.log("Load CA Error!");
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
    this.items = this.list_ca.filter(item => item.context === ctxt);
  }


   getCAResults(){
    if(this.caResults.user && this.caResults.ca){
      this.h3tcApiProvider.postData(this.caResults, "ca/results/").then((result) => {
        this.responseData = result;
        this.redundancy = this.responseData.reply;
        if (this.responseData.ca_results) {
          this.results_ca=this.responseData.ca_results;
          console.log("this.results_ca");
          console.log(this.results_ca);
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
