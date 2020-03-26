import { AppModule } from "./app.module";
import { MayaJS } from "@mayajs/core";
import { configurations, configurePassport } from "./configurations";

let server = new MayaJS(AppModule);
server = configurePassport(server);
server.prodMode(configurations.production).start(configurations.APP_PORT as number);
