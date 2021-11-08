import { pipe } from "fp-ts/function";
import * as D from "io-ts/Decoder";
import { NonEmptyString as NonEmptyStringT } from "../types";

/**
 * NonEmptyString is a Decoder that accepts an arbitrary value and decodes it to
 * an NonEmptyString.  It succeeds if the input value is a string that is not
 * the empty string ("").
 */
export const NonEmptyString: D.Decoder<unknown, NonEmptyStringT> = pipe(
  D.string,
  D.refine((n): n is NonEmptyStringT => n !== "", "NonEmptyString")
);
