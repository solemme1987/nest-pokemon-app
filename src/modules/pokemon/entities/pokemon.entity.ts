// importamos este decorador del paquete mongoose en nest
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"; 
// importamos este documento extiende de mongosse
import { Document } from "mongoose"; 

/* Agregamos un decorador del modulo de nest referente a mongoose
indicando que se va a crear un squema.

Tambien extendemos esta clase de Document, esto viene de mongo
y es par aque la tabla pueda reconocer que es una coleccion de 
mongo.
*/

@Schema()
export class Pokemon extends Document {

  /* El esquema tambien necesita un id obligatorio, pero esto 
     lo provee mongo y no necesitamos colocarlo */

  //id: string //Mongo ya me provee este estring

  /* Cada pokemon debe tener un nombre y un numero, estos
     deben ser indices unicos en la base de datos, es decir
     que no se repitan. para eso utiliamos el decorador
     Prop y le pasamos dos parametros unique e index y 
     los colocamos en true. */
  @Prop({
    unique: true,
    index: true,
  })
  name: string;//nombre del pokemon
  
  @Prop({
    unique: true,
    index: true,
  })
  no: number; //numero del pokemon
 
}

/* Debemos exportar el squema que acabamos de crear y lo hacemos 
de la siguente manera, creamos una constante PokemonsSchema y 
le asignamos o igualamos el valor de la clase Pokemon con la
funcion SchemaFactory.createForClass.

Esto me creara mi coleccion en mongo, pero para que funcione debemos 
ir a pokemon.module y hacer otra configuracion alla.*/
export const PokemonSchema = SchemaFactory.createForClass( Pokemon );