import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    ConfigModule,// Importamos el ConfigModule para poder usar el ConfigService en el PokemonService

    /* Importamos el mongoose module
       Le pasamos name y schema, en name le pasamos como valor 
       Pokemon.name pero no pensemos que este .name es la
       propiedad name del squema, ese nombre lo saca del extend
       Document, no estoy seguro pero creo que hce referencia 
       al nombre de la coleccion
    */
    MongooseModule.forFeature([
      {
        name: Pokemon.name, // Nombre de la coleccion, el cual sería "pokemons"
        schema: PokemonSchema,// Importamos la constante que creamos 
        // Para poder exportar el schema 
      }
    ])
  ],
  exports: [MongooseModule],// Exportamos el MongooseModule para poder usarlo en otros módulos
})
export class PokemonModule {}