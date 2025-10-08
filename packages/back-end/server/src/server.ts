// server.js
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import router from "./router";
import { globalInterceptor } from "helper";
const bootstrap = async () => {
  const app = new Koa();

  app.use(bodyParser());
  app.use(globalInterceptor);
  // 🔀 Rutas
  for (const route of router) {
    app.use(route.routes()).use(route.allowedMethods());
  }

  app.listen(3000, () => {
    console.log(`✅ Servidor Koa escuchando en http://localhost:${3000}`);
  });
};

bootstrap()
  .then(() => {
    console.log("✅ Servidor Koa iniciado");
  })
  .catch((error) => {
    console.error("❌ Servidor Koa no iniciado", error);
  });
