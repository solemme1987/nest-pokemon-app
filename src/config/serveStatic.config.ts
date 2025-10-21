import { ServeStaticModule } from "@nestjs/serve-static"
import { join } from "path"

export const serveStaticConfig =  ServeStaticModule.forRoot({
  // Tuve qe agregarle dos puntos mas '..' pq sino no encontraba la carpeta public
  // si hacemos esta configuracion directamente en app.module.ts
  // Lo nomral es asi: join(__dirname,'..','public')
  rootPath: join(__dirname,'..','..','public'), 
});
  