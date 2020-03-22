import { MongoSchema, MongoModel } from "@mayajs/mongo";

// const guideSchema = MongoSchema(
//    {
//       title: {
//          required: [true, "Title is required."],
//          type: String,
//       },
//       author: {
//          required: [true, "Author is required."],
//          type: String,
//       },
//    },
//    { timestamps: true }
// );

const mediaSchema = MongoSchema({
   mediaType: {
      enum: ["image", "video"],
      required: [true, "mediaType is required"],
      type: String,
   },
   mediaUrl: {
      required: [true, " mediaUrl is required"],
      type: String,
   },
   publicId: {
      required: [true, "publicId is required"],
      type: String,
   },
});

const guideSchema_v2 = MongoSchema(
   {
      title: {
         required: [true, "Title is required."],
         type: String,
      },
      creator: {
         required: [true, "Creator is required."],
         type: String,
      },
      difficulty: {
         enum: ["easy", "intermediate", "advanced"],
         default: "easy",
         type: String,
      },
      estimatedCompletionTime: {
         default: 1,
         type: Number,
      },
      estimatedCompletionUnit: {
         enum: ["minute", "hour", "day", "week"],
         default: "hour",
         type: String,
      },
      intro: {
         type: String,
      },
      previewMedia: mediaSchema,
      steps: [
         {
            media: [mediaSchema],
            instructionMarkUp: {
               type: String,
            },
         },
      ],
      components: [
         {
            media: [mediaSchema],
            description: {
               type: String,
            },
            additionalInfo: {
               type: String,
            },
         },
      ],
      ingredients: [
         {
            media: [mediaSchema],
            description: {
               type: String,
            },
            additionalInfo: {
               type: String,
            },
         },
      ],
   },
   { timestamps: true }
);

export default MongoModel("Guide", guideSchema_v2);
