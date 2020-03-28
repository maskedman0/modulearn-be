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
      birthDate: Date,
      fullAddress: String,
      mobile: String,
      phone: String,
   },
   { timestamps: true }
);

const passportLocalMongooseOptions = {
   limitAttempts: true,
   maxAttempts: 5,
   maxInterval: 20000,
   errorMessages: {
      MissingPasswordError: "No password was given",
      AttemptTooSoonError: "Account is currently locked. Try again later",
      TooManyAttemptsError: "Account locked due to too many failed login attempts",
      NoSaltValueStoredError: "Authentication not possible. No salt value stored",
      IncorrectPasswordError: "Password or username is incorrect",
      IncorrectUsernameError: "Password or username is incorrect",
      MissingUsernameError: "No email was given",
      UserExistsError: "A user with the given email is already registered",
   },
};

userSchema.plugin(passportLocalMongoose, passportLocalMongooseOptions);

export default MongoModel("User", userSchema);
