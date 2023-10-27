import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CanActivate } from "@angular/router";
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: UserService, private router: Router) {}

  canActivate() {
    // If the user is not logged in we'll send them back to the home page
    if (!this.authService.isLogged()) {
      console.log("No estás logueado");
      this.router.navigate(["/login"]);
      return false;
    }else{
      console.log(this.authService.isLogged())
      return true;
    }
  }
}
