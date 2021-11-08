import { pipe } from "fp-ts/function";
import * as D from "io-ts/Decoder";
import { Int as IntT } from "../types";

/**
 * Int is a Decoder that accepts an arbitrary value and decodes it to an Int.
 * It succeeds if the input value is a number that is an integer.
 */
export const Int: D.Decoder<unknown, IntT> = pipe(
  D.number,
  D.refine((n): n is IntT => Number.isInteger(n), "Int")
);
