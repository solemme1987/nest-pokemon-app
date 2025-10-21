import { Module } from '@nestjs/common';

import { PokemonModule } from './modules/pokemon/pokemon.module';
import { serveStaticConfig } from './config/serveStatic.config';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './modules/seed/seed.module';


@Module({
  imports: [
    serveStaticConfig,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {}
