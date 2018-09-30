import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { AboutMePage } from '../pages/about-me/about-me';
//
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthServiceProvider } from '../services/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage: any = HomePage;
  //pages: Array<{title: string, component: any}>;
  loginStatus: any;
  rootPage: any;
  pages;
  userData = {};

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private auth: AuthServiceProvider,
    private db: AngularFireDatabase) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home'},
      { title: 'About us', component: AboutMePage, icon: 'contacts'},
      { title: 'Sign Out', component: "", icon: 'log-out'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
    });

    this.auth.afAuth.authState
    .subscribe(
      user => {
        if (user) {
          this.rootPage = HomePage;
          this.getUserProfile();
        } else {
          this.rootPage = LoginPage;
        }
      },
      () => {
        this.rootPage = LoginPage;
      }
    );
  }

  getUserProfile(){
    const path = `users/${this.auth.currentUserId()}/profile`;
    this.db.object(path).valueChanges().subscribe((res) => {
      this.userData = res;
      //this.firstChar = String(res.firstName).charAt(0);
      return res;
    })
  }

  firstChar(string){
    return String(string).charAt(0);
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.component == ""){
      this.logout()
    }else{
      this.nav.setRoot(page.component);
    }
  }

  logout() {
    this.auth.signOut();
    this.nav.setRoot(LoginPage);
  }

}
