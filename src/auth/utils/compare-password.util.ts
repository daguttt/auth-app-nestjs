import { compare } from 'bcrypt';

export const comparePasswords = async (
  password: string,
  hashedPassword: string,
) => {
  return await compare(password, hashedPassword);
};
