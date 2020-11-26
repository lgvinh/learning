import cloudinary from "cloudinary";
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.v2.config({ 
  cloud_name: CLOUD_NAME, 
  api_key: API_KEY, 
  api_secret: API_SECRET 
});

/**
 * Function upload to cloudinary with parameter is base64 string
 * @param uri => must be a base64 string
 */
const UploadBase64Image = (uri: string): Promise<cloudinary.UploadApiResponse> => {
  return new Promise( (resolve, reject) => {
    cloudinary.v2.uploader.upload( uri, 
      function(error, result) {
        if (error) {
          console.log("error", error);
          reject(error);
        }
        resolve(result);
      }
    );
  });
};

/**
 * function delete
 * @param name => name of image ( example: "image-name.jpg" )
 */
const DeleteImage = (name: string): Promise<any> => {
  let spit: any = name.split(".");
  return new Promise( (resolve, reject) => {
    cloudinary.v2.api.delete_resources(spit[0], (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(result);
    });
  });
};


export default {
  UploadBase64Image,
  DeleteImage
};