import express from "express";
import Config from "../../../../Config/Config";
import { v4 as uuid4 } from "uuid";
import AuthMiddleware from "../../../Middleware/AuthMiddleware";
import ImageStorage from "../../../Controller/ImageStorage.controller";

const { isAuthAsAdmin } = AuthMiddleware;
const { UploadBase64Image, DeleteImage } = ImageStorage;
const router = express.Router();
const { createConnection } = Config;

// Get all
// example: localhost:5000/api/brand/all
router.get("/all", (req, res) => {
  createConnection.query("SELECT brand.* from brand", (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.status(404).json({
        message: "error"
      });
    } else {
      res.json({
        status: 200,
        result
      });
    }
  });
});

// Get single
// example: localhost:5000/api/brand/single/:id
router.get("/find-id/:id", (req, res) => {
  const { params: { id } } = req;

  createConnection.query(`select * from brand where id = '${id}'`, (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.status(404).json({
        message: "error"
      });
    } else {
      res.json({
        status: 200,
        result: result[0]
      });
    }
  });
});

// Get pagination
// example localhost:5000/api/brand?limit=...&skip=...
router.get("/", (req, res) => {
  const query = { ...req.query },
        limit = query.limit ? query.limit : 10,
        skip = query.skip ? query.skip : 0;

  createConnection.query(`select * from brand limit ${limit} offset ${skip}`, (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.status(404).json({
        message: "error"
      });
    } else {
      res.json({
        status: 200,
        pagination: {
          limit,
          skip
        },
        result
      });
    }
  });
});

// Create brand
// example localhost:5000/api/brand/add
router.post("/add", isAuthAsAdmin, (req, res) => {
  let upload: any = "";
  const { name, description, image } = req.body;
  const brand = { 
    id: uuid4(), 
    name: name,
    description: description
  };


  createConnection.query(`select * from brand where name = '${name}'`, async (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.json({
        status: 404,
        message: "error"
      });
    } else {
      if ( result.length === 0 ) {
        try {
          if ( image ) {
            upload = await UploadBase64Image(image);
            brand["image"] = upload.url;
          }
          createConnection.query("insert into brand set ?", brand, (err, result, field) => {
            if ( err ) {
              console.log(err);
              res.status(400).json({
                status: 404,
                message: "error"
              });
            } else {
              res.json({
                status: 200,
                message: "success"
              });
            }
          });
        } catch (error) {
          console.log("error", error);
          res.json({
            status: 404,
            message: "error"
          });
        }
      } else {
        res.json({
          status: 404,
          message: "already have that name on brand"
        });
      }
    }
  });
});

// Update all field brand
// example: localhost:5000/api/brand/update/:id
router.put("/update", isAuthAsAdmin, (req, res) => {
  const { id, name, description, image } = req.body;
  const brand = {
    name,
    description
  };
  let oldAvatar: string = "",
      split: any = "",
      oldAvatarName: string = "";
  let deleteResult: any = "",
      upload: any = "";

  createConnection.query("select * from brand where id = '" + id + "'", async (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        status: 400,
        message: "error"
      });
    }
    else {
      if (image) {
        if (result.length > 0 && result[0].image) {
          oldAvatar = result[0].image;
          split = oldAvatar.split("/");
          oldAvatarName = split[split.length - 1].split(".")[0];
          deleteResult = await DeleteImage(oldAvatarName);
        }
        upload = await UploadBase64Image(image);
        brand["image"] = upload.url;
      }
      createConnection.query(`update brand set ? where id = '${id}'`, brand, (err, result, field) => {
        if ( err ) {
          console.log(err);
          res.status(400).json({
            message: "error"
          });
        } else {
          if ( result.affectedRows > 0) {
            res.json({
              status: 200,
              message: "success"
            });
          }
          else
            res.json({
              status: 404,
              message: "not found brand: " + id
            });
        }
      });
    }
  });
});

// Delete brand
// example: localhost:5000/api/brand/delete/:id
router.delete("/:id", isAuthAsAdmin, (req, res) => {
  const { id } = req.params;
  createConnection.query(`delete from brand where id = '${id}'`, (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.json({
        status: 404,
        message: "error"
      });
    } else {
      if ( result.affectedRows > 0 ) {
        res.json({
          status: 200,
          message: "delete brand success"
        });
      } else {
        res.json({
          status: 404,
          message: "delete brand fail, cannot find id: " + id
        });
      }
    }
  });
});

// Get size
// example: localhost:5000/api/brand/all
router.get("/find-size", (req, res) => {
  createConnection.query("select DISTINCT sizeId from perfume", (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.status(404).json({
        message: "error"
      });
    } else {
      res.json({
        result
      });
    }
  });
});
export default router;