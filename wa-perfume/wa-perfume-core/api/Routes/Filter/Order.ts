import express from "express";
import Auth from "../../Middleware/AuthMiddleware";
import Config from "../../../Config/Config";
const { isAuth } = Auth;
const router = express.Router(),
      { createConnection } = Config;
      
const filterResult = (result: any) => {
  let newArr = [],
      total = 0;
  result.forEach( item => {
    if (newArr.length === 0) {
      newArr.push(genOrder(item));
      total += 1;
    } else {
      let existingOrderId = newArr.filter(o => o.id === item.id);
      if ( existingOrderId.length === 0 ) {
        newArr.push(genOrder(item));
        total += 1;
      } else {
        for (var data of newArr) {
          if (data.id === item.id) {
            data.orderDetails.push(genOrderDetail(item));
            break;
          }
        }
      }
    }
  });
  return {
    newArr,
    total
  };
};

const genOrder = (item: any) => {
  const { id, address, phone, receiverName, createdAt, message, status, userId, firstName, lastName, avatar, userAddress, userPhone, userEmail } = item;
  return {
    id,
    address,
    phone,
    receiverName,
    createdAt,
    message,
    status,
    userId,
    userFirstName: firstName,
    userLastName: lastName,
    userAvatar: avatar,
    userPhone,
    userAddress,
    userEmail,
    orderDetails: [
      genOrderDetail(item)
    ]
  };
};

const genOrderDetail = (item: any) => {
  const { orderDetailId: id, quantity, discountedPrice, discountId, orderId, perfumeId, price, name, image, perfumeDetailId, size, producerId, producerName, odStatus } = item;
  let discount = discountedPrice && discountedPrice !== null ? ((Number(price) - Number(discountedPrice) ) / Number(price)) * 100 : 0;
  return {
    id,
    quantity,
    discountedPrice,
    discount,
    discountId,
    orderId,
    perfumeId,
    price,
    size,
    name,
    image,
    perfumeDetailId,
    producerId,
    producerName,
    status: odStatus
  };
};

router.get("/", isAuth, (req, res) => {
  const { data } = req["decode"];
  const { id, userId } = req.query;
  let isUser: boolean = true;
  if ( data ) {
    if ( data.role === "admin" ) {
      isUser = false;
    }
    const { limit, skip } = req.query;
    let query = `
      SELECT 
        o.*, o.name as receiverName, u.firstName, u.lastName, u.avatar, u.address as userAddress, u.phone as userPhone, u.email as userEmail, od.id as orderDetailId, od.quantity, od.discountedPrice, od.discountId, od.orderId, od.perfumeId, od.status as odStatus, p.price, p.sizeId as size, p.producerId, pd.name, pd.image, pd.id as perfumeDetailId, prod.name as producerName
      FROM 
        (
          SELECT * FROM ${"`" + "order" + "`"} ${limit ? `LIMIT ${limit}`: ""} ${skip ? `OFFSET ${skip}`: ""}
        ) as o
      INNER JOIN 
        order_detail as od on o.id = od.orderId 
      INNER JOIN 
        perfume as p on p.id = od.perfumeId
      INNER JOIN 
        perfume_detail as pd on pd.id = p.perfumeDetailId
      LEFT JOIN
        user as u on u.id = o.userId
      INNER JOIN
        producer as prod on p.producerId = prod.id
      ${isUser ? `WHERE o.userId = '${data.id}'` : id ? `WHERE od.orderId = '${id}' ${userId ? `and o.userId = '${userId}'` : ""}` : `${userId ? `WHERE o.userId = '${userId}'` : ""}`}
      ORDER BY o.createdAt DESC
    `;
    createConnection.query(query, async (err, result) => {
      if (err) {
        console.log("/api/filter/order/",err);
        res.json({
          status: 400,
          message: "Error while query to db"
        });
      } else {
        let newResult = filterResult(result);
        res.json({
          status: 200,
          pagination: {
            limit: limit || 10,
            skip: skip || 0,
            userId: isUser ? data.id : userId || "",
            orderId: id || "",
            total: newResult.total
          },
          result: newResult.newArr
        });
      }
    });
  } else {
    res.json({
      status: 401,
      message: "Unauthorized"
    });
  }
});

export default router;