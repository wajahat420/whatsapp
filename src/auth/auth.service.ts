import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { throwError } from 'src/common/exception/error';
import { User } from 'src/common/schemas/user.schema';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    async login(user: LoginDTO) {
        const data = await this.userModel.findOne({ email: user.email, password: user.password }).exec()

        if (!data) {
            console.error('Login failed for email:', user.email);

            throwError({
                message: 'email or password is incorrect'
            })
        }
        console.log(data)
        return data
    }

    async register(register: RegisterDTO) {
        const data = await this.userModel.create({
            email: register.email,
            password: register.password,
            name: register.name
        })

        if (!data) {
            console.error('Registration failed for user:', register.email);

            throwError({
                message: 'email or password is incorrect'
            })
        }

        return data
    }

}
