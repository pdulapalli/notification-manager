import { Notification } from "../../src/typedefs/interfaces/notification.interface";

interface NotificationEntry {
  [id: string]: Notification;
}

const data: NotificationEntry = {};

async function createNotificationRecord(
  notification: Notification
): Promise<Notification> {
  data[notification.notificationId] = notification;
  return notification;
}

async function getNotificationRecord(
  notificationId: string
): Promise<Notification | null> {
  const result = data[notificationId];
  if (!result) {
    return null;
  }

  return result;
}

function purgeRecords() {
  for (const key in data) {
    delete data[key];
  }
}

export { createNotificationRecord, getNotificationRecord, purgeRecords, data };
