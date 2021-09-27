import { ContactPreference } from "../enums/contactPreference.enum";

interface UserRecord {
  user_id: string;
  email: string;
  phone: string;
  contact_preference: ContactPreference;
}

export { UserRecord };
