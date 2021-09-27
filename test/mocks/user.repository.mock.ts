import { User } from "../../src/typedefs/interfaces/user.interface";

interface UserEntry {
  [id: string]: User;
}

const data: UserEntry = {};

async function createUserRecord(user: User): Promise<User> {
  data[user.userId] = user;
  return user;
}

async function getUserRecord(userId: string): Promise<User | null> {
  const result = data[userId];
  if (!result) {
    return null;
  }

  return result;
}

async function updateUserRecord(user: User): Promise<User> {
  const result = data[user.userId];
  if (!result) {
    throw new Error("Cannot update nonexistent record");
  }

  data[user.userId] = user;
  return user;
}

function purgeRecords() {
  for (const key in data) {
    delete data[key];
  }
}

export {
  createUserRecord,
  getUserRecord,
  updateUserRecord,
  purgeRecords,
  data,
};
