import bcrypt from "bcryptjs";

export const generateHash = async (
  plainText: string,
  saltRounds: number = 10
): Promise<string> => {
  return bcrypt.hash(plainText, saltRounds);
};

export const compareHash = async (
  plainText: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(plainText, hash);
};
