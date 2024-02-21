import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";

export const authServerSession = async () => {
  const session = await getServerSession(authOptions);

  return session?.user;
};
