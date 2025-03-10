import UserSchema from "../models/userModel";
import { IUser } from "../interfaces/IUser";

class UserQueries {
  async getUserDetailsByData(data: {
    username?: string;
    email?: string;
    phone?: string;
  }): Promise<IUser | null> {
    return await UserSchema.findOne({
      $or: [
        { username: data.username },
        { email: data.email },
        { phone: data.phone },
      ],
    });
  }

  async createUser(data: Partial<IUser>): Promise<IUser> {
    const user = new UserSchema(data);
    return await user.save();
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return await UserSchema.findOne({ email });
  }

  async getUserDetailsById(id: string): Promise<IUser | null> {
    return await UserSchema.findOne({ _id: id });
  }

  async getUserById(id: string): Promise<IUser | null> {
    return await UserSchema.findById(id);
  }

  async updateUserPassword(
    email: string,
    newPassword: string
  ): Promise<IUser | null> {
    return await UserSchema.findOneAndUpdate(
      { email: email },
      { $set: { password: newPassword } },
      { new: true }
    );
  }

  async getPaginatedUsers(skip: number, limit: number): Promise<IUser[]> {
    return await UserSchema.find().skip(skip).limit(limit);
  }

  async getUserCount(): Promise<number> {
    return await UserSchema.countDocuments();
  }
}

export default new UserQueries();
