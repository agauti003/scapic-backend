import express from 'express';
import ModelController from '../Controllers/ModelController';

const ModelsRouter = express.Router();


/* GET models. */
ModelsRouter.get('/:page', (request, response) => {
  const modelController = new ModelController(response);
  modelController.get(request);
});

export default ModelsRouter;
