import { Request, Response } from "express";
import { get, controller, use } from "./decorators";
import passport from "passport";
import "../services/passport";

@controller("/api/auth")
class LoginController {
  @get("/steam/callback")
  @use(passport.authenticate("steam"))
  getSteamCallback(req: Request, res: Response) {
    console.log("STEAM CALLBACK");
    console.log(req.body);
    res.send();
  }

  @get("/steam")
  @use(passport.authenticate("steam"))
  getSteamLogin(_req: Request, _res: Response) {}

  @get("/logout")
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.send();
  }

  @get("/current_user")
  getCurrentUser(req: Request, res: Response) {
    res.send(req.user);
  }
}
