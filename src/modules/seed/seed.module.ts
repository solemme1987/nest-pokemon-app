import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonModule } from '../pokemon/pokemon.module';
import { CommonModule } from 'src/common/common.module';


@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    PokemonModule,// Importamos el PokemonModule para poder usar el modelo de Pokemon en el SeedService
    CommonModule, // Importamos el CommonModule para poder usar el AxiosAdapter en el SeedService
  ],

})
export class SeedModule {}
