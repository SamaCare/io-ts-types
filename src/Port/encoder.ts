import * as E from "io-ts/Encoder";
import { Port as PortT } from "../types";

export const Port: E.Encoder<number, PortT> = {
  encode(value) {
    return value;
  },
};
