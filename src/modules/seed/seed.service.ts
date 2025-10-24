import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response';

import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {
  
  constructor( 
    @InjectModel(Pokemon.name)//nombre del modelo o entidad la cual seria Pokemon
    private readonly pokemonModel: Model<Pokemon>,
    
    private readonly http: AxiosAdapter,

  ){}
  
  async executeSeed() {

    // Eliminar todos los registros de la coleccion pokemons ants de llenarla base de datos
    // Para evitar duplicados.
    await this.pokemonModel.deleteMany({}); 
    
    const data  = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach( async ({ name, url }) => {
      const segments = url.split('/');
      // segments es = ['https:', '', 'pokeapi.co', 'api', 'v2', 'pokemon', '1', '']
      // Y como quiero el penultimo elemento del array  le paso [segment.length -2]
      // Si quiero el ultimo seria [segment.length -1]
      const no = +segments[segments.length - 2];//De esta forma tomamos el numero del pokemon

      pokemonToInsert.push({ name, no });
      // console.log({ name, no });
    });

    // Esta forma es la mas optioma para insertar muchos registros a la vez
    // en la base de datos sin tener que hacer un ciclo e insertar uno por uno
    // y generar muchas conexiones a la base de datos
    await this.pokemonModel.insertMany( pokemonToInsert );
 
    return 'Database was populated with seed data successfully!';
  }
}
