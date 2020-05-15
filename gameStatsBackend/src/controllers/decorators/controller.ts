import "reflect-metadata";
import { AppRouter } from "../../AppRouter";
import { Methods } from "./Methods";

export const controller = (routePrefix: string) => {
  return (target: Function) => {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];

      //Assign metadata of name 'path' in target.prototype in the specified key
      const path = Reflect.getMetadata("path", target.prototype, key);
      const method: Methods = Reflect.getMetadata(
        "method",
        target.prototype,
        key
      );

      if (path) {
        router[method](routePrefix + path, routeHandler);
      }
    }
  };
};
