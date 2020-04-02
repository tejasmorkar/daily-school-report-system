import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { AlertController, MenuController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  email: string = "";
  password: string = "";
  constructor(
    public auth: AuthService,
    private router: Router,
    private menu: MenuController
  ) {}

  ngOnInit() {
    if (this.auth.isAuthenticated) {
      this.router.navigate(["/dashboard"]);
    }
  }

  createNewAcc() {
    this.auth
      .createAccountWithEmailPassword(this.email, this.password)
      .then(() => {
        this.router.navigate(["./dashboard"]);
      });
  }

  onLoginSubmit() {
    this.auth.emailPasswordSignIn(this.email, this.password).then(() => {
      this.router.navigate(["./dashboard"]);
    });
  }

  resetPassword() {
    this.auth.resetPasswordLink(this.email);
  }
}
