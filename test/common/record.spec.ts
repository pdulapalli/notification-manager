import { ContactPreference } from "../../src/typedefs/enums/contactPreference.enum";
import {
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
});
