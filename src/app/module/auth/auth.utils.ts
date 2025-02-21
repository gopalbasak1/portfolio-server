import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: {
    email: string;
    role: string;
    image?: string | undefined;
    name?: string;
  },
  secret: string,
  expiresIn: string | number, // Ensure this can be a string or a number
): string => {
  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions['expiresIn'],
  }; // Explicitly cast
  return jwt.sign(jwtPayload, secret, options);
};

//function to verify a token
export const verifyToken = (token: string, secret: string): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
