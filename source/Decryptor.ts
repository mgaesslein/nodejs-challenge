import { createDecipheriv } from "crypto";
import { readFileSync, writeFileSync } from "fs";

export default class Decryptor {

  private secret: string;
  private iv: string;
  private authTag: string;

  constructor(secretPath: string, ivPath: string, authTagPath: string) {
    this.secret = readFileSync(secretPath, 'utf8').substr(0, 32);

    this.iv = readFileSync(ivPath, 'hex');
    this.authTag = readFileSync(authTagPath, 'hex').substr(0, 16);
  }

  encrypt(filePath: string): void {
    var decipher = createDecipheriv('aes-256-gcm', this.secret, this.iv);
    decipher.setAuthTag(Buffer.from(this.authTag));

    const decrypted = decipher.update(readFileSync(filePath), 'binary', 'utf8') + decipher.final('utf8');
    writeFileSync('./test.zip', decrypted);
  }
}
