
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secretjwt1',
        });
    }

    async validate(payload: any): Promise<User> {
        if (payload.role !== 'user') {
            console.log('Unauthorized access: Admin access not allowed');
            throw new UnauthorizedException("Không có quyền truy cập");
        }
        const user = await this.usersService.getUserByUsername(payload.username);
        if (!user) {
            throw new UnauthorizedException("Token không hợp lệ");
        }
        return user;
    }
}
