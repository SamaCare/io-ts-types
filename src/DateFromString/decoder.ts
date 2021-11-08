import { pipe } from "fp-ts/function";
import * as D from "io-ts/Decoder";

/**
 * createDateFromString is a combinator that accepts a function capable of
 * decoding a string into a Date. It returns a decoder that accepts a string and
 * decodes it into a Date object.
 */
export const createDateFromString: (
  parseDate: (value: string) => Date
) => D.Decoder<unknown, Date> = (parseDate) =>
  pipe(
    D.string,
    D.parse((v) => {
      const parsed = parseDate(v);
      if (Number.isNaN(parsed.getTime())) {
        return D.failure(v, "Invalid Date");
      }
      return D.success(parsed);
    })
  );
