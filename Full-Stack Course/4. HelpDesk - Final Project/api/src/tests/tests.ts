import fs from "node:fs";


export const email: string = "testuser@test.com";
export const name: string = "Test User";
export const password: string = "123456";
export let userId: string;
export let jwtToken: string;

export function setUserId(id: string) {
  userId = id;
  fs.writeFileSync("userId.tmp", id);
}

export function setJwtToken(token: string) {
  jwtToken = token;
}
