import { GQLArgsMap, GQLRequiredString } from "../../gql/types.gql";

export const userProfileGQLArgs: GQLArgsMap = {
  userName: { type: GQLRequiredString },
  email: { type: GQLRequiredString },
  password: { type: GQLRequiredString },
};
