import { ContactPreference } from "./contactPreference.enum";

interface User {
  userId: string;
  email: string;
  phone: string;
  contactPreference: ContactPreference;
}

export { User };
