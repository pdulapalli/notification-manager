import {
  createNotificationRecord,
  getNotificationRecord,
} from "./notification.repository";
import { Notification } from "../../typedefs/interfaces/notification.interface";
import { NotificationCreateDto } from "../../typedefs/dto/notification.dto";
import { v4 as uuidv4 } from "uuid";
import { retrieveUser } from "../user/user.service";
import { ErrorMessage } from "../../typedefs/enums/errorMessage.enum";
import { ContactPreference } from "../../typedefs/enums/contactPreference.enum";
import { sendEmail } from "../../helpers/delivery/email";
import { sendSms } from "../../helpers/delivery/sms";

async function notify(
  notificationData: NotificationCreateDto
): Promise<Notification> {
  const notification: Notification = {
    notificationId: uuidv4(),
    title: notificationData.title,
    textContent: notificationData.textContent,
    noteTime: new Date().toISOString(),
    userId: notificationData.userId,
  };

  await sendNotification(notification);
  return createNotificationRecord(notification);
}

async function sendNotification(notification: Notification): Promise<void> {
  const userInfo = await retrieveUser(notification.userId);
  if (!userInfo) {
    throw new Error(ErrorMessage.USER_NOT_FOUND);
  }

  const { contactPreference } = userInfo;
  switch (contactPreference) {
    case ContactPreference.EMAIL:
      return sendEmail({
        destination: userInfo.email,
        subject: notification.title,
        text: notification.textContent,
      });
    case ContactPreference.SMS:
      return sendSms({
        destination: userInfo.phone,
        subject: notification.title,
        text: notification.textContent,
      });
    case ContactPreference.NONE:
    default:
      return;
  }
}

function retrieveNotification(
  notificationId: string
): Promise<Notification | null> {
  return getNotificationRecord(notificationId);
}

export { notify, retrieveNotification };
