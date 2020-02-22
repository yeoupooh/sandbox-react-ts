import CryptoJS from "crypto-js";
import Hex from "crypto-js/enc-hex";
import Utf8 from "crypto-js/enc-utf8";
import Base64 from "crypto-js/enc-base64";

const props = {
  mode: CryptoJS.mode.CBC,
  padding: CryptoJS.pad.Iso97971
};

const Cryptor = {
  // return base64 encoded string
  // plain: wordArray
  encrypt(plain, iv, key) {
    console.log(`Cryptor.encrypt: plain: [${Base64.stringify(plain)}]`);

    // var iv = Hex.parse(hexIv);
    // var key = Hex.parse(hexKey);

    // encrypted: WordArray
    var encrypted = CryptoJS.AES.encrypt(plain, key, {
      iv: iv,
      mode: props.mode,
      padding: props.padding
    });
    // console.log(encrypted);
    console.log(
      `encrypted: type: ${typeof encrypted} [${encrypted.toString()}]`
    );
    var encoded = CryptoJS.format.Hex.stringify(encrypted);
    console.log(`encoded: [${encoded}]`);

    // return base64 encoded string
    return encrypted.toString();
  },

  // cipher: WordArray
  decrypt(cipher, iv, key) {
    console.log(
      `Cryptor.decrypt: [${Hex.stringify(cipher)}] iv:[${Hex.stringify(
        iv
      )}] key:[${Hex.stringify(key)}]`
    );

    var decrypted = CryptoJS.AES.decrypt({ ciphertext: cipher }, key, {
      iv: iv,
      mode: props.mode,
      padding: props.padding
    });

    // for testing
    // var decrypted = Hex.parse("313233");

    console.log(`decrypted: [${decrypted}]`, decrypted);
    var decoded = decrypted.toString(Utf8);
    console.log(`decoded: [${decoded}]`);
    console.log("done");

    // return utf-8 encoded string
    return decoded;
  },

  b64encode(decoded) {
    return Base64.stringify(Utf8.parse(decoded));
  },

  b64decode(encoded) {
    return Utf8.stringify(Base64.parse(encoded));
  },

  hexencode(decoded) {
    return Hex.stringify(Utf8.parse(decoded));
  },

  hexdecode(encoded) {
    return Utf8.stringify(Hex.parse(encoded));
  }
};

export default Cryptor;
