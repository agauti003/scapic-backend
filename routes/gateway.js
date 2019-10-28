import express from 'express';
import GatewayController from '../Controllers/GatewayController';

const GatewayRouter = express.Router();

GatewayRouter.get('/:categoryName/:modelName/:objectName', (request, response) => {
  const gatewayController = new GatewayController(response);
  gatewayController.get3dObjects(request, response);
});

export default GatewayRouter;
