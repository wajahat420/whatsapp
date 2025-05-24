import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';


@Module({
    imports: [DatabaseModule, UserModule, AuthModule, ChatModule],
})

export class AppModule { }
