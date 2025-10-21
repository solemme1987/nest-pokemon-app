import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {
  
  
  @IsInt() // Debe ser un entero
  @Min(1)// El numero minimo es 1, no puede ser 0 o negativo
  @IsPositive()
  @Type(() => Number)// Esto convierte el valor a numero
  @ApiProperty({// Decorador de swagger para documentacion
    example: 25,
    description: 'Número en la Pokédex',
  })
  no: number;

  @IsString()
  @MinLength(1)
  @Transform(({ value }) => value.trim())// Elimina espacios en blanco al inicio y al final
  @ApiProperty({// Decorador de swagger para documentacion
    example: 'Pikachu',
    description: 'Nombre del Pokémon',
  })
  name: string;

}
