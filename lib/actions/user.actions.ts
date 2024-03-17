import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";
import { connectToDatabse } from "../database/mongoose";
import { handleError } from "../utils";

//createUser
export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabse();

    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};

//readUser

export const getUserById = async (userId: String) => {
  try {
    await connectToDatabse();

    const user = await User.findOne({ clerkId: userId });
    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
};

//updateUser
export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
  try {
    await connectToDatabse();

    const updateUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updateUser) throw new Error("User update failed");
    return JSON.parse(JSON.stringify(updateUser));
  } catch (error) {
    handleError(error);
  }
};

//deleteUser

export const deleteUser = async (clerkId: String) => {
  try {
    await connectToDatabse();

    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) throw new Error("User not found");

    const deleteUser = await User.findByIdAndDelete(userToDelete._id);
    return deleteUser ? JSON.parse(JSON.stringify(deleteUser)) : null;
    revalidatePath("/");
  } catch (error) {}
};
