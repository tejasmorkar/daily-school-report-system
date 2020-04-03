import { Component, OnInit } from "@angular/core";

import { Plugins } from "@capacitor/core";
import { ToastController } from "@ionic/angular";

const { App } = Plugins;

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"]
})
export class SettingsPage implements OnInit {
  clickCount: number = 0;
  backButtonListener;
  constructor(private toastController: ToastController) {}

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
