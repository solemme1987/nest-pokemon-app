import { Module } from '@nestjs/common';
import { PokemonModule } from './modules/pokemon/pokemon.module';
import { serveStaticConfig } from './config/serveStatic.config';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './modules/seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';


@Module({
  imports: [
    ConfigModule.forRoot({ //debe ir antes de cualquier modulo que use variables de entorno
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,//importado desde joi.validation.ts le dice a nest que valide las variables de entorno con este esquema
    }), 
    serveStaticConfig,
    MongooseModule.forRoot( process.env.MONGODB!,{
      dbName:'ricacor3_db_user',
    }),//El signo de admiracion le dice a TS que confie en mi, que esa variable no va a ser nula ni undefined
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {}
