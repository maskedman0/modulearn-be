import { config } from "dotenv";
config();

export const configurations = {
   production: false,
   MONGO_URL: process.env.MONGO_URL || "",
   APP_PORT: process.env.APP_PORT || 3333,
   API_ROOT: process.env.API_ROOT || "/api",
   API_VERSION: process.env.API_VERSION || "",
   API_SECRET: process.env.API_SECRET || "",
};
