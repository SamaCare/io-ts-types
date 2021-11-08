import { describe, expect, it } from "@jest/globals";
import * as fc from "fast-check";
import { isLeft, isRight } from "fp-ts/Either";
import * as D from "io-ts/Decoder";
import { PositiveInt } from ".";

describe("PositiveInt", () => {
  describe("encode()", () => {
    it("encodes a PositiveInt to a string", () => {
      fc.assert(
        fc.property(fc.integer({ min: 1 }), (input) => {
          const result = PositiveInt.decode(input);
          if (isLeft(result)) {
            throw new Error(D.draw(result.left));
          }
          const output = result.right;

          expect(PositiveInt.encode(output)).toEqual(input.toString());
        }),
        { numRuns: 1000 }
      );
    });
  });

  describe("decode()", () => {
    it("decodes a positive integer", () => {
      fc.assert(
        fc.property(fc.integer({ min: 1 }), (input) => {
          const result = PositiveInt.decode(input);
          if (isLeft(result)) {
            throw new Error(D.draw(result.left));
          }
          const output = result.right;

          expect(output).toEqual(input);
        }),
        { numRuns: 1000 }
      );
    });

    it("fails to decode 0", () => {
      const result = PositiveInt.decode(0);
      expect(isRight(result)).toBe(false);
    });

    it("fails to decode a negative number", () => {
      fc.assert(
        fc.property(fc.integer({ max: -1 }), (input) => {
          const result = PositiveInt.decode(input);

          expect(isRight(result)).toBe(false);
        }),
        { numRuns: 1000 }
      );
    });

    it("fails to decode a float", () => {
      fc.assert(
        fc.property(
          fc.float().filter((value) => !Number.isInteger(value)),
          (input) => {
            const result = PositiveInt.decode(input);

            expect(isRight(result)).toBe(false);
          }
        ),
        { numRuns: 1000 }
      );
    });
  });
});
