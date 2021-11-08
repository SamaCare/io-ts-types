import * as E from "io-ts/Encoder";
import { Port as PortT } from "../types";

export const Port: E.Encoder<string, PortT> = {
  encode(value) {
    return value.toString();
  },
};
