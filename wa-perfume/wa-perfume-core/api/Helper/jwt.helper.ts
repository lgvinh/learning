import jwt from "jsonwebtoken";

/**
 * private function generateToken
 * @param user  object
 * @param secretSignature string
 * @param tokenLife string
 * @param role number(0: admin, 1: user)
 */
let generateToken = (user: object, secretSignature: string, tokenLife: string = "24h", role: number = 1) => {
  return new Promise( (resolve, reject) => {
    // Định nghĩa thông tin user để lưu vào token
    const userData = { id: user["id"], role: role === 0 ? "admin" : "user" };

    // Thực hiện ký và tạo token
    jwt.sign(
      {data: userData},
      secretSignature,
      {
        algorithm: "HS256",
        expiresIn: tokenLife
      },
      (error, token) => {
        if ( error )
          return reject(error);
        resolve(token);
      }
    );
  });
};

/**
 * private function generate verify email token
 * @param data
 * @param secretSignature 
 * @param tokenLife 
 */
let generateVerifyMailToken = (data: object, secretSignature: string, tokenLife: string = "15h") => {
  return new Promise( (resolve, reject) => {
    jwt.sign(
      data,
      secretSignature,
      {
        algorithm: "HS512",
        expiresIn: tokenLife
      },
      (error, token) => {
        if ( error )
          return reject(error);
        resolve(token);
      }
    );
  });
};

/**
 * This module used for verify jwt token
 * @param {*} token 
 * @param {*} secretKey 
 */
let verifyToken = (token: string, secretKey: string) => {
  return new Promise( (resovle, reject) => {
    jwt.verify(token, secretKey, (error, decode) => {
      if ( error )
        return reject(error);
      resovle(decode);
    });
  });
};

/**
 * This module used for verify jwt token
 * @param {*} token 
 * @param {*} secretKey 
 */
let verifyMailToken = (token: string, secretKey: string) => {
  return new Promise( (resovle, reject) => {
    jwt.verify(token, secretKey, { algorithms: ['HS512'] }, (error, decode) => {
      if ( error )
        return reject(error);
      resovle(decode);
    });
  });
};
export default {
  generateToken,
  verifyToken,
  generateVerifyMailToken,
  verifyMailToken
};