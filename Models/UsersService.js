import Hash from '../Helpers/Hash';
import { mySqlClient } from './mysql.client';

const UserHash = require('./UserHash.json');

export default class Users {
  async register(args, callback) {
    try {
      const encryptedEmail = await Hash.encrypt(args.email);
      const hashedPassword = await Hash.generateHash(args.password);
      const accessToken = await Hash.generateToken(
        { email: encryptedEmail },
        UserHash.access_token_expire,
      );
      const Query = `INSERT INTO scapic.users
        (name, email, password)
        VALUES('${args.name}', '${args.email}', '${hashedPassword}')`;

      mySqlClient.query(Query, (error, results) => {
        if (error) {
          callback(error, null);
        } else if (results.affectedRows > 0) {
          callback(null, {
            name: args.name,
            email: args.email,
            access_token: accessToken,
          });
        }
      });
    } catch (error) {
      callback(error, null);
    }
  }

  async login(args, callback) {
    try {
      const Query = `Select * from users where email='${args.email}'`;
      const encryptedEmail = await Hash.encrypt(args.email);
      let pwdMatch = false;

      mySqlClient.query(Query, async (error, results) => {
        if (error) {
          callback(error, null);
        } else if (results.length > 0) {
          const accessToken = await Hash.generateToken(
            { email: encryptedEmail },
            UserHash.access_token_expire,
          );
          pwdMatch = await Hash.compareHash(
            results[0].password,
            args.password,
          );
          if (!pwdMatch) {
            callback('invalid username or password', null);
          }
          callback(null, {
            name: results[0].name,
            email: args.email,
            access_token: accessToken,
          });
        } else {
          callback('invalid username or password', null);
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async checkEmail(email, callback) {
    const Query = `Select * from users where email='${email}'`;
    mySqlClient.query(Query, async (error, results) => {
      if (error) {
        callback(error, null);
      } else if (results) {
        callback(null, results);
      }
    });
  }
}
