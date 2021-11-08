import * as C from "io-ts/Codec";
import { NonEmptyString as NonEmptyStringT } from "../types";
import { NonEmptyString as NonEmptyStringD } from "./decoder";
import { NonEmptyString as NonEmptyStringE } from "./encoder";

export const NonEmptyString: C.Codec<unknown, string, NonEmptyStringT> = C.make(
  NonEmptyStringD,
  NonEmptyStringE
);
