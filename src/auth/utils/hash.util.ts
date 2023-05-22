import * as bcrypt from 'bcrypt';

export const hashString = async (text: string, salt = 10): Promise<string> => {
  return await bcrypt.hash(text, salt);
};

export const compareStringViaHash = async (
  current: string,
  previous: string,
): Promise<boolean> => {
  const isSame = await bcrypt.compare(previous, current);
  return isSame;
};
