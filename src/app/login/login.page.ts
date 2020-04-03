import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { AlertController, MenuController } from "@ionic/angular";

import { Plugins } from "@capacitor/core";
import { ToastController } from "@ionic/angular";

const { App } = Plugins;

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  email: string = "";
  password: string = "";
  clickCount: number = 0;
  backButtonListener;
  constructor(
    public auth: AuthService,
    private router: Router,
    private menu: MenuController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.clickCount = 0;
    this.backButtonListener = App.addListener("backButton", () => {
      if (this.clickCount == 0) {
        this.clickCount += 1;
        this.presentToast(`Press Again To Exit`);
      } else {
        Plugins.App.exitApp();
      }
    });

    if (this.auth.isAuthenticated) {
      this.router.navigate(["/dashboard"]);
    }
  }

  ngOnDestroy() {
    this.backButtonListener.remove();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: `${msg}`,
      duration: 4000
    });
    toast.present();
  }

  createNewAcc() {
    this.email.trim;
    this.password.trim;
    this.auth
      .createAccountWithEmailPassword(this.email, this.password)
      .then(() => {
        this.router.navigate(["./dashboard"]);
      });
  }

  onLoginSubmit() {
    this.email.trim;
    this.password.trim;
    this.auth.emailPasswordSignIn(this.email, this.password).then(() => {
      this.router.navigate(["./dashboard"]);
    });
  }

  resetPassword() {
    this.email.trim;
    this.auth.resetPasswordLink(this.email);
  }
}
