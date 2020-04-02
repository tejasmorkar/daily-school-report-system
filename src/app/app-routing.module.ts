import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard/",
    pathMatch: "full"
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then(m => m.LoginPageModule)
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then(m => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: "classes",
    loadChildren: () =>
      import("./classes/classes.module").then(m => m.ClassesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: "teachers",
    loadChildren: () =>
      import("./teachers/teachers.module").then(m => m.TeachersPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./settings/settings.module").then(m => m.SettingsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    redirectTo: "dashboard",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
