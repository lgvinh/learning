import { createExpressServer } from "routing-controllers";
import * as Controller from "./presenter/controller";
import * as Middlewares from "./presenter/middleware";
import * as express from "express";

const getController = () => Object.values(Controller);
const getMiddlewares = () => Object.values(Middlewares);

export const createHttpServer = (port: number) => {
  const app: express.Express = createExpressServer({
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'X-Api-Version'],
        maxAge: 3600,
        preflightContinue: true,
        optionsSuccessStatus: 204
    },
    controllers: getController(),
    middlewares: getMiddlewares(),
    routePrefix: "/api",
    defaultErrorHandler: false,
    validation: false,
  });

  app.all("*", (req, res: express.Response, next) => {
    if (!res.finished) {
      next(
        res.status(404).json({
          statusCode: 404,
          status: "error",
          message: `Can't find ${req.method} ${req.originalUrl} on this server!`
        })
      );
    }
  });

  app.use((err, req, res, next) => {
    const { message, status, statusCode } = err;
    if (!res.finished) {
      next(
        res.status(statusCode).json({
          statusCode: statusCode || 500,
          status: status || "error",
          message: message || "Internal server error",
        })
      );
    }
  });
  return app.listen(port);
};
