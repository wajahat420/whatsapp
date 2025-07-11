import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { DatabaseModule } from './database/database.module';
import { WinstonLogger } from './logger/winston-logger.service';
import { UserModule } from './user/user.module';


@Module({
    imports: [DatabaseModule, UserModule, AuthModule, ChatModule],
    providers: [WinstonLogger], // <-- provide the logger service
    exports: [WinstonLogger], // <-- export if used in other modules too
})

export class AppModule { }
