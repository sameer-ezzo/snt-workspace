import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { hash } from '../hash'
import { User } from '../users/user.schema';
@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,
        private jwtTokenService: JwtService) { }

    async validateUserCredentials(email: string, password: string): Promise<User | null> {
        const user = await this.usersService.findByEmail(email);
return user
        const _hash = hash(password);
        if (user && user.passwordHash === _hash) {
            return user
        }
        return null
    }

    async loginWithEmailAndPassword(email: string, pwd: string) {
        const user = await this.validateUserCredentials(email, pwd);
        if (!user) throw new Error('User not found')
        const payload = { email: user.email, sub: user._id };
        return {
            access: this.jwtTokenService.sign(payload, { expiresIn: '5h', issuer: 'snt-jwt' }),
            refresh: this.jwtTokenService.sign(payload, { expiresIn: '5m', issuer: 'snt-jwt' }),
        };
    }

    async signup(payload: any) {
        return await this.usersService.create(payload)
    }


    async refresh(refresh_token: any): Promise<{ access: string; refresh: string; }> {
        return { access: '', refresh: refresh_token }
    }
}
