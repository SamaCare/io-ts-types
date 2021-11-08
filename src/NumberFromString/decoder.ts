import { pipe } from "fp-ts/function";
import * as D from "io-ts/Decoder";

/**
 * NumberFromString is a Decoder that accepts an arbitrary value and decodes it
 * to a number. It succeeds if the input value is a string that can be parsed as
 * a number.
 */
export const NumberFromString: D.Decoder<unknown, number> = pipe(
  D.string,
  D.parse((s) => {
    const n = Number.parseFloat(s);
    return Number.isNaN(n) ? D.failure(s, "NumberFromString") : D.success(n);
  })
);
