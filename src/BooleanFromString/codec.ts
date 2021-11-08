import * as C from "io-ts/Codec";
import { BooleanFromString as BooleanFromStringD } from "./decoder";
import { BooleanFromString as BooleanFromStringE } from "./encoder";

export const BooleanFromString: C.Codec<unknown, string, boolean> = C.make(
  BooleanFromStringD,
  BooleanFromStringE
);
