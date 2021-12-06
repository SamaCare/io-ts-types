import * as C from "io-ts/Codec";
import { Json as JsonT } from "../types";
import { Json as JsonD } from "./decoder";
import { Json as JsonE } from "./encoder";

export const Json: C.Codec<unknown, string, JsonT> = C.make(JsonD, JsonE);
