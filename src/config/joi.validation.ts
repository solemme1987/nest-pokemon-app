
import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGODB: Joi.string().required(), //mongodb://localhost:27017/nest-pokemon debe ser una cadena de texto y es obligatorio
  PORT: Joi.number().default(3007), //el puerto es un numero y por defecto es 3000 en caso de no estar definido en la variable de entorno
  DEFAULT_LIMIT: Joi.number().default(60), //el limite por defecto es 60 en caso de no estar definido en la variable de entorno
  NODE_ENV: Joi.string()
    .valid('dev', 'staging', 'test', 'prod')
    .default('dev'), //el entorno de node debe ser uno de los siguientes valores y por defecto es 'dev'
});