import express from 'express';
import UserController from '../Controllers/UserController';

const UsersRouter = express.Router();


/* GET models. */
UsersRouter.post('/register', (request, response) => {
  const userController = new UserController(response);
  userController.register(request);
});
UsersRouter.post('/login', (request, response) => {
  const userController = new UserController(response);
  userController.login(request);
});
UsersRouter.post('/google/login', (request, response) => {
  const userController = new UserController(response);
  userController.solcialLogin(request);
});
UsersRouter.post('/google/register', (request, response) => {
  const userController = new UserController(response);
  userController.socialRegister(request);
});

export default UsersRouter;
