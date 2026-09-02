import { Schema, model, models, HydratedDocument } from "mongoose";
import { IPost } from "../../common/interfaces/post.interface";

type PostDocument = HydratedDocument<IPost>;

const postSchema = new Schema<IPost>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    images: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

postSchema.pre("save", function (next) {
  const doc = this as PostDocument;
  if (doc.content) {
    doc.content = doc.content.trim();
  }
  next();
});

postSchema.post("deleteOne", { document: true, query: false }, async function () {
  const doc = this as PostDocument;
  const commentModel = models.Comment;
  if (commentModel) {
    await commentModel.deleteMany({ postId: doc._id });
  }
});

const postModel = models.Post || model<IPost>("Post", postSchema);

export default postModel;
