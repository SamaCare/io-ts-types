import * as E from "io-ts/Encoder";
import { Json as JsonT } from "../types";

export const Json: E.Encoder<string, JsonT> = {
  encode: JSON.stringify,
};
