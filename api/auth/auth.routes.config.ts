import {
  CommonRoutesConfig,
  configureRoutes,
} from '../common/common.routes.config';
import express from 'express';
import { AuthController } from './controllers/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { JwtMiddleware } from './middlewares/jwt.middleware';

export class AuthRoutes extends CommonRoutesConfig implements configureRoutes {
  constructor(app: express.Application) {
    super(app, 'AuthRoutes');
    this.configureRoutes();
  }

  configureRoutes() {
    const authController = new AuthController();
    const authMiddleware = AuthMiddleware.getInstance();
    const jwtMiddleware = JwtMiddleware.getInstance();

    this.app.post(`/auth`, [
      authMiddleware.validateBodyRequest,
      authMiddleware.verifyUserPassword,
      authController.createJwt,
    ]);

    this.app.post(`/auth/refresh-token`, [
      jwtMiddleware.validJwtNeeded,
      jwtMiddleware.verifyRefreshBodyField,
      jwtMiddleware.validRefreshNeeded,
      authController.createJwt,
    ]);
  }
}
