import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { ApiOperation } from '@nestjs/swagger';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  // @HttpCode(HttpStatus.OK)
  // @HttpCode(HttpStatus.CREATED) // Esta linea de codigo nos permite personalizar el codigo de respuesta http
  @ApiOperation({ summary: 'Registrar un nuevo Pokemon', description: 'Permite registrar un nuevo pokemon' })
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los pokemones', description: 'Obtiene todos los pokemones registrados' })
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(':term')
  @ApiOperation({ summary: 'Obtiene un pokemon por id, nombre o numero', description: 'Obtiene un pokemon por id, nombre o numero' })
  findOne(@Param('term') term: string) {
    return this.pokemonService.findOne(term);
  }

  @Patch(':term')
  @ApiOperation({ summary: 'Actualizar un pokemon', description: 'Permite actualizar los datos de un pokemon' })
  update(@Param('term') term: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(term, updatePokemonDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un pokemon por su id', description: 'Permite eliminar un pokemon por su id' })
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}
