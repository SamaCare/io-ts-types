import * as C from "io-ts/Codec";
import { NumberFromString as NumberFromStringD } from "./decoder";
import { NumberFromString as NumberFromStringE } from "./encoder";

export const NumberFromString: C.Codec<unknown, string, number> = C.make(NumberFromStringD, NumberFromStringE);
