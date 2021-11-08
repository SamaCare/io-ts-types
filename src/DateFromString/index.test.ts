import { describe, expect, it } from "@jest/globals";
import { parseISO } from "date-fns";
import * as fc from "fast-check";
import { isLeft, isRight } from "fp-ts/Either";
import * as D from "io-ts/Decoder";
import { createDateFromString } from ".";

describe("createDateFromString", () => {
  describe("encode()", () => {
    it("encodes a Date to a string using a given date-encoding function", () => {
      fc.assert(
        fc.property(fc.date(), (raw) => {
          const DateFromISOString = createDateFromString({
            parse(s: string) {
              return parseISO(s);
            },
            serialize(d: Date) {
              return d.toISOString();
            },
          });

          const input = raw.toISOString();
          const result = DateFromISOString.decode(input);
          if (isLeft(result)) {
            throw new Error(D.draw(result.left));
          }
          const value = result.right;

          expect(DateFromISOString.encode(value)).toEqual(input);
        }),
        { numRuns: 1000 }
      );
    });
  });

  describe("decode()", () => {
    it("decodes a value to a date using a given date-parsing function", () => {
      fc.assert(
        fc.property(fc.date(), (raw) => {
          const input = raw.toISOString();
          const DateFromString = createDateFromString({
            parse(s: string) {
              return new Date(Date.parse(s));
            },
            serialize(d: Date) {
              return d.toString();
            },
          });

          const result = DateFromString.decode(input);
          if (isLeft(result)) {
            throw new Error(D.draw(result.left));
          }
          const value = result.right;

          expect(value).toEqual(raw);
        }),
        { numRuns: 1000 }
      );
    });

    it("fails to decode a value when the given date-parsing function fails", () => {
      fc.assert(
        fc.property(fc.date(), (value) => {
          const Decoder = createDateFromString({
            parse(_s: string) {
              throw new TypeError("Failed to parse value to date");
            },
            serialize(d: Date) {
              return d.toString();
            },
          });

          const result = Decoder.decode(value);

          expect(isRight(result)).toBe(false);
        }),
        { numRuns: 1000 }
      );
    });
  });
});
