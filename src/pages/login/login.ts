import { Component } from '@angular/core';
import { IonicPage, NavController, App, MenuController, AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
// import { ActionSheet, ActionSheetOptions } from "@ionic-native/action-sheet";
import { H3tcApiProvider } from '../../providers/h3tc-api/h3tc-api';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string;
  password: string;
  splash = true;
  public userDetails : any;
  responseData : any;
  public datat: any;
  userData = {"username":"", "password":""};


  constructor(public navCtrl: NavController,  public events: Events, public app: App,
              public storage: Storage, public menuCtrl: MenuController, public alertCtrl: AlertController, public h3tcApiProvider: H3tcApiProvider) {
  }



   // START Functions to prevent user from accessing sidemenu from login Page

  ionViewWillEnter(){
    this.menuCtrl.swipeEnable(false)
  }

  ionViewDidLeave(){
    this.menuCtrl.swipeEnable(true)
  }

  // END Functions to prevent user from accessing sidemenu from login Page

  ionViewDidLoad(){
    // this.tabBarElement.style.display = 'none'; // If using a tabs template?
    setTimeout(() =>{
      this.splash = false;
      // this.tabBarElement.style.display = 'flex'; // If using a tabs template?
    }, 8000);
  }

  login(){
    // Connect to the API if Validated Login the go to home page
    // this.navCtrl.push(HomePage);

    this.h3tcApiProvider.postData(this.userData, "login/").then((result)=>{
      this.datat = result;
     // console.log('Your age is');
     this.storage.set('store', this.datat);
     this.storage.get('store').then((value) => {
        console.log('Your age is', value);
      });

      window.localStorage.setItem( 'authData', JSON.stringify(this.datat));
      var appData = JSON.parse( window.localStorage.getItem( 'authData' ));
      this.userDetails = appData.authData;
      console.log(this.datat);
      console.log('Login.ts local data');
      console.log(this.userDetails);
      let alertSuccess = this.alertCtrl.create({
        title: 'Authorised',
        subTitle: 'Successful Login',
        buttons: ['Proceed'],
      });
      alertSuccess.present();
      this.navCtrl.setRoot(HomePage,{
        name: this.datat.Name,
        username: this.datat.Username,
        picture: this.datat.picture,
        user_id: this.datat.user_id,
      });
    }, (err) => {
      // alert Error Message
      console.log("Error No Such Name");
      let alert = this.alertCtrl.create({
        title: 'Unauthorised',
        subTitle: 'Wrong Username or Password',
        buttons: ['Ok'],
      });
      alert.present();
    });
    this.navCtrl.setRoot(HomePage);
  }


}
