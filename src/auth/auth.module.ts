import { Module } from '@nestjs/common';
import { ModelsModule } from 'src/common/schemas/models.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [ModelsModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }
