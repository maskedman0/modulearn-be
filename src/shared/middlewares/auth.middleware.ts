import { authenticate } from "passport";

const localAuth = authenticate("local", { session: false });

export { localAuth };
