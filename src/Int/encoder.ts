import * as E from "io-ts/Encoder";
import { Int as IntT } from "../types";

export const Int: E.Encoder<string, IntT> = {
  encode(value) {
    return value.toString();
  },
};
