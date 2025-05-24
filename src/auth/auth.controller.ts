import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    login(@Body() loginDTO: LoginDTO) {
        return this.authService.login(loginDTO)
    }

    @Post('register')
    register(@Body() registerDTO: RegisterDTO) {

    }
}
