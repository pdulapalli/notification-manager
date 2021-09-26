import { UserDto } from "../../interfaces/user.dto";
import { createUserRecord, getUserRecord } from "./user.repository";
import { v4 as uuidv4 } from "uuid";
import { ContactPreference } from "../../interfaces/contactPreference.enum";
import { User } from "../../interfaces/user.interface";

function retrieveUser(userId: string): Promise<User> {
  return getUserRecord(userId);
}

function createUser(user: UserDto): Promise<User> {
  return createUserRecord({
    userId: uuidv4(),
    email: user.email ?? "",
    phone: user.phone ?? "",
    contactPreference: user.contactPreference ?? ContactPreference.NONE,
  });
}

export { retrieveUser, createUser };
