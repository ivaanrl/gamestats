import { Request, Response } from "express";
import { get, controller } from "./decorators";

@controller("/api/auth")
class LoginController {
  @get("/steam")
  getSteamLogin(req: Request, res: Response) {
    console.log(req.body);
    console.log(res);
  }
}
