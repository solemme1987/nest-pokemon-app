import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

// Los decoradores @ApiProperty se usan para documentar los dtos en swagger
// y asi pueda aparecer la opcion de paginacion en la documentacion de swagger
export class PaginationDto {
  
  
    @ApiPropertyOptional({
      description: 'Número de resultados a mostrar',
      example: 10,
    })  
    @IsOptional()
    @IsPositive()
    @Min(1)
    // @Type(() => Number)
    limit?: number;
    
    @ApiPropertyOptional({
      description: 'Número de resultados a omitir',
      example: 0,
    })
    @IsOptional()
    @IsPositive()
    //@Type(() => Number)
    offset?: number;
}