import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response';



@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

 async  executeSeed() {
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=2');

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      // segments es = ['https:', '', 'pokeapi.co', 'api', 'v2', 'pokemon', '1', '']
      // Y como quiero el penultimo elemento del array  le paso [segment.length -2]
      // Si quiero el ultimo seria [segment.length -1]
      const no = +segments[segments.length - 2];//De esta forma tomamos el numero del pokemon
      console.log({ name, no });
    });
 
    // return 'Database was populated with seed data successfully!';
    // return data;
  }
}
