import { pipe } from "fp-ts/function";
import * as D from "io-ts/Decoder";
import { Int } from "../Int";
import { PositiveInt as PositiveIntT } from "../types";

/**
 * PositiveInt is a Decoder that accepts an arbitrary value and decodes it to a
 * PositiveInt. It succeeds if the input value is a number that is an integer
 * greater than 0.
 */
export const PositiveInt: D.Decoder<unknown, PositiveIntT> = pipe(
  Int,
  D.refine((n): n is PositiveIntT => n > 0, "PositiveInt")
);
