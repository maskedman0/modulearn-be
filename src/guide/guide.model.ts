import { MongoSchema, MongoModel } from "@mayajs/mongo";

const schema = MongoSchema(
   {
      title: {
         required: [true, "Title is required."],
         type: String,
      },
      author: {
         required: [true, "Author is required."],
         type: String,
      },
   },
   { timestamps: true }
);

export default MongoModel("Guide", schema);
