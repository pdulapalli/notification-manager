import { dbConnPool } from "../../db/db";
import { parseUserFromRecord } from "../../helpers/record";
import { User } from "../../typedefs/interfaces/user.interface";
import { UserRecord } from "../../typedefs/interfaces/userRecord.interface";

async function createUserRecord(user: User): Promise<User> {
  try {
    const result = await dbConnPool.query({
      text: "INSERT INTO users VALUES ($1, $2, $3, $4)",
      values: [user.userId, user.email, user.phone, user.contactPreference],
    });

    if (result.rowCount === 0) {
      return null;
    }

    return user;
  } catch (err) {
    const errObj = err;
    errObj.message = `Database error: ${errObj.message}`;
    throw errObj;
  }
}

async function getUserRecord(userId: string): Promise<User | null> {
  try {
    const result = await dbConnPool.query({
      text: "SELECT * FROM users WHERE user_id = $1",
      values: [userId],
    });

    if (result.rowCount == 0) {
      return null;
    }

    const record = result.rows[0] as UserRecord;
    return parseUserFromRecord(record);
  } catch (err) {
    const errObj = err;
    errObj.message = `Database error: ${errObj.message}`;
    throw errObj;
  }
}

async function updateUserRecord(user: User): Promise<User> {
  try {
    await dbConnPool.query({
      text: "UPDATE users SET email = $2, phone = $3, contact_preference = $4 WHERE user_id = $1",
      values: [user.userId, user.email, user.phone, user.contactPreference],
    });

    return user;
  } catch (err) {
    const errObj = err;
    errObj.message = `Database error: ${errObj.message}`;
    throw errObj;
  }
}

export { createUserRecord, getUserRecord, updateUserRecord };
