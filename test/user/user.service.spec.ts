import { ContactPreference } from "../../src/typedefs/enums/contactPreference.enum";
import { purgeRecords, data } from "../mocks/user.repository.mock";
jest.mock("../../src/modules/user/user.repository", () =>
  require("../mocks/user.repository.mock")
);

import {
  createUser,
  retrieveUser,
  updateUser,
} from "../../src/modules/user/user.service";

describe("User Service Test", () => {
  beforeEach(() => {
    purgeRecords();
  });

  describe("createUser", () => {
    it("should create a user", async () => {
      const userData = {
        email: "hello@example.com",
        phone: "6374623489",
        contactPreference: ContactPreference.NONE,
      };

      const { userId } = await createUser(userData);
      const expected = {
        ...userData,
        userId,
      };

      const result = data[userId];
      expect(result).toEqual(expected);
    });
  });

  describe("retrieveUser", () => {
    it("should get nothing for a user that does not exist", async () => {
      const input = "1d78a5ea-4626-43dc-8490-bd9fb99aa775";
      const result = await retrieveUser(input);
      expect(result).toBeNull();
    });

    it("should return a created user", async () => {
      const userId = "1d78a5ea-4626-43dc-8490-bd9fb99aa775";
      const expected = {
        userId,
        email: "hello@example.com",
        phone: "6374623489",
        contactPreference: ContactPreference.NONE,
      };

      data[userId] = expected;

      const result = await retrieveUser(userId);
      expect(result).toEqual(expected);
    });
  });

  describe("updateUser", () => {
    it("should fail to update a user that does not exist", async () => {
      await expect(
        updateUser({
          userId: "1d78a5ea-4626-43dc-8490-bd9fb99aa775",
        })
      ).rejects.toThrowError();
    });

    it("should update a user's contact preference", async () => {
      const userId = "1d78a5ea-4626-43dc-8490-bd9fb99aa775";
      const userData = {
        userId,
        email: "hello@example.com",
        phone: "6374623489",
        contactPreference: ContactPreference.NONE,
      };

      data[userId] = userData;

      const updatedUserData = {
        contactPreference: ContactPreference.EMAIL,
      };

      const expected = {
        userId,
        email: "hello@example.com",
        phone: "6374623489",
        contactPreference: ContactPreference.EMAIL,
      };

      const result = await updateUser({
        ...updatedUserData,
        userId,
      });

      expect(result).toEqual(expected);
    });

    it("should fail to update a user's preference to SMS without a valid number", async () => {
      const userId = "1d78a5ea-4626-43dc-8490-bd9fb99aa775";
      const userData = {
        userId,
        email: "hello@example.com",
        phone: "",
        contactPreference: ContactPreference.NONE,
      };

      data[userId] = userData;

      const updatedUserData = {
        contactPreference: ContactPreference.SMS,
      };

      await expect(
        updateUser({
          ...updatedUserData,
          userId,
        })
      ).rejects.toThrowError();
    });

    it("should successfully update a user's preference to SMS (1)", async () => {
      const userId = "1d78a5ea-4626-43dc-8490-bd9fb99aa775";
      const userData = {
        userId,
        email: "hellow@example.com",
        phone: "",
        contactPreference: ContactPreference.EMAIL,
      };

      data[userId] = userData;

      const updatedUserData = {
        phone: "1234123123",
        contactPreference: ContactPreference.SMS,
      };

      const expected = {
        userId,
        email: "hellow@example.com",
        phone: "1234123123",
        contactPreference: ContactPreference.SMS,
      };

      const result = await updateUser({
        ...updatedUserData,
        userId,
      });

      expect(result).toEqual(expected);
    });

    it("should successfully update a user's preference to SMS (2)", async () => {
      const userId = "1d78a5ea-4626-43dc-8490-bd9fb99aa775";
      const userData = {
        userId,
        email: "hellow@example.com",
        phone: "1234123123",
        contactPreference: ContactPreference.EMAIL,
      };

      data[userId] = userData;

      const updatedUserData = {
        contactPreference: ContactPreference.SMS,
      };

      const expected = {
        userId,
        email: "hellow@example.com",
        phone: "1234123123",
        contactPreference: ContactPreference.SMS,
      };

      const result = await updateUser({
        ...updatedUserData,
        userId,
      });

      expect(result).toEqual(expected);
    });

    it("should fail to update a user's preference to email without a valid email", async () => {
      const userId = "1d78a5ea-4626-43dc-8490-bd9fb99aa775";
      const userData = {
        userId,
        email: "",
        phone: "1234123123",
        contactPreference: ContactPreference.NONE,
      };

      data[userId] = userData;

      const updatedUserData = {
        contactPreference: ContactPreference.EMAIL,
      };

      await expect(
        updateUser({
          ...updatedUserData,
          userId,
        })
      ).rejects.toThrowError();
    });

    it("should successfully update a user's preference to email (1)", async () => {
      const userId = "1d78a5ea-4626-43dc-8490-bd9fb99aa775";
      const userData = {
        userId,
        email: "",
        phone: "1234123123",
        contactPreference: ContactPreference.SMS,
      };

      data[userId] = userData;

      const updatedUserData = {
        email: "hellow@example.com",
        contactPreference: ContactPreference.EMAIL,
      };

      const expected = {
        userId,
        email: "hellow@example.com",
        phone: "1234123123",
        contactPreference: ContactPreference.EMAIL,
      };

      const result = await updateUser({
        ...updatedUserData,
        userId,
      });

      expect(result).toEqual(expected);
    });

    it("should successfully update a user's preference to email (2)", async () => {
      const userId = "1d78a5ea-4626-43dc-8490-bd9fb99aa775";
      const userData = {
        userId,
        email: "hellow@example.com",
        phone: "1234123123",
        contactPreference: ContactPreference.SMS,
      };

      data[userId] = userData;

      const updatedUserData = {
        contactPreference: ContactPreference.EMAIL,
      };

      const expected = {
        userId,
        email: "hellow@example.com",
        phone: "1234123123",
        contactPreference: ContactPreference.EMAIL,
      };

      const result = await updateUser({
        ...updatedUserData,
        userId,
      });

      expect(result).toEqual(expected);
    });
  });
});
