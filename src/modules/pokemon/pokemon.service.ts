import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Pokemon } from './entities/pokemon.entity';


import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { not } from 'rxjs/internal/util/not';

@Injectable()
export class PokemonService {

  constructor( 
    @InjectModel(Pokemon.name)//nombre del modelo o entidad la cual seria Pokemon
    private readonly pokemonModel: Model<Pokemon> 
  ){}



  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
      
    } catch (error) {
      this.handleExceptions( error );
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string): Promise<Pokemon | null> {
    let pokemon: Pokemon | null = null;

    // Si el termino es un nnumero valido entonces realizamos 
    // la busqueda por el numero del pokemon
    if(!isNaN(+term)){
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    // si no se encontro un pokemon por numero y el termino es un id valido de mongo
    // entonces realizamos la busqueda por id
    if(!pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById(term);
    }

    // Si no se encontro un pokemon por id, ni por numero
    // entonces realizamos la busqueda por nombre
    if(!pokemon){
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });
    }


    // Si no existe el pokemon por por ninguno de los medios anteriores entonces arrojo este error
    if(!pokemon)
      throw new NotFoundException(`Pokemon with id, name or no "${ term }" not found`);

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    //Busco el pokemon que quiero actualizar por id, nombre o numero
    const pokemon = await this.findOne(term);

    // Si el usuario quiere actualizar el nombre del pokemon lo paso a minusculas
    // antes de actualizarlo
    if(updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {
      await pokemon?.updateOne( updatePokemonDto );
      return { ...pokemon?.toJSON(), ...updatePokemonDto  };

    } catch (error) {
      this.handleExceptions( error );
    }

  }

  async remove(id: string) {

    // El deletedCount es la respuesta que me da mongo al eliminar un registro
    // si el deletedCount es 0 entonces no se elimino ningun registro
    // Si es 1 entonces se elimino un registro
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
   
    // Si no se elimino ningun registro entonces arrojo este error
    if ( deletedCount === 0 )
      throw new BadRequestException(`Pokemon with id "${ id }" not found`);
    
    return {"mesagge": "Pokemon deleted successfully"};
  }

  private handleExceptions( error: any ) {
    if ( error.code === 11000 ) {
      throw new ConflictException(`Pokemon already exists in db ${ JSON.stringify( error.keyValue ) }`);
    }
    console.log(error);
    throw new InternalServerErrorException('Can not update Pokemon - Check server logs' );
  }
}
