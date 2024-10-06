import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './Controller/response/response.interceptor';
import * as dotenv from 'dotenv';



async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.enableCors(
    {
      origin: ['http://localhost:8100'], 
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Accept, Authorization',
      credentials: true,
    }
  )

  await app.listen(3000);
}
bootstrap();
