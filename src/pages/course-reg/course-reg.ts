import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MajorPage} from "../major/major";
import {MinorPage} from "../minor/minor";
import {ElectivePage} from "../elective/elective";
import {RequiredPage} from "../required/required";

/**
 * Generated class for the CourseRegPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-course-reg',
  templateUrl: 'course-reg.html',
})
export class CourseRegPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourseRegPage');
  }


  majorCourse(){this.navCtrl.setRoot(MajorPage);}
  minorCourse(){this.navCtrl.setRoot(MinorPage);}
  electiveCourse(){this.navCtrl.setRoot(ElectivePage);}
  requiredCourse(){this.navCtrl.setRoot(RequiredPage);}
}
