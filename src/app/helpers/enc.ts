import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

export abstract class enc {
  public static encryptData = (data: string) => {
    try {
      return CryptoJS.AES.encrypt(
        JSON.stringify(data),
        environment.secretKey
      ).toString();
    } catch (e) {
      return null;
    }
  };

  public static decryptData = (data: string) => {
    try {
      const bytes = CryptoJS.AES.decrypt(data, environment.secretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      return null;
    }
  };
}
