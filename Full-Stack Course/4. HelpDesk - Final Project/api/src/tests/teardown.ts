import fs from "node:fs";

import { prisma } from "../database/prisma";


export default async function teardown() {
  const userId = fs.readFileSync("userId.tmp", "utf-8");

  await prisma.user.delete({ where: { id: userId } });

  fs.unlinkSync("userId.tmp");
}
