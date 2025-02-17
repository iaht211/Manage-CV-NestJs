import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    // private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByUsername(username);
    if (user && (await this.checkPassword(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const _user = user;
    console.log(_user.email);
    const payload = {
      username: _user.email,
      id: _user._id,
      role: _user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async checkPassword(rawPassword: string, hashedPassword: string) {
    const isPasswordTrue = await bcrypt.compare(rawPassword, hashedPassword);
    return isPasswordTrue;
  }

}
