import { Component, OnInit } from "@angular/core";
import { ToastController } from "@ionic/angular";

import { Plugins } from "@capacitor/core";

const { App } = Plugins;

@Component({
  selector: "app-classes",
  templateUrl: "./classes.page.html",
  styleUrls: ["./classes.page.scss"]
})
export class ClassesPage implements OnInit {
  clickCount: number = 0;
  backButtonListener;
  constructor(public toastController: ToastController) {}

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
