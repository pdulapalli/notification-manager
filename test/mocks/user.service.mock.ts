import { User } from "../../src/typedefs/interfaces/user.interface";
import { mockUser } from "./user.mock";

async function retrieveUser(userId: string): Promise<User | null> {
  if (userId !== mockUser.userId) {
    return null;
  }

  return mockUser;
}

export { retrieveUser };
