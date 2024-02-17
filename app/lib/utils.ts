import prisma from "./db";
import { authServerSession } from "./auth";

interface User {
  id: string;
  email: string;
}

export const getProfile = async () => {
  const session = (await authServerSession()) as User;
  const res = await prisma.apoteker.findMany({
    where: {
      id_user: session.id,
    },
  });
  return res;
};
