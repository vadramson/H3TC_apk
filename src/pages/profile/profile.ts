import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  userDetails : any;
  public curentUserData : any;

  clockIn = {"user": ""};

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
  email: any;

  constructor(public navCtrl: NavController, public storage: Storage, public app: App, public alertCtrl: AlertController) {

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
      this.region = this.userDetails.region;
      this.email = this.userDetails.email;
      if(this.userDetails.gender == 4){
        this.gender = 'Male';
      }else {
        this.gender = 'Female';
      }


    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }


    doRefresh(refresh){
    this.storage.get('store').then((data) => {
      this.userDetails = data;
      this.name = this.userDetails.Name;
      this.username = this.userDetails.Username;
      this.picture = this.userDetails.picture;
      console.log('Your age is in Home.ts', this.userDetails);
      console.log('Name is ', this.userDetails.Name);
      console.log('Username is ', this.userDetails.Username);

      this.clockIn.user = this.userDetails.user_id;
      console.log(this.clockIn);

      if(refresh !=0)
        refresh.complete();

    });
  }



}
