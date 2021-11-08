import * as E from "io-ts/Encoder";
import { NonEmptyString as NonEmptyStringT } from "../types";

export const NonEmptyString: E.Encoder<string, NonEmptyStringT> = {
  encode(value) {
    return value;
  },
};
