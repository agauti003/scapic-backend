/* eslint-disable no-console */
/* eslint-disable no-useless-constructor */
import Controller from './Controller';
import Users from '../Models/UsersService';

export default class ModelController extends Controller {
  constructor(response) {
    super(response);
    this.service = new Users();
  }

  register(request) {
    this.service.register(request.body, (err, response) => {
      if (err) {
        console.error(err);
        this.handleException(err);
      }
      this.sendResponse(response);
    });
  }

  login(request) {
    this.service.login(request.body, (err, response) => {
      if (err) {
        console.error(err);
        this.handleException(err);
      }
      this.sendResponse(response);
    });
  }
}
