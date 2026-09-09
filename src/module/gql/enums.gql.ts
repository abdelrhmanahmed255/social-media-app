import { GraphQLEnumType } from "graphql";
import { GenderEnum, UserRole } from "../../common";
import { FriendRequestStatus } from "../../common/enums/friend.enums";

export const genderGQLType = new GraphQLEnumType({
  name: "GenderEnumsGQL",
  values: {
    Male: { value: GenderEnum.MALE },
    Female: { value: GenderEnum.FEMALE },
  },
});

export const userRoleGQLType = new GraphQLEnumType({
  name: "UserRoleEnumsGQL",
  values: {
    Admin: { value: UserRole.ADMIN },
    User: { value: UserRole.USER },
  },
});

export const friendRequestStatusGQLType = new GraphQLEnumType({
  name: "FriendRequestStatusEnumsGQL",
  values: {
    Pending: { value: FriendRequestStatus.PENDING },
    Accepted: { value: FriendRequestStatus.ACCEPTED },
    Rejected: { value: FriendRequestStatus.REJECTED },
  },
});
