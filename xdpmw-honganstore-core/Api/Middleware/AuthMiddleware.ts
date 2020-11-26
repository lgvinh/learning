import jwtHelper from "../Helper/jwt.helper";
const { verifyToken } = jwtHelper;

// Lấy mã secretKey từ biến môi trường
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

/**
 * Middleware: Authorization user by Token
 * @param {*} req
 * @param {*} res 
 * @param {*} next 
 */
let isAuth = async (req: any, res: any, next: any) => {
  // Lấy mã token được gửi lên từ phía client
  const tokenFromClient = req.header("authorization");

  if ( tokenFromClient ) {
    try {
      const decode = await verifyToken(tokenFromClient, accessTokenSecret);

      // Nếu token hợp lệ, lưu thông tin giải mã vào đối tượng req, dùng cho các xử lý ở phía sau
      req.decode = decode;

      // Cho phép req đi tiếp trong controller
      next();
    } catch (error) {
      return res.json({
        status: 401,
        message: "Unauthorized"
      });
    }
  } else {
    // Không tìm thấy token trong req
    return res.json({
      status: 403,
      message: "No token provided"
    });
  }
};

/**
 * Middleware authorization admin by token
 * @param req 
 * @param res 
 * @param next 
 */
let isAuthAsAdmin = async (req: any, res: any, next: any) => {
  const tokenFromClient = req.header("authorization");
  
  if ( tokenFromClient ) {
    try {
      const decode = await verifyToken(tokenFromClient, accessTokenSecret);
      if ( decode["data"]["role"] === 1 ) {
        req.decode = decode;
        next();
      } else return res.json({
        status: 401,
        message: "Unauthorized"
      });
    } catch (error) {
      return res.json({
        status: 401,
        message: "Unauthorized"
      });
    }
  } else {
    // Không tìm thấy token trong req
    return res.json({
      status: 403,
      message: "Forbidden!! No token provided"
    });
  }
};

/**
 * Middle check id user equal or is admin
 * @param req 
 * @param res 
 * @param next 
 */
let isValidId_or_isAdmin = (req: any, res: any, next: any) => {
  const { id } = req.params,
        { data } = req.decode,
        idToken = data.user_id;

  if ( data.role === 1 ) {
    next();
  } else if ( Number(id) === Number(idToken) ) {
    next();
  } else return res.json({
    status: 403,
    message: "Invalid user"
  });
};

export default {
  isAuth,
  isAuthAsAdmin,
  isValidId_or_isAdmin
};
