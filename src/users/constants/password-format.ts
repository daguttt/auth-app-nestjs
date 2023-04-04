/**
 * It should have at least a Capital, a number and should be 8 or more characters long
 */

export const passwordFormat =
  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/;
