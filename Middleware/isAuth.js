import jwt from 'jsonwebtoken';
import Hash from '../Helpers/Hash';
import Users from '../Models/UsersService';

require('dotenv').config();

export default function isAuth(request, response, next) {
  request.context = {
    user: null,
  };
  const token = request.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.APP_KEY, (err, decoded) => {
      if (!err) {
        const email = Hash.decrypt(decoded.email);
        const service = new Users();
        service.checkEmail(email, (error, res) => {
          if (err) {
            response.send({ error });
          } else if (res.length > 0) {
            next();
          } else {
            response.send({ error: 'Invalid email id' });
          }
        });
      } else {
        response.send({ error: 'Invalid email id' });
      }
    });
  } else {
    response.send({ error: 'Invalid user token' });
  }
}
