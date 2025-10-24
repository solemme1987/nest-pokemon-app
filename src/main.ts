import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Configuramos los pipes de validacion globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { //Gracias a esto no tengo que usar @Type para transformar los tipos de datos en los dtos
        enableImplicitConversion: true,
      },
    }),
  );

  //Con esto le agregamos un prefijo global a todas las rutas de la app
  app.setGlobalPrefix('api/v2'); 

  //Configuramos swagger para documetnar la app
  setupSwagger(app); 

  // Escuchamos en el puerto 3000 o el que nos asigne la plataforma
  await app.listen(process.env.PORT ?? 3000);
  console.log(`App running on port ${process.env.PORT}`);
}
bootstrap();
