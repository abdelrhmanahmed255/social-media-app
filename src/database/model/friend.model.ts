import { Schema, model, models, Model, HydratedDocument } from "mongoose";
import { IFriend } from "../../common/interfaces/friend.interface";
import { FriendRequestStatus } from "../../common/enums/friend.enums";
import { BadRequetException } from "../../common/exceptions/error.exceptions";

type FriendDocument = HydratedDocument<IFriend>;

const friendSchema = new Schema<IFriend>(
  {
    fromUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(FriendRequestStatus),
      default: FriendRequestStatus.PENDING,
    },
  },
  {
    timestamps: true,
  }
);

friendSchema.index({ fromUser: 1, toUser: 1 }, { unique: true });

friendSchema.pre("save", function (next) {
  const doc = this as FriendDocument;
  if (String(doc.fromUser) === String(doc.toUser)) {
    return next(new BadRequetException("cannot send friend request to yourself"));
  }
  next();
});

friendSchema.pre("save", async function (next) {
  const doc = this as FriendDocument;
  if (!doc.isNew) {
    return next();
  }

  const Friend = doc.constructor as Model<IFriend>;
  const existing = await Friend.findOne({
    $or: [
      { fromUser: doc.fromUser, toUser: doc.toUser },
      { fromUser: doc.toUser, toUser: doc.fromUser },
    ],
  });

  if (existing) {
    return next(new BadRequetException("friend request already exists"));
  }

  next();
});

const friendModel = models.Friend || model<IFriend>("Friend", friendSchema);

export default friendModel;
