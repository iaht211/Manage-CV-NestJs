import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  // 1️⃣ Create User
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const userData = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, 10),
    };
    const newUser = new this.userModel(userData);
    await newUser.save();
    return newUser;
  }

  // 2️⃣ Get All Users (Exclude Soft Deleted)
  async getAllUsers(): Promise<User[]> {
    return this.userModel.find({ isActive: true }).exec();
  }

  // 3️⃣ Get User By ID
  async getUserById(userId: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: userId, isActive: true }).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // 4️⃣ Update User
  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: userId, isActive: true },
      updateUserDto,
      { new: true },
    );
    if (!updatedUser) throw new NotFoundException('User not found');
    return updatedUser;
  }

  // 5️⃣ Soft Delete User
  async softDeleteUser(userId: string): Promise<User> {
    const deletedUser = await this.userModel.findOneAndUpdate(
      { _id: userId, isActive: true },
      { isActive: false },
      { new: true },
    );
    if (!deletedUser) throw new NotFoundException('User not found');
    return deletedUser;
  }

  // 6️⃣ Restore User (Undo Soft Delete)
  async restoreUser(userId: string): Promise<User> {
    const restoredUser = await this.userModel.findOneAndUpdate(
      { _id: userId, isActive: false },
      { isActive: true },
      { new: true },
    );
    if (!restoredUser) throw new NotFoundException('User not found');
    return restoredUser;
  }

  // 7️⃣ Hard Delete (Xóa vĩnh viễn)
  async hardDeleteUser(userId: string): Promise<{ message: string }> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId).exec();
    if (!deletedUser) throw new NotFoundException('User not found');
    return { message: 'User permanently deleted' };
  }
}

