import * as C from "io-ts/Codec";
import { Int as IntT } from "../types";
import { Int as IntD } from "./decoder";
import { Int as IntE } from "./encoder";

export const Int: C.Codec<unknown, number, IntT> = C.make(IntD, IntE);
