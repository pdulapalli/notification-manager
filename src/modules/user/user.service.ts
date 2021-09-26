import { UserCreateDto, UserUpdateDto } from "../../interfaces/user.dto";
import {
  createUserRecord,
  getUserRecord,
  updateUserRecord,
} from "./user.repository";
import { v4 as uuidv4 } from "uuid";
import { ContactPreference } from "../../interfaces/contactPreference.enum";
import { User } from "../../interfaces/user.interface";

function createUser(user: UserCreateDto): Promise<User> {
  return createUserRecord({
    userId: uuidv4(),
    email: user.email ?? "",
    phone: user.phone ?? "",
    contactPreference: user.contactPreference ?? ContactPreference.NONE,
  });
}

function retrieveUser(userId: string): Promise<User> {
  return getUserRecord(userId);
}

async function updateUser(updatePayload: UserUpdateDto): Promise<User> {
  const current = await getUserRecord(updatePayload.userId);

  if (updatePayload.contactPreference === ContactPreference.SMS) {
    if (!current.phone && !updatePayload.phone) {
      throw new Error("Invalid input");
    }
  }

  if (updatePayload.contactPreference === ContactPreference.EMAIL) {
  }

  if (
    !updatePayload.contactPreference ||
    updatePayload.contactPreference === ContactPreference.NONE
  ) {
    return updateUserRecord({
      userId: current.userId,
      email: updatePayload.email ?? current.email,
      phone: updatePayload.phone ?? current.phone,
      contactPreference:
        updatePayload.contactPreference ?? current.contactPreference,
    });
  }

  switch (updatePayload.contactPreference) {
    case ContactPreference.EMAIL:
    case ContactPreference.SMS:
    default:
  }
}

export { createUser, retrieveUser, updateUser };
