import { NotificationCreateDto } from "../../src/typedefs/dto/notification.dto";
import { mockUser, nonExistentUserId } from "../mocks/user.mock";
import {
  purgeRecords as purgeNotificationsData,
  data as notificationsData,
} from "../mocks/notification.repository.mock";

jest.mock("../../src/modules/notification/notification.repository", () =>
  require("../mocks/notification.repository.mock")
);

jest.mock("../../src/modules/user/user.service", () =>
  require("../mocks/user.service.mock")
);

jest.mock("../../src/helpers/delivery/email", () => ({
  sendEmail: jest.fn(),
}));

jest.mock("../../src/helpers/delivery/sms", () => ({
  sendSms: jest.fn(),
}));

import {
  notify,
  retrieveNotification,
} from "../../src/modules/notification/notification.service";

describe("Notification Service Test", () => {
  beforeEach(() => {
    purgeNotificationsData();
  });

  describe("retrieveNotification", () => {
    it("should get nothing for a notification that does not exist", async () => {
      const input = "0d3f1573-87e7-41d3-96ce-4a0d6cd13958";
      const result = await retrieveNotification(input);
      expect(result).toBeNull();
    });

    it("should return a created notification", async () => {
      const timestamp = new Date().toISOString();
      const notificationId = "5e1d4012-d17b-4945-8342-7f084710ebe9";
      const expected = {
        notificationId,
        title: "Welcome",
        textContent: "To the world of tomorrow",
        noteTime: timestamp,
        userId: mockUser.userId,
      };

      notificationsData[notificationId] = expected;

      const result = await retrieveNotification(notificationId);
      expect(result).toEqual(expected);
    });
  });

  describe("notify", () => {
    it("should fail to send a notification for a non-existent user", async () => {
      const notificationObj: NotificationCreateDto = {
        title: "Some title",
        textContent: "With some content",
        userId: nonExistentUserId,
      };

      await expect(notify(notificationObj)).rejects.toThrowError();
    });

    it("should successfully send a notification", async () => {
      const notificationObj: NotificationCreateDto = {
        title: "Insert creative title",
        textContent: "Imagine there is cool content",
        userId: mockUser.userId,
      };

      const result = await notify(notificationObj);
      expect(result).toMatchObject(notificationObj);
      expect(result).toHaveProperty("notificationId");
      expect(result).toHaveProperty("noteTime");
    });
  });
});
