import { UserCreateDto, UserUpdateDto } from "../../typedefs/dto/user.dto";
import {
  createUserRecord,
  getUserRecord,
  updateUserRecord,
} from "./user.repository";
import { v4 as uuidv4 } from "uuid";
import { ContactPreference } from "../../typedefs/enums/contactPreference.enum";
import { User } from "../../typedefs/interfaces/user.interface";
import { ErrorMessage } from "../../typedefs/enums/errorMessage.enum";
import { parseNationalPhoneNumberOrFail } from "../../helpers/phoneFormat";

function createUser(user: UserCreateDto): Promise<User> {
  return createUserRecord({
    userId: uuidv4(),
    email: user.email ?? "",
    phone: user.phone ? parseNationalPhoneNumberOrFail(user.phone) : "",
    contactPreference: user.contactPreference ?? ContactPreference.NONE,
  });
}

function retrieveUser(userId: string): Promise<User | null> {
  return getUserRecord(userId);
}

async function updateUser(updatePayload: UserUpdateDto): Promise<User> {
  const current = await getUserRecord(updatePayload.userId);
  if (!current) {
    throw new Error(ErrorMessage.USER_NOT_FOUND);
  }

  const phoneNumberToUse = updatePayload.phone
    ? parseNationalPhoneNumberOrFail(updatePayload.phone)
    : current.phone;

  const updateObj = {
    userId: current.userId,
    email: updatePayload.email ?? current.email,
    phone: phoneNumberToUse,
  };

  switch (updatePayload.contactPreference) {
    case ContactPreference.SMS: {
      if (!current.phone && !updatePayload.phone) {
        throw new Error(ErrorMessage.INVALID_INPUT);
      }

      return updateUserRecord({
        ...updateObj,
        contactPreference: ContactPreference.SMS,
      });
    }
    case ContactPreference.EMAIL: {
      if (!current.email && !updatePayload.email) {
        throw new Error(ErrorMessage.INVALID_INPUT);
      }

      return updateUserRecord({
        ...updateObj,
        contactPreference: ContactPreference.EMAIL,
      });
    }
    default:
      return updateUserRecord({
        ...updateObj,
        contactPreference:
          updatePayload.contactPreference ?? current.contactPreference,
      });
  }
}

export { createUser, retrieveUser, updateUser };
