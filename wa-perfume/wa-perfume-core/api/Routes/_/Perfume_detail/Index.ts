import express from "express";
import Config from "../../../../Config/Config";
import { v4 as uuid4 } from "uuid";
import AuthMiddleware from "../../../Middleware/AuthMiddleware";
import { PerfumeDetail } from "../../../Interface";
import ImageStorage from "../../../Controller/ImageStorage.controller";

const { isAuthAsAdmin } = AuthMiddleware;
const { UploadBase64Image, DeleteImage } = ImageStorage;
const router = express.Router();
const { createConnection } = Config;


// Get pagination
// example: localhost:5000/api/perfume_detail?limit=10&skip=0&keyword=""
router.get("/", (req, res) => {
  const query = {
    ...req.query
  };
  const limit = query.limit ? query.limit : 10,
        skip = query.skip ? query.skip : 0,
        keyword = query.keyword ? query.keyword : "";

  createConnection.query(`SELECT * FROM perfume_detail WHERE perfume_detail.name LIKE "%${keyword}%" LIMIT ${limit} OFFSET ${skip}`, (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.json({
        status: 400,
        message: "error"
      });
    } else {
      res.json({
        status: 200,
        pagination: {
          keyword,
          limit,
          skip,
          total: result.length
        },
        result
      });
    }
  });
});

// Get all
// example: localhost:5000/api/perfume_detail/all
router.get("/all", isAuthAsAdmin, (req, res) => {
  createConnection.query("select * from perfume_detail", (err, result, field) => {
    if ( err ) { 
      console.log(err); 
      res.json({
        status: 404,
        message: "error"
      });
    }
    else {
      res.json({
        status: 200,
        result
      });
    }
  });
});

// Get by id
// example: localhost:5000/api/perfume_detail/find-id/6
router.get("/find-id/:id", (req, res) => {
  const { params: { id } } = req;
  createConnection.query(`select * from perfume_detail where perfume_detail.id = '${id}'`, (err, result, field) => {
    if ( err ) { 
      console.log(err);
      res.json({
        status: 404,
        message: "error"
      });
    }
    else {
      if ( result.length > 0 ) {
        res.json({
          status: 200,
          result: result[0]
        });
      } else {
        res.json({
          status: 404,
          message: `Cannot find ${id}`
        });
      }
    }
  });
});

// Get by id brand
// example: localhost:5000/api/perfume_detail/find-id-branch/6
router.get("/find-id-branch/:id", (req, res) => {
  const { params: { id } } = req;
  createConnection.query(`select * from perfume_detail where perfume_detail.brandId = '${id}'`, (err, result, field) => {
    if ( err ) { 
      console.log(err);
      res.json({
        status: 404,
        message: "error"
      });
    }
    else {
      if ( result.length > 0 ) {
        res.json({
          status: 200,
          result
        });
      } else {
        res.json({
          status: 404,
          message: `Cannot find ${id}`
        });
      }
    }
  });
});

// Add
// example: localhost:5000/api/perfume_detail/add
router.post("/add", isAuthAsAdmin, async (req, res) => {
  const { image } = req.body;
  let perfume_detail: PerfumeDetail =  {
    ...req.body,
    id: uuid4()
  };

  if ( image ) {
    let upload = await UploadBase64Image(image);
    perfume_detail["image"] = upload.url;
  }

  createConnection.query(`select * from perfume_detail where perfume_detail.name = '${perfume_detail.name}'`, (err, result, field) => {
    if ( err ) { 
      console.log(err);
      res.json({
        status: 404,
        message: "error"
      });
    }
    else {
      if ( result.length === 0 ) {
        createConnection.query("insert into perfume_detail set ?", perfume_detail, (err) => {
          if ( err ) { 
            console.log(err);
            res.json({
              status: 404,
              message: "error"
            });
          } else {
            res.json({
              status: 200,
              message: `Added "${perfume_detail.name}" successfully`
            });
          }
        });
      } else {
        res.json({
          status: 400,
          message: `Duplicate name: ${perfume_detail.name}"`
        });
      }
    }
  });
});

// Update pefume
// example: localhost:5000/api/perfume_detail/update
router.put("/update", isAuthAsAdmin, (req, res) => {
  const { image } = req.body;
  const perfume_detail: PerfumeDetail = {
    ...req.body
  };
  let oldAvatar: string = "",
      split: any = "",
      oldAvatarName: string = "";
  let deleteResult: any = "",
      upload: any = "";

  delete perfume_detail["image"];

  createConnection.query(`select image from perfume_detail where perfume_detail.id = '${perfume_detail.id}'`, async (err, result) => {
    if ( err ) {
      console.log(err);
      res.json({
        status: 400,
        message: "error"
      });
    } else {

      if (image) {
        if (result.length > 0 && result[0].image) {
          oldAvatar = result[0].image;
          split = oldAvatar.split("/");
          oldAvatarName = split[split.length - 1].split(".")[0];
          deleteResult = await DeleteImage(oldAvatarName);
        }
        upload = await UploadBase64Image(image);
        perfume_detail["image"] = upload.url;
      }

      createConnection.query(`update perfume_detail set ? where perfume_detail.id = '${perfume_detail.id}'`, perfume_detail, (err, result) => {
        if ( err ) {
          console.log(err);
          res.json({
            status: 400,
            message: "error"
          });
        }
        else {
          if ( result.affectedRows > 0 ) {
            res.json({
              status: 200,
              message: `Updated successfully on perfume_detail's id: '${perfume_detail.id}'`
            });
          } else {
            res.json({
              status: 404,
              message: `Cannot find id: '${perfume_detail.id}'`
            });
          }
        }
      });
    }
  });
});

// Delete
// example: localhost:5000/api/perfume_detail/delete
router.delete("/delete", isAuthAsAdmin, (req, res) => {
  let perfume_detail: PerfumeDetail = { ...req.body };
  
  createConnection.query(`delete from perfume_detail where perfume_detail.id = '${perfume_detail.id}'`, (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.json({
        status: 404,
        message: "error"
      });
    } else {
      if ( result.affectedRows > 0 ) {
        res.status(200).json({
          status: 200,
          message: `Deleted successfully on perfume detail id's: ${perfume_detail.id}`
        });
      } else {
        res.status(200).json({
          status: 404,
          message: `Deleted error on perfume detail id's: ${perfume_detail.id}`
        });
      }
    }
  });
});

// Join tables 
import join from "./Join";
router.use("/join", join);

export default router;