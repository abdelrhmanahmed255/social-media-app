class UserResolver {
  constructor() {}

  userProfile(
    parent: unknown,
    args: { userName: string; email: string; password: string }
  ) {
    const { userName, email } = args;
    return {
      message: `userName is ${userName} and email is ${email}`,
    };
  }
}

export const userResolver = new UserResolver();
