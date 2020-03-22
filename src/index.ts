import { AppModule } from "./app.module";
import { MayaJS } from "@mayajs/core";
import { configurations } from "./configurations";

const server = new MayaJS(AppModule);
server.prodMode(configurations.production).start(configurations.APP_PORT as number);
