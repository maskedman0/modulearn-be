import { UserService } from "../../user/user.service";
import { sign } from "jsonwebtoken";
import { configurations } from "../../configurations";

export class TokenGeneratorService {
   constructor(private userService: UserService) {}

   async generatePublisherToken(email: string): Promise<string> {
      const user: any = await this.userService.findOne({ userType: "publisher", username: email });
      console.log(user[0]);

      if (user) {
         const payload = { id: user._id, role: user.userType };
         return sign(payload, configurations.API_SECRET, { expiresIn: configurations.API_TOKEN_TIME });
      }
   }
}
