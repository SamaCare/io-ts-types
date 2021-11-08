import { describe, expect, it } from "@jest/globals";
import * as fc from "fast-check";
import { isLeft } from "fp-ts/Either";
import * as D from "io-ts/Decoder";
import { NonEmptyString } from ".";

describe("NonEmptyString", () => {
  describe("encode()", () => {
    it("encodes a NonEmptyString to a string", () => {
      fc.assert(
        fc.property(fc.string({ minLength: 1 }), (input) => {
          const result = NonEmptyString.decode(input);
          if (isLeft(result)) {
            throw new Error(D.draw(result.left));
          }
          const value = result.right;

          expect(NonEmptyString.encode(value)).toEqual(input.toString());
        }),
        { numRuns: 1000 }
      );
    });
  });

  describe("decode()", () => {
    it("decodes a non-empty string", () => {
      fc.assert(
        fc.property(fc.string({ minLength: 1 }), (input) => {
          const result = NonEmptyString.decode(input);
          if (isLeft(result)) {
            throw new Error(D.draw(result.left));
          }
          const value = result.right;

          expect(value).toEqual(input);
        }),
        { numRuns: 1000 }
      );
    });

    it("fails to decode an empty string", () => {
      expect(isLeft(NonEmptyString.decode(""))).toBe(true);
    });
  });
});
