/* eslint-disable camelcase */
/* eslint-disable no-console */
import axios from 'axios';
import Controller from './Controller';
import Users from '../Models/UsersService';

const verifyGoogleOauthUrl = 'https://www.googleapis.com/oauth2/v3/tokeninfo?access_token';

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
        this.handleException({
          name: 'NotFoundException',
          message: err,
        });
      }
      this.sendResponse(response);
    });
  }

  solcialLogin(request) {
    const { email } = request.body.profileObj;
    const { access_token } = request.body.Zi;
    axios
      .get(`${verifyGoogleOauthUrl}=${access_token}`)
      .then((resp) => {
        if (resp.data.email === email && resp.data.email_verified) {
          this.service.socialLogin({ email }, (err, response) => {
            if (err) {
              console.error(err);
              this.handleException({
                name: 'NotFoundException',
                message: err,
              });
            }
            this.sendResponse(response);
          });
        } else {
          this.sendResponse({
            name: 'UnauthorizedException',
            message: 'Invalid credentials',
          });
        }
      });
  }

  socialRegister(request) {
    const { email } = request.body.profileObj;
    const { name } = request.body.profileObj;
    const password = request.body.Zi.id_token;
    const { access_token } = request.body.Zi;
    axios
      .get(`${verifyGoogleOauthUrl}=${access_token}`)
      .then((resp) => {
        if (resp.data.email === email && resp.data.email_verified) {
          this.service.register({ email, name, password }, (err, response) => {
            if (err) {
              console.error(err);
              this.handleException({
                name: 'ConflictException',
                message: err,
              });
            }
            this.sendResponse(response);
          });
        } else {
          this.sendResponse({
            name: 'ConflictException',
            message: 'Can\'t store data',
          });
        }
      });
  }
}
