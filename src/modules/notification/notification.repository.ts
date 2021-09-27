import { parseNotificationFromRecord } from "../../helpers/record";
import { Notification } from "../../typedefs/interfaces/notification.interface";
import { NotificationRecord } from "../../typedefs/interfaces/notificationRecord.interface";
import { dbConnPool } from "../../db/db";

async function createNotificationRecord(
  notification: Notification
): Promise<Notification> {
  const result = await dbConnPool.query({
    text: "INSERT INTO notifications VALUES ($1, $2, $3, $4, $5)",
    values: [
      notification.notificationId,
      notification.title,
      notification.textContent,
      notification.noteTime,
      notification.userId,
    ],
  });

  if (result.rowCount === 0) {
    return null;
  }

  return notification;
}

async function getNotificationRecord(
  notificationId: string
): Promise<Notification | null> {
  const result = await dbConnPool.query({
    text: "SELECT * FROM notifications WHERE notification_id = $1",
    values: [notificationId],
  });

  if (result.rowCount == 0) {
    return null;
  }

  const record = result.rows[0] as NotificationRecord;
  return parseNotificationFromRecord(record);
}

export { createNotificationRecord, getNotificationRecord };
