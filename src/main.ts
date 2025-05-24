import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './middleware/exception-handling';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'error', 'warn', 'debug', 'verbose']
    });

    app.useGlobalFilters(new AllExceptionsFilter());

    await app.listen(5000);
}
bootstrap();
