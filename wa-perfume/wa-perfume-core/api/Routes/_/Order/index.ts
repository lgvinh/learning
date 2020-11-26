import express from "express";
import Config from "../../../../Config/Config";
import AuthMiddleware from "../../../Middleware/AuthMiddleware";
const { isAuth } = AuthMiddleware;
import jwtHelper from "../../../Helper/jwt.helper";
const { verifyToken } = jwtHelper;
const router = express.Router();
const { createConnection } = Config;
import Query from "../../../Helper/query.helper";
const { get, insert, update, del } = Query;
import moment from "moment";
import { v4 as uuid4 } from "uuid";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

// Get order
// localhost: 5000/api/order
router.get("/", (req, res) => {
	const { skip, limit } = req.query;
	let query = get(
		"order",
		"`order`.*, user.firstName, user.avatar",
		"left join user on user.id = `order`.userId", 
		"ORDER BY `order`.createdAt DESC",
		limit || 0, skip || 0
	);
	createConnection.query(query, (err, result) => {
		if (err) {
			console.log("GET /api/order", err);
			res.json({
				status: 404,
				message: "Error while query to database"
			});
		} else {
			res.json({
				status: 200,
				result
			});
		}
	});
});

// --------------------------------------------------------------------------------
// Post order
// --------------------------------------------------------------------------------
const getPerfume = (item: any): Promise<any[]> => {
  const { id: perfumeDetailId, size: sizeId } = item;
  let query = get(
    "perfume",
    "perfume.*",
    "inner join perfume_detail as pd on pd.id = perfume.perfumeDetailId",
    `where perfume.perfumeDetailId = '${perfumeDetailId}' and perfume.sizeId = '${sizeId}' and pd.status = 1`
  );
  return new Promise( (resovle, reject) => {
    createConnection.query(query, (err, result) => {
      if (err) {
        console.log("getPerfume() /api/order", err);
        reject(err);
      }
			resovle(result);
    });
  });
};

const createOrder = (address: any, phone: any, name: any, id: any = "") => {
	let query = insert("order"),
			orderObj = {
				id: uuid4(),
				createdAt: new Date().toISOString(),
				address,
				status: 0,
				userId: id !== "" ? id : null,
				phone,
				name
			};
	return new Promise( (resolve, reject) => {
		createConnection.query(query, orderObj, (err, result) => {
			if (err) {
				reject(err);
			}
			resolve(orderObj.id);
		});
	});
};

const createOrderDetail = (list: any, orderId: any) => {
	return new Promise( (resolve, reject) => {
		let newArr = [],
				orderDetailQuery = `
					INSERT INTO order_detail (
						id,
						quantity,
						discountedPrice,
						discountId,
						orderId,
						perfumeId
					)
				`;
		Promise.all(
			list.map( async (item: any) => {
				newArr.push( await getPerfume(item));
			})
		)
		.then( () => {
			let total = 0;
			newArr.forEach( (item: any[], index) => {
				const { quantity, price, discount, discountId } = list[index];
				let countQuantity = 0,
						totalQuantity = 0;
				for (const data of item) {
					totalQuantity += Number(data.quantity);
				}
				for (var data of item) {
					if ( 
						Number(data.quantity) > 0 &&
						totalQuantity >= Number(quantity)
					) {
						countQuantity += Number(quantity) > Number(data.quantity) ? Number(data.quantity) : Number(quantity);
						if ( countQuantity <= Number(quantity) ) {
							orderDetailQuery += `${orderDetailQuery.search("values") === -1 ? " values " : ", "} (
								${"'" + uuid4() + "'"},
								${Number(quantity) > Number(data.quantity) ? Number(data.quantity) : Number(quantity)},
								${ discount > 0 ? Number(price) - (Number(price) * Number(discount) / 100 ) : null},
								${discountId && discountId !== "" ? "'" + discountId + "'" : null },
								${"'" + orderId + "'"},
								${"'" + data.id + "'"}
							)`;
							total += discount > 0 ? Number(price) - (Number(price) * Number(discount) / 100 ) : Number(price);
						} else break;
					}
				}
			});
			createConnection.query(orderDetailQuery, (err, result) => {
				if (err) reject(err);
				resolve(total);
			});
		})
		.catch( error => reject(error));
	});
};

// create a request include request_detail
// localhost:5000/api/order
router.post("/add", async (req, res) => {
	let decode: any = "";
	const tokenFromClient = req.header("authorization");
	if (tokenFromClient) {
		decode = await verifyToken(tokenFromClient, accessTokenSecret);
	}
  const { cart, address, phone, name } = req.body;
	try {
		const { data } = decode;
		let orderId: any = "";
		if (
			data && data.id
		) {
			orderId = await createOrder(address, phone, name, data.id);
		} else orderId = await createOrder(address, phone, name);
		createOrderDetail(cart, orderId)
			.then(() => {
				res.json({
					status: 200,
					message: "created order with order_detail success"
				});
			})
			.catch( error => {
				let deleteOrderQuery = del("order", `where order.id = '${orderId}'`);
				createConnection.query(deleteOrderQuery, (err, result) => {
					if (err) {
						console.log("addOrderDetail: ", err);
						res.json({
							status: 400,
							message: "error while query to db"
						});
					} else {
						res.json({
							status: 400,
							message: "Failed"
						});
					}
				});
			});
	} catch (error) {
		console.log(error);
		res.json({
			status: 400,
			message: "Error while processing"
		});
	}
});

export default router;
// --------------------------------------------------------------------------------
// End Post order
// --------------------------------------------------------------------------------

const isValidtoCancel = (date: any): boolean => moment(moment(new Date)).diff(date, "hours") <= 0.5 ? true : false;

router.put("/:id", isAuth, (req, res) => {
	const { id } = req.params,
				{ status, message } = req.body;
	let flag = false;

	if ( req["decode"].data.role === "user" ) {
		if ( status !== 2 )
			flag = true;
	}

	if ( !flag ) {
		let selectQuery = get("order", "createdAt", "", `where id = '${id}'`);
		createConnection.query(selectQuery, (err, result) => {
			if ( err ) {
				console.log(err);
				res.json({
					status: 400,
					message: "error"
				});
			} else {
				if ( result.length > 0 ) {
					let flag2 = false;
					let createdAt = result[0].createdAt;
					if ( !isValidtoCancel(createdAt) && status === 2 ) {
						flag2 = true;
					}
					if ( !flag2 ) {
						let query = `
							UPDATE ${"`" + "order" + "`"}
							SET status = ${status} ${message ? `, message = '${message}'` : ""}
							WHERE id = '${id}' and status = 0
						`;
						createConnection.query(query, (err, result) => {
							if (err) {
								console.log(err);
								res.json({
									status: 400,
									message: "error"
								});
							} else {
								if (result.affectedRows > 0) {
									res.json({
										status: 200,
										message: "update order successfully"
									});
								} else {
									res.json({
										status: 404,
										message: "update order fail, cannot find id: " + id
									});
								}
							}
						});
					} else {
						res.json({
							status: 404,
							message: "Invalid to cancel order"
						});
					}
				} else {
					res.json({
						status: 404,
						message: "update order fail, cannot find id: " + id
					});
				}
			}
		});
	} else 
		res.json({
			status: 403,
			message: `Update status ${status} is not allowed`
		});
});