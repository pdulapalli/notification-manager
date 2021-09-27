import { ContactPreference } from "../../src/typedefs/enums/contactPreference.enum";
import {
  parseNotificationFromRecord,
  parseUserFromRecord,
} from "../../src/helpers/record";

describe("Record Test", () => {
  describe("parseUserFromRecord", () => {
    it("should parse a user from a record", () => {
      const input = {
        user_id: "1d78a5ea-4626-43dc-8490-bd9fb99aa775",
        email: "hello@example.com",
        phone: "1234567890",
        contact_preference: ContactPreference.NONE,
      };

      const expected = {
        userId: "1d78a5ea-4626-43dc-8490-bd9fb99aa775",
        email: "hello@example.com",
        phone: "1234567890",
        contactPreference: ContactPreference.NONE,
      };

      const result = parseUserFromRecord(input);
      expect(result).toEqual(expected);
    });
  });

  describe("parseNotificationFromRecord", () => {
    it("should parse a notification from a record", () => {
      const input = {
        notification_id: "1d78a5ea-4626-43dc-8490-bd9fb99aa775",
        title: "The Happy Notification",
        text_content: "What a great story",
        note_time: "2021-09-27T03:53:02.433Z",
        user_id: "1d78a5ea-4626-43dc-8490-bd9fb99aa775",
      };

      const expected = {
        notificationId: "1d78a5ea-4626-43dc-8490-bd9fb99aa775",
        title: "The Happy Notification",
        textContent: "What a great story",
        noteTime: "2021-09-27T03:53:02.433Z",
        userId: "1d78a5ea-4626-43dc-8490-bd9fb99aa775",
      };

      const result = parseNotificationFromRecord(input);
      expect(result).toEqual(expected);
    });
  });
});
