class UserResolver {
  constructor() {}

  helloWorld(parent: any, args: any) {
    console.log(args);
    const { name, email, password } = args;
    return {
      message: `my name is ${name} and my email is ${email} and my password is ${password}`,
    };
  }
}

export const userResolver = new UserResolver();
