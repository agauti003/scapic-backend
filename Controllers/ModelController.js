/* eslint-disable no-console */
import Controller from './Controller';
import Models from '../Models/ModelsService';

export default class ModelController extends Controller {
  constructor(response) {
    super(response);
    this.service = new Models();
  }

  get(request) {
    this.service.getModels(request.params, (err, response) => {
      if (err) {
        console.error(err);
        this.handleException(err);
      }
      this.sendResponse(response);
    });
  }
}
