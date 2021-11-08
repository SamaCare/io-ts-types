import { describe, expect, it } from "@jest/globals";
import * as fc from "fast-check";
import { isLeft, isRight } from "fp-ts/Either";
import * as D from "io-ts/Decoder";
import { NumberFromString } from ".";

describe("NumberFromString", () => {
  describe("encode()", () => {
    it("encodes a number to a string", () => {
      fc.assert(
        fc.property(fc.float().map((value) => value.toString()), (input) => {
          const result = NumberFromString.decode(input);
          if (isLeft(result)) {
            throw new Error(D.draw(result.left));
          }
          const value = result.right;

          expect(NumberFromString.encode(value)).toEqual(input);
        }),
        { numRuns: 1000 }
      );
    });
  });

  describe("decode()", () => {
    it("decodes a stringified number", () => {
      fc.assert(
        fc.property(fc.float(), (raw) => {
          const input = raw.toString();
          const result = NumberFromString.decode(input);
          if (isLeft(result)) {
            throw new Error(D.draw(result.left));
          }
          const output = result.right;

          expect(output).toEqual(raw);
        }),
        { numRuns: 1000 }
      );
    });

    it("fails to decode a non-numeric value", () => {
      fc.assert(
        fc.property(
          fc.boolean().map((value) => value.toString()),
          (value) => {
            const result = NumberFromString.decode(value);

            expect(isRight(result)).toBe(false);
          }
        ),
        { numRuns: 1000 }
      );
    });
  });
});
