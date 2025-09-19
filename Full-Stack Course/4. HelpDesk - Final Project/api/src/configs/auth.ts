export const authConfig = {
  jwt: {
    secret: process.env.SECRET as string,
    expiresIn: process.env.TOKEN_EXPIRATION as string || "1d"
  }
}
