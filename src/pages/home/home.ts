import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { AuthServiceProvider } from '../../services/auth.service';
//import { Course } from '../../services/course.model';
import { AttendancePage } from '../../pages/attendance/attendance';
import { QuizPage } from '../../pages/quiz/quiz';
import { LoginPage } from '../login/login';
import { AttendanceService } from '../../services/attendance.service';
//import { PopoverPage } from './popover/popover'
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  courseList: any;
  isToggled: boolean = false;
  btnName: any = 'EDIT';
  flag: any = false;
  activity: { id: '', name: '' };
  groupNo: any;
  foundCourse: boolean = false;
  eventList: any;
  selectedEvent: any;

  constructor(
    public navCtrl: NavController,
    private auth: AuthServiceProvider,
    private db: AngularFireDatabase,
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController) {

    //this.doRefresh(0);
    this.courseList = []
    this.eventList = [];
    this.selectedEvent = [];
    const path = `users/${this.auth.currentUserId()}/course/`;
    this.db.list(path).snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).subscribe(items => {
      if (items.length !== 0) {
        this.courseList = items;
        this.foundCourse = true;
      }
      return items.map(item => item.key);
    });
  }

  selectedCourse(cid: string, cname: string, index, groupCount) {
    this.navCtrl.push(AttendancePage, {
      course_id: cid,
      course_name: cname,
      activity: { id: 'attendance', name: 'ATTENDANCE' },
      pic: index,
      groupCount: groupCount
    });
  }

  showRadio(cid: string, cname: string, img: String, index, groupCount) {
    let events = this.courseList[index].eventList;
    let eKey = Object.keys(events);

    let alert = this.alertCtrl.create({
      title: 'เลือกรายการที่ต้องการ'
    });
    //alert.setTitle();
    //alert.setcssClass('danger')
    for (var i = 0; i < eKey.length; i++) {
      console.log(events[eKey[i]].name)
      if (events[eKey[i]].id !== 'score') {
        let val = { id: events[eKey[i]].id, name: events[eKey[i]].name };
        this.selectedEvent[i] = val;
        if (i == 0) {
          alert.addInput({
            type: 'radio', label: events[eKey[i]].name, value: String(i), checked: true
          });
        } else {

          alert.addInput({
            type: 'radio', label: events[eKey[i]].name, value: String(i), checked: false
          });
        }
      }
    }

    alert.addInput({ type: 'radio', label: 'Change Color', value: 'color', checked: false });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if (data == 'color') {
          this.colorAlert(cid, img);
        } else {
          let int = parseInt(data);
          let id = this.selectedEvent[int].id;
          let name = this.selectedEvent[int].name;


          if (id == 'attendance') {
            this.navCtrl.push(AttendancePage, {
              course_id: cid,
              course_name: cname,
              activity: { id: 'attendance', name: 'ATTENDANCE' },
              pic: index,
              groupCount: groupCount
            });
          } else {
            this.navCtrl.push(QuizPage, {
              course_id: cid,
              course_name: cname,
              activity: { id: id, name: name },
              pic: index,
              groupCount: groupCount
            });
          }
        }

        /*
        if (data == 'attendance') {
          this.navCtrl.push(AttendancePage, {
            course_id: cid,
            course_name: cname,
            activity: { id: 'attendance', name: 'ATTENDANCE' },
            pic: index,
            groupCount: groupCount
          });
        } else if (data == 'quiz') {
          this.navCtrl.push(QuizPage, {
            course_id: cid,
            course_name: cname,
            activity: { id: 'quiz', name: 'QUIZ' },
            pic: index,
            groupCount: groupCount
          });
        } else if (data == 'hw') {
          this.navCtrl.push(QuizPage, {
            course_id: cid,
            course_name: cname,
            activity: { id: 'hw', name: 'HOMEWORK' },
            pic: index,
            groupCount: groupCount
          });
        } else if (data == 'lab') {
          this.navCtrl.push(QuizPage, {
            course_id: cid,
            course_name: cname,
            activity: { id: 'lab', name: 'LAB' },
            pic: index,
            groupCount: groupCount
          });
        }
        */
      }
    });
    alert.present();
  }

  logout() {
    this.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

  colorAlert(cid, img) {
    //console.log(cimg);
    let alert = this.alertCtrl.create();
    alert.setTitle('Color');
    alert.addInput({ type: 'radio', label: 'Default Image', value: 'pic', checked: true });
    alert.addInput({ type: 'radio', label: 'Pink', value: '#fa678c', checked: false });
    alert.addInput({ type: 'radio', label: 'Sky-Blue', value: '#669cfa', checked: false });
    alert.addInput({ type: 'radio', label: 'Orange', value: '#fd7c31', checked: false });
    alert.addInput({ type: 'radio', label: 'Red', value: '#f53d3d', checked: false });
    alert.addInput({ type: 'radio', label: 'Blue', value: '#3947c9', checked: false });
    alert.addInput({ type: 'radio', label: 'Green', value: '#32ad32', checked: false });
    alert.addInput({ type: 'radio', label: 'White', value: 'white', checked: false });
    alert.addInput({ type: 'radio', label: 'Black', value: 'black', checked: false });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.db.object(`users/${this.auth.currentUserId()}/course/${cid}/`)
          .update({ img: data, });
      }
    });
    alert.present();
  }

}
