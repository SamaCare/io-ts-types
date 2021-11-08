import * as E from "io-ts/Encoder";

export const NumberFromString: E.Encoder<string, number> = {
  encode(value) {
    return value.toString();
  },
};
