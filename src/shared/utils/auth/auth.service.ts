import {  Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    /* hashing password */
    async hashedPassword(password:string) {
        return bcryptjs.hashSync(password,7)
    }

    /* compare two password */
    async comparePassword(newPassword: string, oldPassword: string) {
        return bcryptjs.compareSync(newPassword,oldPassword);
    }

    /* generate token */

    async generateToken(id) {
        const payload = {
            id: id
        };
        return this.jwtService.sign(payload)
    }
}