import { hash } from 'bcrypt';
export const encryptPassword = async (password: string) => {
  const saltRounds = 10;
  return hash(password, 10);
};
