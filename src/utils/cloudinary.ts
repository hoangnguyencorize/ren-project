import { CLOUD_API_KEY, CLOUD_API_SECRET, CLOUD_NAME } from '@/config';
import { HttpException } from '@/exceptions/HttpException';
import cloudinary, { ConfigOptions, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
const config: ConfigOptions = {
  api_secret: CLOUD_API_SECRET,
  api_key: CLOUD_API_KEY,
  cloud_name: CLOUD_NAME,
};

cloudinary.v2.config(config);

const uploadCloud = {
  upload: async (path: string, forderName: string): Promise<{ public_id: string; url: string }> =>
    await cloudinary.v2.uploader.upload(
      path,
      { forder: forderName },
      (err: UploadApiErrorResponse, result: UploadApiResponse): { public_id: string; url: string } => {
        if (err) throw new HttpException(err.http_code, err.message);
        return { public_id: result.public_id, url: result.url };
      },
    ),
};

export default uploadCloud;
