import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AttendancePage } from '../pages/attendance/attendance';
import { QuizPage } from '../pages/quiz/quiz';
import { ScanQuizPage } from '../pages/quiz/scan-quiz/scan-quiz';
import { QuizModalPage } from '../pages/quiz/quiz-modal/quiz-modal';
import { QuizModalPersonPage } from '../pages/quiz/quiz-modal-person/quiz-modal-person';
import { ScanModalPage } from '../pages/attendance/scan-modal/scan-modal';
import { ManageAttendancePage } from '../pages/attendance/manage-attendance/manage-attendance';
import { AboutMePage } from '../pages/about-me/about-me';
//ExpandableComponent
import { ExpandableComponent } from '../components/expandable/expandable';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//services
import { AuthServiceProvider } from '../services/auth.service';
import { CourseService } from '../services/course.service';
import { StudentService } from '../services/student.service';
import { AttendanceService } from '../services/attendance.service';

//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../firebaseConfig';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// ionic Component
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    AttendancePage,
    QuizPage,
    ScanQuizPage,
    QuizModalPage,
    QuizModalPersonPage,
    AboutMePage,
    ScanModalPage,
    ManageAttendancePage,
    ExpandableComponent
  ],
  imports: [
    BrowserModule,
    //IonicModule.forRoot(MyApp),
    IonicModule.forRoot(MyApp, { mode: 'ios' }),
    AngularFireModule.initializeApp(firebaseConfig.config),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    AttendancePage,
    QuizPage,
    ScanQuizPage,
    QuizModalPage,
    QuizModalPersonPage,
    AboutMePage,
    ScanModalPage,
    ManageAttendancePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    AngularFireAuth,
    BarcodeScanner,
    CourseService,
    StudentService,
    AttendanceService
  ]
})
export class AppModule {}
