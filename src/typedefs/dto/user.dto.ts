import { ContactPreference } from "../enums/contactPreference.enum";

interface UserDtoCore {
  email?: string;
  phone?: string;
  contactPreference?: ContactPreference;
}

interface UserCreateDto extends UserDtoCore {
  userId?: string;
}

interface UserUpdateDto extends UserDtoCore {
  userId: string;
}

export { UserCreateDto, UserUpdateDto };
