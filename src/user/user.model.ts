import { MongoSchema, MongoModel } from "@mayajs/mongo";
import passportLocalMongoose from "passport-local-mongoose";
const userSchema = MongoSchema(
   {
      firstName: {
         type: String,
         required: [true, "First Name is required."],
      },
      lastName: {
         type: String,
         required: [true, "Last Name is required."],
      },
      userType: {
         type: String,
         required: [true, "User Type is required."],
         enum: ["admin", "publisher", "reader"],
      },
      email: String,
      gender: {
         type: String,
         enum: ["m", "f", "u"],
      },
      birthDate: String,
      fullAddress: String,
      mobile: String,
      phone: String,
   },
   { timestamps: true }
);

const passportLocalMongooseOptions = {
   limitAttempts: true,
   maxAttempts: 5,
};

userSchema.plugin(passportLocalMongoose, passportLocalMongooseOptions);

export default MongoModel("User", userSchema);
