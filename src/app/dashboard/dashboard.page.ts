import { Component, OnInit } from "@angular/core";
import { MenuController, ToastController } from "@ionic/angular";

import { Plugins } from "@capacitor/core";

const { App } = Plugins;

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"]
})
export class DashboardPage implements OnInit {
  clickCount: number = 0;
  backButtonListener;
  constructor(
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
}
