import { IMAGE_TYPE, MIME_TYPE } from '../config/constant';

export const getImageType = (src) => {
  if (!src) {
    return '';
  }

  const fileExtension = src.split('.')[1];

  switch (fileExtension) {
  case IMAGE_TYPE.JPEG:
    return MIME_TYPE.JPEG;
  case IMAGE_TYPE.WEBP:
    return MIME_TYPE.WEBP;
  case IMAGE_TYPE.SVG:
    return MIME_TYPE.SVG;
  default:
    return MIME_TYPE.PNG;
  }
};
