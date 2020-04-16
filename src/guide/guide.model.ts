import { MongoSchema, MongoModel } from "@mayajs/mongo";

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

const guideComponentIngredientSchema = MongoSchema({
   media: [mediaSchema],
   description: {
      type: String,
   },
   additionalInfo: {
      type: String,
   },
});

const guideStepSchema = MongoSchema({
   media: [mediaSchema],
   instructionMarkUp: {
      type: String,
   },
});

const guideEstimatedCompletionSchema = MongoSchema({
   timeNum: {
      default: 1,
      type: Number,
   },
   unit: {
      enum: ["minute", "hour", "day", "week"],
      default: "hour",
      type: String,
   },
});

const guideSchema = MongoSchema(
   {
      title: {
         required: [true, "Title is required."],
         type: String,
      },
      creatorId: {
         required: [true, "Creator ID is required"],
         type: String,
      },
      difficulty: {
         enum: ["easy", "intermediate", "advanced"],
         default: "easy",
         type: String,
      },
      estimatedCompletion: guideEstimatedCompletionSchema,
      intro: String,
      previewMedia: mediaSchema,
      steps: [guideStepSchema],
      components: [guideComponentIngredientSchema],
      ingredients: [guideComponentIngredientSchema],
      isDraft: {
         type: Boolean,
         default: true,
      },
      isPublished: {
         type: Boolean,
         default: true,
      },
   },
   { timestamps: true }
);

export default MongoModel("Guide", guideSchema);
