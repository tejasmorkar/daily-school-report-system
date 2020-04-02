import { Component, OnInit } from "@angular/core";

import { Platform, MenuController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import * as firebase from "firebase/app";
import { AuthService } from "./services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  user: any = null;
  userEmail: string = null;
  photoURL: string = null;
  public appPages = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: "analytics"
    },
    {
      title: "Teachers",
      url: "/teachers",
      icon: "people"
    },
    {
      title: "Classes",
      url: "/classes",
      icon: "library"
    },
    {
      title: "Settings",
      url: "/settings",
      icon: "settings"
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    private menu: MenuController,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.auth.user$.subscribe(data => {
      if (data) {
        this.user = data;
        if (this.user.email) {
          this.userEmail = this.user.email;
        } else {
          this.userEmail = `User Email Not Detected`;
        }
        if (this.user.photoURL) {
          this.photoURL = this.user.photoURL;
        } else {
          this.photoURL = `../assets/icon/undraw_male_avatar_323b.svg`;
        }
      } else {
        this.photoURL = `../assets/icon/undraw_male_avatar_323b.svg`;
        this.userEmail = `User Not Detected`;
      }
    });
  }

  logOut() {
    this.selectedIndex = 0;
    this.menu.close();

    this.auth.signOut().then(() => {
      this.router.navigate(["/login"]);
    });
  }
}
