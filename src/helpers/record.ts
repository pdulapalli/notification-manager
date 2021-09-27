import { Notification } from "../typedefs/interfaces/notification.interface";
import { NotificationRecord } from "../typedefs/interfaces/notificationRecord.interface";
import { User } from "../typedefs/interfaces/user.interface";
import { UserRecord } from "../typedefs/interfaces/userRecord.interface";

function parseUserFromRecord(record: UserRecord): User {
  return {
    userId: record.user_id,
    email: record.email.trim(),
    phone: record.phone.trim(),
    contactPreference: record.contact_preference,
  };
}

export { parseUserFromRecord };
