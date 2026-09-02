import { Schema, model, models, HydratedDocument } from "mongoose";
import { IComment } from "../../common/interfaces/comment.interface";
import { BadRequetException } from "../../common/exceptions/error.exceptions";

type CommentDocument = HydratedDocument<IComment>;

const commentSchema = new Schema<IComment>(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
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
  },
  {
    timestamps: true,
  }
);

commentSchema.pre("save", async function (next) {
  const doc = this as CommentDocument;
  if (doc.content) {
    doc.content = doc.content.trim();
  }

  const postModel = models.Post;
  if (!postModel) {
    return next();
  }

  const post = await postModel.findById(doc.postId);
  if (!post) {
    return next(new BadRequetException("post not found"));
  }

  next();
});

const commentModel = models.Comment || model<IComment>("Comment", commentSchema);

export default commentModel;
