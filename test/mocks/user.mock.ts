import { ContactPreference } from "../../src/typedefs/enums/contactPreference.enum";
import { User } from "../../src/typedefs/interfaces/user.interface";

const mockUser: User = {
  userId: "8af21c10-d241-4d4b-9b3e-5f4039efb23d",
  email: "bloo@bloo.magic",
  phone: "1234567890",
  contactPreference: ContactPreference.EMAIL,
};

const nonExistentUserId = "25d8740d-cbfb-41e9-9557-852111eae438";

export { mockUser, nonExistentUserId };
