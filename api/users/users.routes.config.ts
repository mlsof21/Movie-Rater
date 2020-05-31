import {
  CommonRoutesConfig,
  configureRoutes,
} from '../common/common.routes.config';
import express from 'express';
import { UsersController } from './controllers/users.controller';
import { UsersMiddleware } from './middlewares/users.middlewares';

export class UserRoutes extends CommonRoutesConfig implements configureRoutes {
  constructor(app: express.Application) {
    super(app, 'UserRoutes');
    this.configureRoutes();
  }

  configureRoutes() {
    const usersController = new UsersController();
    const usersMiddleware = UsersMiddleware.getInstance();

    this.app.get(`/users`, [usersController.listUsers]);

    this.app.post(`/users`, [
      usersMiddleware.validateRequiredCreateUserBodyFields,
      usersMiddleware.validateSameEmailDoesntExist,
      usersController.createUser,
    ]);

    this.app.put(`/users/:userId`, [
      usersMiddleware.validateUserExists,
      usersMiddleware.extractUserId,
      usersController.put,
    ]);

    this.app.patch(`/users/:userId`, [
      usersMiddleware.validateUserExists,
      usersMiddleware.extractUserId,
      usersController.patch,
    ]);

    this.app.delete(`/users/:userId`, [
      usersMiddleware.validateUserExists,
      usersMiddleware.extractUserId,
      usersController.removeUser,
    ]);

    this.app.get(`/users/:userId`, [
      usersMiddleware.validateUserExists,
      usersMiddleware.extractUserId,
      usersController.getUserById,
    ]);
  }
}
