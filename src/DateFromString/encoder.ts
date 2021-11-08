import * as E from "io-ts/Encoder";

/**
 * createDateFromString is a combinator that accepts a function capable of
 * serializing a Date into a string. It returns an encoder that accepts a date
 * and encodes it into a string.
 */
export const createDateFromString: (
  serializeDate: (value: Date) => string
) => E.Encoder<string, Date> = (serializeDate) => ({
  encode(value) {
    return serializeDate(value);
  },
});
