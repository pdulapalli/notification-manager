import { dbConnPool } from "../../db/db";
import { parseUserFromRecord } from "../..//helpers/record";
import { User } from "../../interfaces/user.interface";
import { UserRecord } from "../../interfaces/userRecord.interface";

async function createUserRecord(user: User): Promise<User> {
  const result = await dbConnPool.query({
    text: "INSERT INTO users VALUES ($1, $2, $3, $4)",
    values: [user.userId, user.email, user.phone, user.contactPreference],
  });

  if (result.rowCount === 0) {
    return null;
  }

  return user;
}

async function getUserRecord(userId: string): Promise<User> {
  const result = await dbConnPool.query({
    text: "SELECT * FROM users WHERE user_id = $1",
    values: [userId],
  });

  if (result.rowCount == 0) {
    return null;
  }

  const record = result.rows[0] as UserRecord;
  return parseUserFromRecord(record);
}

export { getUserRecord, createUserRecord };
