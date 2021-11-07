import crypto from "crypto-js";

type AnyObject = { [key: string]: any };

export const encrypt = (data: AnyObject) => {
  return crypto.AES.encrypt(
    JSON.stringify(data),
    process.env.AES_KEY as string
  ).toString();
};

export const decrypt = (cipher: string) => {
  return crypto.AES.decrypt(cipher, process.env.AES_KEY as string).toString(
    crypto.enc.Utf8
  );
};
