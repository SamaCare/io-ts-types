import * as C from "io-ts/Codec";
import { Port as PortT } from "../types";
import { Port as PortD } from "./decoder";
import { Port as PortE } from "./encoder";

export const Port: C.Codec<unknown, string, PortT> = C.make(PortD, PortE);
