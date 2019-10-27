/**
 * Helper module
 */
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import hasher from 'argon2';

const UserHash = require('../Models/UserHash.json');

require('dotenv').config();


export default class Hash {
  /**
                       * Generates hash of given value
                       * @param value string
                       * @returns hash string
                       */
  static generateHash(value) {
    return hasher.hash(value);
  }

  /**
                       * @param hash string
                       * @param value string
                       */
  static compareHash(hash, value) {
    return hasher.verify(hash, value);
  }

  /**
                       * Generates token of given value
                       * @param obj Object
                       * @param  expireTime string
                       * @returns token
                       */
  static generateToken(obj, expireTime) {
    return (expireTime) ? jwt.sign(obj,
      process.env.APP_KEY,
      { expiresIn: expireTime })
      : jwt.sign(obj, process.env.APP_KEY);
  }


  /**
                       * @param token string
                       * @returns decoded data
                       */
  static verifyToken(token) {
    return jwt.verify(token, process.env.APP_KEY);
  }

  /**
                       * Encrypt data
                       * @param data
                       * @return encrypted data
                       */
  static encrypt(data) {
    const cipher = crypto.createCipher(
      UserHash.encrypt_algorithm,
      process.env.APP_KEY,
    );
    let crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  }

  /**
                       * Decrypt data
                       * @param encrypted data
                       * @return decrypted data
                       */
  static decrypt(encryptedData) {
    const decipher = crypto.createDecipher(
      UserHash.encrypt_algorithm,
      process.env.APP_KEY,
    );
    let dec = decipher.update(encryptedData, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  }
}
