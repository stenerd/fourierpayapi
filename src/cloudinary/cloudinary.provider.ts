// Third-party libraries
import { v2 } from 'cloudinary';
import configuration from 'src/config/configuration';
const config = configuration();

//constant
import { CLOUDINARY } from './constants';

// provider
export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): any => {
    return v2.config({
      cloud_name: config.CLOUDINARY_CLOUD_NAME,
      api_key: config.CLOUDINARY_API_KEY,
      api_secret: config.CLOUDINARY_API_SECRET,
      secure: true,
    });
  },
};
