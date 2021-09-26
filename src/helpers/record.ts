import { User } from "../interfaces/user.interface";
import { UserRecord } from "../interfaces/userRecord.interface";

function parseUserFromRecord(record: UserRecord): User {
  return {
    userId: record.user_id,
    email: record.email.trim(),
    phone: record.phone.trim(),
    contactPreference: record.contact_preference,
  };
}

export { parseUserFromRecord };
