import * as E from "io-ts/Encoder";
import { PositiveInt as PositiveIntT } from "../types";

export const PositiveInt: E.Encoder<string, PositiveIntT> = {
  encode(value) {
    return value.toString();
  },
};
